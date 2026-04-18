import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export default function BaseballIcon({ size = 24, color = '#1C2B4A' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9.5" stroke={color} strokeWidth="1.4" fill="#F5F1EC" />
      <Path
        d="M8.5 3.8 C7.2 6.5 8.8 9.2 7.5 12 C6.2 14.8 7.8 17.5 8.5 20.2"
        stroke="#C0392B" strokeWidth="1.2" strokeLinecap="round" fill="none"
      />
      <Path
        d="M15.5 3.8 C16.8 6.5 15.2 9.2 16.5 12 C17.8 14.8 16.2 17.5 15.5 20.2"
        stroke="#C0392B" strokeWidth="1.2" strokeLinecap="round" fill="none"
      />
    </Svg>
  );
}
