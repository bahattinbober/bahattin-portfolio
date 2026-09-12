"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./ParticleField.module.css";

interface DriftTerm {
  amp: number;
  freq: number;
  phase: number;
}

interface Particle {
  // Fixed "home" offset from the cluster center, set once at creation —
  // drawn from a 2D Gaussian (see makeHomeOffset), not a hard-capped
  // radius, so there's still no single shared outer edge for the eye to
  // read as a circle — but unlike a long-tailed distribution, a Gaussian's
  // mass falls off fast enough that there are no dramatic stray outliers,
  // keeping the whole cluster compact.
  homeX: number;
  homeY: number;
  // Two independent, differently-timed sine terms per axis (not tied to
  // the home angle) — a cheap stand-in for Perlin noise. Summing two
  // incommensurate, slow frequencies gives each particle its own gentle,
  // non-repeating sway rather than an obviously-periodic back-and-forth —
  // like something suspended in softly moving water.
  driftX: [DriftTerm, DriftTerm];
  driftY: [DriftTerm, DriftTerm];
  twinklePhase: number;
  twinkleSpeed: number;
  size: number;
  alpha: number;
  // How strongly this star lags behind the cluster's own motion — varied
  // per-particle so the trailing edge is a fuzzy gradient, not every point
  // shifted by the same fixed amount (which would just look like the same
  // rigid shape nudged sideways).
  dragFactor: number;
}

const PARTICLE_COLOR = "#ffffff";
// Standard deviation of the cluster's home spread — see makeHomeOffset.
// The resulting radius is Rayleigh-distributed: ~99% of particles land
// within 3x this (~102px), a bit tighter than the old hard-capped 106px
// disk, and essentially none land past 4x this (~136px).
const SPREAD_SIGMA = 34;

function makeDriftAxis(): [DriftTerm, DriftTerm] {
  return [
    { amp: 8 + Math.random() * 8, freq: 0.02 + Math.random() * 0.05, phase: Math.random() * Math.PI * 2 },
    { amp: 3 + Math.random() * 5, freq: 0.06 + Math.random() * 0.09, phase: Math.random() * Math.PI * 2 },
  ];
}

function evalDrift([a, b]: [DriftTerm, DriftTerm], t: number): number {
  return a.amp * Math.sin(t * a.freq + a.phase) + b.amp * Math.sin(t * b.freq + b.phase);
}

// 2D Gaussian via the polar Box-Muller transform: dense at the center,
// smooth natural falloff, and — unlike an exponential or other long-tailed
// distribution — no meaningfully-probable far-flung outliers. That long
// tail was exactly what made the last pass read as an explosion instead of
// a compact, suspended cloud.
function makeHomeOffset(): { x: number; y: number } {
  // Math.random() can (extremely rarely) return exactly 0, which would make
  // log(0) = -Infinity — floor it just above 0 to rule that out entirely.
  const u1 = Math.max(Math.random(), 1e-6);
  const u2 = Math.random();
  const mag = SPREAD_SIGMA * Math.sqrt(-2 * Math.log(u1));
  const theta = 2 * Math.PI * u2;
  return { x: mag * Math.cos(theta), y: mag * Math.sin(theta) };
}

// The cluster never sits exactly on the pointer — it rests well up and to
// the right of it, both while moving and at rest.
const REST_OFFSET = { x: 180, y: -144 };

// IDLE_GLOW and TWINKLE_FLOOR are deliberately kept a little short of 1.
// If either actually reached 1, that layer would be permanently maxed out
// at rest and would have nowhere left to go on twinkle-peak — the twinkle
// would stop reading as anything, since there'd be no headroom left above
// the resting value. These sit as close to the ceiling as they can while
// still leaving that headroom visible.
const IDLE_GLOW = 0.9; // floor brightness at rest — clearly visible, not just a hint
const CLUSTER_LERP = 0.0065; // how eagerly the cluster chases its target — slow and heavy
// The slow ambient glow still rises/falls gently with sustained movement —
// this is on top of, not instead of, the separate instant "impulse" flash.
const GLOW_LERP_UP = 0.22;
const GLOW_LERP_DOWN = 0.045;
// Floor of each particle's own twinkle cycle — keeps a dim star from
// vanishing to a hard 0 (which would read as a pop rather than a fade).
const TWINKLE_FLOOR = 0.85;
// Separate, fast flash layer: with IDLE_GLOW already sitting near 1, that
// slow layer has almost no headroom left to visibly jump on movement — this
// snaps up instantly on any new motion and decays quickly on its own,
// independent of IDLE_GLOW, so the flash reads clearly no matter how bright
// the resting state is.
const IMPULSE_DECAY = 0.9;

export default function ParticleField() {
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    // Touch-primary devices have no ambient cursor position to trail, so a
    // "follows your pointer" effect has nothing meaningful to do there —
    // skip it rather than fake it with touch events. The real system cursor
    // is only hidden via the matching `(pointer: fine)` CSS media query, so
    // touch devices keep their normal behavior automatically.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const cursorDot = cursorDotRef.current;
    if (!canvas || !ctx) return;

    const isSmallScreen = window.innerWidth < 768;
    // No shadowBlur on the stars themselves — a couple thousand blurred
    // circles would be the expensive part of this effect (shadow
    // compositing is much costlier than a plain fill). The one bloom fill
    // below is the only place a soft/blurred look is spent on, and it's a
    // single draw per frame regardless of particle count.
    const particleCount = isSmallScreen ? 900 : 2100;
    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const home = makeHomeOffset();
      return {
        homeX: home.x,
        homeY: home.y,
        driftX: makeDriftAxis(),
        driftY: makeDriftAxis(),
        // Independent of drift/position: its own phase and (slow) speed, so
        // stars brighten and dim on their own separate clocks.
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.15 + Math.random() * 0.5,
        size: 0.6 + Math.random() * 1.0,
        alpha: 0.5 + Math.random() * 0.5,
        dragFactor: 2 + Math.random() * 6,
      };
    });

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let hasPointer = false;
    let targetX = 0;
    let targetY = 0;
    let prevTargetX = 0;
    let prevTargetY = 0;
    let clusterX = 0;
    let clusterY = 0;
    let prevClusterX = 0;
    let prevClusterY = 0;
    // Smoothed cluster velocity — drives the drag/inertia offset. Smoothed
    // separately from clusterX/Y itself so single-frame timing jitter
    // doesn't make the trailing dust flicker; it should read as fluid drag,
    // not noise.
    let dragVX = 0;
    let dragVY = 0;
    let glow = IDLE_GLOW;
    let impulse = 0;

    const onMove = (e: MouseEvent) => {
      if (!hasPointer) {
        // First-ever move: snap the cluster's own tracking state to the
        // pointer immediately so it doesn't sweep in from origin (0,0).
        targetX = prevTargetX = e.clientX;
        targetY = prevTargetY = e.clientY;
        clusterX = prevClusterX = e.clientX + REST_OFFSET.x;
        clusterY = prevClusterY = e.clientY + REST_OFFSET.y;
      }
      targetX = e.clientX;
      targetY = e.clientY;
      hasPointer = true;

      // The replacement cursor marker sits exactly on the real pointer, with
      // no lag and no offset — updated straight from the event, not the
      // (deliberately laggy) rAF loop below, so it never feels detached
      // from the actual mouse.
      if (cursorDot) {
        cursorDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Bloom radius (and, on small screens, its intensity) scaled down a
    // little — the gradient fill itself is O(1) regardless of particle
    // count, but it's still one more full-region composite per frame, and
    // proportionally smaller makes sense on a smaller viewport anyway.
    const bloomBaseRadius = isSmallScreen ? 110 : 170;
    const bloomGrowth = isSmallScreen ? 60 : 100;
    const bloomIntensity = isSmallScreen ? 0.75 : 1;

    let raf = 0;
    let t = 0;
    const render = () => {
      raf = requestAnimationFrame(render);
      t += 0.016;

      ctx.clearRect(0, 0, width, height);
      if (!hasPointer) return;

      const dx = targetX - prevTargetX;
      const dy = targetY - prevTargetY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      prevTargetX = targetX;
      prevTargetY = targetY;

      // Slow ambient level — gentle rise/fall, unchanged from before.
      const targetGlow = Math.min(1, IDLE_GLOW + speed * 0.09);
      const glowLerp = targetGlow > glow ? GLOW_LERP_UP : GLOW_LERP_DOWN;
      glow += (targetGlow - glow) * glowLerp;

      // Fast flash — snaps toward a speed-scaled target instantly (a real
      // flash pops immediately), then decays on its own each frame whether
      // or not the cursor keeps moving.
      const impulseTarget = Math.min(0.75, speed * 0.12);
      impulse = Math.max(impulseTarget, impulse * IMPULSE_DECAY);
      const renderGlow = Math.min(1, glow + impulse);

      const destX = targetX + REST_OFFSET.x;
      const destY = targetY + REST_OFFSET.y;
      clusterX += (destX - clusterX) * CLUSTER_LERP;
      clusterY += (destY - clusterY) * CLUSTER_LERP;

      const clusterVX = clusterX - prevClusterX;
      const clusterVY = clusterY - prevClusterY;
      prevClusterX = clusterX;
      prevClusterY = clusterY;
      dragVX += (clusterVX - dragVX) * 0.1;
      dragVY += (clusterVY - dragVY) * 0.1;

      // Soft ambient bloom behind the cluster: one cheap radial-gradient
      // fill (not a real blur filter — those are far more expensive to run
      // every frame) composited with "lighter" so it actually brightens
      // whatever page content sits underneath, like a real light source.
      // Drawn once, before the stars, so it never covers them.
      const bloomRadius = bloomBaseRadius + renderGlow * bloomGrowth;
      const bloom = ctx.createRadialGradient(clusterX, clusterY, 0, clusterX, clusterY, bloomRadius);
      bloom.addColorStop(0, `rgba(255,255,255,${0.32 * renderGlow * bloomIntensity})`);
      bloom.addColorStop(0.5, `rgba(255,255,255,${0.12 * renderGlow * bloomIntensity})`);
      bloom.addColorStop(1, "rgba(255,255,255,0)");
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = bloom;
      ctx.beginPath();
      ctx.arc(clusterX, clusterY, bloomRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = PARTICLE_COLOR;
      particles.forEach((p) => {
        // Fixed home offset plus this particle's own irregular wander — no
        // shared radius, so nothing lines up into a circle — plus a
        // per-particle lag opposite the cluster's own motion, so the shape
        // smears into a soft trailing tail instead of staying a hard-edged
        // disc while moving. Settles back to zero at rest.
        const baseX = clusterX + p.homeX + evalDrift(p.driftX, t);
        const baseY = clusterY + p.homeY + evalDrift(p.driftY, t);
        const px = baseX - dragVX * p.dragFactor;
        const py = baseY - dragVY * p.dragFactor;

        // Two independent brightness layers multiplied together: each
        // star's own slow twinkle cycle, and the shared cursor-driven glow
        // (ambient + flash combined). Neither overrides the other — idle
        // stars keep twinkling at the dim floor, movement lifts the whole
        // field on top of that.
        const twinkle =
          TWINKLE_FLOOR + (1 - TWINKLE_FLOOR) * (0.5 + 0.5 * Math.sin(t * p.twinkleSpeed + p.twinklePhase));

        // The impulse specifically (not the slow ambient glow) also puffs
        // stars up briefly — a size pop reads as a flash even when the
        // alpha ceiling is already high.
        const drawSize = p.size * (1 + impulse * 0.8);

        ctx.beginPath();
        ctx.arc(px, py, drawSize, 0, Math.PI * 2);
        ctx.globalAlpha = p.alpha * twinkle * renderGlow;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div ref={cursorDotRef} className={styles.cursorDot} aria-hidden="true" />
    </>
  );
}
