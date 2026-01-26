import React from 'react';
import { Box } from '@mui/material';

interface LovebirdProps {
  color?: 'pepe-green' | 'violet-butter' | 'pepe-yellow' | 'yellowface-green' | 'pepe-lime';
  size?: number;
  animated?: boolean;
  variant?: 'sitting' | 'flying' | 'couple';
}

const LovebirdIllustration: React.FC<LovebirdProps> = ({
  color = 'pepe-green',
  size = 100,
  animated = true,
  variant = 'sitting'
}) => {
  const colorMap = {
    'pepe-green': {
      main: '#7EC850',
      accent: '#B8E986',
      beak: '#FFB347',
      description: 'Pepe Green'
    },
    'violet-butter': {
      main: '#D4B5E8',
      accent: '#E8D4F5',
      beak: '#FFB347',
      description: 'Violet Butter'
    },
    'pepe-yellow': {
      main: '#FFE84D',
      accent: '#FFF9B0',
      beak: '#FFB347',
      description: 'Pepe Yellow'
    },
    'yellowface-green': {
      main: '#8FD6A8',
      accent: '#B8E986',
      beak: '#FFB347',
      face: '#FFE84D',
      description: 'Yellow Face Green'
    },
    'pepe-lime': {
      main: '#C4E86B',
      accent: '#E0F5A8',
      beak: '#FFB347',
      description: 'Pepe Lime'
    }
  };

  const colors = colorMap[color];

  if (variant === 'couple') {
    return (
      <Box
        sx={{
          position: 'relative',
          width: size * 2,
          height: size * 1.2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Left bird - Pepe Green */}
        <Box
          className={animated ? 'wiggle' : ''}
          sx={{
            position: 'absolute',
            left: 0,
            width: size,
            height: size,
            animationDelay: '0s',
          }}
        >
          <svg width={size} height={size} viewBox="0 0 100 100">
            <ellipse cx="50" cy="55" rx="28" ry="35" fill="#7EC850" />
            <circle cx="50" cy="30" r="22" fill="#7EC850" />
            <ellipse cx="45" cy="60" rx="15" ry="25" fill="#B8E986" transform="rotate(-20 45 60)" />
            <ellipse cx="58" cy="82" rx="10" ry="15" fill="#B8E986" transform="rotate(30 58 82)" />
            <path d="M 62 28 L 72 30 L 62 32 Z" fill="#FFB347" />
            <circle cx="58" cy="26" r="4" fill="#2C2C2C" />
            <circle cx="59" cy="25" r="1.5" fill="white" />
            <ellipse cx="56" cy="32" rx="6" ry="4" fill="#FFB347" opacity="0.3" />
            <path d="M 45 85 L 42 92 M 45 85 L 48 92" stroke="#FFB347" strokeWidth="2" strokeLinecap="round" />
            <path d="M 55 85 L 52 92 M 55 85 L 58 92" stroke="#FFB347" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Box>

        {/* Heart between birds */}
        <Box
          className={animated ? 'pulse-glow' : ''}
          sx={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        >
          <svg width={size * 0.35} height={size * 0.35} viewBox="0 0 100 100">
            <path
              d="M 50 85 C 30 70, 10 55, 10 35 C 10 20, 20 10, 30 10 C 40 10, 45 15, 50 25 C 55 15, 60 10, 70 10 C 80 10, 90 20, 90 35 C 90 55, 70 70, 50 85 Z"
              fill="#FFE84D"
              opacity="0.9"
            />
          </svg>
        </Box>

        {/* Right bird - Pepe Yellow */}
        <Box
          className={animated ? 'wiggle' : ''}
          sx={{
            position: 'absolute',
            right: 0,
            width: size,
            height: size,
            transform: 'scaleX(-1)',
            animationDelay: '0.4s',
          }}
        >
          <svg width={size} height={size} viewBox="0 0 100 100">
            <ellipse cx="50" cy="55" rx="28" ry="35" fill="#FFE84D" />
            <circle cx="50" cy="30" r="22" fill="#FFE84D" />
            <ellipse cx="45" cy="60" rx="15" ry="25" fill="#FFF9B0" transform="rotate(-20 45 60)" />
            <ellipse cx="58" cy="82" rx="10" ry="15" fill="#FFF9B0" transform="rotate(30 58 82)" />
            <path d="M 62 28 L 72 30 L 62 32 Z" fill="#FFB347" />
            <circle cx="58" cy="26" r="4" fill="#2C2C2C" />
            <circle cx="59" cy="25" r="1.5" fill="white" />
            <ellipse cx="56" cy="32" rx="6" ry="4" fill="#FFB347" opacity="0.3" />
            <path d="M 45 85 L 42 92 M 45 85 L 48 92" stroke="#FFB347" strokeWidth="2" strokeLinecap="round" />
            <path d="M 55 85 L 52 92 M 55 85 L 58 92" stroke="#FFB347" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Box>
      </Box>
    );
  }

  if (variant === 'flying') {
    // Special case for Yellow Face Green
    const bodyColor = color === 'yellowface-green' ? colors.main : colors.main;
    const faceColor = color === 'yellowface-green' ? '#FFE84D' : colors.main;

    return (
      <Box
        className={animated ? 'float' : ''}
        sx={{ width: size, height: size }}
      >
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* Body */}
          <ellipse cx="50" cy="50" rx="25" ry="30" fill={bodyColor} />
          {/* Head - Yellow for Yellow Face Green */}
          <circle cx="50" cy="28" r="20" fill={faceColor} />
          {/* Left wing (extended) */}
          <ellipse cx="25" cy="45" rx="22" ry="12" fill={colors.accent} transform="rotate(-25 25 45)" />
          {/* Right wing (extended) */}
          <ellipse cx="75" cy="45" rx="22" ry="12" fill={colors.accent} transform="rotate(25 75 45)" />
          {/* Tail */}
          <ellipse cx="50" cy="75" rx="12" ry="20" fill={colors.accent} />
          {/* Beak */}
          <path d="M 58 26 L 68 28 L 58 30 Z" fill={colors.beak} />
          {/* Eye */}
          <circle cx="56" cy="24" r="3.5" fill="#2C2C2C" />
          <circle cx="57" cy="23" r="1.2" fill="white" />
          {/* Cheek blush */}
          <ellipse cx="54" cy="30" rx="5" ry="3" fill="#FFB347" opacity="0.3" />
        </svg>
      </Box>
    );
  }

  // Default: sitting bird
  const bodyColor = color === 'yellowface-green' ? colors.main : colors.main;
  const headColor = color === 'yellowface-green' ? '#FFE84D' : colors.main;

  return (
    <Box
      className={animated ? 'wiggle' : ''}
      sx={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100">
        {/* Body */}
        <ellipse cx="50" cy="55" rx="28" ry="35" fill={bodyColor} />
        {/* Head - Yellow for Yellow Face Green */}
        <circle cx="50" cy="30" r="22" fill={headColor} />
        {/* Wing */}
        <ellipse cx="45" cy="60" rx="15" ry="25" fill={colors.accent} transform="rotate(-20 45 60)" />
        {/* Tail */}
        <ellipse cx="58" cy="82" rx="10" ry="15" fill={colors.accent} transform="rotate(30 58 82)" />
        {/* Beak */}
        <path d="M 62 28 L 72 30 L 62 32 Z" fill={colors.beak} />
        {/* Eye */}
        <circle cx="58" cy="26" r="4" fill="#2C2C2C" />
        <circle cx="59" cy="25" r="1.5" fill="white" />
        {/* Cheek blush */}
        <ellipse cx="56" cy="32" rx="6" ry="4" fill="#FFB347" opacity="0.3" />
        {/* Feet */}
        <path d="M 45 85 L 42 92 M 45 85 L 48 92" stroke={colors.beak} strokeWidth="2" strokeLinecap="round" />
        <path d="M 55 85 L 52 92 M 55 85 L 58 92" stroke={colors.beak} strokeWidth="2" strokeLinecap="round" />
      </svg>
    </Box>
  );
};

export default LovebirdIllustration;
