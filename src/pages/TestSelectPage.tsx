import React from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import LovebirdIllustration from '../components/LovebirdIllustration';
import FavoriteIcon from '@mui/icons-material/Favorite';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import StorefrontIcon from '@mui/icons-material/Storefront';

const socialLinks = [
    { icon: <YouTubeIcon />, label: 'YouTube', url: 'https://www.youtube.com/@%EB%AA%A8%EB%9E%80%EB%8F%84%EB%9E%80%EC%95%B5%ED%8A%9C%EB%B8%8C', color: '#FF0000' },
    { icon: <InstagramIcon />, label: 'Instagram', url: 'https://www.instagram.com/molandolan_', color: '#E4405F' },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 48 48" fill="currentColor">
                <path d="M38.39 6.42a13.27 13.27 0 0 0-9.32-3.9h-.2a13.29 13.29 0 0 0-9.33 3.9A13.42 13.42 0 0 0 15.65 16v.37L7.2 35.61a4.09 4.09 0 0 0 3.74 5.76h.27l2.53-.15a4.1 4.1 0 0 0 3.63-2.97l1.68-5.93c.49.04.98.06 1.47.06h6.93c.49 0 .97-.02 1.45-.06l1.68 5.93a4.1 4.1 0 0 0 3.63 2.97l2.53.15h.28a4.09 4.09 0 0 0 3.74-5.76l-8.46-19.24V16a13.42 13.42 0 0 0-3.89-9.58ZM27.46 28.35h-6.93a8.76 8.76 0 0 1-1.64-.15l3.26-7.42a2.5 2.5 0 0 1 2.29-1.5h.12a2.5 2.5 0 0 1 2.28 1.5l3.26 7.42a8.76 8.76 0 0 1-1.64.15Z" />
            </svg>
        ),
        label: 'TikTok',
        url: 'https://www.tiktok.com/@molandolan_',
        color: '#000000',
    },
    { icon: <StorefrontIcon />, label: '쇼핑몰', url: 'https://link.inpock.co.kr/molandolan', color: '#FF9800' },
];

interface TestSelectPageProps {
    onSelectTest: (type: 'lovebird' | 'parrot') => void;
}

const TestSelectPage: React.FC<TestSelectPageProps> = ({ onSelectTest }) => {
    const showContent = true;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '100%',
                textAlign: 'center',
                gap: { xs: 1.5, sm: 3 },
                position: 'relative',
                overflow: 'hidden',
                py: { xs: 2, sm: 3 },
                px: { xs: 2, sm: 0 },
            }}
        >
            {/* Decorative floating hearts */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '5%',
                    left: '10%',
                    opacity: 0.4,
                    animation: 'float 4s ease-in-out infinite',
                }}
            >
                <FavoriteIcon sx={{ fontSize: 35, color: '#7EC850' }} />
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: '12%',
                    right: '12%',
                    opacity: 0.3,
                    animation: 'float 5s ease-in-out infinite',
                    animationDelay: '1.5s',
                }}
            >
                <FavoriteIcon sx={{ fontSize: 28, color: '#E8A0BF' }} />
            </Box>

            {/* Couple illustration */}
            <Box
                className={showContent ? 'fade-in' : ''}
                sx={{
                    opacity: showContent ? 1 : 0,
                    mb: { xs: 0, sm: 1 },
                }}
            >
                <LovebirdIllustration
                    variant="couple"
                    size={{ xs: 50, sm: 90, md: 100 }}
                    animated
                />
            </Box>

            {/* Title */}
            <Box
                className={showContent ? 'fade-in' : ''}
                sx={{
                    opacity: showContent ? 1 : 0,
                    animationDelay: '0.15s',
                }}
            >
                <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                        fontWeight: 800,
                        fontSize: {
                            xs: '1.4rem',
                            sm: '2.5rem',
                            md: '3rem',
                        },
                        color: '#5CA632',
                        textShadow: '0 2px 8px rgba(92, 166, 50, 0.3)',
                        mb: { xs: 0.5, sm: 1 },
                        lineHeight: 1.2,
                    }}
                >
                    어떤 테스트를 해볼까?
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: '#888',
                        fontSize: { xs: '0.8rem', sm: '1rem' },
                    }}
                >
                    하고 싶은 테스트를 골라보세요!
                </Typography>
            </Box>

            {/* Test cards */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 1.5, sm: 2.5 },
                    width: '100%',
                    mt: { xs: 1, sm: 2 },
                }}
            >
                {/* Card 1: Lovebird test */}
                <Paper
                    className={showContent ? 'fade-in' : ''}
                    elevation={3}
                    onClick={() => onSelectTest('lovebird')}
                    sx={{
                        opacity: showContent ? 1 : 0,
                        animationDelay: '0.3s',
                        flex: 1,
                        p: { xs: 2, sm: 3 },
                        borderRadius: { xs: '16px', sm: '24px' },
                        cursor: 'pointer',
                        background: 'linear-gradient(135deg, rgba(126, 200, 80, 0.1) 0%, rgba(184, 233, 134, 0.15) 100%)',
                        border: '2px solid rgba(126, 200, 80, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.02)',
                            boxShadow: '0 12px 36px rgba(126, 200, 80, 0.35)',
                            borderColor: '#7EC850',
                        },
                        '&:active': {
                            transform: 'scale(0.98)',
                        },
                    }}
                >
                    <Box sx={{ mb: 1 }}>
                        <LovebirdIllustration
                            variant="flying"
                            color="pepe-green"
                            size={{ xs: 35, sm: 50 }}
                            animated
                        />
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: '#5CA632',
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                            mb: 0.5,
                        }}
                    >
                        나는 어떤 앵무새일까?
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#777',
                            fontSize: { xs: '0.75rem', sm: '0.85rem' },
                        }}
                    >
                        31가지 앵무새 중 나의 성격 유형 찾기
                    </Typography>
                </Paper>

                {/* Card 2: Parrot compatibility test */}
                <Paper
                    className={showContent ? 'fade-in' : ''}
                    elevation={3}
                    onClick={() => onSelectTest('parrot')}
                    sx={{
                        opacity: showContent ? 1 : 0,
                        animationDelay: '0.45s',
                        flex: 1,
                        p: { xs: 2, sm: 3 },
                        borderRadius: { xs: '16px', sm: '24px' },
                        cursor: 'pointer',
                        background: 'linear-gradient(135deg, rgba(232, 160, 191, 0.1) 0%, rgba(186, 135, 211, 0.15) 100%)',
                        border: '2px solid rgba(186, 135, 211, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.02)',
                            boxShadow: '0 12px 36px rgba(186, 135, 211, 0.35)',
                            borderColor: '#BA87D3',
                        },
                        '&:active': {
                            transform: 'scale(0.98)',
                        },
                    }}
                >
                    <Box sx={{ mb: 1 }}>
                        <LovebirdIllustration
                            variant="flying"
                            color="violet-butter"
                            size={{ xs: 35, sm: 50 }}
                            animated
                        />
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: '#9B59B6',
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                            mb: 0.5,
                        }}
                    >
                        나랑 궁합 좋은 모란도란은?
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#777',
                            fontSize: { xs: '0.75rem', sm: '0.85rem' },
                        }}
                    >
                        5마리 앵무새 중 나의 성격 궁합 찾기
                    </Typography>
                </Paper>
            </Box>

            {/* Social links */}
            <Box
                className={showContent ? 'fade-in' : ''}
                sx={{
                    opacity: showContent ? 1 : 0,
                    animationDelay: '0.6s',
                    display: 'flex',
                    gap: { xs: 1.5, sm: 2 },
                    justifyContent: 'center',
                    mt: { xs: 1, sm: 2 },
                }}
            >
                {socialLinks.map((link) => (
                    <IconButton
                        key={link.label}
                        component="a"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        sx={{
                            width: { xs: 40, sm: 48 },
                            height: { xs: 40, sm: 48 },
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: '1.5px solid rgba(0, 0, 0, 0.08)',
                            color: link.color,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: link.color,
                                color: '#fff',
                                transform: 'scale(1.1)',
                                boxShadow: `0 4px 16px ${link.color}40`,
                            },
                            '& svg': {
                                fontSize: { xs: '1.2rem', sm: '1.4rem' },
                            },
                        }}
                    >
                        {link.icon}
                    </IconButton>
                ))}
            </Box>

            {/* Bottom text */}
            <Typography
                className={showContent ? 'fade-in' : ''}
                variant="body2"
                sx={{
                    opacity: showContent ? 0.6 : 0,
                    animationDelay: '0.7s',
                    color: '#999',
                    fontSize: { xs: '0.7rem', sm: '0.85rem' },
                    mt: { xs: 0.5, sm: 1 },
                }}
            >
                간단한 질문으로 알아보는 나만의 앵무새 이야기
            </Typography>
        </Box>
    );
};

export default TestSelectPage;
