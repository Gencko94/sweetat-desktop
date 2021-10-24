import { Box, Container, Stack, Typography } from '@mui/material';
import CheckoutCart from '../../src/components/Checkout/CheckoutCart';
import CheckoutDeliverySection from '../../src/components/Checkout/CheckoutDeliverySection';
import CheckoutPaymentSection from '../../src/components/Checkout/CheckoutPaymentSection';
import DesktopCartCard from '../../src/components/DesktopCartCard';
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
        <Stack mt={4} direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <Stack spacing={3} sx={{ flexBasis: { xs: 'auto', sm: '65%' } }}>
            <CheckoutDeliverySection />
            <CheckoutPaymentSection />
          </Stack>
          <Box sx={{ flexBasis: { xs: 'auto', sm: '35%' } }}>
            <CheckoutCart />
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default Checkout;
