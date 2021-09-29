import { Stack, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useContext } from "react";
import { IItemsSearchResult } from "../../../../lib/interfaces/IItem";
import { IRestaurantInfo } from "../../../../lib/interfaces/IRestaurantInfo";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
import WhiteLogo from "../../../svgs/white-logo";
import ItemCard from "../../ItemCard";
import ItemCardWide from "../../ItemCardWide";
import ShopCard from "../../ShopCard";
import ShopCardWide from "../../ShopCardWide";

interface ISearchResultsProps {
  results: IItemsSearchResult[] | IRestaurantInfo[];
}

const SearchResults = ({ results }: ISearchResultsProps) => {
  const { shopsView, globalSearchType, itemsView } = useContext(
    ApplicationContext
  );
  return (
    <Box>
      {results.length === 0 && (
        <Box
          alignItems="center"
          justifyContent="center"
          display="flex"
          flexDirection="column"
          py={4}
          px={1}
          m={4}
        >
          <WhiteLogo />
          <Typography textAlign="center" variant="h6" my={2}>
            No results were found...
          </Typography>
        </Box>
      )}
      {globalSearchType === "stores" ? (
        shopsView === "wide" ? (
          <Stack spacing={2} py={2} px={1}>
            {results.map((result) => (
              <ShopCardWide key={result.id} shop={result as IRestaurantInfo} />
            ))}
          </Stack>
        ) : (
          <Stack spacing={2} py={2} px={1}>
            {results.map((result) => (
              <ShopCard key={result.id} shop={result as IRestaurantInfo} />
            ))}
          </Stack>
        )
      ) : (
        ""
      )}
      {globalSearchType === "items" ? (
        itemsView === "wide" ? (
          <Stack spacing={2} py={2} px={1}>
            {results.map((result) => (
              <ItemCardWide
                key={result.id}
                item={result as IItemsSearchResult}
              />
            ))}
          </Stack>
        ) : (
          <ItemsGrid>
            {results.map((result) => (
              <ItemCard key={result.id} item={result as IItemsSearchResult} />
            ))}
          </ItemsGrid>
        )
      ) : (
        ""
      )}
    </Box>
  );
};

export default SearchResults;
const ItemsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))",
  gap: theme.spacing(2),
  padding: "1rem 0.5rem",
}));
