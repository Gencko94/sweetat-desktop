import {
  AppBar,
  Button,
  Container,
  Hidden,
  Stack,
  Toolbar,
} from '@mui/material';
import { Box } from '@mui/system';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import { useToggleUserDrawer } from '../../hooks/useToggleUserDrawer';

interface INavBarProps {
  withBorderBottom?: boolean;
  withSearch?: boolean;
  withJoinus?: boolean;
  withAuth?: boolean;
  withMenu?: boolean;
  logoVariant: 'white' | 'colored';
  variant: 'contained' | 'normal';
}

const Navbar = ({
  withBorderBottom,
  withAuth,
  withJoinus,
  withMenu,
  withSearch,
  logoVariant,
  variant,
}: INavBarProps) => {
  const toggleUserDrawer = useToggleUserDrawer();
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
              ? { xl: 'xl', lg: 'lg', md: 'md' }
              : { xs: '100%' },
        }}
      >
        <Toolbar disableGutters sx={{ py: 2 }}>
          <Box flex="1">
            <Image
              src={`/assets/${
                logoVariant === 'white'
                  ? 'homepagelogo.png'
                  : 'colored-logo.png'
              }`}
              alt="Sweetat logo"
              height="55px"
              width="187px"
            />
          </Box>
          <Stack direction="row" spacing={2}>
            {withJoinus && (
              <Hidden mdDown>
                <Button variant="outlined" endIcon={<KeyboardArrowDownIcon />}>
                  Partner with us
                </Button>
              </Hidden>
            )}
            {withAuth && (
              <Hidden smDown>
                <Button disableElevation variant="contained">
                  Sign up or login
                </Button>
              </Hidden>
            )}
            {withMenu && (
              <Button
                onClick={toggleUserDrawer}
                endIcon={<MenuIcon />}
                disableElevation
                variant="contained"
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
