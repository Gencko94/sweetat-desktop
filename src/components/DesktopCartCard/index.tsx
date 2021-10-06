import { Button, Divider, Paper, Stack } from '@mui/material';
import { Box, BoxProps, styled } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { product1 } from '../../../lib/fakeData/fakeProducts';
import CartItem from '../CartItem';
import CartCardOrderSummary from './CartCardOrderSummary';

const DesktopCartCard = () => {
  const { t } = useTranslation();
  return (
    <Box p={2} component={Paper} elevation={1}>
      <Button
        fullWidth
        variant="contained"
        size="large"
      >{t`go-to-checkout`}</Button>
      <Stack spacing={1} my={2}>
        <CartItem item={product1} />
      </Stack>
      <Divider />
      <CartCardOrderSummary
        delivery_fee={43.4}
        service_fee={20.1}
        subtotal={63.5}
      />
    </Box>
  );
};

export default DesktopCartCard;
