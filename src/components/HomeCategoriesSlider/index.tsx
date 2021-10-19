import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Box } from '@mui/system';
import { useMemo } from 'react';
import 'swiper/css';
import { Typography } from '@mui/material';
import { useGetCategoriesSlides } from '../../hooks/queryHooks/useGetCategoriesSlides';

import { HOME_FEED_SPACING_MD, HOME_FEED_SPACING_XS } from '../../constants';
import { useApplicationState } from '../../contexts/ApplicationContext';
import HomeCategoryLoadingItem from './Loading';
const HomeCategoriesSlider = () => {
  const { data: categories, status } = useGetCategoriesSlides();
  const [_, setState] = useApplicationState();
  const breakpoints = useMemo(
    () => ({
      // when window width is >= 320px
      320: {
        slidesPerView: 3.25,
        spaceBetween: 5,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3.75,
        spaceBetween: 5,
      },
      // when window width is >= 640px
      600: {
        slidesPerView: 4.25,
        spaceBetween: 5,
      },
      900: {
        slidesPerView: 5.75,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 7.25,
        spaceBetween: 5,
      },
      1536: {
        slidesPerView: 10.25,
        spaceBetween: 5,
      },
    }),
    []
  );
  return (
    <Box mb={{ md: HOME_FEED_SPACING_MD, xs: HOME_FEED_SPACING_XS }}>
      <Swiper freeMode breakpoints={breakpoints}>
        {status === 'loading' &&
          [...Array.from(new Array(10))].map(i => (
            <SwiperSlide key={i}>
              <HomeCategoryLoadingItem />
            </SwiperSlide>
          ))}
        {categories?.map(category => (
          <SwiperSlide key={category.id}>
            <Box
              onClick={() =>
                setState(prev => ({
                  ...prev,
                  restaurantsQuery: {
                    category_ids: [category.categories_ids[0].value],
                  },
                }))
              }
              sx={{
                position: 'relative',
                cursor: 'pointer',
              }}
            >
              <Typography
                sx={{ position: 'absolute', top: 2, left: 10, zIndex: 1 }}
                variant="subtitle1"
                fontWeight="bold"
                color="white"
              >
                {category.categories_ids[0].label}
              </Typography>
              <Image
                placeholder="blur"
                blurDataURL={`https://sweetat.co/${category.image_placeholder}`}
                src={`https://sweetat.co/${category.image}`}
                alt={`${category.name} photo`}
                width={200}
                height={200}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HomeCategoriesSlider;
