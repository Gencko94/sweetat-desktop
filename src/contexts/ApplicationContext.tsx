import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
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
  userAddress: IUSER_ADDRESS | undefined;
  handleSetUserLocation: (position: POSITION_COORDS) => void;
  userLocation: POSITION_COORDS | null;
}
export const ApplicationContext = createContext<Partial<ContextProps>>({});

const ApplicationProvider: React.FC = ({ children }) => {
  const [userLocation, setUserLocation] = useState<POSITION_COORDS | null>(
    null
  );
  const { data: userAddress } = useGetUserAddress({
    lat: userLocation?.lat,
    lng: userLocation?.lng,
  });
  const [colorMode, setColorMode] = useState<COLOR_MODES>(
    // getInitialColorMode()
    "light"
  );
  const theme = useMemo(() => createTheme(getDesignTokens(colorMode)), [
    colorMode,
  ]);
  function handleToggleColorMode() {
    setColorMode(colorMode === "dark" ? "light" : "dark");
  }
  const handleSetUserLocation = (position: POSITION_COORDS) => {
    setUserLocation(position);
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
      }}
    >
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ApplicationContext.Provider>
  );
};

export default ApplicationProvider;
