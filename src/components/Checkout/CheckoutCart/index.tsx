import { LoadingButton } from '@mui/lab';
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import useGetCartItems from '../../../hooks/queryHooks/useGetCartItems';
import useManipulateCart from '../../../hooks/useManipulateCart';
import CartItem from '../../CartItem';
import CartCardOrderSummary from '../../DesktopCartCard/CartCardOrderSummary';
const CheckoutCart = () => {
  const { data: cart, isFetching } = useGetCartItems();
  const {
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = useManipulateCart();
  return (
    <Box p={2} component={Paper} elevation={0} border={1} borderColor="divider">
      <LoadingButton
        fullWidth
        // onClick={handleCheckout}
        variant="contained"
        size="large"
        disableElevation
        // disabled={cart?.items.length === 0 || checkoutDisabled}
        loading={isFetching}
      >
        Complete Checkout
        {/* {checkoutDisabled
          ? `${t`min-order`} ${state.cart_restaurant?.min_order_price} KD`
          : `${t`go-to-checkout`}`} */}
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

export default CheckoutCart;
