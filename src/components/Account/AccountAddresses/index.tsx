import { Stack, Typography } from '@mui/material';
import AccountCard from '../AccountCard';

const AccountAddresses = () => {
  return (
    <AccountCard title="Saved Addresses">
      <Stack alignItems="center" justifyContent="center" sx={{ height: 150 }}>
        <Typography>No Saved Addresses</Typography>
      </Stack>
    </AccountCard>
  );
};

export default AccountAddresses;
