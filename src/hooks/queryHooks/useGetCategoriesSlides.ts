import { useQuery } from "react-query";
import { ICategorySlide } from "../../../lib/interfaces/ICategorySlide";
import { getCategorySlides } from "../../../lib/queries/queries";

export const useGetCategoriesSlides = () => {
  return useQuery<ICategorySlide[]>("categories-slides", getCategorySlides);
};
