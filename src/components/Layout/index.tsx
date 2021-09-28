import { CssBaseline, Drawer } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useMemo } from "react";
import { getDesignTokens } from "../../../styles/globalTheme";
import { ApplicationContext } from "../../contexts/ApplicationContext";
import FiltersDrawer from "../FiltersDrawer";
import SearchDrawer from "../SearchDrawer";

const Layout: React.FC = ({ children }) => {
  const { colorMode } = useContext(ApplicationContext);
  const theme = useMemo(() => createTheme(getDesignTokens(colorMode)), [
    colorMode,
  ]);
  return (
    <ThemeProvider theme={theme}>
      <FiltersDrawer />
      <SearchDrawer />
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
