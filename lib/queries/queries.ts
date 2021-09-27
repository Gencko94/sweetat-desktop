import axios from "axios";
import { ICategorySlide } from "../interfaces/ICategorySlide";
import { IPromoSlide } from "../interfaces/IPromoSlide";

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

export const getCategorySlides = async () => {
  const res = await instance.post("/get-restaurant-category-slides");
  return res.data;
};
export const getPromoSlides = async () => {
  const res = await instance.post("/promo-slider");
  return res.data.otherSlides;
};
export const getRestaurants = async () => {
  const res = await instance.post("/get-filtered-restaurants", {
    latitude: "29.3352938",
    longitude: "48.0715612",
    filters: {
      category_ids: ["1", "4"],
      is_featured: true,
      free_delivery: true,
    },
    sort_by: "delivery_time",
    page: 0,
  });
  return res.data;
};
