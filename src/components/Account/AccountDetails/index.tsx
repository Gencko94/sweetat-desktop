import { Grid, TextField, InputAdornment } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import AccountCard from '../AccountCard';
import { Person, Email, PhoneAndroid } from '@mui/icons-material';
import Label from '../../Label';
import { LoadingButton } from '@mui/lab';

export interface IUpdateUserAccountProps {
  name: string;
  phone: string;
  email: string;
}

const AccountDetails = () => {
  const { control, handleSubmit } = useForm<IUpdateUserAccountProps>();
  const onSubmit: SubmitHandler<IUpdateUserAccountProps> = data => {
    try {
      console.log(data);
    } catch (error) {
      console.log(data);
    }
  };
  return (
    <AccountCard title="Account Details">
      <Grid
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        container
        spacing={2}
      >
        <Grid item xs={12}>
          <Controller
            control={control}
            name="name"
            rules={{ required: 'Required' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Label htmlFor="name">Full Name</Label>
                <TextField
                  id="name"
                  fullWidth
                  value={value}
                  onChange={onChange}
                  placeholder="First Name"
                  error={!!error}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText={error ? error.message : null}
                />
              </>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="email"
            rules={{ required: 'Required' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Label htmlFor="email">Email Address</Label>
                <TextField
                  id="email"
                  fullWidth
                  value={value}
                  onChange={onChange}
                  placeholder="Email"
                  error={!!error}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText={error ? error.message : null}
                />
              </>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="phone"
            rules={{ required: 'Required' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Label htmlFor="phone">Mobile Phone</Label>
                <TextField
                  id="phone"
                  fullWidth
                  value={value}
                  onChange={onChange}
                  placeholder="Mobile Phone"
                  error={!!error}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneAndroid color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText={error ? error.message : null}
                />
              </>
            )}
          />
        </Grid>

        <Grid mt={2} item textAlign="center" xs={12}>
          <LoadingButton
            variant="contained"
            sx={{ width: { xs: '100%', sm: 300 } }}
          >
            Submit
          </LoadingButton>
        </Grid>
      </Grid>
    </AccountCard>
  );
};

export default AccountDetails;
