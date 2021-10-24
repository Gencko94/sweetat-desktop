import { ILocalCart } from '../lib/interfaces/cart/ILocalCart';
import { LOCAL_STORAGE_CART_KEY } from '../src/constants';

export const getLocalCart = (): ILocalCart => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY) as string);
};
