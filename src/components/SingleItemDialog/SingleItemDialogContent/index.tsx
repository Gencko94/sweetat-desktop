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
import { ILocalCartItem } from '../../../../lib/interfaces/cart/ILocalCart';
import { useTranslation } from 'react-i18next';
import { ITEM } from '../../../../lib/interfaces/IRestaurantItem';
import { useGetRestaurantInfo } from '../../../hooks/queryHooks/useGetRestaurantInfo';
import { useApplicationState } from '../../../contexts/ApplicationContext';

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
  const { data: restaurant } = useGetRestaurantInfo({
    id: selectedItem.restaurant_id,
    queryOptions: { staleTime: 60 * 1000 * 1 }, // 1 minute
  });
  const cartMethods = useManipulateCart();
  const [_, setState] = useApplicationState();
  const formMethods = useForm<IItemForm>({
    defaultValues: { quantity: 1, selectedaddons: [] },
  });
  const onSubmit: SubmitHandler<IItemForm> = data => {
    if (!restaurant) return;
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
    const cart_restaurant = {
      accept_preorder: restaurant.accept_preorder,
      ar_name: restaurant.ar_name,
      delivery_time: restaurant.delivery_time,
      id: restaurant.id,
      image: restaurant.image,
      is_busy: restaurant.is_busy,
      is_schedulable: restaurant.is_schedulable,
      logo: restaurant.logo,
      min_order_price: restaurant.min_order_price,
      name: restaurant.name,
      slug: restaurant.slug,
    };
    setState(prev => ({
      ...prev,
      cart_restaurant,
    }));
    cartMethods?.addToCart?.(item, cart_restaurant);
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
            <Button
              onClick={formMethods.handleSubmit(onSubmit)}
              variant="contained"
              size="large"
              autoFocus
              // loading={isFetching}
            >
              Add to cart
            </Button>
          </DialogActions>
        </FormProvider>
      )}
    </>
  );
};

export default SingleItemDialogContent;
