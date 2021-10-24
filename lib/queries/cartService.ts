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
