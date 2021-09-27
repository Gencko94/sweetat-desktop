import { Container, Divider, IconButton, Stack } from "@mui/material";
import SearchBar from "../../Searchbar";
import MobileNavbar from "../MobileNavbar";
import FilterListIcon from "@mui/icons-material/FilterList";
const MobileHeader = () => {
  return (
    <Container sx={{ p: 1 }}>
      <MobileNavbar />
      <Divider sx={{ my: 1, mx: -2 }} />
      <Stack direction="row" spacing={1}>
        <SearchBar />
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Stack>
    </Container>
  );
};

export default MobileHeader;
