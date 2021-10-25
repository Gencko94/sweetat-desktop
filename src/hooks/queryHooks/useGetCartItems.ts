import { useQuery } from 'react-query';
import { IGetCartResponse } from '../../../lib/interfaces/cart/IGetCartResponse';
import { getCartItems } from '../../../lib/queries/cartService';
import { DURATIONS } from '../../constants';

const useGetCartItems = () => {
  return useQuery<IGetCartResponse>('/validate-cart-items', getCartItems, {
    staleTime: DURATIONS.thirtySeconds,
  });
};

export default useGetCartItems;
