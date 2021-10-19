import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/dist/client/router';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import ColorModeToggle from '../ColorModeToggle';
import LanguageToggle from '../LanguageToggle';
import { signOut } from 'next-auth/react';
import { useSession } from '../../hooks/useSession';
const UserDrawerBody = () => {
  const { locale } = useRouter();
  const { t } = useTranslation();
  const [session, loading] = useSession({
    required: false,
    queryConfig: { staleTime: 1000 * 60 * 5 }, // ⌚ 5 minutes((1000ms * 60)(1 Minute) * 5 )
  });

  const handleSignout = () => {
    signOut({
      redirect: false,
    });
  };

  return (
    <>
      <Box my={1}>
        <Typography variant="h6" color="primary" fontWeight="bold">
          Personal
        </Typography>
        {session && (
          <Link passHref href="/login">
            <Stack my={2} direction="row" justifyContent="space-between">
              <Typography fontWeight="medium">
                {session?.user?.email} {session?.user.name}
              </Typography>
              {locale === 'ar' ? (
                <KeyboardArrowLeftIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )}
            </Stack>
          </Link>
        )}
        {!session && (
          <Link passHref href="/login">
            <Stack my={2} direction="row" justifyContent="space-between">
              <Typography fontWeight="medium">{t`sign-in`}</Typography>
              {locale === 'ar' ? (
                <KeyboardArrowLeftIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )}
            </Stack>
          </Link>
        )}
        {!session && (
          <Link passHref href="/">
            <Stack my={2} direction="row" justifyContent="space-between">
              <Typography fontWeight="medium">{t`sign-up`}</Typography>
              {locale === 'ar' ? (
                <KeyboardArrowLeftIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )}
            </Stack>
          </Link>
        )}
        <Link passHref href="/">
          <Stack my={2} direction="row" justifyContent="space-between">
            <Typography fontWeight="medium">{t`favourate-shops`}</Typography>
            {locale === 'ar' ? (
              <KeyboardArrowLeftIcon />
            ) : (
              <KeyboardArrowRightIcon />
            )}
          </Stack>
        </Link>
        <Link passHref href="/">
          <Stack my={2} direction="row" justifyContent="space-between">
            <Typography fontWeight="medium">{t`favourate-items`}</Typography>
            {locale === 'ar' ? (
              <KeyboardArrowLeftIcon />
            ) : (
              <KeyboardArrowRightIcon />
            )}
          </Stack>
        </Link>

        {session && (
          <Stack
            onClick={() => handleSignout()}
            my={2}
            direction="row"
            justifyContent="space-between"
          >
            <Typography fontWeight="medium">{t`signout`}</Typography>
            {locale === 'ar' ? (
              <KeyboardArrowLeftIcon />
            ) : (
              <KeyboardArrowRightIcon />
            )}
          </Stack>
        )}
      </Box>
      <Box my={1}>
        <Typography variant="h5" color="primary" fontWeight="bold">
          {t`settings`}
        </Typography>
        <Stack my={2} direction="row" justifyContent="space-between">
          <Typography fontWeight="medium">{t`appearance`}</Typography>
          <ColorModeToggle />
        </Stack>
        <Stack my={2} direction="row" justifyContent="space-between">
          <Typography fontWeight="medium">{t`language`}</Typography>

          <LanguageToggle />
        </Stack>
      </Box>
    </>
  );
};

export default UserDrawerBody;
