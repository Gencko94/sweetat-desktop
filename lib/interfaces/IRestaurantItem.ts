import { IItemsSearchResult } from "./IItem";

export type RESTAURANT_SECTION = {
  [key: string]: ITEM[];
};

export type ITEM = {
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
  addon_categories: ADDON_CATEGORY[];
  restaurant: never;
};

export interface ADDON_CATEGORY {
  id: number;
  name: string;
  ar_name: string;
  type: "MULTI" | "SINGLE";
  required_choices: number;
  max_allowed: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  description: string | null;
  ar_description: string | null;
  pivot: {
    item_id: string;
    addon_category_id: string;
  };
  addons: ADDON[];
}
export type ADDON = {
  id: number;
  name: string;
  ar_name: string;
  price: string;
  addon_category_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  is_active: 0 | 1;
};
