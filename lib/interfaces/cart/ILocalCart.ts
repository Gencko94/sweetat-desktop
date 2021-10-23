export interface ILocalCart {
  restaurant_id: number;
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
