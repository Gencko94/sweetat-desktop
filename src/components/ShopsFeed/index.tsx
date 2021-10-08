import { Box } from '@mui/system';
import FeaturedShopsSlider from '../FeaturedShopsSlider';
import HomeCategoriesSlider from '../HomeCategoriesSlider';
import PromoSlider from '../PromoSlider';

const ShopsFeed = () => {
  return (
    <Box sx={{ flex: { md: '1', xs: 'auto' }, width: { md: '0', xs: 'auto' } }}>
      <HomeCategoriesSlider />
      <PromoSlider />
      <FeaturedShopsSlider />
    </Box>
  );
};

export default ShopsFeed;
