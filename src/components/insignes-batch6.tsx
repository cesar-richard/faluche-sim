/**
 * Batch 6 – additional insigne components for the faluche.
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

/** Lune — crescent moon (Grand Chambellan à la retraite). Gold crescent facing right. */
export function LuneInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Crescent moon — outer circle minus inner circle offset to the right */}
      <path
        d={`M ${-s * 0.05},${-s * 0.65}
            A ${s * 0.65},${s * 0.65} 0 1,0 ${-s * 0.05},${s * 0.65}
            A ${s * 0.48},${s * 0.48} 0 1,1 ${-s * 0.05},${-s * 0.65} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.06} strokeLinejoin="round"
      />
    </g>
  );
}

/** Soleil — sun with radiating pointed rays (Grand-Maître à la retraite). */
export function SoleilInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const numRays = 12;
  const innerR = s * 0.3;
  const outerR = s * 0.75;
  const midR = s * 0.42;
  // Build a star-burst path: alternating outer tip and inner notch
  let d = '';
  for (let i = 0; i < numRays; i++) {
    const angleOuter = (i * 2 * Math.PI) / numRays - Math.PI / 2;
    const angleInner = ((i + 0.5) * 2 * Math.PI) / numRays - Math.PI / 2;
    const ox = Math.cos(angleOuter) * outerR;
    const oy = Math.sin(angleOuter) * outerR;
    const ix = Math.cos(angleInner) * midR;
    const iy = Math.sin(angleInner) * midR;
    d += (i === 0 ? 'M' : 'L') + ` ${ox.toFixed(2)},${oy.toFixed(2)} L ${ix.toFixed(2)},${iy.toFixed(2)} `;
  }
  d += 'Z';
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Rays — star burst */}
      <path d={d} fill={color} stroke={stroke} strokeWidth={s * 0.04} strokeLinejoin="round" />
      {/* Central disc */}
      <circle cx={0} cy={0} r={innerR} fill={color} stroke={stroke} strokeWidth={s * 0.05} />
      {/* Face hint — small dots for eyes and arc for smile */}
      <circle cx={-s * 0.08} cy={-s * 0.04} r={s * 0.03} fill={stroke} />
      <circle cx={s * 0.08} cy={-s * 0.04} r={s * 0.03} fill={stroke} />
      <path
        d={`M ${-s * 0.08},${s * 0.08} Q 0,${s * 0.18} ${s * 0.08},${s * 0.08}`}
        fill="none" stroke={stroke} strokeWidth={s * 0.03} strokeLinecap="round"
      />
    </g>
  );
}

/** Faux — scythe / faux (passage de vie à trépas). Curved blade on a long handle. */
export function FauxInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Long handle — slightly angled */}
      <line
        x1={s * 0.05} y1={-s * 0.35}
        x2={-s * 0.1} y2={s * 0.85}
        stroke={color} strokeWidth={s * 0.08} strokeLinecap="round"
      />
      {/* Handle grip wrapping at bottom */}
      <line
        x1={-s * 0.08} y1={s * 0.68}
        x2={-s * 0.12} y2={s * 0.82}
        stroke={stroke} strokeWidth={s * 0.1} strokeLinecap="round"
      />
      {/* Blade — long sweeping curve from top of handle */}
      <path
        d={`M ${s * 0.05},${-s * 0.35}
            Q ${s * 0.15},${-s * 0.55} ${s * 0.45},${-s * 0.7}
            Q ${s * 0.65},${-s * 0.78} ${s * 0.75},${-s * 0.7}
            Q ${s * 0.68},${-s * 0.6} ${s * 0.5},${-s * 0.52}
            Q ${s * 0.25},${-s * 0.42} ${s * 0.1},${-s * 0.3} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04} strokeLinejoin="round"
      />
      {/* Blade edge highlight */}
      <path
        d={`M ${s * 0.15},${-s * 0.5}
            Q ${s * 0.4},${-s * 0.65} ${s * 0.65},${-s * 0.72}`}
        fill="none" stroke={stroke} strokeWidth={s * 0.025} strokeLinecap="round"
      />
      {/* Collar where blade meets handle */}
      <rect
        x={-s * 0.02} y={-s * 0.42}
        width={s * 0.14} height={s * 0.08}
        rx={s * 0.02}
        fill={stroke} opacity={0.6}
        transform={`rotate(-10,${s * 0.05},${-s * 0.38})`}
      />
    </g>
  );
}

/** CochonRubanBleu — pig on a vertical blue ribbon (mange comme un porc, Amiens). */
export function CochonRubanBleuInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = s * 0.06;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Blue ribbon behind the pig — vertical strip */}
      <rect
        x={-s * 0.08} y={-s * 0.7}
        width={s * 0.16} height={s * 1.55}
        rx={s * 0.03}
        fill="#1E90FF" stroke="#1565C0" strokeWidth={sw * 0.6}
      />
      {/* Ribbon forked tail at bottom */}
      <path
        d={`M ${-s * 0.08},${s * 0.85}
            L ${-s * 0.14},${s * 0.95}
            L 0,${s * 0.88}
            L ${s * 0.14},${s * 0.95}
            L ${s * 0.08},${s * 0.85}`}
        fill="#1E90FF" stroke="#1565C0" strokeWidth={sw * 0.5}
      />

      {/* ---- Pig (same as CochonInsigne) ---- */}
      {/* Body — large, stocky oval */}
      <ellipse cx={0} cy={-s * 0.05} rx={s * 0.5} ry={s * 0.28}
        fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Head — smaller oval, slightly overlapping front of body */}
      <ellipse cx={s * 0.48} cy={-s * 0.1} rx={s * 0.22} ry={s * 0.2}
        fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Snout — protruding rounded rectangle */}
      <ellipse cx={s * 0.68} cy={-s * 0.05} rx={s * 0.1} ry={s * 0.08}
        fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Nostrils */}
      <circle cx={s * 0.72} cy={-s * 0.07} r={s * 0.02} fill={stroke} />
      <circle cx={s * 0.72} cy={-s * 0.02} r={s * 0.02} fill={stroke} />
      {/* Eye */}
      <circle cx={s * 0.42} cy={-s * 0.15} r={s * 0.03} fill={stroke} />
      {/* Ear — triangular, pointing up-back */}
      <path d={`M ${s * 0.38},${-s * 0.26}
               L ${s * 0.32},${-s * 0.45}
               L ${s * 0.45},${-s * 0.32} Z`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      {/* Front left leg (forward stride) */}
      <rect x={s * 0.22} y={s * 0.15} width={s * 0.09} height={s * 0.38}
        fill={color} stroke={stroke} strokeWidth={sw * 0.5} rx={s * 0.02} />
      {/* Front right leg (back stride) */}
      <rect x={s * 0.12} y={s * 0.15} width={s * 0.09} height={s * 0.35}
        fill={color} stroke={stroke} strokeWidth={sw * 0.5} rx={s * 0.02}
        transform={`rotate(-10,${s * 0.165},${s * 0.15})`} />
      {/* Rear left leg (forward stride) */}
      <rect x={-s * 0.25} y={s * 0.15} width={s * 0.09} height={s * 0.38}
        fill={color} stroke={stroke} strokeWidth={sw * 0.5} rx={s * 0.02} />
      {/* Rear right leg (back stride) */}
      <rect x={-s * 0.36} y={s * 0.15} width={s * 0.09} height={s * 0.35}
        fill={color} stroke={stroke} strokeWidth={sw * 0.5} rx={s * 0.02}
        transform={`rotate(10,${-s * 0.315},${s * 0.15})`} />
      {/* Hooves — small darker rectangles at bottom of each leg */}
      <rect x={s * 0.22} y={s * 0.5} width={s * 0.09} height={s * 0.05}
        fill={stroke} rx={s * 0.01} />
      <rect x={-s * 0.25} y={s * 0.5} width={s * 0.09} height={s * 0.05}
        fill={stroke} rx={s * 0.01} />
      {/* Curly tail — small spiral at the rear */}
      <path d={`M ${-s * 0.48},${-s * 0.15}
               C ${-s * 0.58},${-s * 0.2} ${-s * 0.6},${-s * 0.35} ${-s * 0.52},${-s * 0.38}
               C ${-s * 0.46},${-s * 0.4} ${-s * 0.48},${-s * 0.3} ${-s * 0.53},${-s * 0.28}`}
        fill="none" stroke={stroke} strokeWidth={sw * 1.1} strokeLinecap="round" />
    </g>
  );
}

/** SqueletteDiamant — skeleton with a small diamond-shaped clear/white gem at top (même sexe). */
export function SqueletteDiamantInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = s * 0.045;
  const boneSw = s * 0.055;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* ---- Diamond gem at the top of the skull ---- */}
      <polygon
        points={`0,${-s * 0.98} ${s * 0.1},${-s * 0.88} 0,${-s * 0.78} ${-s * 0.1},${-s * 0.88}`}
        fill="#E8E8F0" stroke="#AAAACC" strokeWidth={sw * 0.8}
      />
      {/* Diamond facet highlight */}
      <line x1={0} y1={-s * 0.98} x2={0} y2={-s * 0.78}
        stroke="#FFFFFF" strokeWidth={sw * 0.4} opacity={0.6} />

      {/* ---- Full skeleton (same as SqueletteInsigne) ---- */}
      {/* Skull — rounded top, narrower jaw */}
      <ellipse cx={0} cy={-s * 0.7} rx={s * 0.16} ry={s * 0.18}
        fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Eye sockets */}
      <ellipse cx={-s * 0.06} cy={-s * 0.72} rx={s * 0.04} ry={s * 0.045}
        fill={stroke} />
      <ellipse cx={s * 0.06} cy={-s * 0.72} rx={s * 0.04} ry={s * 0.045}
        fill={stroke} />
      {/* Nasal cavity — small inverted triangle */}
      <path d={`M 0,${-s * 0.65} l ${-s * 0.025},${s * 0.04} l ${s * 0.05},0 Z`}
        fill={stroke} />
      {/* Jaw line */}
      <path d={`M ${-s * 0.1},${-s * 0.57} Q ${-s * 0.1},${-s * 0.5} 0,${-s * 0.48}
               Q ${s * 0.1},${-s * 0.5} ${s * 0.1},${-s * 0.57}`}
        fill="none" stroke={stroke} strokeWidth={sw * 0.8} />
      {/* Teeth row */}
      <line x1={-s * 0.07} y1={-s * 0.57} x2={s * 0.07} y2={-s * 0.57}
        stroke={stroke} strokeWidth={sw * 0.6} />

      {/* Neck — short spine segment */}
      <line x1={0} y1={-s * 0.5} x2={0} y2={-s * 0.42}
        stroke={color} strokeWidth={boneSw} />

      {/* Clavicles — horizontal bones at top of ribcage */}
      <line x1={-s * 0.22} y1={-s * 0.4} x2={s * 0.22} y2={-s * 0.4}
        stroke={color} strokeWidth={boneSw * 0.8} strokeLinecap="round" />

      {/* Ribcage — curved ribs radiating from spine */}
      {[0, 1, 2, 3, 4].map(i => {
        const y = -s * 0.35 + i * s * 0.065;
        const w = s * 0.18 - i * s * 0.01;
        return (
          <g key={`rib${i}`}>
            <path d={`M 0,${y} Q ${-w * 0.5},${y - s * 0.02} ${-w},${y + s * 0.02}
                     Q ${-w * 0.8},${y + s * 0.04} ${-w * 0.3},${y + s * 0.03}`}
              fill="none" stroke={color} strokeWidth={sw * 0.8} strokeLinecap="round" />
            <path d={`M 0,${y} Q ${w * 0.5},${y - s * 0.02} ${w},${y + s * 0.02}
                     Q ${w * 0.8},${y + s * 0.04} ${w * 0.3},${y + s * 0.03}`}
              fill="none" stroke={color} strokeWidth={sw * 0.8} strokeLinecap="round" />
          </g>
        );
      })}

      {/* Spine through torso */}
      <line x1={0} y1={-s * 0.42} x2={0} y2={-s * 0.02}
        stroke={color} strokeWidth={boneSw * 0.7} />
      {/* Vertebrae notches */}
      {[0, 1, 2, 3, 4, 5].map(i => {
        const y = -s * 0.38 + i * s * 0.065;
        return <line key={`vert${i}`} x1={-s * 0.02} y1={y} x2={s * 0.02} y2={y}
          stroke={stroke} strokeWidth={sw * 0.5} />;
      })}

      {/* Pelvis — butterfly/bowl shape */}
      <path d={`M 0,${-s * 0.02}
               Q ${-s * 0.08},${s * 0.02} ${-s * 0.2},${-s * 0.02}
               Q ${-s * 0.24},${s * 0.08} ${-s * 0.15},${s * 0.14}
               Q ${-s * 0.06},${s * 0.12} 0,${s * 0.14}
               Q ${s * 0.06},${s * 0.12} ${s * 0.15},${s * 0.14}
               Q ${s * 0.24},${s * 0.08} ${s * 0.2},${-s * 0.02}
               Q ${s * 0.08},${s * 0.02} 0,${-s * 0.02} Z`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.8} />

      {/* Left upper arm */}
      <line x1={-s * 0.22} y1={-s * 0.38} x2={-s * 0.28} y2={-s * 0.12}
        stroke={color} strokeWidth={boneSw * 0.7} strokeLinecap="round" />
      {/* Left forearm */}
      <line x1={-s * 0.28} y1={-s * 0.12} x2={-s * 0.24} y2={s * 0.1}
        stroke={color} strokeWidth={boneSw * 0.6} strokeLinecap="round" />
      {/* Left hand — small spread lines */}
      <line x1={-s * 0.24} y1={s * 0.1} x2={-s * 0.27} y2={s * 0.17}
        stroke={color} strokeWidth={sw * 0.6} strokeLinecap="round" />
      <line x1={-s * 0.24} y1={s * 0.1} x2={-s * 0.22} y2={s * 0.18}
        stroke={color} strokeWidth={sw * 0.6} strokeLinecap="round" />
      <line x1={-s * 0.24} y1={s * 0.1} x2={-s * 0.19} y2={s * 0.16}
        stroke={color} strokeWidth={sw * 0.6} strokeLinecap="round" />

      {/* Right upper arm */}
      <line x1={s * 0.22} y1={-s * 0.38} x2={s * 0.28} y2={-s * 0.12}
        stroke={color} strokeWidth={boneSw * 0.7} strokeLinecap="round" />
      {/* Right forearm */}
      <line x1={s * 0.28} y1={-s * 0.12} x2={s * 0.24} y2={s * 0.1}
        stroke={color} strokeWidth={boneSw * 0.6} strokeLinecap="round" />
      {/* Right hand */}
      <line x1={s * 0.24} y1={s * 0.1} x2={s * 0.27} y2={s * 0.17}
        stroke={color} strokeWidth={sw * 0.6} strokeLinecap="round" />
      <line x1={s * 0.24} y1={s * 0.1} x2={s * 0.22} y2={s * 0.18}
        stroke={color} strokeWidth={sw * 0.6} strokeLinecap="round" />
      <line x1={s * 0.24} y1={s * 0.1} x2={s * 0.19} y2={s * 0.16}
        stroke={color} strokeWidth={sw * 0.6} strokeLinecap="round" />

      {/* Left femur */}
      <line x1={-s * 0.1} y1={s * 0.14} x2={-s * 0.14} y2={s * 0.45}
        stroke={color} strokeWidth={boneSw * 0.7} strokeLinecap="round" />
      {/* Left knee joint */}
      <circle cx={-s * 0.14} cy={s * 0.45} r={s * 0.03} fill={color} stroke={stroke} strokeWidth={sw * 0.4} />
      {/* Left tibia/fibula */}
      <line x1={-s * 0.14} y1={s * 0.48} x2={-s * 0.12} y2={s * 0.78}
        stroke={color} strokeWidth={boneSw * 0.6} strokeLinecap="round" />
      {/* Left foot */}
      <line x1={-s * 0.12} y1={s * 0.78} x2={-s * 0.2} y2={s * 0.82}
        stroke={color} strokeWidth={boneSw * 0.6} strokeLinecap="round" />

      {/* Right femur */}
      <line x1={s * 0.1} y1={s * 0.14} x2={s * 0.14} y2={s * 0.45}
        stroke={color} strokeWidth={boneSw * 0.7} strokeLinecap="round" />
      {/* Right knee joint */}
      <circle cx={s * 0.14} cy={s * 0.45} r={s * 0.03} fill={color} stroke={stroke} strokeWidth={sw * 0.4} />
      {/* Right tibia/fibula */}
      <line x1={s * 0.14} y1={s * 0.48} x2={s * 0.12} y2={s * 0.78}
        stroke={color} strokeWidth={boneSw * 0.6} strokeLinecap="round" />
      {/* Right foot */}
      <line x1={s * 0.12} y1={s * 0.78} x2={s * 0.2} y2={s * 0.82}
        stroke={color} strokeWidth={boneSw * 0.6} strokeLinecap="round" />
    </g>
  );
}

/** SqueletteRubis — skeleton with a small ruby-colored (red) gem at top (deux sexes). */
export function SqueletteRubisInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = s * 0.045;
  const boneSw = s * 0.055;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* ---- Ruby gem at the top of the skull ---- */}
      <polygon
        points={`0,${-s * 0.98} ${s * 0.1},${-s * 0.88} 0,${-s * 0.78} ${-s * 0.1},${-s * 0.88}`}
        fill="#DC143C" stroke="#8B0000" strokeWidth={sw * 0.8}
      />
      {/* Ruby facet highlight */}
      <line x1={-s * 0.03} y1={-s * 0.93} x2={s * 0.03} y2={-s * 0.83}
        stroke="#FF6B6B" strokeWidth={sw * 0.4} opacity={0.6} />

      {/* ---- Full skeleton (same as SqueletteInsigne) ---- */}
      {/* Skull — rounded top, narrower jaw */}
      <ellipse cx={0} cy={-s * 0.7} rx={s * 0.16} ry={s * 0.18}
        fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Eye sockets */}
      <ellipse cx={-s * 0.06} cy={-s * 0.72} rx={s * 0.04} ry={s * 0.045}
        fill={stroke} />
      <ellipse cx={s * 0.06} cy={-s * 0.72} rx={s * 0.04} ry={s * 0.045}
        fill={stroke} />
      {/* Nasal cavity — small inverted triangle */}
      <path d={`M 0,${-s * 0.65} l ${-s * 0.025},${s * 0.04} l ${s * 0.05},0 Z`}
        fill={stroke} />
      {/* Jaw line */}
      <path d={`M ${-s * 0.1},${-s * 0.57} Q ${-s * 0.1},${-s * 0.5} 0,${-s * 0.48}
               Q ${s * 0.1},${-s * 0.5} ${s * 0.1},${-s * 0.57}`}
        fill="none" stroke={stroke} strokeWidth={sw * 0.8} />
      {/* Teeth row */}
      <line x1={-s * 0.07} y1={-s * 0.57} x2={s * 0.07} y2={-s * 0.57}
        stroke={stroke} strokeWidth={sw * 0.6} />

      {/* Neck — short spine segment */}
      <line x1={0} y1={-s * 0.5} x2={0} y2={-s * 0.42}
        stroke={color} strokeWidth={boneSw} />

      {/* Clavicles — horizontal bones at top of ribcage */}
      <line x1={-s * 0.22} y1={-s * 0.4} x2={s * 0.22} y2={-s * 0.4}
        stroke={color} strokeWidth={boneSw * 0.8} strokeLinecap="round" />

      {/* Ribcage — curved ribs radiating from spine */}
      {[0, 1, 2, 3, 4].map(i => {
        const y = -s * 0.35 + i * s * 0.065;
        const w = s * 0.18 - i * s * 0.01;
        return (
          <g key={`rib${i}`}>
            <path d={`M 0,${y} Q ${-w * 0.5},${y - s * 0.02} ${-w},${y + s * 0.02}
                     Q ${-w * 0.8},${y + s * 0.04} ${-w * 0.3},${y + s * 0.03}`}
              fill="none" stroke={color} strokeWidth={sw * 0.8} strokeLinecap="round" />
            <path d={`M 0,${y} Q ${w * 0.5},${y - s * 0.02} ${w},${y + s * 0.02}
                     Q ${w * 0.8},${y + s * 0.04} ${w * 0.3},${y + s * 0.03}`}
              fill="none" stroke={color} strokeWidth={sw * 0.8} strokeLinecap="round" />
          </g>
        );
      })}

      {/* Spine through torso */}
      <line x1={0} y1={-s * 0.42} x2={0} y2={-s * 0.02}
        stroke={color} strokeWidth={boneSw * 0.7} />
      {/* Vertebrae notches */}
      {[0, 1, 2, 3, 4, 5].map(i => {
        const y = -s * 0.38 + i * s * 0.065;
        return <line key={`vert${i}`} x1={-s * 0.02} y1={y} x2={s * 0.02} y2={y}
          stroke={stroke} strokeWidth={sw * 0.5} />;
      })}

      {/* Pelvis — butterfly/bowl shape */}
      <path d={`M 0,${-s * 0.02}
               Q ${-s * 0.08},${s * 0.02} ${-s * 0.2},${-s * 0.02}
               Q ${-s * 0.24},${s * 0.08} ${-s * 0.15},${s * 0.14}
               Q ${-s * 0.06},${s * 0.12} 0,${s * 0.14}
               Q ${s * 0.06},${s * 0.12} ${s * 0.15},${s * 0.14}
               Q ${s * 0.24},${s * 0.08} ${s * 0.2},${-s * 0.02}
               Q ${s * 0.08},${s * 0.02} 0,${-s * 0.02} Z`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.8} />

      {/* Left upper arm */}
      <line x1={-s * 0.22} y1={-s * 0.38} x2={-s * 0.28} y2={-s * 0.12}
        stroke={color} strokeWidth={boneSw * 0.7} strokeLinecap="round" />
      {/* Left forearm */}
      <line x1={-s * 0.28} y1={-s * 0.12} x2={-s * 0.24} y2={s * 0.1}
        stroke={color} strokeWidth={boneSw * 0.6} strokeLinecap="round" />
      {/* Left hand — small spread lines */}
      <line x1={-s * 0.24} y1={s * 0.1} x2={-s * 0.27} y2={s * 0.17}
        stroke={color} strokeWidth={sw * 0.6} strokeLinecap="round" />
      <line x1={-s * 0.24} y1={s * 0.1} x2={-s * 0.22} y2={s * 0.18}
        stroke={color} strokeWidth={sw * 0.6} strokeLinecap="round" />
      <line x1={-s * 0.24} y1={s * 0.1} x2={-s * 0.19} y2={s * 0.16}
        stroke={color} strokeWidth={sw * 0.6} strokeLinecap="round" />

      {/* Right upper arm */}
      <line x1={s * 0.22} y1={-s * 0.38} x2={s * 0.28} y2={-s * 0.12}
        stroke={color} strokeWidth={boneSw * 0.7} strokeLinecap="round" />
      {/* Right forearm */}
      <line x1={s * 0.28} y1={-s * 0.12} x2={s * 0.24} y2={s * 0.1}
        stroke={color} strokeWidth={boneSw * 0.6} strokeLinecap="round" />
      {/* Right hand */}
      <line x1={s * 0.24} y1={s * 0.1} x2={s * 0.27} y2={s * 0.17}
        stroke={color} strokeWidth={sw * 0.6} strokeLinecap="round" />
      <line x1={s * 0.24} y1={s * 0.1} x2={s * 0.22} y2={s * 0.18}
        stroke={color} strokeWidth={sw * 0.6} strokeLinecap="round" />
      <line x1={s * 0.24} y1={s * 0.1} x2={s * 0.19} y2={s * 0.16}
        stroke={color} strokeWidth={sw * 0.6} strokeLinecap="round" />

      {/* Left femur */}
      <line x1={-s * 0.1} y1={s * 0.14} x2={-s * 0.14} y2={s * 0.45}
        stroke={color} strokeWidth={boneSw * 0.7} strokeLinecap="round" />
      {/* Left knee joint */}
      <circle cx={-s * 0.14} cy={s * 0.45} r={s * 0.03} fill={color} stroke={stroke} strokeWidth={sw * 0.4} />
      {/* Left tibia/fibula */}
      <line x1={-s * 0.14} y1={s * 0.48} x2={-s * 0.12} y2={s * 0.78}
        stroke={color} strokeWidth={boneSw * 0.6} strokeLinecap="round" />
      {/* Left foot */}
      <line x1={-s * 0.12} y1={s * 0.78} x2={-s * 0.2} y2={s * 0.82}
        stroke={color} strokeWidth={boneSw * 0.6} strokeLinecap="round" />

      {/* Right femur */}
      <line x1={s * 0.1} y1={s * 0.14} x2={s * 0.14} y2={s * 0.45}
        stroke={color} strokeWidth={boneSw * 0.7} strokeLinecap="round" />
      {/* Right knee joint */}
      <circle cx={s * 0.14} cy={s * 0.45} r={s * 0.03} fill={color} stroke={stroke} strokeWidth={sw * 0.4} />
      {/* Right tibia/fibula */}
      <line x1={s * 0.14} y1={s * 0.48} x2={s * 0.12} y2={s * 0.78}
        stroke={color} strokeWidth={boneSw * 0.6} strokeLinecap="round" />
      {/* Right foot */}
      <line x1={s * 0.12} y1={s * 0.78} x2={s * 0.2} y2={s * 0.82}
        stroke={color} strokeWidth={boneSw * 0.6} strokeLinecap="round" />
    </g>
  );
}

/** AbeilleRegionale — bee (ville impériale). Oval body, wings, stripes, head with antennae. */
export function AbeilleRegionaleInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Left wing — upper */}
      <ellipse cx={-s * 0.3} cy={-s * 0.25} rx={s * 0.25} ry={s * 0.15}
        fill={color} stroke={stroke} strokeWidth={s * 0.03} opacity={0.8}
        transform={`rotate(-25,${-s * 0.3},${-s * 0.25})`} />
      {/* Right wing — upper */}
      <ellipse cx={s * 0.3} cy={-s * 0.25} rx={s * 0.25} ry={s * 0.15}
        fill={color} stroke={stroke} strokeWidth={s * 0.03} opacity={0.8}
        transform={`rotate(25,${s * 0.3},${-s * 0.25})`} />
      {/* Left wing — lower (smaller) */}
      <ellipse cx={-s * 0.22} cy={-s * 0.05} rx={s * 0.18} ry={s * 0.1}
        fill={color} stroke={stroke} strokeWidth={s * 0.025} opacity={0.7}
        transform={`rotate(-15,${-s * 0.22},${-s * 0.05})`} />
      {/* Right wing — lower (smaller) */}
      <ellipse cx={s * 0.22} cy={-s * 0.05} rx={s * 0.18} ry={s * 0.1}
        fill={color} stroke={stroke} strokeWidth={s * 0.025} opacity={0.7}
        transform={`rotate(15,${s * 0.22},${-s * 0.05})`} />

      {/* Body — elongated oval */}
      <ellipse cx={0} cy={s * 0.15} rx={s * 0.18} ry={s * 0.38}
        fill={color} stroke={stroke} strokeWidth={s * 0.05} />
      {/* Body stripes */}
      <line x1={-s * 0.16} y1={s * 0.0} x2={s * 0.16} y2={s * 0.0}
        stroke={stroke} strokeWidth={s * 0.04} />
      <line x1={-s * 0.17} y1={s * 0.12} x2={s * 0.17} y2={s * 0.12}
        stroke={stroke} strokeWidth={s * 0.04} />
      <line x1={-s * 0.16} y1={s * 0.24} x2={s * 0.16} y2={s * 0.24}
        stroke={stroke} strokeWidth={s * 0.04} />
      <line x1={-s * 0.13} y1={s * 0.36} x2={s * 0.13} y2={s * 0.36}
        stroke={stroke} strokeWidth={s * 0.04} />

      {/* Head */}
      <ellipse cx={0} cy={-s * 0.3} rx={s * 0.14} ry={s * 0.12}
        fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* Eyes */}
      <circle cx={-s * 0.06} cy={-s * 0.32} r={s * 0.03} fill={stroke} />
      <circle cx={s * 0.06} cy={-s * 0.32} r={s * 0.03} fill={stroke} />

      {/* Antennae */}
      <path
        d={`M ${-s * 0.04},${-s * 0.4} Q ${-s * 0.15},${-s * 0.6} ${-s * 0.22},${-s * 0.65}`}
        fill="none" stroke={color} strokeWidth={s * 0.03} strokeLinecap="round" />
      <circle cx={-s * 0.22} cy={-s * 0.65} r={s * 0.03} fill={color} stroke={stroke} strokeWidth={s * 0.02} />
      <path
        d={`M ${s * 0.04},${-s * 0.4} Q ${s * 0.15},${-s * 0.6} ${s * 0.22},${-s * 0.65}`}
        fill="none" stroke={color} strokeWidth={s * 0.03} strokeLinecap="round" />
      <circle cx={s * 0.22} cy={-s * 0.65} r={s * 0.03} fill={color} stroke={stroke} strokeWidth={s * 0.02} />

      {/* Stinger at bottom */}
      <path
        d={`M 0,${s * 0.52} L 0,${s * 0.62}`}
        stroke={stroke} strokeWidth={s * 0.04} strokeLinecap="round" />
    </g>
  );
}
