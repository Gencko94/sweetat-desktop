import { LoadingButton } from '@mui/lab';
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { CART_RESTAURANT } from '../../../../lib/interfaces/cart/ILocalCart';
import useGetCartItems from '../../../hooks/queryHooks/useGetCartItems';
import useManipulateCart from '../../../hooks/useManipulateCart';
import CartItem from '../../CartItem';
import CartCardOrderSummary from '../../DesktopCartCard/CartCardOrderSummary';
import { useRouter } from 'next/router';
interface CheckoutCartProps {
  restaurant: CART_RESTAURANT | null;
}

const CheckoutCart = ({ restaurant }: CheckoutCartProps) => {
  const { data: cart, isFetching } = useGetCartItems();
  const { push } = useRouter();
  const {
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = useManipulateCart();
  const checkoutDisabled = useMemo(() => {
    if (cart && restaurant !== null) {
      if (cart.total < +restaurant?.min_order_price) {
        return true;
      }
    }
    return false;
  }, [cart, restaurant]);
  return (
    <Box p={2} component={Paper} elevation={0} border={1} borderColor="divider">
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
        <LoadingButton
          fullWidth
          variant="contained"
          size="large"
          disableElevation
          loading={isFetching}
          disabled={checkoutDisabled}
        >
          Complete Checkout
        </LoadingButton>
        <Button
          onClick={() => push(`/shop/${restaurant?.slug}`)}
          variant="contained"
          color="secondary"
          disableElevation
          sx={{ color: '#fff' }}
          fullWidth
        >
          Edit Cart
        </Button>
      </Stack>
      {cart?.items.length === 0 && (
        <Box
          width="100%"
          height="100px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography>Your cart is Empty</Typography>
        </Box>
      )}
      {cart && cart.items.length > 0 && (
        <>
          <Stack
            sx={{
              'div:last-child': {
                border: 'none !important',
              },
            }}
            spacing={1}
            my={1}
          >
            {cart.items.map((cartItem, i) => (
              <CartItem
                isCheckout
                key={i}
                item={cartItem}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </Stack>
          <Divider />
          <CartCardOrderSummary
            delivery_fee={43.4}
            service_fee={20.1}
            subtotal={cart.total}
          />
        </>
      )}
    </Box>
  );
};

export default CheckoutCart;
