interface VeloursProps {
  cx: number;
  cy: number;
  radius: number;
}

export function Velours({ cx, cy, radius }: VeloursProps) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={radius}
      fill="#1a1a1a"
      stroke="#333"
      strokeWidth={2}
    />
  );
}
