/**
 * SVG insigne components — batch 2.
 * Additional personal insignes for the faluche simulator.
 * All components render centered on (cx, cy) at the given size.
 * Designed to be clean and readable at small scale (8-20px).
 */

interface InsigneProps {
  cx: number;
  cy: number;
  size: number;
  color?: string;
  stroke?: string;
}

/** Crossed forks — fourchettes croisées (gastronomie / bonne bouffe) */
export function FourchettesCroiseesInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  // Each fork: a handle at the bottom, shaft, and three tines at the top.
  // We draw them crossed in an X pattern at roughly ±25 degrees.
  const fork = (angle: number, key: string) => {
    // Fork shape drawn vertically, then rotated.
    // Total height ~1.8s, centered at origin.
    const tineLen = s * 0.35;
    const tineSpacing = s * 0.12;
    const shaftTop = -s * 0.5;
    const shaftBottom = s * 0.7;
    const handleBottom = s * 0.9;
    return (
      <g key={key} transform={`rotate(${angle},0,0)`}>
        {/* Handle (slightly wider bottom) */}
        <line x1={0} y1={shaftBottom} x2={0} y2={handleBottom}
          stroke={color} strokeWidth={s * 0.14} strokeLinecap="round" />
        {/* Shaft */}
        <line x1={0} y1={shaftTop} x2={0} y2={shaftBottom}
          stroke={color} strokeWidth={s * 0.08} strokeLinecap="round" />
        {/* Tines */}
        <line x1={-tineSpacing} y1={shaftTop} x2={-tineSpacing} y2={shaftTop - tineLen}
          stroke={color} strokeWidth={s * 0.06} strokeLinecap="round" />
        <line x1={0} y1={shaftTop} x2={0} y2={shaftTop - tineLen}
          stroke={color} strokeWidth={s * 0.06} strokeLinecap="round" />
        <line x1={tineSpacing} y1={shaftTop} x2={tineSpacing} y2={shaftTop - tineLen}
          stroke={color} strokeWidth={s * 0.06} strokeLinecap="round" />
        {/* Crossbar connecting tines */}
        <line x1={-tineSpacing - s * 0.02} y1={shaftTop} x2={tineSpacing + s * 0.02} y2={shaftTop}
          stroke={stroke} strokeWidth={s * 0.05} strokeLinecap="round" />
      </g>
    );
  };

  return (
    <g transform={`translate(${cx},${cy})`}>
      {fork(-25, 'left')}
      {fork(25, 'right')}
    </g>
  );
}

/** Strawberry — fraise */
export function FraiseInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Berry body — rounded triangle / heart-ish shape */}
      <path
        d={`M 0,${s * 0.85}
            Q ${-s * 0.55},${s * 0.3} ${-s * 0.45},${-s * 0.1}
            Q ${-s * 0.35},${-s * 0.35} 0,${-s * 0.3}
            Q ${s * 0.35},${-s * 0.35} ${s * 0.45},${-s * 0.1}
            Q ${s * 0.55},${s * 0.3} 0,${s * 0.85} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.06}
      />
      {/* Seed dots */}
      <circle cx={-s * 0.12} cy={s * 0.05} r={s * 0.04} fill={stroke} />
      <circle cx={s * 0.12} cy={s * 0.05} r={s * 0.04} fill={stroke} />
      <circle cx={0} cy={s * 0.3} r={s * 0.04} fill={stroke} />
      <circle cx={-s * 0.1} cy={s * 0.5} r={s * 0.035} fill={stroke} />
      <circle cx={s * 0.1} cy={s * 0.5} r={s * 0.035} fill={stroke} />
      {/* Leaf / calyx at top */}
      <ellipse cx={-s * 0.18} cy={-s * 0.35} rx={s * 0.18} ry={s * 0.08}
        fill={color} stroke={stroke} strokeWidth={s * 0.03}
        transform={`rotate(-30,${-s * 0.18},${-s * 0.35})`} />
      <ellipse cx={s * 0.18} cy={-s * 0.35} rx={s * 0.18} ry={s * 0.08}
        fill={color} stroke={stroke} strokeWidth={s * 0.03}
        transform={`rotate(30,${s * 0.18},${-s * 0.35})`} />
      <ellipse cx={0} cy={-s * 0.42} rx={s * 0.12} ry={s * 0.07}
        fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      {/* Stem */}
      <line x1={0} y1={-s * 0.45} x2={0} y2={-s * 0.7}
        stroke={stroke} strokeWidth={s * 0.06} strokeLinecap="round" />
    </g>
  );
}

/** Leather lace / strap loop — lacet de cuir */
export function LacetCuirInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* A looping leather lace — figure-eight / pretzel-like loop shape */}
      <path
        d={`M 0,${s * 0.8}
            Q ${-s * 0.15},${s * 0.6} ${-s * 0.5},${s * 0.3}
            Q ${-s * 0.8},${s * 0.05} ${-s * 0.5},${-s * 0.2}
            Q ${-s * 0.2},${-s * 0.45} 0,${-s * 0.7}
            Q ${s * 0.2},${-s * 0.45} ${s * 0.5},${-s * 0.2}
            Q ${s * 0.8},${s * 0.05} ${s * 0.5},${s * 0.3}
            Q ${s * 0.15},${s * 0.6} 0,${s * 0.8} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.07}
      />
      {/* Inner opening to make it look like a loop */}
      <path
        d={`M 0,${s * 0.4}
            Q ${-s * 0.1},${s * 0.25} ${-s * 0.25},${s * 0.1}
            Q ${-s * 0.38},${-s * 0.05} ${-s * 0.22},${-s * 0.15}
            Q ${-s * 0.05},${-s * 0.28} 0,${-s * 0.35}
            Q ${s * 0.05},${-s * 0.28} ${s * 0.22},${-s * 0.15}
            Q ${s * 0.38},${-s * 0.05} ${s * 0.25},${s * 0.1}
            Q ${s * 0.1},${s * 0.25} 0,${s * 0.4} Z`}
        fill={stroke} opacity={0.3}
      />
      {/* Lace ends dangling at bottom */}
      <line x1={-s * 0.08} y1={s * 0.75} x2={-s * 0.15} y2={s * 0.95}
        stroke={stroke} strokeWidth={s * 0.07} strokeLinecap="round" />
      <line x1={s * 0.08} y1={s * 0.75} x2={s * 0.15} y2={s * 0.95}
        stroke={stroke} strokeWidth={s * 0.07} strokeLinecap="round" />
    </g>
  );
}

/** Crossed hammer and mallet — marteau et maillet */
export function MarteauMailletInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Hammer (left, angled) — long thin handle + rectangular head */}
      <g transform="rotate(-30)">
        {/* Handle */}
        <line x1={0} y1={s * 0.1} x2={0} y2={s * 0.85}
          stroke={color} strokeWidth={s * 0.08} strokeLinecap="round" />
        {/* Head — rectangular metallic block */}
        <rect x={-s * 0.28} y={-s * 0.12} width={s * 0.56} height={s * 0.22}
          rx={s * 0.03} fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      </g>
      {/* Mallet (right, angled) — shorter handle + barrel-shaped head */}
      <g transform="rotate(30)">
        {/* Handle */}
        <line x1={0} y1={s * 0.1} x2={0} y2={s * 0.85}
          stroke={color} strokeWidth={s * 0.08} strokeLinecap="round" />
        {/* Head — rounded barrel shape */}
        <rect x={-s * 0.22} y={-s * 0.18} width={s * 0.44} height={s * 0.3}
          rx={s * 0.1} fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      </g>
    </g>
  );
}

/** Teddy bear — nounours */
export function NounoursInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Ears */}
      <circle cx={-s * 0.35} cy={-s * 0.55} r={s * 0.18}
        fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      <circle cx={s * 0.35} cy={-s * 0.55} r={s * 0.18}
        fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* Inner ears */}
      <circle cx={-s * 0.35} cy={-s * 0.55} r={s * 0.09} fill={stroke} opacity={0.4} />
      <circle cx={s * 0.35} cy={-s * 0.55} r={s * 0.09} fill={stroke} opacity={0.4} />
      {/* Head */}
      <circle cx={0} cy={-s * 0.35} r={s * 0.35}
        fill={color} stroke={stroke} strokeWidth={s * 0.05} />
      {/* Body */}
      <ellipse cx={0} cy={s * 0.3} rx={s * 0.4} ry={s * 0.45}
        fill={color} stroke={stroke} strokeWidth={s * 0.05} />
      {/* Belly patch */}
      <ellipse cx={0} cy={s * 0.25} rx={s * 0.22} ry={s * 0.28}
        fill={stroke} opacity={0.2} />
      {/* Arms */}
      <ellipse cx={-s * 0.52} cy={s * 0.15} rx={s * 0.15} ry={s * 0.25}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
        transform={`rotate(20,${-s * 0.52},${s * 0.15})`} />
      <ellipse cx={s * 0.52} cy={s * 0.15} rx={s * 0.15} ry={s * 0.25}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
        transform={`rotate(-20,${s * 0.52},${s * 0.15})`} />
      {/* Legs */}
      <ellipse cx={-s * 0.22} cy={s * 0.72} rx={s * 0.18} ry={s * 0.14}
        fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      <ellipse cx={s * 0.22} cy={s * 0.72} rx={s * 0.18} ry={s * 0.14}
        fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* Eyes */}
      <circle cx={-s * 0.13} cy={-s * 0.4} r={s * 0.05} fill="#333" />
      <circle cx={s * 0.13} cy={-s * 0.4} r={s * 0.05} fill="#333" />
      {/* Nose */}
      <ellipse cx={0} cy={-s * 0.25} rx={s * 0.08} ry={s * 0.06} fill="#333" />
      {/* Muzzle */}
      <ellipse cx={0} cy={-s * 0.2} rx={s * 0.15} ry={s * 0.1}
        fill={stroke} opacity={0.25} />
    </g>
  );
}

/** Racket and ball — raquette et ballon (sports) */
export function RaquetteBallonInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Racket — tilted slightly left */}
      <g transform="rotate(-15)">
        {/* Handle */}
        <rect x={-s * 0.06} y={s * 0.25} width={s * 0.12} height={s * 0.55}
          rx={s * 0.04} fill={color} stroke={stroke} strokeWidth={s * 0.04} />
        {/* Grip lines */}
        <line x1={-s * 0.04} y1={s * 0.45} x2={s * 0.04} y2={s * 0.45}
          stroke={stroke} strokeWidth={s * 0.02} />
        <line x1={-s * 0.04} y1={s * 0.55} x2={s * 0.04} y2={s * 0.55}
          stroke={stroke} strokeWidth={s * 0.02} />
        <line x1={-s * 0.04} y1={s * 0.65} x2={s * 0.04} y2={s * 0.65}
          stroke={stroke} strokeWidth={s * 0.02} />
        {/* Head (oval) */}
        <ellipse cx={0} cy={-s * 0.1} rx={s * 0.3} ry={s * 0.4}
          fill="none" stroke={color} strokeWidth={s * 0.07} />
        {/* Strings — horizontal */}
        <line x1={-s * 0.22} y1={-s * 0.25} x2={s * 0.22} y2={-s * 0.25}
          stroke={stroke} strokeWidth={s * 0.02} />
        <line x1={-s * 0.27} y1={-s * 0.1} x2={s * 0.27} y2={-s * 0.1}
          stroke={stroke} strokeWidth={s * 0.02} />
        <line x1={-s * 0.22} y1={s * 0.05} x2={s * 0.22} y2={s * 0.05}
          stroke={stroke} strokeWidth={s * 0.02} />
        {/* Strings — vertical */}
        <line x1={-s * 0.1} y1={-s * 0.47} x2={-s * 0.1} y2={s * 0.22}
          stroke={stroke} strokeWidth={s * 0.02} />
        <line x1={s * 0.1} y1={-s * 0.47} x2={s * 0.1} y2={s * 0.22}
          stroke={stroke} strokeWidth={s * 0.02} />
      </g>
      {/* Ball — positioned to the upper right of the racket */}
      <circle cx={s * 0.5} cy={-s * 0.55} r={s * 0.18}
        fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* Ball seam line */}
      <path
        d={`M ${s * 0.38},${-s * 0.65}
            Q ${s * 0.5},${-s * 0.55} ${s * 0.38},${-s * 0.45}`}
        fill="none" stroke={stroke} strokeWidth={s * 0.025} />
    </g>
  );
}

/** Rose flower — rose with stem and leaf */
export function RoseInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Stem */}
      <path
        d={`M 0,${s * 0.1} Q ${s * 0.05},${s * 0.4} ${-s * 0.05},${s * 0.9}`}
        fill="none" stroke={stroke} strokeWidth={s * 0.06} strokeLinecap="round" />
      {/* Leaf on stem — right side */}
      <path
        d={`M ${s * 0.02},${s * 0.45}
            Q ${s * 0.3},${s * 0.3} ${s * 0.38},${s * 0.42}
            Q ${s * 0.25},${s * 0.55} ${s * 0.02},${s * 0.45} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      {/* Leaf vein */}
      <line x1={s * 0.05} y1={s * 0.45} x2={s * 0.28} y2={s * 0.4}
        stroke={stroke} strokeWidth={s * 0.02} />
      {/* Small thorn */}
      <path
        d={`M ${-s * 0.03},${s * 0.65} L ${-s * 0.12},${s * 0.58} L ${-s * 0.02},${s * 0.6}`}
        fill={stroke} stroke="none" />
      {/* Calyx (sepals under the bloom) */}
      <path
        d={`M ${-s * 0.15},${s * 0.1} Q ${-s * 0.18},${-s * 0.05} ${-s * 0.08},${-s * 0.12}
            L 0,${s * 0.05} L ${s * 0.08},${-s * 0.12}
            Q ${s * 0.18},${-s * 0.05} ${s * 0.15},${s * 0.1} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.02} />
      {/* Rose bloom — layered petals from outside in */}
      {/* Outer petals */}
      <path
        d={`M 0,${-s * 0.15}
            Q ${-s * 0.4},${-s * 0.15} ${-s * 0.35},${-s * 0.5}
            Q ${-s * 0.15},${-s * 0.7} 0,${-s * 0.65}
            Q ${s * 0.15},${-s * 0.7} ${s * 0.35},${-s * 0.5}
            Q ${s * 0.4},${-s * 0.15} 0,${-s * 0.15} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* Middle petals */}
      <path
        d={`M 0,${-s * 0.2}
            Q ${-s * 0.25},${-s * 0.22} ${-s * 0.22},${-s * 0.45}
            Q ${-s * 0.08},${-s * 0.58} 0,${-s * 0.52}
            Q ${s * 0.08},${-s * 0.58} ${s * 0.22},${-s * 0.45}
            Q ${s * 0.25},${-s * 0.22} 0,${-s * 0.2} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      {/* Inner spiral / bud center */}
      <path
        d={`M ${-s * 0.05},${-s * 0.32}
            Q ${-s * 0.12},${-s * 0.42} 0,${-s * 0.46}
            Q ${s * 0.12},${-s * 0.42} ${s * 0.05},${-s * 0.32}
            Q 0,${-s * 0.28} ${-s * 0.05},${-s * 0.32} Z`}
        fill={stroke} opacity={0.35} />
    </g>
  );
}
