import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import type { Node } from '../types';

interface QuestionPageProps {
    node: Node;
    onSelectOption: (nextId: string) => void;
}

const QuestionPage: React.FC<QuestionPageProps> = ({ node, onSelectOption }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                gap: 4,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    backgroundColor: '#ffffff',
                    border: '2px solid #F0F0F0',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#444' }}>
                    {node.text}
                </Typography>
            </Paper>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {node.options?.map((option, index) => (
                    <Button
                        key={index}
                        variant="outlined"
                        onClick={() => onSelectOption(option.nextId)}
                        sx={{
                            padding: '20px',
                            borderWidth: '2px',
                            borderColor: 'secondary.main',
                            color: 'text.primary',
                            backgroundColor: '#fff',
                            fontSize: '1.1rem',
                            '&:hover': {
                                borderWidth: '2px',
                                borderColor: 'primary.main',
                                backgroundColor: 'primary.light',
                                color: '#fff',
                            },
                        }}
                    >
                        {option.text}
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default QuestionPage;
