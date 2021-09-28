import { Box, styled } from "@mui/system";
import { IRestaurant } from "../../../lib/interfaces/IRestaurant";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import Image from "next/image";
import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SpacerDot from "../SpacerDot";
interface IShopCard {
  shop: IRestaurant;
}

const ShopCard = ({ shop }: IShopCard) => {
  const { t } = useTranslation();
  const shopStatusColor = useMemo(() => {
    if (shop.is_operational) {
      return "success";
    }
    if ((shop.is_operational = false && shop.accept_preorder === 1)) {
      return "primary";
    }
    return "error";
  }, [shop]);
  return (
    <Box
      borderRadius="6px"
      position="relative"
      overflow="hidden"
      display="flex"
      gap={1}
    >
      <Box
        sx={{
          border: "1px solid rgba(0,0,0,0.12)",
          borderRadius: "6px",
          overflow: "hidden",
          p: 0.5,
        }}
        width="20%"
        position="relative"
      >
        <Image
          placeholder="blur"
          blurDataURL={`https://sweetat.co/${shop.placeholder_image}`}
          src={`https://sweetat.co/${shop.logo}`}
          alt={`${shop.name} photo`}
          layout="responsive"
          objectFit="cover"
          height="100%"
          width="100%"
        />
        {!shop.is_operational && (
          <ClosedOverlay>
            <Typography variant="body1" fontWeight="medium">
              {t`closed`}
            </Typography>
          </ClosedOverlay>
        )}
      </Box>
      <Box>
        <Typography fontWeight="bold">{shop.name}</Typography>
        <Typography
          color="text.secondary"
          variant="caption"
          fontWeight="medium"
        >
          {shop.description}
        </Typography>
        <Box alignItems="center" display="flex" gap={0.5} flexWrap="wrap">
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Dot color={shopStatusColor} />
            <Typography variant="body2" fontWeight="medium">
              {shop.is_operational
                ? t`open`
                : shop.accept_preorder
                ? t`pre-orders`
                : t`closed`}
            </Typography>
          </Stack>
          <SpacerDot />
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <AccessTimeIcon color="success" />
            <Typography variant="body2">
              {shop.delivery_time_label} {t`minutes`}
            </Typography>
          </Stack>
          <SpacerDot />
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <DeliveryDiningIcon color="success" />
            <Typography
              color="success.main"
              variant="body2"
              fontWeight="medium"
            >
              {shop.delivery_charges === "0"
                ? t`free-delivery`
                : `${shop.delivery_charges} KD Delivery cost`}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default ShopCard;

const Dot = styled("span")<{ color: string }>(({ theme, color }) => ({
  height: "10px",
  width: "10px",
  borderRadius: "50%",
  backgroundColor: theme.palette[color].main,
  display: "inline",
}));
const ClosedOverlay = styled("div")(({ theme }) => ({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  backgroundColor: `rgba(0,0,0,0.5)`,
}));
