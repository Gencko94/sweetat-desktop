import { useQuery } from "react-query";

import { ITEM } from "../../../lib/interfaces/IRestaurantItem";
import { getSingleItem } from "../../../lib/queries/queries";

export interface IUseGetSingleItem {
  id: number;
}

export const useGetSingleItem = ({ id }: IUseGetSingleItem) => {
  return useQuery<ITEM>(["single-item", id], () => getSingleItem(id));
};
