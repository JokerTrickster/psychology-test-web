import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Chip } from '@mui/material';
import type { BirdResult } from '../types-score';
import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

interface ResultPageParrotProps {
    result: BirdResult;
    onRestart: () => void;
    titleText?: string;
    themeColor?: string;
    themeColorLight?: string;
}

const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ResultPageParrot: React.FC<ResultPageParrotProps> = ({
    result,
    onRestart,
    titleText = '당신의 궁합 앵무새는!',
    themeColor = '#9B59B6',
    themeColorLight = '#BA87D3',
}) => {
    const showContent = true;
    const [showConfetti, setShowConfetti] = useState(false);

    const [confettiItems] = useState(() => {
        return Array.from({ length: 18 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 2,
            duration: 3 + Math.random() * 2,
            rotation: Math.random() * 360,
        }));
    });

    useEffect(() => {
        const confettiTimer = setTimeout(() => setShowConfetti(true), 400);
        return () => clearTimeout(confettiTimer);
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
            }}
        >
            {/* Scrollable content area */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: { xs: 1, sm: 3 },
                    px: { xs: 2, sm: 3 },
                    pt: { xs: 1.5, sm: 3 },
                    pb: { xs: 7.5, sm: 3 },
                }}
            >
                {/* Confetti — purple/pink theme */}
                {showConfetti && confettiItems.map((item) => (
                    <Box
                        key={item.id}
                        sx={{
                            position: 'fixed',
                            top: '-50px',
                            left: `${item.left}%`,
                            animation: `confettiFall ${item.duration}s ease-in-out ${item.delay}s infinite`,
                            zIndex: 0,
                        }}
                    >
                        {item.id % 3 === 0 ? (
                            <FavoriteIcon
                                sx={{
                                    fontSize: 18,
                                    color: item.id % 2 === 0 ? themeColorLight : hexToRgba(themeColor, 0.6),
                                    opacity: 0.7,
                                    transform: `rotate(${item.rotation}deg)`,
                                }}
                            />
                        ) : (
                            <AutoAwesomeIcon
                                sx={{
                                    fontSize: 16,
                                    color: item.id % 2 === 0 ? hexToRgba(themeColor, 0.5) : themeColorLight,
                                    opacity: 0.6,
                                    transform: `rotate(${item.rotation}deg)`,
                                }}
                            />
                        )}
                    </Box>
                ))}

                {/* Title badge */}
                <Box
                    className={showContent ? 'fade-in' : ''}
                    sx={{
                        opacity: showContent ? 1 : 0,
                        animationDelay: '0.1s',
                        zIndex: 1,
                    }}
                >
                    <Paper
                        elevation={2}
                        sx={{
                            px: { xs: 2.5, sm: 4 },
                            py: { xs: 0.7, sm: 1.5 },
                            borderRadius: '50px',
                            background: `linear-gradient(135deg, ${hexToRgba(themeColorLight, 0.15)} 0%, ${hexToRgba(themeColor, 0.1)} 100%)`,
                            backdropFilter: 'blur(10px)',
                            border: `2px solid ${hexToRgba(themeColorLight, 0.3)}`,
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 700,
                                color: themeColor,
                                fontSize: { xs: '0.8rem', sm: '1.1rem' },
                                letterSpacing: '0.05em',
                            }}
                        >
                            {titleText}
                        </Typography>
                    </Paper>
                </Box>

                {/* Result name */}
                <Box
                    className={showContent ? 'fade-in' : ''}
                    sx={{
                        opacity: showContent ? 1 : 0,
                        animationDelay: '0.2s',
                        zIndex: 1,
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 900,
                            fontSize: {
                                xs: '1.6rem',
                                sm: '2.8rem',
                                md: '3.5rem',
                            },
                            background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColorLight} 50%, ${hexToRgba(themeColor, 0.8)} 100%)`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: { xs: 0.3, sm: 1 },
                            lineHeight: 1.15,
                        }}
                    >
                        {result.name}
                    </Typography>
                    {result.summary && (
                        <Typography
                            variant="body1"
                            sx={{
                                color: themeColor,
                                fontSize: { xs: '0.85rem', sm: '1.1rem' },
                                fontWeight: 600,
                                fontStyle: 'italic',
                            }}
                        >
                            {result.summary}
                        </Typography>
                    )}
                </Box>

                {/* Result image — larger than original */}
                {result.imageUrl && (
                    <Box
                        className={showContent ? 'fade-in' : ''}
                        sx={{
                            opacity: showContent ? 1 : 0,
                            animationDelay: '0.3s',
                            width: '100%',
                            maxWidth: { xs: '150px', sm: '200px', md: '250px' },
                            borderRadius: { xs: '20px', sm: '28px' },
                            overflow: 'visible',
                            boxShadow: `0 8px 28px ${hexToRgba(themeColor, 0.3)}`,
                            border: {
                                xs: `3px solid ${hexToRgba(themeColorLight, 0.4)}`,
                                sm: `3px solid ${hexToRgba(themeColorLight, 0.4)}`,
                            },
                            position: 'relative',
                            mb: { xs: 1, sm: 2 },
                            zIndex: 1,
                            backgroundColor: 'rgba(255, 255, 255, 0.6)',
                            padding: { xs: '10px', sm: '14px' },
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: `linear-gradient(135deg, ${hexToRgba(themeColorLight, 0.08)} 0%, ${hexToRgba(themeColor, 0.08)} 100%)`,
                                pointerEvents: 'none',
                                borderRadius: { xs: '20px', sm: '28px' },
                            },
                        }}
                    >
                        <img
                            src={result.imageUrl}
                            alt={result.name}
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain',
                                display: 'block',
                                position: 'relative',
                                zIndex: 1,
                            }}
                        />
                    </Box>
                )}

                {/* Traits tags */}
                {result.traits && result.traits.length > 0 && (
                    <Box
                        className={showContent ? 'fade-in' : ''}
                        sx={{
                            opacity: showContent ? 1 : 0,
                            animationDelay: '0.4s',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: { xs: 0.8, sm: 1 },
                            justifyContent: 'center',
                            zIndex: 1,
                        }}
                    >
                        {result.traits.map((trait) => (
                            <Chip
                                key={trait}
                                label={`#${trait}`}
                                size="small"
                                sx={{
                                    backgroundColor: hexToRgba(themeColorLight, 0.12),
                                    color: themeColor,
                                    fontWeight: 600,
                                    fontSize: { xs: '0.75rem', sm: '0.85rem' },
                                    border: `1px solid ${hexToRgba(themeColorLight, 0.25)}`,
                                    borderRadius: '20px',
                                }}
                            />
                        ))}
                    </Box>
                )}

                {/* Description card */}
                <Paper
                    className={showContent ? 'fade-in' : ''}
                    elevation={3}
                    sx={{
                        opacity: showContent ? 1 : 0,
                        animationDelay: '0.5s',
                        p: { xs: 1.6, sm: 4 },
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 245, 255, 0.95) 100%)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: { xs: '14px', sm: '32px' },
                        border: {
                            xs: `2px solid ${hexToRgba(themeColorLight, 0.3)}`,
                            sm: `3px solid ${hexToRgba(themeColorLight, 0.3)}`,
                        },
                        mb: { xs: 0.5, sm: 2 },
                        width: '100%',
                        position: 'relative',
                        zIndex: 1,
                        boxShadow: `0 8px 24px ${hexToRgba(themeColor, 0.2)}`,
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: { xs: -6, sm: -10 },
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: { xs: '40px', sm: '60px' },
                            height: { xs: '4px', sm: '6px' },
                            borderRadius: '3px',
                            background: `linear-gradient(90deg, ${themeColorLight}, ${themeColor})`,
                        },
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            wordBreak: 'keep-all',
                            color: '#3A3A3A',
                            lineHeight: 1.6,
                            fontSize: {
                                xs: '0.85rem',
                                sm: '1.1rem',
                            },
                            whiteSpace: 'pre-line',
                        }}
                    >
                        {result.description}
                    </Typography>
                </Paper>

                {/* Recommended jobs */}
                {result.recommendedJobs && result.recommendedJobs.length > 0 && (
                    <Box
                        className={showContent ? 'fade-in' : ''}
                        sx={{
                            opacity: showContent ? 1 : 0,
                            animationDelay: '0.55s',
                            zIndex: 1,
                            width: '100%',
                        }}
                    >
                        <Paper
                            elevation={1}
                            sx={{
                                p: { xs: 1.2, sm: 2.5 },
                                borderRadius: { xs: '12px', sm: '20px' },
                                background: hexToRgba(themeColor, 0.04),
                                border: `1px solid ${hexToRgba(themeColor, 0.15)}`,
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    color: themeColor,
                                    fontWeight: 600,
                                    fontSize: { xs: '0.75rem', sm: '0.9rem' },
                                    mb: 0.8,
                                }}
                            >
                                추천 직업
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, justifyContent: 'center' }}>
                                {result.recommendedJobs.map((job) => (
                                    <Chip
                                        key={job}
                                        label={job}
                                        size="small"
                                        sx={{
                                            backgroundColor: hexToRgba(themeColor, 0.1),
                                            color: themeColor,
                                            fontWeight: 600,
                                            fontSize: { xs: '0.72rem', sm: '0.82rem' },
                                            border: `1px solid ${hexToRgba(themeColor, 0.2)}`,
                                            borderRadius: '16px',
                                        }}
                                    />
                                ))}
                            </Box>
                        </Paper>
                    </Box>
                )}

                {/* Compatibility info */}
                {result.compatibility && result.compatibility.length > 0 && (
                    <Box
                        className={showContent ? 'fade-in' : ''}
                        sx={{
                            opacity: showContent ? 1 : 0,
                            animationDelay: '0.6s',
                            zIndex: 1,
                            width: '100%',
                        }}
                    >
                        <Paper
                            elevation={1}
                            sx={{
                                p: { xs: 1.2, sm: 2.5 },
                                borderRadius: { xs: '12px', sm: '20px' },
                                background: hexToRgba(themeColor, 0.06),
                                border: `1px solid ${hexToRgba(themeColor, 0.15)}`,
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    color: themeColor,
                                    fontWeight: 600,
                                    fontSize: { xs: '0.75rem', sm: '0.9rem' },
                                    mb: 0.5,
                                }}
                            >
                                잘 맞는 친구
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#777',
                                    fontSize: { xs: '0.8rem', sm: '0.95rem' },
                                }}
                            >
                                {result.compatibility.join(', ')}
                            </Typography>
                        </Paper>
                    </Box>
                )}

                {/* Fun message */}
                <Typography
                    className={showContent ? 'fade-in' : ''}
                    variant="body2"
                    sx={{
                        opacity: showContent ? 0.7 : 0,
                        animationDelay: '0.7s',
                        color: '#999',
                        fontSize: { xs: '0.75rem', sm: '0.9rem' },
                        mt: { xs: 0.3, sm: 1 },
                        mb: { xs: 0.4, sm: 0 },
                        zIndex: 1,
                    }}
                >
                    친구들과도 함께 해보세요!
                </Typography>
            </Box>

            {/* Fixed button area on mobile */}
            <Box
                sx={{
                    position: { xs: 'fixed', sm: 'relative' },
                    bottom: { xs: 0, sm: 'auto' },
                    left: { xs: 0, sm: 'auto' },
                    right: { xs: 0, sm: 'auto' },
                    zIndex: 10,
                    backgroundColor: { xs: 'rgba(255, 255, 255, 0.95)', sm: 'transparent' },
                    backdropFilter: { xs: 'blur(10px)', sm: 'none' },
                    borderTop: { xs: `1px solid ${hexToRgba(themeColorLight, 0.2)}`, sm: 'none' },
                    boxShadow: { xs: '0 -4px 12px rgba(0, 0, 0, 0.08)', sm: 'none' },
                    py: { xs: 1.4, sm: 0 },
                    px: { xs: 2, sm: 0 },
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<ReplayIcon />}
                    onClick={onRestart}
                    sx={{
                        minWidth: { xs: '200px', sm: '240px' },
                        width: { xs: '100%', sm: 'auto' },
                        maxWidth: '300px',
                        fontSize: {
                            xs: '0.95rem',
                            sm: '1.25rem',
                        },
                        fontWeight: 700,
                        padding: {
                            xs: '11px 24px',
                            sm: '16px 40px',
                        },
                        background: `linear-gradient(135deg, ${themeColorLight} 0%, ${themeColor} 100%)`,
                        color: '#fff',
                        boxShadow: `0 8px 24px ${hexToRgba(themeColor, 0.4)}`,
                        '&:hover': {
                            background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColorLight} 100%)`,
                            boxShadow: `0 12px 36px ${hexToRgba(themeColor, 0.6)}`,
                        },
                        '&:active': {
                            transform: 'scale(0.98)',
                        },
                    }}
                >
                    다시 테스트하기
                </Button>
            </Box>

            {/* Confetti animation */}
            <style>
                {`
                    @keyframes confettiFall {
                        0% {
                            transform: translateY(-50px) rotate(0deg);
                            opacity: 1;
                        }
                        100% {
                            transform: translateY(110vh) rotate(720deg);
                            opacity: 0;
                        }
                    }
                `}
            </style>
        </Box>
    );
};

export default ResultPageParrot;
