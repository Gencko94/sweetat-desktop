import { createContext, useCallback, useEffect, useState } from "react";
import { IApplicationContextProps } from "../../lib/interfaces/IApplicationContext";

import { IUseGetRestaurantsProps } from "../hooks/queryHooks/useGetRestaurants";
import { useGetUserAddress } from "../hooks/queryHooks/useGetUserAddress";
// import { getInitialColorMode } from "../helpers/getInitialColorMode";

export type COLOR_MODES = "light" | "dark";

export type POSITION_COORDS = {
  lat: number;
  lng: number;
};
export type SEARCH_TYPE = "stores" | "items";

export const ApplicationContext = createContext<IApplicationContextProps>({
  colorMode: "dark",
  handleSetUserLocation: () => {},
  handleToggleColorMode: () => {},
  userAddress: null,
  userLocation: null,
  filtersMenuOpen: false,
  handleToggleFiltersMenu: () => {},
  handleSetGlobalFilters: () => {},
  globalFilters: {
    filters: { category_ids: [] },
    page: 0,
    sort_by: "delivery_time",
  },
  handleToggleSearchMenu: () => {},
  searchMenuOpen: false,
  handleSetGlobalSearchValue: () => {},
  globalSearchValue: "",
  globalSearchType: "stores",
  handleSetGlobalSearchType: () => {},
});

const ApplicationProvider: React.FC = ({ children }) => {
  // 📍 User coordinates state.
  const [userLocation, setUserLocation] = useState<POSITION_COORDS | null>(
    null
  );

  // 🌎 Global shop filter state.
  const [globalFilters, setGlobalFilters] = useState<IUseGetRestaurantsProps>({
    filters: { category_ids: ["3"] },
    page: 0,
    sort_by: "delivery_time",
  });

  // 🌎🔎 Global search value state.
  const [globalSearchValue, setGlobalSearchValue] = useState<string>("");

  // 🌎 🔎 🌀 Global search type state.
  const [globalSearchType, setGlobalSearchType] = useState<SEARCH_TYPE>(
    "stores"
  );

  // 💫 filters menu (drawer) state.
  const [filtersMenuOpen, setFiltersMenuOpen] = useState<boolean>(false);

  // 🔎 Search menu (drawer) state.
  const [searchMenuOpen, setSearchMenuOpen] = useState<boolean>(false);

  // 🍁 global application address
  const { data: userAddress } = useGetUserAddress({
    lat: userLocation?.lat,
    lng: userLocation?.lng,
  });

  // 🎨 Application color mode (Dark or light).
  const [colorMode, setColorMode] = useState<COLOR_MODES>(
    // getInitialColorMode()
    "light"
  );

  // 🏭 🔥 state handlers...
  const handleSetGlobalFilters = (filters: IUseGetRestaurantsProps) => {
    setGlobalFilters(filters);
  };
  function handleToggleColorMode() {
    setColorMode(colorMode === "dark" ? "light" : "dark");
  }
  const handleSetUserLocation = (position: POSITION_COORDS) => {
    setUserLocation(position);
  };
  const handleToggleFiltersMenu = () => {
    setFiltersMenuOpen(!filtersMenuOpen);
  };
  const handleToggleSearchMenu = () => {
    setSearchMenuOpen(!searchMenuOpen);
  };
  const handleSetGlobalSearchValue = (value: string) => {
    setGlobalSearchValue(value);
  };
  const handleSetGlobalSearchType = (type: SEARCH_TYPE) => {
    setGlobalSearchType(type);
  };

  // 📍 Geolocation getter function.
  const getCurrentLocation = useCallback(async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleSetUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (_err) => {}
      );
    }
  }, []);

  useEffect(() => {
    // 🔃 On App initialization, get user current location.
    getCurrentLocation();
  }, [getCurrentLocation]);
  return (
    <ApplicationContext.Provider
      value={{
        handleToggleColorMode,
        colorMode,
        userLocation,
        userAddress,
        handleSetUserLocation,
        filtersMenuOpen,
        handleToggleFiltersMenu,
        globalFilters,
        handleSetGlobalFilters,
        handleToggleSearchMenu,
        searchMenuOpen,
        globalSearchValue,
        handleSetGlobalSearchValue,
        globalSearchType,
        handleSetGlobalSearchType,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationProvider;
