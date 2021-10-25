import { ILocalCart } from '../lib/interfaces/cart/ILocalCart';
import { IPaymentMethod } from '../lib/interfaces/cart/IPaymentMethod';
import { IApplicationContextProps } from '../lib/interfaces/IApplicationContext';
import { getLocalCart } from '../utils/getLocalCart';

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
  cart_restaurant: null, // Selected order Restaurant
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
// --- Applies in (categories,promos,featured) slides + DeliverTo + SearchBox
export const HOME_FEED_SPACING_XS = 3;
export const HOME_FEED_SPACING_MD = 4;

// Cart constants

export const NEW_CART_VALUE: ILocalCart = {
  items: [],
  restaurant: null,
};

export const DURATIONS = {
  thirtySeconds: 1000 * 60 * 0.5,
  oneMinute: 1000 * 60 * 1,
  twoMins: 1000 * 60 * 2,
  fiveMins: 1000 * 60 * 5,
  tenMins: 1000 * 60 * 10,
  fifteenMins: 1000 * 60 * 15,
  thirtyMins: 1000 * 60 * 15,
  oneHour: 1000 * 60 * 60,
};

export const PAYMENT_METHODS: IPaymentMethod[] = [
  {
    name: {
      ar: 'فيزا او ماستر كارد',
      en: 'Visa / Mastercard',
    },
    logo: '/assets/master-card.svg',
  },
  {
    name: {
      ar: 'كي-نت',
      en: 'K-Net',
    },
    logo: '/assets/knet.svg',
  },
  {
    name: {
      ar: 'الدفع عند الإستلام',
      en: 'Cash on delivery',
    },
    logo: '',
  },
];
