import { Backdrop, Button, Fade, Modal, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useMemo, useState } from 'react';
import { DEFAULT_LAT, DEFAULT_LNG } from '../../constants';
import { POSITION_COORDS } from '../../contexts/ApplicationContext';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import PlacesAutoCompleteInput from '../PlacesAutoCompleteInput';
import { convertCoordinateToAddress } from '../../../lib/queries/queries';
import { useRouter } from 'next/dist/client/router';
import { GoogleMap, Marker } from '@react-google-maps/api';
interface IModalMapProps {
  open: boolean;
  handleCloseMap: () => void;
}
const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  p: 4,
};

const MapModal = ({ open, handleCloseMap }: IModalMapProps) => {
  const { locale } = useRouter();
  const [marker, setMarker] = useState<POSITION_COORDS | null>(null);
  const [markerAddress, setMarkerAddress] = useState<string>('null');

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);
  const center = useMemo(() => {
    return {
      lat: DEFAULT_LAT,
      lng: DEFAULT_LNG,
    };
  }, []);
  const handleAutoCompleteValueChange = async (value: string) => {
    console.log('hello');
    try {
      if (map) {
        const geoCodeResults = await getGeocode({ address: value });
        const { lat, lng } = await getLatLng(geoCodeResults[0]);

        const userAddress = await convertCoordinateToAddress({
          lat,
          lng,
          lang: locale as string,
        });
        setMarkerAddress(userAddress.address);
        setMarker({
          lat,
          lng,
        });
        map.panTo({
          lat,
          lng,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getGeoLocationSuccessCb: PositionCallback = async position => {
    if (position && map) {
      const { latitude: lat, longitude: lng } = position.coords;
      const userAddress = await convertCoordinateToAddress({
        lat,
        lng,
        lang: locale as string,
      });
      setMarkerAddress(userAddress.address);
      setMarker({
        lat,
        lng,
      });
      map.panTo({
        lat,
        lng,
      });
    }
  };
  const getGeoLocationFailureCb: PositionErrorCallback = error => {
    console.error(error);
  };

  // 🌐 When clicking on the map call this function
  const onMapClick = async (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setMarker({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
      const userAddress = await convertCoordinateToAddress({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        lang: locale as string,
      });
      setMarkerAddress(userAddress.address);
    }
  };

  return (
    <Modal
      closeAfterTransition
      onClose={handleCloseMap}
      component="div"
      open={open}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle} component={Paper}>
          <PlacesAutoCompleteInput
            onChange={handleAutoCompleteValueChange}
            getGeoLocationSuccessCb={getGeoLocationSuccessCb}
            getGeoLocationFailureCb={getGeoLocationFailureCb}
            markerAddress={markerAddress}
          />

          <Box sx={{ width: '100%', height: '400px', margin: '1rem 0' }}>
            <GoogleMap
              mapContainerStyle={{
                width: '100%',
                height: '400px',
                marginTop: '1rem',
              }}
              center={center}
              zoom={14}
              onLoad={onLoad}
              onUnmount={onUnmount}
              clickableIcons={false}
              onClick={onMapClick}
              options={{ streetViewControl: false }}
            >
              <Marker
                position={marker || { lat: DEFAULT_LAT, lng: DEFAULT_LNG }}
              />
            </GoogleMap>
          </Box>
          <Button disableElevation fullWidth variant="contained">
            Mark Location
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default MapModal;
