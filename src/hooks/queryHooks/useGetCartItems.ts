import { useQuery } from 'react-query';
import { IGetCartResponse } from '../../../lib/interfaces/cart/IGetCartResponse';
import { getCartItems } from '../../../lib/queries/cartService';

const useGetCartItems = () => {
  return useQuery<IGetCartResponse>('/validate-cart-items', getCartItems, {
    enabled: typeof window !== 'undefined',
  });
};

export default useGetCartItems;
