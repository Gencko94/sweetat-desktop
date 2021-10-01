import { Container, Divider, IconButton, Stack } from '@mui/material';
import MobileNavbar from '../MobileNavbar';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useApplicationState } from '../../../contexts/ApplicationContext';
import SearchBox from '../../SearchBox';

const MobileHeader = () => {
  const [{}, setState] = useApplicationState();
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
        <SearchBox />

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
