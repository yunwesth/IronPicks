import React from 'react';
import Svg, { Circle, Line } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

export default function XCircleIcon({ size = 20, color = '#B83028' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <Line x1="15" y1="9" x2="9" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="9" y1="9" x2="15" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}
