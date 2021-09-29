import { Box, styled } from "@mui/system";
import { IItemsSearchResult } from "../../../lib/interfaces/IItem";

import Image from "next/image";
import { Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useRouter } from "next/dist/client/router";
interface IItemCardWide {
  item: IItemsSearchResult;
}

const ItemCardWide = ({ item }: IItemCardWide) => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <Box
      borderRadius="6px"
      position="relative"
      overflow="hidden"
      display="flex"
      gap={1}
      component={Paper}
      elevation={2}
    >
      <Box
        sx={{
          overflow: "hidden",
        }}
        width="30%"
        position="relative"
      >
        <Image
          placeholder="blur"
          blurDataURL={`https://sweetat.co/${item.placeholder_image}`}
          src={`https://sweetat.co/${item.image}`}
          alt={`${item.name} photo`}
          layout="responsive"
          objectFit="cover"
          height="100%"
          width="100%"
        />
        {item.in_stock === 0 && (
          <ClosedOverlay>
            <Typography variant="body1" fontWeight="medium">
              {t`out-of-stock`}
            </Typography>
          </ClosedOverlay>
        )}
      </Box>
      <Box p={1}>
        <Typography fontWeight="bold" variant="body2">
          {item.name}
        </Typography>
        <Typography variant="body1" fontWeight="medium" color="secondary">
          {item.price} KD
        </Typography>
        <Typography
          color="text.secondary"
          variant="caption"
          fontWeight="medium"
        >
          From :{" "}
          <Typography color="primary" variant="caption" fontWeight="medium">
            {locale === "ar" ? item.restaurant.ar_name : item.restaurant.name}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default ItemCardWide;

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
