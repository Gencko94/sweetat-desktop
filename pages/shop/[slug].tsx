import { Hidden, Typography } from '@mui/material';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/dist/client/router';
import { dehydrate, QueryClient } from 'react-query';
import {
  getRestaurantInfo,
  getRestaurantItems,
} from '../../lib/queries/queries';
import { DEFAULT_AREA_COVERAGE_ID } from '../../src/constants';
import { useGetRestaurantInfo } from '../../src/hooks/queryHooks/useGetRestaurantInfo';

import ShopItems from '../../src/components/ShopItems';
import ShopPageHeader from '../../src/components/ShopPageHeader';
import CartMenu from '../../src/components/CartMenu';
import Navbar from '../../src/components/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Shop: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    query: { slug },
  } = useRouter();

  const { data: shop, status, error } = useGetRestaurantInfo({
    slug: slug as string,
    queryOptions: { retry: 1 },
  });

  // 🛑 Check for errors or 404s...
  useEffect(() => {
    if (status === 'error' && error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setErrorMessage('Not Found');
        } else {
          setErrorMessage('Something went wrong');
        }
      } else {
        setErrorMessage('Something went wrong');
      }
    }
  }, [error, status]);
  return (
    <>
      <Navbar
        logoVariant="colored"
        variant="contained"
        withBorderBottom
        withMenu
      />
      {status === 'error' && <Typography>{errorMessage}</Typography>}
      {status === 'loading' && <Typography>Loading...</Typography>}
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
};

export default Shop;

export const getServerSideProps: GetServerSideProps = async ctx => {
  if (ctx.params) {
    const { locale, params } = ctx;
    const slug = params.slug;
    const queryClient = new QueryClient();
    const coverage_area_id = DEFAULT_AREA_COVERAGE_ID;

    await queryClient.prefetchQuery(
      [coverage_area_id, '/restaurant', slug],
      () => getRestaurantInfo({ slug: slug as string, coverage_area_id })
    );
    await queryClient.prefetchQuery(['restaurant-items', slug, locale], () =>
      getRestaurantItems({ slug: slug as string, locale: locale ?? 'en' })
    );
    return {
      props: {
        ...(await serverSideTranslations(locale as string, ['common'])),
        dehydratedState: dehydrate(queryClient),
      },
    };
  } else {
    return {
      notFound: true,
      redirect: { destination: '/shops', permanent: true },
    };
  }
};
