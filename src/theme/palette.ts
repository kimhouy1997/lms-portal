import type { PaletteOptions } from '@mui/material/styles';

export const palette: PaletteOptions = {
  mode: 'dark',
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
};
