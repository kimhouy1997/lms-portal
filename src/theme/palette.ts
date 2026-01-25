import type { PaletteOptions, PaletteMode } from '@mui/material/styles';

export const getPalette = (mode: PaletteMode): PaletteOptions => ({
  mode,
  ...(mode === 'dark' ? {
    primary: {
      main: '#646cff',
      light: '#747bff',
      dark: '#535bf2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00f2fe',
      light: '#48f7ff',
      dark: '#00a8b1',
      contrastText: '#ffffff',
    },
    background: {
      default: '#050505',
      paper: '#111111',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a1a1a1',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
  } : {
    // Light mode colors
    primary: {
      main: '#646cff',
      light: '#747bff',
      dark: '#535bf2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00f2fe',
      light: '#48f7ff',
      dark: '#00a8b1',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2b2b2b',
      secondary: '#666666',
    },
    divider: 'rgba(0, 0, 0, 0.1)',
  }),
});
