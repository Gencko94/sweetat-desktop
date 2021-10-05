import { Box, styled } from '@mui/system';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Autocomplete,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useRouter } from 'next/dist/client/router';

import { Fragment, useState } from 'react';
import { useApplicationState } from '../../../contexts/ApplicationContext';
import { convertCoordinateToAddress } from '../../../../lib/queries/queries';
import { LoadingButton } from '@mui/lab';

const HeroContent = () => {
  const { locale, push } = useRouter();
  const [open, setOpen] = useState(false);
  const [state, setState] = useApplicationState();

  const {
    ready,
    value,
    suggestions: { data, loading },
    setValue,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore-next-line
      location: {
        lat: () => 29.3759,
        lng: () => 47.9774,
      },
      radius: 60 * 1000,
    },
    debounce: 300,
  });

  const handleAutoCompleteValueChange = async (value: string) => {
    try {
      const geoCodeResults = await getGeocode({ address: value });
      console.log(geoCodeResults, 'geo code results');
      const { lat, lng } = await getLatLng(geoCodeResults[0]);
      const userAddress = await convertCoordinateToAddress({
        lat,
        lng,
        lang: locale as string,
      });
      setState(prev => ({
        ...prev,
        userAddress,
        userLocation: { lat, lng },
      }));
      push('/shop/bora-bora-dehj12hgkf4tbrc');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Wrapper>
      <Typography
        textAlign={{ lg: 'unset', xs: 'center' }}
        fontWeight="bold"
        variant="h3"
        component="h1"
      >
        Your favourite restaurants and takeaways, delivered to your door
      </Typography>
      <Box component={Paper} elevation={0} my={6} p={4}>
        <Typography
          textAlign={{ lg: 'unset', xs: 'center' }}
          fontWeight="medium"
          variant="subtitle1"
          mb={2}
        >
          Enter your address to find local restaurants
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 2, md: 3 }}
        >
          <Autocomplete
            fullWidth
            disabled={!ready}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            isOptionEqualToValue={(option, value) =>
              option.description === value.description
            }
            getOptionLabel={option => {
              return option.description;
            }}
            onChange={(event, newInputValue) => {
              if (newInputValue) {
                handleAutoCompleteValueChange(newInputValue?.description);
              }
            }}
            options={data}
            loading={loading}
            size="small"
            renderInput={params => (
              <TextField
                onChange={e => {
                  setValue(e.target.value);
                }}
                value={value}
                {...params}
                size="small"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : (
                        <IconButton color="primary">
                          <MyLocationIcon />
                        </IconButton>
                      )}
                    </Fragment>
                  ),
                }}
              />
            )}
          />

          <LoadingButton loading={loading} size="medium" variant="contained">
            Search
          </LoadingButton>
        </Stack>
      </Box>
    </Wrapper>
  );
};

export default HeroContent;

const Wrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    width: '50%',
    margin: theme.spacing(18, 0),
  },
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    margin: theme.spacing(10, 0),
  },
}));
