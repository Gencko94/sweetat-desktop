import axios from 'axios';
import { LOCAL_STORAGE_CART_KEY } from '../../src/constants';
import { ILocalCart } from '../interfaces/cart/ILocalCart';

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

export const getCartItems = async () => {
  const localCart: ILocalCart = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_CART_KEY) as string
  );
  const res = await instance.post('/validate-cart-items', {
    items: localCart.items,
  });
  return res.data;
};
