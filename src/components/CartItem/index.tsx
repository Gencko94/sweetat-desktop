import { Fab, Paper, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import { IGetCartResponseItem } from '../../../lib/interfaces/cart/IGetCartResponse';
import { useRouter } from 'next/dist/client/router';
import { ILocalCartItem } from '../../../lib/interfaces/cart/ILocalCart';
interface ICartItemProps {
  item: IGetCartResponseItem;
  incrementQuantity?: (_: ILocalCartItem) => void;
  decrementQuantity?: (_: ILocalCartItem) => void;
  removeFromCart?: (_: ILocalCartItem) => void;
  isCheckout?: boolean;
}

const CartItem = ({
  item,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  isCheckout,
}: ICartItemProps) => {
  const { locale } = useRouter();
  const handleAppendQuantity = () => {
    if (!item.max_allowed) {
      // addToCart(item.id, item.restaurant_id);
      incrementQuantity?.({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        selectedaddons: item.selectedaddons.map(i => ({
          addon_category_name: i.addon_category_name as string,
          addon_category_ar_name: i.addon_category_ar_name,
          addon_id: i.addon_id,
        })),
      });
    } else {
      if (item.max_allowed === item.quantity) {
        return;
      }
    }
  };
  const handleSubstractQuantity = () => {
    if (item.quantity === 1) {
      // Delete the item
      removeFromCart?.({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        selectedaddons: item.selectedaddons.map(i => ({
          addon_category_name: i.addon_category_name as string,
          addon_category_ar_name: i.addon_category_ar_name,
          addon_id: i.addon_id,
        })),
      });
      return;
    } else {
      // Decrement
      decrementQuantity?.({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        selectedaddons: item.selectedaddons.map(i => ({
          addon_category_name: i.addon_category_name as string,
          addon_category_ar_name: i.addon_category_ar_name,
          addon_id: i.addon_id,
        })),
      });
    }
  };
  return (
    <Box
      component={Paper}
      borderRadius={0}
      p={1}
      borderBottom={1}
      borderColor="divider"
      elevation={0}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
      >
        {/* Quantity buttons */}
        {!isCheckout && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Fab
              size="small"
              onClick={() => handleAppendQuantity()}
              aria-label="add"
              sx={{
                backgroundColor: 'transparent',
                width: '27px',
                height: '27px',
                minHeight: 0,
              }}
            >
              <AddIcon color="primary" fontSize="medium" />
            </Fab>
            <Typography variant="subtitle1" fontWeight="bold" color="secondary">
              {item.quantity}
            </Typography>
            <Fab
              size="small"
              onClick={() => handleSubstractQuantity()}
              aria-label="add"
              sx={{
                backgroundColor: 'transparent',
                width: '27px',
                height: '27px',
                minHeight: 0,
              }}
            >
              {item.quantity === 1 ? (
                <DeleteIcon color="primary" fontSize="medium" />
              ) : (
                <RemoveIcon color="primary" fontSize="medium" />
              )}
            </Fab>
          </Stack>
        )}
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {locale === 'ar' ? item.ar_name : item.name}
          </Typography>
        </Box>

        {item.price !== '0.00' && (
          <Typography color="secondary" fontWeight="bold" variant="subtitle1">
            {item.price} KD
          </Typography>
        )}
      </Stack>

      {item.selectedaddons.length > 0 && (
        <Stack justifyContent="center" mt={1.5} spacing={1}>
          {item.selectedaddons.map((addon, i) => (
            <Stack
              alignItems="center"
              direction="row"
              justifyContent={isCheckout ? 'space-between' : 'space-between'}
              key={i}
              spacing={2}
            >
              <Typography variant="body1">
                {locale === 'ar' ? addon.ar_name : addon.name}
              </Typography>
              {addon.price !== '0.00' && (
                <Typography color="secondary" fontWeight="bold">
                  +{addon.price} KD
                </Typography>
              )}
            </Stack>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default CartItem;
