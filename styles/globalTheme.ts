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
    MuiAccordion: {
      defaultProps: {
        disableGutters: true,
        elevation: 0,
        square: true,
      },
      styleOverrides: {
        root: {
          '&:not(:last-child)': {
            borderBottom: 0,
          },
          '&:before': {
            display: 'none',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: 0,
          '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(180deg)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedInherit: {
          backgroundColor: mode === 'dark' ? '#35182B' : '#f0f0f0',
          '&:hover': {
            backgroundColor: mode === 'dark' && '#441b36',
          },
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        '*::-webkit-scrollbar-track': {
          WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
          borderRadius: '10px',
          backgroundColor: '#777',
        },
        '*::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
          backgroundColor: PRIMARY_COLOR,
        },
        '*::-webkit-scrollbar-thumb': {
          borderRadius: '10px',
          WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
          boxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
          backgroundColor: PRIMARY_COLOR,
          transition: 'background 150ms ease',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: PRIMARY_COLOR,
        },
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
    // background: { default: '#f1f1f1' },
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
// declare module '@mui/material/styles' {
// interface Theme {
//   breakpoints: {
//     keys: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
//     values: {
//       xs: 0;
//       sm: 600;
//       md: 900;
//       lg: 1200;
//       xl: 1536;
//       xxl: 1920;
//     };
//   };
// }
// // allow configuration using `createTheme`
// interface ThemeOptions {
//   breakpoints?: {
//     keys: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
//     values: {
//       xs: 0;
//       sm: 600;
//       md: 900;
//       lg: 1200;
//       xl: 1536;
//       xxl: 1920;
//     };
//   };
// }
// interface BreakpointOverrides {
//   xs: true;
//   sm: true;
//   md: true;
//   lg: true;
//   xl: true;
//   xxl: true;
// }
// }
