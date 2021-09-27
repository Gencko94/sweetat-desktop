import { useQuery } from "react-query";
import { IPromoSlide } from "../../../lib/interfaces/IPromoSlide";
import { getPromoSlides } from "../../../lib/queries/queries";

export const useGetPromoSlides = () => {
  return useQuery<IPromoSlide[]>("promo-slides", getPromoSlides);
};
