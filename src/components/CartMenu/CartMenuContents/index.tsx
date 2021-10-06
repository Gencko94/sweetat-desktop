import { Divider, IconButton, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { product1 } from '../../../../lib/fakeData/fakeProducts';
import CartItem from '../../CartItem';
import CartCardOrderSummary from '../../DesktopCartCard/CartCardOrderSummary';
import { Box } from '@mui/system';

interface ICartMenuContentsProps {
  handleToggleCartMenu: () => void;
}

const CartMenuContents = ({ handleToggleCartMenu }: ICartMenuContentsProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Stack
        p={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h6" fontWeight="bold">{t`cart`}</Typography>
        <IconButton size="small" onClick={handleToggleCartMenu}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Stack spacing={1} my={1} p={2}>
        <CartItem item={product1} />
      </Stack>
      <Divider />
      <Box p={2}>
        <CartCardOrderSummary
          delivery_fee={43.4}
          service_fee={20.1}
          subtotal={63.5}
        />
      </Box>
    </>
  );
};

export default CartMenuContents;
