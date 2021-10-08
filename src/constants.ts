import { IApplicationContextProps } from '../lib/interfaces/IApplicationContext';

export const PRIMARY_COLOR = '#FE3DBC';
export const DEFAULT_LAT = 29.3352938;
export const DEFAULT_LNG = 48.0715612;
export const FILTER_TYPES: {
  label: string;
  key: 'is_featured' | 'free_delivery';
}[] = [
  { label: 'featured', key: 'is_featured' },
  { label: 'free-delivery', key: 'free_delivery' },
];
export const INITIAL_STATE: IApplicationContextProps = {
  colorMode: 'light',
  userAddress: null,
  userLocation: null,
  filtersMenuOpen: false,
  // globalFilters: {
  //   filters: { category_ids: [] },
  //   page: 0,
  //   sort_by: 'delivery_time',
  // },
  searchMenuOpen: false,
  globalSearchValue: '',
  globalSearchType: 'stores',
  itemsView: 'normal',
  shopsView: 'wide',
  userDrawerOpen: false,
  restaurantsQuery: {
    category_ids: [],
    sort_by: 'delivery_time',
    free_delivery: true,
    is_featured: true,
  },
};
export const FOOTER_LINKS: { href: string; label: string }[] = [
  {
    href: '/',
    label: 'browse-restaurants',
  },
  {
    href: '/',
    label: 'tos',
  },
  {
    href: '/',
    label: 'about-us',
  },
  {
    href: '/',
    label: 'contact-us',
  },
];
