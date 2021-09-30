import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useMemo } from "react";
import { getDesignTokens } from "../../../styles/globalTheme";
import { useApplicationState } from "../../contexts/ApplicationContext";
import FiltersDrawer from "../FiltersDrawer";
import SearchDrawer from "../SearchDrawer";

const Layout: React.FC = ({ children }) => {
  const [state] = useApplicationState();
  const theme = useMemo(() => createTheme(getDesignTokens(state.colorMode)), [
    state.colorMode,
  ]);
  return (
    <ThemeProvider theme={theme}>
      <FiltersDrawer />
      <SearchDrawer />
      <CssBaseline />
      {children}
      <style global jsx>
        {`
          html {
            scroll-behavior: smooth;
          }
        `}
      </style>
    </ThemeProvider>
  );
};

export default Layout;
