import { Box } from "@mui/system";
import { Paper, Typography } from "@mui/material";
import { IItemsSearchResult } from "../../../lib/interfaces/IItem";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";

interface IItemCard {
  item: IItemsSearchResult;
}

const ItemCard = ({ item }: IItemCard) => {
  const { locale } = useRouter();
  return (
    <Box
      borderRadius="6px"
      position="relative"
      overflow="hidden"
      component={Paper}
      elevation={2}
      sx={{ minHeight: "250px" }}
    >
      <Box height="60%" position="relative">
        <Image
          placeholder="blur"
          blurDataURL={`https://sweetat.co/${item.placeholder_image}`}
          src={`https://sweetat.co/${item.image}`}
          alt={`${item.name} photo`}
          layout="fill"
          objectFit="cover"
          // height={200}
          // width={350}
        />
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

export default ItemCard;
