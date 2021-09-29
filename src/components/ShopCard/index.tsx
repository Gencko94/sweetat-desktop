import { Box, styled } from "@mui/system";
import { IRestaurantInfo } from "../../../lib/interfaces/IRestaurantInfo";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import Image from "next/image";
import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SpacerDot from "../SpacerDot";
import ShopStatus from "../ShopStatus";
import Link from "next/link";
import { ApplicationContext } from "../../contexts/ApplicationContext";
import { useContext } from "react";
import { ClosedShopOverlay } from "../ClosedShopOverlay";
interface IShopCard {
  shop: IRestaurantInfo;
}

const ShopCard = ({ shop }: IShopCard) => {
  const { t } = useTranslation();
  const { handleToggleSearchMenu } = useContext(ApplicationContext);

  return (
    <Link href={`/shop/${shop.slug}`} passHref>
      <Box
        borderRadius="6px"
        position="relative"
        overflow="hidden"
        display="flex"
        gap={1}
        onClick={() => handleToggleSearchMenu()}
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
          {shop.is_active === 0 && (
            <ClosedShopOverlay>
              <Typography variant="body1" fontWeight="medium">
                {t`closed`}
              </Typography>
            </ClosedShopOverlay>
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
            <ShopStatus
              accept_preorder={shop.accept_preorder}
              is_active={shop.is_active}
            />
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
    </Link>
  );
};

export default ShopCard;
