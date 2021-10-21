import { Container, Paper, Grid, Divider, Hidden } from '@mui/material';
import { IRestaurantInfo } from '../../../lib/interfaces/IRestaurantInfo';
import ShopPageImage from '../ShopPageImage';
import ShopPageDetails from '../ShopPageDetails';
import ShopPageDeliveryStatus from '../ShopPageDeliveryStatus';
import DeliverTo from '../DeliverTo';

interface IShopPageHeaderProps {
  shop: IRestaurantInfo;
}

const ShopPageHeader = ({ shop }: IShopPageHeaderProps) => {
  return (
    <Paper elevation={0}>
      <Hidden mdUp>
        <ShopPageImage
          src={shop.image}
          placeholder={shop.placeholder_image}
          alt={`${shop.name} photo`}
          is_active={shop.is_active === 1}
          accept_preorder={shop.accept_preorder === 1}
        />
      </Hidden>
      <Container
        sx={{
          maxWidth: { xl: 'xl', lg: 'lg' },
          py: { md: 4, xs: 2 },
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <ShopPageDetails shop={shop} />
          </Grid>
          <Hidden mdDown>
            <Grid item md={4}>
              <ShopPageImage
                src={shop.image}
                placeholder={shop.placeholder_image}
                alt={`${shop.name} photo`}
                is_active={shop.is_active === 1}
                accept_preorder={shop.accept_preorder === 1}
              />
              <Divider />
              <DeliverTo />
              <ShopPageDeliveryStatus
                is_active={shop.is_active === 1}
                accept_preorder={shop.accept_preorder === 1}
                delivery_time_label={shop.delivery_time_label}
              />
            </Grid>
          </Hidden>
        </Grid>
        <Hidden mdUp>
          <ShopPageDeliveryStatus
            delivery_time_label={shop.delivery_time_label}
            is_active={shop.is_active === 1}
            accept_preorder={shop.accept_preorder === 1}
          />
        </Hidden>
      </Container>
      <Divider />
    </Paper>
  );
};

export default ShopPageHeader;
