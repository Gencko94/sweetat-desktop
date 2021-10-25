import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import CheckoutCart from '../../src/components/Checkout/CheckoutCart';
import CheckoutCouponSection from '../../src/components/Checkout/CheckoutCouponSection';
import CheckoutDeliverySection from '../../src/components/Checkout/CheckoutDeliverySection';
import CheckoutPaymentSection from '../../src/components/Checkout/CheckoutPaymentSection';
import Navbar from '../../src/components/Navbar';
import { useApplicationState } from '../../src/contexts/ApplicationContext';

const Checkout = () => {
  const [state] = useApplicationState();
  return (
    <>
      <Navbar
        variant="contained"
        withMenu
        withAuth
        logoVariant="colored"
        withBorderBottom
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight="bold">
          Review your order from {state?.cart_restaurant?.name}
        </Typography>
        <Stack mt={4} direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Stack spacing={3} sx={{ flexBasis: { xs: 'auto', sm: '65%' } }}>
            <CheckoutDeliverySection />
            <Divider />
            <CheckoutPaymentSection />
            <Divider />
            <CheckoutCouponSection restaurant={state.cart_restaurant} />
          </Stack>
          <Box
            sx={{
              flexBasis: {
                xs: 'auto',
                sm: '35%',
              },
              minWidth: { xs: 'unset', md: '376px' },
            }}
          >
            <CheckoutCart restaurant={state.cart_restaurant} />
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default Checkout;
