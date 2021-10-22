import { Container, Stack } from '@mui/material';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Navbar from '../../src/components/Navbar';
import ShopsFeed from '../../src/components/ShopsFeed';
import ShopsFeedFilters from '../../src/components/ShopsFeedFilters';
import { XL_MAX_WIDTH } from '../../src/constants';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

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
          py: { md: 2, xs: 0 },
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
