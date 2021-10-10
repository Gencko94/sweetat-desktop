import { Button, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { memo } from 'react';
import { useApplicationState } from '../../contexts/ApplicationContext';
import FilterListIcon from '@mui/icons-material/FilterList';
import { HOME_FEED_SPACING_XS } from '../../constants';

interface ISearchBoxProps {
  withFilters?: boolean;
}

const SearchBox = memo(({ withFilters }: ISearchBoxProps) => {
  const [state, setState] = useApplicationState();

  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="space-between"
      my={{ xs: HOME_FEED_SPACING_XS - 1, md: 0 }}
    >
      <Button
        fullWidth
        variant="contained"
        color="inherit"
        disableRipple
        size="large"
        disableElevation
        startIcon={<SearchIcon fontSize="small" />}
        sx={{ justifyContent: 'flex-start' }}
        onClick={() =>
          setState(prev => ({
            ...prev,
            searchMenuOpen: !state.searchMenuOpen,
          }))
        }
      >
        Search Shops, Dishes...
      </Button>
      {withFilters && (
        <Button
          variant="contained"
          color="inherit"
          disableElevation
          // sx={{ border: 1, borderRadius: '6px' }}
          onClick={() => {
            setState(prev => ({
              ...prev,
              filtersMenuOpen: !state.filtersMenuOpen,
            }));
          }}
        >
          <FilterListIcon />
        </Button>
      )}
    </Stack>
  );
});

export default SearchBox;
