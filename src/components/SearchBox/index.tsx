import { Button, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import { ApplicationContext } from "../../contexts/ApplicationContext";
const SearchBox = () => {
  const { handleToggleSearchMenu } = useContext(ApplicationContext);
  return (
    <Button
      fullWidth
      variant="contained"
      color="inherit"
      disableRipple
      disableElevation
      startIcon={<SearchIcon />}
      sx={{ textTransform: "none", justifyContent: "flex-start" }}
      onClick={() => {
        handleToggleSearchMenu();
      }}
    >
      Click to search
    </Button>
  );
};

export default SearchBox;
