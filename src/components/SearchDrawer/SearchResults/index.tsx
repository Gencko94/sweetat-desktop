import { Box } from "@mui/system";
import { useContext } from "react";
import { IItemsSearchResult } from "../../../../lib/interfaces/IItem";
import { IRestaurant } from "../../../../lib/interfaces/IRestaurant";
import {
  ApplicationContext,
  SEARCH_TYPE,
} from "../../../contexts/ApplicationContext";
import ShopCard from "../../ShopCard";
import ShopCardWide from "../../ShopCardWide";

interface ISearchResultsProps {
  results: IItemsSearchResult[] | IRestaurant[];
}

const SearchResults = ({ results }: ISearchResultsProps) => {
  const { shopsView, globalSearchType } = useContext(ApplicationContext);
  return (
    <Box>
      {results.map((result) => {
        if (globalSearchType === "stores") {
          if (shopsView === "wide") {
            return (
              <ShopCardWide key={result.id} shop={result as IRestaurant} />
            );
          } else {
            return <ShopCard key={result.id} shop={result as IRestaurant} />;
          }
        }
      })}
    </Box>
  );
};

export default SearchResults;
