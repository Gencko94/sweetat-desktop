import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { useApplicationState } from '../../contexts/ApplicationContext';
const SearchBox = () => {
  const [{}, setState] = useApplicationState();
  return (
    <Button
      fullWidth
      variant="contained"
      color="inherit"
      disableRipple
      disableElevation
      startIcon={<SearchIcon />}
      sx={{ textTransform: 'none', justifyContent: 'flex-start' }}
      onClick={() => {
        setState(prev => ({
          ...prev,
          searchMenuOpen: !prev.searchMenuOpen,
        }));
      }}
    >
      Click to search
    </Button>
  );
};

export default SearchBox;
