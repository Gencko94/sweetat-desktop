import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ICartCardOrderSummaryProps {
  subtotal: number;
  delivery_fee: number;
  service_fee: number;
}

const CartCardOrderSummary = ({
  delivery_fee,
  service_fee,
  subtotal,
}: ICartCardOrderSummaryProps) => {
  const { t } = useTranslation();
  return (
    <Stack spacing={1} my={2}>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Typography>{t`delivery-fee`}</Typography>
        <Typography>{delivery_fee} KD</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Typography>{t`service-fee`}</Typography>
        <Typography>{service_fee} KD</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Typography>{t`subtotal`}</Typography>
        <Typography>{subtotal} KD</Typography>
      </Stack>
    </Stack>
  );
};

export default CartCardOrderSummary;
