import { useQuery } from "react-query";
import { IRestaurantInfo } from "../../../lib/interfaces/IRestaurantInfo";
import { getRestaurants } from "../../../lib/queries/queries";
import { DEFAULT_LAT, DEFAULT_LNG } from "../../constants";

export interface IUseGetRestaurantsProps {
  latitude?: number;
  longitude?: number;
  filters: {
    category_ids: string[];
    is_featured?: boolean;
    free_delivery?: boolean;
  };
  sort_by: "delivery_time" | "asc" | "desc" | "ar_asc" | "ar_desc";
  page: number;
}

export const useGetRestaurants = ({
  filters,
  latitude = DEFAULT_LAT,
  longitude = DEFAULT_LNG,
  page,
  sort_by,
}: IUseGetRestaurantsProps) => {
  return useQuery<IRestaurantInfo[]>(
    [filters, latitude, longitude, page, sort_by, "restaurants"],
    () => getRestaurants({ filters, latitude, longitude, page, sort_by })
  );
};
