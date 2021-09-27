import { NextPage } from "next";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

import FeaturedShopsSlider from "../src/components/FeaturedShopsSlider";
import Navbar from "../src/components/Header/Navbar";
import HomeCategoriesSlider from "../src/components/HomeCategoriesSlider";
import PromoSlider from "../src/components/PromoSlider";

import isMobile from "../utils/isMobile";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
    },
  };
};

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />

      <HomeCategoriesSlider />
      <PromoSlider />
      <FeaturedShopsSlider />
    </>
  );
};

export default Home;
