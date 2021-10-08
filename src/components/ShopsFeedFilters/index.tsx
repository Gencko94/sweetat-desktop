import { Divider } from '@mui/material';
import { Box } from '@mui/system';
import DeliverTo from '../DeliverTo';
import MobileHeader from '../Header/MobileHeader';
import OrderMode from '../OrderMode';

const ShopsFeedFilters = () => {
  return (
    <Box sx={{ width: '250px' }}>
      <DeliverTo />
      <MobileHeader />
      <Divider />
      <OrderMode />
      <Divider />
    </Box>
  );
};

export default ShopsFeedFilters;
