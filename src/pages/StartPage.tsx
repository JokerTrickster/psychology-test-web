import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import LovebirdIllustration from '../components/LovebirdIllustration';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface StartPageProps {
    onStart: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Smooth entrance animation
        const timer = setTimeout(() => setShowContent(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                gap: 3,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Decorative floating hearts */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '5%',
                    left: '10%',
                    opacity: 0.3,
                    animation: 'float 4s ease-in-out infinite',
                    animationDelay: '0s',
                }}
            >
                <FavoriteIcon sx={{ fontSize: 40, color: '#B8E986' }} />
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: '15%',
                    right: '15%',
                    opacity: 0.25,
                    animation: 'float 5s ease-in-out infinite',
                    animationDelay: '1s',
                }}
            >
                <FavoriteIcon sx={{ fontSize: 30, color: '#D4B5E8' }} />
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '5%',
                    opacity: 0.2,
                    animation: 'float 4.5s ease-in-out infinite',
                    animationDelay: '2s',
                }}
            >
                <FavoriteIcon sx={{ fontSize: 35, color: '#FFE84D' }} />
            </Box>

            {/* Main lovebird couple illustration */}
            <Box
                className={showContent ? 'fade-in' : ''}
                sx={{
                    opacity: showContent ? 1 : 0,
                    mb: 2,
                }}
            >
                <LovebirdIllustration variant="couple" size={120} animated />
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
                        fontSize: { xs: '2.8rem', sm: '3.5rem' },
                        background: 'linear-gradient(135deg, #7EC850 0%, #C4E86B 50%, #FFE84D 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1,
                    }}
                >
                    모란앵무
                </Typography>
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 800,
                        fontSize: { xs: '2.2rem', sm: '2.8rem' },
                        color: '#5CA632',
                        mb: 3,
                    }}
                >
                    심리 테스트 🦜
                </Typography>
            </Box>

            {/* Decorative subtitle box */}
            <Box
                className={showContent ? 'fade-in' : ''}
                sx={{
                    opacity: showContent ? 1 : 0,
                    animationDelay: '0.3s',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 255, 240, 0.95) 100%)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '30px',
                    padding: '24px 36px',
                    border: '3px solid rgba(126, 200, 80, 0.3)',
                    boxShadow: '0 8px 32px rgba(126, 200, 80, 0.25)',
                    maxWidth: '90%',
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        mb: 1.5,
                        color: '#5C5C5C',
                        fontWeight: 600,
                    }}
                >
                    귀여운 모란앵무와 함께하는
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: '#6B6B6B',
                        lineHeight: 1.8,
                    }}
                >
                    간단한 선택으로 알아보는<br />
                    나의 숨겨진 성격은? ✨
                </Typography>
            </Box>

            {/* Five flying birds - All 5 color variants */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 3,
                    mt: 2,
                    mb: 1,
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                {/* Pepe Green */}
                <Box
                    className={showContent ? 'fade-in' : ''}
                    sx={{
                        opacity: showContent ? 1 : 0,
                        animationDelay: '0.4s',
                    }}
                >
                    <LovebirdIllustration variant="flying" color="pepe-green" size={55} animated />
                </Box>

                {/* Violet Butter */}
                <Box
                    className={showContent ? 'fade-in' : ''}
                    sx={{
                        opacity: showContent ? 1 : 0,
                        animationDelay: '0.5s',
                    }}
                >
                    <LovebirdIllustration variant="flying" color="violet-butter" size={55} animated />
                </Box>

                {/* Pepe Yellow */}
                <Box
                    className={showContent ? 'fade-in' : ''}
                    sx={{
                        opacity: showContent ? 1 : 0,
                        animationDelay: '0.6s',
                    }}
                >
                    <LovebirdIllustration variant="flying" color="pepe-yellow" size={55} animated />
                </Box>

                {/* Yellow Face Green */}
                <Box
                    className={showContent ? 'fade-in' : ''}
                    sx={{
                        opacity: showContent ? 1 : 0,
                        animationDelay: '0.7s',
                    }}
                >
                    <LovebirdIllustration variant="flying" color="yellowface-green" size={55} animated />
                </Box>

                {/* Pepe Lime */}
                <Box
                    className={showContent ? 'fade-in' : ''}
                    sx={{
                        opacity: showContent ? 1 : 0,
                        animationDelay: '0.8s',
                    }}
                >
                    <LovebirdIllustration variant="flying" color="pepe-lime" size={55} animated />
                </Box>
            </Box>

            {/* Start button */}
            <Box
                className={showContent ? 'fade-in' : ''}
                sx={{
                    opacity: showContent ? 1 : 0,
                    animationDelay: '0.9s',
                    mt: 2,
                }}
            >
                <Button
                    variant="contained"
                    size="large"
                    onClick={onStart}
                    endIcon={<FavoriteIcon />}
                    sx={{
                        minWidth: '240px',
                        fontSize: '1.35rem',
                        fontWeight: 700,
                        padding: '16px 40px',
                        background: 'linear-gradient(135deg, #7EC850 0%, #5CA632 100%)',
                        boxShadow: '0 8px 24px rgba(126, 200, 80, 0.4)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #5CA632 0%, #7EC850 100%)',
                            boxShadow: '0 12px 36px rgba(126, 200, 80, 0.6)',
                        },
                    }}
                >
                    테스트 시작하기
                </Button>
            </Box>

            {/* Fun subtitle */}
            <Typography
                className={showContent ? 'fade-in' : ''}
                variant="body2"
                sx={{
                    opacity: showContent ? 0.7 : 0,
                    animationDelay: '1s',
                    color: '#7C7C7C',
                    fontSize: '0.95rem',
                    mt: 1,
                }}
            >
                🌈 5가지 컬러의 모란앵무가 기다리고 있어요!
            </Typography>
        </Box>
    );
};

export default StartPage;
