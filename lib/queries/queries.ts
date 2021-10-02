import axios from 'axios';
import { SEARCH_TYPE } from '../../src/contexts/ApplicationContext';
import { IUseGetRestaurantInfoProps } from '../../src/hooks/queryHooks/useGetRestaurantInfo';
import { IUseGetRestaurantItemsProps } from '../../src/hooks/queryHooks/useGetRestaurantItems';
import { IUseGetRestaurantsProps } from '../../src/hooks/queryHooks/useGetRestaurants';
import { IItemsSearchResult } from '../interfaces/IItem';
import { IRestaurantInfo } from '../interfaces/IRestaurantInfo';
import { getSession } from 'next-auth/react';
const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

export const getCategorySlides = async () => {
  const res = await instance.post('/get-restaurant-category-slides');
  return res.data;
};
export const getPromoSlides = async () => {
  const res = await instance.post('/promo-slider');
  return res.data.otherSlides;
};
export const getRestaurants = async ({
  filters,
  page,
  sort_by,
  latitude,
  longitude,
}: IUseGetRestaurantsProps) => {
  const res = await instance.post('/get-filtered-restaurants', {
    latitude,
    longitude,
    filters,
    sort_by,
    page,
  });
  return res.data;
};
export const getRestaurantInfo = async ({
  slug,
  latitude,
  longitude,
}: IUseGetRestaurantInfoProps) => {
  const res = await instance.post(`/get-restaurant-info/${slug}`, {
    latitude,
    longitude,
  });
  return res.data;
};
export const getRestaurantItems = async ({
  slug,
  locale,
}: { locale: string } & IUseGetRestaurantItemsProps) => {
  const res = await instance.post(
    `/get-restaurant-items/${locale}/${slug}`,
    {}
  );
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
  const res = await instance.post('/coordinate-to-address', {
    lat,
    lng,
    lang: lang.toUpperCase(),
  });
  return res.data;
};
export const getRestaurantsCategories = async () => {
  const res = await instance.post('/get-all-restaurants-categories');
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
    const res = await instance.post<IItemsSearchResult[]>('/search-items', {
      q: query,
      latitude,
      longitude,
      page,
    });
    return res.data;
  } else {
    const res = await instance.post<IRestaurantInfo[]>('/search-restaurants', {
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
  console.log(session);
  const res = await instance.post('/get-single-item', { id });
  return res.data;
};
