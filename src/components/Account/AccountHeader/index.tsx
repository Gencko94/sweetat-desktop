import { Box, Container, Typography } from '@mui/material';
import { PRIMARY_LINEAR_GRADIENT_VALUE } from '../../../constants';
import Navbar from '../../Navbar';
import AccountTabs from '../AccountTabs';

interface IAccountHeaderProps {
  activeTab: number;
  handleChangeTab: (_: number) => void;
  user: {
    name: string;
    email: string;
  };
}

const AccountHeader = ({
  activeTab,
  handleChangeTab,
  user,
}: IAccountHeaderProps) => {
  return (
    <Box
      sx={{
        height: { xs: 230, sm: 260 },
        background: PRIMARY_LINEAR_GRADIENT_VALUE,
      }}
      style={{
        color: '#fff !important',
      }}
    >
      <Container maxWidth="lg">
        <Navbar
          logoVariant="white"
          variant="contained"
          withMenu
          buttonsColor="white"
        />
        <Box
          sx={{ mt: { xs: 1, sm: 4 }, px: { xs: 2, sm: 4 }, color: '#fff' }}
          mb={3}
        >
          <Typography variant="h4" fontWeight="bold">
            {user.name}
          </Typography>
          <Typography variant="body2">{user.email}</Typography>
        </Box>
        <Box sx={{ px: { xs: 1, sm: 3 } }}>
          <AccountTabs
            activeTab={activeTab}
            handleChangeTab={handleChangeTab}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default AccountHeader;
