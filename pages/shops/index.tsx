import { Container, Stack } from '@mui/material';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { dehydrate, QueryClient } from 'react-query';
import { getCategorySlides, getPromoSlides } from '../../lib/queries/queries';
import Navbar from '../../src/components/Navbar';
import ShopsFeed from '../../src/components/ShopsFeed';
import ShopsFeedFilters from '../../src/components/ShopsFeedFilters';
import { XL_MAX_WIDTH } from '../../src/constants';

const Shops = () => {
  return (
    <>
      <Navbar
        variant="contained"
        logoVariant="colored"
        withMenu
        withBorderBottom
        withSearch
      />

      <Container
        sx={{
          maxWidth: {
            xl: XL_MAX_WIDTH,
            lg: 'lg',
          },
          py: { md: 4, xs: 0 },
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 0, md: 4 }}
        >
          <ShopsFeedFilters />
          <ShopsFeed />
        </Stack>
      </Container>
    </>
  );
};

export default Shops;
export const getServerSideProps: GetServerSideProps = async ctx => {
  const queryClient = new QueryClient();
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
