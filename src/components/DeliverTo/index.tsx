import { IconButton, Stack, Typography } from '@mui/material';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { useApplicationState } from '../../contexts/ApplicationContext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { HOME_FEED_SPACING_XS } from '../../constants';
const DeliverTo = () => {
  const { t } = useTranslation();
  const [state] = useApplicationState();
  return (
    <Stack
      direction="row"
      display="flex"
      alignItems="center"
      spacing={1}
      my={{ xs: HOME_FEED_SPACING_XS - 1 }}
      mt={{ md: 0 }}
    >
      <Image
        src="/assets/kuwait.svg"
        alt="Kuwait flag"
        width={40}
        height={40}
      />
      <Stack spacing={0}>
        <Typography variant="subtitle2">{t('deliver-to')}</Typography>
        <Stack direction="row" alignItems="center">
          <Typography variant="subtitle1" color="primary" fontWeight="bold">
            {state.userAddress
              ? state.userAddress.address
              : 'Select your location'}
          </Typography>
          <IconButton color="primary" size="small">
            <KeyboardArrowDownIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DeliverTo;
