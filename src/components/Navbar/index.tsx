import {
  AppBar,
  Button,
  Container,
  Hidden,
  Stack,
  Theme,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import { Box } from '@mui/system';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import { useToggleUserDrawer } from '../../hooks/useToggleUserDrawer';
import { DURATIONS, XL_MAX_WIDTH } from '../../constants';
import SearchBox from '../SearchBox';
import { useSession } from '../../hooks/useSession';

interface INavBarProps {
  withBorderBottom?: boolean;
  withSearch?: boolean;
  withJoinus?: boolean;
  withAuth?: boolean;
  withMenu?: boolean;
  logoVariant: 'white' | 'colored';
  variant: 'contained' | 'normal';
  buttonsColor?: 'normal' | 'white';
}

const Navbar = ({
  withBorderBottom,
  withAuth,
  withJoinus,
  withMenu,
  withSearch,
  logoVariant,
  variant,
  buttonsColor,
}: INavBarProps) => {
  const toggleUserDrawer = useToggleUserDrawer();
  const { session } = useSession({
    required: false,
    queryConfig: { staleTime: DURATIONS.twoMins },
  });
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  return (
    <AppBar
      color="transparent"
      elevation={0}
      position="static"
      sx={
        withBorderBottom
          ? {
              borderBottom: theme => `1px solid ${theme.palette.divider}`,
            }
          : {}
      }
    >
      <Container
        sx={{
          maxWidth:
            variant === 'contained'
              ? { xl: XL_MAX_WIDTH, lg: 'lg' }
              : { xs: '100%' },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            py: 2,
            px: 0,
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Image
              src={`/assets/${
                logoVariant === 'white'
                  ? 'homepagelogo.png'
                  : 'colored-logo.png'
              }`}
              alt="Sweetat logo"
              height={isDesktop ? '45px' : '45px'}
              width={isDesktop ? '150px' : '150px'}
            />
          </Box>
          {withSearch && (
            <Hidden mdDown>
              <Box flexBasis="40%">
                <SearchBox />
              </Box>
            </Hidden>
          )}
          <Stack direction="row" spacing={2}>
            {withJoinus && (
              <Hidden mdDown>
                <Button
                  size="large"
                  variant="outlined"
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  Partner with us
                </Button>
              </Hidden>
            )}
            {withAuth && !session?.user && (
              <Hidden smDown>
                <Button disableElevation variant="contained">
                  Sign up or login
                </Button>
              </Hidden>
            )}
            {withMenu && (
              <Button
                sx={{
                  color: buttonsColor === 'white' ? '#fff' : 'primary',
                  borderColor: buttonsColor === 'white' ? '#fff' : 'primary',
                }}
                onClick={toggleUserDrawer}
                endIcon={<MenuIcon />}
                disableElevation
                variant="outlined"
              >
                Menu
              </Button>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
