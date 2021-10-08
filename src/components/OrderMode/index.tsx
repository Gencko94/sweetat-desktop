import { FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';

const OrderMode = () => {
  return (
    <Stack spacing={1} py={2}>
      <RadioGroup>
        <FormControlLabel
          sx={{ fontSize: theme => theme.typography.subtitle2 }}
          disableTypography
          label="Delivery"
          checked
          control={<Radio size="small" />}
        />
      </RadioGroup>
    </Stack>
  );
};

export default OrderMode;
