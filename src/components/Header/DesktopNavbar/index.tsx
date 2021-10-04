import {
  AppBar,
  Button,
  Container,
  Hidden,
  Stack,
  Toolbar,
} from '@mui/material';
import { Box } from '@mui/system';
import { useToggleUserDrawer } from '../../../hooks/useToggleUserDrawer';
import Image from 'next/image';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';

const DesktopNavbar = () => {
  const toggleUserDrawer = useToggleUserDrawer();
  return (
    <AppBar color="inherit" elevation={0} position="static">
      <Container sx={{ maxWidth: { xl: 'xl', lg: 'lg', md: 'md' } }}>
        <Toolbar
          disableGutters
          sx={{
            py: 2,
            // maxWidth: { xl: 'xl', lg: 'lg', md: 'md' },
            // margin: '0 auto',
          }}
        >
          <Box flex="1">
            <Image
              src="/assets/colored-logo.png"
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
      </Container>
    </AppBar>
  );
};

export default DesktopNavbar;
