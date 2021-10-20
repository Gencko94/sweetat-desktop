import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { dehydrate, QueryClient } from 'react-query';
import { getCategorySlides, getPromoSlides } from '../lib/queries/queries';

import HomePageHero from '../src/components/HomePageHero';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('categories-slides', getCategorySlides);
  await queryClient.prefetchQuery('promo-slides', getPromoSlides);
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),

      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Home: NextPage = () => {
  return <HomePageHero />;
};

export default Home;
