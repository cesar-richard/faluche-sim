/**
 * SVG insigne components for the faluche circulaire and filière emblems.
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

// --- Circulaire insignes ---

/** Five-pointed star — étoile dorée ou argentée */
export function StarInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const pts: string[] = [];
  const inner = size * 0.38;
  for (let i = 0; i < 5; i++) {
    const oA = (i * 72 - 90) * Math.PI / 180;
    const iA = (i * 72 + 36 - 90) * Math.PI / 180;
    pts.push(`${cx + size * Math.cos(oA)},${cy + size * Math.sin(oA)}`);
    pts.push(`${cx + inner * Math.cos(iA)},${cy + inner * Math.sin(iA)}`);
  }
  return <polygon points={pts.join(' ')} fill={color} stroke={stroke} strokeWidth={size * 0.08} strokeLinejoin="round" />;
}

/** Laurel wreath — palmes croisées de chêne et de laurier (diplôme)
 * Left branch = oak leaves (broader, lobed). Right branch = laurel leaves (narrow, pointed).
 * Open at the top, branches cross at the bottom with a small rosette. */
export function WreathInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size;

  // Helper: point on the wreath arc (C-shaped, open at top)
  // t goes from 0 (top-right) to 1 (bottom) to 2 (top-left)
  // We use a circular arc from about -70deg to 250deg (0deg = right)
  const arcPoint = (t: number): [number, number] => {
    // t: 0 = top-right tip, 1 = bottom center, 2 = top-left tip
    const startAngle = -70; // degrees, top-right
    const endAngle = 250;   // degrees, top-left
    const angleDeg = startAngle + (t / 2) * (endAngle - startAngle);
    const angleRad = (angleDeg * Math.PI) / 180;
    const r = s * 0.38;
    return [r * Math.cos(angleRad), r * Math.sin(angleRad)];
  };

  // Tangent angle at a point on the arc
  const arcTangentDeg = (t: number): number => {
    const startAngle = -70;
    const endAngle = 250;
    return startAngle + (t / 2) * (endAngle - startAngle) + 90;
  };

  // Right branch (laurel): narrow pointed leaves, t from 0 to ~0.9
  const laurelLeaves: React.JSX.Element[] = [];
  const laurelPositions = [0.15, 0.35, 0.55, 0.75, 0.92];
  for (let i = 0; i < laurelPositions.length; i++) {
    const t = laurelPositions[i];
    const [px, py] = arcPoint(t);
    const tangent = arcTangentDeg(t);
    // Leaf pointing outward from the arc
    const outAngle = tangent - 90; // perpendicular outward
    const leafLen = s * 0.16;
    const leafWid = s * 0.055;
    // Two leaves per position: one outward, one slightly inward
    laurelLeaves.push(
      <ellipse key={`lr${i}`} cx={px} cy={py} rx={leafLen} ry={leafWid}
        fill={color} stroke={stroke} strokeWidth={s * 0.015}
        transform={`rotate(${outAngle + 20},${px},${py})`} />
    );
    laurelLeaves.push(
      <ellipse key={`lri${i}`} cx={px} cy={py} rx={leafLen * 0.7} ry={leafWid * 0.8}
        fill={color} stroke={stroke} strokeWidth={s * 0.015}
        transform={`rotate(${outAngle - 25},${px},${py})`} />
    );
  }

  // Left branch (oak): broader, rounder lobed leaves, t from 2 down to ~1.1
  const oakLeaves: React.JSX.Element[] = [];
  const oakPositions = [1.85, 1.65, 1.45, 1.25, 1.08];
  for (let i = 0; i < oakPositions.length; i++) {
    const t = oakPositions[i];
    const [px, py] = arcPoint(t);
    const tangent = arcTangentDeg(t);
    const outAngle = tangent + 90; // perpendicular outward (opposite side)
    const leafR = s * 0.1;
    // Oak leaf: a wider, rounder shape with slight lobes (drawn as a rounded path)
    const rad = (outAngle * Math.PI) / 180;
    const lx = px + Math.cos(rad) * s * 0.04;
    const ly = py + Math.sin(rad) * s * 0.04;
    oakLeaves.push(
      <g key={`ok${i}`} transform={`rotate(${outAngle},${lx},${ly})`}>
        {/* Oak leaf: a broad leaf shape with 3 lobes */}
        <path
          d={`M ${lx},${ly - leafR * 0.3}
              Q ${lx + leafR * 0.5},${ly - leafR * 0.8} ${lx + leafR * 0.3},${ly - leafR * 1.1}
              Q ${lx + leafR * 0.1},${ly - leafR * 0.8} ${lx + leafR * 0.5},${ly - leafR * 0.4}
              Q ${lx + leafR * 0.8},${ly - leafR * 0.1} ${lx + leafR * 0.9},${ly + leafR * 0.3}
              Q ${lx + leafR * 0.5},${ly + leafR * 0.15} ${lx + leafR * 0.7},${ly + leafR * 0.7}
              Q ${lx + leafR * 0.3},${ly + leafR * 0.5} ${lx + leafR * 0.15},${ly + leafR * 0.9}
              Q ${lx},${ly + leafR * 0.5} ${lx - leafR * 0.15},${ly + leafR * 0.9}
              Q ${lx - leafR * 0.3},${ly + leafR * 0.5} ${lx - leafR * 0.7},${ly + leafR * 0.7}
              Q ${lx - leafR * 0.5},${ly + leafR * 0.15} ${lx - leafR * 0.9},${ly + leafR * 0.3}
              Q ${lx - leafR * 0.8},${ly - leafR * 0.1} ${lx - leafR * 0.5},${ly - leafR * 0.4}
              Q ${lx - leafR * 0.1},${ly - leafR * 0.8} ${lx - leafR * 0.3},${ly - leafR * 1.1}
              Q ${lx - leafR * 0.5},${ly - leafR * 0.8} ${lx},${ly - leafR * 0.3} Z`}
          fill={color} stroke={stroke} strokeWidth={s * 0.015}
        />
      </g>
    );
  }

  // Branch stems: draw the curved arc for each branch
  // Right branch (laurel side): from top-right to bottom
  const branchPoints = (tStart: number, tEnd: number, steps: number): string => {
    const pts: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = tStart + (i / steps) * (tEnd - tStart);
      const [px, py] = arcPoint(t);
      pts.push(`${px},${py}`);
    }
    return pts.join(' ');
  };

  // Bottom crossing: small rosette / decorative knot
  const [bx, by] = arcPoint(1); // bottom center

  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Right branch stem (laurel) */}
      <polyline points={branchPoints(0, 0.98, 12)} fill="none" stroke={stroke} strokeWidth={s * 0.05} strokeLinecap="round" strokeLinejoin="round" />
      {/* Left branch stem (oak) */}
      <polyline points={branchPoints(2, 1.02, 12)} fill="none" stroke={stroke} strokeWidth={s * 0.05} strokeLinecap="round" strokeLinejoin="round" />
      {/* Laurel leaves (right branch) */}
      {laurelLeaves}
      {/* Oak leaves (left branch) */}
      {oakLeaves}
      {/* Bottom crossing: the two branches overlap */}
      {/* Small rosette at the crossing point */}
      <circle cx={bx} cy={by} r={s * 0.06} fill={color} stroke={stroke} strokeWidth={s * 0.02} />
      <circle cx={bx - s * 0.07} cy={by + s * 0.02} r={s * 0.04} fill={color} stroke={stroke} strokeWidth={s * 0.015} />
      <circle cx={bx + s * 0.07} cy={by + s * 0.02} r={s * 0.04} fill={color} stroke={stroke} strokeWidth={s * 0.015} />
    </g>
  );
}

/** Single palm branch — palme simple (fin de cycle) */
export function PalmeInsigne({ cx, cy, size, color = '#FFD700' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      <path d={`M 0,${s * 0.45} C ${s * 0.03},0 ${-s * 0.03},${-s * 0.2} 0,${-s * 0.45}`}
        fill="none" stroke={color} strokeWidth={s * 0.07} strokeLinecap="round" />
      {[-0.3, -0.15, 0, 0.15, 0.3].map((t, i) => (
        <g key={i}>
          <ellipse cx={-s * 0.14} cy={s * t} rx={s * 0.11} ry={s * 0.045}
            fill={color} transform={`rotate(-35,${-s * 0.14},${s * t})`} />
          <ellipse cx={s * 0.14} cy={s * t} rx={s * 0.11} ry={s * 0.045}
            fill={color} transform={`rotate(35,${s * 0.14},${s * t})`} />
        </g>
      ))}
    </g>
  );
}

/** Skull and crossbones — tête de mort (abandon) */
export function SkullInsigne({ cx, cy, size, color = '#EEEEEE', stroke = '#888' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Crossbones behind */}
      <line x1={-s * 0.4} y1={s * 0.2} x2={s * 0.4} y2={s * 0.5} stroke={color} strokeWidth={s * 0.08} strokeLinecap="round" />
      <line x1={s * 0.4} y1={s * 0.2} x2={-s * 0.4} y2={s * 0.5} stroke={color} strokeWidth={s * 0.08} strokeLinecap="round" />
      {/* Skull */}
      <ellipse cx={0} cy={-s * 0.05} rx={s * 0.3} ry={s * 0.35} fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* Eyes */}
      <ellipse cx={-s * 0.1} cy={-s * 0.1} rx={s * 0.07} ry={s * 0.09} fill="#333" />
      <ellipse cx={s * 0.1} cy={-s * 0.1} rx={s * 0.07} ry={s * 0.09} fill="#333" />
      {/* Nose */}
      <path d={`M 0,${s * 0.02} l ${-s * 0.04},${s * 0.07} l ${s * 0.08},0 Z`} fill="#333" />
      {/* Teeth */}
      <rect x={-s * 0.15} y={s * 0.15} width={s * 0.3} height={s * 0.08} rx={s * 0.02} fill={color} stroke={stroke} strokeWidth={s * 0.02} />
      <line x1={-s * 0.05} y1={s * 0.15} x2={-s * 0.05} y2={s * 0.23} stroke="#333" strokeWidth={s * 0.02} />
      <line x1={s * 0.05} y1={s * 0.15} x2={s * 0.05} y2={s * 0.23} stroke="#333" strokeWidth={s * 0.02} />
    </g>
  );
}

/** Cow head — tête de vache (rattrapage) */
export function CowInsigne({ cx, cy, size, color = '#D2B48C', stroke = '#8B6914' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Head */}
      <ellipse cx={0} cy={s * 0.05} rx={s * 0.28} ry={s * 0.22} fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* Horns */}
      <path d={`M ${-s * 0.2},${-s * 0.12} Q ${-s * 0.32},${-s * 0.4} ${-s * 0.12},${-s * 0.35}`}
        fill="none" stroke={stroke} strokeWidth={s * 0.06} strokeLinecap="round" />
      <path d={`M ${s * 0.2},${-s * 0.12} Q ${s * 0.32},${-s * 0.4} ${s * 0.12},${-s * 0.35}`}
        fill="none" stroke={stroke} strokeWidth={s * 0.06} strokeLinecap="round" />
      {/* Eyes */}
      <circle cx={-s * 0.1} cy={0} r={s * 0.03} fill="#333" />
      <circle cx={s * 0.1} cy={0} r={s * 0.03} fill="#333" />
      {/* Muzzle */}
      <ellipse cx={0} cy={s * 0.15} rx={s * 0.15} ry={s * 0.08} fill="#C4A882" stroke={stroke} strokeWidth={s * 0.02} />
      <circle cx={-s * 0.05} cy={s * 0.15} r={s * 0.02} fill="#333" />
      <circle cx={s * 0.05} cy={s * 0.15} r={s * 0.02} fill="#333" />
    </g>
  );
}

/** Napoleonic bee — abeille (cursus exemplaire) */
export function BeeInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Wings */}
      <ellipse cx={-s * 0.22} cy={-s * 0.15} rx={s * 0.2} ry={s * 0.1} fill="rgba(255,255,255,0.5)" stroke={stroke} strokeWidth={s * 0.02}
        transform={`rotate(-25,${-s * 0.22},${-s * 0.15})`} />
      <ellipse cx={s * 0.22} cy={-s * 0.15} rx={s * 0.2} ry={s * 0.1} fill="rgba(255,255,255,0.5)" stroke={stroke} strokeWidth={s * 0.02}
        transform={`rotate(25,${s * 0.22},${-s * 0.15})`} />
      {/* Body */}
      <ellipse cx={0} cy={0.05 * s} rx={s * 0.15} ry={s * 0.3} fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      {/* Stripes */}
      <line x1={-s * 0.12} y1={-s * 0.05} x2={s * 0.12} y2={-s * 0.05} stroke="#333" strokeWidth={s * 0.04} />
      <line x1={-s * 0.14} y1={s * 0.1} x2={s * 0.14} y2={s * 0.1} stroke="#333" strokeWidth={s * 0.04} />
      <line x1={-s * 0.12} y1={s * 0.25} x2={s * 0.12} y2={s * 0.25} stroke="#333" strokeWidth={s * 0.04} />
      {/* Head */}
      <circle cx={0} cy={-s * 0.3} r={s * 0.08} fill="#333" />
      {/* Antennae */}
      <line x1={-s * 0.04} y1={-s * 0.36} x2={-s * 0.12} y2={-s * 0.46} stroke="#333" strokeWidth={s * 0.02} />
      <line x1={s * 0.04} y1={-s * 0.36} x2={s * 0.12} y2={-s * 0.46} stroke="#333" strokeWidth={s * 0.02} />
      <circle cx={-s * 0.12} cy={-s * 0.46} r={s * 0.02} fill="#333" />
      <circle cx={s * 0.12} cy={-s * 0.46} r={s * 0.02} fill="#333" />
    </g>
  );
}

/** Bowling pin — quille (service militaire/civique) */
export function QuilleInsigne({ cx, cy, size, color = '#EEEEEE', stroke = '#888' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      <path
        d={`M ${-s * 0.1},${s * 0.45}
            Q ${-s * 0.18},${s * 0.15} ${-s * 0.07},${-s * 0.05}
            Q ${-s * 0.1},${-s * 0.2} ${-s * 0.05},${-s * 0.32}
            Q 0,${-s * 0.45} ${s * 0.05},${-s * 0.32}
            Q ${s * 0.1},${-s * 0.2} ${s * 0.07},${-s * 0.05}
            Q ${s * 0.18},${s * 0.15} ${s * 0.1},${s * 0.45} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04}
      />
      {/* Red stripe */}
      <line x1={-s * 0.08} y1={-s * 0.02} x2={s * 0.08} y2={-s * 0.02} stroke="#CC0000" strokeWidth={s * 0.06} />
    </g>
  );
}

// --- Filière emblèmes ---

/** Étoile et Foudre — Écoles d'ingénieurs
 * Central 5-pointed star with symmetric zigzag lightning bolts radiating outward
 * in a bowtie/butterfly pattern. Each side has multiple parallel zigzag lines
 * that fan out vertically as they extend from the star, with arrow tips. */
export function EtoileFoudreInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size;

  // Lightning bolts: zigzag lines radiating outward on each side.
  // Each bolt goes from near the star outward, zigzagging vertically.
  // Multiple bolts per side, fanning out at different vertical angles.
  const bolts: React.JSX.Element[] = [];
  const numBolts = 5; // bolts per side
  const zigSegments = 4; // number of zigzag segments per bolt
  const zigAmp = s * 0.06; // zigzag amplitude (half-height of each zig)

  for (let side = -1; side <= 1; side += 2) {
    for (let b = 0; b < numBolts; b++) {
      // Fan angle: bolts spread vertically. Center bolt is horizontal.
      const fanAngle = ((b - (numBolts - 1) / 2) / ((numBolts - 1) / 2)) * 28; // degrees from horizontal
      const fanRad = (fanAngle * Math.PI) / 180;

      // Start near the star, end at the edge
      const startDist = s * 0.18;
      const endDist = s * 0.52;

      // Build zigzag points along the ray direction
      const pts: string[] = [];
      for (let seg = 0; seg <= zigSegments * 2; seg++) {
        const t = seg / (zigSegments * 2);
        const dist = startDist + t * (endDist - startDist);
        // Zigzag perpendicular to the ray
        const zigOffset = (seg % 2 === 0) ? 0 : ((Math.floor(seg / 2) % 2 === 0) ? zigAmp : -zigAmp);
        // Ray direction
        const rx = side * dist * Math.cos(fanRad);
        const ry = dist * Math.sin(fanRad);
        // Perpendicular direction (rotated 90 degrees from ray)
        const px = -Math.sin(fanRad) * zigOffset;
        const py = side * Math.cos(fanRad) * zigOffset;
        pts.push(`${rx + px},${ry + py}`);
      }

      // Arrow tip at the end
      const tipDist = endDist + s * 0.06;
      const tipX = side * tipDist * Math.cos(fanRad);
      const tipY = tipDist * Math.sin(fanRad);
      // Last point of zigzag
      const lastPt = pts[pts.length - 1].split(',').map(Number);

      bolts.push(
        <polyline
          key={`bolt${side}${b}`}
          points={pts.join(' ')}
          fill="none"
          stroke={color}
          strokeWidth={s * 0.035}
          strokeLinejoin="miter"
          strokeLinecap="butt"
        />
      );

      // Arrow head at tip
      const arrowSize = s * 0.07;
      const rayAngle = Math.atan2(tipY - lastPt[1], tipX - lastPt[0]);
      const a1x = tipX - arrowSize * Math.cos(rayAngle - 0.45);
      const a1y = tipY - arrowSize * Math.sin(rayAngle - 0.45);
      const a2x = tipX - arrowSize * Math.cos(rayAngle + 0.45);
      const a2y = tipY - arrowSize * Math.sin(rayAngle + 0.45);
      bolts.push(
        <polygon
          key={`arrow${side}${b}`}
          points={`${tipX},${tipY} ${a1x},${a1y} ${a2x},${a2y}`}
          fill={color}
          stroke={stroke}
          strokeWidth={s * 0.01}
        />
      );
    }
  }

  // Central 5-pointed star (slightly larger to anchor the design)
  const starPts: string[] = [];
  const outerR = s * 0.18;
  const innerR = outerR * 0.42;
  for (let i = 0; i < 5; i++) {
    const oA = ((i * 72 - 90) * Math.PI) / 180;
    const iA = ((i * 72 + 36 - 90) * Math.PI) / 180;
    starPts.push(`${outerR * Math.cos(oA)},${outerR * Math.sin(oA)}`);
    starPts.push(`${innerR * Math.cos(iA)},${innerR * Math.sin(iA)}`);
  }

  return (
    <g transform={`translate(${cx},${cy})`}>
      {bolts}
      <polygon
        points={starPts.join(' ')}
        fill={color}
        stroke={stroke}
        strokeWidth={s * 0.04}
        strokeLinejoin="round"
      />
    </g>
  );
}

/** Caducée (rod with snake) — Médecine */
export function CaduceeMedInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Staff */}
      <line x1={0} y1={-s * 0.45} x2={0} y2={s * 0.45} stroke={color} strokeWidth={s * 0.07} strokeLinecap="round" />
      {/* Snake winding around */}
      <path d={`M ${-s * 0.2},${s * 0.3} Q ${s * 0.25},${s * 0.15} ${-s * 0.2},0 Q ${s * 0.25},${-s * 0.15} ${-s * 0.15},${-s * 0.25}`}
        fill="none" stroke={stroke} strokeWidth={s * 0.06} strokeLinecap="round" />
      {/* Mirror at top */}
      <circle cx={0} cy={-s * 0.45} r={s * 0.08} fill={color} stroke={stroke} strokeWidth={s * 0.03} />
    </g>
  );
}

/** Caducée Mercure (two snakes + wings) — Commerce / Pharmacie */
export function CaduceeMercureInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Staff */}
      <line x1={0} y1={-s * 0.3} x2={0} y2={s * 0.45} stroke={color} strokeWidth={s * 0.06} strokeLinecap="round" />
      {/* Left snake */}
      <path d={`M ${-s * 0.05},${s * 0.35} Q ${-s * 0.25},${s * 0.15} ${s * 0.05},0 Q ${-s * 0.2},${-s * 0.15} 0,${-s * 0.25}`}
        fill="none" stroke={color} strokeWidth={s * 0.04} />
      {/* Right snake */}
      <path d={`M ${s * 0.05},${s * 0.35} Q ${s * 0.25},${s * 0.15} ${-s * 0.05},0 Q ${s * 0.2},${-s * 0.15} 0,${-s * 0.25}`}
        fill="none" stroke={color} strokeWidth={s * 0.04} />
      {/* Wings */}
      <ellipse cx={-s * 0.2} cy={-s * 0.3} rx={s * 0.15} ry={s * 0.07} fill={color} transform={`rotate(-15,${-s * 0.2},${-s * 0.3})`} />
      <ellipse cx={s * 0.2} cy={-s * 0.3} rx={s * 0.15} ry={s * 0.07} fill={color} transform={`rotate(15,${s * 0.2},${-s * 0.3})`} />
      {/* Top circle */}
      <circle cx={0} cy={-s * 0.38} r={s * 0.07} fill={color} stroke={stroke} strokeWidth={s * 0.02} />
    </g>
  );
}

/** Scales of justice — ⚖ Droit / AES */
export function ScalesInsigne({ cx, cy, size, color = '#FFD700', stroke: _stroke = '#B8860B' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Pillar */}
      <line x1={0} y1={-s * 0.35} x2={0} y2={s * 0.4} stroke={color} strokeWidth={s * 0.06} />
      {/* Base */}
      <line x1={-s * 0.2} y1={s * 0.4} x2={s * 0.2} y2={s * 0.4} stroke={color} strokeWidth={s * 0.06} strokeLinecap="round" />
      {/* Beam */}
      <line x1={-s * 0.35} y1={-s * 0.25} x2={s * 0.35} y2={-s * 0.25} stroke={color} strokeWidth={s * 0.05} strokeLinecap="round" />
      {/* Left pan */}
      <path d={`M ${-s * 0.35},${-s * 0.25} L ${-s * 0.45},${s * 0.05} A ${s * 0.12} ${s * 0.05} 0 0 0 ${-s * 0.25},${s * 0.05} Z`}
        fill="none" stroke={color} strokeWidth={s * 0.03} />
      {/* Right pan */}
      <path d={`M ${s * 0.35},${-s * 0.25} L ${s * 0.45},${s * 0.05} A ${s * 0.12} ${s * 0.05} 0 0 0 ${s * 0.25},${s * 0.05} Z`}
        fill="none" stroke={color} strokeWidth={s * 0.03} />
    </g>
  );
}

/** Atom — ⚛ Sciences */
export function AtomInsigne({ cx, cy, size, color = '#FFD700', stroke: _stroke = '#B8860B' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      <ellipse cx={0} cy={0} rx={s * 0.4} ry={s * 0.15} fill="none" stroke={color} strokeWidth={s * 0.04} />
      <ellipse cx={0} cy={0} rx={s * 0.4} ry={s * 0.15} fill="none" stroke={color} strokeWidth={s * 0.04} transform="rotate(60)" />
      <ellipse cx={0} cy={0} rx={s * 0.4} ry={s * 0.15} fill="none" stroke={color} strokeWidth={s * 0.04} transform="rotate(-60)" />
      <circle cx={0} cy={0} r={s * 0.08} fill={color} />
    </g>
  );
}

/** Cross — ✚ Santé */
export function CrossInsigne({ cx, cy, size, color = '#FFD700' }: InsigneProps) {
  const s = size;
  const w = s * 0.2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      <rect x={-w / 2} y={-s * 0.4} width={w} height={s * 0.8} fill={color} rx={s * 0.03} />
      <rect x={-s * 0.4} y={-w / 2} width={s * 0.8} height={w} fill={color} rx={s * 0.03} />
    </g>
  );
}

/** Flower — ✿ Architecture / Arts */
export function FlowerInsigne({ cx, cy, size, color = '#FFD700' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {[0, 60, 120, 180, 240, 300].map((a, i) => {
        const rad = a * Math.PI / 180;
        return <ellipse key={i} cx={s * 0.2 * Math.cos(rad)} cy={s * 0.2 * Math.sin(rad)} rx={s * 0.15} ry={s * 0.08} fill={color} transform={`rotate(${a},${s * 0.2 * Math.cos(rad)},${s * 0.2 * Math.sin(rad)})`} />;
      })}
      <circle cx={0} cy={0} r={s * 0.1} fill="#B8860B" />
    </g>
  );
}

/** Pencil — ✏ MEEF */
export function PencilInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy}) rotate(-30)`}>
      {/* Body */}
      <rect x={-s * 0.06} y={-s * 0.35} width={s * 0.12} height={s * 0.55} fill={color} stroke={stroke} strokeWidth={s * 0.02} />
      {/* Tip */}
      <polygon points={`${-s * 0.06},${s * 0.2} ${s * 0.06},${s * 0.2} 0,${s * 0.4}`} fill="#333" stroke={stroke} strokeWidth={s * 0.02} />
      {/* Eraser */}
      <rect x={-s * 0.06} y={-s * 0.42} width={s * 0.12} height={s * 0.07} fill="#CC6666" rx={s * 0.02} />
    </g>
  );
}

/** Quill pen — ✎ Lettres / Langues / SHS */
export function QuillInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      <path d={`M ${s * 0.05},${s * 0.45} L 0,${s * 0.1} Q ${-s * 0.1},${-s * 0.1} ${-s * 0.05},${-s * 0.35} Q ${s * 0.1},${-s * 0.45} ${s * 0.3},${-s * 0.4}
        Q ${s * 0.15},${-s * 0.25} ${s * 0.05},${-s * 0.05} L 0,${s * 0.1}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      {/* Nib */}
      <line x1={0} y1={s * 0.1} x2={s * 0.05} y2={s * 0.45} stroke={stroke} strokeWidth={s * 0.03} />
    </g>
  );
}

/** Music note — ♪ Musique */
export function MusicNoteInsigne({ cx, cy, size, color = '#FFD700' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      <ellipse cx={-s * 0.05} cy={s * 0.25} rx={s * 0.15} ry={s * 0.1} fill={color} transform={`rotate(-20,${-s * 0.05},${s * 0.25})`} />
      <line x1={s * 0.08} y1={s * 0.22} x2={s * 0.08} y2={-s * 0.35} stroke={color} strokeWidth={s * 0.05} />
      <path d={`M ${s * 0.08},${-s * 0.35} Q ${s * 0.3},${-s * 0.25} ${s * 0.2},${-s * 0.1}`} fill="none" stroke={color} strokeWidth={s * 0.06} />
    </g>
  );
}

/** Wine glass — Oenologie */
export function WineGlassInsigne({ cx, cy, size, color = '#FFD700', stroke: _stroke = '#B8860B' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Bowl */}
      <path d={`M ${-s * 0.2},${-s * 0.4} Q ${-s * 0.25},${-s * 0.05} 0,${s * 0.05} Q ${s * 0.25},${-s * 0.05} ${s * 0.2},${-s * 0.4} Z`}
        fill="none" stroke={color} strokeWidth={s * 0.05} />
      {/* Wine */}
      <path d={`M ${-s * 0.17},${-s * 0.2} Q ${-s * 0.2},${-s * 0.05} 0,${s * 0.05} Q ${s * 0.2},${-s * 0.05} ${s * 0.17},${-s * 0.2} Z`}
        fill="#8B0000" opacity={0.6} />
      {/* Stem */}
      <line x1={0} y1={s * 0.05} x2={0} y2={s * 0.3} stroke={color} strokeWidth={s * 0.04} />
      {/* Base */}
      <line x1={-s * 0.15} y1={s * 0.35} x2={s * 0.15} y2={s * 0.35} stroke={color} strokeWidth={s * 0.05} strokeLinecap="round" />
    </g>
  );
}

/** Book — 📖 Classes préparatoires */
export function BookInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Left page */}
      <path d={`M 0,${-s * 0.35} Q ${-s * 0.3},${-s * 0.3} ${-s * 0.3},${s * 0.2} L 0,${s * 0.3} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      {/* Right page */}
      <path d={`M 0,${-s * 0.35} Q ${s * 0.3},${-s * 0.3} ${s * 0.3},${s * 0.2} L 0,${s * 0.3} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      {/* Spine */}
      <line x1={0} y1={-s * 0.35} x2={0} y2={s * 0.3} stroke={stroke} strokeWidth={s * 0.03} />
    </g>
  );
}

/** Tooth — 🦷 Chirurgie dentaire */
export function ToothInsigne({ cx, cy, size, color = '#EEEEEE', stroke = '#888' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      <path d={`M ${-s * 0.2},${-s * 0.15} Q ${-s * 0.25},${-s * 0.4} 0,${-s * 0.4} Q ${s * 0.25},${-s * 0.4} ${s * 0.2},${-s * 0.15}
        Q ${s * 0.3},${s * 0.05} ${s * 0.12},${s * 0.4} Q ${s * 0.05},${s * 0.2} 0,${s * 0.15}
        Q ${-s * 0.05},${s * 0.2} ${-s * 0.12},${s * 0.4} Q ${-s * 0.3},${s * 0.05} ${-s * 0.2},${-s * 0.15} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.04} />
    </g>
  );
}

/** Bone — 🦴 Ostéopathie */
export function BoneInsigne({ cx, cy, size, color = '#EEEEEE', stroke = '#888' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy}) rotate(-30)`}>
      <rect x={-s * 0.05} y={-s * 0.3} width={s * 0.1} height={s * 0.6} fill={color} stroke={stroke} strokeWidth={s * 0.02} rx={s * 0.03} />
      <circle cx={-s * 0.08} cy={-s * 0.32} r={s * 0.08} fill={color} stroke={stroke} strokeWidth={s * 0.02} />
      <circle cx={s * 0.08} cy={-s * 0.32} r={s * 0.08} fill={color} stroke={stroke} strokeWidth={s * 0.02} />
      <circle cx={-s * 0.08} cy={s * 0.32} r={s * 0.08} fill={color} stroke={stroke} strokeWidth={s * 0.02} />
      <circle cx={s * 0.08} cy={s * 0.32} r={s * 0.08} fill={color} stroke={stroke} strokeWidth={s * 0.02} />
    </g>
  );
}

/** Baby — 👶 Sage-Femme */
export function BabyInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Head */}
      <circle cx={0} cy={-s * 0.15} r={s * 0.2} fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      {/* Eyes */}
      <circle cx={-s * 0.07} cy={-s * 0.18} r={s * 0.03} fill="#333" />
      <circle cx={s * 0.07} cy={-s * 0.18} r={s * 0.03} fill="#333" />
      {/* Smile */}
      <path d={`M ${-s * 0.06},${-s * 0.08} Q 0,${-s * 0.02} ${s * 0.06},${-s * 0.08}`} fill="none" stroke="#333" strokeWidth={s * 0.02} />
      {/* Swaddle */}
      <path d={`M ${-s * 0.2},${s * 0.0} Q ${-s * 0.25},${s * 0.35} 0,${s * 0.4} Q ${s * 0.25},${s * 0.35} ${s * 0.2},${s * 0.0} Z`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03} />
    </g>
  );
}

/** Paw print — 🐾 Vétérinaire */
export function PawInsigne({ cx, cy, size, color = '#FFD700' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Main pad */}
      <ellipse cx={0} cy={s * 0.1} rx={s * 0.2} ry={s * 0.15} fill={color} />
      {/* Toe pads */}
      <ellipse cx={-s * 0.2} cy={-s * 0.15} rx={s * 0.09} ry={s * 0.07} fill={color} transform={`rotate(-15,${-s * 0.2},${-s * 0.15})`} />
      <ellipse cx={-s * 0.07} cy={-s * 0.25} rx={s * 0.08} ry={s * 0.07} fill={color} />
      <ellipse cx={s * 0.07} cy={-s * 0.25} rx={s * 0.08} ry={s * 0.07} fill={color} />
      <ellipse cx={s * 0.2} cy={-s * 0.15} rx={s * 0.09} ry={s * 0.07} fill={color} transform={`rotate(15,${s * 0.2},${-s * 0.15})`} />
    </g>
  );
}

/** Soccer ball — ⚽ Filières sportives */
export function BallInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      <circle cx={0} cy={0} r={s * 0.35} fill={color} stroke={stroke} strokeWidth={s * 0.04} />
      {/* Pentagon pattern */}
      {[0, 72, 144, 216, 288].map((a, i) => {
        const rad = a * Math.PI / 180;
        return <line key={i} x1={0} y1={0} x2={s * 0.3 * Math.cos(rad)} y2={s * 0.3 * Math.sin(rad)} stroke={stroke} strokeWidth={s * 0.02} />;
      })}
      <circle cx={0} cy={0} r={s * 0.12} fill="none" stroke={stroke} strokeWidth={s * 0.02} />
    </g>
  );
}

/** Bar chart — 📊 Sciences éco / Gestion */
export function ChartInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      <rect x={-s * 0.3} y={-s * 0.05} width={s * 0.15} height={s * 0.4} fill={color} stroke={stroke} strokeWidth={s * 0.02} />
      <rect x={-s * 0.08} y={-s * 0.3} width={s * 0.15} height={s * 0.65} fill={color} stroke={stroke} strokeWidth={s * 0.02} />
      <rect x={s * 0.15} y={-s * 0.15} width={s * 0.15} height={s * 0.5} fill={color} stroke={stroke} strokeWidth={s * 0.02} />
      {/* Axis */}
      <line x1={-s * 0.38} y1={s * 0.38} x2={s * 0.38} y2={s * 0.38} stroke={stroke} strokeWidth={s * 0.03} />
    </g>
  );
}

/** Temple/columns — 🏛 Sciences politiques */
export function TempleInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Pediment (triangle) */}
      <polygon points={`${-s * 0.35},${-s * 0.15} 0,${-s * 0.4} ${s * 0.35},${-s * 0.15}`}
        fill={color} stroke={stroke} strokeWidth={s * 0.03} />
      {/* Entablature */}
      <rect x={-s * 0.38} y={-s * 0.17} width={s * 0.76} height={s * 0.06} fill={color} stroke={stroke} strokeWidth={s * 0.02} />
      {/* Columns */}
      <rect x={-s * 0.3} y={-s * 0.11} width={s * 0.08} height={s * 0.42} fill={color} stroke={stroke} strokeWidth={s * 0.02} />
      <rect x={-s * 0.04} y={-s * 0.11} width={s * 0.08} height={s * 0.42} fill={color} stroke={stroke} strokeWidth={s * 0.02} />
      <rect x={s * 0.22} y={-s * 0.11} width={s * 0.08} height={s * 0.42} fill={color} stroke={stroke} strokeWidth={s * 0.02} />
      {/* Base */}
      <rect x={-s * 0.38} y={s * 0.31} width={s * 0.76} height={s * 0.06} fill={color} stroke={stroke} strokeWidth={s * 0.02} />
    </g>
  );
}

/** Cup with snake — ⚗ Pharmacie (coupe d'Hygie) */
export function PharmacyInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Cup */}
      <path d={`M ${-s * 0.2},${-s * 0.15} L ${-s * 0.1},${s * 0.3} Q 0,${s * 0.4} ${s * 0.1},${s * 0.3} L ${s * 0.2},${-s * 0.15} Z`}
        fill="none" stroke={color} strokeWidth={s * 0.05} />
      {/* Stem */}
      <line x1={0} y1={s * 0.3} x2={0} y2={s * 0.45} stroke={color} strokeWidth={s * 0.04} />
      <line x1={-s * 0.12} y1={s * 0.45} x2={s * 0.12} y2={s * 0.45} stroke={color} strokeWidth={s * 0.04} strokeLinecap="round" />
      {/* Snake */}
      <path d={`M ${s * 0.15},${s * 0.15} Q ${s * 0.3},${-s * 0.1} 0,${-s * 0.2} Q ${-s * 0.15},${-s * 0.3} 0,${-s * 0.4}`}
        fill="none" stroke={stroke} strokeWidth={s * 0.05} strokeLinecap="round" />
      {/* Snake head */}
      <circle cx={0} cy={-s * 0.42} r={s * 0.04} fill={stroke} />
    </g>
  );
}

/** Rod of Asclepius — ⚕ Paramédical */
export function AsclepiusInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      <line x1={0} y1={-s * 0.4} x2={0} y2={s * 0.4} stroke={color} strokeWidth={s * 0.07} strokeLinecap="round" />
      <path d={`M ${-s * 0.15},${s * 0.25} Q ${s * 0.2},${s * 0.1} ${-s * 0.15},${-s * 0.05} Q ${s * 0.2},${-s * 0.2} ${-s * 0.1},${-s * 0.3}`}
        fill="none" stroke={stroke} strokeWidth={s * 0.05} strokeLinecap="round" />
    </g>
  );
}

/** Dollar sign — 💰 Écoles de commerce */
export function DollarInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      <text x={0} y={s * 0.15} textAnchor="middle" fill={color} stroke={stroke} strokeWidth={s * 0.02} fontSize={s * 0.9} fontWeight="bold" fontFamily="serif">$</text>
    </g>
  );
}

// --- Filière emblème mapper ---

const FILIERE_INSIGNE_MAP: Record<string, (props: InsigneProps) => React.JSX.Element> = {
  // --- Existants (indices 0-22) ---
  'Chirurgie dentaire': ToothInsigne,
  'Études courtes de santé': CrossInsigne,
  'Médecine': CaduceeMedInsigne,
  'Ostéopathie': BoneInsigne,
  'Paramédical': AsclepiusInsigne,
  'Pharmacie': PharmacyInsigne,
  'Prépas santé': CrossInsigne,
  'Sage-Femme': BabyInsigne,
  'Vétérinaire': PawInsigne,
  'AES': ScalesInsigne,
  'Architecture / Arts / Beaux-arts': FlowerInsigne,
  'Classes préparatoires': BookInsigne,
  'Droit': ScalesInsigne,
  'Écoles de commerce': DollarInsigne,
  "Écoles d'ingénieurs": EtoileFoudreInsigne,
  'MEEF': PencilInsigne,
  'Filières sportives': BallInsigne,
  'Lettres / Langues / SHS': QuillInsigne,
  'Musique / Musicologie': MusicNoteInsigne,
  'Oenologie': WineGlassInsigne,
  'Sciences': AtomInsigne,
  'Sciences économiques / Gestion / IAE': ChartInsigne,
  'Sciences politiques': TempleInsigne,
  // --- Nouvelles filières ---
  'Infirmier': AsclepiusInsigne,
  'Kinésithérapie': AsclepiusInsigne,
  'Préparateur en pharmacie': PharmacyInsigne,
  'Archéologie': TempleInsigne,
  'Géographie': BallInsigne,
  'Histoire': BookInsigne,
  'Philosophie': QuillInsigne,
  'Psychologie': QuillInsigne,
  'Sociologie': QuillInsigne,
  'Arts': FlowerInsigne,
  'Architecture': FlowerInsigne,
  'Arts du spectacle / Théâtre': FlowerInsigne,
  'Arts numériques': FlowerInsigne,
  'Cinéma': FlowerInsigne,
  'BTS': PencilInsigne,
  'Communication / Journalisme': DollarInsigne,
  'DU': BookInsigne,
  'IAE': ChartInsigne,
  'IUT': PencilInsigne,
  'Militaire': EtoileFoudreInsigne,
  'Notariat': ScalesInsigne,
  'Thanatologie': CrossInsigne,
  'Théologie': CrossInsigne,
  'Assistante sociale': ScalesInsigne,
  "Science de l'éducation": PencilInsigne,
};

/** Small cochon for circulaire (santé students, Amiens) */
export function CochonCirculaireInsigne({ cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: InsigneProps) {
  const s = size / 2;
  const sw = s * 0.06;
  return (
    <g transform={`translate(${cx},${cy})`}>
      <ellipse cx={0} cy={0} rx={s * 0.5} ry={s * 0.35} fill={color} stroke={stroke} strokeWidth={sw} />
      <ellipse cx={s * 0.4} cy={-s * 0.05} rx={s * 0.18} ry={s * 0.2} fill={color} stroke={stroke} strokeWidth={sw} />
      <ellipse cx={s * 0.55} cy={0} rx={s * 0.08} ry={s * 0.06} fill={color} stroke={stroke} strokeWidth={sw * 0.7} />
      <circle cx={s * 0.42} cy={-s * 0.12} r={s * 0.03} fill={stroke} />
      <path d={`M ${-s * 0.45},${-s * 0.12} Q ${-s * 0.6},${-s * 0.3} ${-s * 0.48},${-s * 0.2}`} fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      <line x1={-s * 0.2} y1={s * 0.3} x2={-s * 0.2} y2={s * 0.5} stroke={stroke} strokeWidth={sw * 1.2} />
      <line x1={s * 0.15} y1={s * 0.3} x2={s * 0.15} y2={s * 0.5} stroke={stroke} strokeWidth={sw * 1.2} />
    </g>
  );
}

/** Capacitaire insigne renderer for circulaire */
export function CapacitaireInsigne({ insigneId, cx, cy, size, color = '#FFD700', stroke = '#B8860B' }: { insigneId: string } & InsigneProps) {
  // Simple symbols for each capacitaire
  const s = size / 2;
  switch (insigneId) {
    case 'aigle':
      return <text x={cx} y={cy + s * 0.3} textAnchor="middle" fill={color} fontSize={size * 0.6} fontFamily="serif">A</text>;
    case 'lyre':
      return <text x={cx} y={cy + s * 0.3} textAnchor="middle" fill={color} fontSize={size * 0.6} fontFamily="serif">L</text>;
    case 'palette':
      return <text x={cx} y={cy + s * 0.3} textAnchor="middle" fill={color} fontSize={size * 0.6} fontFamily="serif">P</text>;
    case 'plume':
      return <text x={cx} y={cy + s * 0.3} textAnchor="middle" fill={color} fontSize={size * 0.6} fontFamily="serif">E</text>;
    case 'voilier':
      return <text x={cx} y={cy + s * 0.3} textAnchor="middle" fill={color} fontSize={size * 0.6} fontFamily="serif">V</text>;
    default:
      return <circle cx={cx} cy={cy} r={s * 0.3} fill="none" stroke={color} strokeWidth={s * 0.06} />;
  }
}

export function FiliereEmbleme({ filiere, cx, cy, size, color, stroke }: { filiere: string } & InsigneProps) {
  const Component = FILIERE_INSIGNE_MAP[filiere];
  if (Component) {
    return <Component cx={cx} cy={cy} size={size} color={color} stroke={stroke} />;
  }
  // Fallback: circle with first letter
  return (
    <g>
      <circle cx={cx} cy={cy} r={size * 0.35} fill={color ?? '#FFD700'} />
      <text x={cx} y={cy + size * 0.12} textAnchor="middle" fill="#333" fontSize={size * 0.4} fontWeight="bold">
        {filiere.charAt(0)}
      </text>
    </g>
  );
}
