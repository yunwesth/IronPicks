import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ShirtIcon({ size = 20, color = '#000' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 7 L8 3.5 C8 5.5 9.5 7 12 7 C14.5 7 16 5.5 16 3.5 L21 7 L18.5 11 L16 9.5 L16 20.5 L8 20.5 L8 9.5 L5.5 11 Z"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}
