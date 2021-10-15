import { Drawer, Paper, Box } from '@mui/material';
import { useCallback, useState } from 'react';
import useGetCartItems from '../../hooks/queryHooks/useGetCartItems';
import CartMenuActions from './CartMenuActions';
import CartMenuContents from './CartMenuContents';
import CartMenuOpenButton from './CartMenuOpenButton';

const CartMenu = () => {
  const [cartMenuOpen, setCartMenuOpen] = useState(false);
  const { data: cart, isLoading } = useGetCartItems();
  const handleToggleCartMenu = useCallback(() => {
    setCartMenuOpen(!cartMenuOpen);
  }, [cartMenuOpen]);
  return (
    <>
      <Box
        component={Paper}
        p={2}
        elevation={4}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: 0,

          zIndex: theme => theme.zIndex?.drawer,
        }}
      >
        {!cartMenuOpen && (
          <CartMenuOpenButton handleToggleCartMenu={handleToggleCartMenu} />
        )}
        {cartMenuOpen && (
          <CartMenuActions handleToggleCartMenu={handleToggleCartMenu} />
        )}
      </Box>

      <Drawer
        anchor="bottom"
        open={cartMenuOpen}
        onClose={handleToggleCartMenu}
        sx={{ zIndex: theme => theme.zIndex.drawer - 1 }}
      >
        <Box
          sx={{
            height: '100vh',
          }}
        >
          <CartMenuContents handleToggleCartMenu={handleToggleCartMenu} />
        </Box>
      </Drawer>
    </>
  );
};

export default CartMenu;
