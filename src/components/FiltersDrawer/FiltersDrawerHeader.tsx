import { IconButton, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
interface IFiltersDrawerHeaderProps {
  handleCloseFiltersMenu: () => void;
}

const FiltersDrawerHeader = ({
  handleCloseFiltersMenu,
}: IFiltersDrawerHeaderProps) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="h5" fontWeight="bold">
        {t`filters`}
      </Typography>
      <IconButton
        sx={{ color: 'primary.dark' }}
        onClick={() => handleCloseFiltersMenu()}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
    </Stack>
  );
};

export default memo(FiltersDrawerHeader);
