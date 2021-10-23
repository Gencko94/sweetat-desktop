import { IApplicationContextProps } from '../lib/interfaces/IApplicationContext';

export const PRIMARY_COLOR = '#FE3DBC';
export const PRIMARY_LINEAR_GRADIENT_VALUE =
  'linear-gradient(to left , #FE3DBC , #FFB90E)';
export const DEFAULT_LAT = 29.3352938;
export const DEFAULT_LNG = 48.0715612;
export const DEFAULT_AREA_COVERAGE_ID = 10;
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
  searchMenuOpen: false,
  globalSearchValue: '',
  globalSearchType: 'stores',
  itemsView: 'normal',
  shopsView: 'wide',
  userDrawerOpen: false,
  selectedItem: null, // Selected Item that shows in item dialog
  itemDialogOpen: false,
  shownCategories: [],
  cartAlertState: {
    open: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    cb: () => {},
  },
  restaurantsQuery: {
    category_ids: [],
    sort_by: 'delivery_time',
  },
};
export const LOCAL_STORAGE_CART_KEY = 'swlcct';
export const LOCAL_STORAGE_USER_LOCATION_KEY = 'swul';
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
// 📏 MaxWidth for screens (++XL).
export const XL_MAX_WIDTH = '1820px';

// 🌌 Spacing between home feed components.
// --- Applies in (categories,promos,features) slides + DeliverTo + SearchBox
export const HOME_FEED_SPACING_XS = 3;
export const HOME_FEED_SPACING_MD = 4;

// Cart constants

export const NEW_CART_VALUE = {
  items: [],
  restaurant_id: null,
};

// Auth Constants

export const TOKEN_LOCAL_STORAGE_KEY = 'swtkn';

export const DURATIONS = {
  twoMins: 1000 * 60 * 2,
  fiveMins: 1000 * 60 * 5,
  tenMins: 1000 * 60 * 10,
  fifteenMins: 1000 * 60 * 15,
  thirtyMins: 1000 * 60 * 15,
  oneHour: 1000 * 60 * 60,
};
