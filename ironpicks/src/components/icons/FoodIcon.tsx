import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function FoodIcon({ size = 20, color = '#000' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 11 C3 7 5.5 4 9 3.5 L9 20.5"
        stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      />
      <Path
        d="M6 3.5 L6 8 M9 3.5 L9 8 M3 8 L9 8"
        stroke={color} strokeWidth="1.6" strokeLinecap="round"
      />
      <Path
        d="M15 3.5 C15 3.5 21 5 21 12 C21 13.5 20.2 14.5 19 14.5 L17 14.5 L17 20.5"
        stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}
