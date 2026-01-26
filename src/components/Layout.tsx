import React from 'react';
import { Container, Box } from '@mui/material';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
                position: 'relative',
            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    backgroundColor: 'transparent',
                    minHeight: '100vh',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: {
                        xs: '20px 16px !important',  // 320px - compact
                        sm: '32px 24px !important'   // 600px+ - spacious
                    },
                    position: 'relative',
                    // On desktop, add a subtle card effect
                    '@media (min-width: 600px)': {
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '40px',
                        border: '3px solid rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 20px 60px rgba(255, 183, 213, 0.25)',
                        minHeight: '95vh',
                        my: '2.5vh',
                    },
                }}
            >
                {children}
            </Container>
        </Box>
    );
};

export default Layout;
