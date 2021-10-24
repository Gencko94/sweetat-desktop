import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { IRestaurantInfo } from '../../../lib/interfaces/IRestaurantInfo';
import { getRestaurantInfo } from '../../../lib/queries/queries';
import { DEFAULT_AREA_COVERAGE_ID } from '../../constants';

export interface IUseGetRestaurantInfoProps {
  slug?: string;
  id?: number;
  queryOptions?: UseQueryOptions<IRestaurantInfo, AxiosError | Error>;
}

export const useGetRestaurantInfo = ({
  slug,
  id,
  queryOptions,
}: IUseGetRestaurantInfoProps) => {
  const coverage_area_id = DEFAULT_AREA_COVERAGE_ID;
  return useQuery<IRestaurantInfo, AxiosError | Error>(
    [coverage_area_id, '/restaurant', slug, id],
    () => getRestaurantInfo({ coverage_area_id, slug, id }),
    queryOptions
  );
};
