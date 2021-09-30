import { Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { IRestaurantInfo } from "../../../lib/interfaces/IRestaurantInfo";
import ShopStatus from "../ShopStatus";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useTranslation } from "react-i18next";
interface IShopPageInfo {
  shop: IRestaurantInfo;
}

const ShopPageInfo = ({ shop }: IShopPageInfo) => {
  const { locale } = useRouter();
  const { t } = useTranslation();
  return (
    <Container>
      <Stack direction="row" my={2} spacing={2}>
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
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {locale === "ar" ? shop.ar_name : shop.name}
          </Typography>
          <Typography variant="subtitle2" color="primary" fontWeight="medium">
            {locale === "ar" ? shop.ar_description : shop.description}
          </Typography>
          <ShopStatus
            is_active={shop.is_active}
            accept_preorder={shop.accept_preorder}
          />
        </Box>
      </Stack>
      {/* ⚡ Add Review Section */}
      {shop.is_active === 0 && shop.accept_preorder === 1 && (
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <AccessTimeIcon color="primary" />
          <Typography
            variant="body2"
            fontWeight="bold"
          >{t`accepts-pre-order`}</Typography>
          <Typography variant="body2">
            ({t`delivery-cost`} : {t`free`})
          </Typography>
        </Stack>
      )}
    </Container>
  );
};

export default ShopPageInfo;
