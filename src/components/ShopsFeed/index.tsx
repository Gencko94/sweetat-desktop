import { Box } from '@mui/system';
import { useApplicationState } from '../../contexts/ApplicationContext';
import CategoryShops from '../CategoryShops';
import FeaturedShopsSlider from '../FeaturedShopsSlider';
import HomeCategoriesSlider from '../HomeCategoriesSlider';
import PromoSlider from '../PromoSlider';

const ShopsFeed = () => {
  const [state] = useApplicationState();
  return (
    <Box
      sx={{
        pt: 2,
        flex: { md: '1', xs: 'auto' },
        width: { md: '0', xs: 'auto' },
      }}
    >
      {state.restaurantsQuery.category_ids.length === 0 && (
        <>
          <HomeCategoriesSlider />
          <PromoSlider />
          <FeaturedShopsSlider />
        </>
      )}
      {state.restaurantsQuery.category_ids.length > 0 && <CategoryShops />}
    </Box>
  );
};

export default ShopsFeed;
