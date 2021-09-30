import { NextPage } from "next";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { dehydrate, QueryClient } from "react-query";
import { getCategorySlides, getPromoSlides } from "../lib/queries/queries";

import FeaturedShopsSlider from "../src/components/FeaturedShopsSlider";
import Navbar from "../src/components/Header/Navbar";
import HomeCategoriesSlider from "../src/components/HomeCategoriesSlider";
import PromoSlider from "../src/components/PromoSlider";
import isMobile from "../utils/isMobile";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale,
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("categories-slides", getCategorySlides);
  await queryClient.prefetchQuery("promo-slides", getPromoSlides);
  const isMobileDevice = isMobile(req);
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
      isMobileDevice,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Home: NextPage<{ isMobileDevice: boolean }> = ({ isMobileDevice }) => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar isMobileDevice={isMobileDevice} />

      <HomeCategoriesSlider />
      <PromoSlider />
      <FeaturedShopsSlider />
    </>
  );
};

export default Home;
