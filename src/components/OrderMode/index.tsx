import { FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';

const OrderMode = () => {
  return (
    <Stack spacing={1}>
      <RadioGroup>
        <FormControlLabel label="Delivery" checked control={<Radio />} />
      </RadioGroup>
    </Stack>
  );
};

export default OrderMode;
