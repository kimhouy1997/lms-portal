import type { ThemeOptions } from '@mui/material/styles';

export const typography: ThemeOptions['typography'] = {
  fontFamily: "'Outfit', 'Kantumruy Pro', system-ui, -apple-system, sans-serif",
  h1: {
    fontWeight: 700,
    fontSize: '3.5rem',
    lineHeight: 1.1,
  },
  h2: {
    fontWeight: 700,
    fontSize: '2.5rem',
    lineHeight: 1.2,
  },
  h3: {
    fontWeight: 600,
    fontSize: '2rem',
  },
  button: {
    textTransform: 'none',
    fontWeight: 600,
  },
};
