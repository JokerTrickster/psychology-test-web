import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import LovebirdIllustration from '../components/LovebirdIllustration';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface StartPageProps {
    onStart: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
    // Animation handled by App.tsx AnimatePresence
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
                gap: { xs: 0.8, sm: 3 },
                position: 'relative',
                overflow: 'hidden',
                py: { xs: 2, sm: 3 },
                px: { xs: 2, sm: 0 },
                pb: { xs: 'calc(100px + env(safe-area-inset-bottom))', sm: 3 }, // Space for fixed button on mobile
            }}
        >
            {/* Decorative floating hearts - Green and White theme */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '5%',
                    left: '10%',
                    opacity: 0.4,
                    animation: 'float 4s ease-in-out infinite',
                    animationDelay: '0s',
                }}
            >
                <FavoriteIcon sx={{ fontSize: 40, color: '#7EC850' }} />
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: '15%',
                    right: '15%',
                    opacity: 0.5,
                    animation: 'float 5s ease-in-out infinite',
                    animationDelay: '1s',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                }}
            >
                <FavoriteIcon sx={{ fontSize: 30, color: '#FFFFFF' }} />
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '5%',
                    opacity: 0.35,
                    animation: 'float 4.5s ease-in-out infinite',
                    animationDelay: '2s',
                }}
            >
                <FavoriteIcon sx={{ fontSize: 35, color: '#5CA632' }} />
            </Box>

            {/* Main lovebird couple illustration */}
            <Box
                className={showContent ? 'fade-in' : ''}
                sx={{
                    opacity: showContent ? 1 : 0,
                    mb: { xs: 0, sm: 2 },
                }}
            >
                <LovebirdIllustration
                    variant="couple"
                    size={{ xs: 60, sm: 110, md: 120 }}
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
                            xs: '1.6rem',    // 320px - bigger for modern phones
                            sm: '3rem',      // 600px+
                            md: '3.8rem'     // 900px+
                        },
                        color: '#5CA632',
                        textShadow: '0 2px 8px rgba(92, 166, 50, 0.3), 0 0 40px rgba(255, 255, 255, 0.8)',
                        mb: { xs: 0.5, sm: 1.5 },
                        lineHeight: 1.2,
                        WebkitTextStroke: '0.5px rgba(92, 166, 50, 0.3)',
                    }}
                >
                    나는 어떤 앵무새일까? 🦜
                </Typography>
            </Box>

            {/* Decorative subtitle box - Green and White theme */}
            <Box
                className={showContent ? 'fade-in' : ''}
                sx={{
                    opacity: showContent ? 1 : 0,
                    animationDelay: '0.3s',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: { xs: '14px', sm: '30px' },
                    padding: {
                        xs: '14px 18px',   // 320px - bigger
                        sm: '28px 40px'    // 600px+ - spacious
                    },
                    border: {
                        xs: '2px solid rgba(126, 200, 80, 0.4)',
                        sm: '3px solid rgba(126, 200, 80, 0.5)'
                    },
                    boxShadow: '0 8px 32px rgba(126, 200, 80, 0.3)',
                    maxWidth: '90%',
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        color: '#4A4A4A',
                        lineHeight: 1.6,
                        fontSize: {
                            xs: '0.9rem',   // 320px - bigger
                            sm: '1.2rem'     // 600px+
                        },
                        fontWeight: 500,
                    }}
                >
                    간단한 질문으로 알아보는<br />
                    나에게 어울리는 앵무새는? ✨
                </Typography>
            </Box>

            {/* Five flying birds - Green, Lime, Green, White, Yellow */}
            <Box
                sx={{
                    display: 'flex',
                    gap: { xs: 0.8, sm: 3 },
                    mt: { xs: 0, sm: 2 },
                    mb: { xs: 0, sm: 1 },
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    maxWidth: '100%',
                }}
            >
                {/* 1. Green */}
                <Box
                    className={showContent ? 'fade-in' : ''}
                    sx={{
                        opacity: showContent ? 1 : 0,
                        animationDelay: '0.4s',
                    }}
                >
                    <LovebirdIllustration
                        variant="flying"
                        color="pepe-green"
                        size={{ xs: 28, sm: 55 }}
                        animated
                    />
                </Box>

                {/* 2. Lime */}
                <Box
                    className={showContent ? 'fade-in' : ''}
                    sx={{
                        opacity: showContent ? 1 : 0,
                        animationDelay: '0.5s',
                    }}
                >
                    <LovebirdIllustration
                        variant="flying"
                        color="pepe-lime"
                        size={{ xs: 28, sm: 55 }}
                        animated
                    />
                </Box>

                {/* 3. Green */}
                <Box
                    className={showContent ? 'fade-in' : ''}
                    sx={{
                        opacity: showContent ? 1 : 0,
                        animationDelay: '0.6s',
                    }}
                >
                    <LovebirdIllustration
                        variant="flying"
                        color="pepe-green"
                        size={{ xs: 28, sm: 55 }}
                        animated
                    />
                </Box>

                {/* 4. White */}
                <Box
                    className={showContent ? 'fade-in' : ''}
                    sx={{
                        opacity: showContent ? 1 : 0,
                        animationDelay: '0.7s',
                        filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.15))',
                    }}
                >
                    <LovebirdIllustration
                        variant="flying"
                        color="white"
                        size={{ xs: 28, sm: 55 }}
                        animated
                    />
                </Box>

                {/* 5. Yellow */}
                <Box
                    className={showContent ? 'fade-in' : ''}
                    sx={{
                        opacity: showContent ? 1 : 0,
                        animationDelay: '0.8s',
                    }}
                >
                    <LovebirdIllustration
                        variant="flying"
                        color="pepe-yellow"
                        size={{ xs: 28, sm: 55 }}
                        animated
                    />
                </Box>
            </Box>

            {/* Spacer to push button to bottom */}
            <Box sx={{ flex: 1 }} />

            {/* Start button - Fixed at bottom on mobile */}
            <Box
                className={showContent ? 'fade-in' : ''}
                sx={{
                    opacity: showContent ? 1 : 0,
                    animationDelay: '0.9s',
                    position: { xs: 'fixed', sm: 'relative' },
                    bottom: { xs: 0, sm: 'auto' },
                    left: { xs: 0, sm: 'auto' },
                    right: { xs: 0, sm: 'auto' },
                    width: { xs: '100%', sm: 'auto' },
                    p: { xs: '16px', sm: 0 },
                    pb: { xs: 'max(16px, env(safe-area-inset-bottom))', sm: 0 },
                    mb: { xs: 0, sm: 4 },
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: { xs: 'rgba(255, 255, 255, 0.95)', sm: 'transparent' },
                    backdropFilter: { xs: 'blur(10px)', sm: 'none' },
                    borderTop: { xs: '1px solid rgba(126, 200, 80, 0.2)', sm: 'none' },
                    boxShadow: { xs: '0 -4px 12px rgba(0, 0, 0, 0.08)', sm: 'none' },
                    zIndex: 10,
                }}
            >
                <Button
                    variant="contained"
                    size="large"
                    onClick={onStart}
                    endIcon={<FavoriteIcon />}
                    sx={{
                        minWidth: { xs: 'calc(100% - 32px)', sm: '240px' },
                        width: { xs: '100%', sm: 'auto' },
                        maxWidth: { xs: 'none', sm: '300px' },
                        fontSize: {
                            xs: '1.1rem',
                            sm: '1.35rem'
                        },
                        fontWeight: 700,
                        padding: {
                            xs: '16px 32px',
                            sm: '18px 44px'
                        },
                        minHeight: { xs: '56px', sm: 'auto' },
                        background: 'linear-gradient(135deg, #7EC850 0%, #5CA632 100%)',
                        boxShadow: '0 8px 24px rgba(126, 200, 80, 0.4)',
                        borderRadius: { xs: '16px', sm: '50px' },
                        '&:hover': {
                            background: 'linear-gradient(135deg, #5CA632 0%, #7EC850 100%)',
                            boxShadow: '0 12px 36px rgba(126, 200, 80, 0.6)',
                        },
                        '&:active': {
                            transform: 'scale(0.98)',
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
                    color: '#5CA632',
                    fontSize: { xs: '0.75rem', sm: '0.95rem' },
                    mt: { xs: 0.3, sm: 1 },
                    px: 2,
                }}
            >
                🌿 31가지 다양한 앵무새가 기다리고 있어요!
            </Typography>
        </Box>
    );
};

export default StartPage;
