/**
 * Batch 5 – regional & cultural insigne components for the faluche.
 * Each renders a small metallic-pin silhouette centered on (cx, cy)
 * within a bounding box of roughly size x size.
 */

interface InsigneProps {
  cx: number;
  cy: number;
  size: number;
  color?: string;
  stroke?: string;
}

/** Chardon — Scottish / Lorraine thistle flower with spiky leaves */
export function ChardonInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Stem */}
      <line x1={0} y1={s * 0.1} x2={0} y2={s * 0.9} stroke={stroke} strokeWidth={s * 0.1} strokeLinecap="round" />
      {/* Spiky leaves on stem */}
      <path
        d={`M 0,${s * 0.55} L ${-s * 0.35},${s * 0.35} Q ${-s * 0.15},${s * 0.45} 0,${s * 0.45}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      <path
        d={`M 0,${s * 0.55} L ${s * 0.35},${s * 0.35} Q ${s * 0.15},${s * 0.45} 0,${s * 0.45}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      <path
        d={`M 0,${s * 0.7} L ${-s * 0.3},${s * 0.55} Q ${-s * 0.12},${s * 0.62} 0,${s * 0.6}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      <path
        d={`M 0,${s * 0.7} L ${s * 0.3},${s * 0.55} Q ${s * 0.12},${s * 0.62} 0,${s * 0.6}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      {/* Calyx / base cup with spiky bracts */}
      <path
        d={`M ${-s * 0.3},${s * 0.15}
            L ${-s * 0.38},${-s * 0.05}
            L ${-s * 0.2},${s * 0.1}
            L ${-s * 0.25},${-s * 0.1}
            L ${-s * 0.05},${s * 0.05}
            L 0,${-s * 0.1}
            L ${s * 0.05},${s * 0.05}
            L ${s * 0.25},${-s * 0.1}
            L ${s * 0.2},${s * 0.1}
            L ${s * 0.38},${-s * 0.05}
            L ${s * 0.3},${s * 0.15}
            Q ${s * 0.15},${s * 0.2} 0,${s * 0.15}
            Q ${-s * 0.15},${s * 0.2} ${-s * 0.3},${s * 0.15} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      {/* Thistle flower head — cluster of small rounded petals */}
      <ellipse cx={0} cy={-s * 0.25} rx={s * 0.25} ry={s * 0.2} fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      <ellipse cx={-s * 0.15} cy={-s * 0.35} rx={s * 0.12} ry={s * 0.15} fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      <ellipse cx={s * 0.15} cy={-s * 0.35} rx={s * 0.12} ry={s * 0.15} fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      <ellipse cx={0} cy={-s * 0.45} rx={s * 0.13} ry={s * 0.14} fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      {/* Tiny tufts at top */}
      <line x1={-s * 0.08} y1={-s * 0.55} x2={-s * 0.15} y2={-s * 0.7} stroke={color} strokeWidth={s * 0.05} strokeLinecap="round" />
      <line x1={0} y1={-s * 0.58} x2={0} y2={-s * 0.75} stroke={color} strokeWidth={s * 0.05} strokeLinecap="round" />
      <line x1={s * 0.08} y1={-s * 0.55} x2={s * 0.15} y2={-s * 0.7} stroke={color} strokeWidth={s * 0.05} strokeLinecap="round" />
    </g>
  );
}

/** Cigale — cicada with spread wings, viewed from above */
export function CigaleInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Left wing */}
      <path
        d={`M ${-s * 0.05},${-s * 0.1}
            Q ${-s * 0.55},${-s * 0.5} ${-s * 0.5},${-s * 0.05}
            Q ${-s * 0.45},${s * 0.25} ${-s * 0.1},${s * 0.15} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04} opacity={0.85}
      />
      {/* Right wing */}
      <path
        d={`M ${s * 0.05},${-s * 0.1}
            Q ${s * 0.55},${-s * 0.5} ${s * 0.5},${-s * 0.05}
            Q ${s * 0.45},${s * 0.25} ${s * 0.1},${s * 0.15} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04} opacity={0.85}
      />
      {/* Wing veins — left */}
      <line x1={-s * 0.08} y1={-s * 0.05} x2={-s * 0.4} y2={-s * 0.2} stroke={stroke} strokeWidth={s * 0.02} />
      <line x1={-s * 0.08} y1={0} x2={-s * 0.38} y2={s * 0.08} stroke={stroke} strokeWidth={s * 0.02} />
      {/* Wing veins — right */}
      <line x1={s * 0.08} y1={-s * 0.05} x2={s * 0.4} y2={-s * 0.2} stroke={stroke} strokeWidth={s * 0.02} />
      <line x1={s * 0.08} y1={0} x2={s * 0.38} y2={s * 0.08} stroke={stroke} strokeWidth={s * 0.02} />
      {/* Body — elongated oval */}
      <ellipse cx={0} cy={s * 0.15} rx={s * 0.12} ry={s * 0.35} fill={color} stroke={stroke} strokeWidth={s * 0.05} />
      {/* Body segments */}
      <line x1={-s * 0.1} y1={s * 0.15} x2={s * 0.1} y2={s * 0.15} stroke={stroke} strokeWidth={s * 0.03} />
      <line x1={-s * 0.1} y1={s * 0.28} x2={s * 0.1} y2={s * 0.28} stroke={stroke} strokeWidth={s * 0.03} />
      <line x1={-s * 0.08} y1={s * 0.4} x2={s * 0.08} y2={s * 0.4} stroke={stroke} strokeWidth={s * 0.03} />
      {/* Head */}
      <ellipse cx={0} cy={-s * 0.25} rx={s * 0.14} ry={s * 0.12} fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* Eyes */}
      <circle cx={-s * 0.12} cy={-s * 0.28} r={s * 0.05} fill={stroke} />
      <circle cx={s * 0.12} cy={-s * 0.28} r={s * 0.05} fill={stroke} />
    </g>
  );
}

/** Cigogne — standing stork, side profile */
export function CigogneInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Long legs */}
      <line x1={-s * 0.05} y1={s * 0.25} x2={-s * 0.1} y2={s * 0.85} stroke={stroke} strokeWidth={s * 0.06} strokeLinecap="round" />
      <line x1={s * 0.1} y1={s * 0.25} x2={s * 0.05} y2={s * 0.85} stroke={stroke} strokeWidth={s * 0.06} strokeLinecap="round" />
      {/* Feet */}
      <line x1={-s * 0.1} y1={s * 0.85} x2={-s * 0.22} y2={s * 0.9} stroke={stroke} strokeWidth={s * 0.05} strokeLinecap="round" />
      <line x1={s * 0.05} y1={s * 0.85} x2={-s * 0.08} y2={s * 0.9} stroke={stroke} strokeWidth={s * 0.05} strokeLinecap="round" />
      {/* Body — plump oval */}
      <ellipse cx={0} cy={s * 0.1} rx={s * 0.25} ry={s * 0.2} fill={color} stroke={stroke} strokeWidth={s * 0.05} />
      {/* Tail feathers */}
      <path
        d={`M ${-s * 0.2},${s * 0.05} Q ${-s * 0.4},${s * 0.15} ${-s * 0.35},${s * 0.25}
            Q ${-s * 0.25},${s * 0.2} ${-s * 0.2},${s * 0.15}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03}
      />
      {/* Neck — long curved */}
      <path
        d={`M ${s * 0.1},${-s * 0.05} Q ${s * 0.15},${-s * 0.35} ${s * 0.1},${-s * 0.55}`}
        fill="none" stroke={color} strokeWidth={s * 0.12} strokeLinecap="round"
      />
      <path
        d={`M ${s * 0.1},${-s * 0.05} Q ${s * 0.15},${-s * 0.35} ${s * 0.1},${-s * 0.55}`}
        fill="none" stroke={stroke} strokeWidth={s * 0.04} strokeLinecap="round"
      />
      {/* Head */}
      <ellipse cx={s * 0.1} cy={-s * 0.6} rx={s * 0.12} ry={s * 0.1} fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* Eye */}
      <circle cx={s * 0.14} cy={-s * 0.62} r={s * 0.03} fill={stroke} />
      {/* Long beak */}
      <path
        d={`M ${s * 0.2},${-s * 0.6} L ${s * 0.5},${-s * 0.58} L ${s * 0.2},${-s * 0.55}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03} strokeLinejoin="round"
      />
    </g>
  );
}

/** Hermine — heraldic ermine spot (classic Breton symbol: arrowhead with 3 dots) */
export function HermineInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Main arrowhead / shield shape pointing upward */}
      <path
        d={`M 0,${-s * 0.8}
            L ${s * 0.15},${-s * 0.2}
            L ${s * 0.4},${-s * 0.15}
            L ${s * 0.15},${s * 0.05}
            L ${s * 0.25},${s * 0.35}
            L 0,${s * 0.15}
            L ${-s * 0.25},${s * 0.35}
            L ${-s * 0.15},${s * 0.05}
            L ${-s * 0.4},${-s * 0.15}
            L ${-s * 0.15},${-s * 0.2}
            Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.05} strokeLinejoin="round"
      />
      {/* Three dots below */}
      <circle cx={-s * 0.18} cy={s * 0.6} r={s * 0.08} fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      <circle cx={0} cy={s * 0.72} r={s * 0.08} fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      <circle cx={s * 0.18} cy={s * 0.6} r={s * 0.08} fill={color} stroke={stroke} strokeWidth={s * 0.03} />
    </g>
  );
}

/** Houe — garden hoe tool */
export function HoueInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Long handle — diagonal */}
      <line
        x1={-s * 0.25} y1={-s * 0.75}
        x2={s * 0.15} y2={s * 0.55}
        stroke={stroke} strokeWidth={s * 0.09} strokeLinecap="round"
      />
      {/* Hoe blade — flat trapezoidal shape at the bottom, perpendicular to handle */}
      <path
        d={`M ${-s * 0.15},${s * 0.35}
            L ${-s * 0.45},${s * 0.6}
            L ${-s * 0.3},${s * 0.8}
            L ${s * 0.05},${s * 0.55}
            Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.05} strokeLinejoin="round"
      />
      {/* Small grip at top of handle */}
      <line
        x1={-s * 0.35} y1={-s * 0.68}
        x2={-s * 0.15} y2={-s * 0.82}
        stroke={stroke} strokeWidth={s * 0.08} strokeLinecap="round"
      />
    </g>
  );
}

/** Lion Rampant — heraldic lion standing on hind legs, profile facing right */
export function LionRampantInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Hind legs */}
      <path
        d={`M ${-s * 0.1},${s * 0.3} L ${-s * 0.2},${s * 0.6} L ${-s * 0.3},${s * 0.8}`}
        fill="none" stroke={color} strokeWidth={s * 0.1} strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d={`M ${s * 0.05},${s * 0.35} L ${s * 0.0},${s * 0.65} L ${s * 0.1},${s * 0.8}`}
        fill="none" stroke={color} strokeWidth={s * 0.1} strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Paws on hind legs */}
      <line x1={-s * 0.3} y1={s * 0.8} x2={-s * 0.4} y2={s * 0.82} stroke={color} strokeWidth={s * 0.07} strokeLinecap="round" />
      <line x1={s * 0.1} y1={s * 0.8} x2={s * 0.0} y2={s * 0.82} stroke={color} strokeWidth={s * 0.07} strokeLinecap="round" />
      {/* Body — torso, upright */}
      <path
        d={`M ${-s * 0.05},${s * 0.35}
            Q ${-s * 0.2},${s * 0.05} ${-s * 0.1},${-s * 0.2}
            Q ${-s * 0.05},${-s * 0.35} ${s * 0.1},${-s * 0.3}
            Q ${s * 0.25},${-s * 0.15} ${s * 0.15},${s * 0.1}
            Q ${s * 0.1},${s * 0.3} ${-s * 0.05},${s * 0.35} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.05}
      />
      {/* Front legs — raised, reaching forward */}
      <path
        d={`M ${s * 0.05},${-s * 0.15} L ${s * 0.35},${-s * 0.45} L ${s * 0.5},${-s * 0.4}`}
        fill="none" stroke={color} strokeWidth={s * 0.09} strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d={`M ${s * 0.0},${-s * 0.05} L ${s * 0.25},${-s * 0.3} L ${s * 0.42},${-s * 0.28}`}
        fill="none" stroke={color} strokeWidth={s * 0.09} strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Head */}
      <ellipse cx={s * 0.05} cy={-s * 0.45} rx={s * 0.15} ry={s * 0.13} fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* Mane */}
      <path
        d={`M ${-s * 0.05},${-s * 0.55} Q ${-s * 0.15},${-s * 0.65} ${-s * 0.05},${-s * 0.7}
            Q ${s * 0.05},${-s * 0.75} ${s * 0.15},${-s * 0.65}
            Q ${s * 0.22},${-s * 0.55} ${s * 0.18},${-s * 0.45}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03}
      />
      {/* Snout */}
      <path
        d={`M ${s * 0.18},${-s * 0.45} L ${s * 0.3},${-s * 0.42} L ${s * 0.18},${-s * 0.38}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03}
      />
      {/* Eye */}
      <circle cx={s * 0.1} cy={-s * 0.48} r={s * 0.03} fill={stroke} />
      {/* Tail — curving upward */}
      <path
        d={`M ${-s * 0.15},${s * 0.15} Q ${-s * 0.4},${-s * 0.1} ${-s * 0.35},${-s * 0.4}
            Q ${-s * 0.3},${-s * 0.55} ${-s * 0.2},${-s * 0.5}`}
        fill="none" stroke={color} strokeWidth={s * 0.08} strokeLinecap="round"
      />
      {/* Tail tuft */}
      <circle cx={-s * 0.2} cy={-s * 0.52} r={s * 0.06} fill={color} stroke={stroke} strokeWidth={s * 0.02} />
    </g>
  );
}

/** Leopard — heraldic lion passant (walking, profile facing right) */
export function LeopardInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Body — horizontal oval */}
      <ellipse cx={0} cy={s * 0.0} rx={s * 0.4} ry={s * 0.2} fill={color} stroke={stroke} strokeWidth={s * 0.05} />
      {/* Front legs — one forward, one back */}
      <line x1={s * 0.2} y1={s * 0.15} x2={s * 0.35} y2={s * 0.6} stroke={color} strokeWidth={s * 0.1} strokeLinecap="round" />
      <line x1={s * 0.3} y1={s * 0.15} x2={s * 0.15} y2={s * 0.6} stroke={color} strokeWidth={s * 0.1} strokeLinecap="round" />
      {/* Hind legs */}
      <line x1={-s * 0.2} y1={s * 0.15} x2={-s * 0.35} y2={s * 0.6} stroke={color} strokeWidth={s * 0.1} strokeLinecap="round" />
      <line x1={-s * 0.12} y1={s * 0.15} x2={-s * 0.05} y2={s * 0.6} stroke={color} strokeWidth={s * 0.1} strokeLinecap="round" />
      {/* Paws */}
      <line x1={s * 0.35} y1={s * 0.6} x2={s * 0.42} y2={s * 0.62} stroke={color} strokeWidth={s * 0.06} strokeLinecap="round" />
      <line x1={s * 0.15} y1={s * 0.6} x2={s * 0.22} y2={s * 0.62} stroke={color} strokeWidth={s * 0.06} strokeLinecap="round" />
      <line x1={-s * 0.35} y1={s * 0.6} x2={-s * 0.42} y2={s * 0.62} stroke={color} strokeWidth={s * 0.06} strokeLinecap="round" />
      <line x1={-s * 0.05} y1={s * 0.6} x2={-s * 0.12} y2={s * 0.62} stroke={color} strokeWidth={s * 0.06} strokeLinecap="round" />
      {/* Neck */}
      <path
        d={`M ${s * 0.3},${-s * 0.1} Q ${s * 0.4},${-s * 0.25} ${s * 0.4},${-s * 0.35}`}
        fill="none" stroke={color} strokeWidth={s * 0.14} strokeLinecap="round"
      />
      {/* Head */}
      <ellipse cx={s * 0.45} cy={-s * 0.4} rx={s * 0.15} ry={s * 0.12} fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* Ear */}
      <path
        d={`M ${s * 0.4},${-s * 0.5} L ${s * 0.35},${-s * 0.62} L ${s * 0.45},${-s * 0.55}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03}
      />
      {/* Eye */}
      <circle cx={s * 0.5} cy={-s * 0.42} r={s * 0.03} fill={stroke} />
      {/* Snout */}
      <path
        d={`M ${s * 0.58},${-s * 0.4} L ${s * 0.68},${-s * 0.38} L ${s * 0.58},${-s * 0.35}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03}
      />
      {/* Raised front paw (passant gesture) */}
      <path
        d={`M ${s * 0.35},${s * 0.35} Q ${s * 0.45},${s * 0.2} ${s * 0.5},${s * 0.3}`}
        fill="none" stroke={color} strokeWidth={s * 0.06} strokeLinecap="round"
      />
      {/* Tail — long, curving up */}
      <path
        d={`M ${-s * 0.38},${-s * 0.05} Q ${-s * 0.6},${-s * 0.15} ${-s * 0.65},${-s * 0.4}
            Q ${-s * 0.6},${-s * 0.55} ${-s * 0.5},${-s * 0.5}`}
        fill="none" stroke={color} strokeWidth={s * 0.07} strokeLinecap="round"
      />
      {/* Tail tuft */}
      <circle cx={-s * 0.5} cy={-s * 0.52} r={s * 0.05} fill={color} stroke={stroke} strokeWidth={s * 0.02} />
    </g>
  );
}

/** Sabot — traditional French wooden shoe / clog */
export function SabotInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Sole / base of the clog — flat bottom */}
      {/* Main shoe body — chunky wooden shoe shape */}
      <path
        d={`M ${-s * 0.35},${s * 0.1}
            L ${-s * 0.35},${s * 0.35}
            Q ${-s * 0.3},${s * 0.5} ${-s * 0.05},${s * 0.5}
            L ${s * 0.4},${s * 0.5}
            Q ${s * 0.65},${s * 0.48} ${s * 0.7},${s * 0.3}
            Q ${s * 0.72},${s * 0.15} ${s * 0.6},${s * 0.0}
            Q ${s * 0.45},${-s * 0.12} ${s * 0.2},${-s * 0.1}
            L ${-s * 0.05},${-s * 0.1}
            Q ${-s * 0.25},${-s * 0.1} ${-s * 0.35},${s * 0.1} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.06} strokeLinejoin="round"
      />
      {/* Opening of the shoe — the top hole where foot goes */}
      <ellipse cx={-s * 0.1} cy={-s * 0.05} rx={s * 0.22} ry={s * 0.12} fill={stroke} opacity={0.3} />
      {/* Decorative line on toe */}
      <path
        d={`M ${s * 0.25},${-s * 0.05} Q ${s * 0.45},${-s * 0.02} ${s * 0.55},${s * 0.1}`}
        fill="none" stroke={stroke} strokeWidth={s * 0.04} strokeLinecap="round"
      />
      {/* Sole edge line */}
      <path
        d={`M ${-s * 0.3},${s * 0.42} L ${s * 0.35},${s * 0.48} Q ${s * 0.55},${s * 0.46} ${s * 0.65},${s * 0.35}`}
        fill="none" stroke={stroke} strokeWidth={s * 0.04}
      />
    </g>
  );
}

/** Sanglier — wild boar profile, facing right */
export function SanglierInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Legs */}
      <line x1={-s * 0.2} y1={s * 0.2} x2={-s * 0.25} y2={s * 0.6} stroke={color} strokeWidth={s * 0.08} strokeLinecap="round" />
      <line x1={-s * 0.05} y1={s * 0.2} x2={-s * 0.08} y2={s * 0.6} stroke={color} strokeWidth={s * 0.08} strokeLinecap="round" />
      <line x1={s * 0.15} y1={s * 0.2} x2={s * 0.12} y2={s * 0.6} stroke={color} strokeWidth={s * 0.08} strokeLinecap="round" />
      <line x1={s * 0.28} y1={s * 0.18} x2={s * 0.28} y2={s * 0.55} stroke={color} strokeWidth={s * 0.08} strokeLinecap="round" />
      {/* Hooves */}
      <line x1={-s * 0.25} y1={s * 0.6} x2={-s * 0.3} y2={s * 0.62} stroke={stroke} strokeWidth={s * 0.06} strokeLinecap="round" />
      <line x1={-s * 0.08} y1={s * 0.6} x2={-s * 0.13} y2={s * 0.62} stroke={stroke} strokeWidth={s * 0.06} strokeLinecap="round" />
      <line x1={s * 0.12} y1={s * 0.6} x2={s * 0.07} y2={s * 0.62} stroke={stroke} strokeWidth={s * 0.06} strokeLinecap="round" />
      <line x1={s * 0.28} y1={s * 0.55} x2={s * 0.23} y2={s * 0.57} stroke={stroke} strokeWidth={s * 0.06} strokeLinecap="round" />
      {/* Body — heavy, barrel-shaped */}
      <ellipse cx={s * 0.0} cy={s * 0.0} rx={s * 0.4} ry={s * 0.25} fill={color} stroke={stroke} strokeWidth={s * 0.05} />
      {/* Bristly back — rough mane ridge */}
      <path
        d={`M ${-s * 0.25},${-s * 0.2}
            L ${-s * 0.2},${-s * 0.35} L ${-s * 0.12},${-s * 0.22}
            L ${-s * 0.05},${-s * 0.38} L ${s * 0.03},${-s * 0.22}
            L ${s * 0.1},${-s * 0.35} L ${s * 0.18},${-s * 0.2}
            L ${s * 0.25},${-s * 0.32} L ${s * 0.3},${-s * 0.18}`}
        fill="none" stroke={color} strokeWidth={s * 0.06} strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Head — wedge-shaped, extending right */}
      <path
        d={`M ${s * 0.35},${-s * 0.1}
            Q ${s * 0.5},${-s * 0.2} ${s * 0.6},${-s * 0.12}
            L ${s * 0.75},${-s * 0.05}
            L ${s * 0.7},${s * 0.08}
            Q ${s * 0.55},${s * 0.15} ${s * 0.35},${s * 0.12} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      {/* Snout — flat disc at end */}
      <ellipse cx={s * 0.73} cy={s * 0.0} rx={s * 0.07} ry={s * 0.08} fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* Nostril dots */}
      <circle cx={s * 0.72} cy={-s * 0.02} r={s * 0.02} fill={stroke} />
      <circle cx={s * 0.76} cy={-s * 0.02} r={s * 0.02} fill={stroke} />
      {/* Eye */}
      <circle cx={s * 0.5} cy={-s * 0.1} r={s * 0.03} fill={stroke} />
      {/* Ear */}
      <path
        d={`M ${s * 0.42},${-s * 0.18} L ${s * 0.38},${-s * 0.32} L ${s * 0.48},${-s * 0.22}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03}
      />
      {/* Tusks — curving upward from jaw */}
      <path
        d={`M ${s * 0.62},${s * 0.05} Q ${s * 0.65},${-s * 0.1} ${s * 0.58},${-s * 0.18}`}
        fill="none" stroke={stroke} strokeWidth={s * 0.05} strokeLinecap="round"
      />
      {/* Short tail */}
      <path
        d={`M ${-s * 0.38},${-s * 0.05} Q ${-s * 0.5},${-s * 0.15} ${-s * 0.45},${-s * 0.22}`}
        fill="none" stroke={color} strokeWidth={s * 0.06} strokeLinecap="round"
      />
    </g>
  );
}

/** TasteVin — traditional shallow wine tasting cup (tastevin) */
export function TasteVinInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Cup body — shallow wide bowl seen from the side */}
      <path
        d={`M ${-s * 0.5},${-s * 0.1}
            Q ${-s * 0.5},${s * 0.25} ${-s * 0.2},${s * 0.35}
            Q 0,${s * 0.42} ${s * 0.2},${s * 0.35}
            Q ${s * 0.5},${s * 0.25} ${s * 0.5},${-s * 0.1}
            Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.06} strokeLinejoin="round"
      />
      {/* Rim — top edge of the cup */}
      <ellipse cx={0} cy={-s * 0.1} rx={s * 0.5} ry={s * 0.12} fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* Inner dimple pattern — the bumpy texture of a tastevin */}
      <circle cx={-s * 0.2} cy={s * 0.08} r={s * 0.07} fill="none" stroke={stroke} strokeWidth={s * 0.03} />
      <circle cx={s * 0.0} cy={s * 0.1} r={s * 0.07} fill="none" stroke={stroke} strokeWidth={s * 0.03} />
      <circle cx={s * 0.2} cy={s * 0.08} r={s * 0.07} fill="none" stroke={stroke} strokeWidth={s * 0.03} />
      <circle cx={-s * 0.1} cy={s * 0.22} r={s * 0.06} fill="none" stroke={stroke} strokeWidth={s * 0.03} />
      <circle cx={s * 0.1} cy={s * 0.22} r={s * 0.06} fill="none" stroke={stroke} strokeWidth={s * 0.03} />
      {/* Handle — ring-shaped on the right side */}
      <path
        d={`M ${s * 0.5},${-s * 0.05}
            Q ${s * 0.75},${-s * 0.15} ${s * 0.78},${s * 0.05}
            Q ${s * 0.75},${s * 0.25} ${s * 0.5},${s * 0.15}`}
        fill="none" stroke={color} strokeWidth={s * 0.08} strokeLinecap="round"
      />
      <path
        d={`M ${s * 0.5},${-s * 0.05}
            Q ${s * 0.75},${-s * 0.15} ${s * 0.78},${s * 0.05}
            Q ${s * 0.75},${s * 0.25} ${s * 0.5},${s * 0.15}`}
        fill="none" stroke={stroke} strokeWidth={s * 0.03}
      />
      {/* Small thumb rest / handle nub on opposite side */}
      <circle cx={-s * 0.55} cy={s * 0.0} r={s * 0.06} fill={color} stroke={stroke} strokeWidth={s * 0.03} />
    </g>
  );
}
