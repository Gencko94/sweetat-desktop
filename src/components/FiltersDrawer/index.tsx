import { Drawer, Container } from '@mui/material';
import { useApplicationState } from '../../contexts/ApplicationContext';
import { useRouter } from 'next/dist/client/router';
import FiltersDrawerHeader from './FiltersDrawerHeader';
import FiltersDrawerBody from './FiltersDrawerBody';

const FiltersDrawer = () => {
  const { locale } = useRouter();
  const [state, setState] = useApplicationState();

  return (
    <Drawer
      anchor={locale === 'en' ? 'right' : 'left'}
      open={state.filtersMenuOpen}
      onClose={() =>
        setState(prev => ({
          ...prev,
          filtersMenuOpen: !prev.filtersMenuOpen,
        }))
      }
    >
      <Container sx={{ p: 2, minWidth: { md: '400px', xs: '300px' } }}>
        <FiltersDrawerHeader />
        <FiltersDrawerBody />
      </Container>
    </Drawer>
  );
};

export default FiltersDrawer;
