import { Button, Stack, Theme, Typography, useMediaQuery } from '@mui/material';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { useApplicationState } from '../../contexts/ApplicationContext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { HOME_FEED_SPACING_XS } from '../../constants';
import MapModal from '../MapModal';
import { useCallback, useState } from 'react';
const DeliverTo = () => {
  const { t } = useTranslation();
  const [state] = useApplicationState();
  const [mapOpen, setMapOpen] = useState(false);
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const handleCloseMap = useCallback(() => {
    setMapOpen(prev => !prev);
  }, []);
  return (
    <>
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
          <Button
            disableRipple
            onClick={() => {
              if (isDesktop) {
                setMapOpen(true);
              }
            }}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {state.userAddress
              ? state.userAddress.address
              : 'Select your location'}
          </Button>
        </Stack>
      </Stack>
      <MapModal open={mapOpen} handleCloseMap={handleCloseMap} />
    </>
  );
};

export default DeliverTo;
