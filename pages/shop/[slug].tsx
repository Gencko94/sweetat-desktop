import { Hidden } from '@mui/material';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/dist/client/router';
import { dehydrate, QueryClient } from 'react-query';
import {
  getRestaurantInfo,
  getRestaurantItems,
} from '../../lib/queries/queries';
import { DEFAULT_LAT, DEFAULT_LNG } from '../../src/constants';
import { useGetRestaurantInfo } from '../../src/hooks/queryHooks/useGetRestaurantInfo';
import isMobile from '../../utils/isMobile';

import ShopItems from '../../src/components/ShopItems';
import { memo } from 'react';
import ShopPageHeader from '../../src/components/ShopPageHeader';
import CartMenu from '../../src/components/CartMenu';
import Navbar from '../../src/components/Navbar';
const Shop: NextPage<{ isMobileDevice: boolean }> = memo(
  ({ isMobileDevice }) => {
    const {
      query: { slug },
    } = useRouter();

    const { data: shop } = useGetRestaurantInfo({ slug: slug as string });
    return (
      <>
        <Navbar
          logoVariant="colored"
          variant="contained"
          withBorderBottom
          withMenu
        />
        {shop && (
          <>
            <ShopPageHeader shop={shop} />
            <ShopItems shop={shop} />
            <Hidden mdUp>
              <CartMenu />
            </Hidden>
          </>
        )}
      </>
    );
  }
);

export default Shop;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { slug } = ctx.query;
  const queryClient = new QueryClient();
  const latitude = DEFAULT_LAT;
  const longitude = DEFAULT_LNG;
  const isMobileDevice = isMobile(ctx.req);
  const { locale } = ctx;
  await queryClient.prefetchQuery(
    [latitude, longitude, 'restaurant', slug],
    () => getRestaurantInfo({ slug: slug as string, latitude, longitude })
  );
  await queryClient.prefetchQuery(['restaurant-items', slug, locale], () =>
    getRestaurantItems({ slug: slug as string, locale: locale ?? 'en' })
  );
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
      isMobileDevice,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
