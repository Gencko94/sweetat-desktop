import { Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ICartMenuActionsProps {
  handleToggleCartMenu: () => void;
}

const CartMenuActions = ({ handleToggleCartMenu }: ICartMenuActionsProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Stack direction="row" justifyContent="space-between" spacing={1} my={2}>
        <Typography>{t`total`}</Typography>
        <Typography>60.40 KD</Typography>
      </Stack>
      <Button
        disableElevation
        sx={{ mb: 1 }}
        variant="contained"
        size="large"
        fullWidth
      >
        {t`go-to-checkout`}
      </Button>
      <Button
        onClick={handleToggleCartMenu}
        variant="outlined"
        size="large"
        fullWidth
      >
        {t`back-to-menu`}
      </Button>
    </>
  );
};

export default CartMenuActions;
