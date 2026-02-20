// SVG components for all personal insignes on the velours
import { AigleInsigne, AncreInsigne, CocottePapierInsigne, CornueBallonInsigne, CupidonInsigne, EcureuilInsigne, FleurLysInsigne } from './insignes-batch1';
import { FourchettesCroiseesInsigne, FraiseInsigne, LacetCuirInsigne, MarteauMailletInsigne, NounoursInsigne, RaquetteBallonInsigne, RoseInsigne } from './insignes-batch2';
import { SkisInsigne, TeteTaureauInsigne, VoilierInsigne, OrchideeInsigne, EscargotInsigne } from './insignes-batch3';
import { ChauveSourisInsigne, EpingleRubanNoirInsigne, HomardInsigne, LimeRubanNoirInsigne, LyreTeteMortInsigne, ParapluieFermeEnversInsigne } from './insignes-batch4';
import { ChardonInsigne, CigaleInsigne, CigogneInsigne, HermineInsigne, HoueInsigne, LionRampantInsigne, LeopardInsigne, SabotInsigne, SanglierInsigne, TasteVinInsigne } from './insignes-batch5';

interface InsigneProps {
  cx: number;
  cy: number;
  size: number;
  color?: string;
  stroke?: string;
}

function ChameauInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  // Dromedary camel walking right — single hump, long legs, long neck, small head
  // Centered on (cx, cy), overall bounding box roughly size x size
  const sw = s * 0.06; // stroke width
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Body — elongated oval, slightly tilted */}
      <ellipse cx={s * 0.0} cy={-s * 0.05} rx={s * 0.42} ry={s * 0.2}
        fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Hump — single dome on top of back */}
      <path d={`M ${-s * 0.1},${-s * 0.22}
               Q ${-s * 0.05},${-s * 0.52} ${s * 0.12},${-s * 0.48}
               Q ${s * 0.25},${-s * 0.44} ${s * 0.22},${-s * 0.22}`}
        fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Neck — long, angled forward-up from front of body */}
      <path d={`M ${s * 0.3},${-s * 0.15}
               L ${s * 0.42},${-s * 0.55}
               L ${s * 0.52},${-s * 0.5}
               L ${s * 0.4},${-s * 0.1} Z`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      {/* Head — small oval at top of neck */}
      <ellipse cx={s * 0.52} cy={-s * 0.58} rx={s * 0.12} ry={s * 0.065}
        fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Ear — small triangle */}
      <path d={`M ${s * 0.46},${-s * 0.63} L ${s * 0.44},${-s * 0.72} L ${s * 0.5},${-s * 0.65} Z`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.5} />
      {/* Eye — tiny dot */}
      <circle cx={s * 0.54} cy={-s * 0.59} r={s * 0.02} fill={stroke} />
      {/* Mouth/muzzle line */}
      <line x1={s * 0.6} y1={-s * 0.56} x2={s * 0.64} y2={-s * 0.55}
        stroke={stroke} strokeWidth={sw * 0.7} strokeLinecap="round" />
      {/* Front left leg (forward) */}
      <path d={`M ${s * 0.22},${s * 0.1}
               L ${s * 0.28},${s * 0.55}
               L ${s * 0.34},${s * 0.55}
               L ${s * 0.34},${s * 0.52}
               L ${s * 0.28},${s * 0.1} Z`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.5} />
      {/* Front right leg (back position, walking) */}
      <path d={`M ${s * 0.15},${s * 0.1}
               L ${s * 0.05},${s * 0.55}
               L ${s * 0.11},${s * 0.55}
               L ${s * 0.11},${s * 0.52}
               L ${s * 0.2},${s * 0.1} Z`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.5} />
      {/* Rear left leg (forward) */}
      <path d={`M ${-s * 0.2},${s * 0.1}
               L ${-s * 0.12},${s * 0.55}
               L ${-s * 0.06},${s * 0.55}
               L ${-s * 0.06},${s * 0.52}
               L ${-s * 0.15},${s * 0.1} Z`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.5} />
      {/* Rear right leg (back position, walking) */}
      <path d={`M ${-s * 0.28},${s * 0.1}
               L ${-s * 0.38},${s * 0.55}
               L ${-s * 0.32},${s * 0.55}
               L ${-s * 0.32},${s * 0.52}
               L ${-s * 0.24},${s * 0.1} Z`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.5} />
      {/* Tail — thin, hanging down from rear */}
      <path d={`M ${-s * 0.4},${-s * 0.1}
               Q ${-s * 0.52},${s * 0.0} ${-s * 0.5},${s * 0.15}`}
        fill="none" stroke={stroke} strokeWidth={sw * 1.2} strokeLinecap="round" />
      {/* Tail tuft */}
      <ellipse cx={-s * 0.5} cy={s * 0.18} rx={s * 0.03} ry={s * 0.05}
        fill={color} stroke={stroke} strokeWidth={sw * 0.4} />
    </g>
  );
}

function CochonInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  // Pig / wild boar walking right — stocky body, short legs, snout, small curly tail
  const sw = s * 0.06;
  return (
    <g transform={`translate(${cx},${cy})`}>
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

function SqueletteInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  // Full human skeleton, front-facing, standing
  const sw = s * 0.045;
  const boneSw = s * 0.055;
  return (
    <g transform={`translate(${cx},${cy})`}>
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

function CiseauxInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  // Open scissors with two crossing blades and round finger holes
  // Mounted on a small blue ribbon behind
  const sw = s * 0.05;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Left blade — going from pivot (center) to upper-left */}
      <path d={`M 0,0
               L ${-s * 0.18},${-s * 0.7}
               L ${-s * 0.08},${-s * 0.68}
               L ${s * 0.02},0 Z`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.6} strokeLinejoin="round" />
      {/* Right blade — going from pivot (center) to upper-right */}
      <path d={`M 0,0
               L ${s * 0.18},${-s * 0.7}
               L ${s * 0.08},${-s * 0.68}
               L ${-s * 0.02},0 Z`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.6} strokeLinejoin="round" />

      {/* Pivot screw — small circle at the crossing point */}
      <circle cx={0} cy={0} r={s * 0.045}
        fill={stroke} stroke={color} strokeWidth={sw * 0.4} />

      {/* Left handle — from pivot down-left to finger hole */}
      <path d={`M ${-s * 0.01},${s * 0.02}
               L ${-s * 0.2},${s * 0.35}
               Q ${-s * 0.28},${s * 0.42} ${-s * 0.28},${s * 0.5}`}
        fill="none" stroke={color} strokeWidth={sw * 1.5} strokeLinecap="round" />
      {/* Left finger hole */}
      <circle cx={-s * 0.28} cy={s * 0.56} r={s * 0.12}
        fill="none" stroke={color} strokeWidth={sw * 1.2} />

      {/* Right handle — from pivot down-right to finger hole */}
      <path d={`M ${s * 0.01},${s * 0.02}
               L ${s * 0.2},${s * 0.35}
               Q ${s * 0.28},${s * 0.42} ${s * 0.28},${s * 0.5}`}
        fill="none" stroke={color} strokeWidth={sw * 1.5} strokeLinecap="round" />
      {/* Right finger hole */}
      <circle cx={s * 0.28} cy={s * 0.56} r={s * 0.12}
        fill="none" stroke={color} strokeWidth={sw * 1.2} />
    </g>
  );
}

/**
 * Batch 2 — Auto-attribués insigne SVG components (set 1).
 * Golden pin silhouettes for the faluche velours circulaire.
 * All components render centered on (cx, cy) at the given size.
 */

/** Camera — Appareil photo (amour de la photographie) */
function AppareilPhotoInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Camera body */}
      <rect x={-s * 0.8} y={-s * 0.4} width={s * 1.6} height={s * 1.0} rx={s * 0.12} ry={s * 0.12}
        fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Flash bump on top-left */}
      <rect x={-s * 0.6} y={-s * 0.65} width={s * 0.45} height={s * 0.28} rx={s * 0.06}
        fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Viewfinder bump top-center */}
      <rect x={-s * 0.12} y={-s * 0.55} width={s * 0.24} height={s * 0.18} rx={s * 0.04}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      {/* Lens outer ring */}
      <circle cx={0} cy={s * 0.08} r={s * 0.35} fill="none" stroke={stroke} strokeWidth={sw * 1.5} />
      {/* Lens inner circle */}
      <circle cx={0} cy={s * 0.08} r={s * 0.2} fill={stroke} stroke={stroke} strokeWidth={sw * 0.5} />
      {/* Lens highlight */}
      <circle cx={-s * 0.07} cy={0} r={s * 0.06} fill={color} opacity={0.6} />
    </g>
  );
}

/** Bust of Bacchus with hole — Bacchus troué (personne abstème) */
function BacchusTroueInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Neck / bust base */}
      <path d={`M ${-s * 0.35},${s * 0.85} Q ${-s * 0.3},${s * 0.45} ${-s * 0.2},${s * 0.3}
               L ${s * 0.2},${s * 0.3} Q ${s * 0.3},${s * 0.45} ${s * 0.35},${s * 0.85} Z`}
        fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Head */}
      <ellipse cx={0} cy={-s * 0.05} rx={s * 0.32} ry={s * 0.38} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Grape leaf crown — left */}
      <ellipse cx={-s * 0.3} cy={-s * 0.35} rx={s * 0.18} ry={s * 0.1}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7}
        transform={`rotate(-30,${-s * 0.3},${-s * 0.35})`} />
      {/* Grape leaf crown — right */}
      <ellipse cx={s * 0.3} cy={-s * 0.35} rx={s * 0.18} ry={s * 0.1}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7}
        transform={`rotate(30,${s * 0.3},${-s * 0.35})`} />
      {/* Grape leaf crown — top */}
      <ellipse cx={0} cy={-s * 0.5} rx={s * 0.15} ry={s * 0.1}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      {/* Small grape clusters */}
      <circle cx={-s * 0.18} cy={-s * 0.48} r={s * 0.05} fill={color} stroke={stroke} strokeWidth={sw * 0.5} />
      <circle cx={s * 0.18} cy={-s * 0.48} r={s * 0.05} fill={color} stroke={stroke} strokeWidth={sw * 0.5} />
      {/* Eyes */}
      <circle cx={-s * 0.12} cy={-s * 0.1} r={s * 0.04} fill={stroke} />
      <circle cx={s * 0.12} cy={-s * 0.1} r={s * 0.04} fill={stroke} />
      {/* Nose */}
      <line x1={0} y1={-s * 0.05} x2={0} y2={s * 0.08} stroke={stroke} strokeWidth={sw * 0.8} strokeLinecap="round" />
      {/* Mouth — slight smile */}
      <path d={`M ${-s * 0.08},${s * 0.15} Q 0,${s * 0.22} ${s * 0.08},${s * 0.15}`}
        fill="none" stroke={stroke} strokeWidth={sw * 0.8} />
      {/* Hole through chest */}
      <circle cx={0} cy={s * 0.58} r={s * 0.12} fill="#222" stroke={stroke} strokeWidth={sw} />
    </g>
  );
}

/** Corinthian helmet — Casque de Périclès (amour de l'Histoire) */
function CasquePericlesInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Helmet dome */}
      <path d={`M ${-s * 0.4},${s * 0.3}
               Q ${-s * 0.45},${-s * 0.1} ${-s * 0.3},${-s * 0.45}
               Q ${-s * 0.1},${-s * 0.7} ${s * 0.1},${-s * 0.7}
               Q ${s * 0.3},${-s * 0.45} ${s * 0.45},${-s * 0.1}
               Q ${s * 0.4},${s * 0.3} ${s * 0.35},${s * 0.55}
               L ${s * 0.25},${s * 0.55}
               Q ${s * 0.2},${s * 0.2} ${s * 0.08},${s * 0.0}
               L ${s * 0.08},${s * 0.55}
               L ${-s * 0.08},${s * 0.55}
               L ${-s * 0.08},${s * 0.0}
               Q ${-s * 0.2},${s * 0.2} ${-s * 0.25},${s * 0.55}
               L ${-s * 0.35},${s * 0.55}
               Z`}
        fill={color} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      {/* Nose guard */}
      <line x1={0} y1={-s * 0.15} x2={0} y2={s * 0.35} stroke={stroke} strokeWidth={sw * 1.2} strokeLinecap="round" />
      {/* Crest base */}
      <path d={`M ${-s * 0.08},${-s * 0.7}
               Q 0,${-s * 0.95} ${s * 0.08},${-s * 0.7}`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.8} />
      {/* Crest plume */}
      <path d={`M 0,${-s * 0.9}
               Q ${s * 0.15},${-s * 0.75} ${s * 0.2},${-s * 0.5}
               Q ${s * 0.18},${-s * 0.3} ${s * 0.25},${-s * 0.1}
               Q ${s * 0.15},${-s * 0.25} ${s * 0.1},${-s * 0.5}
               Q ${s * 0.05},${-s * 0.7} 0,${-s * 0.9} Z`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      {/* Eye slit accent */}
      <ellipse cx={-s * 0.2} cy={s * 0.1} rx={s * 0.08} ry={s * 0.12} fill="none" stroke={stroke} strokeWidth={sw * 0.5} />
      <ellipse cx={s * 0.2} cy={s * 0.1} rx={s * 0.08} ry={s * 0.12} fill="none" stroke={stroke} strokeWidth={sw * 0.5} />
    </g>
  );
}

/** Beer mug — Chope de bière (amour de la bonne bière) */
function ChopeBiereInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Mug body */}
      <rect x={-s * 0.45} y={-s * 0.35} width={s * 0.8} height={s * 1.1} rx={s * 0.06}
        fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Handle */}
      <path d={`M ${s * 0.35},${-s * 0.15}
               Q ${s * 0.7},${-s * 0.1} ${s * 0.7},${s * 0.2}
               Q ${s * 0.7},${s * 0.5} ${s * 0.35},${s * 0.5}`}
        fill="none" stroke={stroke} strokeWidth={sw * 1.5} strokeLinecap="round" />
      {/* Foam top — wavy line */}
      <path d={`M ${-s * 0.5},${-s * 0.35}
               Q ${-s * 0.35},${-s * 0.6} ${-s * 0.15},${-s * 0.4}
               Q 0,${-s * 0.55} ${s * 0.15},${-s * 0.4}
               Q ${s * 0.3},${-s * 0.58} ${s * 0.4},${-s * 0.38}`}
        fill={color} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      {/* Foam blob top */}
      <ellipse cx={-s * 0.15} cy={-s * 0.48} rx={s * 0.18} ry={s * 0.12} fill={color} stroke={stroke} strokeWidth={sw * 0.6} />
      <ellipse cx={s * 0.15} cy={-s * 0.47} rx={s * 0.16} ry={s * 0.11} fill={color} stroke={stroke} strokeWidth={sw * 0.6} />
      {/* Mug decoration lines */}
      <line x1={-s * 0.35} y1={s * 0.0} x2={s * 0.25} y2={s * 0.0} stroke={stroke} strokeWidth={sw * 0.5} />
      <line x1={-s * 0.35} y1={s * 0.35} x2={s * 0.25} y2={s * 0.35} stroke={stroke} strokeWidth={sw * 0.5} />
    </g>
  );
}

/** Owl — Chouette (oiseau de nuit) */
function ChouetteInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Body */}
      <path d={`M ${-s * 0.3},${-s * 0.1}
               Q ${-s * 0.4},${s * 0.15} ${-s * 0.25},${s * 0.6}
               Q ${-s * 0.1},${s * 0.8} 0,${s * 0.8}
               Q ${s * 0.1},${s * 0.8} ${s * 0.25},${s * 0.6}
               Q ${s * 0.4},${s * 0.15} ${s * 0.3},${-s * 0.1} Z`}
        fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Head */}
      <ellipse cx={0} cy={-s * 0.2} rx={s * 0.38} ry={s * 0.3} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Left ear tuft */}
      <polygon points={`${-s * 0.3},${-s * 0.35} ${-s * 0.42},${-s * 0.75} ${-s * 0.15},${-s * 0.4}`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7} strokeLinejoin="round" />
      {/* Right ear tuft */}
      <polygon points={`${s * 0.3},${-s * 0.35} ${s * 0.42},${-s * 0.75} ${s * 0.15},${-s * 0.4}`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7} strokeLinejoin="round" />
      {/* Left eye outer */}
      <circle cx={-s * 0.15} cy={-s * 0.2} r={s * 0.16} fill="none" stroke={stroke} strokeWidth={sw} />
      {/* Right eye outer */}
      <circle cx={s * 0.15} cy={-s * 0.2} r={s * 0.16} fill="none" stroke={stroke} strokeWidth={sw} />
      {/* Left pupil */}
      <circle cx={-s * 0.15} cy={-s * 0.2} r={s * 0.07} fill={stroke} />
      {/* Right pupil */}
      <circle cx={s * 0.15} cy={-s * 0.2} r={s * 0.07} fill={stroke} />
      {/* Beak */}
      <polygon points={`${-s * 0.05},${-s * 0.05} 0,${s * 0.08} ${s * 0.05},${-s * 0.05}`}
        fill={stroke} stroke={stroke} strokeWidth={sw * 0.3} strokeLinejoin="round" />
      {/* Feet */}
      <line x1={-s * 0.12} y1={s * 0.78} x2={-s * 0.18} y2={s * 0.9} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      <line x1={s * 0.12} y1={s * 0.78} x2={s * 0.18} y2={s * 0.9} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
    </g>
  );
}

/** Wheat ear — Épi de blé (radin) */
function EpiDeBleInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  // Kernels alternate left and right along the stem
  const kernels: React.JSX.Element[] = [];
  const numPairs = 5;
  for (let i = 0; i < numPairs; i++) {
    const yPos = s * 0.5 - i * s * 0.2;
    const xOff = s * 0.14;
    // Left kernel
    kernels.push(
      <ellipse key={`kl${i}`}
        cx={-xOff} cy={yPos} rx={s * 0.1} ry={s * 0.06}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7}
        transform={`rotate(30,${-xOff},${yPos})`} />
    );
    // Right kernel
    kernels.push(
      <ellipse key={`kr${i}`}
        cx={xOff} cy={yPos} rx={s * 0.1} ry={s * 0.06}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7}
        transform={`rotate(-30,${xOff},${yPos})`} />
    );
  }
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Stem */}
      <line x1={0} y1={s * 0.9} x2={0} y2={-s * 0.55} stroke={stroke} strokeWidth={sw * 1.2} strokeLinecap="round" />
      {/* Kernels */}
      {kernels}
      {/* Top awns */}
      <line x1={0} y1={-s * 0.55} x2={-s * 0.1} y2={-s * 0.8} stroke={stroke} strokeWidth={sw * 0.7} strokeLinecap="round" />
      <line x1={0} y1={-s * 0.55} x2={s * 0.1} y2={-s * 0.8} stroke={stroke} strokeWidth={sw * 0.7} strokeLinecap="round" />
      <line x1={0} y1={-s * 0.55} x2={0} y2={-s * 0.85} stroke={stroke} strokeWidth={sw * 0.7} strokeLinecap="round" />
    </g>
  );
}

/** Wheat ear crossed with sickle — Épi de blé croisé faucille (chanceux aux examens) */
function EpiFaucilleInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  // Wheat kernels (same as EpiDeBle, slightly offset right)
  const kernels: React.JSX.Element[] = [];
  const numPairs = 5;
  const wheatX = s * 0.1;
  for (let i = 0; i < numPairs; i++) {
    const yPos = s * 0.45 - i * s * 0.19;
    const xOff = s * 0.12;
    kernels.push(
      <ellipse key={`kl${i}`}
        cx={wheatX - xOff} cy={yPos} rx={s * 0.08} ry={s * 0.05}
        fill={color} stroke={stroke} strokeWidth={sw * 0.6}
        transform={`rotate(30,${wheatX - xOff},${yPos})`} />
    );
    kernels.push(
      <ellipse key={`kr${i}`}
        cx={wheatX + xOff} cy={yPos} rx={s * 0.08} ry={s * 0.05}
        fill={color} stroke={stroke} strokeWidth={sw * 0.6}
        transform={`rotate(-30,${wheatX + xOff},${yPos})`} />
    );
  }
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Wheat stem */}
      <line x1={wheatX} y1={s * 0.85} x2={wheatX} y2={-s * 0.5}
        stroke={stroke} strokeWidth={sw * 1.1} strokeLinecap="round" />
      {/* Wheat kernels */}
      {kernels}
      {/* Wheat awns */}
      <line x1={wheatX} y1={-s * 0.5} x2={wheatX - s * 0.08} y2={-s * 0.72} stroke={stroke} strokeWidth={sw * 0.6} strokeLinecap="round" />
      <line x1={wheatX} y1={-s * 0.5} x2={wheatX + s * 0.08} y2={-s * 0.72} stroke={stroke} strokeWidth={sw * 0.6} strokeLinecap="round" />
      <line x1={wheatX} y1={-s * 0.5} x2={wheatX} y2={-s * 0.78} stroke={stroke} strokeWidth={sw * 0.6} strokeLinecap="round" />
      {/* Sickle — curved blade crossing the wheat */}
      <path d={`M ${-s * 0.55},${-s * 0.35}
               Q ${-s * 0.4},${-s * 0.65} ${s * 0.1},${-s * 0.6}
               Q ${s * 0.4},${-s * 0.5} ${s * 0.5},${-s * 0.2}
               Q ${s * 0.3},${-s * 0.4} ${s * 0.0},${-s * 0.42}
               Q ${-s * 0.25},${-s * 0.45} ${-s * 0.55},${-s * 0.35} Z`}
        fill={color} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      {/* Sickle handle */}
      <rect x={-s * 0.65} y={-s * 0.4} width={s * 0.15} height={s * 0.35} rx={s * 0.04}
        fill={color} stroke={stroke} strokeWidth={sw * 0.8} />
    </g>
  );
}

/** Star with lightning bolt — Étoile et foudre perso (amour des nouvelles technologies)
 * Personal velours version: a single prominent zigzag bolt through the star. */
function EtoileFoudrePersoInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  // 5-pointed star
  const pts: string[] = [];
  const outerR = s * 0.85;
  const innerR = outerR * 0.4;
  for (let i = 0; i < 5; i++) {
    const oA = ((i * 72 - 90) * Math.PI) / 180;
    const iA = ((i * 72 + 36 - 90) * Math.PI) / 180;
    pts.push(`${outerR * Math.cos(oA)},${outerR * Math.sin(oA)}`);
    pts.push(`${innerR * Math.cos(iA)},${innerR * Math.sin(iA)}`);
  }
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Star */}
      <polygon points={pts.join(' ')}
        fill={color} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      {/* Lightning bolt through center */}
      <polygon
        points={`${s * 0.08},${-s * 0.7}
                 ${-s * 0.15},${-s * 0.08}
                 ${s * 0.05},${-s * 0.08}
                 ${-s * 0.08},${s * 0.7}
                 ${s * 0.15},${s * 0.08}
                 ${-s * 0.05},${s * 0.08}`}
        fill={stroke} stroke={stroke} strokeWidth={sw * 0.5} strokeLinejoin="miter" />
    </g>
  );
}

/** Horseshoe — Fer à cheval (chanceux) */
function FerAChevalInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* U-shape opening upward */}
      <path d={`M ${-s * 0.45},${-s * 0.7}
               L ${-s * 0.45},${s * 0.1}
               Q ${-s * 0.45},${s * 0.8} 0,${s * 0.8}
               Q ${s * 0.45},${s * 0.8} ${s * 0.45},${s * 0.1}
               L ${s * 0.45},${-s * 0.7}
               L ${s * 0.28},${-s * 0.7}
               L ${s * 0.28},${s * 0.1}
               Q ${s * 0.28},${s * 0.6} 0,${s * 0.6}
               Q ${-s * 0.28},${s * 0.6} ${-s * 0.28},${s * 0.1}
               L ${-s * 0.28},${-s * 0.7} Z`}
        fill={color} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      {/* Nail holes along the outer curve */}
      <circle cx={-s * 0.36} cy={-s * 0.35} r={s * 0.05} fill={stroke} />
      <circle cx={-s * 0.36} cy={s * 0.05} r={s * 0.05} fill={stroke} />
      <circle cx={-s * 0.28} cy={s * 0.4} r={s * 0.05} fill={stroke} />
      <circle cx={0} cy={s * 0.62} r={s * 0.05} fill={stroke} />
      <circle cx={s * 0.28} cy={s * 0.4} r={s * 0.05} fill={stroke} />
      <circle cx={s * 0.36} cy={s * 0.05} r={s * 0.05} fill={stroke} />
      <circle cx={s * 0.36} cy={-s * 0.35} r={s * 0.05} fill={stroke} />
      {/* End caps */}
      <circle cx={-s * 0.36} cy={-s * 0.7} r={s * 0.09} fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      <circle cx={s * 0.36} cy={-s * 0.7} r={s * 0.09} fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
    </g>
  );
}

/** Grape vine leaf — Feuille de vigne (perte de la virginité) */
function FeuilleVigneInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Stem */}
      <path d={`M 0,${s * 0.5} Q ${s * 0.05},${s * 0.75} ${s * 0.15},${s * 0.9}`}
        fill="none" stroke={stroke} strokeWidth={sw * 1.2} strokeLinecap="round" />
      {/* 5-lobed leaf shape with serrated edges */}
      <path d={`
        M 0,${-s * 0.8}
        Q ${s * 0.1},${-s * 0.65} ${s * 0.15},${-s * 0.55}
        Q ${s * 0.08},${-s * 0.5} ${s * 0.2},${-s * 0.4}
        Q ${s * 0.35},${-s * 0.55} ${s * 0.55},${-s * 0.55}
        Q ${s * 0.5},${-s * 0.4} ${s * 0.55},${-s * 0.25}
        Q ${s * 0.45},${-s * 0.2} ${s * 0.6},${-s * 0.05}
        Q ${s * 0.75},${-s * 0.15} ${s * 0.85},${-s * 0.1}
        Q ${s * 0.75},${s * 0.05} ${s * 0.65},${s * 0.1}
        Q ${s * 0.55},${s * 0.0} ${s * 0.5},${s * 0.15}
        Q ${s * 0.4},${s * 0.08} ${s * 0.3},${s * 0.2}
        Q ${s * 0.35},${s * 0.35} ${s * 0.25},${s * 0.45}
        Q ${s * 0.15},${s * 0.4} ${s * 0.05},${s * 0.5}
        Q 0,${s * 0.55} ${-s * 0.05},${s * 0.5}
        Q ${-s * 0.15},${s * 0.4} ${-s * 0.25},${s * 0.45}
        Q ${-s * 0.35},${s * 0.35} ${-s * 0.3},${s * 0.2}
        Q ${-s * 0.4},${s * 0.08} ${-s * 0.5},${s * 0.15}
        Q ${-s * 0.55},${s * 0.0} ${-s * 0.65},${s * 0.1}
        Q ${-s * 0.75},${s * 0.05} ${-s * 0.85},${-s * 0.1}
        Q ${-s * 0.75},${-s * 0.15} ${-s * 0.6},${-s * 0.05}
        Q ${-s * 0.45},${-s * 0.2} ${-s * 0.55},${-s * 0.25}
        Q ${-s * 0.5},${-s * 0.4} ${-s * 0.55},${-s * 0.55}
        Q ${-s * 0.35},${-s * 0.55} ${-s * 0.2},${-s * 0.4}
        Q ${-s * 0.08},${-s * 0.5} ${-s * 0.15},${-s * 0.55}
        Q ${-s * 0.1},${-s * 0.65} 0,${-s * 0.8} Z`}
        fill={color} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      {/* Central vein */}
      <line x1={0} y1={-s * 0.65} x2={0} y2={s * 0.5} stroke={stroke} strokeWidth={sw * 0.7} />
      {/* Left veins */}
      <line x1={0} y1={-s * 0.25} x2={-s * 0.5} y2={-s * 0.4} stroke={stroke} strokeWidth={sw * 0.5} />
      <line x1={0} y1={s * 0.05} x2={-s * 0.55} y2={s * 0.0} stroke={stroke} strokeWidth={sw * 0.5} />
      <line x1={0} y1={s * 0.25} x2={-s * 0.2} y2={s * 0.4} stroke={stroke} strokeWidth={sw * 0.5} />
      {/* Right veins */}
      <line x1={0} y1={-s * 0.25} x2={s * 0.5} y2={-s * 0.4} stroke={stroke} strokeWidth={sw * 0.5} />
      <line x1={0} y1={s * 0.05} x2={s * 0.55} y2={s * 0.0} stroke={stroke} strokeWidth={sw * 0.5} />
      <line x1={0} y1={s * 0.25} x2={s * 0.2} y2={s * 0.4} stroke={stroke} strokeWidth={sw * 0.5} />
    </g>
  );
}

/**
 * Batch 3 auto-generated SVG insigne components for the faluche simulator.
 * Golden silhouette pins on black velvet. Readable at ~25px.
 */

/** Fork — fourchette (repas, gastronomie) */
function FourchetteInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = s * 0.06;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Handle */}
      <line x1={0} y1={s * 0.9} x2={0} y2={-s * 0.1} stroke={color} strokeWidth={s * 0.14} strokeLinecap="round" />
      {/* Tine base (crossbar area) */}
      <rect x={-s * 0.25} y={-s * 0.15} width={s * 0.5} height={s * 0.12} rx={s * 0.03} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* 4 tines */}
      {[-0.2, -0.067, 0.067, 0.2].map((xOff, i) => (
        <line
          key={i}
          x1={s * xOff}
          y1={-s * 0.15}
          x2={s * (xOff * 1.15)}
          y2={-s * 0.85}
          stroke={color}
          strokeWidth={s * 0.09}
          strokeLinecap="round"
        />
      ))}
      {/* Outline strokes for depth */}
      <line x1={0} y1={s * 0.9} x2={0} y2={-s * 0.1} stroke={stroke} strokeWidth={s * 0.14} strokeLinecap="round" opacity={0.3} />
    </g>
  );
}

/** Globe on green ribbon — globe terrestre (voyages, international) */
function GlobeVertInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = s * 0.06;
  const gr = s * 0.42; // globe radius
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Green ribbon below */}
      <rect x={-s * 0.12} y={s * 0.15} width={s * 0.24} height={s * 0.75} rx={s * 0.04} fill="#228B22" stroke="#1A6B1A" strokeWidth={sw * 0.8} />
      {/* Globe circle */}
      <circle cx={0} cy={-s * 0.2} r={gr} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Equator */}
      <ellipse cx={0} cy={-s * 0.2} rx={gr} ry={gr * 0.3} fill="none" stroke={stroke} strokeWidth={sw * 0.7} />
      {/* Prime meridian */}
      <ellipse cx={0} cy={-s * 0.2} rx={gr * 0.3} ry={gr} fill="none" stroke={stroke} strokeWidth={sw * 0.7} />
      {/* Latitude lines */}
      <ellipse cx={0} cy={-s * 0.2 - gr * 0.5} rx={gr * 0.72} ry={gr * 0.18} fill="none" stroke={stroke} strokeWidth={sw * 0.5} />
      <ellipse cx={0} cy={-s * 0.2 + gr * 0.5} rx={gr * 0.72} ry={gr * 0.18} fill="none" stroke={stroke} strokeWidth={sw * 0.5} />
    </g>
  );
}

/** Grape cluster — grappe de raisin (oenologie, vendanges) */
function GrappeRaisinInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = s * 0.06;
  const gr = s * 0.135; // grape radius

  // Triangular arrangement of grapes: rows of 4, 3, 2, 1
  const grapes: [number, number][] = [];
  const rows = [
    { count: 4, y: -s * 0.15 },
    { count: 3, y: s * 0.1 },
    { count: 2, y: s * 0.35 },
    { count: 1, y: s * 0.58 },
  ];
  for (const row of rows) {
    const startX = -(row.count - 1) * gr;
    for (let i = 0; i < row.count; i++) {
      grapes.push([startX + i * gr * 2, row.y]);
    }
  }

  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Stem */}
      <line x1={0} y1={-s * 0.15} x2={0} y2={-s * 0.55} stroke={stroke} strokeWidth={s * 0.06} strokeLinecap="round" />
      {/* Leaf */}
      <path
        d={`M 0,${-s * 0.5} Q ${s * 0.25},${-s * 0.75} ${s * 0.35},${-s * 0.55}
            Q ${s * 0.2},${-s * 0.5} ${s * 0.1},${-s * 0.6}
            Q ${s * 0.05},${-s * 0.45} 0,${-s * 0.5} Z`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7}
      />
      {/* Grapes */}
      {grapes.map(([gx, gy], i) => (
        <circle key={i} cx={gx} cy={gy} r={gr} fill={color} stroke={stroke} strokeWidth={sw * 0.6} />
      ))}
    </g>
  );
}

/** Lyre — lyre / harpe (musique, arts) */
function LyreInsignePerso({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = s * 0.06;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Base */}
      <ellipse cx={0} cy={s * 0.65} rx={s * 0.25} ry={s * 0.12} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Left arm */}
      <path
        d={`M ${-s * 0.2},${s * 0.55} Q ${-s * 0.45},${s * 0.1} ${-s * 0.4},${-s * 0.3}
            Q ${-s * 0.35},${-s * 0.65} ${-s * 0.15},${-s * 0.8}
            Q 0,${-s * 0.88} ${s * 0.05},${-s * 0.75}`}
        fill="none" stroke={color} strokeWidth={s * 0.1} strokeLinecap="round"
      />
      {/* Right arm */}
      <path
        d={`M ${s * 0.2},${s * 0.55} Q ${s * 0.45},${s * 0.1} ${s * 0.4},${-s * 0.3}
            Q ${s * 0.35},${-s * 0.65} ${s * 0.15},${-s * 0.8}
            Q 0,${-s * 0.88} ${-s * 0.05},${-s * 0.75}`}
        fill="none" stroke={color} strokeWidth={s * 0.1} strokeLinecap="round"
      />
      {/* Crossbar near top */}
      <line x1={-s * 0.32} y1={-s * 0.35} x2={s * 0.32} y2={-s * 0.35} stroke={color} strokeWidth={s * 0.08} strokeLinecap="round" />
      {/* Strings (4) */}
      {[-0.15, -0.05, 0.05, 0.15].map((xOff, i) => (
        <line
          key={i}
          x1={s * xOff}
          y1={-s * 0.35}
          x2={s * xOff * 0.8}
          y2={s * 0.55}
          stroke={stroke}
          strokeWidth={s * 0.03}
        />
      ))}
    </g>
  );
}

/** Comedy mask — masque de comédie (théâtre) */
function MasqueComedieInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = s * 0.06;
  return (
    <g transform={`translate(${cx},${cy}) rotate(5)`}>
      {/* Mask outline — slightly wider at top, narrower chin */}
      <path
        d={`M ${-s * 0.55},${-s * 0.3}
            Q ${-s * 0.6},${-s * 0.7} 0,${-s * 0.75}
            Q ${s * 0.6},${-s * 0.7} ${s * 0.55},${-s * 0.3}
            Q ${s * 0.5},${s * 0.15} ${s * 0.3},${s * 0.4}
            Q 0,${s * 0.7} ${-s * 0.3},${s * 0.4}
            Q ${-s * 0.5},${s * 0.15} ${-s * 0.55},${-s * 0.3} Z`}
        fill={color} stroke={stroke} strokeWidth={sw}
      />
      {/* Left eye hole */}
      <ellipse cx={-s * 0.22} cy={-s * 0.25} rx={s * 0.13} ry={s * 0.1} fill="#333" stroke={stroke} strokeWidth={sw * 0.5} />
      {/* Right eye hole */}
      <ellipse cx={s * 0.22} cy={-s * 0.25} rx={s * 0.13} ry={s * 0.1} fill="#333" stroke={stroke} strokeWidth={sw * 0.5} />
      {/* Exaggerated smile — wide grin curving upward */}
      <path
        d={`M ${-s * 0.35},${s * 0.05}
            Q ${-s * 0.15},${s * 0.45} 0,${s * 0.35}
            Q ${s * 0.15},${s * 0.45} ${s * 0.35},${s * 0.05}`}
        fill="#333" stroke={stroke} strokeWidth={sw * 0.5}
      />
      {/* Eyebrow arches */}
      <path d={`M ${-s * 0.35},${-s * 0.4} Q ${-s * 0.22},${-s * 0.55} ${-s * 0.1},${-s * 0.4}`}
        fill="none" stroke={stroke} strokeWidth={sw * 0.8} strokeLinecap="round" />
      <path d={`M ${s * 0.1},${-s * 0.4} Q ${s * 0.22},${-s * 0.55} ${s * 0.35},${-s * 0.4}`}
        fill="none" stroke={stroke} strokeWidth={sw * 0.8} strokeLinecap="round" />
    </g>
  );
}

/** Artist palette — palette de peintre (beaux-arts) */
function PaletteInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = s * 0.06;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Palette shape — kidney / bean shape */}
      <path
        d={`M ${-s * 0.1},${-s * 0.6}
            Q ${s * 0.5},${-s * 0.75} ${s * 0.65},${-s * 0.25}
            Q ${s * 0.7},${s * 0.15} ${s * 0.45},${s * 0.5}
            Q ${s * 0.15},${s * 0.7} ${-s * 0.25},${s * 0.6}
            Q ${-s * 0.6},${s * 0.5} ${-s * 0.7},${s * 0.1}
            Q ${-s * 0.7},${-s * 0.3} ${-s * 0.1},${-s * 0.6} Z`}
        fill={color} stroke={stroke} strokeWidth={sw}
      />
      {/* Thumb hole */}
      <ellipse cx={-s * 0.25} cy={s * 0.15} rx={s * 0.13} ry={s * 0.11} fill="#333" stroke={stroke} strokeWidth={sw * 0.6} />
      {/* Paint blobs */}
      <circle cx={s * 0.1} cy={-s * 0.35} r={s * 0.09} fill="#D42020" />
      <circle cx={s * 0.35} cy={-s * 0.15} r={s * 0.08} fill="#2060D4" />
      <circle cx={s * 0.15} cy={s * 0.15} r={s * 0.07} fill="#20A040" />
      <circle cx={s * 0.4} cy={s * 0.2} r={s * 0.07} fill="#E0E020" />
    </g>
  );
}

/** Hangman / hanged person — pendu (jeu du pendu, bizutage) */
function PenduInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = s * 0.06;
  // Gallows offset to the left, figure hangs from the right
  const gx = -s * 0.35; // base of the vertical post
  const gy = s * 0.8;   // bottom of the post
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Gallows: vertical post */}
      <line x1={gx} y1={gy} x2={gx} y2={-s * 0.75} stroke={color} strokeWidth={s * 0.1} strokeLinecap="round" />
      {/* Gallows: horizontal bar */}
      <line x1={gx} y1={-s * 0.75} x2={s * 0.15} y2={-s * 0.75} stroke={color} strokeWidth={s * 0.1} strokeLinecap="round" />
      {/* Gallows: base */}
      <line x1={gx - s * 0.2} y1={gy} x2={gx + s * 0.25} y2={gy} stroke={color} strokeWidth={s * 0.1} strokeLinecap="round" />
      {/* Gallows: diagonal brace */}
      <line x1={gx} y1={-s * 0.5} x2={gx + s * 0.25} y2={-s * 0.75} stroke={color} strokeWidth={s * 0.06} strokeLinecap="round" />
      {/* Rope */}
      <line x1={s * 0.15} y1={-s * 0.75} x2={s * 0.15} y2={-s * 0.45} stroke={stroke} strokeWidth={s * 0.04} />
      {/* Stick figure: head */}
      <circle cx={s * 0.15} cy={-s * 0.33} r={s * 0.12} fill="none" stroke={color} strokeWidth={sw} />
      {/* Body */}
      <line x1={s * 0.15} y1={-s * 0.21} x2={s * 0.15} y2={s * 0.2} stroke={color} strokeWidth={sw} />
      {/* Left arm */}
      <line x1={s * 0.15} y1={-s * 0.08} x2={-s * 0.05} y2={s * 0.12} stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Right arm */}
      <line x1={s * 0.15} y1={-s * 0.08} x2={s * 0.35} y2={s * 0.12} stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Left leg */}
      <line x1={s * 0.15} y1={s * 0.2} x2={-s * 0.02} y2={s * 0.5} stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* Right leg */}
      <line x1={s * 0.15} y1={s * 0.2} x2={s * 0.32} y2={s * 0.5} stroke={color} strokeWidth={sw} strokeLinecap="round" />
    </g>
  );
}

/** Quill / feather — plume (écriture, lettres) */
function PlumeInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = s * 0.06;
  return (
    <g transform={`translate(${cx},${cy}) rotate(15)`}>
      {/* Feather body — elongated, slightly curved, with vane outline */}
      <path
        d={`M 0,${s * 0.85}
            Q ${-s * 0.02},${s * 0.5} ${-s * 0.03},${s * 0.2}
            Q ${-s * 0.18},${-s * 0.15} ${-s * 0.28},${-s * 0.5}
            Q ${-s * 0.2},${-s * 0.7} ${-s * 0.05},${-s * 0.85}
            Q ${s * 0.08},${-s * 0.7} ${s * 0.15},${-s * 0.45}
            Q ${s * 0.22},${-s * 0.15} ${s * 0.12},${s * 0.15}
            Q ${s * 0.05},${s * 0.5} 0,${s * 0.85} Z`}
        fill={color} stroke={stroke} strokeWidth={sw}
      />
      {/* Central rachis (shaft) */}
      <path
        d={`M 0,${s * 0.85} Q ${-s * 0.02},${s * 0.3} ${-s * 0.06},${-s * 0.2} Q ${-s * 0.08},${-s * 0.55} ${-s * 0.05},${-s * 0.85}`}
        fill="none" stroke={stroke} strokeWidth={sw * 0.8} strokeLinecap="round"
      />
      {/* Barb lines — left side */}
      <line x1={-s * 0.06} y1={-s * 0.1} x2={-s * 0.22} y2={-s * 0.25} stroke={stroke} strokeWidth={sw * 0.4} />
      <line x1={-s * 0.07} y1={-s * 0.35} x2={-s * 0.23} y2={-s * 0.52} stroke={stroke} strokeWidth={sw * 0.4} />
      <line x1={-s * 0.04} y1={s * 0.1} x2={-s * 0.16} y2={-s * 0.02} stroke={stroke} strokeWidth={sw * 0.4} />
      {/* Barb lines — right side */}
      <line x1={-s * 0.04} y1={-s * 0.05} x2={s * 0.12} y2={-s * 0.18} stroke={stroke} strokeWidth={sw * 0.4} />
      <line x1={-s * 0.06} y1={-s * 0.3} x2={s * 0.1} y2={-s * 0.45} stroke={stroke} strokeWidth={sw * 0.4} />
      <line x1={-s * 0.02} y1={s * 0.15} x2={s * 0.1} y2={s * 0.05} stroke={stroke} strokeWidth={sw * 0.4} />
      {/* Quill nib at bottom */}
      <path
        d={`M ${-s * 0.02},${s * 0.75} L 0,${s * 0.92} L ${s * 0.02},${s * 0.75}`}
        fill={stroke} stroke={stroke} strokeWidth={sw * 0.3}
      />
    </g>
  );
}

/** Sphinx — sphinx égyptien (sagesse, énigme) */
function SphinxInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = s * 0.06;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Recumbent lion body — lying down, facing right */}
      <path
        d={`M ${-s * 0.75},${s * 0.15}
            Q ${-s * 0.7},${-s * 0.1} ${-s * 0.4},${-s * 0.15}
            L ${-s * 0.1},${-s * 0.15}
            L ${-s * 0.1},${-s * 0.3}
            Q ${s * 0.0},${-s * 0.32} ${s * 0.05},${-s * 0.15}
            L ${s * 0.2},${-s * 0.15}
            Q ${s * 0.25},${-s * 0.4} ${s * 0.3},${-s * 0.55}
            Q ${s * 0.35},${-s * 0.65} ${s * 0.32},${-s * 0.75}
            Q ${s * 0.45},${-s * 0.75} ${s * 0.45},${-s * 0.55}
            Q ${s * 0.45},${-s * 0.35} ${s * 0.35},${-s * 0.15}
            L ${s * 0.55},${-s * 0.15}
            Q ${s * 0.75},${-s * 0.1} ${s * 0.75},${s * 0.1}
            L ${s * 0.75},${s * 0.35}
            L ${s * 0.6},${s * 0.35}
            L ${s * 0.6},${s * 0.15}
            L ${s * 0.15},${s * 0.15}
            L ${s * 0.15},${s * 0.35}
            L ${s * 0.0},${s * 0.35}
            L ${s * 0.0},${s * 0.15}
            L ${-s * 0.45},${s * 0.15}
            L ${-s * 0.45},${s * 0.35}
            L ${-s * 0.6},${s * 0.35}
            L ${-s * 0.6},${s * 0.15}
            L ${-s * 0.75},${s * 0.15} Z`}
        fill={color} stroke={stroke} strokeWidth={sw}
        strokeLinejoin="round"
      />
      {/* Nemes headdress lines on head */}
      <line x1={s * 0.35} y1={-s * 0.6} x2={s * 0.28} y2={-s * 0.25} stroke={stroke} strokeWidth={sw * 0.5} />
      <line x1={s * 0.42} y1={-s * 0.6} x2={s * 0.38} y2={-s * 0.25} stroke={stroke} strokeWidth={sw * 0.5} />
      {/* Eye */}
      <circle cx={s * 0.42} cy={-s * 0.5} r={s * 0.03} fill="#333" />
      {/* Tail curving up at back */}
      <path
        d={`M ${-s * 0.7},${s * 0.1} Q ${-s * 0.85},${-s * 0.1} ${-s * 0.75},${-s * 0.3}
            Q ${-s * 0.65},${-s * 0.45} ${-s * 0.6},${-s * 0.35}`}
        fill="none" stroke={color} strokeWidth={sw * 1.2} strokeLinecap="round"
      />
    </g>
  );
}

/**
 * Batch 4: Partenaire insignes (4) + Grand Maitre insignes (7)
 * Golden silhouette pins for the faluche simulator.
 */

// --- Partenaire (4) ---

/** Sword — Epee */
function EpeeInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Blade — long narrow tapered shape */}
      <path
        d={`M 0,${-s * 0.95}
            L ${s * 0.06},${-s * 0.8}
            L ${s * 0.05},${s * 0.2}
            L 0,${s * 0.3}
            L ${-s * 0.05},${s * 0.2}
            L ${-s * 0.06},${-s * 0.8} Z`}
        fill={color} stroke={stroke} strokeWidth={sw}
      />
      {/* Fuller (central line on blade) */}
      <line x1={0} y1={-s * 0.85} x2={0} y2={s * 0.15} stroke={stroke} strokeWidth={sw * 0.7} opacity={0.5} />
      {/* Crossguard */}
      <rect x={-s * 0.3} y={s * 0.25} width={s * 0.6} height={s * 0.1} rx={s * 0.03} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Grip */}
      <rect x={-s * 0.06} y={s * 0.35} width={s * 0.12} height={s * 0.35} rx={s * 0.02} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Grip wrapping lines */}
      <line x1={-s * 0.06} y1={s * 0.42} x2={s * 0.06} y2={s * 0.42} stroke={stroke} strokeWidth={sw * 0.6} />
      <line x1={-s * 0.06} y1={s * 0.50} x2={s * 0.06} y2={s * 0.50} stroke={stroke} strokeWidth={sw * 0.6} />
      <line x1={-s * 0.06} y1={s * 0.58} x2={s * 0.06} y2={s * 0.58} stroke={stroke} strokeWidth={sw * 0.6} />
      {/* Pommel */}
      <circle cx={0} cy={s * 0.78} r={s * 0.1} fill={color} stroke={stroke} strokeWidth={sw} />
    </g>
  );
}

/** Arrow — Fleche */
function FlecheInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Shaft */}
      <line x1={0} y1={-s * 0.5} x2={0} y2={s * 0.85} stroke={color} strokeWidth={s * 0.08} strokeLinecap="round" />
      {/* Arrowhead at top */}
      <path
        d={`M 0,${-s * 0.95}
            L ${s * 0.18},${-s * 0.5}
            L ${s * 0.06},${-s * 0.5}
            L ${s * 0.06},${-s * 0.4}
            L ${-s * 0.06},${-s * 0.4}
            L ${-s * 0.06},${-s * 0.5}
            L ${-s * 0.18},${-s * 0.5} Z`}
        fill={color} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"
      />
      {/* Fletching — left feather */}
      <path
        d={`M 0,${s * 0.55} Q ${-s * 0.2},${s * 0.65} ${-s * 0.15},${s * 0.85}
            Q ${-s * 0.05},${s * 0.75} 0,${s * 0.85}`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7}
      />
      {/* Fletching — right feather */}
      <path
        d={`M 0,${s * 0.55} Q ${s * 0.2},${s * 0.65} ${s * 0.15},${s * 0.85}
            Q ${s * 0.05},${s * 0.75} 0,${s * 0.85}`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7}
      />
      {/* Nock at bottom */}
      <line x1={-s * 0.05} y1={s * 0.9} x2={s * 0.05} y2={s * 0.9} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
    </g>
  );
}

/** Metal file / rasp — Lime */
function LimeInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* File body — long rectangle, slightly tapered toward top */}
      <path
        d={`M ${-s * 0.1},${-s * 0.9}
            L ${s * 0.1},${-s * 0.9}
            L ${s * 0.14},${s * 0.25}
            L ${-s * 0.14},${s * 0.25} Z`}
        fill={color} stroke={stroke} strokeWidth={sw}
      />
      {/* Crosshatch texture on file surface */}
      {[-0.75, -0.55, -0.35, -0.15, 0.05].map((yFrac, i) => {
        const y = s * yFrac;
        const widthAtY = s * (0.1 + 0.04 * ((yFrac + 0.9) / 1.15));
        return (
          <g key={i}>
            {/* Diagonal lines left-to-right */}
            <line x1={-widthAtY} y1={y} x2={widthAtY} y2={y + s * 0.12} stroke={stroke} strokeWidth={sw * 0.5} opacity={0.6} />
            <line x1={-widthAtY} y1={y + s * 0.12} x2={widthAtY} y2={y} stroke={stroke} strokeWidth={sw * 0.5} opacity={0.6} />
          </g>
        );
      })}
      {/* Tang (narrowing to handle) */}
      <path
        d={`M ${-s * 0.14},${s * 0.25}
            L ${-s * 0.05},${s * 0.35}
            L ${-s * 0.05},${s * 0.45}
            L ${s * 0.05},${s * 0.45}
            L ${s * 0.05},${s * 0.35}
            L ${s * 0.14},${s * 0.25}`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7}
      />
      {/* Handle */}
      <ellipse cx={0} cy={s * 0.68} rx={s * 0.12} ry={s * 0.25} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Handle ring */}
      <ellipse cx={0} cy={s * 0.48} rx={s * 0.1} ry={s * 0.04} fill="none" stroke={stroke} strokeWidth={sw} />
    </g>
  );
}

/** Pansy flower — Pensee */
function PenseeInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Two upper petals (larger) */}
      <ellipse cx={-s * 0.22} cy={-s * 0.3} rx={s * 0.3} ry={s * 0.28}
        fill={color} stroke={stroke} strokeWidth={sw}
        transform={`rotate(-15,${-s * 0.22},${-s * 0.3})`} />
      <ellipse cx={s * 0.22} cy={-s * 0.3} rx={s * 0.3} ry={s * 0.28}
        fill={color} stroke={stroke} strokeWidth={sw}
        transform={`rotate(15,${s * 0.22},${-s * 0.3})`} />
      {/* Two side petals (medium) */}
      <ellipse cx={-s * 0.32} cy={s * 0.1} rx={s * 0.25} ry={s * 0.22}
        fill={color} stroke={stroke} strokeWidth={sw}
        transform={`rotate(-25,${-s * 0.32},${s * 0.1})`} />
      <ellipse cx={s * 0.32} cy={s * 0.1} rx={s * 0.25} ry={s * 0.22}
        fill={color} stroke={stroke} strokeWidth={sw}
        transform={`rotate(25,${s * 0.32},${s * 0.1})`} />
      {/* Bottom petal (broad, slightly lower) */}
      <ellipse cx={0} cy={s * 0.35} rx={s * 0.28} ry={s * 0.25}
        fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Pansy face pattern — radiating lines from center */}
      <line x1={0} y1={0} x2={0} y2={s * 0.25} stroke={stroke} strokeWidth={sw * 0.7} opacity={0.5} />
      <line x1={0} y1={0} x2={-s * 0.15} y2={s * 0.2} stroke={stroke} strokeWidth={sw * 0.6} opacity={0.4} />
      <line x1={0} y1={0} x2={s * 0.15} y2={s * 0.2} stroke={stroke} strokeWidth={sw * 0.6} opacity={0.4} />
      <line x1={0} y1={0} x2={-s * 0.18} y2={-s * 0.1} stroke={stroke} strokeWidth={sw * 0.6} opacity={0.4} />
      <line x1={0} y1={0} x2={s * 0.18} y2={-s * 0.1} stroke={stroke} strokeWidth={sw * 0.6} opacity={0.4} />
      {/* Center dot */}
      <circle cx={0} cy={0} r={s * 0.08} fill={stroke} />
    </g>
  );
}

// --- Grand Maitre (7) ---

/** Olympic rings — AnneauxOlympiques */
function AnneauxOlympiquesInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  const r = s * 0.22; // ring radius
  const ringStroke = s * 0.08;
  // Top row: 3 rings, bottom row: 2 rings (classic W pattern)
  const gap = s * 0.48;
  const topY = -s * 0.15;
  const botY = s * 0.15;
  const rings = [
    // Top row
    { x: -gap, y: topY },
    { x: 0, y: topY },
    { x: gap, y: topY },
    // Bottom row (offset between top rings)
    { x: -gap / 2, y: botY },
    { x: gap / 2, y: botY },
  ];
  return (
    <g transform={`translate(${cx},${cy})`}>
      {rings.map((ring, i) => (
        <circle
          key={i}
          cx={ring.x} cy={ring.y} r={r}
          fill="none" stroke={color} strokeWidth={ringStroke}
        />
      ))}
      {/* Subtle darker outline for definition */}
      {rings.map((ring, i) => (
        <circle
          key={`o${i}`}
          cx={ring.x} cy={ring.y} r={r}
          fill="none" stroke={stroke} strokeWidth={sw * 0.5} opacity={0.3}
        />
      ))}
    </g>
  );
}

/** Bust of Bacchus / Dionysus — Bacchus */
function BacchusInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Shoulders */}
      <path
        d={`M ${-s * 0.45},${s * 0.9}
            Q ${-s * 0.4},${s * 0.45} ${-s * 0.2},${s * 0.35}
            L ${s * 0.2},${s * 0.35}
            Q ${s * 0.4},${s * 0.45} ${s * 0.45},${s * 0.9}`}
        fill={color} stroke={stroke} strokeWidth={sw}
      />
      {/* Neck */}
      <rect x={-s * 0.1} y={s * 0.15} width={s * 0.2} height={s * 0.22} fill={color} stroke={stroke} strokeWidth={sw * 0.5} />
      {/* Head */}
      <ellipse cx={0} cy={-s * 0.05} rx={s * 0.22} ry={s * 0.28} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Eyes */}
      <circle cx={-s * 0.08} cy={-s * 0.08} r={s * 0.03} fill={stroke} />
      <circle cx={s * 0.08} cy={-s * 0.08} r={s * 0.03} fill={stroke} />
      {/* Slight smile */}
      <path d={`M ${-s * 0.07},${s * 0.05} Q 0,${s * 0.12} ${s * 0.07},${s * 0.05}`}
        fill="none" stroke={stroke} strokeWidth={sw * 0.7} />
      {/* Nose */}
      <path d={`M 0,${-s * 0.06} L ${-s * 0.03},${s * 0.02} L ${s * 0.02},${s * 0.02}`}
        fill="none" stroke={stroke} strokeWidth={sw * 0.6} />
      {/* Grape vine crown — clusters of small circles and curved vine */}
      <path
        d={`M ${-s * 0.3},${-s * 0.2}
            Q ${-s * 0.28},${-s * 0.45} ${-s * 0.1},${-s * 0.42}
            Q 0,${-s * 0.5} ${s * 0.1},${-s * 0.42}
            Q ${s * 0.28},${-s * 0.45} ${s * 0.3},${-s * 0.2}`}
        fill="none" stroke={stroke} strokeWidth={sw}
      />
      {/* Grape clusters on the crown */}
      {[
        [-0.22, -0.35], [-0.15, -0.42], [-0.08, -0.45],
        [0.08, -0.45], [0.15, -0.42], [0.22, -0.35],
        [0, -0.48], [-0.18, -0.3], [0.18, -0.3],
      ].map(([gx, gy], i) => (
        <circle key={i} cx={s * gx} cy={s * gy} r={s * 0.04} fill={color} stroke={stroke} strokeWidth={sw * 0.4} />
      ))}
      {/* Small leaves on vine */}
      <ellipse cx={-s * 0.28} cy={-s * 0.28} rx={s * 0.06} ry={s * 0.03}
        fill={color} stroke={stroke} strokeWidth={sw * 0.3}
        transform={`rotate(-40,${-s * 0.28},${-s * 0.28})`} />
      <ellipse cx={s * 0.28} cy={-s * 0.28} rx={s * 0.06} ry={s * 0.03}
        fill={color} stroke={stroke} strokeWidth={sw * 0.3}
        transform={`rotate(40,${s * 0.28},${-s * 0.28})`} />
    </g>
  );
}

/** Bordeaux wine bottle — BouteilleBordeaux */
function BouteilleBordeauxInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Bottle body — Bordeaux has straight (high) shoulders */}
      <path
        d={`M ${-s * 0.2},${s * 0.9}
            L ${-s * 0.2},${-s * 0.15}
            L ${-s * 0.2},${-s * 0.25}
            L ${-s * 0.07},${-s * 0.35}
            L ${-s * 0.07},${-s * 0.75}
            L ${-s * 0.09},${-s * 0.78}
            L ${-s * 0.09},${-s * 0.85}
            L ${-s * 0.06},${-s * 0.88}
            L ${s * 0.06},${-s * 0.88}
            L ${s * 0.09},${-s * 0.85}
            L ${s * 0.09},${-s * 0.78}
            L ${s * 0.07},${-s * 0.75}
            L ${s * 0.07},${-s * 0.35}
            L ${s * 0.2},${-s * 0.25}
            L ${s * 0.2},${-s * 0.15}
            L ${s * 0.2},${s * 0.9} Z`}
        fill={color} stroke={stroke} strokeWidth={sw}
      />
      {/* Label rectangle */}
      <rect x={-s * 0.14} y={s * 0.1} width={s * 0.28} height={s * 0.3}
        fill="none" stroke={stroke} strokeWidth={sw * 0.7} rx={s * 0.02} />
      {/* Label detail line */}
      <line x1={-s * 0.1} y1={s * 0.2} x2={s * 0.1} y2={s * 0.2} stroke={stroke} strokeWidth={sw * 0.5} />
      <line x1={-s * 0.08} y1={s * 0.28} x2={s * 0.08} y2={s * 0.28} stroke={stroke} strokeWidth={sw * 0.4} />
    </g>
  );
}

/** Champagne bottle — BouteilleChampagne */
function BouteilleChampagneInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Bottle body — Champagne has sloping shoulders, thicker glass, wider base */}
      <path
        d={`M ${-s * 0.22},${s * 0.9}
            L ${-s * 0.22},${-s * 0.05}
            Q ${-s * 0.22},${-s * 0.35} ${-s * 0.08},${-s * 0.45}
            L ${-s * 0.08},${-s * 0.72}
            L ${-s * 0.06},${-s * 0.72}
            L ${-s * 0.06},${-s * 0.78}
            L ${-s * 0.1},${-s * 0.82}
            L ${-s * 0.1},${-s * 0.88}
            L ${s * 0.1},${-s * 0.88}
            L ${s * 0.1},${-s * 0.82}
            L ${s * 0.06},${-s * 0.78}
            L ${s * 0.06},${-s * 0.72}
            L ${s * 0.08},${-s * 0.72}
            L ${s * 0.08},${-s * 0.45}
            Q ${s * 0.22},${-s * 0.35} ${s * 0.22},${-s * 0.05}
            L ${s * 0.22},${s * 0.9} Z`}
        fill={color} stroke={stroke} strokeWidth={sw}
      />
      {/* Foil cap suggestion — thicker ring at top */}
      <rect x={-s * 0.11} y={-s * 0.9} width={s * 0.22} height={s * 0.1}
        rx={s * 0.03} fill={color} stroke={stroke} strokeWidth={sw * 0.8} />
      {/* Label */}
      <rect x={-s * 0.15} y={s * 0.15} width={s * 0.3} height={s * 0.25}
        fill="none" stroke={stroke} strokeWidth={sw * 0.6} rx={s * 0.02} />
      {/* Neck foil wrap */}
      <line x1={-s * 0.08} y1={-s * 0.55} x2={s * 0.08} y2={-s * 0.55} stroke={stroke} strokeWidth={sw * 0.5} />
      <line x1={-s * 0.08} y1={-s * 0.6} x2={s * 0.08} y2={s * -0.6} stroke={stroke} strokeWidth={sw * 0.5} />
    </g>
  );
}

/** Treble clef — CleSol */
function CleSolInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  // Classic treble clef as a single path, centered and scaled
  return (
    <g transform={`translate(${cx},${cy})`}>
      <path
        d={`M ${s * 0.05},${s * 0.85}
            Q ${-s * 0.2},${s * 0.75} ${-s * 0.25},${s * 0.55}
            Q ${-s * 0.3},${s * 0.35} ${-s * 0.1},${s * 0.2}
            Q ${s * 0.1},${s * 0.1} ${s * 0.2},${s * 0.25}
            Q ${s * 0.3},${s * 0.45} ${s * 0.1},${s * 0.6}
            Q ${-s * 0.1},${s * 0.7} ${-s * 0.2},${s * 0.55}
            Q ${-s * 0.15},${s * 0.4} ${s * 0.0},${s * 0.3}
            L ${s * 0.05},${s * 0.2}
            L ${s * 0.05},${-s * 0.5}
            Q ${s * 0.05},${-s * 0.75} ${-s * 0.1},${-s * 0.85}
            Q ${-s * 0.2},${-s * 0.9} ${-s * 0.15},${-s * 0.75}
            Q ${-s * 0.08},${-s * 0.6} ${s * 0.05},${-s * 0.5}`}
        fill="none" stroke={color} strokeWidth={s * 0.14} strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Dot at the bottom of the clef */}
      <circle cx={s * 0.05} cy={s * 0.85} r={s * 0.07} fill={color} stroke={stroke} strokeWidth={sw * 0.5} />
      {/* Outer stroke for definition */}
      <path
        d={`M ${s * 0.05},${s * 0.85}
            Q ${-s * 0.2},${s * 0.75} ${-s * 0.25},${s * 0.55}
            Q ${-s * 0.3},${s * 0.35} ${-s * 0.1},${s * 0.2}
            Q ${s * 0.1},${s * 0.1} ${s * 0.2},${s * 0.25}
            Q ${s * 0.3},${s * 0.45} ${s * 0.1},${s * 0.6}
            Q ${-s * 0.1},${s * 0.7} ${-s * 0.2},${s * 0.55}
            Q ${-s * 0.15},${s * 0.4} ${s * 0.0},${s * 0.3}
            L ${s * 0.05},${s * 0.2}
            L ${s * 0.05},${-s * 0.5}
            Q ${s * 0.05},${-s * 0.75} ${-s * 0.1},${-s * 0.85}
            Q ${-s * 0.2},${-s * 0.9} ${-s * 0.15},${-s * 0.75}
            Q ${-s * 0.08},${-s * 0.6} ${s * 0.05},${-s * 0.5}`}
        fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      />
    </g>
  );
}

/** Rooster — Coq */
function CoqInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Tail feathers fanning up-left */}
      <path
        d={`M ${-s * 0.15},${s * 0.05}
            Q ${-s * 0.5},${-s * 0.1} ${-s * 0.55},${-s * 0.6}
            Q ${-s * 0.35},${-s * 0.4} ${-s * 0.2},${-s * 0.15}`}
        fill={color} stroke={stroke} strokeWidth={sw}
      />
      <path
        d={`M ${-s * 0.15},${s * 0.05}
            Q ${-s * 0.55},${-s * 0.0} ${-s * 0.65},${-s * 0.45}
            Q ${-s * 0.45},${-s * 0.25} ${-s * 0.2},${-s * 0.05}`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7}
      />
      <path
        d={`M ${-s * 0.15},${s * 0.1}
            Q ${-s * 0.45},${s * 0.1} ${-s * 0.5},${-s * 0.3}
            Q ${-s * 0.3},${-s * 0.1} ${-s * 0.15},${s * 0.0}`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7}
      />
      {/* Body */}
      <ellipse cx={0} cy={s * 0.15} rx={s * 0.25} ry={s * 0.22}
        fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Wing detail */}
      <path
        d={`M ${-s * 0.05},${s * 0.05}
            Q ${-s * 0.15},${s * 0.15} ${-s * 0.1},${s * 0.3}
            Q ${s * 0.05},${s * 0.25} ${s * 0.1},${s * 0.1} Z`}
        fill="none" stroke={stroke} strokeWidth={sw * 0.6} />
      {/* Neck */}
      <path
        d={`M ${s * 0.1},${s * 0.0}
            Q ${s * 0.15},${-s * 0.15} ${s * 0.12},${-s * 0.3}`}
        fill="none" stroke={color} strokeWidth={s * 0.14} strokeLinecap="round"
      />
      {/* Head */}
      <circle cx={s * 0.15} cy={-s * 0.4} r={s * 0.13} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Comb (prominent, 3 bumps on top of head) */}
      <path
        d={`M ${s * 0.05},${-s * 0.48}
            Q ${s * 0.08},${-s * 0.65} ${s * 0.13},${-s * 0.6}
            Q ${s * 0.13},${-s * 0.7} ${s * 0.18},${-s * 0.65}
            Q ${s * 0.18},${-s * 0.75} ${s * 0.24},${-s * 0.62}
            Q ${s * 0.28},${-s * 0.5} ${s * 0.25},${-s * 0.42}`}
        fill={color} stroke={stroke} strokeWidth={sw}
      />
      {/* Beak — pointing right */}
      <path
        d={`M ${s * 0.27},${-s * 0.4}
            L ${s * 0.42},${-s * 0.38}
            L ${s * 0.27},${-s * 0.34}`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.8} strokeLinejoin="round"
      />
      {/* Wattle (under beak) */}
      <path
        d={`M ${s * 0.25},${-s * 0.33}
            Q ${s * 0.28},${-s * 0.25} ${s * 0.2},${-s * 0.25}`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7}
      />
      {/* Eye */}
      <circle cx={s * 0.18} cy={-s * 0.42} r={s * 0.025} fill={stroke} />
      {/* Legs */}
      <line x1={-s * 0.05} y1={s * 0.35} x2={-s * 0.1} y2={s * 0.7} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      <line x1={s * 0.08} y1={s * 0.35} x2={s * 0.05} y2={s * 0.7} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      {/* Feet (small toes) */}
      <line x1={-s * 0.1} y1={s * 0.7} x2={-s * 0.2} y2={s * 0.72} stroke={stroke} strokeWidth={sw * 0.7} strokeLinecap="round" />
      <line x1={-s * 0.1} y1={s * 0.7} x2={-s * 0.05} y2={s * 0.76} stroke={stroke} strokeWidth={sw * 0.7} strokeLinecap="round" />
      <line x1={s * 0.05} y1={s * 0.7} x2={-s * 0.05} y2={s * 0.72} stroke={stroke} strokeWidth={sw * 0.7} strokeLinecap="round" />
      <line x1={s * 0.05} y1={s * 0.7} x2={s * 0.12} y2={s * 0.76} stroke={stroke} strokeWidth={sw * 0.7} strokeLinecap="round" />
    </g>
  );
}

/** Hunting horn — CorDeChasse */
function CorDeChasseInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  // Circular coiled horn, like a simplified French hunting horn
  const tubeWidth = s * 0.1;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Main circular coil — the horn loops around in a circle */}
      <circle cx={0} cy={0} r={s * 0.4} fill="none" stroke={color} strokeWidth={tubeWidth} />
      <circle cx={0} cy={0} r={s * 0.4} fill="none" stroke={stroke} strokeWidth={sw * 0.5} opacity={0.3} />
      {/* Bell opening (flared end) — at roughly the 5 o'clock position */}
      <path
        d={`M ${s * 0.35},${s * 0.25}
            Q ${s * 0.55},${s * 0.35} ${s * 0.65},${s * 0.55}
            Q ${s * 0.5},${s * 0.6} ${s * 0.35},${s * 0.5}
            Q ${s * 0.25},${s * 0.4} ${s * 0.3},${s * 0.3}`}
        fill={color} stroke={stroke} strokeWidth={sw}
      />
      {/* Bell rim */}
      <path
        d={`M ${s * 0.65},${s * 0.55}
            Q ${s * 0.7},${s * 0.6} ${s * 0.6},${s * 0.65}
            Q ${s * 0.5},${s * 0.65} ${s * 0.45},${s * 0.58}`}
        fill="none" stroke={stroke} strokeWidth={sw * 1.2} strokeLinecap="round"
      />
      {/* Mouthpiece — small tube extending at roughly 7-8 o'clock */}
      <line x1={-s * 0.35} y1={s * 0.2} x2={-s * 0.6} y2={s * 0.4}
        stroke={color} strokeWidth={tubeWidth * 0.7} strokeLinecap="round" />
      <line x1={-s * 0.35} y1={s * 0.2} x2={-s * 0.6} y2={s * 0.4}
        stroke={stroke} strokeWidth={sw * 0.4} opacity={0.3} />
      {/* Mouthpiece cup */}
      <circle cx={-s * 0.63} cy={s * 0.43} r={s * 0.05} fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      {/* Decorative ferrule on the horn tube (top) */}
      <rect x={-s * 0.06} y={-s * 0.47} width={s * 0.12} height={s * 0.06}
        rx={s * 0.02} fill={color} stroke={stroke} strokeWidth={sw * 0.5} />
    </g>
  );
}

/**
 * Batch 5 GM2 — SVG insigne components for the faluche simulator.
 * Golden silhouette pins on black velvet.
 * All components render centered on (cx, cy) at the given size.
 */

/** Fork on a blue ribbon — Fourchette Bleue */
function FourchetteBleueInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Blue ribbon behind */}
      <rect x={-s * 0.35} y={-s * 0.85} width={s * 0.7} height={s * 1.7} rx={s * 0.08} fill="#4169E1" stroke="#2a4fb0" strokeWidth={sw} />
      {/* Fork handle */}
      <rect x={-s * 0.08} y={s * 0.05} width={s * 0.16} height={s * 0.65} rx={s * 0.04} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Fork neck (narrower transition) */}
      <rect x={-s * 0.06} y={-s * 0.15} width={s * 0.12} height={s * 0.25} fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      {/* Four tines */}
      {[-0.18, -0.06, 0.06, 0.18].map((offset, i) => (
        <rect key={i} x={s * offset - s * 0.03} y={-s * 0.7} width={s * 0.06} height={s * 0.58} rx={s * 0.02} fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      ))}
      {/* Tine connector bar */}
      <rect x={-s * 0.22} y={-s * 0.15} width={s * 0.44} height={s * 0.06} rx={s * 0.02} fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
    </g>
  );
}

/** Axe / Hatchet — Hache */
function HacheInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Vertical handle */}
      <rect x={-s * 0.07} y={-s * 0.3} width={s * 0.14} height={s * 1.2} rx={s * 0.04} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Blade head — curved cutting edge on the right */}
      <path
        d={`M ${s * 0.05},${-s * 0.65}
            L ${s * 0.35},${-s * 0.8}
            Q ${s * 0.6},${-s * 0.55} ${s * 0.55},${-s * 0.25}
            L ${s * 0.05},${-s * 0.15}
            Z`}
        fill={color} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"
      />
      {/* Blade back (poll) */}
      <path
        d={`M ${-s * 0.05},${-s * 0.55}
            L ${-s * 0.18},${-s * 0.5}
            L ${-s * 0.18},${-s * 0.35}
            L ${-s * 0.05},${-s * 0.3}`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7} strokeLinejoin="round"
      />
    </g>
  );
}

/** Mammoth — side profile walking right */
function MammouthInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Large rounded body */}
      <ellipse cx={-s * 0.05} cy={0} rx={s * 0.5} ry={s * 0.35} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Head — slightly forward and up */}
      <ellipse cx={s * 0.4} cy={-s * 0.2} rx={s * 0.22} ry={s * 0.25} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Woolly hump / fur ridge on top */}
      <path
        d={`M ${-s * 0.45},${-s * 0.15}
            Q ${-s * 0.35},${-s * 0.55} ${-s * 0.1},${-s * 0.5}
            Q ${s * 0.1},${-s * 0.45} ${s * 0.25},${-s * 0.4}`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.8} strokeLinecap="round"
      />
      {/* Small ear */}
      <ellipse cx={s * 0.28} cy={-s * 0.32} rx={s * 0.08} ry={s * 0.1} fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      {/* Trunk — curving down from front of head */}
      <path
        d={`M ${s * 0.55},${-s * 0.1}
            Q ${s * 0.7},${s * 0.1} ${s * 0.6},${s * 0.35}
            Q ${s * 0.55},${s * 0.5} ${s * 0.45},${s * 0.45}`}
        fill="none" stroke={color} strokeWidth={s * 0.1} strokeLinecap="round"
      />
      {/* Long curved tusks */}
      <path
        d={`M ${s * 0.4},${-s * 0.05}
            Q ${s * 0.7},${-s * 0.05} ${s * 0.75},${s * 0.2}
            Q ${s * 0.7},${s * 0.35} ${s * 0.5},${s * 0.3}`}
        fill="none" stroke="#FFFACD" strokeWidth={s * 0.06} strokeLinecap="round"
      />
      {/* Front legs */}
      <rect x={s * 0.1} y={s * 0.2} width={s * 0.12} height={s * 0.5} rx={s * 0.04} fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      <rect x={s * 0.22} y={s * 0.22} width={s * 0.12} height={s * 0.48} rx={s * 0.04} fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      {/* Back legs */}
      <rect x={-s * 0.4} y={s * 0.2} width={s * 0.12} height={s * 0.5} rx={s * 0.04} fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      <rect x={-s * 0.28} y={s * 0.22} width={s * 0.12} height={s * 0.48} rx={s * 0.04} fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      {/* Tail */}
      <path
        d={`M ${-s * 0.52},${-s * 0.1}
            Q ${-s * 0.7},${-s * 0.25} ${-s * 0.65},${-s * 0.35}`}
        fill="none" stroke={color} strokeWidth={s * 0.06} strokeLinecap="round"
      />
      {/* Eye */}
      <circle cx={s * 0.48} cy={-s * 0.25} r={s * 0.03} fill="#333" />
    </g>
  );
}

/** Elephant — side profile walking right */
function PachydermeInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Large body */}
      <ellipse cx={-s * 0.05} cy={0} rx={s * 0.48} ry={s * 0.32} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Head — rounder, more forward */}
      <ellipse cx={s * 0.4} cy={-s * 0.15} rx={s * 0.2} ry={s * 0.22} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Large ear (characteristic of elephant) */}
      <path
        d={`M ${s * 0.25},${-s * 0.3}
            Q ${s * 0.05},${-s * 0.35} ${s * 0.08},${-s * 0.05}
            Q ${s * 0.12},${s * 0.1} ${s * 0.25},${s * 0.05}`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.8}
      />
      {/* Trunk — hanging down gracefully */}
      <path
        d={`M ${s * 0.55},${-s * 0.05}
            Q ${s * 0.65},${s * 0.15} ${s * 0.55},${s * 0.4}
            Q ${s * 0.5},${s * 0.55} ${s * 0.4},${s * 0.5}`}
        fill="none" stroke={color} strokeWidth={s * 0.09} strokeLinecap="round"
      />
      {/* Small tusks */}
      <path
        d={`M ${s * 0.42},${s * 0.0}
            Q ${s * 0.55},${s * 0.08} ${s * 0.5},${s * 0.2}`}
        fill="none" stroke="#FFFACD" strokeWidth={s * 0.05} strokeLinecap="round"
      />
      {/* Front legs */}
      <rect x={s * 0.1} y={s * 0.18} width={s * 0.13} height={s * 0.52} rx={s * 0.05} fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      <rect x={s * 0.23} y={s * 0.2} width={s * 0.13} height={s * 0.5} rx={s * 0.05} fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      {/* Back legs */}
      <rect x={-s * 0.4} y={s * 0.18} width={s * 0.13} height={s * 0.52} rx={s * 0.05} fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      <rect x={-s * 0.27} y={s * 0.2} width={s * 0.13} height={s * 0.5} rx={s * 0.05} fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      {/* Tail */}
      <path
        d={`M ${-s * 0.5},${-s * 0.05}
            Q ${-s * 0.6},${-s * 0.2} ${-s * 0.55},${-s * 0.3}`}
        fill="none" stroke={color} strokeWidth={s * 0.05} strokeLinecap="round"
      />
      {/* Tail tuft */}
      <circle cx={-s * 0.55} cy={-s * 0.33} r={s * 0.04} fill={color} stroke={stroke} strokeWidth={sw * 0.5} />
      {/* Eye */}
      <circle cx={s * 0.48} cy={-s * 0.2} r={s * 0.03} fill="#333" />
    </g>
  );
}

/** Open umbrella — dome canopy, vertical shaft, curved handle */
function ParapluieOuvertInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Dome canopy — arc shape */}
      <path
        d={`M ${-s * 0.7},${s * 0.05}
            Q ${-s * 0.6},${-s * 0.65} 0,${-s * 0.75}
            Q ${s * 0.6},${-s * 0.65} ${s * 0.7},${s * 0.05}`}
        fill={color} stroke={stroke} strokeWidth={sw}
      />
      {/* Scalloped bottom edge of canopy */}
      <path
        d={`M ${-s * 0.7},${s * 0.05}
            Q ${-s * 0.52},${-s * 0.08} ${-s * 0.35},${s * 0.05}
            Q ${-s * 0.17},${-s * 0.08} 0,${s * 0.05}
            Q ${s * 0.17},${-s * 0.08} ${s * 0.35},${s * 0.05}
            Q ${s * 0.52},${-s * 0.08} ${s * 0.7},${s * 0.05}`}
        fill="none" stroke={stroke} strokeWidth={sw * 0.7}
      />
      {/* Tip on top of canopy */}
      <circle cx={0} cy={-s * 0.78} r={s * 0.05} fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      {/* Vertical shaft */}
      <line x1={0} y1={-s * 0.7} x2={0} y2={s * 0.6} stroke={color} strokeWidth={sw * 1.2} strokeLinecap="round" />
      {/* Curved handle at bottom */}
      <path
        d={`M 0,${s * 0.6}
            Q 0,${s * 0.8} ${s * 0.12},${s * 0.8}
            Q ${s * 0.22},${s * 0.8} ${s * 0.22},${s * 0.68}`}
        fill="none" stroke={color} strokeWidth={sw * 1.2} strokeLinecap="round"
      />
    </g>
  );
}

/** Closed umbrella — narrow elongated shape, folded fabric */
function ParapluieFermeInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Curved handle at top */}
      <path
        d={`M ${-s * 0.2},${-s * 0.65}
            Q ${-s * 0.2},${-s * 0.85} ${-s * 0.05},${-s * 0.85}
            Q ${s * 0.08},${-s * 0.85} ${s * 0.08},${-s * 0.7}`}
        fill="none" stroke={color} strokeWidth={sw * 1.3} strokeLinecap="round"
      />
      {/* Shaft */}
      <line x1={-s * 0.02} y1={-s * 0.65} x2={-s * 0.02} y2={s * 0.7} stroke={color} strokeWidth={sw * 1.1} strokeLinecap="round" />
      {/* Folded fabric wrapping around shaft — tapered shape */}
      <path
        d={`M ${-s * 0.02},${-s * 0.55}
            L ${s * 0.12},${-s * 0.45}
            Q ${s * 0.18},${-s * 0.1} ${s * 0.1},${s * 0.3}
            L ${s * 0.04},${s * 0.55}
            L ${-s * 0.02},${s * 0.6}
            L ${-s * 0.08},${s * 0.55}
            Q ${-s * 0.14},${s * 0.3} ${-s * 0.16},${-s * 0.1}
            L ${-s * 0.14},${-s * 0.45}
            Z`}
        fill={color} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"
      />
      {/* Fabric fold lines */}
      <line x1={s * 0.05} y1={-s * 0.4} x2={s * 0.02} y2={s * 0.5} stroke={stroke} strokeWidth={sw * 0.5} />
      <line x1={-s * 0.08} y1={-s * 0.4} x2={-s * 0.05} y2={s * 0.5} stroke={stroke} strokeWidth={sw * 0.5} />
      {/* Tie / band around folded fabric */}
      <rect x={-s * 0.17} y={-s * 0.15} width={s * 0.34} height={s * 0.06} rx={s * 0.02} fill={stroke} />
      {/* Pointed tip at bottom */}
      <polygon
        points={`${-s * 0.06},${s * 0.6} ${s * 0.02},${s * 0.6} ${-s * 0.02},${s * 0.82}`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7}
      />
    </g>
  );
}

/** Hen / chicken — standing profile facing right */
function PouleInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Body — plump oval */}
      <ellipse cx={-s * 0.05} cy={s * 0.05} rx={s * 0.4} ry={s * 0.3} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Head */}
      <circle cx={s * 0.35} cy={-s * 0.25} r={s * 0.16} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Neck connecting head to body */}
      <path
        d={`M ${s * 0.2},${-s * 0.15}
            Q ${s * 0.25},${-s * 0.05} ${s * 0.15},${-s * 0.05}`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7}
      />
      {/* Comb on top of head */}
      <path
        d={`M ${s * 0.25},${-s * 0.38}
            Q ${s * 0.3},${-s * 0.52} ${s * 0.35},${-s * 0.42}
            Q ${s * 0.38},${-s * 0.52} ${s * 0.42},${-s * 0.42}
            Q ${s * 0.45},${-s * 0.5} ${s * 0.48},${-s * 0.38}`}
        fill="#CC3333" stroke={stroke} strokeWidth={sw * 0.6}
      />
      {/* Beak */}
      <polygon
        points={`${s * 0.48},${-s * 0.25} ${s * 0.65},${-s * 0.22} ${s * 0.48},${-s * 0.18}`}
        fill="#CC8833" stroke={stroke} strokeWidth={sw * 0.5}
      />
      {/* Wattle */}
      <ellipse cx={s * 0.42} cy={-s * 0.12} rx={s * 0.04} ry={s * 0.06} fill="#CC3333" stroke={stroke} strokeWidth={sw * 0.4} />
      {/* Eye */}
      <circle cx={s * 0.4} cy={-s * 0.28} r={s * 0.025} fill="#333" />
      {/* Tail feathers — slightly raised */}
      <path
        d={`M ${-s * 0.4},${-s * 0.05}
            Q ${-s * 0.65},${-s * 0.15} ${-s * 0.7},${-s * 0.35}
            Q ${-s * 0.55},${-s * 0.25} ${-s * 0.45},${-s * 0.1}`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.7}
      />
      <path
        d={`M ${-s * 0.38},${-s * 0.0}
            Q ${-s * 0.6},${-s * 0.05} ${-s * 0.65},${-s * 0.25}
            Q ${-s * 0.5},${-s * 0.15} ${-s * 0.42},${-s * 0.05}`}
        fill={color} stroke={stroke} strokeWidth={sw * 0.6}
      />
      {/* Legs */}
      <line x1={s * 0.0} y1={s * 0.3} x2={s * 0.0} y2={s * 0.6} stroke={color} strokeWidth={sw * 1.1} strokeLinecap="round" />
      <line x1={-s * 0.15} y1={s * 0.3} x2={-s * 0.15} y2={s * 0.6} stroke={color} strokeWidth={sw * 1.1} strokeLinecap="round" />
      {/* Feet (3 toes each) */}
      <path d={`M ${-s * 0.05},${s * 0.6} L ${s * 0.0},${s * 0.6} L ${s * 0.1},${s * 0.65}`} fill="none" stroke={color} strokeWidth={sw * 0.8} strokeLinecap="round" />
      <path d={`M ${-s * 0.05},${s * 0.6} L ${s * 0.0},${s * 0.6} L ${s * 0.05},${s * 0.72}`} fill="none" stroke={color} strokeWidth={sw * 0.8} strokeLinecap="round" />
      <path d={`M ${-s * 0.25},${s * 0.6} L ${-s * 0.15},${s * 0.6} L ${-s * 0.05},${s * 0.65}`} fill="none" stroke={color} strokeWidth={sw * 0.8} strokeLinecap="round" />
      <path d={`M ${-s * 0.25},${s * 0.6} L ${-s * 0.15},${s * 0.6} L ${-s * 0.1},${s * 0.72}`} fill="none" stroke={color} strokeWidth={sw * 0.8} strokeLinecap="round" />
    </g>
  );
}

/** Monkey — sitting profile, curled tail */
function SingeInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Body — small, sitting */}
      <ellipse cx={0} cy={s * 0.15} rx={s * 0.28} ry={s * 0.25} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Head — round */}
      <circle cx={s * 0.05} cy={-s * 0.28} r={s * 0.24} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Face (lighter inner circle) */}
      <ellipse cx={s * 0.1} cy={-s * 0.22} rx={s * 0.14} ry={s * 0.12} fill={stroke} opacity={0.3} />
      {/* Ears */}
      <circle cx={-s * 0.2} cy={-s * 0.38} r={s * 0.09} fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      <circle cx={s * 0.28} cy={-s * 0.38} r={s * 0.09} fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      {/* Eyes */}
      <circle cx={s * 0.0} cy={-s * 0.3} r={s * 0.03} fill="#333" />
      <circle cx={s * 0.16} cy={-s * 0.3} r={s * 0.03} fill="#333" />
      {/* Muzzle / snout */}
      <ellipse cx={s * 0.08} cy={-s * 0.18} rx={s * 0.08} ry={s * 0.05} fill={color} stroke={stroke} strokeWidth={sw * 0.5} />
      {/* Mouth */}
      <path d={`M ${s * 0.03},${-s * 0.15} Q ${s * 0.08},${-s * 0.1} ${s * 0.13},${-s * 0.15}`} fill="none" stroke="#333" strokeWidth={sw * 0.5} />
      {/* Arms — playful pose, one raised */}
      <path
        d={`M ${-s * 0.22},${s * 0.05}
            Q ${-s * 0.45},${-s * 0.1} ${-s * 0.4},${-s * 0.3}`}
        fill="none" stroke={color} strokeWidth={s * 0.09} strokeLinecap="round"
      />
      <path
        d={`M ${s * 0.22},${s * 0.05}
            Q ${s * 0.45},${s * 0.0} ${s * 0.5},${s * 0.15}`}
        fill="none" stroke={color} strokeWidth={s * 0.09} strokeLinecap="round"
      />
      {/* Hands */}
      <circle cx={-s * 0.4} cy={-s * 0.33} r={s * 0.06} fill={color} stroke={stroke} strokeWidth={sw * 0.5} />
      <circle cx={s * 0.52} cy={s * 0.16} r={s * 0.06} fill={color} stroke={stroke} strokeWidth={sw * 0.5} />
      {/* Legs — sitting, bent */}
      <path
        d={`M ${-s * 0.15},${s * 0.35}
            Q ${-s * 0.3},${s * 0.55} ${-s * 0.15},${s * 0.65}`}
        fill="none" stroke={color} strokeWidth={s * 0.1} strokeLinecap="round"
      />
      <path
        d={`M ${s * 0.15},${s * 0.35}
            Q ${s * 0.3},${s * 0.55} ${s * 0.15},${s * 0.65}`}
        fill="none" stroke={color} strokeWidth={s * 0.1} strokeLinecap="round"
      />
      {/* Feet */}
      <ellipse cx={-s * 0.15} cy={s * 0.68} rx={s * 0.08} ry={s * 0.04} fill={color} stroke={stroke} strokeWidth={sw * 0.5} />
      <ellipse cx={s * 0.15} cy={s * 0.68} rx={s * 0.08} ry={s * 0.04} fill={color} stroke={stroke} strokeWidth={sw * 0.5} />
      {/* Curled tail */}
      <path
        d={`M ${-s * 0.2},${s * 0.3}
            Q ${-s * 0.55},${s * 0.25} ${-s * 0.6},${s * 0.45}
            Q ${-s * 0.6},${s * 0.65} ${-s * 0.4},${s * 0.6}
            Q ${-s * 0.3},${s * 0.55} ${-s * 0.35},${s * 0.45}`}
        fill="none" stroke={color} strokeWidth={s * 0.06} strokeLinecap="round"
      />
    </g>
  );
}

/** Coin with a hole — Sou Troue */
function SouTroueInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  // Number of ridges around the edge
  const ridgeCount = 24;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Outer coin circle */}
      <circle cx={0} cy={0} r={s * 0.8} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Inner rim circle for coin edge detail */}
      <circle cx={0} cy={0} r={s * 0.7} fill="none" stroke={stroke} strokeWidth={sw * 0.5} />
      {/* Edge ridges — small radial lines around the perimeter */}
      {Array.from({ length: ridgeCount }, (_, i) => {
        const angle = (i * 360 / ridgeCount) * Math.PI / 180;
        const x1 = Math.cos(angle) * s * 0.72;
        const y1 = Math.sin(angle) * s * 0.72;
        const x2 = Math.cos(angle) * s * 0.8;
        const y2 = Math.sin(angle) * s * 0.8;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={sw * 0.4} />;
      })}
      {/* Center hole */}
      <circle cx={0} cy={0} r={s * 0.25} fill="#1a1a2e" stroke={stroke} strokeWidth={sw * 0.8} />
      {/* Inner ring detail around hole */}
      <circle cx={0} cy={0} r={s * 0.3} fill="none" stroke={stroke} strokeWidth={sw * 0.4} />
    </g>
  );
}

/** Steering wheel — circle with 3 spokes and center hub */
function VolantInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = size * 0.03;
  const rimR = s * 0.75;
  const hubR = s * 0.15;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Outer rim */}
      <circle cx={0} cy={0} r={rimR} fill="none" stroke={color} strokeWidth={sw * 2.5} />
      {/* Three spokes at 90, 210, 330 degrees (classic car layout: top and two lower) */}
      {[270, 30, 150].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = Math.cos(rad) * hubR;
        const y1 = Math.sin(rad) * hubR;
        const x2 = Math.cos(rad) * (rimR - sw);
        const y2 = Math.sin(rad) * (rimR - sw);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={sw * 2} strokeLinecap="round" />;
      })}
      {/* Center hub */}
      <circle cx={0} cy={0} r={hubR} fill={color} stroke={stroke} strokeWidth={sw} />
      {/* Hub detail — inner circle */}
      <circle cx={0} cy={0} r={hubR * 0.5} fill="none" stroke={stroke} strokeWidth={sw * 0.7} />
    </g>
  );
}


// Dispatch map: catalog id → SVG component
const INSIGNE_COMPONENTS: Record<string, (props: InsigneProps) => React.JSX.Element> = {
  // Obligatoires Amiens
  chameau: ChameauInsigne,
  cochon: CochonInsigne,
  squelette: SqueletteInsigne,
  ciseaux: CiseauxInsigne,
  // Auto-attribués
  appareil_photo: AppareilPhotoInsigne,
  bacchus_troue: BacchusTroueInsigne,
  casque_pericles: CasquePericlesInsigne,
  chope_biere: ChopeBiereInsigne,
  chouette: ChouetteInsigne,
  epi_ble: EpiDeBleInsigne,
  epi_faucille: EpiFaucilleInsigne,
  etoile_foudre_perso: EtoileFoudrePersoInsigne,
  fer_cheval: FerAChevalInsigne,
  feuille_vigne: FeuilleVigneInsigne,
  fourchette: FourchetteInsigne,
  globe_vert: GlobeVertInsigne,
  grappe_raisin: GrappeRaisinInsigne,
  lyre: LyreInsignePerso,
  masque_comedie: MasqueComedieInsigne,
  palette: PaletteInsigne,
  pendu: PenduInsigne,
  plume: PlumeInsigne,
  sphinx: SphinxInsigne,
  // Partenaire
  epee: EpeeInsigne,
  fleche: FlecheInsigne,
  lime: LimeInsigne,
  pensee: PenseeInsigne,
  // Grand Maître
  anneaux_olympiques: AnneauxOlympiquesInsigne,
  bacchus: BacchusInsigne,
  bouteille_bordeaux: BouteilleBordeauxInsigne,
  bouteille_champagne: BouteilleChampagneInsigne,
  cle_sol: CleSolInsigne,
  coq: CoqInsigne,
  cor_chasse: CorDeChasseInsigne,
  fourchette_bleue: FourchetteBleueInsigne,
  hache: HacheInsigne,
  mammouth: MammouthInsigne,
  pachyderme: PachydermeInsigne,
  parapluie_ouvert: ParapluieOuvertInsigne,
  parapluie_ferme: ParapluieFermeInsigne,
  poule: PouleInsigne,
  singe: SingeInsigne,
  sou_troue: SouTroueInsigne,
  volant: VolantInsigne,
  // Batch imports — auto-attribués
  aigle: AigleInsigne,
  ancre: AncreInsigne,
  cocotte_papier: CocottePapierInsigne,
  cornue_ballon: CornueBallonInsigne,
  cupidon: CupidonInsigne,
  ecureuil: EcureuilInsigne,
  fleur_lys: FleurLysInsigne,
  fourchettes_croisees: FourchettesCroiseesInsigne,
  fraise: FraiseInsigne,
  lacet_cuir: LacetCuirInsigne,
  marteau_maillet: MarteauMailletInsigne,
  nounours: NounoursInsigne,
  raquette_ballon: RaquetteBallonInsigne,
  rose: RoseInsigne,
  skis: SkisInsigne,
  tete_taureau: TeteTaureauInsigne,
  voilier: VoilierInsigne,
  // Partenaire
  orchidee: OrchideeInsigne,
  escargot: EscargotInsigne,
  // Grand Maître
  chauve_souris: ChauveSourisInsigne,
  epingle_ruban_noir: EpingleRubanNoirInsigne,
  homard: HomardInsigne,
  lime_ruban_noir: LimeRubanNoirInsigne,
  lyre_tete_mort: LyreTeteMortInsigne,
  parapluie_ferme_envers: ParapluieFermeEnversInsigne,
  // Régionaux
  chardon: ChardonInsigne,
  cigale: CigaleInsigne,
  cigogne: CigogneInsigne,
  hermine: HermineInsigne,
  houe: HoueInsigne,
  lion_rampant: LionRampantInsigne,
  leopard: LeopardInsigne,
  sabot: SabotInsigne,
  sanglier: SanglierInsigne,
  taste_vin: TasteVinInsigne,
};

function PlaceholderInsigne({ cx, cy, size, color = '#FFD700' }: InsigneProps & { id?: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={size * 0.42} fill="none" stroke={color} strokeWidth={size * 0.06} />
      <text x={cx} y={cy + size * 0.12} textAnchor="middle" fill={color} fontSize={size * 0.35} fontWeight="bold" fontFamily="serif">?</text>
    </g>
  );
}

export function InsignePersonnel({ id, svgId, retourne, cx, cy, size, annee, nombreCousu, rubanBizut }: {
  id: string;
  svgId?: string;
  retourne?: boolean;
  cx: number;
  cy: number;
  size: number;
  annee?: number;
  nombreCousu?: number;
  rubanBizut?: boolean;
}) {
  const Component = INSIGNE_COMPONENTS[svgId ?? id];
  const transform = retourne ? `rotate(180, ${cx}, ${cy})` : undefined;

  // Ciseaux special: blue ribbon behind (only if sewn as bizut)
  const isCiseaux = id === 'ciseaux';
  const s = size / 2;
  const rsw = s * 0.05;

  return (
    <g>
      {isCiseaux && rubanBizut && (
        <g>
          <rect
            x={cx - s * 0.12} y={cy - s * 0.75}
            width={s * 0.24} height={s * 1.5}
            fill="#87CEEB" rx={s * 0.04}
            stroke="#5B9BD5" strokeWidth={rsw * 0.5}
          />
          <path d={`M ${cx - s * 0.12},${cy + s * 0.75}
                     L ${cx - s * 0.12},${cy + s * 0.85}
                     L ${cx},${cy + s * 0.72}
                     L ${cx + s * 0.12},${cy + s * 0.85}
                     L ${cx + s * 0.12},${cy + s * 0.75} Z`}
            fill="#87CEEB" stroke="#5B9BD5" strokeWidth={rsw * 0.5}
          />
        </g>
      )}
      <g transform={transform}>
        {Component
          ? <Component cx={cx} cy={cy} size={size} />
          : <PlaceholderInsigne cx={cx} cy={cy} size={size} />
        }
      </g>
      {isCiseaux && annee != null && (
        <text
          x={cx + size * 0.35} y={cy + size * 0.55}
          textAnchor="middle" fill="#FFD700" stroke="#B8860B" strokeWidth={0.3}
          fontSize={size * 0.3} fontWeight="bold"
        >
          {String(annee % 100).padStart(2, '0')}
        </text>
      )}
      {isCiseaux && nombreCousu != null && nombreCousu > 0 && (
        <text
          x={cx + size * 0.35} y={cy - size * 0.35}
          textAnchor="middle" fill="#FFD700" stroke="#B8860B" strokeWidth={0.2}
          fontSize={size * 0.22} fontWeight="bold"
        >
          {nombreCousu}
        </text>
      )}
    </g>
  );
}
