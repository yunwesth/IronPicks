import React from 'react';
import Svg, { Circle, Line } from 'react-native-svg';

interface Props {
  size?: number;
  ringColor?: string;
  handColor?: string;
}

export default function ClockIcon({
  size = 20,
  ringColor = '#6A84A8',
  handColor = '#E8C060',
}: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={ringColor} strokeWidth="2" />
      <Line
        x1="12"
        y1="7"
        x2="12"
        y2="12"
        stroke={handColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Line
        x1="12"
        y1="12"
        x2="15"
        y2="14"
        stroke={handColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}
