import { Fab, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import { ITEM } from '../../../lib/interfaces/IRestaurantItem';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MessageIcon from '@mui/icons-material/Message';
import { useTranslation } from 'react-i18next';
import ItemAddons from '../ItemAddons';
import { useFormContext } from 'react-hook-form';
import { ILocalCartItem } from '../../../lib/interfaces/cart/ILocalCart';
import { IItemForm } from '../SingleItemDialog/SingleItemDialogContent';

interface IItemDialogDetailsProps {
  item: ITEM;
}

const ItemDialogDetails = ({ item }: IItemDialogDetailsProps) => {
  const { locale } = useRouter();
  const { t } = useTranslation();
  const { setValue, watch } = useFormContext<IItemForm>();
  const quantity = watch('quantity', 1);

  const handleAppendQuantity = () => {
    if (!item.max_allowed) {
      setValue('quantity', quantity + 1);
      return;
    }
    if (item.max_allowed === quantity) {
      return;
    }
    setValue('quantity', quantity + 1);
  };
  const handleSubstractQuantity = () => {
    if (quantity === 1) {
      return;
    }
    setValue('quantity', quantity - 1);
  };
  return (
    <div>
      <Stack spacing={1} mb={2}>
        <Typography variant="h5" fontWeight="bold">
          {locale === 'ar' ? item.ar_name : item.name}
        </Typography>
        {item.price !== '0.00' && (
          <Typography variant="h6" fontWeight="medium" color="secondary">
            {item.price} KD
          </Typography>
        )}
        {item.ar_desc !== null && item.desc !== null && (
          <div
            dangerouslySetInnerHTML={{
              __html: locale === 'ar' ? item.ar_desc : item.desc,
            }}
          ></div>
        )}
        {item.addon_categories.length > 0 && (
          <ItemAddons addon_categories={item.addon_categories} />
        )}
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={3}
        my={2}
      >
        <Fab
          onClick={() => handleAppendQuantity()}
          size="small"
          color="primary"
          aria-label="add"
        >
          <AddIcon fontSize="medium" />
        </Fab>
        <Typography variant="h6" fontWeight="medium" color="secondary">
          {quantity}
        </Typography>
        <Fab
          onClick={() => handleSubstractQuantity()}
          size="small"
          color="primary"
          aria-label="add"
        >
          <RemoveIcon fontSize="medium" />
        </Fab>
      </Stack>

      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={1}
          mb={2}
        >
          <MessageIcon color="primary" />
          <Typography variant="subtitle1" fontWeight="medium" color="primary">
            {t`special-request`} :
          </Typography>
          <Typography
            variant="subtitle2"
            fontWeight="medium"
            color="text.secondary"
          >
            ({t`optional`})
          </Typography>
        </Stack>
        <TextField fullWidth rows={4} multiline></TextField>
      </Box>
    </div>
  );
};

export default ItemDialogDetails;
