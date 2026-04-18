import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  opacity?: number;
}

export default function FlameIcon({ size = 18, color = '#6B2737', opacity = 0.75 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C12 2 8 7 8 11a4 4 0 0 0 8 0c0-1.5-.8-3-2-4 0 0 .5 3-2 4C10 8 12 2 12 2z"
        fill={color}
        fillOpacity={opacity}
      />
      <Path
        d="M12 22C7.582 22 4 18.418 4 14c0-3.5 2-7 5-9 0 3 1.5 5 3 6 0-2 1-4 2-5 1 2 2 4 2 6a3 3 0 0 1-3 3c0 2 1 3 2 4h-3z"
        fill={color}
        fillOpacity={opacity}
      />
    </Svg>
  );
}
