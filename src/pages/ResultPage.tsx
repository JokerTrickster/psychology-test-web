import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import type { Node } from '../types';
import ReplayIcon from '@mui/icons-material/Replay';

interface ResultPageProps {
    node: Node;
    onRestart: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ node, onRestart }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                gap: 3,
                textAlign: 'center',
            }}
        >
            <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold' }}>
                나의 성격 유형은?
            </Typography>

            <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
                {node.title}
            </Typography>

            {node.imageUrl && (
                <Box
                    sx={{
                        width: '100%',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                        mb: 2
                    }}
                >
                    <img
                        src={node.imageUrl}
                        alt="Result"
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '350px',
                            objectFit: 'cover'
                        }}
                    />
                </Box>
            )}

            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    backgroundColor: 'secondary.light',
                    borderRadius: '30px',
                    mb: 4,
                }}
            >
                <Typography variant="body1" sx={{ wordBreak: 'keep-all', color: '#444', lineHeight: 1.6 }}>
                    {node.description}
                </Typography>
            </Paper>

            <Button
                variant="contained"
                color="secondary"
                startIcon={<ReplayIcon />}
                onClick={onRestart}
                sx={{ color: '#444', fontWeight: 'bold' }}
            >
                다시 테스트하기
            </Button>
        </Box>
    );
};

export default ResultPage;
