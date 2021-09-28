import { Box } from "@mui/system";
import { IItemsSearchResult } from "../../../../lib/interfaces/IItem";
import { IRestaurant } from "../../../../lib/interfaces/IRestaurant";
import { SEARCH_TYPE } from "../../../contexts/ApplicationContext";
import ShopCardWide from "../../ShopCardWide";

interface ISearchResultsProps {
  results: IItemsSearchResult[] | IRestaurant[];
  type: SEARCH_TYPE;
}

const SearchResults = ({ results, type }: ISearchResultsProps) => {
  return (
    <Box>
      {results.map((result) => {
        if (type === "stores") {
          return <ShopCardWide key={result.id} shop={result as IRestaurant} />;
        }
      })}
    </Box>
  );
};

export default SearchResults;
