import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ShopCardWide from '../ShopCardWide';
import { Box } from '@mui/system';
import { useGetRestaurants } from '../../hooks/queryHooks/useGetRestaurants';
import { IconButton, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useApplicationState } from '../../contexts/ApplicationContext';
import { useRouter } from 'next/dist/client/router';
import {
  DEFAULT_AREA_COVERAGE_ID,
  HOME_FEED_SPACING_MD,
  HOME_FEED_SPACING_XS,
} from '../../constants';
import LoadingItemCardWide from '../ShopCardWide/Loading';
const FeaturedShopsSlider = () => {
  const [_] = useApplicationState();
  const { locale } = useRouter();
  const { t } = useTranslation();
  const { data, status } = useGetRestaurants({
    filters: { category_ids: [], free_delivery: true, is_featured: true },
    coverage_area_id: DEFAULT_AREA_COVERAGE_ID,
    results_per_page: 15,

    // sort_by: 'delivery_time',
  });
  const breakpoints = useMemo(
    () => ({
      // when window width is >= 320px
      320: {
        slidesPerView: 1.5,
        spaceBetween: 5,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2.25,
        spaceBetween: 5,
      },
      // when window width is >= 600px
      600: {
        slidesPerView: 2.5,
        spaceBetween: 15,
      },
      700: {
        slidesPerView: 2.75,
        spaceBetween: 15,
      },
      900: {
        slidesPerView: 2.25,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 3.25,
        spaceBetween: 20,
      },
      1420: {
        slidesPerView: 3.25,
        spaceBetween: 20,
      },
      1536: {
        slidesPerView: 5.25,
        spaceBetween: 20,
      },
    }),
    []
  );
  return (
    <Box my={{ md: HOME_FEED_SPACING_MD, xs: HOME_FEED_SPACING_XS }}>
      <Stack
        mb={{ md: 3, xs: 2 }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
        >{t`featured-shops`}</Typography>
        <IconButton color="primary">
          {locale === 'ar' ? <ArrowBackIcon /> : <ArrowForwardIcon />}
        </IconButton>
      </Stack>
      <Swiper breakpoints={breakpoints}>
        {status === 'loading' &&
          [...Array.from(new Array(8))].map(i => (
            <SwiperSlide key={i}>
              <LoadingItemCardWide />
            </SwiperSlide>
          ))}
        {data?.pages.map(page =>
          page.data.map(shop => (
            <SwiperSlide key={shop.id}>
              <ShopCardWide shop={shop} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </Box>
  );
};

export default FeaturedShopsSlider;
