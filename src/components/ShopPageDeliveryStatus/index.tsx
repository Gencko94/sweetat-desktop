import { Stack, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTranslation } from 'react-i18next';

interface IShopPageDeliveryStatus {
  delivery_time_label: string;
  is_active: boolean;
  accept_preorder: boolean;
}

const ShopPageDeliveryStatus = ({
  delivery_time_label,
  accept_preorder,
  is_active,
}: IShopPageDeliveryStatus) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" alignItems="center" spacing={0.5} py={1}>
      <AccessTimeIcon color="success" />

      <Typography variant="body2" fontWeight="bold">
        {!is_active && accept_preorder
          ? t`accepts-pre-order`
          : !is_active && !accept_preorder
          ? t`closed`
          : `${t`delivery-within`} ${delivery_time_label} ${t`minutes`}`}
      </Typography>
    </Stack>
  );
};

export default ShopPageDeliveryStatus;
