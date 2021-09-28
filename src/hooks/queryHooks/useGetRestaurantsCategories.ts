import { useQuery } from "react-query";
import { ICategory } from "../../../lib/interfaces/ICategory";

import {
  getPromoSlides,
  getRestaurantsCategories,
} from "../../../lib/queries/queries";

export const useGetRestaurantsCategories = () => {
  return useQuery<ICategory[]>(
    "restaurants-categories",
    getRestaurantsCategories
  );
};
