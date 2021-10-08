import { IconButton, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useApplicationState } from '../../contexts/ApplicationContext';

const FiltersDrawerHeader = () => {
  const [state, setState] = useApplicationState();
  const { t } = useTranslation();
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="h5" fontWeight="bold">
        {t`filters`}
      </Typography>
      <IconButton
        sx={{ color: 'primary.dark' }}
        onClick={() =>
          setState(prev => ({
            ...prev,
            filtersMenuOpen: !state.filtersMenuOpen,
          }))
        }
      >
        <CloseIcon fontSize="large" />
      </IconButton>
    </Stack>
  );
};

export default memo(FiltersDrawerHeader);
