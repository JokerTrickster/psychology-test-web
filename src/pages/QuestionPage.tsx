import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import type { Node } from '../types';
import LovebirdIllustration from '../components/LovebirdIllustration';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface QuestionPageProps {
    node: Node;
    onSelectOption: (nextId: string) => void;
}

const QuestionPage: React.FC<QuestionPageProps> = ({ node, onSelectOption }) => {
    const [showContent, setShowContent] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        setShowContent(false);
        const timer = setTimeout(() => setShowContent(true), 100);
        return () => clearTimeout(timer);
    }, [node]);

    const birdColors: Array<'pepe-green' | 'violet-butter' | 'pepe-yellow' | 'yellowface-green' | 'pepe-lime'> = [
        'pepe-green',
        'violet-butter',
        'pepe-yellow',
        'yellowface-green',
        'pepe-lime'
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                gap: 3,
                pb: 4,
                position: 'relative',
            }}
        >
            {/* Decorative bird on top corner */}
            <Box
                sx={{
                    position: 'absolute',
                    top: -20,
                    right: 10,
                    opacity: 0.6,
                    zIndex: 1,
                }}
            >
                <LovebirdIllustration variant="sitting" color="pepe-yellow" size={60} animated />
            </Box>

            {/* Question image with decorative border */}
            {node.imageUrl && (
                <Paper
                    className={showContent ? 'fade-in' : ''}
                    elevation={4}
                    sx={{
                        opacity: showContent ? 1 : 0,
                        animationDelay: '0.1s',
                        width: '100%',
                        overflow: 'hidden',
                        borderRadius: '32px',
                        mb: 1,
                        lineHeight: 0,
                        border: '4px solid rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 12px 40px rgba(255, 183, 213, 0.4)',
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(135deg, rgba(255, 183, 213, 0.1) 0%, rgba(224, 187, 228, 0.1) 100%)',
                            pointerEvents: 'none',
                        },
                    }}
                >
                    <img
                        src={node.imageUrl}
                        alt="Question"
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '320px',
                            objectFit: 'cover',
                            display: 'block',
                        }}
                    />
                </Paper>
            )}

            {/* Question text box with bird decoration */}
            <Paper
                className={showContent ? 'bounce-in' : ''}
                elevation={3}
                sx={{
                    opacity: showContent ? 1 : 0,
                    animationDelay: '0.2s',
                    p: 4,
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 249, 250, 0.95) 100%)',
                    backdropFilter: 'blur(12px)',
                    border: '3px solid rgba(255, 183, 213, 0.4)',
                    textAlign: 'center',
                    borderRadius: '32px',
                    position: 'relative',
                    boxShadow: '0 10px 32px rgba(255, 183, 213, 0.35)',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: -15,
                        left: 20,
                        width: '30px',
                        height: '30px',
                        background: 'rgba(255, 183, 213, 0.6)',
                        borderRadius: '50%',
                        animation: 'pulse-glow 2s ease-in-out infinite',
                    },
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -12,
                        right: 30,
                        width: '24px',
                        height: '24px',
                        background: 'rgba(181, 234, 215, 0.6)',
                        borderRadius: '50%',
                        animation: 'pulse-glow 2s ease-in-out infinite',
                        animationDelay: '1s',
                    },
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: '#3A3A3A',
                        lineHeight: 1.6,
                        fontSize: { xs: '1.5rem', sm: '1.8rem' },
                    }}
                >
                    {node.text}
                </Typography>
            </Paper>

            {/* Options with bird indicators */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
                {node.options?.map((option, index) => {
                    const isHovered = hoveredIndex === index;
                    const birdColor = birdColors[index % birdColors.length];

                    return (
                        <Box
                            key={index}
                            className={showContent ? 'fade-in' : ''}
                            sx={{
                                opacity: showContent ? 1 : 0,
                                animationDelay: `${0.4 + index * 0.1}s`,
                                position: 'relative',
                            }}
                        >
                            {/* Decorative bird appears on hover */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    left: -50,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    opacity: isHovered ? 1 : 0,
                                    transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                                    pointerEvents: 'none',
                                    zIndex: 10,
                                }}
                            >
                                <LovebirdIllustration
                                    variant="flying"
                                    color={birdColor}
                                    size={45}
                                    animated={isHovered}
                                />
                            </Box>

                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => onSelectOption(option.nextId)}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                sx={{
                                    padding: '20px 24px',
                                    borderWidth: '3px',
                                    borderColor: isHovered ? '#5CA632' : 'rgba(126, 200, 80, 0.5)',
                                    color: '#3A3A3A',
                                    backgroundColor: isHovered ? 'rgba(126, 200, 80, 0.15)' : 'rgba(255, 255, 255, 0.8)',
                                    backdropFilter: 'blur(10px)',
                                    fontSize: '1.15rem',
                                    fontWeight: 600,
                                    borderRadius: '28px',
                                    textAlign: 'left',
                                    position: 'relative',
                                    overflow: 'visible',
                                    boxShadow: isHovered
                                        ? '0 10px 32px rgba(126, 200, 80, 0.4)'
                                        : '0 4px 16px rgba(126, 200, 80, 0.2)',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        borderWidth: '3px',
                                        borderColor: '#5CA632',
                                        backgroundColor: 'rgba(126, 200, 80, 0.15)',
                                        transform: 'translateX(8px) scale(1.02)',
                                    },
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        left: 16,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        backgroundColor: isHovered ? '#7EC850' : 'rgba(126, 200, 80, 0.5)',
                                        transition: 'all 0.3s ease',
                                    },
                                }}
                            >
                                <Box sx={{ pl: 2 }}>
                                    {option.text}
                                </Box>
                            </Button>

                            {/* Small heart icon on hover */}
                            {isHovered && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        right: -30,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        animation: 'float 2s ease-in-out infinite',
                                    }}
                                >
                                    <FavoriteIcon sx={{ fontSize: 24, color: '#7EC850', opacity: 0.7 }} />
                                </Box>
                            )}
                        </Box>
                    );
                })}
            </Box>

            {/* Bottom decorative bird */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: -30,
                    left: 5,
                    opacity: 0.5,
                    zIndex: 1,
                }}
            >
                <LovebirdIllustration variant="sitting" color="violet-butter" size={55} animated />
            </Box>
        </Box>
    );
};

export default QuestionPage;
