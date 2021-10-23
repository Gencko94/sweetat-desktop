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
import { OneKPlusOutlined } from '@mui/icons-material';

export interface IItemForm {
  selectedaddons: {
    id: number;
    addon_category_name: string;
    addon_category_ar_name: string | null;
    addon_id: number;
  }[];
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
    // console.log(
    //   data.selectedaddons.map(i => ({
    //     addon_id: i.addon_id,
    //     addon_category_name: i.addon_category_name,
    //     addon_category_ar_name: i.addon_category_ar_name,
    //   }))
    // );
    const item: ILocalCartItem = {
      id: selectedItem.id,
      price: selectedItem.price,
      quantity: data.quantity,
      selectedaddons: data.selectedaddons.map(i => ({
        addon_id: i.addon_id,
        addon_category_name: i.addon_category_name,
        addon_category_ar_name: i.addon_category_ar_name,
      })),
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
