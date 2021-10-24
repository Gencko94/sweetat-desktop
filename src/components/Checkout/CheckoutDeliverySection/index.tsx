import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
const CheckoutDeliverySection = () => {
  return (
    <div>
      <Typography mb={2} fontWeight="bold" variant="h6">
        Delivery Address
      </Typography>
      <Button
        startIcon={<AddIcon />}
        size="large"
        fullWidth
        disableElevation
        variant="contained"
        color="inherit"
        sx={{ justifyContent: 'flex-start', border: 1, borderColor: 'divider' }}
      >
        Add new address
      </Button>
    </div>
  );
};

export default CheckoutDeliverySection;
