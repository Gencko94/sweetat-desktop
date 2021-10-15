import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import useManipulateCart from '../../../hooks/useManipulateCart';
import Image from 'next/image';
import { DarkImageOverlay } from '../../DarkImageOverlay';
import { Box } from '@mui/system';
import ItemDialogDetails from '../../ItemDialogDetails';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {
  ILocalCartItemAddon,
  ILocalCartItem,
} from '../../../../lib/interfaces/cart/ILocalCart';
import { useTranslation } from 'react-i18next';
import { ITEM } from '../../../../lib/interfaces/IRestaurantItem';
import { LoadingButton } from '@mui/lab';
import useGetCartItems from '../../../hooks/queryHooks/useGetCartItems';

interface IItemForm {
  selectedaddons: ILocalCartItemAddon[];
  quantity: number;
}

interface ISingleItemDialogContentProps {
  handleHideItem: () => void;
  selectedItem: ITEM;
}

const SingleItemDialogContent = ({
  handleHideItem,
  selectedItem,
}: ISingleItemDialogContentProps) => {
  const { t } = useTranslation();
  const cartMethods = useManipulateCart();
  const formMethods = useForm<IItemForm>({
    defaultValues: { quantity: 1, selectedaddons: [] },
  });
  const onSubmit: SubmitHandler<IItemForm> = data => {
    const item: ILocalCartItem = {
      id: selectedItem.id,
      price: selectedItem.price,
      quantity: data.quantity,
      selectedaddons: data.selectedaddons,
    };
    cartMethods?.addToCart?.(item, selectedItem.restaurant_id);
    handleHideItem();
  };
  return (
    <>
      {selectedItem && (
        <FormProvider {...formMethods}>
          <DialogContent sx={{ minWidth: { md: 600 } }} dividers>
            <Box
              height={{ xs: 300, md: 200, xl: 250 }}
              position="relative"
              mb={2}
            >
              <Image
                placeholder="blur"
                blurDataURL={`https://sweetat.co/${selectedItem.placeholder_image}`}
                src={`https://sweetat.co/${selectedItem.image}`}
                alt={`${selectedItem?.name} photo`}
                layout="fill"
                objectFit="cover"
              />
              {selectedItem?.in_stock === 0 && (
                <DarkImageOverlay>
                  <Typography
                    variant="h6"
                    fontWeight="medium"
                  >{t`closed`}</Typography>
                </DarkImageOverlay>
              )}
            </Box>
            <ItemDialogDetails item={selectedItem} />
          </DialogContent>

          <DialogActions>
            <Button size="large" onClick={handleHideItem}>
              Cancel
            </Button>
            <LoadingButton
              onClick={formMethods.handleSubmit(onSubmit)}
              variant="contained"
              size="large"
              autoFocus
              // loading={isFetching}
            >
              Add to cart
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      )}
    </>
  );
};

export default SingleItemDialogContent;
