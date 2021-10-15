import {
  Autocomplete,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { LoadingButton } from '@mui/lab';

interface IPlacesAutoCompleteInputProps {
  onChange: (value: string) => void;
  getGeoLocationSuccessCb: (position: GeolocationPosition) => void;
  getGeoLocationFailureCb: (error: GeolocationPositionError) => void;
  markerAddress?: string;
}

const PlacesAutoCompleteInput = ({
  onChange,
  getGeoLocationFailureCb,
  getGeoLocationSuccessCb,
  markerAddress,
}: IPlacesAutoCompleteInputProps) => {
  const [open, setOpen] = useState(false);
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
  async function getCurrentPosition() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      getGeoLocationSuccessCb,
      getGeoLocationFailureCb
    );
  }

  useEffect(() => {
    console.log(markerAddress, 'MARKERADDRESS?');
    if (typeof markerAddress !== 'undefined') {
      console.log(markerAddress, 'MARKERADDRESS');
      setValue(markerAddress, false);
    }
  }, [markerAddress, setValue]);
  useEffect(() => {
    getCurrentPosition();
  }, []);

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, md: 3 }}>
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
            console.log(newInputValue, 'newInputValue');
            onChange(newInputValue?.description);
          }
        }}
        onInputChange={(e, value) => {
          console.log(value, 'onInputChange');
          setValue(value);
        }}
        inputValue={value}
        options={data}
        loading={loading}
        size="small"
        renderInput={params => (
          <TextField
            // onChange={e => {
            //   console.log(e.target.value, 'onChange');
            //   setValue(e.target.value);
            // }}
            // value={value}
            {...params}
            size="small"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    <IconButton onClick={getCurrentPosition} color="primary">
                      <MyLocationIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <LoadingButton
        loading={loading}
        size="medium"
        variant="contained"
        disabled={!ready}
      >
        Search
      </LoadingButton>
    </Stack>
  );
};

export default PlacesAutoCompleteInput;
