import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function BaconIcon({ size = 24, color = '#8B1A2F' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 7 C5 5.5 7 8.5 10 7 C13 5.5 15 8.5 18 7 C20 6 21.5 7 22 7"
        stroke={color} strokeWidth="2.5" strokeLinecap="round"
      />
      <Path
        d="M2 11.5 C5 13 7 10 10 11.5 C13 13 15 10 18 11.5 C20 12.5 21.5 11.5 22 11.5"
        stroke="#C0534A" strokeWidth="2.5" strokeLinecap="round"
      />
      <Path
        d="M2 16 C5 14.5 7 17.5 10 16 C13 14.5 15 17.5 18 16 C20 15 21.5 16 22 16"
        stroke={color} strokeWidth="2.5" strokeLinecap="round"
      />
    </Svg>
  );
}
