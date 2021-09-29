import { useQuery } from "react-query";
import { IRestaurantInfo } from "../../../lib/interfaces/IRestaurantInfo";
import { getRestaurantInfo } from "../../../lib/queries/queries";
import { DEFAULT_LAT, DEFAULT_LNG } from "../../constants";

export interface IUseGetRestaurantInfoProps {
  latitude?: number;
  longitude?: number;
  slug: string;
}

export const useGetRestaurantInfo = ({
  latitude = DEFAULT_LAT,
  longitude = DEFAULT_LNG,
  slug,
}: IUseGetRestaurantInfoProps) => {
  return useQuery<IRestaurantInfo>(
    [latitude, longitude, "restaurant", slug],
    () => getRestaurantInfo({ latitude, longitude, slug })
  );
};
