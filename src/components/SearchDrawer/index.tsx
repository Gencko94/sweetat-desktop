import {
  Drawer,
  Container,
  Typography,
  Stack,
  IconButton,
  ButtonGroup,
  Button,
} from '@mui/material';
import { Box } from '@mui/system';

import CloseIcon from '@mui/icons-material/Close';
import { useApplicationState } from '../../contexts/ApplicationContext';
import SearchBar from '../Searchbar';
import WhiteLogo from '../../svgs/white-logo';
import { useTranslation } from 'react-i18next';
import useGetSearchResults from '../../hooks/queryHooks/useGetSearchResults';
import SearchResults from './SearchResults';
import ShopsViewToggle from '../ShopsViewToggle';
import ItemsViewToggle from '../ItemsViewToggle';

const SearchDrawer = () => {
  const { t } = useTranslation();

  const [state, setState] = useApplicationState();
  const { data, status } = useGetSearchResults({
    query: state.globalSearchValue,
    type: state.globalSearchType,
  });
  return (
    <Drawer
      anchor="bottom"
      open={state.searchMenuOpen}
      onClose={() =>
        setState(prev => ({
          ...prev,
          searchMenuOpen: !prev.searchMenuOpen,
        }))
      }
      //   PaperProps={{ sx: { right: "100px" } }}
    >
      <Container sx={{ py: 1 }}>
        <Box
          sx={{
            maxHeight: `calc(100vh - 245px )`,
            minHeight: `calc(100vh - 245px )`,
            overflowY: 'auto',
            overflowX: 'hidden',
            my: 1,
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
            mx={1}
            justifyContent="space-between"
          >
            <SearchBar />
            <IconButton
              size="small"
              sx={{ color: 'primary.dark' }}
              onClick={() => {
                setState(prev => ({
                  ...prev,
                  searchMenuOpen: !prev.searchMenuOpen,
                }));
              }}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
            my={2}
            mx={1}
            justifyContent="space-between"
          >
            <ButtonGroup>
              <Button
                variant={
                  state.globalSearchType === 'stores' ? 'contained' : 'outlined'
                }
                onClick={() =>
                  setState(prev => ({
                    ...prev,
                    globalSearchType: 'stores',
                  }))
                }
              >
                {t`stores`}
              </Button>
              <Button
                variant={
                  state.globalSearchType === 'items' ? 'contained' : 'outlined'
                }
                onClick={() =>
                  setState(prev => ({
                    ...prev,
                    globalSearchType: 'items',
                  }))
                }
              >
                {t`items`}
              </Button>
            </ButtonGroup>
            {state.globalSearchType === 'stores' ? (
              <ShopsViewToggle />
            ) : (
              <ItemsViewToggle />
            )}
          </Stack>
          {typeof data === 'undefined' && status !== 'loading' && (
            <Box
              alignItems="center"
              justifyContent="center"
              display="flex"
              flexDirection="column"
              py={4}
              px={1}
              m={4}
            >
              <WhiteLogo />
              <Typography textAlign="center" variant="h6" my={2}>
                Enter atleast 3 characters to search...
              </Typography>
            </Box>
          )}
          {/* 💀⚡ TODO : Add a Skeleton loading screen... */}
          {status === 'loading' && 'Loading...'}
          {data && <SearchResults results={data} />}
        </Box>
      </Container>
    </Drawer>
  );
};

export default SearchDrawer;
