import { WORLD_DOTS_PATH, WORLD_MAP, project } from "@/lib/worldMap";

export interface Hub {
  name: string;
  lat: number;
  lon: number;
  /** Where to place the label relative to the dot. */
  label?: "up" | "down" | "left" | "right";
  primary?: boolean;
}

/**
 * Dotted world map (Natural Earth land, equirectangular) with animated hubs and
 * routes. Pure SVG + SMIL animation: no client JavaScript required.
 */
export default function WorldMap({
  hubs,
  routes,
  id = "map",
  className = "",
}: {
  hubs: Hub[];
  routes: [number, number][];
  id?: string;
  className?: string;
}) {
  const pts = hubs.map((h) => ({ ...h, ...project(h.lat, h.lon) }));
  const arcs = routes.map(([a, b]) => {
    const A = pts[a];
    const B = pts[b];
    const dx = B.x - A.x;
    const dist = Math.hypot(dx, B.y - A.y);
    const mx = (A.x + B.x) / 2;
    const my = (A.y + B.y) / 2 - Math.min(dist * 0.32, 130);
    return `M${A.x.toFixed(1)},${A.y.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${B.x.toFixed(1)},${B.y.toFixed(1)}`;
  });

  const labelPos = (h: (typeof pts)[number]) => {
    switch (h.label) {
      case "down": return { x: h.x, y: h.y + 22, anchor: "middle" as const };
      case "left": return { x: h.x - 12, y: h.y + 4, anchor: "end" as const };
      case "right": return { x: h.x + 12, y: h.y + 4, anchor: "start" as const };
      default: return { x: h.x, y: h.y - 14, anchor: "middle" as const };
    }
  };

  return (
    <svg
      viewBox={`0 0 ${WORLD_MAP.width} ${WORLD_MAP.height}`}
      className={`w-full h-auto select-none ${className}`}
      role="img"
      aria-label={`Map showing ${hubs.map((h) => h.name).join(", ")}`}
    >
      <defs>
        <linearGradient id={`${id}-land`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#050DEB" stopOpacity="0.28" />
          <stop offset="50%" stopColor="#8B3FFF" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#FB00DF" stopOpacity="0.26" />
        </linearGradient>
        <linearGradient id={`${id}-route`} x1="0" x2="1">
          <stop offset="0%" stopColor="#050DEB" />
          <stop offset="100%" stopColor="#FB00DF" />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0%" stopColor="#FB00DF" stopOpacity="1" />
          <stop offset="40%" stopColor="#8B3FFF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8B3FFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Land */}
      <path d={WORLD_DOTS_PATH} stroke={`url(#${id}-land)`} strokeWidth="4.2" strokeLinecap="round" fill="none" />

      {/* Routes */}
      {arcs.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke={`url(#${id}-route)`} strokeOpacity="0.18" strokeWidth="1.5" />
          <path d={d} fill="none" stroke={`url(#${id}-route)`} strokeOpacity="0.75" strokeWidth="1.6" strokeDasharray="4 7" strokeLinecap="round">
            <animate attributeName="stroke-dashoffset" from="0" to="-110" dur={`${3.5 + (i % 4) * 0.6}s`} repeatCount="indefinite" />
          </path>
          {/* Travelling signal */}
          <circle r="7" fill={`url(#${id}-glow)`}>
            <animateMotion dur={`${2.8 + (i % 5) * 0.55}s`} begin={`${(i * 0.45) % 3}s`} repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.25 1" />
          </circle>
        </g>
      ))}

      {/* Hubs */}
      {pts.map((h, i) => {
        const l = labelPos(h);
        return (
          <g key={h.name}>
            <circle cx={h.x} cy={h.y} r="6" fill="#8B3FFF" opacity="0.5">
              <animate attributeName="r" values="5;20;5" dur="3.2s" begin={`${i * 0.4}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.2 1;0.3 0 0.2 1" keyTimes="0;0.6;1" />
              <animate attributeName="opacity" values="0.55;0;0" dur="3.2s" begin={`${i * 0.4}s`} repeatCount="indefinite" keyTimes="0;0.6;1" />
            </circle>
            <circle cx={h.x} cy={h.y} r={h.primary ? 6.5 : 5} fill={h.primary ? "#FB00DF" : "#6D28D9"} stroke="#fff" strokeWidth="2" />
            <text
              x={l.x}
              y={l.y}
              textAnchor={l.anchor}
              fill="#0D0D1F"
              fontSize="10.5"
              fontFamily="var(--font-space-mono), monospace"
              fontWeight="700"
              letterSpacing="1"
              paintOrder="stroke"
              stroke="#fff"
              strokeWidth="3"
              strokeLinejoin="round"
            >
              {h.name.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
