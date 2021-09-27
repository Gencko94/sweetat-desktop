import { useQuery } from "react-query";
import { IRestaurant } from "../../../lib/interfaces/IRestaurant";
import { getRestaurants } from "../../../lib/queries/queries";

export interface IUseGetRestaurantsProps {
  latitude?: number;
  longitude?: number;
  filters: {
    category_ids: string[];
    is_featured: boolean;
    free_delivery: boolean;
  };
  sort_by: "delivery_time";
  page: number;
}

export const useGetRestaurants = ({
  filters,
  latitude = 29.3352938,
  longitude = 48.0715612,
  page,
  sort_by,
}: IUseGetRestaurantsProps) => {
  return useQuery<IRestaurant[]>(
    [filters, latitude, longitude, page, sort_by, "restaurants"],
    () => getRestaurants({ filters, latitude, longitude, page, sort_by })
  );
};
