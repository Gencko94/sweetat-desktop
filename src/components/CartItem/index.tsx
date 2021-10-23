import { Fab, Stack, Typography } from '@mui/material';
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
}

const CartItem = ({
  item,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
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
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      px={2}
      spacing={2}
    >
      {/* Quantity buttons */}
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
        <Typography variant="subtitle1" fontWeight="medium" color="secondary">
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
      <Box sx={{ flex: 1 }}>
        <Typography gutterBottom variant="subtitle1" fontWeight="bold">
          {locale === 'ar' ? item.ar_name : item.name}
        </Typography>
        {item.selectedaddons.length > 0 && (
          <Stack spacing={0}>
            {item.selectedaddons.map(addon => (
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="flex-start"
                key={addon.id}
                spacing={2}
              >
                <Typography variant="subtitle2">
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

      {item.price !== '0.00' && (
        <Typography
          color="secondary"
          fontWeight="bold"
          // sx={{ alignSelf: 'center' }}
        >
          {item.price} KD
        </Typography>
      )}
    </Stack>
  );
};

export default CartItem;
