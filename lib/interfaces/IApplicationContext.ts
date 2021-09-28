import {
  COLOR_MODES,
  POSITION_COORDS,
  SEARCH_TYPE,
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
}
