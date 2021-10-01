import { Container, Divider, IconButton, Stack } from '@mui/material';
import MobileNavbar from '../MobileNavbar';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useApplicationState } from '../../../contexts/ApplicationContext';
import SearchBox from '../../SearchBox';
import { useCallback } from 'react';

const MobileHeader = () => {
  const [state, setState] = useApplicationState();

  const handleToggleSearchMenu = useCallback(() => {
    setState(prev => ({
      ...prev,
      searchMenuOpen: !prev.searchMenuOpen,
    }));
  }, [setState]);
  return (
    <Container sx={{ py: 1 }}>
      <MobileNavbar />
      <Divider sx={{ my: 1, mx: -2 }} />
      <Stack
        direction="row"
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <SearchBox handleToggleSearchMenu={handleToggleSearchMenu} />

        <IconButton
          onClick={() => {
            setState(prev => ({
              ...prev,
              filtersMenuOpen: !prev.filtersMenuOpen,
            }));
          }}
        >
          <FilterListIcon />
        </IconButton>
      </Stack>
    </Container>
  );
};

export default MobileHeader;
