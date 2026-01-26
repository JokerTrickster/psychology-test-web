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
                gap: 2,
                pb: 4, // Add padding bottom for scrolling content
            }}
        >
            {node.imageUrl && (
                <Paper
                    elevation={4}
                    sx={{
                        width: '100%',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        mb: 2,
                        lineHeight: 0,
                    }}
                >
                    <img
                        src={node.imageUrl}
                        alt="Question"
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '300px',
                            objectFit: 'cover'
                        }}
                    />
                </Paper>
            )}

            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    backgroundColor: '#ffffff',
                    border: '2px solid #F0F0F0',
                    textAlign: 'center',
                    borderRadius: '20px',
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
