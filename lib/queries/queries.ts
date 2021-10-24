import { SEARCH_TYPE } from '../../src/contexts/ApplicationContext';
import { IUseGetRestaurantInfoProps } from '../../src/hooks/queryHooks/useGetRestaurantInfo';
import { IUseGetRestaurantItemsProps } from '../../src/hooks/queryHooks/useGetRestaurantItems';
import { IUseGetRestaurantsProps } from '../../src/hooks/queryHooks/useGetRestaurants';
import { IItemsSearchResult } from '../interfaces/IItem';
import { IRestaurantInfo } from '../interfaces/IRestaurantInfo';
import { getSession } from 'next-auth/react';
import axios from '../../utils/axios';
import { IUSER_ADDRESS } from '../interfaces/IUserAddress';

export const getCategorySlides = async () => {
  const res = await axios.post('/get-restaurant-category-slides');
  return res.data;
};
export const getPromoSlides = async () => {
  const res = await axios.post('/promo-slider');
  return res.data.otherSlides;
};
export const getRestaurants = async ({
  filters,
  results_per_page,
  sort_by,
  coverage_area_id,
}: IUseGetRestaurantsProps) => {
  const res = await axios.post('/restaurants/filter', {
    filters,
    // sort_by,
    results_per_page,
    coverage_area_id,
  });
  return res.data;
};

export const getRestaurantInfo = async ({
  slug,
  id,
  coverage_area_id,
}: {
  slug?: string;
  id?: number;
  coverage_area_id: number;
}) => {
  const res = await axios.post(`/restaurant`, {
    coverage_area_id,
    slug,
    id,
  });
  return res.data;
};
export const getRestaurantItems = async ({
  slug,
  locale,
}: { locale: string } & IUseGetRestaurantItemsProps) => {
  const res = await axios.post(`/get-restaurant-items/${locale}/${slug}`, {});
  return res.data;
};

export const convertCoordinateToAddress = async ({
  lang,
  lng,
  lat,
}: {
  lang: string;
  lat?: number;
  lng?: number;
}) => {
  const res = await axios.post<IUSER_ADDRESS>('/coordinate-to-address', {
    lat,
    lng,
    lang: lang.toUpperCase(),
  });
  return res.data;
};
export const getRestaurantsCategories = async () => {
  const res = await axios.post('/get-all-restaurants-categories');
  return res.data.categories;
};
export const getSearchResults = async (
  query: string,
  type: SEARCH_TYPE,
  latitude: number,
  longitude: number,
  page: number
) => {
  if (type === 'items') {
    const res = await axios.post<IItemsSearchResult[]>('/search-items', {
      q: query,
      latitude,
      longitude,
      page,
    });
    return res.data;
  } else {
    const res = await axios.post<IRestaurantInfo[]>('/search-restaurants', {
      q: query,
      latitude,
      longitude,
      page,
    });
    return res.data;
  }
};
export const getSingleItem = async (id: number) => {
  const session = await getSession();
  const res = await axios.post('/get-single-item', { id });
  return res.data;
};
