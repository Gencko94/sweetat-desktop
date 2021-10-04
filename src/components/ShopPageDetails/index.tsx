import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/dist/client/router';
import { IRestaurantInfo } from '../../../lib/interfaces/IRestaurantInfo';
import ShopStatus from '../ShopStatus';
import ShopPageDescription from '../ShopPageDescription';
interface IShopPageDetails {
  shop: IRestaurantInfo;
}

const ShopPageDetails = ({ shop }: IShopPageDetails) => {
  const { locale } = useRouter();

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
      <ShopPageDescription shop={shop} />
    </>
  );
};

export default ShopPageDetails;
