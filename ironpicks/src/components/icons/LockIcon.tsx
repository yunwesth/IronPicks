import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

export default function LockIcon({ size = 22, color = '#A89E94' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="5" y="11" width="14" height="11" rx="2" stroke={color} strokeWidth="2" />
      <Path
        d="M8 11V7a4 4 0 0 1 8 0v4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Rect x="11" y="15" width="2" height="3" rx="1" fill={color} />
    </Svg>
  );
}
