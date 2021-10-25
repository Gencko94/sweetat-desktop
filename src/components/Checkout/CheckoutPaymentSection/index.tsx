import { FormControlLabel, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { PAYMENT_METHODS } from '../../../constants';
import RadioButton from '../../RadioButton';
import Image from 'next/image';
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
            }}
          >
            <FormControlLabel
              sx={{ flex: 1, justifyContent: 'space-between', mx: 0 }}
              label={
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Typography fontWeight="medium">
                    {locale === 'ar' ? method.name.ar : method.name.en}
                  </Typography>
                  {method.logo !== '' && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={method.logo}
                      alt={method.name.en}
                      style={{ width: '50px', height: '30px' }}
                    />
                  )}
                </Stack>
              }
              control={
                <RadioButton size="small" disableRipple color="default" />
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
