import { IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WhiteLogo from '../../svgs/white-logo';
import { memo } from 'react';

interface IUserDrawerHeaderProps {
  handleCloseUserDrawer: () => void;
}

const UserDrawerHeader = ({
  handleCloseUserDrawer,
}: IUserDrawerHeaderProps) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <WhiteLogo />
      <IconButton
        sx={{ color: 'primary.dark' }}
        onClick={() => handleCloseUserDrawer()}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
    </Stack>
  );
};

export default memo(UserDrawerHeader);
