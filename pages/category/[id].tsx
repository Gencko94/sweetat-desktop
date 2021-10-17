import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import isMobile from '../../utils/isMobile';
import {
  getRestaurants,
  getRestaurantsCategories,
} from '../../lib/queries/queries';
import { useGetRestaurants } from '../../src/hooks/queryHooks/useGetRestaurants';
import { Container, Grid, Typography } from '@mui/material';
import ShopCardWide from '../../src/components/ShopCardWide';
import { useGetRestaurantsCategories } from '../../src/hooks/queryHooks/useGetRestaurantsCategories';
import { DEFAULT_AREA_COVERAGE_ID } from '../../src/constants';
import Navbar from '../../src/components/Navbar';

const Category: NextPage<{ isMobileDevice: boolean }> = ({
  isMobileDevice,
}) => {
  const { query } = useRouter();
  const { id } = query;

  const { data } = useGetRestaurants({
    filters: { category_ids: [id as string], is_featured: true },
    coverage_area_id: DEFAULT_AREA_COVERAGE_ID,
    results_per_page: 15,
  });
  const { data: categories } = useGetRestaurantsCategories();

  return (
    <>
      <Navbar logoVariant="colored" variant="normal" withBorderBottom />
      <Container>
        <Typography
          my={3}
          color="primary"
          textAlign="center"
          variant="h4"
          fontWeight="bold"
        >
          {categories?.find(cat => cat.id === Number(id))?.name}
        </Typography>
        <Grid container spacing={2}>
          {data?.pages.map(page => {
            return page.data.map(restaurant => (
              <Grid key={restaurant.id} item xs={12} sm={6} lg={4}>
                <ShopCardWide shop={restaurant} />
              </Grid>
            ));
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Category;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
  locale,
}) => {
  const queryClient = new QueryClient();
  const { id } = query;

  const areaCoverageId = DEFAULT_AREA_COVERAGE_ID;
  const results_per_page = 15;
  const sort_by = 'delivery_time' as const;

  const filters = { category_ids: [id as string], is_featured: true };
  await queryClient.prefetchInfiniteQuery(
    [filters, areaCoverageId, sort_by, results_per_page, 'restaurants'],
    ({ pageParam = 1 }) =>
      getRestaurants({
        filters,
        coverage_area_id: areaCoverageId,
        page: pageParam,
        sort_by,
        results_per_page,
      })
  );
  await queryClient.prefetchQuery(
    'restaurants-categories',
    getRestaurantsCategories
  );
  const isMobileDevice = isMobile(req);
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
      isMobileDevice,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
