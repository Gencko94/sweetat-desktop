import { Button, Paper, Stack, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { useTranslation } from 'react-i18next';
const SocialSection = () => {
  const { t } = useTranslation();
  return (
    <Paper elevation={4} sx={{ p: 2, my: 4 }}>
      <Typography
        fontWeight="bold"
        textAlign="center"
      >{t`login-with`}</Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        mt={2}
      >
        <Button startIcon={<FacebookIcon />} color="info" variant="outlined">
          Facebook
        </Button>
        <Button startIcon={<GoogleIcon />} color="error" variant="outlined">
          Google
        </Button>
      </Stack>
    </Paper>
  );
};

export default SocialSection;
