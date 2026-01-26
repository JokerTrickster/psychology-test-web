import React from 'react';
import { Container, Box } from '@mui/material';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box
            sx={{
                backgroundColor: '#f0f2f5',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100vh',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: { sm: '0 0 20px rgba(0,0,0,0.1)' },
                    padding: '24px !important',
                    // On mobile (default and up to sm), full width/height.
                    // On desktop, it looks like a mobile screen.
                }}
            >
                {children}
            </Container>
        </Box>
    );
};

export default Layout;
