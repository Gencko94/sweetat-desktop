import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ShopCardWide from "../ShopCardWide";
import { Box } from "@mui/system";
import { useGetRestaurants } from "../../hooks/queryHooks/useGetRestaurants";
import { IconButton, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useApplicationState } from "../../contexts/ApplicationContext";
import { useRouter } from "next/dist/client/router";
const FeaturedShopsSlider = () => {
  const [state] = useApplicationState();
  const { locale } = useRouter();
  const { t } = useTranslation();
  const { data: shops } = useGetRestaurants({
    filters: { category_ids: [], free_delivery: true, is_featured: true },
    latitude: state.userLocation?.lat,
    longitude: state.userLocation?.lng,
    page: 0,
    sort_by: "delivery_time",
  });
  const breakpoints = useMemo(
    () => ({
      // when window width is >= 320px
      320: {
        slidesPerView: 1.2,
        spaceBetween: 5,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2.25,
        spaceBetween: 5,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 2.75,
        spaceBetween: 5,
      },
      768: {
        slidesPerView: 3.25,
        spaceBetween: 5,
      },
      1100: {
        slidesPerView: 3.75,
        spaceBetween: 5,
      },
      1440: {
        slidesPerView: 4.25,
        spaceBetween: 5,
      },
    }),
    []
  );
  return (
    <Box my={3} mx={1}>
      <Stack
        mb={3}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
        >{t`featured-shops`}</Typography>
        <IconButton color="primary">
          {locale === "ar" ? <ArrowBackIcon /> : <ArrowForwardIcon />}
        </IconButton>
      </Stack>
      <Swiper breakpoints={breakpoints}>
        {shops?.map((shop) => (
          <SwiperSlide key={shop.id}>
            <ShopCardWide shop={shop} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default FeaturedShopsSlider;
