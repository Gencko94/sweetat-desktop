import {
  Container as MuiContainer,
  ContainerProps,
  LinkProps,
  Stack,
  Typography,
  Grid,
} from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import { Box, styled } from '@mui/system';
import { memo } from 'react';
import WhiteLogo from '../../svgs/white-logo';
import Link from 'next/link';
import Image from 'next/image';

import { FOOTER_LINKS } from '../../constants';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/dist/client/router';
const Footer = () => {
  const { locale } = useRouter();
  const { t } = useTranslation();
  return (
    <Box p={3} sx={{ backgroundColor: '#252525' }}>
      <Grid justifyContent="center" spacing={2} container>
        <Grid item>
          <WhiteLogo />
        </Grid>
        {FOOTER_LINKS.map(link => (
          <Grid textAlign="center" xs={12} md={6} key={link.label} item>
            <Link passHref href={link.href}>
              <CustomLink>{t(link.label)}</CustomLink>
            </Link>
          </Grid>
        ))}
        <Grid item>
          <Image
            src={
              locale === 'ar'
                ? '/assets/google-ar.png'
                : '/assets/google-en.png'
            }
            alt="Get on google play"
            height={62.5}
            width={161.5}
          />
        </Grid>
        <Grid item>
          <Image
            src={
              locale === 'ar' ? '/assets/apple-ar.png' : '/assets/apple-en.png'
            }
            alt="Get on App Store"
            height={62.5}
            width={161.5}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(Footer);

const Container = styled((props: ContainerProps) => (
  <MuiContainer {...props} />
))(({ theme }) => ({
  // backgroundColor:
  //   theme.palette.mode === 'dark' ? theme.palette.background.paper : '#252525',
}));
const CustomLink = styled((props: LinkProps) => (
  <MuiLink underline="none" variant="h5" display="block" {...props} />
))(() => ({}));
