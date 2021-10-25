import { useMutation } from 'react-query';
import { applyCoupon } from '../../../lib/queries/cartService';

const useApplyCoupon = () => {
  return useMutation(applyCoupon);
};

export default useApplyCoupon;
