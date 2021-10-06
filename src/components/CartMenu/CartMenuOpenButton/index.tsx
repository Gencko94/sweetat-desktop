import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

interface ICartMenuOpenButtonProps {
  handleToggleCartMenu: () => void;
}
const CartMenuOpenButton = ({
  handleToggleCartMenu,
}: ICartMenuOpenButtonProps) => {
  return (
    <Button
      onClick={handleToggleCartMenu}
      variant="contained"
      fullWidth
      sx={{
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Box
        p={0.5}
        sx={{
          backgroundColor: 'primary.light',
          borderRadius: '6px',
          width: '30px',
          height: '30px',
        }}
      >
        <Typography fontWeight="bold">1</Typography>
      </Box>
      <Typography fontWeight="bold">View Basket</Typography>
      <Typography fontWeight="bold">60.20 KD</Typography>
    </Button>
  );
};

export default CartMenuOpenButton;
