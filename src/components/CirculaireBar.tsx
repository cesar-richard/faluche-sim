import type { Circulaire, CursusSegment, AnneeAnnotation, TypeBac } from '../data/types';
import { BICOLORES } from '../data/filieres';
import {
  StarInsigne, WreathInsigne, PalmeInsigne, SkullInsigne,
  CowInsigne, BeeInsigne, QuilleInsigne, FiliereEmbleme,
} from './Insignes';

interface CirculaireBarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  circulaire: Circulaire;
}

// Layout constants (as fractions of total width)
const SURNOM_ZONE = 0.20;
const INITIALES_ZONE = 0.06;
const BAC_ZONE = 0.10;

function getTypeBacStr(typeBac: TypeBac, typeBacAutre?: string): string {
  switch (typeBac) {
    case 'general': return 'γ';
    case 'ES': return 'β';
    case 'L': return 'φ';
    case 'S': return 'ε';
    case 'S_SVT': return 'φε';
    case 'international': return 'I';
    case 'techno': return 'T';
    case 'pro': return 'P';
    case 'capacitaire': return 'C';
    case 'daeu': return 'DAEU';
    case 'autre': return typeBacAutre || '?';
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

// Build a flat list of "slots" for rendering
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

interface LabelSlot {
  kind: 'label';
  text: string;
  segIndex: number;
  seg: CursusSegment;
}

interface EmblemeSlot {
  kind: 'embleme';
  segIndex: number;
  filiere: string;
}

interface EndSlot {
  kind: 'end';
  type: 'quille' | 'abeille';
}

type Slot = YearSlot | LabelSlot | MarkerSlot | EmblemeSlot | EndSlot;

function buildSlots(circulaire: Circulaire): Slot[] {
  const slots: Slot[] = [];
  let isFirst = true;
  for (let si = 0; si < circulaire.segments.length; si++) {
    const seg = circulaire.segments[si];
    // Insert emblème slot at the start of the baptême segment
    if (si === circulaire.baptemeIndex) {
      slots.push({ kind: 'embleme', segIndex: si, filiere: seg.filiere });
    }
    if (seg.label) {
      slots.push({ kind: 'label', text: seg.label, segIndex: si, seg });
    }
    for (let yi = 0; yi < seg.annees; yi++) {
      const annotation = seg.annotations?.[yi] ?? {};
      slots.push({ kind: 'year', segIndex: si, yearIndex: yi, seg, annotation, isFirstYearOverall: isFirst });
      isFirst = false;
    }
    if (seg.diplome) slots.push({ kind: 'marker', type: 'diplome', segIndex: si });
    if (seg.palmeCycle) slots.push({ kind: 'marker', type: 'palmeCycle', segIndex: si });
    if (seg.abandon) slots.push({ kind: 'marker', type: 'abandon', segIndex: si });
  }
  if (circulaire.quille) slots.push({ kind: 'end', type: 'quille' });
  if (circulaire.abeille) slots.push({ kind: 'end', type: 'abeille' });
  return slots;
}

function slotWeight(slot: Slot): number {
  if (slot.kind === 'year') return slot.annotation.annexe ? 0.4 : 0.8;
  if (slot.kind === 'label') return 0.8;
  if (slot.kind === 'marker') return 0.8;
  if (slot.kind === 'embleme') return 1.2;
  return 0.5;
}

export function CirculaireBar({ x, y, width, height, circulaire }: CirculaireBarProps) {
  const { segments, baptemeIndex, initiales, surnom, anneeBac, typeBac, moivre } = circulaire;
  const bapteme = segments[baptemeIndex] ?? segments[0];
  if (!bapteme) {
    return <rect x={x} y={y} width={width} height={height} fill="#333" stroke="#555" strokeWidth={2} rx={4} />;
  }

  const baptemeColor = bapteme.couleur;

  const surnomW = surnom ? width * SURNOM_ZONE : 0;
  const initialesW = initiales ? width * INITIALES_ZONE : 0;
  const bacW = width * BAC_ZONE;
  const reservedW = surnomW + initialesW + bacW;
  const cursusW = width - reservedW;
  const cursusStartX = x + reservedW;

  // Build slots with compact sizing
  const slots = buildSlots(circulaire);
  const totalWeight = slots.reduce((s, sl) => s + slotWeight(sl), 0);
  const compactW = totalWeight * height * 0.7;
  const effectiveCursusW = Math.min(cursusW, Math.max(compactW, cursusW * 0.5));

  const slotPositions: { slot: Slot; cx: number; w: number }[] = [];
  let slotX = cursusStartX;
  let frontalX = cursusStartX;
  let foundFrontal = false;

  for (const slot of slots) {
    const w = totalWeight > 0 ? (slotWeight(slot) / totalWeight) * effectiveCursusW : 0;
    // Frontal = left edge of the first slot belonging to the baptême segment
    if (!foundFrontal && 'segIndex' in slot && slot.segIndex === baptemeIndex) {
      frontalX = slotX;
      foundFrontal = true;
    }
    slotPositions.push({ slot, cx: slotX + w / 2, w });
    slotX += w;
  }

  // Derive segment background rectangles from their slot positions
  const segmentRects: { seg: CursusSegment; sx: number; sw: number }[] = [];
  for (let si = 0; si < segments.length; si++) {
    const segSlots = slotPositions.filter(({ slot }) => 'segIndex' in slot && slot.segIndex === si);
    if (segSlots.length === 0) {
      segmentRects.push({ seg: segments[si], sx: cursusStartX, sw: 0 });
      continue;
    }
    const first = segSlots[0];
    const last = segSlots[segSlots.length - 1];
    const sx = first.cx - first.w / 2;
    const ex = last.cx + last.w / 2;
    segmentRects.push({ seg: segments[si], sx, sw: ex - sx });
  }

  const cy = y + height / 2;
  const bacStr = `${String(anneeBac % 100).padStart(2, '0')}`;
  const typeBacStr = getTypeBacStr(typeBac ?? 'general', circulaire.typeBacAutre);
  // X positions for each zone
  const surnomX = x + surnomW / 2;
  const initialesX = x + surnomW + initialesW / 2;
  const bacX = x + surnomW + initialesW + bacW / 2;

  return (
    <g>
      <defs>
        <clipPath id="clip-circulaire">
          <rect x={x} y={y} width={width} height={height} rx={4} />
        </clipPath>
      </defs>

      <g clipPath="url(#clip-circulaire)">
        <SegmentRect x={x} y={y} w={width} h={height} filiere={bapteme.filiere} couleur={baptemeColor} />

        {segmentRects.map(({ seg, sx, sw }, i) => {
          if (i === baptemeIndex) return null;
          return <SegmentRect key={i} x={sx} y={y} w={sw} h={height} filiere={seg.filiere} couleur={seg.couleur} />;
        })}

        {segmentRects.map(({ sx }, i) => {
          if (i === 0) return null;
          return <line key={`sep-${i}`} x1={sx} y1={y} x2={sx} y2={y + height} stroke="#00000044" strokeWidth={1} />;
        })}

        {slotPositions.map(({ slot, cx: scx, w: sw }, i) => {
          if (slot.kind === 'label') {
            return <LabelRender key={`l-${i}`} text={slot.text} cx={scx} cy={cy} h={height} />;
          }
          if (slot.kind === 'year') {
            return <YearRender key={`y-${i}`} slot={slot} cx={scx} cy={cy} w={sw} h={height} barY={y} moivre={moivre} />;
          }
          if (slot.kind === 'marker') {
            return <MarkerRender key={`m-${i}`} type={slot.type} cx={scx} cy={cy} h={height} />;
          }
          if (slot.kind === 'embleme') {
            return <FiliereEmbleme key={`emb-${i}`} filiere={slot.filiere} cx={scx} cy={cy} size={height * 0.55} color="#FFD700" stroke="#B8860B" />;
          }
          return <EndRender key={`e-${i}`} type={slot.type} cx={scx} cy={cy} h={height} />;
        })}
      </g>

      {/* Surnom */}
      {surnom && (
        <text x={surnomX} y={cy + height * 0.08} textAnchor="middle" fill="#FFD700" stroke="#B8860B" strokeWidth={0.3} fontSize={Math.round(height * 0.28)} fontWeight="bold" fontStyle="italic">
          {surnom}
        </text>
      )}

      {/* Initiales */}
      {initiales && (
        <text x={initialesX} y={cy + height * 0.08} textAnchor="middle" fill="#FFD700" stroke="#B8860B" strokeWidth={0.3} fontSize={Math.round(height * 0.28)} fontWeight="bold" fontFamily="serif">
          {initiales}
        </text>
      )}

      {/* Année du bac + type */}
      <text x={bacX} y={cy + height * 0.08} textAnchor="middle" fill="#FFD700" stroke="#B8860B" strokeWidth={0.5} fontSize={Math.round(height * 0.28)} fontWeight="bold" fontFamily="serif">
        {typeBacStr}{bacStr}
      </text>

      {/* Outer stroke */}
      <rect x={x} y={y} width={width} height={height} fill="none" stroke="#333" strokeWidth={2} rx={4} />

      {/* Frontal marker */}
      <line x1={frontalX} y1={y - 8} x2={frontalX} y2={y + height + 8} stroke="#888" strokeWidth={1} strokeDasharray="4 3" />
      <text x={frontalX} y={y + height + 20} textAnchor="middle" fill="#666" fontSize={10}>Frontal</text>
    </g>
  );
}

// --- Sub-components for slot rendering ---

function YearRender({ slot, cx, cy, w, h, barY, moivre }: {
  slot: YearSlot; cx: number; cy: number; w: number; h: number; barY: number; moivre: 'public' | 'prive';
}) {
  const { annotation, isFirstYearOverall } = slot;
  const isAnnexe = annotation.annexe;
  const baseStarSize = isAnnexe ? h * 0.12 : h * 0.18;
  const starSize = Math.min(baseStarSize, w * 0.45);

  const starColor = annotation.redoublement ? '#C0C0C0' : '#FFD700';
  const starStroke = annotation.redoublement ? '#808080' : '#B8860B';

  const elements: React.JSX.Element[] = [];

  // Moivre: full-height diagonal stripe
  if (isFirstYearOverall) {
    const moivreColor = moivre === 'public' ? '#87CEEB' : '#FFFFFF';
    const stripW = w * 0.35;
    const skew = stripW * 0.3;
    elements.push(
      <polygon key="moivre" points={[
        `${cx - stripW / 2 + skew},${barY}`,
        `${cx + stripW / 2 + skew},${barY}`,
        `${cx + stripW / 2 - skew},${barY + h}`,
        `${cx - stripW / 2 - skew},${barY + h}`,
      ].join(' ')} fill={moivreColor} opacity={0.7} />
    );
  }

  const hasAbove = !!annotation.etranger || !!annotation.rattrapage;
  const hasBelow = !!annotation.alternance || (!!annotation.rattrapage && !!annotation.etranger);
  const aboveY = cy - h * 0.20;
  const belowY = cy + h * 0.38;

  if (annotation.etranger) {
    elements.push(
      <text key="etranger" x={cx} y={aboveY} textAnchor="middle" fontSize={Math.round(h * 0.4)}>{annotation.etranger}</text>
    );
  }

  if (annotation.rattrapage) {
    const rattrapY = annotation.etranger ? belowY : aboveY;
    elements.push(
      <CowInsigne key="rattrapage" cx={cx} cy={rattrapY} size={h * 0.3} />
    );
  }

  const starYOffset = hasAbove && hasBelow ? 0 : hasAbove ? 2 : hasBelow ? -1 : 0;
  const starCy = cy + starYOffset;

  if (annotation.cesure) {
    elements.push(
      <text key="main" x={cx} y={starCy + starSize * 0.4} textAnchor="middle" fill={starColor} fontSize={starSize * 2.5} fontWeight="bold">0</text>
    );
  } else if (annotation.equivalence) {
    elements.push(
      <text key="main" x={cx} y={starCy + starSize * 0.4} textAnchor="middle" fill={starColor} fontSize={starSize * 2.5} fontWeight="bold" fontStyle="italic">e</text>
    );
  } else {
    elements.push(
      <StarInsigne key="main" cx={cx} cy={starCy} size={starSize} color={starColor} stroke={starStroke} />
    );
  }

  if (annotation.major) {
    elements.push(
      <PalmeInsigne key="major" cx={cx + starSize * 1.5} cy={starCy} size={starSize * 1.2} color="#FFD700" />
    );
  }

  if (annotation.alternance) {
    const altY = annotation.rattrapage && annotation.etranger ? belowY + 8 : belowY;
    elements.push(
      <text key="alternance" x={cx} y={altY} textAnchor="middle" fill="#FFD700" stroke="#B8860B" strokeWidth={0.3} fontSize={Math.round(h * 0.2)} fontWeight="bold" fontStyle="italic">a</text>
    );
  }

  return <g>{elements}</g>;
}

function LabelRender({ text, cx, cy, h }: {
  text: string; cx: number; cy: number; h: number;
}) {
  const fontSize = Math.round(h * 0.28);
  return (
    <text x={cx} y={cy + fontSize * 0.35} textAnchor="middle" fill="#FFD700" stroke="#B8860B" strokeWidth={0.4} fontSize={fontSize} fontWeight="bold" fontFamily="serif">
      {text}
    </text>
  );
}

function MarkerRender({ type, cx, cy, h }: {
  type: 'diplome' | 'palmeCycle' | 'abandon'; cx: number; cy: number; h: number;
}) {
  const size = h * 0.4;
  switch (type) {
    case 'diplome':
      return <WreathInsigne cx={cx} cy={cy} size={size} />;
    case 'palmeCycle':
      return <PalmeInsigne cx={cx} cy={cy} size={size} />;
    case 'abandon':
      return <SkullInsigne cx={cx} cy={cy} size={size} />;
  }
}

function EndRender({ type, cx, cy, h }: {
  type: 'quille' | 'abeille'; cx: number; cy: number; h: number;
}) {
  const size = h * 0.3;
  switch (type) {
    case 'quille':
      return <QuilleInsigne cx={cx} cy={cy} size={size} />;
    case 'abeille':
      return <BeeInsigne cx={cx} cy={cy} size={size} />;
  }
}
