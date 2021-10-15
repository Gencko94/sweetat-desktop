import { SORT_BY_OPTIONS } from '../../src/components/FiltersDrawer/FiltersDrawerBody';
import {
  COLOR_MODES,
  ITEM_VIEW,
  POSITION_COORDS,
  SEARCH_TYPE,
  SHOP_VIEW,
} from '../../src/contexts/ApplicationContext';
import { ITEM } from './IRestaurantItem';
import { IUSER_ADDRESS } from './IUserAddress';

export interface IApplicationContextProps {
  itemDialogOpen: boolean;
  selectedItem: ITEM | null;
  colorMode: COLOR_MODES;
  userAddress: IUSER_ADDRESS | null | undefined;
  userLocation: POSITION_COORDS | null;
  filtersMenuOpen: boolean;
  searchMenuOpen: boolean;
  globalSearchValue: string;
  globalSearchType: SEARCH_TYPE;
  shopsView: SHOP_VIEW;
  itemsView: ITEM_VIEW;
  userDrawerOpen: boolean;
  restaurantsQuery: {
    category_ids: number[];
    is_featured: boolean;
    free_delivery: boolean;
    sort_by: SORT_BY_OPTIONS;
  };
}
