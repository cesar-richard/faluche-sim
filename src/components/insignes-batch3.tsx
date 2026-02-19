/**
 * SVG insigne components — batch 3.
 * Skis, bull head, sailboat, orchid, snail.
 * All components render centered on (cx, cy) at the given size.
 */

interface InsigneProps {
  cx: number;
  cy: number;
  size: number;
  color?: string;
  stroke?: string;
}

/** Pair of crossed skis with poles */
export function SkisInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Left ski — slightly angled */}
      <rect
        x={-s * 0.58} y={-s * 0.85} width={s * 0.14} height={s * 1.7}
        rx={s * 0.07} fill={color} stroke={stroke} strokeWidth={s * 0.04}
        transform={`rotate(-12,0,0)`}
      />
      {/* Right ski — slightly angled opposite */}
      <rect
        x={s * 0.44} y={-s * 0.85} width={s * 0.14} height={s * 1.7}
        rx={s * 0.07} fill={color} stroke={stroke} strokeWidth={s * 0.04}
        transform={`rotate(12,0,0)`}
      />
      {/* Left pole — thin diagonal line crossing the skis */}
      <line
        x1={-s * 0.55} y1={s * 0.75}
        x2={s * 0.35} y2={-s * 0.75}
        stroke={stroke} strokeWidth={s * 0.06} strokeLinecap="round"
      />
      {/* Left pole basket (small circle near tip) */}
      <circle cx={s * 0.22} cy={-s * 0.55} r={s * 0.08} fill="none" stroke={stroke} strokeWidth={s * 0.04} />
      {/* Right pole — thin diagonal line crossing the skis */}
      <line
        x1={s * 0.55} y1={s * 0.75}
        x2={-s * 0.35} y2={-s * 0.75}
        stroke={stroke} strokeWidth={s * 0.06} strokeLinecap="round"
      />
      {/* Right pole basket */}
      <circle cx={-s * 0.22} cy={-s * 0.55} r={s * 0.08} fill="none" stroke={stroke} strokeWidth={s * 0.04} />
    </g>
  );
}

/** Bull head with horns — front-facing silhouette */
export function TeteTaureauInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Horns — wide curved arcs */}
      <path
        d={`M ${-s * 0.35},${-s * 0.1}
            Q ${-s * 0.7},${-s * 0.65} ${-s * 0.55},${-s * 0.85}
            Q ${-s * 0.4},${-s * 0.7} ${-s * 0.25},${-s * 0.4}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.05} strokeLinejoin="round"
      />
      <path
        d={`M ${s * 0.35},${-s * 0.1}
            Q ${s * 0.7},${-s * 0.65} ${s * 0.55},${-s * 0.85}
            Q ${s * 0.4},${-s * 0.7} ${s * 0.25},${-s * 0.4}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.05} strokeLinejoin="round"
      />
      {/* Head — broad rounded shape */}
      <path
        d={`M ${-s * 0.4},${-s * 0.15}
            Q ${-s * 0.5},${s * 0.1} ${-s * 0.35},${s * 0.35}
            Q ${-s * 0.25},${s * 0.55} ${-s * 0.1},${s * 0.6}
            L 0,${s * 0.65}
            L ${s * 0.1},${s * 0.6}
            Q ${s * 0.25},${s * 0.55} ${s * 0.35},${s * 0.35}
            Q ${s * 0.5},${s * 0.1} ${s * 0.4},${-s * 0.15}
            Q ${s * 0.25},${-s * 0.4} 0,${-s * 0.4}
            Q ${-s * 0.25},${-s * 0.4} ${-s * 0.4},${-s * 0.15} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.05}
      />
      {/* Ears */}
      <ellipse
        cx={-s * 0.4} cy={-s * 0.08} rx={s * 0.12} ry={s * 0.08}
        fill={color} stroke={stroke} strokeWidth={s * 0.03}
        transform={`rotate(-20,${-s * 0.4},${-s * 0.08})`}
      />
      <ellipse
        cx={s * 0.4} cy={-s * 0.08} rx={s * 0.12} ry={s * 0.08}
        fill={color} stroke={stroke} strokeWidth={s * 0.03}
        transform={`rotate(20,${s * 0.4},${-s * 0.08})`}
      />
      {/* Eyes */}
      <circle cx={-s * 0.15} cy={-s * 0.05} r={s * 0.05} fill={stroke} />
      <circle cx={s * 0.15} cy={-s * 0.05} r={s * 0.05} fill={stroke} />
      {/* Nostrils */}
      <ellipse cx={-s * 0.08} cy={s * 0.35} rx={s * 0.06} ry={s * 0.04} fill={stroke} />
      <ellipse cx={s * 0.08} cy={s * 0.35} rx={s * 0.06} ry={s * 0.04} fill={stroke} />
      {/* Muzzle outline */}
      <ellipse cx={0} cy={s * 0.35} rx={s * 0.22} ry={s * 0.15} fill="none" stroke={stroke} strokeWidth={s * 0.04} />
    </g>
  );
}

/** Simple sailboat on water */
export function VoilierInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Mast */}
      <line
        x1={-s * 0.05} y1={-s * 0.8}
        x2={-s * 0.05} y2={s * 0.25}
        stroke={stroke} strokeWidth={s * 0.06} strokeLinecap="round"
      />
      {/* Main sail — large triangle to the right */}
      <path
        d={`M ${-s * 0.05},${-s * 0.75}
            L ${s * 0.55},${s * 0.15}
            L ${-s * 0.05},${s * 0.15} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      {/* Jib sail — smaller triangle to the left */}
      <path
        d={`M ${-s * 0.05},${-s * 0.65}
            L ${-s * 0.4},${s * 0.1}
            L ${-s * 0.05},${s * 0.1} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      {/* Hull */}
      <path
        d={`M ${-s * 0.55},${s * 0.3}
            L ${-s * 0.4},${s * 0.6}
            L ${s * 0.45},${s * 0.6}
            L ${s * 0.6},${s * 0.3} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.05}
      />
      {/* Water line — small wave */}
      <path
        d={`M ${-s * 0.75},${s * 0.7}
            Q ${-s * 0.55},${s * 0.6} ${-s * 0.35},${s * 0.7}
            Q ${-s * 0.15},${s * 0.8} ${s * 0.05},${s * 0.7}
            Q ${s * 0.25},${s * 0.6} ${s * 0.45},${s * 0.7}
            Q ${s * 0.65},${s * 0.8} ${s * 0.75},${s * 0.7}`}
        fill="none" stroke={stroke} strokeWidth={s * 0.05} strokeLinecap="round"
      />
    </g>
  );
}

/** Orchid flower with elegant petals */
export function OrchideeInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Top petal — large and rounded */}
      <path
        d={`M 0,${-s * 0.15}
            Q ${-s * 0.25},${-s * 0.7} 0,${-s * 0.8}
            Q ${s * 0.25},${-s * 0.7} 0,${-s * 0.15}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      {/* Upper-left petal */}
      <path
        d={`M ${-s * 0.05},${-s * 0.1}
            Q ${-s * 0.6},${-s * 0.55} ${-s * 0.65},${-s * 0.35}
            Q ${-s * 0.55},${-s * 0.1} ${-s * 0.05},${-s * 0.1}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      {/* Upper-right petal */}
      <path
        d={`M ${s * 0.05},${-s * 0.1}
            Q ${s * 0.6},${-s * 0.55} ${s * 0.65},${-s * 0.35}
            Q ${s * 0.55},${-s * 0.1} ${s * 0.05},${-s * 0.1}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      {/* Lower-left petal — longer, drooping */}
      <path
        d={`M ${-s * 0.05},${s * 0.05}
            Q ${-s * 0.55},${s * 0.15} ${-s * 0.6},${s * 0.45}
            Q ${-s * 0.35},${s * 0.35} ${-s * 0.05},${s * 0.05}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      {/* Lower-right petal — longer, drooping */}
      <path
        d={`M ${s * 0.05},${s * 0.05}
            Q ${s * 0.55},${s * 0.15} ${s * 0.6},${s * 0.45}
            Q ${s * 0.35},${s * 0.35} ${s * 0.05},${s * 0.05}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      {/* Lip / labellum — the central distinctive orchid petal */}
      <path
        d={`M ${-s * 0.15},${s * 0.1}
            Q ${-s * 0.2},${s * 0.5} 0,${s * 0.7}
            Q ${s * 0.2},${s * 0.5} ${s * 0.15},${s * 0.1}
            Q ${s * 0.05},${s * 0.2} ${-s * 0.05},${s * 0.2}
            Q ${-s * 0.1},${s * 0.15} ${-s * 0.15},${s * 0.1} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      {/* Column / center */}
      <circle cx={0} cy={-s * 0.05} r={s * 0.1} fill={stroke} />
      <circle cx={0} cy={-s * 0.05} r={s * 0.05} fill={color} />
    </g>
  );
}

/** Snail with spiral shell, facing right */
export function EscargotInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Shell — large spiral circle sitting on the body */}
      <circle
        cx={-s * 0.1} cy={-s * 0.15}
        r={s * 0.5}
        fill={color} stroke={stroke} strokeWidth={s * 0.06}
      />
      {/* Spiral inside shell */}
      <path
        d={`M ${s * 0.1},${-s * 0.15}
            A ${s * 0.2} ${s * 0.2} 0 1 0 ${-s * 0.3},${-s * 0.15}
            A ${s * 0.1} ${s * 0.1} 0 1 0 ${-s * 0.1},${-s * 0.15}`}
        fill="none" stroke={stroke} strokeWidth={s * 0.05} strokeLinecap="round"
      />
      {/* Body — slug-like shape extending to the right */}
      <path
        d={`M ${-s * 0.1},${s * 0.3}
            Q ${-s * 0.5},${s * 0.35} ${-s * 0.55},${s * 0.55}
            Q ${-s * 0.4},${s * 0.7} ${s * 0.05},${s * 0.65}
            Q ${s * 0.4},${s * 0.6} ${s * 0.6},${s * 0.45}
            Q ${s * 0.7},${s * 0.35} ${s * 0.55},${s * 0.3}
            Q ${s * 0.3},${s * 0.25} ${-s * 0.1},${s * 0.3} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.05}
      />
      {/* Head bump */}
      <ellipse
        cx={s * 0.5} cy={s * 0.3}
        rx={s * 0.15} ry={s * 0.12}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      {/* Right tentacle (eye stalk) */}
      <line
        x1={s * 0.5} y1={s * 0.22}
        x2={s * 0.6} y2={s * 0.02}
        stroke={stroke} strokeWidth={s * 0.04} strokeLinecap="round"
      />
      <circle cx={s * 0.6} cy={s * 0.02} r={s * 0.05} fill={stroke} />
      {/* Left tentacle (eye stalk) */}
      <line
        x1={s * 0.45} y1={s * 0.22}
        x2={s * 0.42} y2={s * 0.02}
        stroke={stroke} strokeWidth={s * 0.04} strokeLinecap="round"
      />
      <circle cx={s * 0.42} cy={s * 0.02} r={s * 0.05} fill={stroke} />
    </g>
  );
}
