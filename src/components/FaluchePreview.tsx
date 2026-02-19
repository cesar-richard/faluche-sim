import { useRef } from 'react';
import type { Faluche } from '../data/types';
import { Velours } from './Velours';
import { CirculaireBar } from './CirculaireBar';
import { RubanPendant, getRubanPosition } from './RubanPendant';
import { Ecusson } from './Ecusson';

interface FaluchePreviewProps {
  faluche: Faluche;
  selectedInsigneId: string | null;
  onSelectInsigne: (id: string | null) => void;
  onMoveInsigne: (id: string, pos: { x: number; y: number }) => void;
}

const SVG_WIDTH = 600;
const SVG_HEIGHT = 620;
const CIRCLE_CX = 250;
const CIRCLE_CY = 240;
const CIRCLE_RADIUS = 200;
const CIRCULAIRE_X = 20;
const CIRCULAIRE_Y = 472;
const CIRCULAIRE_WIDTH = 560;
const CIRCULAIRE_HEIGHT = 60;

const RUBAN_WIDTH = 18;
const ECUSSON_SIZE = 34;

const CIRCLE = { cx: CIRCLE_CX, cy: CIRCLE_CY, r: CIRCLE_RADIUS };

// Ribbon offsets (horizontal distance from cx)
const OFFSET_D = Math.round(CIRCLE_RADIUS / 3);
const OFFSET_B = Math.round(CIRCLE_RADIUS / 3);
const OFFSET_A = OFFSET_B + RUBAN_WIDTH / 2 + RUBAN_WIDTH / 2 + 4;

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

export function FaluchePreview({ faluche, selectedInsigneId, onSelectInsigne, onMoveInsigne }: FaluchePreviewProps) {
  const svgRef = useRef<SVGSVGElement>(null);
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
      ref={svgRef}
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

      {/* Velours (black circle) + insignes */}
      <Velours
        cx={CIRCLE_CX}
        cy={CIRCLE_CY}
        radius={CIRCLE_RADIUS}
        insignes={faluche.velours.insignes}
        selectedId={selectedInsigneId}
        onSelect={onSelectInsigne}
        onMove={onMoveInsigne}
        svgRef={svgRef}
      />

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

      {/* Ruban A — Ville de naissance (right, diagonal) */}
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
        circulaire={faluche.circulaire}
      />
    </svg>
  );
}
