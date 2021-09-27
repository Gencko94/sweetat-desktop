import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Box } from "@mui/system";
import { useMemo } from "react";
import "swiper/css";
import { Typography } from "@mui/material";
import { useGetCategoriesSlides } from "../../hooks/queryHooks/useGetCategoriesSlides";

const HomeCategoriesSlider = () => {
  const { data: categories } = useGetCategoriesSlides();
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
      640: {
        slidesPerView: 4.25,
        spaceBetween: 5,
      },
      768: {
        slidesPerView: 5.75,
        spaceBetween: 5,
      },
      1100: {
        slidesPerView: 6.25,
        spaceBetween: 5,
      },
      1440: {
        slidesPerView: 7.25,
        spaceBetween: 5,
      },
    }),
    []
  );
  return (
    <Box my={3} mx={1}>
      <Swiper freeMode breakpoints={breakpoints}>
        {categories?.map((category) => (
          <SwiperSlide key={category.id}>
            <Box sx={{ position: "relative" }}>
              <Typography
                sx={{ position: "absolute", top: 2, left: 5, zIndex: 1 }}
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
                layout="responsive"
                width={130}
                height={130}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HomeCategoriesSlider;
