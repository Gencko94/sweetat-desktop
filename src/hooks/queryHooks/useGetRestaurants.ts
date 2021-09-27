import { useQuery } from "react-query";
import { IRestaurant } from "../../../lib/interfaces/IRestaurant";
import { getRestaurants } from "../../../lib/queries/queries";

export const useGetRestaurants = () => {
  return useQuery<IRestaurant[]>(["restaurants"], getRestaurants);
};
