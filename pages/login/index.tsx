import { Container, Divider } from '@mui/material';
import { Box } from '@mui/system';
import LoginForm from '../../src/components/LoginForm';
import Image from 'next/image';
import SocialSection from '../../src/components/LoginForm/SocialSection';
import {
  getProviders,
  signOut,
  ClientSafeProvider,
  LiteralUnion,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from '../../src/hooks/useSession';
const Login = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const [session, isLoading] = useSession();
  useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setProviders(setupProviders);
    };
    setTheProviders();
  }, []);

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
        <Link href="/" passHref>
          <Image
            src="/assets/logo.png"
            alt="Sweetat logo"
            height={100}
            width={250}
          />
        </Link>
        <LoginForm />
      </Box>
      <Divider />
      <SocialSection />
    </Container>
  );
};

export default Login;
