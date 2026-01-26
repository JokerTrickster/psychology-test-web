import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7EC850', // Lovebird vibrant green
      light: '#B8E986',
      dark: '#5CA632',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FFE84D', // Lovebird yellow
      light: '#FFF9B0',
      dark: '#FFD700',
      contrastText: '#2C2C2C',
    },
    background: {
      default: 'transparent',
      paper: 'rgba(255, 255, 255, 0.9)',
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#5C5C5C',
    },
    error: {
      main: '#FF6B6B',
    },
    success: {
      main: '#7EC850',
    },
  },
  typography: {
    fontFamily: '"Jua", "Gamja Flower", "Gaegu", -apple-system, sans-serif',
    h1: {
      fontFamily: '"Gamja Flower", "Jua", cursive',
      fontWeight: 700,
      fontSize: '3.5rem',
      color: '#5CA632',
      letterSpacing: '0.02em',
    },
    h2: {
      fontFamily: '"Gamja Flower", "Jua", cursive',
      fontWeight: 700,
      fontSize: '2.8rem',
      color: '#7EC850',
    },
    h3: {
      fontFamily: '"Gamja Flower", "Jua", cursive',
      fontWeight: 700,
      fontSize: '2.2rem',
      color: '#7EC850',
    },
    h4: {
      fontFamily: '"Jua", sans-serif',
      fontWeight: 700,
      fontSize: '1.8rem',
      color: '#5CA632',
    },
    h5: {
      fontFamily: '"Jua", sans-serif',
      fontWeight: 600,
      fontSize: '1.4rem',
      color: '#5C5C5C',
    },
    body1: {
      fontFamily: '"Jua", sans-serif',
      fontSize: '1.1rem',
      lineHeight: 1.8,
      color: '#2C2C2C',
    },
    body2: {
      fontFamily: '"Jua", sans-serif',
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#5C5C5C',
    },
    button: {
      fontFamily: '"Jua", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
      fontSize: '1.15rem',
      letterSpacing: '0.03em',
    },
  },
  shape: {
    borderRadius: 28,
  },
  shadows: [
    'none',
    '0 2px 8px rgba(126, 200, 80, 0.15)',
    '0 4px 12px rgba(126, 200, 80, 0.2)',
    '0 6px 16px rgba(126, 200, 80, 0.25)',
    '0 8px 24px rgba(126, 200, 80, 0.3)',
    '0 10px 32px rgba(126, 200, 80, 0.35)',
    '0 12px 40px rgba(126, 200, 80, 0.4)',
    '0 14px 48px rgba(126, 200, 80, 0.45)',
    '0 16px 56px rgba(126, 200, 80, 0.5)',
    '0 18px 64px rgba(126, 200, 80, 0.55)',
    '0 20px 72px rgba(126, 200, 80, 0.6)',
    '0 20px 72px rgba(126, 200, 80, 0.6)',
    '0 20px 72px rgba(126, 200, 80, 0.6)',
    '0 20px 72px rgba(126, 200, 80, 0.6)',
    '0 20px 72px rgba(126, 200, 80, 0.6)',
    '0 20px 72px rgba(126, 200, 80, 0.6)',
    '0 20px 72px rgba(126, 200, 80, 0.6)',
    '0 20px 72px rgba(126, 200, 80, 0.6)',
    '0 20px 72px rgba(126, 200, 80, 0.6)',
    '0 20px 72px rgba(126, 200, 80, 0.6)',
    '0 20px 72px rgba(126, 200, 80, 0.6)',
    '0 20px 72px rgba(126, 200, 80, 0.6)',
    '0 20px 72px rgba(126, 200, 80, 0.6)',
    '0 20px 72px rgba(126, 200, 80, 0.6)',
    '0 20px 72px rgba(126, 200, 80, 0.6)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          padding: '14px 32px',
          fontSize: '1.2rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0 6px 20px rgba(126, 200, 80, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 28px rgba(126, 200, 80, 0.45)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #7EC850 0%, #5CA632 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5CA632 0%, #7EC850 100%)',
          },
        },
        outlined: {
          borderWidth: '2.5px',
          borderColor: '#7EC850',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            borderWidth: '2.5px',
            borderColor: '#5CA632',
            backgroundColor: 'rgba(126, 200, 80, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '28px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.6)',
        },
        elevation1: {
          boxShadow: '0 4px 16px rgba(126, 200, 80, 0.15)',
        },
        elevation2: {
          boxShadow: '0 6px 20px rgba(126, 200, 80, 0.2)',
        },
        elevation3: {
          boxShadow: '0 8px 24px rgba(126, 200, 80, 0.25)',
        },
        elevation4: {
          boxShadow: '0 10px 32px rgba(126, 200, 80, 0.3)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});

export default theme;
