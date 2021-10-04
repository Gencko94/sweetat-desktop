import { Stack, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTranslation } from 'react-i18next';

interface IShopPageDeliveryStatus {
  delivery_time_label: string;
}

const ShopPageDeliveryStatus = ({
  delivery_time_label,
}: IShopPageDeliveryStatus) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" alignItems="center" spacing={0.5} py={2}>
      <AccessTimeIcon color="success" />
      <Typography variant="body2">
        {t`delivery-within`} <strong>{delivery_time_label}</strong> {t`minutes`}
      </Typography>
    </Stack>
  );
};

export default ShopPageDeliveryStatus;
