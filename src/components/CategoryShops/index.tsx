import { DEFAULT_AREA_COVERAGE_ID } from '../../constants';
import { useApplicationState } from '../../contexts/ApplicationContext';
import { useGetRestaurants } from '../../hooks/queryHooks/useGetRestaurants';
import { Grid, Box, Button, Typography, Stack, Chip } from '@mui/material';
import ShopCardWide from '../ShopCardWide';
import LoadingShopCardWide from '../ShopCardWide/Loading';
import { ArrowBack } from '@mui/icons-material';
import { ICategory } from '../../../lib/interfaces/ICategory';
import { useRouter } from 'next/router';
const CategoryShops = () => {
  const [state, setState] = useApplicationState();
  const { locale } = useRouter();
  const { data, status } = useGetRestaurants({
    coverage_area_id: DEFAULT_AREA_COVERAGE_ID,
    filters: state.restaurantsQuery,
    results_per_page: 25,
  });
  const handleClickBack = () => {
    setState(prev => ({
      ...prev,
      restaurantsQuery: { category_ids: [] },
      shownCategories: [],
    }));
  };
  const handleRemoveCategory = (category: {
    id: number;
    name: string;
    ar_name: string;
  }) => {
    setState(prev => ({
      ...prev,
      shownCategories: prev.shownCategories.filter(
        cat => cat.id !== category.id
      ),
      restaurantsQuery: {
        ...prev.restaurantsQuery,
        category_ids: prev.restaurantsQuery.category_ids.filter(
          id => id !== category.id
        ),
      },
    }));
  };
  return (
    <Box>
      <Box mb={2}>
        <Button
          size="large"
          onClick={handleClickBack}
          startIcon={<ArrowBack fontSize="small" />}
        >
          Back
        </Button>
        <Stack p={1} direction="row" spacing={1}>
          {state.shownCategories.map(cat => (
            <Chip
              onClick={() => handleRemoveCategory(cat)}
              clickable
              key={cat.id}
              color="secondary"
              sx={{ color: '#fff' }}
              label={
                <Typography fontWeight="bold" variant="h6">
                  {locale === 'ar' ? cat.ar_name : cat.name}
                </Typography>
              }
            />
          ))}
        </Stack>
      </Box>
      <Grid container spacing={2}>
        {status === 'loading' &&
          [...Array.from(new Array(25))].map(i => (
            <Grid key={i} item xs={12} sm={6} lg={4}>
              <LoadingShopCardWide />
            </Grid>
          ))}
        {data?.pages.map(page => {
          return page.data.map(restaurant => (
            <Grid key={restaurant.id} item xs={12} sm={6} lg={4}>
              <ShopCardWide shop={restaurant} />
            </Grid>
          ));
        })}
      </Grid>
    </Box>
  );
};

export default CategoryShops;
