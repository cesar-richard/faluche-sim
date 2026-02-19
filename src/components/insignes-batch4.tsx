/**
 * SVG insigne components — batch 4.
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

/** Bat with spread wings — chauve-souris, front-facing */
export function ChauveSourisInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Body */}
      <ellipse cx={0} cy={0} rx={s * 0.15} ry={s * 0.35} fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* Head */}
      <circle cx={0} cy={-s * 0.4} r={s * 0.14} fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* Ears */}
      <polygon points={`${-s * 0.1},${-s * 0.48} ${-s * 0.18},${-s * 0.68} ${-s * 0.02},${-s * 0.54}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      <polygon points={`${s * 0.1},${-s * 0.48} ${s * 0.18},${-s * 0.68} ${s * 0.02},${-s * 0.54}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      {/* Eyes */}
      <circle cx={-s * 0.05} cy={-s * 0.42} r={s * 0.025} fill="#333" />
      <circle cx={s * 0.05} cy={-s * 0.42} r={s * 0.025} fill="#333" />
      {/* Left wing */}
      <path d={`M ${-s * 0.12},${-s * 0.2}
        Q ${-s * 0.5},${-s * 0.55} ${-s * 0.85},${-s * 0.35}
        L ${-s * 0.65},${-s * 0.1}
        L ${-s * 0.8},${s * 0.1}
        L ${-s * 0.55},${s * 0.05}
        L ${-s * 0.65},${s * 0.3}
        L ${-s * 0.35},${s * 0.15}
        Q ${-s * 0.2},${s * 0.25} ${-s * 0.12},${s * 0.15} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03} strokeLinejoin="round" />
      {/* Right wing */}
      <path d={`M ${s * 0.12},${-s * 0.2}
        Q ${s * 0.5},${-s * 0.55} ${s * 0.85},${-s * 0.35}
        L ${s * 0.65},${-s * 0.1}
        L ${s * 0.8},${s * 0.1}
        L ${s * 0.55},${s * 0.05}
        L ${s * 0.65},${s * 0.3}
        L ${s * 0.35},${s * 0.15}
        Q ${s * 0.2},${s * 0.25} ${s * 0.12},${s * 0.15} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03} strokeLinejoin="round" />
      {/* Wing finger bones */}
      <line x1={-s * 0.12} y1={-s * 0.15} x2={-s * 0.8} y2={-s * 0.3} stroke={stroke} strokeWidth={s * 0.02} />
      <line x1={-s * 0.12} y1={-s * 0.1} x2={-s * 0.75} y2={s * 0.08} stroke={stroke} strokeWidth={s * 0.02} />
      <line x1={-s * 0.12} y1={0} x2={-s * 0.6} y2={s * 0.25} stroke={stroke} strokeWidth={s * 0.02} />
      <line x1={s * 0.12} y1={-s * 0.15} x2={s * 0.8} y2={-s * 0.3} stroke={stroke} strokeWidth={s * 0.02} />
      <line x1={s * 0.12} y1={-s * 0.1} x2={s * 0.75} y2={s * 0.08} stroke={stroke} strokeWidth={s * 0.02} />
      <line x1={s * 0.12} y1={0} x2={s * 0.6} y2={s * 0.25} stroke={stroke} strokeWidth={s * 0.02} />
    </g>
  );
}

/** Safety pin with a small black ribbon — epingle a nourrice + ruban noir */
export function EpingleRubanNoirInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Safety pin body — open loop at top, clasp at bottom */}
      {/* Pin wire: left side going up, loop at top, right side going down to clasp */}
      <path d={`M ${-s * 0.12},${s * 0.45}
        L ${-s * 0.12},${-s * 0.25}
        Q ${-s * 0.12},${-s * 0.55} ${s * 0.12},${-s * 0.55}
        Q ${s * 0.25},${-s * 0.55} ${s * 0.25},${-s * 0.38}
        L ${s * 0.12},${-s * 0.25}
        L ${s * 0.12},${s * 0.3}`}
        fill="none" stroke={color} strokeWidth={s * 0.08} strokeLinecap="round" strokeLinejoin="round" />
      {/* Clasp housing at bottom */}
      <rect x={-s * 0.2} y={s * 0.3} width={s * 0.16} height={s * 0.2} rx={s * 0.03}
        fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      {/* Pin point going into clasp */}
      <line x1={s * 0.12} y1={s * 0.3} x2={-s * 0.08} y2={s * 0.4}
        stroke={color} strokeWidth={s * 0.05} strokeLinecap="round" />
      {/* Coil spring at top */}
      <circle cx={s * 0.0} cy={-s * 0.5} r={s * 0.08} fill="none" stroke={color} strokeWidth={s * 0.05} />
      {/* Black ribbon — small bow tied near the middle of the pin */}
      <path d={`M ${-s * 0.12},${s * 0.0}
        Q ${-s * 0.35},${-s * 0.12} ${-s * 0.12},${-s * 0.08}
        Q ${-s * 0.35},${s * 0.12} ${-s * 0.12},${s * 0.0} Z`}
        fill="#333" stroke="#222" strokeWidth={s * 0.02} />
      <path d={`M ${-s * 0.12},${s * 0.0}
        Q ${s * 0.1},${-s * 0.12} ${-s * 0.12},${-s * 0.08}
        Q ${s * 0.1},${s * 0.12} ${-s * 0.12},${s * 0.0} Z`}
        fill="#333" stroke="#222" strokeWidth={s * 0.02} />
      {/* Ribbon tails */}
      <line x1={-s * 0.12} y1={s * 0.0} x2={-s * 0.2} y2={s * 0.15} stroke="#333" strokeWidth={s * 0.04} strokeLinecap="round" />
      <line x1={-s * 0.12} y1={s * 0.0} x2={-s * 0.04} y2={s * 0.15} stroke="#333" strokeWidth={s * 0.04} strokeLinecap="round" />
    </g>
  );
}

/** Lobster with claws — homard, facing up */
export function HomardInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Tail segments */}
      <ellipse cx={0} cy={s * 0.55} rx={s * 0.12} ry={s * 0.1} fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      <ellipse cx={0} cy={s * 0.4} rx={s * 0.14} ry={s * 0.1} fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      <ellipse cx={0} cy={s * 0.25} rx={s * 0.16} ry={s * 0.1} fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      {/* Tail fan */}
      <ellipse cx={0} cy={s * 0.72} rx={s * 0.15} ry={s * 0.08} fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      <ellipse cx={-s * 0.1} cy={s * 0.7} rx={s * 0.08} ry={s * 0.06} fill={color} stroke={stroke} strokeWidth={s * 0.02}
        transform={`rotate(-20,${-s * 0.1},${s * 0.7})`} />
      <ellipse cx={s * 0.1} cy={s * 0.7} rx={s * 0.08} ry={s * 0.06} fill={color} stroke={stroke} strokeWidth={s * 0.02}
        transform={`rotate(20,${s * 0.1},${s * 0.7})`} />
      {/* Body / cephalothorax */}
      <ellipse cx={0} cy={s * 0.02} rx={s * 0.2} ry={s * 0.2} fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* Head */}
      <ellipse cx={0} cy={-s * 0.2} rx={s * 0.13} ry={s * 0.12} fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      {/* Eyes */}
      <circle cx={-s * 0.1} cy={-s * 0.28} r={s * 0.03} fill="#333" />
      <circle cx={s * 0.1} cy={-s * 0.28} r={s * 0.03} fill="#333" />
      {/* Antennae */}
      <line x1={-s * 0.08} y1={-s * 0.3} x2={-s * 0.25} y2={-s * 0.55} stroke={color} strokeWidth={s * 0.025} strokeLinecap="round" />
      <line x1={s * 0.08} y1={-s * 0.3} x2={s * 0.25} y2={-s * 0.55} stroke={color} strokeWidth={s * 0.025} strokeLinecap="round" />
      {/* Arms */}
      <line x1={-s * 0.18} y1={-s * 0.02} x2={-s * 0.4} y2={-s * 0.25} stroke={color} strokeWidth={s * 0.06} strokeLinecap="round" />
      <line x1={s * 0.18} y1={-s * 0.02} x2={s * 0.4} y2={-s * 0.25} stroke={color} strokeWidth={s * 0.06} strokeLinecap="round" />
      {/* Forearms */}
      <line x1={-s * 0.4} y1={-s * 0.25} x2={-s * 0.55} y2={-s * 0.5} stroke={color} strokeWidth={s * 0.05} strokeLinecap="round" />
      <line x1={s * 0.4} y1={-s * 0.25} x2={s * 0.55} y2={-s * 0.5} stroke={color} strokeWidth={s * 0.05} strokeLinecap="round" />
      {/* Left claw */}
      <path d={`M ${-s * 0.55},${-s * 0.5}
        L ${-s * 0.72},${-s * 0.72}
        L ${-s * 0.58},${-s * 0.58}
        L ${-s * 0.48},${-s * 0.72}
        Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03} strokeLinejoin="round" />
      {/* Right claw */}
      <path d={`M ${s * 0.55},${-s * 0.5}
        L ${s * 0.72},${-s * 0.72}
        L ${s * 0.58},${-s * 0.58}
        L ${s * 0.48},${-s * 0.72}
        Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03} strokeLinejoin="round" />
      {/* Small legs */}
      <line x1={-s * 0.18} y1={s * 0.08} x2={-s * 0.35} y2={s * 0.18} stroke={color} strokeWidth={s * 0.03} strokeLinecap="round" />
      <line x1={-s * 0.17} y1={s * 0.15} x2={-s * 0.33} y2={s * 0.28} stroke={color} strokeWidth={s * 0.03} strokeLinecap="round" />
      <line x1={s * 0.18} y1={s * 0.08} x2={s * 0.35} y2={s * 0.18} stroke={color} strokeWidth={s * 0.03} strokeLinecap="round" />
      <line x1={s * 0.17} y1={s * 0.15} x2={s * 0.33} y2={s * 0.28} stroke={color} strokeWidth={s * 0.03} strokeLinecap="round" />
    </g>
  );
}

/** Metal file/rasp tool with a small black ribbon — lime + ruban noir */
export function LimeRubanNoirInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy}) rotate(-20)`}>
      {/* File handle */}
      <path d={`M ${-s * 0.1},${s * 0.55}
        Q ${-s * 0.14},${s * 0.35} ${-s * 0.1},${s * 0.2}
        L ${s * 0.1},${s * 0.2}
        Q ${s * 0.14},${s * 0.35} ${s * 0.1},${s * 0.55} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* File tang (narrow part between handle and blade) */}
      <rect x={-s * 0.04} y={s * 0.1} width={s * 0.08} height={s * 0.12}
        fill={color} stroke={stroke} strokeWidth={s * 0.02} />
      {/* File blade */}
      <rect x={-s * 0.1} y={-s * 0.6} width={s * 0.2} height={s * 0.72} rx={s * 0.02}
        fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* File teeth / cross-hatching lines */}
      {[-0.5, -0.38, -0.26, -0.14, -0.02].map((t, i) => (
        <line key={i} x1={-s * 0.08} y1={s * t} x2={s * 0.08} y2={s * t}
          stroke={stroke} strokeWidth={s * 0.02} />
      ))}
      {/* Pointed tip */}
      <polygon points={`${-s * 0.1},${-s * 0.6} ${s * 0.1},${-s * 0.6} 0,${-s * 0.72}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      {/* Black ribbon — tied near the middle of the blade */}
      <g transform="rotate(20)">
        <path d={`M ${s * 0.1},${-s * 0.15}
          Q ${s * 0.3},${-s * 0.28} ${s * 0.1},${-s * 0.22}
          Q ${s * 0.3},${-s * 0.02} ${s * 0.1},${-s * 0.15} Z`}
          fill="#333" stroke="#222" strokeWidth={s * 0.02} />
        <path d={`M ${s * 0.1},${-s * 0.15}
          Q ${-s * 0.08},${-s * 0.28} ${s * 0.1},${-s * 0.22}
          Q ${-s * 0.08},${-s * 0.02} ${s * 0.1},${-s * 0.15} Z`}
          fill="#333" stroke="#222" strokeWidth={s * 0.02} />
        {/* Ribbon tails */}
        <line x1={s * 0.1} y1={-s * 0.15} x2={s * 0.18} y2={s * 0.0} stroke="#333" strokeWidth={s * 0.04} strokeLinecap="round" />
        <line x1={s * 0.1} y1={-s * 0.15} x2={s * 0.02} y2={s * 0.0} stroke="#333" strokeWidth={s * 0.04} strokeLinecap="round" />
      </g>
    </g>
  );
}

/** Lyre with a small skull at the base — lyre + tete de mort */
export function LyreTeteMortInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Lyre base / crossbar */}
      <rect x={-s * 0.25} y={s * 0.15} width={s * 0.5} height={s * 0.06} rx={s * 0.02}
        fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      {/* Left arm of lyre — curving outward then inward at top */}
      <path d={`M ${-s * 0.25},${s * 0.15}
        Q ${-s * 0.55},${s * 0.0} ${-s * 0.5},${-s * 0.3}
        Q ${-s * 0.45},${-s * 0.6} ${-s * 0.2},${-s * 0.7}
        Q ${-s * 0.05},${-s * 0.75} 0,${-s * 0.65}`}
        fill="none" stroke={color} strokeWidth={s * 0.07} strokeLinecap="round" />
      {/* Right arm of lyre */}
      <path d={`M ${s * 0.25},${s * 0.15}
        Q ${s * 0.55},${s * 0.0} ${s * 0.5},${-s * 0.3}
        Q ${s * 0.45},${-s * 0.6} ${s * 0.2},${-s * 0.7}
        Q ${s * 0.05},${-s * 0.75} 0,${-s * 0.65}`}
        fill="none" stroke={color} strokeWidth={s * 0.07} strokeLinecap="round" />
      {/* Top ornament — small ball at top */}
      <circle cx={0} cy={-s * 0.7} r={s * 0.06} fill={color} stroke={stroke} strokeWidth={s * 0.02} />
      {/* Strings */}
      <line x1={-s * 0.12} y1={-s * 0.5} x2={-s * 0.12} y2={s * 0.15} stroke={stroke} strokeWidth={s * 0.02} />
      <line x1={0} y1={-s * 0.6} x2={0} y2={s * 0.15} stroke={stroke} strokeWidth={s * 0.02} />
      <line x1={s * 0.12} y1={-s * 0.5} x2={s * 0.12} y2={s * 0.15} stroke={stroke} strokeWidth={s * 0.02} />
      {/* Skull at the base */}
      <ellipse cx={0} cy={s * 0.42} rx={s * 0.18} ry={s * 0.2} fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      {/* Skull eyes */}
      <ellipse cx={-s * 0.06} cy={s * 0.38} rx={s * 0.04} ry={s * 0.05} fill="#333" />
      <ellipse cx={s * 0.06} cy={s * 0.38} rx={s * 0.04} ry={s * 0.05} fill="#333" />
      {/* Skull nose */}
      <path d={`M 0,${s * 0.45} l ${-s * 0.025},${s * 0.04} l ${s * 0.05},0 Z`} fill="#333" />
      {/* Skull jaw / teeth */}
      <rect x={-s * 0.1} y={s * 0.52} width={s * 0.2} height={s * 0.05} rx={s * 0.01}
        fill={color} stroke={stroke} strokeWidth={s * 0.015} />
      <line x1={-s * 0.03} y1={s * 0.52} x2={-s * 0.03} y2={s * 0.57} stroke="#333" strokeWidth={s * 0.015} />
      <line x1={s * 0.03} y1={s * 0.52} x2={s * 0.03} y2={s * 0.57} stroke="#333" strokeWidth={s * 0.015} />
    </g>
  );
}

/** Closed umbrella held upside-down — handle pointing up, tip pointing down */
export function ParapluieFermeEnversInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Handle — J-shaped hook at top, pointing up */}
      <path d={`M ${s * 0.12},${-s * 0.55}
        Q ${s * 0.12},${-s * 0.75} ${-s * 0.05},${-s * 0.75}
        Q ${-s * 0.18},${-s * 0.75} ${-s * 0.18},${-s * 0.62}
        L ${-s * 0.18},${-s * 0.55}`}
        fill="none" stroke={color} strokeWidth={s * 0.08} strokeLinecap="round" />
      {/* Shaft */}
      <line x1={0} y1={-s * 0.55} x2={0} y2={s * 0.6} stroke={color} strokeWidth={s * 0.06} strokeLinecap="round" />
      {/* Closed canopy — narrow elongated shape wrapping around shaft */}
      <path d={`M 0,${-s * 0.55}
        Q ${s * 0.18},${-s * 0.45} ${s * 0.15},${-s * 0.2}
        Q ${s * 0.12},${s * 0.1} ${s * 0.08},${s * 0.35}
        L 0,${s * 0.45}
        L ${-s * 0.05},${s * 0.3}
        Q ${-s * 0.06},${s * 0.0} ${-s * 0.06},${-s * 0.25}
        Q ${-s * 0.06},${-s * 0.45} 0,${-s * 0.55} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      {/* Folds on the canopy */}
      <line x1={s * 0.04} y1={-s * 0.35} x2={s * 0.02} y2={s * 0.2} stroke={stroke} strokeWidth={s * 0.02} />
      <line x1={s * 0.1} y1={-s * 0.3} x2={s * 0.05} y2={s * 0.25} stroke={stroke} strokeWidth={s * 0.02} />
      {/* Ferrule / tip at bottom */}
      <polygon points={`${-s * 0.03},${s * 0.6} ${s * 0.03},${s * 0.6} 0,${s * 0.75}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.02} />
      {/* Small strap/band near top of canopy */}
      <rect x={-s * 0.08} y={-s * 0.48} width={s * 0.22} height={s * 0.04} rx={s * 0.01}
        fill={stroke} stroke={stroke} strokeWidth={s * 0.01} />
    </g>
  );
}
