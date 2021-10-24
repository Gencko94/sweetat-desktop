import { Divider, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import CartItem from '../CartItem';
import CartCardOrderSummary from './CartCardOrderSummary';
import useGetCartItems from '../../hooks/queryHooks/useGetCartItems';
import useManipulateCart from '../../hooks/useManipulateCart';
import { LoadingButton } from '@mui/lab';
import { useMemo } from 'react';
import { useApplicationState } from '../../contexts/ApplicationContext';
const DesktopCartCard = () => {
  const { t } = useTranslation();
  const { data: cart, isFetching } = useGetCartItems();
  const [state] = useApplicationState();

  const {
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = useManipulateCart();
  const checkoutDisabled = useMemo(() => {
    // console.log(cart.total > +state.cart_restaurant?.min_order_price);
    if (cart && state.cart_restaurant !== null) {
      if (cart.total < +state.cart_restaurant?.min_order_price) {
        return true;
      }
    }
    return false;
  }, [cart, state.cart_restaurant]);
  const handleCheckout = () => {
    console.log('CHECKOUT');
  };
  return (
    <Box p={2} component={Paper} elevation={2}>
      <LoadingButton
        fullWidth
        onClick={handleCheckout}
        variant="contained"
        size="large"
        disableElevation
        disabled={cart?.items.length === 0 || checkoutDisabled}
        loading={isFetching}
      >
        {checkoutDisabled
          ? `${t`min-order`} ${state.cart_restaurant?.min_order_price} KD`
          : `${t`go-to-checkout`}`}
      </LoadingButton>
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
          <Stack spacing={2} my={2}>
            {cart.items.map((cartItem, i) => (
              <CartItem
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

export default DesktopCartCard;
