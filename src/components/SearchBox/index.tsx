import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { memo } from 'react';

interface ISearchBoxState {
  handleToggleSearchMenu: () => void;
}

const SearchBox = memo(({ handleToggleSearchMenu }: ISearchBoxState) => {
  return (
    <Button
      fullWidth
      variant="contained"
      color="inherit"
      disableRipple
      disableElevation
      startIcon={<SearchIcon />}
      sx={{ textTransform: 'none', justifyContent: 'flex-start' }}
      onClick={() => handleToggleSearchMenu()}
    >
      Click to search
    </Button>
  );
});

export default SearchBox;
