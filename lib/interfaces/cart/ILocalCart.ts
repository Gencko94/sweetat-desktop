export type CART_RESTAURANT = {
  id: number;
  slug: string;
  name: string;
  ar_name: string;
  image: string;
  logo: string;
  delivery_time: string;
  accept_preorder: 0 | 1;
  is_busy: 0 | 1;
  is_schedulable: 0 | 1;
  min_order_price: string;
};

export interface ILocalCart {
  restaurant: CART_RESTAURANT | null;
  items: ILocalCartItem[];
}

export interface ILocalCartItem {
  id: number;
  price: string;
  quantity: number;
  selectedaddons: ILocalCartItemAddon[];
}

export interface ILocalCartItemAddon {
  addon_category_name: string;
  addon_category_ar_name: string | null;
  addon_id: number;
}
