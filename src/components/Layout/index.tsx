import { CssBaseline } from '@mui/material';
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@mui/material/styles';

import { useMemo } from 'react';
import { getDesignTokens } from '../../../styles/globalTheme';
import { DURATIONS } from '../../constants';
import { useApplicationState } from '../../contexts/ApplicationContext';
import { useSession } from '../../hooks/useSession';
import CartAlertDialog from '../CartAlertDialog';
import FiltersDrawer from '../FiltersDrawer';
import SearchDrawer from '../SearchDrawer';
import SingleItemDialog from '../SingleItemDialog';
import UserDrawer from '../UserDrawer';

const Layout: React.FC = ({ children }) => {
  const [state] = useApplicationState();

  useSession({
    required: false,
    queryConfig: { staleTime: DURATIONS.twoMins },
  });
  const theme = useMemo(() => createTheme(getDesignTokens(state.colorMode)), [
    state.colorMode,
  ]);
  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <FiltersDrawer />
      <SearchDrawer />
      <UserDrawer />
      <SingleItemDialog />
      <CartAlertDialog />
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
