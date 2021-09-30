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
  userAddress: IUSER_ADDRESS | null | undefined;
  userLocation: POSITION_COORDS | null;
  filtersMenuOpen: boolean;
  globalFilters: IUseGetRestaurantsProps;
  searchMenuOpen: boolean;
  globalSearchValue: string;
  globalSearchType: SEARCH_TYPE;
  shopsView: SHOP_VIEW;
  itemsView: ITEM_VIEW;
}
