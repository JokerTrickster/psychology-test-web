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
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                gap: { xs: 0.8, sm: 3 },
                position: 'relative',
                overflow: 'hidden',
                py: { xs: 1, sm: 0 },
                px: { xs: 2, sm: 0 },
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
                            xs: '1.5rem',    // 320px - bigger for modern phones
                            sm: '2.8rem',    // 600px+
                            md: '3.5rem'     // 900px+
                        },
                        color: '#5CA632',
                        textShadow: '0 2px 8px rgba(92, 166, 50, 0.3), 0 0 40px rgba(255, 255, 255, 0.8)',
                        mb: { xs: 0.3, sm: 1 },
                        lineHeight: 1.1,
                        WebkitTextStroke: '0.5px rgba(92, 166, 50, 0.3)',
                    }}
                >
                    모란앵무
                </Typography>
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 800,
                        fontSize: {
                            xs: '1.25rem',    // 320px - bigger
                            sm: '2.2rem',    // 600px+
                            md: '2.8rem'     // 900px+
                        },
                        color: '#5CA632',
                        mb: { xs: 0.4, sm: 3 },
                        lineHeight: 1.1,
                    }}
                >
                    심리 테스트 🦜
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
                        xs: '10px 14px',   // 320px - bigger
                        sm: '24px 36px'    // 600px+ - spacious
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
                    variant="h5"
                    sx={{
                        mb: { xs: 0.3, sm: 1.5 },
                        color: '#5CA632',
                        fontWeight: 600,
                        fontSize: {
                            xs: '0.9rem',   // 320px - bigger
                            sm: '1.4rem'     // 600px+
                        },
                    }}
                >
                    귀여운 모란앵무와 함께하는
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: '#4A4A4A',
                        lineHeight: 1.45,
                        fontSize: {
                            xs: '0.8rem',   // 320px - bigger
                            sm: '1.1rem'     // 600px+
                        },
                    }}
                >
                    간단한 선택으로 알아보는<br />
                    나의 숨겨진 성격은? ✨
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

            {/* Start button */}
            <Box
                className={showContent ? 'fade-in' : ''}
                sx={{
                    opacity: showContent ? 1 : 0,
                    animationDelay: '0.9s',
                    mt: { xs: 0.5, sm: 2 },
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button
                    variant="contained"
                    size="large"
                    onClick={onStart}
                    endIcon={<FavoriteIcon />}
                    sx={{
                        minWidth: { xs: '200px', sm: '240px' },
                        width: { xs: '90%', sm: 'auto' },
                        maxWidth: '300px',
                        fontSize: {
                            xs: '0.95rem',      // 320px - bigger
                            sm: '1.35rem'    // 600px+
                        },
                        fontWeight: 700,
                        padding: {
                            xs: '11px 24px',   // 320px - bigger
                            sm: '16px 40px'    // 600px+
                        },
                        background: 'linear-gradient(135deg, #7EC850 0%, #5CA632 100%)',
                        boxShadow: '0 8px 24px rgba(126, 200, 80, 0.4)',
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
                🌿 다양한 컬러의 모란앵무가 기다리고 있어요!
            </Typography>
        </Box>
    );
};

export default StartPage;
