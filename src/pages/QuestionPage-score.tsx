import React, { useState } from 'react';
import { Box, Typography, Button, Paper, LinearProgress } from '@mui/material';
import type { Question } from '../types-score';
import LovebirdIllustration from '../components/LovebirdIllustration';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface QuestionPageScoreProps {
    question: Question;
    questionNumber: number;
    totalQuestions: number;
    onSelectOption: (score: number) => void;
}

const QuestionPageScore: React.FC<QuestionPageScoreProps> = ({
    question,
    questionNumber,
    totalQuestions,
    onSelectOption
}) => {
    const showContent = true;
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const birdColors: Array<'pepe-green' | 'violet-butter' | 'pepe-yellow' | 'yellowface-green' | 'pepe-lime'> = [
        'pepe-green',
        'pepe-yellow',
    ];

    const progress = ((questionNumber - 1) / totalQuestions) * 100;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                height: '100%',
                gap: { xs: 0.9, sm: 3 },
                pb: { xs: 'calc(200px + env(safe-area-inset-bottom))', sm: 4 }, // Space for fixed buttons on mobile
                py: { xs: 1.2, sm: 0 },
                px: { xs: 2, sm: 0 },
                position: 'relative',
            }}
        >
            {/* Progress bar */}
            <Box
                sx={{
                    width: '100%',
                    mb: { xs: 0.5, sm: 1 },
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: { xs: '0.7rem', sm: '0.85rem' },
                            color: '#7EC850',
                            fontWeight: 600,
                        }}
                    >
                        {questionNumber} / {totalQuestions}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: { xs: '0.65rem', sm: '0.75rem' },
                            color: '#999',
                        }}
                    >
                        {question.category}
                    </Typography>
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        height: { xs: 6, sm: 8 },
                        borderRadius: 4,
                        backgroundColor: 'rgba(126, 200, 80, 0.15)',
                        '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            background: 'linear-gradient(90deg, #7EC850 0%, #B8E986 100%)',
                        },
                    }}
                />
            </Box>

            {/* Decorative bird on top corner */}
            <Box
                sx={{
                    position: 'absolute',
                    top: { xs: -15, sm: -20 },
                    right: { xs: 5, sm: 10 },
                    opacity: 0.6,
                    zIndex: 1,
                    display: { xs: 'none', sm: 'block' },
                }}
            >
                <LovebirdIllustration variant="sitting" color="pepe-yellow" size={60} animated />
            </Box>

            {/* Question text box */}
            <Paper
                className={showContent ? 'bounce-in' : ''}
                elevation={3}
                sx={{
                    opacity: showContent ? 1 : 0,
                    animationDelay: '0.2s',
                    p: { xs: 1.8, sm: 4 },
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 249, 250, 0.95) 100%)',
                    backdropFilter: 'blur(12px)',
                    border: {
                        xs: '2px solid rgba(126, 200, 80, 0.4)',
                        sm: '3px solid rgba(126, 200, 80, 0.4)',
                    },
                    textAlign: 'center',
                    borderRadius: { xs: '18px', sm: '32px' },
                    position: 'relative',
                    mt: { xs: 2, sm: 4 },
                    mb: { xs: 3, sm: 4 },
                    boxShadow: '0 10px 32px rgba(126, 200, 80, 0.25)',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: { xs: -10, sm: -15 },
                        left: { xs: 15, sm: 20 },
                        width: { xs: '20px', sm: '30px' },
                        height: { xs: '20px', sm: '30px' },
                        background: 'rgba(255, 183, 213, 0.6)',
                        borderRadius: '50%',
                        animation: 'pulse-glow 2s ease-in-out infinite',
                    },
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: { xs: -8, sm: -12 },
                        right: { xs: 20, sm: 30 },
                        width: { xs: '18px', sm: '24px' },
                        height: { xs: '18px', sm: '24px' },
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
                        lineHeight: 1.45,
                        fontSize: {
                            xs: '0.95rem',
                            sm: '1.5rem',
                            md: '1.8rem',
                        },
                    }}
                >
                    {question.text}
                </Typography>
            </Paper>

            {/* Options (A and B) - Fixed at bottom */}
            <Box 
                sx={{ 
                    position: { xs: 'fixed', sm: 'relative' },
                    bottom: { xs: 0, sm: 'auto' },
                    left: { xs: 0, sm: 'auto' },
                    right: { xs: 0, sm: 'auto' },
                    width: { xs: '100%', sm: '100%' },
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: { xs: 1.2, sm: 2.5 },
                    p: { xs: '16px', sm: 0 },
                    pb: { xs: 'max(16px, env(safe-area-inset-bottom))', sm: 0 },
                    backgroundColor: { xs: 'rgba(255, 255, 255, 0.95)', sm: 'transparent' },
                    backdropFilter: { xs: 'blur(10px)', sm: 'none' },
                    borderTop: { xs: '1px solid rgba(126, 200, 80, 0.2)', sm: 'none' },
                    boxShadow: { xs: '0 -4px 12px rgba(0, 0, 0, 0.08)', sm: 'none' },
                    zIndex: 10,
                    mt: { xs: 0, sm: 'auto' },
                    mb: { xs: 0, sm: 0 },
                }}
            >
                {question.options.map((option, index) => {
                    const isHovered = hoveredIndex === index;
                    const birdColor = birdColors[index % birdColors.length];
                    const label = index === 0 ? 'A' : 'B';

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
                            {/* Decorative bird appears on hover - Hidden on mobile */}
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
                                    display: { xs: 'none', sm: 'block' },
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
                                onClick={() => onSelectOption(option.score)}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onTouchStart={() => setHoveredIndex(index)}
                                onTouchEnd={() => setHoveredIndex(null)}
                                sx={{
                                    padding: {
                                        xs: '16px 20px',
                                        sm: '24px 32px',
                                    },
                                    minHeight: { xs: '56px', sm: '64px' },
                                    borderWidth: {
                                        xs: '2.5px',
                                        sm: '3px',
                                    },
                                    borderColor: isHovered ? '#5CA632' : 'rgba(126, 200, 80, 0.5)',
                                    color: '#3A3A3A',
                                    backgroundColor: isHovered ? 'rgba(126, 200, 80, 0.15)' : 'rgba(255, 255, 255, 0.9)',
                                    backdropFilter: 'blur(10px)',
                                    fontSize: {
                                        xs: '1rem',
                                        sm: '1.25rem',
                                    },
                                    fontWeight: 600,
                                    borderRadius: { xs: '16px', sm: '32px' },
                                    textAlign: 'left',
                                    position: 'relative',
                                    overflow: 'visible',
                                    boxShadow: isHovered
                                        ? '0 12px 40px rgba(126, 200, 80, 0.5)'
                                        : '0 6px 20px rgba(126, 200, 80, 0.25)',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        borderWidth: { xs: '2.5px', sm: '3px' },
                                        borderColor: '#5CA632',
                                        backgroundColor: 'rgba(126, 200, 80, 0.2)',
                                        transform: {
                                            xs: 'scale(1.02)',
                                            sm: 'translateX(8px) scale(1.02)',
                                        },
                                    },
                                    '&:active': {
                                        transform: 'scale(0.98)',
                                    },
                                    '&::before': {
                                        content: `"${label}"`,
                                        position: 'absolute',
                                        left: { xs: 16, sm: 20 },
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: { xs: '32px', sm: '36px' },
                                        height: { xs: '32px', sm: '36px' },
                                        borderRadius: '50%',
                                        backgroundColor: isHovered ? '#7EC850' : 'rgba(126, 200, 80, 0.5)',
                                        color: isHovered ? '#fff' : '#7EC850',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 700,
                                        fontSize: { xs: '0.9rem', sm: '1rem' },
                                        transition: 'all 0.3s ease',
                                    },
                                }}
                            >
                                <Box sx={{ pl: { xs: 4, sm: 4.5 } }}>
                                    {option.text}
                                </Box>
                            </Button>

                            {/* Small heart icon on hover - Hidden on mobile */}
                            {isHovered && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        right: -30,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        animation: 'float 2s ease-in-out infinite',
                                        display: { xs: 'none', sm: 'block' },
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
                    bottom: { xs: -20, sm: -30 },
                    left: { xs: 0, sm: 5 },
                    opacity: 0.5,
                    zIndex: 1,
                    display: { xs: 'none', sm: 'block' },
                }}
            >
                <LovebirdIllustration variant="sitting" color="violet-butter" size={55} animated />
            </Box>
        </Box>
    );
};

export default QuestionPageScore;
