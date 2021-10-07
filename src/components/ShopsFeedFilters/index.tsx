import { Divider } from '@mui/material';
import { Box } from '@mui/system';
import DeliverTo from '../DeliverTo';
import OrderMode from '../OrderMode';

const ShopsFeedFilters = () => {
  return (
    <Box sx={{ width: '250px' }}>
      <DeliverTo />
      <Divider />
      <OrderMode />
    </Box>
  );
};

export default ShopsFeedFilters;
