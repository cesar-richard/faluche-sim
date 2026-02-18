interface EcussonProps {
  /** Center x position */
  cx: number;
  /** Center y position */
  cy: number;
  /** Size (width) */
  size: number;
  /** Background colors [top, bottom] */
  couleurs: [string, string];
  /** Label displayed in the shield */
  label?: string;
}

export function Ecusson({ cx, cy, size, couleurs, label }: EcussonProps) {
  const halfW = size / 2;
  const height = size * 1.2;
  const halfH = height / 2;

  // Shield shape: rectangle top, pointed bottom
  const clipId = `clip-ecusson-${label?.replace(/\s/g, '-') ?? `${cx}-${cy}`}`;
  const path = [
    `M ${cx - halfW} ${cy - halfH}`,
    `L ${cx + halfW} ${cy - halfH}`,
    `L ${cx + halfW} ${cy + halfH * 0.3}`,
    `Q ${cx + halfW} ${cy + halfH * 0.7} ${cx} ${cy + halfH}`,
    `Q ${cx - halfW} ${cy + halfH * 0.7} ${cx - halfW} ${cy + halfH * 0.3}`,
    'Z',
  ].join(' ');

  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <path d={path} />
        </clipPath>
      </defs>

      {/* Top half */}
      <rect
        x={cx - halfW}
        y={cy - halfH}
        width={size}
        height={height / 2}
        fill={couleurs[0]}
        clipPath={`url(#${clipId})`}
      />
      {/* Bottom half */}
      <rect
        x={cx - halfW}
        y={cy}
        width={size}
        height={height / 2}
        fill={couleurs[1]}
        clipPath={`url(#${clipId})`}
      />

      {/* Outline */}
      <path d={path} fill="none" stroke="#333" strokeWidth={1.5} />

      {/* Label */}
      {label && (
        <text
          x={cx}
          y={cy + 2}
          textAnchor="middle"
          fontSize={Math.min(size * 0.25, 8)}
          fill="#fff"
          fontWeight="bold"
          stroke="#000"
          strokeWidth={0.5}
          paintOrder="stroke"
        >
          {label}
        </text>
      )}
    </g>
  );
}
