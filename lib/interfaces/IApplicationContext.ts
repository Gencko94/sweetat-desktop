import {
  COLOR_MODES,
  ITEM_VIEW,
  POSITION_COORDS,
  SEARCH_TYPE,
  SHOP_VIEW,
} from "../../src/contexts/ApplicationContext";
import { IUseGetRestaurantsProps } from "../../src/hooks/queryHooks/useGetRestaurants";
import { IUSER_ADDRESS } from "./IUserAddress";

export interface IApplicationContextProps {
  colorMode: COLOR_MODES;
  handleToggleColorMode: () => void;
  userAddress: IUSER_ADDRESS | null | undefined;
  handleSetUserLocation: (position: POSITION_COORDS) => void;
  userLocation: POSITION_COORDS | null;
  filtersMenuOpen: boolean;
  handleToggleFiltersMenu: () => void;
  handleSetGlobalFilters: (filters: IUseGetRestaurantsProps) => void;
  globalFilters: IUseGetRestaurantsProps;
  searchMenuOpen: boolean;
  handleToggleSearchMenu: () => void;
  handleSetGlobalSearchValue: (value: string) => void;
  globalSearchValue: string;
  globalSearchType: SEARCH_TYPE;
  handleSetGlobalSearchType: (type: SEARCH_TYPE) => void;
  shopsView: SHOP_VIEW;
  handleSetShopsView: (view: SHOP_VIEW) => void;
  itemsView: ITEM_VIEW;
  handleSetItemsView: (view: ITEM_VIEW) => void;
}
