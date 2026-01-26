import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFB7B2', // Soft Pink
      contrastText: '#fff',
    },
    secondary: {
      main: '#B5EAD7', // Soft Mint
      contrastText: '#444',
    },
    background: {
      default: '#FFF9FA', // Very light pinkish white
      paper: '#ffffff',
    },
    text: {
      primary: '#4A4A4A',
      secondary: '#888888',
    },
  },
  typography: {
    fontFamily: '"Nanum Rounded", "Gamja Flower", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: '#FF9AA2',
    },
    button: {
      fontWeight: 600,
      borderRadius: '20px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          padding: '12px 24px',
          textTransform: 'none',
          fontSize: '1.2rem',
          boxShadow: '0 4px 10px rgba(255, 183, 178, 0.4)',
          '&:hover': {
            boxShadow: '0 6px 14px rgba(255, 183, 178, 0.6)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: '20px',
        },
      },
    },
  },
});

export default theme;
