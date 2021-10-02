import {
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Link as MuiLink,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/system';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import EmailIcon from '@mui/icons-material/Email';
import { ILoginForm } from '../../../lib/interfaces/ILoginForm';
import PasswordIcon from '@mui/icons-material/Password';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { signIn } from 'next-auth/react';
import Link from 'next/link';

import { useRouter } from 'next/dist/client/router';

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm();
  const { t } = useTranslation();
  const { push, replace } = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit: SubmitHandler<ILoginForm> = async data => {
    console.log(data);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await signIn('credentials', {
      callbackUrl: 'http://localhost:3000',
      redirect: false,
      email: 'saloom.ahmad@gmail.com',
      password: 's@l00m@hm@d',
    });
    console.log(res);

    if (!res?.error) {
      replace('/');
    } else {
      if (res?.error === 'CredentialsSignin') {
        setError('email', { message: 'Invalid Credentials' });
        setError('password', { message: 'Invalid Credentials' });
      }
    }
  };
  return (
    <Paper elevation={4} sx={{ p: 4, my: 4 }}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'grid', gap: 2 }}
      >
        <Controller
          control={control}
          name="email"
          rules={{ required: 'Required' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              {/* <Label>Email Address</Label> */}
              <TextField
                label="Email Address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon fontSize="small" color="secondary" />
                    </InputAdornment>
                  ),
                }}
                size="medium"
                fullWidth
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: 'Required' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Password"
              size="medium"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon fontSize="small" color="secondary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={e => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <LoadingButton
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          type="submit"
          size="large"
          loading={isSubmitting}
        >
          {t`login`}
        </LoadingButton>
        <Link href="/forgot-password" passHref>
          <MuiLink
            variant="subtitle2"
            fontWeight="medium"
            textAlign="center"
            underline="none"
          >{t`forgot-password`}</MuiLink>
        </Link>
      </Box>
    </Paper>
  );
};

export default LoginForm;
