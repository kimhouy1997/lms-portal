import { createTheme, responsiveFontSizes, type ThemeOptions } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';

const themeOptions: ThemeOptions = {
  palette,
  typography,
  shape: {
    borderRadius: 3,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '8px 24px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        containedPrimary: {
          boxShadow: '0 4px 15px rgba(100, 108, 255, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(100, 108, 255, 0.4)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#111111',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
        },
      },
    },
  },
};

let theme = createTheme(themeOptions);
theme = responsiveFontSizes(theme);

export default theme;
