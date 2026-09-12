const CLASSES = ["NonDemented", "VeryMildDemented", "MildDemented", "ModerateDemented"];

export default function AlzheimerViz({ color }: { color: string }) {
  const value = 99.79;
  const r = 78;
  const circumference = 2 * Math.PI * r;
  const dash = (value / 100) * circumference;

  return (
    <svg viewBox="0 0 240 240" className="viz-svg" role="img" aria-label={`Test doğruluğu yüzde ${value}`}>
      <defs>
        <linearGradient id="alzGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      <circle cx="120" cy="120" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" />
      <circle
        cx="120"
        cy="120"
        r={r}
        fill="none"
        stroke="url(#alzGlow)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circumference}`}
        transform="rotate(-90 120 120)"
      />

      <text x="120" y="112" textAnchor="middle" fontSize="34" fontWeight="800" fill="#f4f6fb" fontFamily="var(--font-display)">
        {value}%
      </text>
      <text x="120" y="136" textAnchor="middle" fontSize="10.5" letterSpacing="0.08em" fill="#a7b0c4" fontFamily="var(--font-mono)">
        TEST DOĞRULUĞU
      </text>

      {CLASSES.map((c, i) => {
        const angle = (i / CLASSES.length) * Math.PI * 2 - Math.PI / 2;
        const x = 120 + Math.cos(angle) * 106;
        const y = 120 + Math.sin(angle) * 106;
        return (
          <g key={c}>
            <circle cx={x} cy={y} r="2.5" fill={color} />
          </g>
        );
      })}

      <text x="120" y="225" textAnchor="middle" fontSize="9.5" fill="#626c85" fontFamily="var(--font-mono)">
        4 SINIFLI MRI EVRELEMESİ
      </text>
    </svg>
  );
}
