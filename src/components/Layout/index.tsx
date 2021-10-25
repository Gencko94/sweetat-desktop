import { CssBaseline } from '@mui/material';
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@mui/material/styles';

import { useEffect, useMemo } from 'react';
import { getDesignTokens } from '../../../styles/globalTheme';
import { getLocalCart } from '../../../utils/getLocalCart';
import { useApplicationState } from '../../contexts/ApplicationContext';
import CartAlertDialog from '../CartAlertDialog';
import FiltersDrawer from '../FiltersDrawer';
import SearchDrawer from '../SearchDrawer';
import SingleItemDialog from '../SingleItemDialog';
import UserDrawer from '../UserDrawer';

const Layout: React.FC = ({ children }) => {
  const [state, setState] = useApplicationState();

  const theme = useMemo(() => createTheme(getDesignTokens(state.colorMode)), [
    state.colorMode,
  ]);
  useEffect(() => {
    // TODO : update cart restaurant info every now and then. + add timestamp for the cart
    setState(prev => ({
      ...prev,
      cart_restaurant: getLocalCart().restaurant,
    }));
  }, [setState]);
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
