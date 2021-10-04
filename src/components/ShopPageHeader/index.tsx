import { Container, Paper, Grid, Divider } from '@mui/material';

import { IRestaurantInfo } from '../../../lib/interfaces/IRestaurantInfo';
import ShopPageImage from '../ShopPageImage';
import ShopPageDetails from '../ShopPageDetails';
import ShopPageDeliveryStatus from '../ShopPageDeliveryStatus';

interface IShopPageHeaderProps {
  shop: IRestaurantInfo;
}

const ShopPageHeader = ({ shop }: IShopPageHeaderProps) => {
  return (
    <Paper elevation={0}>
      <Divider />
      <Container sx={{ maxWidth: { xl: 'xl', lg: 'lg', md: 'md' }, py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <ShopPageDetails shop={shop} />
          </Grid>
          <Grid item md={4}>
            <ShopPageImage
              src={shop.image}
              placeholder={shop.placeholder_image}
              alt={`${shop.name} photo`}
              is_active={shop.is_active === 1}
              accept_preorder={shop.accept_preorder === 1}
            />
            <Divider />
            <ShopPageDeliveryStatus
              delivery_time_label={shop.delivery_time_label}
            />
          </Grid>
        </Grid>
      </Container>
      <Divider />
    </Paper>
  );
};

export default ShopPageHeader;
