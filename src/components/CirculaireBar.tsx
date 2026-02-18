import { BICOLORES } from '../data/filieres';

interface CirculaireBarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  couleur: string;
  discipline: string;
}

export function CirculaireBar({ x, y, width, height, couleur, discipline }: CirculaireBarProps) {
  const bicolore = BICOLORES[discipline];

  if (bicolore) {
    const halfHeight = height / 2;
    return (
      <g>
        <rect x={x} y={y} width={width} height={halfHeight} fill={bicolore[0]} rx={4} />
        <rect x={x} y={y + halfHeight} width={width} height={halfHeight} fill={bicolore[1]} rx={4} />
        <rect x={x} y={y} width={width} height={height} fill="none" stroke="#333" strokeWidth={2} rx={4} />
      </g>
    );
  }

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={couleur}
      stroke="#333"
      strokeWidth={2}
      rx={4}
    />
  );
}
