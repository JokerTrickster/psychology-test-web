import React from 'react';
import { Box, Typography, Paper, IconButton, Chip } from '@mui/material';
import LovebirdIllustration from '../components/LovebirdIllustration';
import FavoriteIcon from '@mui/icons-material/Favorite';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import StorefrontIcon from '@mui/icons-material/Storefront';
import QuizIcon from '@mui/icons-material/Quiz';
import PetsIcon from '@mui/icons-material/Pets';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

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

const testCards = [
    {
        type: 'lovebird' as const,
        category: '성격 유형',
        categoryIcon: <QuizIcon sx={{ fontSize: '0.75rem' }} />,
        title: '나는 어떤 앵무새일까?',
        subtitle: '31가지 앵무새 중 나의 성격 유형 찾기',
        meta: '10문항 · 약 2분',
        birdVariant: 'couple' as const,
        birdColor: 'pepe-green' as const,
        accentColor: '#5CA632',
        accentColorLight: 'rgba(126, 200, 80, 0.12)',
        accentColorBorder: 'rgba(126, 200, 80, 0.3)',
        bgGradient: 'linear-gradient(160deg, rgba(126, 200, 80, 0.06) 0%, rgba(184, 233, 134, 0.12) 100%)',
    },
    {
        type: 'parrot' as const,
        category: '궁합 테스트',
        categoryIcon: <PetsIcon sx={{ fontSize: '0.75rem' }} />,
        title: '나랑 궁합 좋은 모란도란은?',
        subtitle: '5마리 앵무새 중 나의 성격 궁합 찾기',
        meta: '5문항 · 약 1분',
        birdVariant: 'flying' as const,
        birdColor: 'violet-butter' as const,
        accentColor: '#9B59B6',
        accentColorLight: 'rgba(186, 135, 211, 0.12)',
        accentColorBorder: 'rgba(186, 135, 211, 0.3)',
        bgGradient: 'linear-gradient(160deg, rgba(232, 160, 191, 0.06) 0%, rgba(186, 135, 211, 0.12) 100%)',
    },
    {
        type: 'office' as const,
        category: '사회생활',
        categoryIcon: <WorkIcon sx={{ fontSize: '0.75rem' }} />,
        title: '사회에서 나의 정체는?',
        subtitle: '5가지 사회생활 유형 중 나는?',
        meta: '5문항 · 약 1분',
        birdVariant: 'sitting' as const,
        birdColor: 'pepe-yellow' as const,
        accentColor: '#E67E22',
        accentColorLight: 'rgba(230, 126, 34, 0.12)',
        accentColorBorder: 'rgba(230, 126, 34, 0.3)',
        bgGradient: 'linear-gradient(160deg, rgba(230, 126, 34, 0.06) 0%, rgba(241, 196, 15, 0.12) 100%)',
    },
    {
        type: 'job' as const,
        category: '직업 추천',
        categoryIcon: <BusinessCenterIcon sx={{ fontSize: '0.75rem' }} />,
        title: '나와 어울리는 직업은?',
        subtitle: '5가지 유형으로 알아보는 추천 직업',
        meta: '5문항 · 약 1분',
        birdVariant: 'flying' as const,
        birdColor: 'white' as const,
        accentColor: '#3498DB',
        accentColorLight: 'rgba(52, 152, 219, 0.12)',
        accentColorBorder: 'rgba(52, 152, 219, 0.3)',
        bgGradient: 'linear-gradient(160deg, rgba(52, 152, 219, 0.06) 0%, rgba(93, 173, 226, 0.12) 100%)',
    },
    {
        type: 'mbti' as const,
        category: 'MBTI 궁합',
        categoryIcon: <PsychologyIcon sx={{ fontSize: '0.75rem' }} />,
        title: '나와 잘 어울리는 MBTI',
        subtitle: '5가지 MBTI 유형 중 나의 찰떡궁합은?',
        meta: '5문항 · 약 1분',
        birdVariant: 'sitting' as const,
        birdColor: 'pepe-lime' as const,
        accentColor: '#E91E63',
        accentColorLight: 'rgba(233, 30, 99, 0.12)',
        accentColorBorder: 'rgba(233, 30, 99, 0.3)',
        bgGradient: 'linear-gradient(160deg, rgba(233, 30, 99, 0.06) 0%, rgba(244, 143, 177, 0.12) 100%)',
    },
];

const gameCards = [
    {
        type: 'sunflower' as const,
        category: '미니게임',
        categoryIcon: <SportsEsportsIcon sx={{ fontSize: '0.75rem' }} />,
        title: '🌻 해바라기씨 먹은 로또',
        subtitle: '셔플되는 앵무새 중 정답을 찾아라!',
        meta: '5라운드 · 미니게임',
        birdVariant: 'sitting' as const,
        birdColor: 'pepe-yellow' as const,
        accentColor: '#FF8C00',
        accentColorLight: 'rgba(255, 140, 0, 0.12)',
        accentColorBorder: 'rgba(255, 140, 0, 0.3)',
        bgGradient: 'linear-gradient(160deg, rgba(255, 215, 0, 0.08) 0%, rgba(255, 140, 0, 0.12) 100%)',
    },
];

interface TestSelectPageProps {
    onSelectTest: (type: 'lovebird' | 'parrot' | 'office' | 'job' | 'mbti' | 'sunflower') => void;
}

const TestSelectPage: React.FC<TestSelectPageProps> = ({ onSelectTest }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '100%',
                textAlign: 'center',
                gap: { xs: 2, sm: 3 },
                position: 'relative',
                overflow: 'hidden',
                py: { xs: 2.5, sm: 3 },
                px: { xs: 2, sm: 0 },
            }}
        >
            {/* Decorative floating hearts */}
            <Box sx={{ position: 'absolute', top: '5%', left: '10%', opacity: 0.4, animation: 'float 4s ease-in-out infinite' }}>
                <FavoriteIcon sx={{ fontSize: 35, color: '#7EC850' }} />
            </Box>
            <Box sx={{ position: 'absolute', top: '12%', right: '12%', opacity: 0.3, animation: 'float 5s ease-in-out infinite', animationDelay: '1.5s' }}>
                <FavoriteIcon sx={{ fontSize: 28, color: '#E8A0BF' }} />
            </Box>

            {/* Header: illustration + title */}
            <Box sx={{ mb: { xs: 0, sm: 0.5 } }}>
                <LovebirdIllustration variant="couple" size={{ xs: 50, sm: 90, md: 100 }} animated />
            </Box>

            <Box>
                <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                        fontWeight: 800,
                        fontSize: { xs: '1.4rem', sm: '2.5rem', md: '3rem' },
                        color: '#5CA632',
                        textShadow: '0 2px 8px rgba(92, 166, 50, 0.3)',
                        mb: { xs: 0.5, sm: 1 },
                        lineHeight: 1.2,
                    }}
                >
                    어떤 테스트를 해볼까?
                </Typography>
                <Typography variant="body2" sx={{ color: '#888', fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                    하고 싶은 테스트를 골라보세요!
                </Typography>
            </Box>

            {/* Test cards */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { xs: 1.5, sm: 2 },
                    width: '100%',
                    mt: { xs: 0.5, sm: 1 },
                }}
            >
                {testCards.map((card) => (
                    <Paper
                        key={card.type}
                        elevation={0}
                        onClick={() => onSelectTest(card.type)}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: { xs: 1.5, sm: 2.5 },
                            p: { xs: 2, sm: 2.5 },
                            borderRadius: { xs: '16px', sm: '20px' },
                            cursor: 'pointer',
                            background: card.bgGradient,
                            border: `1.5px solid ${card.accentColorBorder}`,
                            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            overflow: 'hidden',
                            '&:hover': {
                                transform: 'translateY(-3px)',
                                boxShadow: `0 12px 32px ${card.accentColorBorder}`,
                                borderColor: card.accentColor,
                            },
                            '&:active': {
                                transform: 'translateY(0) scale(0.99)',
                            },
                        }}
                    >
                        {/* Left: illustration area */}
                        <Box
                            sx={{
                                flexShrink: 0,
                                width: { xs: 72, sm: 90 },
                                height: { xs: 72, sm: 90 },
                                borderRadius: { xs: '14px', sm: '16px' },
                                backgroundColor: card.accentColorLight,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <LovebirdIllustration
                                variant={card.birdVariant}
                                color={card.birdColor}
                                size={{ xs: 48, sm: 60 }}
                                animated
                            />
                        </Box>

                        {/* Right: text content */}
                        <Box sx={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
                            <Chip
                                icon={card.categoryIcon}
                                label={card.category}
                                size="small"
                                sx={{
                                    height: 22,
                                    fontSize: '0.65rem',
                                    fontWeight: 700,
                                    backgroundColor: card.accentColorLight,
                                    color: card.accentColor,
                                    border: `1px solid ${card.accentColorBorder}`,
                                    borderRadius: '6px',
                                    mb: 0.8,
                                    '& .MuiChip-icon': {
                                        color: card.accentColor,
                                        ml: '4px',
                                    },
                                }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    color: '#2C2C2C',
                                    fontSize: { xs: '0.95rem', sm: '1.15rem' },
                                    mb: 0.3,
                                    lineHeight: 1.3,
                                }}
                            >
                                {card.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#888',
                                    fontSize: { xs: '0.72rem', sm: '0.82rem' },
                                    mb: 0.5,
                                    lineHeight: 1.4,
                                }}
                            >
                                {card.subtitle}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: card.accentColor,
                                    fontSize: { xs: '0.65rem', sm: '0.72rem' },
                                    fontWeight: 600,
                                    opacity: 0.8,
                                }}
                            >
                                {card.meta}
                            </Typography>
                        </Box>

                        {/* Arrow indicator */}
                        <Box
                            sx={{
                                flexShrink: 0,
                                color: card.accentColor,
                                opacity: 0.4,
                                fontSize: { xs: '1.2rem', sm: '1.4rem' },
                                fontWeight: 300,
                            }}
                        >
                            ›
                        </Box>
                    </Paper>
                ))}
            </Box>

            {/* Mini games section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { xs: 1.5, sm: 2 },
                    width: '100%',
                    mt: { xs: 0.5, sm: 1 },
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        color: '#FF8C00',
                        fontWeight: 700,
                        fontSize: { xs: '0.8rem', sm: '0.9rem' },
                        textAlign: 'left',
                        pl: 0.5,
                    }}
                >
                    🎮 미니게임
                </Typography>
                {gameCards.map((card) => (
                    <Paper
                        key={card.type}
                        elevation={0}
                        onClick={() => onSelectTest(card.type)}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: { xs: 1.5, sm: 2.5 },
                            p: { xs: 2, sm: 2.5 },
                            borderRadius: { xs: '16px', sm: '20px' },
                            cursor: 'pointer',
                            background: card.bgGradient,
                            border: `1.5px solid ${card.accentColorBorder}`,
                            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            overflow: 'hidden',
                            '&:hover': {
                                transform: 'translateY(-3px)',
                                boxShadow: `0 12px 32px ${card.accentColorBorder}`,
                                borderColor: card.accentColor,
                            },
                            '&:active': {
                                transform: 'translateY(0) scale(0.99)',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                flexShrink: 0,
                                width: { xs: 72, sm: 90 },
                                height: { xs: 72, sm: 90 },
                                borderRadius: { xs: '14px', sm: '16px' },
                                backgroundColor: card.accentColorLight,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <LovebirdIllustration
                                variant={card.birdVariant}
                                color={card.birdColor}
                                size={{ xs: 48, sm: 60 }}
                                animated
                            />
                        </Box>
                        <Box sx={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
                            <Chip
                                icon={card.categoryIcon}
                                label={card.category}
                                size="small"
                                sx={{
                                    height: 22,
                                    fontSize: '0.65rem',
                                    fontWeight: 700,
                                    backgroundColor: card.accentColorLight,
                                    color: card.accentColor,
                                    border: `1px solid ${card.accentColorBorder}`,
                                    borderRadius: '6px',
                                    mb: 0.8,
                                    '& .MuiChip-icon': {
                                        color: card.accentColor,
                                        ml: '4px',
                                    },
                                }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    color: '#2C2C2C',
                                    fontSize: { xs: '0.95rem', sm: '1.15rem' },
                                    mb: 0.3,
                                    lineHeight: 1.3,
                                }}
                            >
                                {card.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#888',
                                    fontSize: { xs: '0.72rem', sm: '0.82rem' },
                                    mb: 0.5,
                                    lineHeight: 1.4,
                                }}
                            >
                                {card.subtitle}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: card.accentColor,
                                    fontSize: { xs: '0.65rem', sm: '0.72rem' },
                                    fontWeight: 600,
                                    opacity: 0.8,
                                }}
                            >
                                {card.meta}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                flexShrink: 0,
                                color: card.accentColor,
                                opacity: 0.4,
                                fontSize: { xs: '1.2rem', sm: '1.4rem' },
                                fontWeight: 300,
                            }}
                        >
                            ›
                        </Box>
                    </Paper>
                ))}
            </Box>

            {/* Social links */}
            <Box
                sx={{
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
                variant="body2"
                sx={{
                    opacity: 0.6,
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
