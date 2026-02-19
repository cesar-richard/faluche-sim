/**
 * SVG insigne components — batch 1.
 * Golden metallic pin-style insignes for the faluche.
 * All components render centered on (cx, cy) at the given size.
 */

interface InsigneProps {
  cx: number;
  cy: number;
  size: number;
  color?: string;
  stroke?: string;
}

/** Eagle with spread wings, facing right — aigle */
export function AigleInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Body */}
      <ellipse cx={s * 0.1} cy={0} rx={s * 0.25} ry={s * 0.2} fill={color} stroke={stroke} strokeWidth={s * 0.06} />
      {/* Head facing right */}
      <circle cx={s * 0.4} cy={-s * 0.15} r={s * 0.13} fill={color} stroke={stroke} strokeWidth={s * 0.05} />
      {/* Beak pointing right */}
      <polygon
        points={`${s * 0.53},${-s * 0.15} ${s * 0.7},${-s * 0.12} ${s * 0.53},${-s * 0.08}`}
        fill={stroke} stroke={stroke} strokeWidth={s * 0.02}
      />
      {/* Right wing (upper, swept back) */}
      <path
        d={`M ${s * 0.2},${-s * 0.1}
            Q ${s * 0.4},${-s * 0.7} ${s * 0.8},${-s * 0.85}
            Q ${s * 0.5},${-s * 0.55} ${s * 0.35},${-s * 0.35}
            Q ${s * 0.15},${-s * 0.25} ${s * 0.2},${-s * 0.1} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      {/* Left wing (upper, swept back) */}
      <path
        d={`M ${0},${-s * 0.1}
            Q ${-s * 0.3},${-s * 0.7} ${-s * 0.75},${-s * 0.85}
            Q ${-s * 0.4},${-s * 0.55} ${-s * 0.25},${-s * 0.35}
            Q ${-s * 0.05},${-s * 0.25} ${0},${-s * 0.1} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      {/* Tail feathers */}
      <path
        d={`M ${-s * 0.1},${s * 0.1}
            Q ${-s * 0.4},${s * 0.15} ${-s * 0.6},${s * 0.35}
            Q ${-s * 0.35},${s * 0.2} ${-s * 0.2},${s * 0.25}
            Q ${-s * 0.1},${s * 0.18} ${-s * 0.1},${s * 0.1} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      {/* Talons */}
      <path
        d={`M ${s * 0.0},${s * 0.15} L ${-s * 0.05},${s * 0.35} M ${-s * 0.05},${s * 0.35} L ${-s * 0.12},${s * 0.42}
            M ${-s * 0.05},${s * 0.35} L ${-s * 0.02},${s * 0.43}
            M ${s * 0.15},${s * 0.15} L ${s * 0.18},${s * 0.35} M ${s * 0.18},${s * 0.35} L ${s * 0.12},${s * 0.42}
            M ${s * 0.18},${s * 0.35} L ${s * 0.25},${s * 0.42}`}
        fill="none" stroke={stroke} strokeWidth={s * 0.04} strokeLinecap="round"
      />
    </g>
  );
}

/** Classic naval anchor with crossbar — ancre */
export function AncreInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Ring at top */}
      <circle cx={0} cy={-s * 0.7} r={s * 0.12} fill="none" stroke={color} strokeWidth={s * 0.07} />
      {/* Shank (vertical bar) */}
      <line x1={0} y1={-s * 0.58} x2={0} y2={s * 0.55} stroke={color} strokeWidth={s * 0.1} strokeLinecap="round" />
      {/* Crossbar (stock) */}
      <line x1={-s * 0.4} y1={-s * 0.35} x2={s * 0.4} y2={-s * 0.35} stroke={color} strokeWidth={s * 0.08} strokeLinecap="round" />
      {/* Left arm (curved fluke) */}
      <path
        d={`M 0,${s * 0.45} Q ${-s * 0.55},${s * 0.35} ${-s * 0.6},${s * 0.05}`}
        fill="none" stroke={color} strokeWidth={s * 0.1} strokeLinecap="round"
      />
      {/* Left fluke tip (arrow) */}
      <polygon
        points={`${-s * 0.6},${s * 0.05} ${-s * 0.75},${-s * 0.05} ${-s * 0.55},${-s * 0.12} ${-s * 0.5},${s * 0.05}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03}
      />
      {/* Right arm (curved fluke) */}
      <path
        d={`M 0,${s * 0.45} Q ${s * 0.55},${s * 0.35} ${s * 0.6},${s * 0.05}`}
        fill="none" stroke={color} strokeWidth={s * 0.1} strokeLinecap="round"
      />
      {/* Right fluke tip (arrow) */}
      <polygon
        points={`${s * 0.6},${s * 0.05} ${s * 0.75},${-s * 0.05} ${s * 0.55},${-s * 0.12} ${s * 0.5},${s * 0.05}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03}
      />
    </g>
  );
}

/** Simple origami bird / paper crane — cocotte en papier */
export function CocottePapierInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Body — central diamond shape */}
      <polygon
        points={`${0},${-s * 0.15} ${s * 0.35},${s * 0.1} ${0},${s * 0.35} ${-s * 0.35},${s * 0.1}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
        strokeLinejoin="round"
      />
      {/* Left wing — angled up */}
      <polygon
        points={`${-s * 0.35},${s * 0.1} ${-s * 0.85},${-s * 0.4} ${-s * 0.55},${-s * 0.05} ${-s * 0.2},${-s * 0.05}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
        strokeLinejoin="round"
      />
      {/* Right wing — angled up */}
      <polygon
        points={`${s * 0.35},${s * 0.1} ${s * 0.85},${-s * 0.4} ${s * 0.55},${-s * 0.05} ${s * 0.2},${-s * 0.05}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
        strokeLinejoin="round"
      />
      {/* Neck and head — upward from front of body */}
      <polygon
        points={`${0},${-s * 0.15} ${-s * 0.08},${-s * 0.55} ${s * 0.05},${-s * 0.7} ${s * 0.08},${-s * 0.55}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
        strokeLinejoin="round"
      />
      {/* Tail — small triangle at back */}
      <polygon
        points={`${0},${s * 0.35} ${-s * 0.1},${s * 0.65} ${s * 0.08},${s * 0.5}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
        strokeLinejoin="round"
      />
      {/* Fold line through body */}
      <line
        x1={-s * 0.25} y1={s * 0.05}
        x2={s * 0.25} y2={s * 0.05}
        stroke={stroke} strokeWidth={s * 0.03}
      />
    </g>
  );
}

/** Chemistry flask (Erlenmeyer) and round-bottom flask — cornue et ballon */
export function CornueBallonInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Erlenmeyer flask (left) */}
      {/* Neck */}
      <rect x={-s * 0.5} y={-s * 0.75} width={s * 0.16} height={s * 0.35} fill={color} stroke={stroke} strokeWidth={s * 0.04} rx={s * 0.02} />
      {/* Body — widening triangle */}
      <path
        d={`M ${-s * 0.5},${-s * 0.4}
            L ${-s * 0.75},${s * 0.45}
            Q ${-s * 0.75},${s * 0.55} ${-s * 0.65},${s * 0.55}
            L ${-s * 0.18},${s * 0.55}
            Q ${-s * 0.08},${s * 0.55} ${-s * 0.08},${s * 0.45}
            L ${-s * 0.34},${-s * 0.4} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
        strokeLinejoin="round"
      />

      {/* Round-bottom flask (right) */}
      {/* Neck */}
      <rect x={s * 0.22} y={-s * 0.75} width={s * 0.16} height={s * 0.4} fill={color} stroke={stroke} strokeWidth={s * 0.04} rx={s * 0.02} />
      {/* Round bottom */}
      <circle cx={s * 0.3} cy={s * 0.2} r={s * 0.38} fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* Connection from neck to sphere */}
      <path
        d={`M ${s * 0.22},${-s * 0.35} Q ${s * 0.05},${-s * 0.1} ${s * 0.0},${s * 0.1}
            M ${s * 0.38},${-s * 0.35} Q ${s * 0.55},${-s * 0.1} ${s * 0.6},${s * 0.1}`}
        fill="none" stroke={stroke} strokeWidth={s * 0.02}
      />

      {/* Rim lines on necks */}
      <line x1={-s * 0.52} y1={-s * 0.72} x2={-s * 0.32} y2={-s * 0.72} stroke={stroke} strokeWidth={s * 0.04} strokeLinecap="round" />
      <line x1={s * 0.2} y1={-s * 0.72} x2={s * 0.4} y2={-s * 0.72} stroke={stroke} strokeWidth={s * 0.04} strokeLinecap="round" />
    </g>
  );
}

/** Cupid — winged bow and arrow with small wings */
export function CupidonInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Bow — arc shape on the left */}
      <path
        d={`M ${s * 0.15},${-s * 0.6}
            Q ${-s * 0.55},${-s * 0.35} ${-s * 0.55},${0}
            Q ${-s * 0.55},${s * 0.35} ${s * 0.15},${s * 0.6}`}
        fill="none" stroke={color} strokeWidth={s * 0.08} strokeLinecap="round"
      />
      {/* Bowstring */}
      <line
        x1={s * 0.15} y1={-s * 0.6}
        x2={s * 0.15} y2={s * 0.6}
        stroke={stroke} strokeWidth={s * 0.03}
      />
      {/* Arrow shaft */}
      <line
        x1={-s * 0.3} y1={0}
        x2={s * 0.85} y2={0}
        stroke={color} strokeWidth={s * 0.05} strokeLinecap="round"
      />
      {/* Arrowhead */}
      <polygon
        points={`${s * 0.85},${0} ${s * 0.65},${-s * 0.12} ${s * 0.7},${0} ${s * 0.65},${s * 0.12}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.02}
      />
      {/* Arrow fletching */}
      <polygon
        points={`${-s * 0.3},${0} ${-s * 0.42},${-s * 0.1} ${-s * 0.35},${0} ${-s * 0.42},${s * 0.1}`}
        fill={stroke}
      />
      {/* Heart at center of bow */}
      <path
        d={`M ${-s * 0.25},${-s * 0.35}
            C ${-s * 0.4},${-s * 0.5} ${-s * 0.55},${-s * 0.35} ${-s * 0.25},${-s * 0.18}
            C ${s * 0.05},${-s * 0.35} ${-s * 0.1},${-s * 0.5} ${-s * 0.25},${-s * 0.35} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03}
      />
      {/* Small wings behind the heart */}
      <path
        d={`M ${-s * 0.35},${-s * 0.38}
            Q ${-s * 0.6},${-s * 0.6} ${-s * 0.75},${-s * 0.45}
            Q ${-s * 0.55},${-s * 0.4} ${-s * 0.4},${-s * 0.35}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03}
      />
      <path
        d={`M ${-s * 0.15},${-s * 0.38}
            Q ${s * 0.1},${-s * 0.6} ${s * 0.25},${-s * 0.45}
            Q ${s * 0.05},${-s * 0.4} ${-s * 0.1},${-s * 0.35}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03}
      />
    </g>
  );
}

/** Squirrel with bushy tail — ecureuil */
export function EcureuilInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Bushy tail — large curved shape rising up behind */}
      <path
        d={`M ${-s * 0.05},${s * 0.1}
            Q ${-s * 0.3},${s * 0.0} ${-s * 0.45},${-s * 0.2}
            Q ${-s * 0.55},${-s * 0.5} ${-s * 0.3},${-s * 0.75}
            Q ${-s * 0.05},${-s * 0.9} ${s * 0.15},${-s * 0.7}
            Q ${s * 0.3},${-s * 0.5} ${s * 0.2},${-s * 0.25}
            Q ${s * 0.15},${-s * 0.1} ${s * 0.05},${-s * 0.05}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
        strokeLinejoin="round"
      />
      {/* Body */}
      <ellipse cx={s * 0.05} cy={s * 0.25} rx={s * 0.25} ry={s * 0.22} fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* Head */}
      <circle cx={s * 0.35} cy={s * 0.05} r={s * 0.18} fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* Ear */}
      <ellipse cx={s * 0.4} cy={-s * 0.12} rx={s * 0.06} ry={s * 0.1} fill={color} stroke={stroke} strokeWidth={s * 0.03}
        transform={`rotate(15,${s * 0.4},${-s * 0.12})`} />
      {/* Eye */}
      <circle cx={s * 0.42} cy={s * 0.02} r={s * 0.04} fill={stroke} />
      {/* Snout */}
      <ellipse cx={s * 0.55} cy={s * 0.08} rx={s * 0.08} ry={s * 0.05} fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      {/* Front paw — holding something */}
      <path
        d={`M ${s * 0.2},${s * 0.3} L ${s * 0.3},${s * 0.4} L ${s * 0.35},${s * 0.35}`}
        fill="none" stroke={stroke} strokeWidth={s * 0.05} strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Hind leg */}
      <ellipse cx={-s * 0.1} cy={s * 0.42} rx={s * 0.12} ry={s * 0.08} fill={color} stroke={stroke} strokeWidth={s * 0.03}
        transform={`rotate(-10,${-s * 0.1},${s * 0.42})`} />
      {/* Small acorn in paws */}
      <circle cx={s * 0.35} cy={s * 0.42} r={s * 0.06} fill={stroke} />
    </g>
  );
}

/** Classic heraldic fleur-de-lis — fleur de lys */
export function FleurLysInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Center petal */}
      <path
        d={`M 0,${s * 0.1}
            Q ${-s * 0.08},${-s * 0.1} ${-s * 0.1},${-s * 0.35}
            Q ${-s * 0.1},${-s * 0.6} 0,${-s * 0.85}
            Q ${s * 0.1},${-s * 0.6} ${s * 0.1},${-s * 0.35}
            Q ${s * 0.08},${-s * 0.1} 0,${s * 0.1} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      {/* Left petal — curving outward */}
      <path
        d={`M ${-s * 0.05},${s * 0.1}
            Q ${-s * 0.15},${-s * 0.05} ${-s * 0.3},${-s * 0.15}
            Q ${-s * 0.55},${-s * 0.35} ${-s * 0.6},${-s * 0.65}
            Q ${-s * 0.55},${-s * 0.45} ${-s * 0.4},${-s * 0.35}
            Q ${-s * 0.25},${-s * 0.25} ${-s * 0.15},${-s * 0.15}
            Q ${-s * 0.1},${-s * 0.05} ${-s * 0.05},${s * 0.1} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      {/* Right petal — curving outward (mirrored) */}
      <path
        d={`M ${s * 0.05},${s * 0.1}
            Q ${s * 0.15},${-s * 0.05} ${s * 0.3},${-s * 0.15}
            Q ${s * 0.55},${-s * 0.35} ${s * 0.6},${-s * 0.65}
            Q ${s * 0.55},${-s * 0.45} ${s * 0.4},${-s * 0.35}
            Q ${s * 0.25},${-s * 0.25} ${s * 0.15},${-s * 0.15}
            Q ${s * 0.1},${-s * 0.05} ${s * 0.05},${s * 0.1} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      {/* Horizontal band across the middle */}
      <rect x={-s * 0.3} y={s * 0.05} width={s * 0.6} height={s * 0.12} rx={s * 0.02} fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      {/* Lower stalk / base */}
      <path
        d={`M ${-s * 0.1},${s * 0.17}
            L ${-s * 0.12},${s * 0.55}
            Q ${-s * 0.12},${s * 0.7} 0,${s * 0.75}
            Q ${s * 0.12},${s * 0.7} ${s * 0.12},${s * 0.55}
            L ${s * 0.1},${s * 0.17} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      {/* Small decorative flare at bottom */}
      <path
        d={`M ${-s * 0.2},${s * 0.6}
            Q ${-s * 0.15},${s * 0.55} ${-s * 0.12},${s * 0.55}
            M ${s * 0.2},${s * 0.6}
            Q ${s * 0.15},${s * 0.55} ${s * 0.12},${s * 0.55}`}
        fill="none" stroke={stroke} strokeWidth={s * 0.03} strokeLinecap="round"
      />
    </g>
  );
}
