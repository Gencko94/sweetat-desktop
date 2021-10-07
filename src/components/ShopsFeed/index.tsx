import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import FeaturedShopsSlider from '../FeaturedShopsSlider';
import HomeCategoriesSlider from '../HomeCategoriesSlider';
import PromoSlider from '../PromoSlider';

const ShopsFeed = () => {
  return (
    <Box sx={{ flex: 1, width: '0' }}>
      <HomeCategoriesSlider />
      <PromoSlider />
      <FeaturedShopsSlider />
    </Box>
  );
};

export default ShopsFeed;
