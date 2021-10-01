import { Container, Divider, Stack } from '@mui/material';
import { Box } from '@mui/system';
import LoginForm from '../../src/components/LoginForm';
import Image from 'next/image';
import SocialSection from '../../src/components/LoginForm/SocialSection';
const Login = () => {
  return (
    <Container sx={{ maxWidth: { xs: 'md', md: 'lg' } }}>
      <Box
        mt={4}
        mb={2}
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="column"
      >
        <Image
          src="/assets/logo.png"
          alt="Sweetat logo"
          height={100}
          width={250}
        />
        <LoginForm />
      </Box>
      <Divider />
      <SocialSection />
    </Container>
  );
};

export default Login;
