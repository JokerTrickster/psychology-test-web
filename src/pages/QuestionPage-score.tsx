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
                justifyContent: 'flex-start', // Changed from center to allow using spacer
                height: '100%',
                gap: { xs: 0.9, sm: 3 },
                pb: { xs: 1.2, sm: 4 },
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
                    p: { xs: 1.6, sm: 4 },
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 249, 250, 0.95) 100%)',
                    backdropFilter: 'blur(12px)',
                    border: {
                        xs: '2px solid rgba(255, 183, 213, 0.4)',
                        sm: '3px solid rgba(255, 183, 213, 0.4)',
                    },
                    textAlign: 'center',
                    borderRadius: { xs: '16px', sm: '32px' },
                    position: 'relative',
                    mt: 'auto', // Push to center/bottom vertically alongside options? No, let's keep it top-ish or center.
                    // Actually, if I use mt: auto on BOTH Question and Options, they might split the space?
                    // Let's first try just pushing Options down.
                    boxShadow: '0 10px 32px rgba(255, 183, 213, 0.35)',
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

            {/* Options (A and B) */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0.9, sm: 2.5 }, mt: 'auto', mb: { xs: 3, sm: 0 } }}>
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
                                        xs: '11px 14px',
                                        sm: '20px 24px',
                                    },
                                    minHeight: '46px',
                                    borderWidth: {
                                        xs: '2px',
                                        sm: '3px',
                                    },
                                    borderColor: isHovered ? '#5CA632' : 'rgba(126, 200, 80, 0.5)',
                                    color: '#3A3A3A',
                                    backgroundColor: isHovered ? 'rgba(126, 200, 80, 0.15)' : 'rgba(255, 255, 255, 0.8)',
                                    backdropFilter: 'blur(10px)',
                                    fontSize: {
                                        xs: '0.88rem',
                                        sm: '1.15rem',
                                    },
                                    fontWeight: 600,
                                    borderRadius: { xs: '14px', sm: '28px' },
                                    textAlign: 'left',
                                    position: 'relative',
                                    overflow: 'visible',
                                    boxShadow: isHovered
                                        ? '0 10px 32px rgba(126, 200, 80, 0.4)'
                                        : '0 4px 16px rgba(126, 200, 80, 0.2)',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        borderWidth: { xs: '2px', sm: '3px' },
                                        borderColor: '#5CA632',
                                        backgroundColor: 'rgba(126, 200, 80, 0.15)',
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
                                        left: { xs: 12, sm: 16 },
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: { xs: '24px', sm: '28px' },
                                        height: { xs: '24px', sm: '28px' },
                                        borderRadius: '50%',
                                        backgroundColor: isHovered ? '#7EC850' : 'rgba(126, 200, 80, 0.5)',
                                        color: isHovered ? '#fff' : '#7EC850',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 700,
                                        fontSize: { xs: '0.75rem', sm: '0.85rem' },
                                        transition: 'all 0.3s ease',
                                    },
                                }}
                            >
                                <Box sx={{ pl: { xs: 3, sm: 3.5 } }}>
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
