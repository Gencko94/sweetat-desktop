import { CssBaseline } from '@mui/material';
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@mui/material/styles';

import { useMemo } from 'react';
import { getDesignTokens } from '../../../styles/globalTheme';
import { useApplicationState } from '../../contexts/ApplicationContext';
import FiltersDrawer from '../FiltersDrawer';
import SearchDrawer from '../SearchDrawer';
import SingleItemDialog from '../SingleItemDialog';
import UserDrawer from '../UserDrawer';

const Layout: React.FC = ({ children }) => {
  const [state] = useApplicationState();
  const theme = useMemo(() => createTheme(getDesignTokens(state.colorMode)), [
    state.colorMode,
  ]);
  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <FiltersDrawer />
      <SearchDrawer />
      <UserDrawer />
      <SingleItemDialog />
      <CssBaseline />
      {children}
      <style global jsx>
        {`
          html {
            scroll-behavior: smooth;
          }
        `}
      </style>
    </ThemeProvider>
  );
};

export default Layout;
