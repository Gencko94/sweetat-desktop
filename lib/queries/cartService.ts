import axios from 'axios';

import { getLocalCart } from '../../utils/getLocalCart';

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

export const getCartItems = async () => {
  const localCart = getLocalCart();
  const res = await instance.post('/validate-cart-items', {
    items: localCart.items,
  });
  return res.data;
};
export const applyCoupon = async ({
  coupon,
  restaurant_id,
  subtotal,
}: {
  coupon: string;
  restaurant_id: number;
  subtotal: number;
}) => {
  const res = await instance.post('/apply-coupon', {
    coupon,
    restaurant_id,
    subtotal,
  });
  return res.data;
};
