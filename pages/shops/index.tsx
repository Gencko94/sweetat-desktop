import { Container, Hidden, Stack } from '@mui/material';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { dehydrate, QueryClient } from 'react-query';
import { getCategorySlides, getPromoSlides } from '../../lib/queries/queries';
import Navbar from '../../src/components/Navbar';
import ShopsFeed from '../../src/components/ShopsFeed';
import ShopsFeedFilters from '../../src/components/ShopsFeedFilters';
import { DEFAULT_LAT, DEFAULT_LNG } from '../../src/constants';

const Shops = () => {
  return (
    <>
      <Navbar
        variant="contained"
        logoVariant="colored"
        withMenu
        withBorderBottom
      />

      <Container
        sx={{
          maxWidth: { xl: 'xl', lg: 'lg', md: 'md' },
          py: { md: 4, xs: 2 },
        }}
      >
        <Stack direction="row" spacing={4}>
          <Hidden mdDown>
            <ShopsFeedFilters />
          </Hidden>
          <ShopsFeed />
        </Stack>
      </Container>
    </>
  );
};

export default Shops;
export const getServerSideProps: GetServerSideProps = async ctx => {
  const { slug } = ctx.query;
  const queryClient = new QueryClient();
  const latitude = DEFAULT_LAT;
  const longitude = DEFAULT_LNG;
  const { locale } = ctx;

  await queryClient.prefetchQuery('categories-slides', getCategorySlides);
  await queryClient.prefetchQuery('promo-slides', getPromoSlides);
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
      dehydratedState: dehydrate(queryClient),
    },
  };
};
