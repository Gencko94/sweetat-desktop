import { Drawer, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useState } from 'react';
import CartMenuActions from './CartMenuActions';
import CartMenuContents from './CartMenuContents';
import CartMenuOpenButton from './CartMenuOpenButton';

const CartMenu = () => {
  const [cartMenuOpen, setCartMenuOpen] = useState(false);
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
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
