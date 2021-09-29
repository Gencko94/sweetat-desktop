import { Box, styled } from "@mui/system";
import { IRestaurantInfo } from "../../../lib/interfaces/IRestaurantInfo";
import Image from "next/image";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useContext } from "react";
import { ApplicationContext } from "../../contexts/ApplicationContext";
interface IShopSliderCard {
  shop: IRestaurantInfo;
}

const ShopCardWide = ({ shop }: IShopSliderCard) => {
  const { t } = useTranslation();
  const { handleToggleSearchMenu } = useContext(ApplicationContext);
  return (
    <Link href={`/shop/${shop.slug}`} passHref>
      <Box
        borderRadius="6px"
        position="relative"
        overflow="hidden"
        sx={{ height: "300px" }}
        onClick={() => handleToggleSearchMenu()}
      >
        <Box height="80%" position="relative">
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
          <Box
            sx={{
              position: "absolute",
              bottom: 12,
              left: 9,
              bgcolor: "secondary.main",
              p: 0.5,
              borderRadius: "6px",
            }}
          >
            <Typography variant="caption" fontWeight="bold">
              {shop.deliverable_by_sweetat ? "Delivered By Sweetat" : ""}
            </Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: -30,
              right: 9,
              bgcolor: "rgba(255,255,255,0.7)",

              borderRadius: 12,
            }}
          >
            <DeliveryTimeChip>
              <Typography fontWeight="bold">
                {shop.delivery_time_label}
              </Typography>
              <Typography>{t`minutes`}</Typography>
            </DeliveryTimeChip>
          </Box>
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {shop.name}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
            fontWeight="medium"
          >
            {shop.delivery_charges === "0"
              ? t`free-delivery`
              : `${shop.delivery_charges} KD Delivery cost`}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default ShopCardWide;
const DeliveryTimeChip = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  // backgroundColor: alpha(theme.palette.primary.main, 0.8),
}));
