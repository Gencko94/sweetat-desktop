import { useRouter } from "next/dist/client/router";
import { useQuery } from "react-query";
import {
  ITEM,
  RESTAURANT_SECTION,
} from "../../../lib/interfaces/IRestaurantItem";
import { getRestaurantItems } from "../../../lib/queries/queries";

export interface IUseGetRestaurantItemsProps {
  slug: string;
}
export interface IGetRestaurantItemsResponse {
  top_selling: ITEM[];
  items: RESTAURANT_SECTION;
}
export const useGetRestaurantItems = ({
  slug,
}: IUseGetRestaurantItemsProps) => {
  const { locale } = useRouter();
  return useQuery<IGetRestaurantItemsResponse>(
    ["restaurant-items", slug, locale],
    () => getRestaurantItems({ slug, locale: locale ?? "en" })
  );
};
