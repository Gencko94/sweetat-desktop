import { AxiosError } from 'axios';
import { QueryOptions, useQuery } from 'react-query';
import { IRestaurantInfo } from '../../../lib/interfaces/IRestaurantInfo';
import { getRestaurantInfo } from '../../../lib/queries/queries';
import { DEFAULT_AREA_COVERAGE_ID } from '../../constants';

export interface IUseGetRestaurantInfoProps {
  slug: string;
  queryOptions?: QueryOptions<IRestaurantInfo, AxiosError | Error>;
}

export const useGetRestaurantInfo = ({
  slug,
  queryOptions,
}: IUseGetRestaurantInfoProps) => {
  const coverage_area_id = DEFAULT_AREA_COVERAGE_ID;
  return useQuery<IRestaurantInfo, AxiosError | Error>(
    [coverage_area_id, '/restaurant', slug],
    () => getRestaurantInfo({ coverage_area_id, slug }),
    queryOptions
  );
};
