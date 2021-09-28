import { InputBase, Paper } from "@mui/material";
import { alpha, styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { ApplicationContext } from "../../contexts/ApplicationContext";
import { useContext } from "react";

const SearchBar = () => {
  const { t } = useTranslation();
  const { globalSearchValue, handleSetGlobalSearchValue } = useContext(
    ApplicationContext
  );
  return (
    <Search elevation={5} sx={{ flex: 1 }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={globalSearchValue}
        onChange={(e) => handleSetGlobalSearchValue(e.target.value)}
        placeholder={t`search-input-placeholder`}
        inputProps={{ "aria-label": "search" }}
        fullWidth
      />
    </Search>
  );
};

export default SearchBar;
const Search = styled(Paper)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  // border: `1px solid ${theme.palette.secondary.main}`,
  // backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  width: "100%",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    //@ts-ignore
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
