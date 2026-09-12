const NODES: { label: string; sub: string; x: number; y: number }[] = [
  { label: "CV Yükleme", sub: "Next.js", x: 20, y: 20 },
  { label: "NestJS API", sub: "İstek katmanı", x: 20, y: 100 },
  { label: "BullMQ", sub: "Async kuyruk", x: 220, y: 60 },
  { label: "pgvector", sub: "PostgreSQL", x: 20, y: 180 },
  { label: "Eşleşme", sub: "Kosinüs benzerliği", x: 220, y: 180 },
  { label: "AWS · Terraform", sub: "36 kaynak", x: 220, y: 260 },
];

export default function NodArchitectureViz({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 300" className="viz-svg" role="img" aria-label="NOD mimari şeması">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="rgba(167,176,196,0.55)" />
        </marker>
      </defs>

      <line x1="90" y1="35" x2="90" y2="95" stroke="rgba(167,176,196,0.4)" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <line x1="140" y1="115" x2="215" y2="80" stroke="rgba(167,176,196,0.4)" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <line x1="90" y1="130" x2="90" y2="175" stroke="rgba(167,176,196,0.4)" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <line x1="140" y1="195" x2="215" y2="195" stroke={color} strokeWidth="1.5" markerEnd="url(#arrow)" />
      <line x1="280" y1="90" x2="280" y2="175" stroke="rgba(167,176,196,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="280" y1="210" x2="280" y2="255" stroke="rgba(167,176,196,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />

      {NODES.map((n) => {
        const isPrimary = n.label === "pgvector" || n.label === "Eşleşme";
        return (
          <g key={n.label} transform={`translate(${n.x}, ${n.y})`}>
            <rect
              width="100"
              height="42"
              rx="8"
              fill={isPrimary ? "rgba(56,189,248,0.12)" : "rgba(255,255,255,0.04)"}
              stroke={isPrimary ? color : "rgba(167,176,196,0.35)"}
              strokeWidth="1.2"
            />
            <text x="10" y="18" fontSize="11.5" fontWeight="600" fill="#f4f6fb" fontFamily="var(--font-body)">
              {n.label}
            </text>
            <text x="10" y="32" fontSize="9" fill="#a7b0c4" fontFamily="var(--font-mono)">
              {n.sub}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
