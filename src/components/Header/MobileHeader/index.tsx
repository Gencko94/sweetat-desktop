import { Container, Divider, IconButton, Stack } from "@mui/material";
import SearchBar from "../../Searchbar";
import MobileNavbar from "../MobileNavbar";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useContext } from "react";
import { ApplicationContext } from "../../../contexts/ApplicationContext";
const MobileHeader = () => {
  const { handleToggleFiltersMenu } = useContext(ApplicationContext);
  return (
    <Container sx={{ p: 1 }}>
      <MobileNavbar />
      <Divider sx={{ my: 1, mx: -2 }} />
      <Stack direction="row" spacing={1}>
        <SearchBar />
        <IconButton
          onClick={() => {
            handleToggleFiltersMenu();
          }}
        >
          <FilterListIcon />
        </IconButton>
      </Stack>
    </Container>
  );
};

export default MobileHeader;
