import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

export default function BIcon({ size = 16, color = '#1B2A4A' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 4h6a4 4 0 0 1 0 8H7V4zM7 12h7a4 4 0 0 1 0 8H7V12z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
