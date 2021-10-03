import { AppBar, Button, Hidden, Stack, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import { useToggleUserDrawer } from '../../hooks/useToggleUserDrawer';
const HomePageNavbar = () => {
  const toggleUserDrawer = useToggleUserDrawer();
  return (
    <AppBar color="transparent" elevation={0} position="static">
      <Toolbar disableGutters sx={{ py: 2 }}>
        <Box flex="1">
          <Image
            src="/assets/homepagelogo.png"
            alt="Sweetat logo"
            height="55px"
            width="187px"
          />
        </Box>
        <Stack direction="row" spacing={2}>
          <Hidden mdDown>
            <Button variant="outlined" endIcon={<KeyboardArrowDownIcon />}>
              Partner with us
            </Button>
          </Hidden>
          <Hidden smDown>
            <Button disableElevation variant="contained">
              Sign up or login
            </Button>
          </Hidden>
          <Hidden mdUp>
            <Button
              onClick={toggleUserDrawer}
              endIcon={<MenuIcon />}
              disableElevation
              variant="contained"
            >
              Menu
            </Button>
          </Hidden>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default HomePageNavbar;
