import React from 'react';
import Svg, { Rect } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

export default function BarChartIcon({ size = 22, color = '#A89E94' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="12" width="4" height="9" rx="1" fill={color} />
      <Rect x="10" y="7" width="4" height="14" rx="1" fill={color} />
      <Rect x="17" y="3" width="4" height="18" rx="1" fill={color} />
    </Svg>
  );
}
