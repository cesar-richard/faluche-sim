import type { Circulaire, CursusSegment, AnneeAnnotation, TypeBac } from '../data/types';
import { BICOLORES, FILIERES } from '../data/filieres';

interface CirculaireBarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  circulaire: Circulaire;
}

// Layout constants (as fractions of total width)
const OEILLET_ZONE = 0.06;
const SURNOM_ZONE = 0.18;
const BAC_ZONE = 0.10;    // slightly wider to fit typeBac
const EMBLEME_ZONE = 0.06;

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

function getTypeBacStr(typeBac: TypeBac): string {
  switch (typeBac) {
    case 'general': return 'Ɣ';
    case 'S': return 'ε';
    case 'international': return 'Ɣi';
    case 'techno': return 'T';
    case 'pro': return 'P';
    case 'capacitaire': return 'C';
    case 'daeu': return 'DAEU';
  }
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

// Build a flat list of "slots" for rendering: each year and each inter-segment marker
interface YearSlot {
  kind: 'year';
  segIndex: number;
  yearIndex: number;
  seg: CursusSegment;
  annotation: AnneeAnnotation;
  isFirstYearOverall: boolean;
}

interface MarkerSlot {
  kind: 'marker';
  type: 'diplome' | 'palmeCycle' | 'abandon';
  segIndex: number;
}

interface EndSlot {
  kind: 'end';
  type: 'quille' | 'abeille';
}

type Slot = YearSlot | MarkerSlot | EndSlot;

function buildSlots(circulaire: Circulaire): Slot[] {
  const slots: Slot[] = [];
  let isFirst = true;
  for (let si = 0; si < circulaire.segments.length; si++) {
    const seg = circulaire.segments[si];
    for (let yi = 0; yi < seg.annees; yi++) {
      const annotation = seg.annotations?.[yi] ?? {};
      slots.push({
        kind: 'year',
        segIndex: si,
        yearIndex: yi,
        seg,
        annotation,
        isFirstYearOverall: isFirst,
      });
      isFirst = false;
    }
    // Inter-segment markers
    if (seg.diplome) slots.push({ kind: 'marker', type: 'diplome', segIndex: si });
    if (seg.palmeCycle) slots.push({ kind: 'marker', type: 'palmeCycle', segIndex: si });
    if (seg.abandon) slots.push({ kind: 'marker', type: 'abandon', segIndex: si });
  }
  if (circulaire.quille) slots.push({ kind: 'end', type: 'quille' });
  if (circulaire.abeille) slots.push({ kind: 'end', type: 'abeille' });
  return slots;
}

// Width weight for each slot type
function slotWeight(slot: Slot): number {
  if (slot.kind === 'year') return slot.annotation.annexe ? 0.6 : 1;
  if (slot.kind === 'marker') return 0.5;
  return 0.5; // end slots
}

export function CirculaireBar({ x, y, width, height, circulaire }: CirculaireBarProps) {
  const { segments, baptemeIndex, surnom, anneeBac, typeBac, moivre } = circulaire;
  const bapteme = segments[baptemeIndex] ?? segments[0];
  if (!bapteme) {
    return <rect x={x} y={y} width={width} height={height} fill="#333" stroke="#555" strokeWidth={2} rx={4} />;
  }

  const baptemeColor = bapteme.couleur;
  const textColor = getTextColor(baptemeColor);

  // Reserved zones
  const oeilletW = width * OEILLET_ZONE;
  const surnomW = width * SURNOM_ZONE;
  const bacW = width * BAC_ZONE;
  const emblemeW = width * EMBLEME_ZONE;
  const reservedW = oeilletW + surnomW + bacW + emblemeW;
  const cursusW = width - reservedW;
  const frontalX = x + reservedW;

  // Build segment background rects for the cursus area
  const totalYears = segments.reduce((sum, s) => sum + s.annees, 0);
  const segmentRects: { seg: CursusSegment; sx: number; sw: number }[] = [];
  let curX = frontalX;
  for (const seg of segments) {
    const sw = totalYears > 0 ? (seg.annees / totalYears) * cursusW : 0;
    segmentRects.push({ seg, sx: curX, sw });
    curX += sw;
  }

  // Build slots and compute per-slot positions in cursusW
  const slots = buildSlots(circulaire);
  const totalWeight = slots.reduce((s, sl) => s + slotWeight(sl), 0);

  const slotPositions: { slot: Slot; cx: number; w: number }[] = [];
  let slotX = frontalX;
  for (const slot of slots) {
    const w = totalWeight > 0 ? (slotWeight(slot) / totalWeight) * cursusW : 0;
    slotPositions.push({ slot, cx: slotX + w / 2, w });
    slotX += w;
  }

  const cy = y + height / 2;
  const bacStr = `É${String(anneeBac % 100).padStart(2, '0')}`;
  const typeBacStr = getTypeBacStr(typeBac ?? 'general');

  return (
    <g>
      <defs>
        <clipPath id="clip-circulaire">
          <rect x={x} y={y} width={width} height={height} rx={4} />
        </clipPath>
      </defs>

      <g clipPath="url(#clip-circulaire)">
        {/* Background = baptême color */}
        <SegmentRect x={x} y={y} w={width} h={height} filiere={bapteme.filiere} couleur={baptemeColor} />

        {/* Cursus segment backgrounds */}
        {segmentRects.map(({ seg, sx, sw }, i) => {
          if (i === baptemeIndex) return null;
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

        {/* Render each slot */}
        {slotPositions.map(({ slot, cx: scx, w: sw }, i) => {
          if (slot.kind === 'year') {
            return (
              <YearRender
                key={`y-${i}`}
                slot={slot}
                cx={scx}
                cy={cy}
                w={sw}
                h={height}
                moivre={moivre}
              />
            );
          }
          if (slot.kind === 'marker') {
            return <MarkerRender key={`m-${i}`} type={slot.type} cx={scx} cy={cy} h={height} segColor={segments[slot.segIndex].couleur} />;
          }
          // end slot
          return <EndRender key={`e-${i}`} type={slot.type} cx={scx} cy={cy} h={height} baptemeColor={baptemeColor} />;
        })}
      </g>

      {/* Oeillet */}
      <circle cx={x + oeilletW / 2} cy={cy} r={height * 0.28} fill="#FFD700" stroke="#B8860B" strokeWidth={1.5} />
      <circle cx={x + oeilletW / 2} cy={cy} r={height * 0.12} fill="none" stroke="#B8860B" strokeWidth={1} />

      {/* Surnom */}
      {surnom && (
        <text
          x={x + oeilletW + surnomW / 2} y={cy + 5}
          textAnchor="middle" fill={textColor}
          fontSize={13} fontWeight="bold" fontStyle="italic"
        >
          {surnom}
        </text>
      )}

      {/* Année du bac + type */}
      <text
        x={x + oeilletW + surnomW + bacW / 2} y={cy + 5}
        textAnchor="middle" fill={textColor}
        fontSize={11} fontWeight="bold" fontFamily="serif"
      >
        {typeBacStr}{bacStr}
      </text>

      {/* Emblème de baptême (at frontal) */}
      <text
        x={x + oeilletW + surnomW + bacW + emblemeW / 2} y={cy + 6}
        textAnchor="middle" fill={textColor} fontSize={16}
      >
        {getEmbleme(bapteme.filiere)}
      </text>

      {/* Outer stroke */}
      <rect x={x} y={y} width={width} height={height} fill="none" stroke="#333" strokeWidth={2} rx={4} />

      {/* Frontal marker */}
      <line
        x1={frontalX} y1={y - 8} x2={frontalX} y2={y + height + 8}
        stroke="#888" strokeWidth={1} strokeDasharray="4 3"
      />
      <text x={frontalX} y={y + height + 20} textAnchor="middle" fill="#666" fontSize={10}>
        Frontal
      </text>
    </g>
  );
}

// --- Sub-components for slot rendering ---

function YearRender({ slot, cx, cy, w, h, moivre }: {
  slot: YearSlot; cx: number; cy: number; w: number; h: number; moivre: 'public' | 'prive';
}) {
  const { annotation, isFirstYearOverall, seg } = slot;
  const segTextColor = getTextColor(seg.couleur);
  const isAnnexe = annotation.annexe;
  const baseFontSize = isAnnexe ? 9 : 13;
  const fontSize = Math.min(baseFontSize, w * 0.9);

  // What to show as the main symbol
  let mainSymbol: string;
  let mainColor = segTextColor;
  if (annotation.cesure) {
    mainSymbol = '0';
  } else if (annotation.equivalence) {
    mainSymbol = 'e';
  } else {
    mainSymbol = '★';
    if (annotation.redoublement) {
      mainColor = '#C0C0C0'; // silver
    }
  }

  const elements: JSX.Element[] = [];

  // Moivre: full-height diagonal stripe behind the star
  if (isFirstYearOverall) {
    const moivreColor = moivre === 'public' ? '#4169E1' : '#FFFFFF';
    const stripW = w * 0.35;
    const yTop = cy - h / 2;
    // Diagonal stripe from top-right to bottom-left
    elements.push(
      <polygon
        key="moivre"
        points={[
          `${cx - stripW / 2},${yTop}`,
          `${cx + stripW / 2},${yTop}`,
          `${cx - stripW / 2},${yTop + h}`,
          `${cx - stripW * 1.5},${yTop + h}`,
        ].join(' ')}
        fill={moivreColor}
        opacity={0.6}
      />
    );
  }

  // Determine what goes above and below the star to avoid overlap
  // Above: étranger flag (priority) or rattrapage
  // Below: alternance "a" (priority) or rattrapage (if étranger is above)
  const hasAbove = !!annotation.etranger || !!annotation.rattrapage;
  const hasBelow = !!annotation.alternance || (!!annotation.rattrapage && !!annotation.etranger);

  const aboveY = cy - h * 0.3;
  const belowY = cy + h * 0.38;

  // Étranger flag — always above the star
  if (annotation.etranger) {
    elements.push(
      <text
        key="etranger"
        x={cx} y={aboveY}
        textAnchor="middle"
        fontSize={8}
      >
        {annotation.etranger}
      </text>
    );
  }

  // Rattrapage — above if no étranger, below if étranger occupies above
  if (annotation.rattrapage) {
    const rattrapY = annotation.etranger ? belowY : aboveY;
    elements.push(
      <text
        key="rattrapage"
        x={cx} y={rattrapY}
        textAnchor="middle"
        fill={segTextColor}
        fontSize={8}
      >
        🐮
      </text>
    );
  }

  // Main symbol (star, 0, or e) — centered, slightly adjusted if annotations above/below
  const starY = cy + (isAnnexe ? 2 : 3) + (hasAbove && hasBelow ? 0 : hasAbove ? 2 : hasBelow ? -1 : 0);
  elements.push(
    <text
      key="main"
      x={cx} y={starY}
      textAnchor="middle"
      fill={mainColor}
      fontSize={fontSize}
      fontWeight="bold"
      opacity={0.95}
    >
      {mainSymbol}
    </text>
  );

  // Major: large palme next to the star
  if (annotation.major) {
    elements.push(
      <text
        key="major"
        x={cx + fontSize * 0.5} y={starY}
        textAnchor="start"
        fill={segTextColor}
        fontSize={fontSize * 0.6}
        opacity={0.9}
      >
        🌿
      </text>
    );
  }

  // Alternance: "a" always below
  if (annotation.alternance) {
    const altY = annotation.rattrapage && annotation.etranger
      ? belowY + 8  // rattrapage already at belowY
      : belowY;
    elements.push(
      <text
        key="alternance"
        x={cx} y={altY}
        textAnchor="middle"
        fill={segTextColor}
        fontSize={7}
        fontStyle="italic"
      >
        a
      </text>
    );
  }

  return <g>{elements}</g>;
}

function MarkerRender({ type, cx, cy, h, segColor }: {
  type: 'diplome' | 'palmeCycle' | 'abandon'; cx: number; cy: number; h: number; segColor: string;
}) {
  const textColor = getTextColor(segColor);
  const fontSize = h * 0.4;

  let symbol: string;
  switch (type) {
    case 'diplome':
      symbol = '🏆'; // double palme croisée de lauriers
      break;
    case 'palmeCycle':
      symbol = '🌿'; // simple palme
      break;
    case 'abandon':
      symbol = '☠'; // tête de mort
      break;
  }

  return (
    <text
      x={cx} y={cy + fontSize * 0.2}
      textAnchor="middle"
      fill={textColor}
      fontSize={fontSize}
    >
      {symbol}
    </text>
  );
}

function EndRender({ type, cx, cy, h, baptemeColor }: {
  type: 'quille' | 'abeille'; cx: number; cy: number; h: number; baptemeColor: string;
}) {
  const textColor = getTextColor(baptemeColor);
  const fontSize = h * 0.4;

  const symbol = type === 'quille' ? '🎳' : '🐝';

  return (
    <text
      x={cx} y={cy + fontSize * 0.2}
      textAnchor="middle"
      fill={textColor}
      fontSize={fontSize}
    >
      {symbol}
    </text>
  );
}
