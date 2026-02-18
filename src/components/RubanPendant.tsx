interface RubanPendantProps {
  /**
   * 'yshaped' = vertical from frontal then angled at junction (D study city, B province)
   * 'diagonal' = straight line following branch direction (A birth city)
   */
  shape: 'yshaped' | 'diagonal';
  side: 'left' | 'right';
  /**
   * For yshaped: horizontal offset from cx (measured at junction height).
   * For diagonal: horizontal offset from cx (measured at the start height = upper third).
   */
  offset: number;
  width: number;
  couleurs: [string, string];
  id: string;
  circle: { cx: number; cy: number; r: number };
}

const BRANCH_DEG = 60;

function branchDir(side: 'left' | 'right') {
  const sign = side === 'left' ? -1 : 1;
  const bRad = (sign * BRANCH_DEG * Math.PI) / 180;
  return { dx: Math.sin(bRad), dy: Math.cos(bRad) };
}

function branchPerp(side: 'left' | 'right') {
  const { dx, dy } = branchDir(side);
  return { px: dy, py: -dx };
}

function circleIntersect(
  refX: number, refY: number,
  dx: number, dy: number,
  cx: number, cy: number, r: number,
) {
  const a0 = refX - cx;
  const b0 = refY - cy;
  const B = 2 * (a0 * dx + b0 * dy);
  const C = a0 * a0 + b0 * b0 - r * r;
  const disc = B * B - 4 * C;
  const sqrtDisc = Math.sqrt(Math.max(0, disc));
  return {
    t1: (-B - sqrtDisc) / 2,
    t2: (-B + sqrtDisc) / 2,
  };
}

// ─── DIAGONAL: ribbon starting at upper third, following branch direction to circle edge ───
// Extended backward (hidden behind province ribbon) and forward (past circle, clipped) for clean contact.

function diagonalGeometry(side: 'left' | 'right', offset: number, width: number, circle: { cx: number; cy: number; r: number }) {
  const { cx, cy, r } = circle;
  const sign = side === 'left' ? -1 : 1;
  const { dx, dy } = branchDir(side);
  const { px, py } = branchPerp(side);
  const halfW = width / 2;

  // Reference point: upper third of the circle, offset from cx
  const yStart = cy - r / 3;
  const refX = cx + sign * offset;
  const refY = yStart;

  const { t2 } = circleIntersect(refX, refY, dx, dy, cx, cy, r);

  // Extend backward to tuck behind the province ribbon, forward past the circle edge.
  // The clipPath will crop to the circle; the province ribbon renders on top and hides the overlap.
  const backExt = width * 1.5;
  const fwdExt = width;
  const start = { x: refX - dx * backExt, y: refY - dy * backExt };
  const end = { x: refX + dx * (t2 + fwdExt), y: refY + dy * (t2 + fwdExt) };

  const p1 = { x: start.x - px * halfW, y: start.y - py * halfW };
  const p2 = { x: start.x + px * halfW, y: start.y + py * halfW };
  const p3 = { x: end.x + px * halfW, y: end.y + py * halfW };
  const p4 = { x: end.x - px * halfW, y: end.y - py * halfW };

  const leftPath = `M ${p1.x} ${p1.y} L ${start.x} ${start.y} L ${end.x} ${end.y} L ${p4.x} ${p4.y} Z`;
  const rightPath = `M ${start.x} ${start.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${end.x} ${end.y} Z`;
  const outline = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p4.x} ${p4.y} Z`;

  // Logical start/end (unextended) for écusson placement
  const logicalStart = { x: refX, y: refY };
  const logicalEnd = { x: refX + dx * t2, y: refY + dy * t2 };
  return { leftPath, rightPath, outline, start: logicalStart, end: logicalEnd };
}

// ─── Y-SHAPED: vertical stem then angled branch ───

function yshapedGeometry(side: 'left' | 'right', offset: number, width: number, circle: { cx: number; cy: number; r: number }) {
  const { cx, cy, r } = circle;
  const sign = side === 'left' ? -1 : 1;
  const halfW = width / 2;
  const { dx, dy } = branchDir(side);
  const { px, py } = branchPerp(side);

  const yJunction = cy + r / 3;
  const centerX = cx + sign * offset;
  const dx2 = r * r - (centerX - cx) ** 2;
  const yTop = dx2 > 0 ? cy - Math.sqrt(dx2) : cy - r;

  const { t2 } = circleIntersect(centerX, yJunction, dx, dy, cx, cy, r);
  const end = { x: centerX + dx * t2, y: yJunction + dy * t2 };

  const miterOffset = halfW / Math.sqrt(3);

  const p1 = { x: centerX - halfW, y: yTop };
  const p2 = { x: centerX + halfW, y: yTop };
  const p3 = { x: centerX + halfW, y: yJunction - sign * miterOffset };
  const p4 = { x: end.x + px * halfW, y: end.y + py * halfW };
  const p5 = { x: end.x - px * halfW, y: end.y - py * halfW };
  const p6 = { x: centerX - halfW, y: yJunction + sign * miterOffset };

  const c1 = { x: centerX, y: yTop };
  const c2 = { x: centerX, y: yJunction };

  const leftPath = `M ${p1.x} ${p1.y} L ${c1.x} ${c1.y} L ${c2.x} ${c2.y} L ${end.x} ${end.y} L ${p5.x} ${p5.y} L ${p6.x} ${p6.y} Z`;
  const rightPath = `M ${c1.x} ${c1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p4.x} ${p4.y} L ${end.x} ${end.y} L ${c2.x} ${c2.y} Z`;
  const outline = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p4.x} ${p4.y} L ${p5.x} ${p5.y} L ${p6.x} ${p6.y} Z`;

  const start = { x: centerX, y: yTop };
  return { leftPath, rightPath, outline, start, end };
}

export function RubanPendant({ shape, side, offset, width, couleurs, id, circle }: RubanPendantProps) {
  const geom = shape === 'diagonal'
    ? diagonalGeometry(side, offset, width, circle)
    : yshapedGeometry(side, offset, width, circle);

  return (
    <g>
      <defs>
        <clipPath id={`clip-ruban-${id}`}>
          <circle cx={circle.cx} cy={circle.cy} r={circle.r - 1} />
        </clipPath>
      </defs>
      <g clipPath={`url(#clip-ruban-${id})`}>
        <path d={geom.leftPath} fill={couleurs[0]} />
        <path d={geom.rightPath} fill={couleurs[1]} />
        <path d={geom.outline} fill="none" stroke="#00000033" strokeWidth={0.5} />
      </g>
    </g>
  );
}

/** Get a position along the ribbon center line (0=start, 1=end) */
export function getRubanPosition(
  shape: 'yshaped' | 'diagonal',
  side: 'left' | 'right',
  offset: number,
  circle: { cx: number; cy: number; r: number },
  ratio: number,
): { x: number; y: number } {
  const { cx, cy, r } = circle;
  const sign = side === 'left' ? -1 : 1;
  const { dx, dy } = branchDir(side);
  const yJunction = cy + r / 3;

  if (shape === 'diagonal') {
    const yStart = cy - r / 3;
    const refX = cx + sign * offset;
    const { t2 } = circleIntersect(refX, yStart, dx, dy, cx, cy, r);
    const start = { x: refX, y: yStart };
    const end = { x: refX + dx * t2, y: yStart + dy * t2 };
    return {
      x: start.x + ratio * (end.x - start.x),
      y: start.y + ratio * (end.y - start.y),
    };
  }

  // yshaped
  const centerX = cx + sign * offset;
  const yTop = cy - Math.sqrt(Math.max(0, r * r - (centerX - cx) ** 2));
  const { t2 } = circleIntersect(centerX, yJunction, dx, dy, cx, cy, r);
  const end = { x: centerX + dx * t2, y: yJunction + dy * t2 };

  const vertLen = yJunction - yTop;
  const angledLen = Math.sqrt((end.x - centerX) ** 2 + (end.y - yJunction) ** 2);
  const totalLen = vertLen + angledLen;
  const dist = ratio * totalLen;

  if (dist <= vertLen) {
    return { x: centerX, y: yTop + dist };
  }
  const t = (dist - vertLen) / angledLen;
  return {
    x: centerX + (end.x - centerX) * t,
    y: yJunction + (end.y - yJunction) * t,
  };
}
