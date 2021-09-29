import { useQuery } from "react-query";
import { IItemsSearchResult } from "../../../lib/interfaces/IItem";
import { IRestaurantInfo } from "../../../lib/interfaces/IRestaurantInfo";
import { getSearchResults } from "../../../lib/queries/queries";
import { DEFAULT_LAT, DEFAULT_LNG } from "../../constants";
import { SEARCH_TYPE } from "../../contexts/ApplicationContext";

interface IUseGetSearchResultsProps {
  query: string;
  type: SEARCH_TYPE;
  latitude?: number;
  longitude?: number;
  page?: number;
}

const useGetSearchResults = ({
  query,
  type,
  latitude = DEFAULT_LAT,
  longitude = DEFAULT_LNG,
  page = 0,
}: IUseGetSearchResultsProps) => {
  return useQuery<IItemsSearchResult[] | IRestaurantInfo[]>(
    ["search", query, type, latitude, longitude, page],
    () => getSearchResults(query, type, latitude, longitude, page),
    { enabled: query.length > 2 }
  );
};

export default useGetSearchResults;
