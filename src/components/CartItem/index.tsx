import { IconButton, Stack, Typography } from '@mui/material';
import { ITEM } from '../../../lib/interfaces/IRestaurantItem';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import { Box } from '@mui/system';
interface ICartItemProps {
  item: ITEM;
}

const CartItem = ({ item }: ICartItemProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const handleAppendQuantity = () => {
    if (!item.max_allowed) {
      setQuantity(quantity + 1);
    } else {
      if (item.max_allowed === quantity) {
        return;
      }
    }
  };
  const handleSubstractQuantity = () => {
    if (quantity === 1) {
      return;
    } else {
      setQuantity(quantity - 1);
    }
  };
  return (
    <Stack direction="row" alignItems="flex-start" spacing={2}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <IconButton
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
        </IconButton>
        <Typography variant="subtitle1" fontWeight="medium" color="secondary">
          {quantity}
        </Typography>
        <IconButton
          onClick={() => handleSubstractQuantity()}
          aria-label="add"
          sx={{
            backgroundColor: 'transparent',
            width: '27px',
            height: '27px',
            minHeight: 0,
          }}
        >
          <RemoveIcon color="primary" fontSize="medium" />
        </IconButton>
      </Stack>
      <Box sx={{ flex: 1 }}>
        <Typography>{item.name}</Typography>
        <Typography>{item.ar_name}</Typography>
      </Box>
      <Box>
        <Typography>{item.price} KD</Typography>
      </Box>
    </Stack>
  );
};

export default CartItem;
