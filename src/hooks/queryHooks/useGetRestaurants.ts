import { useInfiniteQuery } from 'react-query';
import { IRestaurantInfo } from '../../../lib/interfaces/IRestaurantInfo';
import { getRestaurants } from '../../../lib/queries/queries';

export interface IUseGetRestaurantsProps {
  coverage_area_id: number;
  page: number;
  results_per_page: number;
  filters: {
    category_ids: string[];
    is_featured?: boolean;
    free_delivery?: boolean;
  };
  sort_by?: 'delivery_time' | 'asc' | 'desc' | 'ar_asc' | 'ar_desc';
}

interface IUseGetRestaurantsResponse {
  current_page: number;
  last_page: number;
  total: number;
  data: IRestaurantInfo[];
}

export const useGetRestaurants = ({
  filters,
  coverage_area_id,
  results_per_page,
  sort_by,
}: Omit<IUseGetRestaurantsProps, 'page'>) => {
  return useInfiniteQuery<IUseGetRestaurantsResponse>(
    [filters, coverage_area_id, results_per_page, sort_by, 'restaurants'],
    ({ pageParam = 1 }) =>
      getRestaurants({
        filters,
        coverage_area_id,
        results_per_page,
        sort_by,
        page: pageParam,
      })
  );
};
