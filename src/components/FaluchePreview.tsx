import type { Faluche } from '../data/types';
import { Velours } from './Velours';
import { CirculaireBar } from './CirculaireBar';
import { RubanPendant, getRubanPosition } from './RubanPendant';
import { Ecusson } from './Ecusson';

interface FaluchePreviewProps {
  faluche: Faluche;
}

const SVG_WIDTH = 500;
const SVG_HEIGHT = 600;
const CIRCLE_CX = 250;
const CIRCLE_CY = 240;
const CIRCLE_RADIUS = 200;
const CIRCULAIRE_X = 50;
const CIRCULAIRE_Y = 480;
const CIRCULAIRE_WIDTH = 400;
const CIRCULAIRE_HEIGHT = 40;

const RUBAN_WIDTH = 18;
const ECUSSON_SIZE = 34;

const CIRCLE = { cx: CIRCLE_CX, cy: CIRCLE_CY, r: CIRCLE_RADIUS };

// Ribbon offsets (horizontal distance from cx)
// D and B: measured at junction height, start from the "thirds" of the frontal: r/3 ≈ 67
const OFFSET_D = Math.round(CIRCLE_RADIUS / 3);  // Study city (left, yshaped)
const OFFSET_B = Math.round(CIRCLE_RADIUS / 3);  // Province (right, yshaped, symmetric of D)
// A: center offset so its left perpendicular edge touches B's right edge
// B right edge = OFFSET_B + halfW. A left perp edge = OFFSET_A - halfW * cos(60°).
// Contact: OFFSET_A = OFFSET_B + halfW + halfW * cos(60°)
const OFFSET_A = OFFSET_B + RUBAN_WIDTH / 2 + RUBAN_WIDTH / 2 + 4; // Birth city (right, diagonal)

// Ecusson placement ratios along the ribbon (0=start, 1=end)
const ECUSSON_RATIO_D = 0.70;
const ECUSSON_RATIO_A = 0.55;
const ECUSSON_RATIO_B = 0.70;

// Y-junction for guide lines
const Y_JUNCTION = CIRCLE_CY + CIRCLE_RADIUS / 3;

function branchEnd(angleDeg: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  const dx = Math.sin(rad);
  const dy = Math.cos(rad);
  const b0 = Y_JUNCTION - CIRCLE_CY;
  const B = 2 * b0 * dy;
  const C = b0 * b0 - CIRCLE_RADIUS * CIRCLE_RADIUS;
  const t = (-B + Math.sqrt(B * B - 4 * C)) / 2;
  return { x: CIRCLE_CX + dx * t, y: Y_JUNCTION + dy * t };
}

const leftBranch = branchEnd(-60);
const rightBranch = branchEnd(60);

export function FaluchePreview({ faluche }: FaluchePreviewProps) {
  const villeEtude = faluche.villeEtude;

  // Ecusson positions on the ribbons
  const posD = getRubanPosition('yshaped', 'left', OFFSET_D, CIRCLE, ECUSSON_RATIO_D);
  const posA = faluche.villeNaissance
    ? getRubanPosition('diagonal', 'right', OFFSET_A, CIRCLE, ECUSSON_RATIO_A)
    : null;
  const posB = faluche.provinceNaissance
    ? getRubanPosition('yshaped', 'right', OFFSET_B, CIRCLE, ECUSSON_RATIO_B)
    : null;

  return (
    <svg
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      className="w-full max-w-lg"
    >
      <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="transparent" />

      {/* Orientation labels */}
      <text x={CIRCLE_CX} y={20} textAnchor="middle" fill="#666" fontSize={12}>
        FRONTAL
      </text>
      <text x={CIRCLE_CX} y={CIRCULAIRE_Y - 8} textAnchor="middle" fill="#666" fontSize={12}>
        OCCIPITAL
      </text>

      {/* Y-shaped guide lines */}
      <line
        x1={CIRCLE_CX} y1={CIRCLE_CY - CIRCLE_RADIUS}
        x2={CIRCLE_CX} y2={Y_JUNCTION}
        stroke="#444" strokeWidth={1} strokeDasharray="6 4"
      />
      <line
        x1={CIRCLE_CX} y1={Y_JUNCTION}
        x2={leftBranch.x} y2={leftBranch.y}
        stroke="#444" strokeWidth={1} strokeDasharray="6 4"
      />
      <line
        x1={CIRCLE_CX} y1={Y_JUNCTION}
        x2={rightBranch.x} y2={rightBranch.y}
        stroke="#444" strokeWidth={1} strokeDasharray="6 4"
      />
      <text x={CIRCLE_CX} y={Y_JUNCTION + 18} textAnchor="middle" fill="#555" fontSize={10}>
        120°
      </text>

      {/* Velours (black circle) */}
      <Velours cx={CIRCLE_CX} cy={CIRCLE_CY} radius={CIRCLE_RADIUS} />

      {/* Ruban D — Ville d'étude (left, Y-shaped) */}
      <RubanPendant
        id="ville-etude"
        shape="yshaped"
        side="left"
        offset={OFFSET_D}
        width={RUBAN_WIDTH}
        couleurs={villeEtude.couleurs}
        circle={CIRCLE}
      />

      {/* Ruban A — Ville de naissance (right, diagonal) — rendered first so B appears on top */}
      {faluche.villeNaissance && (
        <RubanPendant
          id="ville-naissance"
          shape="diagonal"
          side="right"
          offset={OFFSET_A}
          width={RUBAN_WIDTH}
          couleurs={faluche.villeNaissance.couleurs}
          circle={CIRCLE}
        />
      )}

      {/* Ruban B — Province de naissance (right, yshaped, symmetric of D) */}
      {faluche.provinceNaissance && (
        <RubanPendant
          id="province-naissance"
          shape="yshaped"
          side="right"
          offset={OFFSET_B}
          width={RUBAN_WIDTH}
          couleurs={faluche.provinceNaissance.couleurs}
          circle={CIRCLE}
        />
      )}

      {/* Écussons on the ribbons */}
      <Ecusson
        cx={posD.x}
        cy={posD.y}
        size={ECUSSON_SIZE}
        couleurs={villeEtude.couleurs}
        label={villeEtude.nom}
      />

      {faluche.villeNaissance && posA && (
        <Ecusson
          cx={posA.x}
          cy={posA.y}
          size={ECUSSON_SIZE}
          couleurs={faluche.villeNaissance.couleurs}
          label={faluche.villeNaissance.nom}
        />
      )}

      {faluche.provinceNaissance && posB && (
        <Ecusson
          cx={posB.x}
          cy={posB.y}
          size={ECUSSON_SIZE}
          couleurs={faluche.provinceNaissance.couleurs}
          label={faluche.provinceNaissance.nom}
        />
      )}

      {/* Circulaire */}
      <CirculaireBar
        x={CIRCULAIRE_X}
        y={CIRCULAIRE_Y}
        width={CIRCULAIRE_WIDTH}
        height={CIRCULAIRE_HEIGHT}
        couleur={faluche.circulaire.couleurPrincipale}
        discipline={faluche.circulaire.discipline}
      />

      {faluche.circulaire.discipline && (
        <text
          x={CIRCLE_CX}
          y={CIRCULAIRE_Y + CIRCULAIRE_HEIGHT / 2 + 5}
          textAnchor="middle"
          fill={isLightColor(faluche.circulaire.couleurPrincipale) ? '#333' : '#fff'}
          fontSize={13}
          fontWeight="bold"
        >
          {faluche.circulaire.discipline}
        </text>
      )}
    </svg>
  );
}

function isLightColor(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}
