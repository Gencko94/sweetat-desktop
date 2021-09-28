import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IUSER_ADDRESS } from "../../lib/interfaces/IUserAddress";
// import { getInitialColorMode } from "../helpers/getInitialColorMode";
import { getDesignTokens } from "../../styles/globalTheme";
import { useGetUserAddress } from "../hooks/queryHooks/useGetUserAddress";

export type COLOR_MODES = "light" | "dark";

export type POSITION_COORDS = {
  lat: number;
  lng: number;
};
interface ContextProps {
  colorMode: COLOR_MODES;
  handleToggleColorMode: () => void;
  userAddress: IUSER_ADDRESS | null | undefined;
  handleSetUserLocation: (position: POSITION_COORDS) => void;
  userLocation: POSITION_COORDS | null;
  filtersOpen: boolean;
  handleToggleFiltersMenu: () => void;
}
export const ApplicationContext = createContext<ContextProps>({
  colorMode: "dark",
  handleSetUserLocation: () => {},
  handleToggleColorMode: () => {},
  userAddress: null,
  userLocation: null,
  filtersOpen: false,
  handleToggleFiltersMenu: () => {},
});

const ApplicationProvider: React.FC = ({ children }) => {
  const [userLocation, setUserLocation] = useState<POSITION_COORDS | null>(
    null
  );
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const { data: userAddress } = useGetUserAddress({
    lat: userLocation?.lat,
    lng: userLocation?.lng,
  });
  const [colorMode, setColorMode] = useState<COLOR_MODES>(
    // getInitialColorMode()
    "light"
  );

  function handleToggleColorMode() {
    setColorMode(colorMode === "dark" ? "light" : "dark");
  }
  const handleSetUserLocation = (position: POSITION_COORDS) => {
    setUserLocation(position);
  };
  const handleToggleFiltersMenu = () => {
    setFiltersOpen(!filtersOpen);
  };
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
        filtersOpen,
        handleToggleFiltersMenu,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationProvider;
