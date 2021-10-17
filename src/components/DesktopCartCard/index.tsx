import { Divider, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import CartItem from '../CartItem';
import CartCardOrderSummary from './CartCardOrderSummary';
import useGetCartItems from '../../hooks/queryHooks/useGetCartItems';
import useManipulateCart from '../../hooks/useManipulateCart';
import { LoadingButton } from '@mui/lab';
const DesktopCartCard = () => {
  const { t } = useTranslation();
  const { data: cart, isFetching } = useGetCartItems();
  const { incrementQuantity, decrementQuantity } = useManipulateCart();

  return (
    <Box p={2} component={Paper} elevation={1}>
      <LoadingButton
        fullWidth
        variant="contained"
        size="large"
        disabled={cart?.items.length === 0}
        loading={isFetching}
      >{t`go-to-checkout`}</LoadingButton>
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
            {cart.items.map(cartItem => (
              <CartItem
                key={cartItem.id}
                item={cartItem}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
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
