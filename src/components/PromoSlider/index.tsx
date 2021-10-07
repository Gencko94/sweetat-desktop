import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import { Box } from '@mui/system';
import { useGetPromoSlides } from '../../hooks/queryHooks/useGetPromoSlides';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
const PromoSlider = () => {
  const { data: promoSlides } = useGetPromoSlides();
  const { t } = useTranslation();
  const breakpoints = useMemo(
    () => ({
      // when window width is >= 320px
      320: {
        slidesPerView: 1.5,
        spaceBetween: 5,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1.75,
        spaceBetween: 5,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 2.25,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 2.25,
        spaceBetween: 15,
      },
      1100: {
        slidesPerView: 3.25,
        spaceBetween: 20,
      },
      1440: {
        slidesPerView: 3.75,
        spaceBetween: 20,
      },
    }),
    []
  );
  return (
    <Box my={5}>
      <Typography mb={3} variant="h5" fontWeight="bold">{t`promos`}</Typography>
      <Swiper freeMode breakpoints={breakpoints}>
        {promoSlides?.map(slide => (
          <SwiperSlide key={slide.id}>
            <Box borderRadius={6} overflow="hidden">
              <Image
                placeholder="blur"
                blurDataURL={`https://sweetat.co/${slide.image_placeholder}`}
                src={`https://sweetat.co/${slide.image}`}
                alt={`${slide.name} photo`}
                layout="responsive"
                width={200}
                height={120}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default PromoSlider;
