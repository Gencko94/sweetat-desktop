import { Container, Divider, Paper, Typography } from "@mui/material";
import { NextPage } from "next";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/dist/client/router";
import { dehydrate, QueryClient } from "react-query";
import {
  getRestaurantInfo,
  getRestaurantItems,
} from "../../lib/queries/queries";
import Navbar from "../../src/components/Header/Navbar";
import { DEFAULT_LAT, DEFAULT_LNG } from "../../src/constants";
import { useGetRestaurantInfo } from "../../src/hooks/queryHooks/useGetRestaurantInfo";
import isMobile from "../../utils/isMobile";
import Image from "next/image";
import { Box } from "@mui/system";
import ShopPageInfo from "../../src/components/ShopPageInfo";
import { DarkImageOverlay } from "../../src/components/DarkImageOverlay";
import { useTranslation } from "react-i18next";
import ShopItems from "../../src/components/ShopItems";
import { memo } from "react";
const Shop: NextPage<{ isMobileDevice: boolean }> = memo(
  ({ isMobileDevice }) => {
    const { t } = useTranslation();
    const {
      query: { slug },
    } = useRouter();

    const { data: shop } = useGetRestaurantInfo({ slug: slug as string });
    return (
      <>
        <Navbar isMobileDevice={isMobileDevice} />
        {shop && (
          <>
            <Paper elevation={0}>
              <Box height="200px" position="relative">
                <Image
                  placeholder="blur"
                  blurDataURL={`https://sweetat.co/${shop.placeholder_image}`}
                  src={`https://sweetat.co/${shop.image}`}
                  alt={`${shop.name} photo`}
                  layout="fill"
                  objectFit="cover"
                  // height={200}
                  // width={350}
                />
                {shop.is_active === 0 && (
                  <DarkImageOverlay>
                    <Typography
                      variant="h6"
                      fontWeight="medium"
                    >{t`closed`}</Typography>
                    {shop.accept_preorder === 1 && (
                      <Typography
                        variant="h6"
                        fontWeight="medium"
                      >{t`accepts-pre-order`}</Typography>
                    )}
                  </DarkImageOverlay>
                )}
              </Box>
              <ShopPageInfo shop={shop} />
            </Paper>
            {/* <Divider sx={{ my: 2 }} /> */}

            <ShopItems shop={shop} />
          </>
        )}
      </>
    );
  }
);

export default Shop;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.query;
  const queryClient = new QueryClient();
  const latitude = DEFAULT_LAT;
  const longitude = DEFAULT_LNG;
  const isMobileDevice = isMobile(ctx.req);
  const { locale } = ctx;
  await queryClient.prefetchQuery(
    [latitude, longitude, "restaurant", slug],
    () => getRestaurantInfo({ slug: slug as string, latitude, longitude })
  );
  await queryClient.prefetchQuery(["restaurant-items", slug, locale], () =>
    getRestaurantItems({ slug: slug as string, locale: locale ?? "en" })
  );
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
      isMobileDevice,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
