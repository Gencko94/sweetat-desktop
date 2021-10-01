import { IconButton, Stack } from '@mui/material';
import DeliverTo from '../../DeliverTo';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonIcon from '@mui/icons-material/Person';
import { memo } from 'react';
import { useApplicationState } from '../../../contexts/ApplicationContext';

const MobileNavbar = memo(() => {
  const [{}, setState] = useApplicationState();
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <DeliverTo />
      <Stack direction="row" spacing={1}>
        <IconButton>
          <LocalMallIcon fontSize="medium" />
        </IconButton>
        <IconButton
          onClick={() =>
            setState(prev => ({
              ...prev,
              userDrawerOpen: !prev.userDrawerOpen,
            }))
          }
        >
          <PersonIcon fontSize="medium" />
        </IconButton>
      </Stack>
    </Stack>
  );
});

export default MobileNavbar;
