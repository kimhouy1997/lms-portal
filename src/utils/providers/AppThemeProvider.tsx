import { useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAppSelector } from '@/redux/hooks';
import getTheme from '@/theme';

interface AppThemeProviderProps {
  children: React.ReactNode;
}

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const themeMode = useAppSelector((state) => state.app.themeMode);

  const theme = useMemo(() => {
    return getTheme(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
