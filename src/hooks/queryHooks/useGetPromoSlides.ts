import { useQuery } from 'react-query';
import { IPromoSlide } from '../../../lib/interfaces/IPromoSlide';
import { getPromoSlides } from '../../../lib/queries/queries';
import { DURATIONS } from '../../constants';

export const useGetPromoSlides = () => {
  return useQuery<IPromoSlide[]>('promo-slides', getPromoSlides, {
    staleTime: DURATIONS.thirtyMins,
  });
};
