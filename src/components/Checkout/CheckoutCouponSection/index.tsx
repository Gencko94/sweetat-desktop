import { LoadingButton } from '@mui/lab';
import { Typography, TextField, Stack } from '@mui/material';
import { ChangeEventHandler, useState } from 'react';
import { CART_RESTAURANT } from '../../../../lib/interfaces/cart/ILocalCart';
import useApplyCoupon from '../../../hooks/mutations/useApplyCoupon';
import useGetCartItems from '../../../hooks/queryHooks/useGetCartItems';

interface ICheckoutCouponSectionProps {
  restaurant: CART_RESTAURANT | null;
}

const CheckoutCouponSection = ({ restaurant }: ICheckoutCouponSectionProps) => {
  const [coupon, setCoupon] = useState('');
  const [error, setError] = useState('');
  const { data: cart } = useGetCartItems();
  //   const {data:cart} =
  const { mutateAsync: applyCoupon, isLoading } = useApplyCoupon();

  const handleApplyCoupon = async () => {
    try {
      const res = await applyCoupon({
        coupon,
        restaurant_id: restaurant?.id as number,
        subtotal: cart?.total as number,
      });
      if (res.success === false) {
        setError('Invalid coupon');
      }
    } catch (error) {
      setError('Something went wrong,Please try again');
    }
  };
  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setCoupon(e.target.value.toUpperCase());
  };
  return (
    <div>
      <Typography mb={2} fontWeight="bold" variant="h6">
        Add voucher code / gift card
      </Typography>
      <Stack direction="row" spacing={3}>
        <TextField
          value={coupon}
          onChange={handleChange}
          placeholder="Enter voucher code..."
          size="small"
          fullWidth
          error={Boolean(error)}
          helperText={error}
        />
        <LoadingButton
          onClick={handleApplyCoupon}
          disableElevation
          variant="contained"
          size="medium"
          loading={isLoading}
        >
          Submit
        </LoadingButton>
      </Stack>
    </div>
  );
};

export default CheckoutCouponSection;
