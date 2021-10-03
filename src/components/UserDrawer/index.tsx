import { Container, Drawer } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import { useCallback } from 'react';
import { useApplicationState } from '../../contexts/ApplicationContext';
import UserDrawerBody from './UserDrawerBody';
import UserDrawerHeader from './UserDrawerHeader';

const UserDrawer = () => {
  const { locale } = useRouter();
  const [state, setState] = useApplicationState();
  const handleCloseUserDrawer = useCallback(() => {
    setState(prev => ({
      ...prev,
      userDrawerOpen: !prev.userDrawerOpen,
    }));
  }, [setState]);
  return (
    <Drawer
      anchor={locale === 'en' ? 'right' : 'left'}
      open={state.userDrawerOpen}
      onClose={() => handleCloseUserDrawer()}
      //   PaperProps={{ sx: { right: "100px" } }}
    >
      <Container sx={{ p: 2, minWidth: { md: '400px', xs: '350px' } }}>
        <UserDrawerHeader handleCloseUserDrawer={handleCloseUserDrawer} />
        <UserDrawerBody />
      </Container>
    </Drawer>
  );
};

export default UserDrawer;
