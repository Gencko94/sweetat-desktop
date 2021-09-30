import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { ITEM } from "../../../../lib/interfaces/IRestaurantItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ItemCard from "../../ItemCard";
import { Box } from "@mui/system";
import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
interface IShopTopSellingSectionProps {
  topSellingItems: ITEM[];
  setActiveTab: Dispatch<SetStateAction<number>>;
  index: number;
}

const ShopTopSellingSection = ({
  topSellingItems,
  setActiveTab,
  index,
}: IShopTopSellingSectionProps) => {
  const { t } = useTranslation();
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 1,
    initialInView: true,
  });
  const breakpoints = useMemo(
    () => ({
      // when window width is >= 320px
      320: {
        slidesPerView: 2.25,
        spaceBetween: 10,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2.75,
        spaceBetween: 10,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3.25,
        spaceBetween: 5,
      },
      768: {
        slidesPerView: 3.75,
        spaceBetween: 5,
      },
      1100: {
        slidesPerView: 4.25,
        spaceBetween: 5,
      },
      1440: {
        slidesPerView: 5.25,
        spaceBetween: 5,
      },
    }),
    []
  );
  useEffect(() => {
    if (inView) {
      setActiveTab(index);
    }
  }, [inView, index, setActiveTab]);
  return (
    <Box id="top-selling" my={1} ref={ref}>
      <Stack direction="row">
        <Typography fontWeight="bold">
          {t`top-selling`} ({topSellingItems.length})
        </Typography>
      </Stack>
      <Swiper freeMode breakpoints={breakpoints}>
        {topSellingItems?.map((item) => (
          <SwiperSlide style={{ padding: "1rem 0" }} key={item.id}>
            <ItemCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ShopTopSellingSection;
