import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets'; // Cute icon example

interface StartPageProps {
    onStart: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                gap: 4,
            }}
        >
            <Box sx={{ animation: 'bounce 2s infinite' }}>
                <PetsIcon sx={{ fontSize: 80, color: 'primary.main' }} />
            </Box>

            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
                재미있는<br />심리 테스트
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                간단한 선택으로 알아보는<br />
                나의 숨겨진 성격 유형은?
            </Typography>

            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={onStart}
                sx={{
                    minWidth: '200px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                }}
            >
                시작하기
            </Button>

            <style>
                {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
            40% {transform: translateY(-20px);}
            60% {transform: translateY(-10px);}
          }
        `}
            </style>
        </Box>
    );
};

export default StartPage;
