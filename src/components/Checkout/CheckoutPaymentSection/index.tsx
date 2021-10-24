import { FormControlLabel, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { PAYMENT_METHODS } from '../../../constants';
import RadioButton from '../../RadioButton';

const CheckoutPaymentSection = () => {
  const { locale } = useRouter();
  return (
    <div>
      <Typography mb={2} fontWeight="bold" variant="h6">
        Payment method
      </Typography>
      <Stack spacing={2}>
        {PAYMENT_METHODS.map(method => (
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
            key={method.name.en}
            px={2}
            py={1}
            sx={{
              border: 1,
              borderRadius: '6px',
              borderColor: 'divider',
              transition: 'border 75ms ease',
              '&:hover': {
                borderColor: 'primary.main',
              },
              //   borderInlineStart: theme =>
              //     isSelected ? `4px solid ${theme.palette.primary.main}` : '',
            }}
          >
            <FormControlLabel
              //   value={addon.id}
              sx={{ flex: 1, justifyContent: 'space-between', mx: 0 }}
              label={
                <Typography fontWeight="medium">
                  {locale === 'ar' ? method.name.ar : method.name.en}
                </Typography>
              }
              control={
                <RadioButton
                  size="small"
                  //   value={addon.id}
                  //   onChange={() => handleCheckValue(addon, onChange)}
                  disableRipple
                  color="default"
                />
              }
              labelPlacement="start"
            />
          </Stack>
        ))}
      </Stack>
    </div>
  );
};

export default CheckoutPaymentSection;
