import { Button, Paper } from '@mui/material';
import { Box, BoxProps, styled } from '@mui/system';
import { useTranslation } from 'react-i18next';

const DesktopCartCard = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Box
        p={2}
        component={Paper}
        elevation={1}
        sx={{ position: 'absolute', top: '5px', width: '100%' }}
      >
        <Button
          fullWidth
          variant="contained"
          size="large"
        >{t`go-to-checkout`}</Button>
      </Box>
    </Wrapper>
  );
};

export default DesktopCartCard;
const Wrapper = styled((props: BoxProps) => <Box {...props} />)(() => ({
  flexBasis: '33%',
  position: 'relative',
}));
