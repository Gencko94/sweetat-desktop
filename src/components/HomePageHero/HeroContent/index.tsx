import { Box, styled } from '@mui/system';
import { Paper, Typography } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import { useApplicationState } from '../../../contexts/ApplicationContext';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import PlacesAutoCompleteInput from '../../PlacesAutoCompleteInput';
import { convertCoordinateToAddress } from '../../../../lib/queries/queries';
import { LOCAL_STORAGE_USER_LOCATION_KEY } from '../../../constants';
import { useState } from 'react';

const HeroContent = () => {
  const [_, setState] = useApplicationState();
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const { locale, push } = useRouter();
  const handleAutoCompleteValueChange = async (value: string) => {
    try {
      const geoCodeResults = await getGeocode({ address: value });
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
      push('/shops');
    } catch (error) {
      console.log(error);
    }
  };

  const getGeoLocationSuccessCb: PositionCallback = async position => {
    const {
      coords: { latitude, longitude },
    } = position;
    const userAddress = await convertCoordinateToAddress({
      lat: latitude,
      lng: longitude,
      lang: locale as string,
    });
    console.log(userAddress, 'address');
    setState(prev => ({
      ...prev,
      userAddress,
      userLocation: {
        lat: latitude,
        lng: longitude,
      },
    }));
    localStorage.setItem(
      LOCAL_STORAGE_USER_LOCATION_KEY,
      JSON.stringify(userAddress)
    );
    push('/shops');
  };
  const getGeoLocationFailureCb: PositionErrorCallback = error => {
    console.error(error);
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
        <PlacesAutoCompleteInput
          onChange={handleAutoCompleteValueChange}
          getGeoLocationSuccessCb={getGeoLocationSuccessCb}
          getGeoLocationFailureCb={getGeoLocationFailureCb}
        />
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
