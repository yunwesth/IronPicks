import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  runners?: { first: boolean; second: boolean; third: boolean };
}

const FILLED = '#E8C060';
const EMPTY_STROKE = '#2A3E60';
const EMPTY_FILL = 'transparent';

export default function BasesIcon({
  size = 28,
  runners = { first: false, second: false, third: false },
}: Props) {
  // Diamond layout: second on top, first on right, third on left, home on bottom
  // We draw four rotated squares (diamonds)
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.28; // half-diagonal of each base square
  const baseSize = size * 0.2;

  const bases = [
    // Second base — top center
    {
      cx,
      cy: cy - r,
      filled: runners.second,
    },
    // First base — right
    {
      cx: cx + r,
      cy,
      filled: runners.first,
    },
    // Third base — left
    {
      cx: cx - r,
      cy,
      filled: runners.third,
    },
    // Home plate — bottom (always empty visual indicator)
    {
      cx,
      cy: cy + r,
      filled: false,
    },
  ];

  function diamond(x: number, y: number, half: number, fill: string, stroke: string) {
    const d = `M ${x} ${y - half} L ${x + half} ${y} L ${x} ${y + half} L ${x - half} ${y} Z`;
    return (
      <Path
        key={`${x}-${y}`}
        d={d}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.5}
      />
    );
  }

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {bases.map((b, i) =>
        diamond(
          b.cx,
          b.cy,
          baseSize,
          b.filled ? FILLED : EMPTY_FILL,
          b.filled ? FILLED : EMPTY_STROKE,
        )
      )}
    </Svg>
  );
}
