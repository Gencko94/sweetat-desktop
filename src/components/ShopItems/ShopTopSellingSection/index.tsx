import { useMemo } from "react";
import { ITEM } from "../../../../lib/interfaces/IRestaurantItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ItemCard from "../../ItemCard";
import { Box } from "@mui/system";
import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
interface IShopTopSellingSectionProps {
  topSellingItems: ITEM[];
}

const ShopTopSellingSection = ({
  topSellingItems,
}: IShopTopSellingSectionProps) => {
  const { t } = useTranslation();
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
  return (
    <Box my={1}>
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
