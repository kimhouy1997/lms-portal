import { createTheme, responsiveFontSizes, type ThemeOptions, type PaletteMode } from '@mui/material/styles';
import { getPalette } from './palette';
import { typography } from './typography';

const getTheme = (mode: PaletteMode) => {
  const themeOptions: ThemeOptions = {
    palette: getPalette(mode),
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
            textTransform: 'none',
            fontSize: '1rem',
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
            backgroundColor: mode === 'dark' ? '#111111' : '#ffffff',
            border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
            backdropFilter: 'blur(12px)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? 'rgba(5, 5, 5, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            color: mode === 'dark' ? '#ffffff' : '#2b2b2b',
          }
        }
      }
    },
  };

  let theme = createTheme(themeOptions);
  theme = responsiveFontSizes(theme);
  return theme;
};

export default getTheme;
