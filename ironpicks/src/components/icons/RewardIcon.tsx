import React from 'react';
import Svg, { Path, Circle, Rect, Ellipse } from 'react-native-svg';

type RewardType = 'hotdog' | 'drink' | 'beer' | 'nacho' | 'pizza' | 'shirt' | 'medal' | 'cap' | 'jersey' | 'pig' | 'camera' | 'baseball' | 'trophy';

function IconSvg({ size, children }: { size: number; children: React.ReactNode }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {children}
    </Svg>
  );
}

export default function RewardIcon({ type, size = 28, color = '#1C2B4A' }: { type: RewardType; size?: number; color?: string }) {
  switch (type) {
    case 'hotdog':
      return (
        <IconSvg size={size}>
          <Ellipse cx="12" cy="12" rx="9" ry="5" stroke={color} strokeWidth="1.5" fill="#F5DEB3" />
          <Path d="M5 10 Q8 7 12 8 Q16 9 19 10" stroke="#C0392B" strokeWidth="1.2" strokeLinecap="round" />
          <Path d="M4 12 Q12 17 20 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </IconSvg>
      );
    case 'drink':
      return (
        <IconSvg size={size}>
          <Path d="M8 3 L6 21 L18 21 L16 3 Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
          <Path d="M7.5 10 L16.5 10" stroke={color} strokeWidth="1" strokeLinecap="round" />
          <Path d="M11 3 Q12 1 13 3" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        </IconSvg>
      );
    case 'beer':
      return (
        <IconSvg size={size}>
          <Path d="M6 8 L6 20 Q6 21 7 21 L15 21 Q16 21 16 20 L16 8 Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
          <Path d="M16 11 L19 11 Q21 11 21 13.5 Q21 16 19 16 L16 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <Path d="M8 8 Q9 5 11 5 Q13 5 14 8" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
          <Path d="M8.5 13 L8.5 17" stroke={color} strokeWidth="1" strokeLinecap="round" />
          <Path d="M11.5 13 L11.5 17" stroke={color} strokeWidth="1" strokeLinecap="round" />
        </IconSvg>
      );
    case 'nacho':
      return (
        <IconSvg size={size}>
          <Path d="M12 3 L22 20 L2 20 Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill="#F5A623" fillOpacity="0.3" />
          <Circle cx="9" cy="16" r="1.5" fill={color} />
          <Circle cx="14" cy="14" r="1.5" fill={color} />
          <Circle cx="12" cy="18" r="1.5" fill={color} />
        </IconSvg>
      );
    case 'pizza':
      return (
        <IconSvg size={size}>
          <Path d="M12 3 L21 18 L3 18 Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
          <Path d="M12 3 L12 18" stroke={color} strokeWidth="1" strokeLinecap="round" />
          <Path d="M5 12 L19 12" stroke={color} strokeWidth="1" strokeLinecap="round" />
          <Circle cx="9" cy="14" r="1.2" fill={color} />
          <Circle cx="14" cy="14" r="1.2" fill={color} />
        </IconSvg>
      );
    case 'shirt':
      return (
        <IconSvg size={size}>
          <Path d="M3 7 L8 3.5 C8 5.5 9.5 7 12 7 C14.5 7 16 5.5 16 3.5 L21 7 L18.5 11 L16 9.5 L16 20.5 L8 20.5 L8 9.5 L5.5 11 Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </IconSvg>
      );
    case 'medal':
      return (
        <IconSvg size={size}>
          <Circle cx="12" cy="15" r="6" stroke={color} strokeWidth="1.5" />
          <Path d="M9 3 L12 8 L15 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M10.5 3 L13.5 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <Path d="M10 15 L11.5 16.5 L14.5 13" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </IconSvg>
      );
    case 'cap':
      return (
        <IconSvg size={size}>
          <Path d="M4 14 Q4 8 12 7 Q20 8 20 14 Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
          <Path d="M4 14 L2 14 Q2 16 4 16 L20 16 Q21 16 21 14 L20 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M12 7 L12 4" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        </IconSvg>
      );
    case 'jersey':
      return (
        <IconSvg size={size}>
          <Path d="M3 7 L8 3.5 C8 5.5 9.5 7 12 7 C14.5 7 16 5.5 16 3.5 L21 7 L18.5 11 L16 9.5 L16 20.5 L8 20.5 L8 9.5 L5.5 11 Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M10 13 L14 13 M10 16 L14 16" stroke={color} strokeWidth="1" strokeLinecap="round" />
        </IconSvg>
      );
    case 'pig':
      return (
        <IconSvg size={size}>
          <Circle cx="12" cy="13" r="7" stroke={color} strokeWidth="1.5" />
          <Circle cx="10" cy="15" r="1.8" stroke={color} strokeWidth="1.2" />
          <Circle cx="14" cy="15" r="1.8" stroke={color} strokeWidth="1.2" />
          <Circle cx="9.5" cy="15" r="0.4" fill={color} />
          <Circle cx="14.5" cy="15" r="0.4" fill={color} />
          <Path d="M8 10 Q8 7 5 7 Q4 9 6 10" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M16 10 Q16 7 19 7 Q20 9 18 10" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <Circle cx="9" cy="11" r="1" fill={color} fillOpacity="0.3" />
          <Circle cx="15" cy="11" r="1" fill={color} fillOpacity="0.3" />
        </IconSvg>
      );
    case 'camera':
      return (
        <IconSvg size={size}>
          <Rect x="2" y="7" width="20" height="14" rx="2.5" stroke={color} strokeWidth="1.5" />
          <Circle cx="12" cy="14" r="4" stroke={color} strokeWidth="1.5" />
          <Path d="M8 7 L9.5 4 L14.5 4 L16 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <Circle cx="18" cy="10" r="1" fill={color} />
        </IconSvg>
      );
    case 'baseball':
      return (
        <IconSvg size={size}>
          <Circle cx="12" cy="12" r="9.5" stroke={color} strokeWidth="1.4" fill="#F5F1EC" />
          <Path d="M8.5 3.8 C7.2 6.5 8.8 9.2 7.5 12 C6.2 14.8 7.8 17.5 8.5 20.2" stroke="#C0392B" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <Path d="M15.5 3.8 C16.8 6.5 15.2 9.2 16.5 12 C17.8 14.8 16.2 17.5 15.5 20.2" stroke="#C0392B" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </IconSvg>
      );
    case 'trophy':
      return (
        <IconSvg size={size}>
          <Path d="M8 3 L16 3 L16 12 Q16 18 12 18 Q8 18 8 12 Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
          <Path d="M5 3 L8 3 L8 9 Q5 9 5 6 Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
          <Path d="M16 3 L19 3 L19 6 Q19 9 16 9 Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
          <Path d="M10 18 L10 21 M14 18 L14 21" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
          <Path d="M8 21 L16 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </IconSvg>
      );
    default:
      return null;
  }
}
