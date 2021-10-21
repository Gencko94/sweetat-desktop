import { useQuery } from 'react-query';
import { ICategory } from '../../../lib/interfaces/ICategory';

import { getRestaurantsCategories } from '../../../lib/queries/queries';
import { DURATIONS } from '../../constants';

export const useGetRestaurantsCategories = () => {
  return useQuery<ICategory[]>(
    'restaurants-categories',
    getRestaurantsCategories,
    { staleTime: DURATIONS.oneHour }
  );
};
