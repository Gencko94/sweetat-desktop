import { Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { IRestaurantInfo } from '../../../lib/interfaces/IRestaurantInfo';
import ShopStatus from '../ShopStatus';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTranslation } from 'react-i18next';
import ShopPageDescription from '../ShopPageDescription';
interface IShopPageDetails {
  shop: IRestaurantInfo;
}

const ShopPageDetails = ({ shop }: IShopPageDetails) => {
  const { locale } = useRouter();
  const { t } = useTranslation();

  return (
    <>
      <Box mb={2}>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          {locale === 'ar' ? shop.ar_name : shop.name}
        </Typography>

        <ShopStatus
          is_active={shop.is_active}
          accept_preorder={shop.accept_preorder}
        />
      </Box>

      {/* ⚡ Add Review Section */}
      {shop.is_active === 0 && shop.accept_preorder === 1 && (
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <AccessTimeIcon color="primary" />
          <Typography
            variant="body2"
            fontWeight="bold"
          >{t`accepts-pre-order`}</Typography>
          <Typography variant="body2">
            ({t`delivery-cost`} : {t`free`})
          </Typography>
        </Stack>
      )}
      <ShopPageDescription shop={shop} />
    </>
  );
};

export default ShopPageDetails;
