import { IRestaurant } from "./IRestaurant";

export interface IItemsSearchResult {
  id: number;
  restaurant_id: number;
  item_category_id: string;
  name: string;
  ar_name: string;
  price: string;
  old_price: string;
  image: string | null;
  preperation_time: unknown | null;
  is_recommended: 0 | 1;
  is_popular: 0 | 1;
  is_new: 0 | 1;
  desc: string | null;
  ar_desc: string | null;
  placeholder_image: string | null;
  is_active: 0 | 1;
  is_veg: unknown | null;
  disable_cod: 0 | 1;
  in_stock: number | null;
  max_allowed: number | null;
  restaurant: IRestaurant;
}
