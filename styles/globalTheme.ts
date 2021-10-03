import { ThemeOptions } from '@mui/material';
import { COLOR_MODES } from '../src/contexts/ApplicationContext';
import { PRIMARY_COLOR } from '../src/constants';

export const getDesignTokens = (mode: COLOR_MODES): ThemeOptions => ({
  typography: {
    fontFamily: 'Yaldevi, sans-serif',
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: false,
      },
    },
  },
  shape: { borderRadius: 6 },
  ...(mode === 'light' ? getLightTheme() : getDarkTheme()),
});
export const getLightTheme = (): ThemeOptions => ({
  palette: {
    primary: { main: PRIMARY_COLOR, light: '#fb81d0', dark: '#ff008c' },
    secondary: { main: '#ffbb0e' },
    mode: 'light',
    background: { default: '#f1f1f1' },
  },
});
export const getDarkTheme = (): ThemeOptions => ({
  palette: {
    primary: { main: '#fb81d0', light: '#fb81d0', dark: '#ff008c' },
    secondary: { main: '#ffdc81' },
    mode: 'dark',
    background: { paper: '#35182B', default: '#251520' },
  },
});
