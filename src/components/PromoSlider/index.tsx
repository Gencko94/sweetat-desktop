import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import { Box } from '@mui/system';
import { useGetPromoSlides } from '../../hooks/queryHooks/useGetPromoSlides';
import { HOME_FEED_SPACING_MD, HOME_FEED_SPACING_XS } from '../../constants';
import PromoSliderLoadingItem from './Loading';
const PromoSlider = () => {
  const { data: promoSlides, status } = useGetPromoSlides();
  const breakpoints = useMemo(
    () => ({
      // when window width is >= 320px
      320: {
        slidesPerView: 1.5,
        spaceBetween: 10,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1.75,
        spaceBetween: 10,
      },
      // when window width is >= 640px
      600: {
        slidesPerView: 2.75,
        spaceBetween: 15,
      },
      900: {
        slidesPerView: 3.25,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 3.25,
        spaceBetween: 20,
      },
      1536: {
        slidesPerView: 4.75,
        spaceBetween: 20,
      },
    }),
    []
  );
  return (
    <Box my={{ md: HOME_FEED_SPACING_MD, xs: HOME_FEED_SPACING_XS }}>
      <Swiper freeMode breakpoints={breakpoints}>
        {status === 'loading' &&
          [...Array.from(new Array(4))].map(i => (
            <SwiperSlide key={i}>
              <PromoSliderLoadingItem />
            </SwiperSlide>
          ))}
        {promoSlides?.map(slide => (
          <SwiperSlide key={slide.id}>
            <Box borderRadius={6} overflow="hidden">
              <Image
                placeholder="blur"
                blurDataURL={`https://sweetat.co/${slide.image_placeholder ??
                  slide.image}`}
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
