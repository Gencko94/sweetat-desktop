import { Divider, IconButton, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import CartItem from '../../CartItem';
import CartCardOrderSummary from '../../DesktopCartCard/CartCardOrderSummary';
import useGetCartItems from '../../../hooks/queryHooks/useGetCartItems';
import useManipulateCart from '../../../hooks/useManipulateCart';

interface ICartMenuContentsProps {
  handleToggleCartMenu: () => void;
}

const CartMenuContents = ({ handleToggleCartMenu }: ICartMenuContentsProps) => {
  const { t } = useTranslation();
  const { data: cart } = useGetCartItems();
  const { incrementQuantity, decrementQuantity } = useManipulateCart();
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
      {cart && cart.items.length > 0 && (
        <>
          <Stack spacing={1} my={2}>
            {cart.items.map(cartItem => (
              <CartItem
                key={cartItem.id}
                item={cartItem}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
              />
            ))}
          </Stack>
          <Divider />
          <CartCardOrderSummary
            delivery_fee={43.4}
            service_fee={20.1}
            subtotal={cart.total}
          />
        </>
      )}
    </>
  );
};

export default CartMenuContents;
