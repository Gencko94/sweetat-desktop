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
import { DEFAULT_LAT, DEFAULT_LNG } from '../../src/constants';
import Navbar from '../../src/components/Navbar';

const Category: NextPage<{ isMobileDevice: boolean }> = ({
  isMobileDevice,
}) => {
  const { query } = useRouter();
  const { id } = query;

  const { data: restaurants } = useGetRestaurants({
    page: 0,
    sort_by: 'delivery_time',
    filters: { category_ids: [id as string], is_featured: true },
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
          {restaurants?.map(shop => (
            <Grid key={shop.id} item xs={12} sm={6} lg={4}>
              <ShopCardWide shop={shop} />
            </Grid>
          ))}
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

  const latitude = DEFAULT_LAT;
  const longitude = DEFAULT_LNG;
  const page = 0;
  const sort_by = 'delivery_time' as const;

  const filters = { category_ids: [id as string], is_featured: true };
  await queryClient.prefetchQuery(
    [filters, latitude, longitude, page, sort_by, 'restaurants'],
    () =>
      getRestaurants({
        filters,
        latitude,
        page,
        sort_by,
        longitude,
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
