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
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          // padding: theme => theme.spacing(0, 1.5),
          // backgroundColor: theme.palette.background.paper,
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
