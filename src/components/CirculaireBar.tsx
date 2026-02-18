import type { Circulaire } from '../data/types';
import { BICOLORES, FILIERES } from '../data/filieres';

interface CirculaireBarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  circulaire: Circulaire;
}

// Layout constants (as fractions of total width)
const OEILLET_ZONE = 0.06;   // space for oeillet circle
const SURNOM_ZONE = 0.18;    // space for surnom text
const BAC_ZONE = 0.08;       // space for "É24"
const EMBLEME_ZONE = 0.06;   // space for baptême emblème at frontal

function isLightColor(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

function getTextColor(bg: string): string {
  return isLightColor(bg) ? '#333' : '#fff';
}

function getEmbleme(filiere: string): string {
  return FILIERES.find(f => f.nom === filiere)?.embleme ?? '●';
}

/** Render a single segment rectangle, handling bicolore split */
function SegmentRect({ x, y, w, h, filiere, couleur }: {
  x: number; y: number; w: number; h: number; filiere: string; couleur: string;
}) {
  const bicolore = BICOLORES[filiere];
  if (bicolore) {
    const halfH = h / 2;
    return (
      <g>
        <rect x={x} y={y} width={w} height={halfH} fill={bicolore[0]} />
        <rect x={x} y={y + halfH} width={w} height={halfH} fill={bicolore[1]} />
      </g>
    );
  }
  return <rect x={x} y={y} width={w} height={h} fill={couleur} />;
}

export function CirculaireBar({ x, y, width, height, circulaire }: CirculaireBarProps) {
  const { segments, baptemeIndex, surnom, anneeBac } = circulaire;
  const bapteme = segments[baptemeIndex] ?? segments[0];
  if (!bapteme) {
    return <rect x={x} y={y} width={width} height={height} fill="#333" stroke="#555" strokeWidth={2} rx={4} />;
  }

  const totalYears = segments.reduce((sum, s) => sum + s.annees, 0);
  const baptemeColor = bapteme.couleur;
  const textColor = getTextColor(baptemeColor);

  // Reserved zones (left side, under the baptême color)
  const oeilletW = width * OEILLET_ZONE;
  const surnomW = width * SURNOM_ZONE;
  const bacW = width * BAC_ZONE;
  const emblemeW = width * EMBLEME_ZONE;
  const reservedW = oeilletW + surnomW + bacW + emblemeW;

  // Remaining width for cursus segments (étoiles)
  const cursusW = width - reservedW;

  // Frontal position = just after the reserved zones (where emblème sits)
  const frontalX = x + reservedW;

  // Compute segment positions in the cursus area
  const segmentRects: { seg: typeof segments[0]; sx: number; sw: number }[] = [];
  let curX = frontalX;
  for (const seg of segments) {
    const sw = totalYears > 0 ? (seg.annees / totalYears) * cursusW : 0;
    segmentRects.push({ seg, sx: curX, sw });
    curX += sw;
  }

  const cy = y + height / 2;
  const bacStr = `É${String(anneeBac % 100).padStart(2, '0')}`;

  return (
    <g>
      {/* Clip to rounded rectangle */}
      <defs>
        <clipPath id="clip-circulaire">
          <rect x={x} y={y} width={width} height={height} rx={4} />
        </clipPath>
      </defs>

      <g clipPath="url(#clip-circulaire)">
        {/* Background = baptême color (covers the full bar including reserved zones) */}
        <SegmentRect x={x} y={y} w={width} h={height} filiere={bapteme.filiere} couleur={baptemeColor} />

        {/* Cursus segments (overlaid on the right side) */}
        {segmentRects.map(({ seg, sx, sw }, i) => {
          if (i === baptemeIndex) return null; // baptême is already the background
          return (
            <SegmentRect key={i} x={sx} y={y} w={sw} h={height} filiere={seg.filiere} couleur={seg.couleur} />
          );
        })}

        {/* Segment separators */}
        {segmentRects.map(({ sx }, i) => {
          if (i === 0) return null;
          return (
            <line key={`sep-${i}`} x1={sx} y1={y} x2={sx} y2={y + height} stroke="#00000044" strokeWidth={1} />
          );
        })}

        {/* Étoiles (stars) in each segment */}
        {segmentRects.map(({ seg, sx, sw }, i) => {
          const segTextColor = getTextColor(seg.couleur);
          const stars = '★'.repeat(seg.annees);
          return (
            <text
              key={`stars-${i}`}
              x={sx + sw / 2}
              y={cy + 5}
              textAnchor="middle"
              fill={segTextColor}
              fontSize={Math.min(14, sw / (seg.annees * 0.8))}
              fontWeight="bold"
              opacity={0.9}
            >
              {stars}
            </text>
          );
        })}
      </g>

      {/* Oeillet (buttonhole) — gold circle at the left */}
      <circle
        cx={x + oeilletW / 2}
        cy={cy}
        r={height * 0.28}
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth={1.5}
      />
      <circle
        cx={x + oeilletW / 2}
        cy={cy}
        r={height * 0.12}
        fill="none"
        stroke="#B8860B"
        strokeWidth={1}
      />

      {/* Surnom */}
      {surnom && (
        <text
          x={x + oeilletW + surnomW / 2}
          y={cy + 5}
          textAnchor="middle"
          fill={textColor}
          fontSize={13}
          fontWeight="bold"
          fontStyle="italic"
        >
          {surnom}
        </text>
      )}

      {/* Année du bac */}
      <text
        x={x + oeilletW + surnomW + bacW / 2}
        y={cy + 5}
        textAnchor="middle"
        fill={textColor}
        fontSize={12}
        fontWeight="bold"
        fontFamily="serif"
      >
        {bacStr}
      </text>

      {/* Emblème de baptême (at frontal) */}
      <text
        x={x + oeilletW + surnomW + bacW + emblemeW / 2}
        y={cy + 6}
        textAnchor="middle"
        fill={textColor}
        fontSize={16}
      >
        {getEmbleme(bapteme.filiere)}
      </text>

      {/* Outer stroke */}
      <rect x={x} y={y} width={width} height={height} fill="none" stroke="#333" strokeWidth={2} rx={4} />

      {/* Frontal marker */}
      <line
        x1={frontalX}
        y1={y - 8}
        x2={frontalX}
        y2={y + height + 8}
        stroke="#888"
        strokeWidth={1}
        strokeDasharray="4 3"
      />
      <text
        x={frontalX}
        y={y + height + 20}
        textAnchor="middle"
        fill="#666"
        fontSize={10}
      >
        Frontal
      </text>
    </g>
  );
}
