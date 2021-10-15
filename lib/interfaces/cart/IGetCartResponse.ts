import { ITEM } from '../IRestaurantItem';

export interface IGetCartResponse {
  success: boolean;
  errors: any[];
  total: number;
  items: IGetCartResponseItem[];
}

export interface IGetCartResponseItem extends ITEM {
  selectedaddons: {
    id: number;
    name: string;
    ar_name: string;
    price: string;
    addon_category_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    is_active: 0 | 1;
    addon_id: number;
    addon_category_name: string | null;
    addon_category_ar_name: string | null;
    addon_name: string;
    addon_ar_name: string;
  }[];
  quantity: number;
}
