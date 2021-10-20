import { Container, Stack } from '@mui/material';
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
