import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import type { Node } from '../types';
import LovebirdIllustration from '../components/LovebirdIllustration';
import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';

interface ResultPageProps {
    node: Node;
    onRestart: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ node, onRestart }) => {
    // Remove local animation state - handled by App.tsx AnimatePresence
    const showContent = true;
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        // Keep confetti animation with slight delay
        const confettiTimer = setTimeout(() => setShowConfetti(true), 400);
        return () => {
            clearTimeout(confettiTimer);
        };
    }, []);

    // Generate random confetti items
    const confettiItems = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        rotation: Math.random() * 360,
    }));

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
                    gap: { xs: 0.8, sm: 3 },
                    px: { xs: 2, sm: 3 },
                    pt: { xs: 1.5, sm: 3 },
                    pb: { xs: 8, sm: 3 }, // Extra padding for fixed button on mobile
                }}
            >
                {/* Animated confetti */}
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
                                    fontSize: 20,
                                    color: item.id % 2 === 0 ? '#7EC850' : '#B8E986',
                                    opacity: 0.7,
                                    transform: `rotate(${item.rotation}deg)`,
                                }}
                            />
                        ) : (
                            <StarIcon
                                sx={{
                                    fontSize: 18,
                                    color: item.id % 2 === 0 ? '#FFE84D' : '#FFF9B0',
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
                            py: { xs: 0.8, sm: 1.5 },
                            borderRadius: '50px',
                            background: 'linear-gradient(135deg, rgba(126, 200, 80, 0.15) 0%, rgba(184, 233, 134, 0.15) 100%)',
                            backdropFilter: 'blur(10px)',
                            border: '2px solid rgba(126, 200, 80, 0.3)',
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 700,
                                color: '#5CA632',
                                fontSize: { xs: '0.85rem', sm: '1.1rem' },
                                letterSpacing: '0.05em',
                            }}
                        >
                            🎉 테스트 완료! 🎉
                        </Typography>
                    </Paper>
                </Box>

                {/* Result title - Smaller on mobile */}
                <Box
                    className={showContent ? 'fade-in' : ''}
                    sx={{
                        opacity: showContent ? 1 : 0,
                        animationDelay: '0.2s',
                        zIndex: 1,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#888',
                            fontSize: { xs: '0.7rem', sm: '1rem' },
                            mb: { xs: 0.2, sm: 1 },
                        }}
                    >
                        당신의 성격 유형은...
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 900,
                            fontSize: {
                                xs: '1.3rem',    // 320px - very compact
                                sm: '2.5rem',    // 600px+
                                md: '3.2rem',    // 900px+
                            },
                            background: 'linear-gradient(135deg, #7EC850 0%, #5CA632 50%, #B8E986 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: { xs: 0.3, sm: 2 },
                            lineHeight: 1.15,
                        }}
                    >
                        {node.title}
                    </Typography>
                </Box>

                {/* Lovebird celebration illustration - Much smaller on mobile */}
                <Box
                    className={showContent ? 'fade-in' : ''}
                    sx={{
                        opacity: showContent ? 1 : 0,
                        animationDelay: '0.3s',
                        zIndex: 1,
                        mb: { xs: 0, sm: 1 },
                    }}
                >
                    <LovebirdIllustration
                        variant="couple"
                        size={{ xs: 50, sm: 120, md: 140 }}
                        animated
                    />
                </Box>

                {/* Result image - Even smaller on mobile for better fit */}
                {node.imageUrl && (
                    <Box
                        className={showContent ? 'fade-in' : ''}
                        sx={{
                            opacity: showContent ? 1 : 0,
                            animationDelay: '0.4s',
                            width: '100%',
                            maxWidth: { xs: '200px', sm: '100%' }, // Much smaller on mobile
                            borderRadius: { xs: '10px', sm: '32px' },
                            overflow: 'hidden',
                            boxShadow: '0 6px 20px rgba(126, 200, 80, 0.25)',
                            border: {
                                xs: '2px solid rgba(255, 255, 255, 0.9)',
                                sm: '4px solid rgba(255, 255, 255, 0.9)',
                            },
                            position: 'relative',
                            mb: { xs: 0.5, sm: 2 },
                            zIndex: 1,
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(135deg, rgba(126, 200, 80, 0.1) 0%, rgba(255, 232, 77, 0.1) 100%)',
                                pointerEvents: 'none',
                            },
                        }}
                    >
                        <img
                            src={node.imageUrl}
                            alt="Result"
                            style={{
                                width: '100%',
                                height: 'auto',
                                maxHeight: window.innerWidth < 600 ? '100px' : '360px', // Smaller height
                                objectFit: 'contain',
                                display: 'block',
                            }}
                        />
                    </Box>
                )}

                {/* Description card - Very compact on mobile */}
                <Paper
                    className={showContent ? 'fade-in' : ''}
                    elevation={3}
                    sx={{
                        opacity: showContent ? 1 : 0,
                        animationDelay: '0.5s',
                        p: { xs: 1.5, sm: 4 },
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 249, 250, 0.95) 100%)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: { xs: '12px', sm: '32px' },
                        border: {
                            xs: '2px solid rgba(126, 200, 80, 0.3)',
                            sm: '3px solid rgba(126, 200, 80, 0.3)',
                        },
                        mb: { xs: 0.5, sm: 2 },
                        width: '100%',
                        position: 'relative',
                        zIndex: 1,
                        boxShadow: '0 8px 24px rgba(126, 200, 80, 0.2)',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: { xs: -6, sm: -10 },
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: { xs: '40px', sm: '60px' },
                            height: { xs: '4px', sm: '6px' },
                            borderRadius: '3px',
                            background: 'linear-gradient(90deg, #7EC850, #FFE84D)',
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
                                xs: '0.78rem',   // 320px - very compact
                                sm: '1.1rem',    // 600px+
                            },
                            whiteSpace: 'pre-line',
                        }}
                    >
                        {node.description}
                    </Typography>
                </Paper>

                {/* Decorative flying birds - Smaller and fewer on mobile */}
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' }, // Hide on mobile to save space
                        gap: { sm: 3 },
                        justifyContent: 'center',
                        mb: { sm: 2 },
                        zIndex: 1,
                        flexWrap: 'wrap',
                    }}
                >
                    {['pepe-green', 'violet-butter', 'pepe-yellow', 'yellowface-green', 'pepe-lime'].map((color, idx) => (
                        <Box
                            key={color}
                            className={showContent ? 'fade-in' : ''}
                            sx={{
                                opacity: showContent ? 1 : 0,
                                animationDelay: `${0.6 + idx * 0.08}s`,
                            }}
                        >
                            <LovebirdIllustration
                                variant="flying"
                                color={color as 'pepe-green' | 'violet-butter' | 'pepe-yellow' | 'yellowface-green' | 'pepe-lime'}
                                size={{ sm: 45 }}
                                animated
                            />
                        </Box>
                    ))}
                </Box>

                {/* Fun message - Moved before button */}
                <Typography
                    className={showContent ? 'fade-in' : ''}
                    variant="body2"
                    sx={{
                        opacity: showContent ? 0.7 : 0,
                        animationDelay: '1s',
                        color: '#999',
                        fontSize: { xs: '0.75rem', sm: '0.9rem' },
                        mt: { xs: 0.3, sm: 1 },
                        mb: { xs: 0.5, sm: 0 },
                        zIndex: 1,
                    }}
                >
                    💕 친구들과도 함께 해보세요!
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
                    borderTop: { xs: '1px solid rgba(126, 200, 80, 0.2)', sm: 'none' },
                    boxShadow: { xs: '0 -4px 12px rgba(0, 0, 0, 0.08)', sm: 'none' },
                    py: { xs: 1.5, sm: 0 },
                    px: { xs: 2, sm: 0 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 0, sm: 1 },
                }}
            >

                {/* Restart button */}
                <Box
                    className={showContent ? 'fade-in' : ''}
                    sx={{
                        opacity: showContent ? 1 : 0,
                        animationDelay: '0.9s',
                        zIndex: 1,
                        width: '100%',
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
                                xs: '1rem',      // 320px - compact
                                sm: '1.25rem',   // 600px+
                            },
                            fontWeight: 700,
                            padding: {
                                xs: '12px 28px',   // 320px - min 44px touch target
                                sm: '16px 40px',   // 600px+
                            },
                            background: 'linear-gradient(135deg, #FFE84D 0%, #FFD700 100%)',
                            color: '#2C2C2C',
                            boxShadow: '0 8px 24px rgba(255, 232, 77, 0.4)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #FFD700 0%, #FFE84D 100%)',
                                boxShadow: '0 12px 36px rgba(255, 232, 77, 0.6)',
                            },
                            '&:active': {
                                transform: 'scale(0.98)',
                            },
                        }}
                    >
                        다시 테스트하기
                    </Button>
                </Box>
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

export default ResultPage;
