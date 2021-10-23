import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import { useApplicationState } from '../../contexts/ApplicationContext';
import DialogTitleWithClose from '../DialogTitleWithClose';

const CartAlertDialog = () => {
  const [{ cartAlertState }, setState] = useApplicationState();
  const handleCloseAlert = () => {
    setState(prev => ({
      ...prev,
      cartAlertState: {
        open: false,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        cb: () => {},
      },
    }));
  };
  return (
    <Dialog maxWidth="sm" onClose={handleCloseAlert} open={cartAlertState.open}>
      <DialogTitleWithClose onClose={handleCloseAlert}>
        Cart Change Alert
      </DialogTitleWithClose>
      <DialogContent>
        <Typography>
          You are adding items from another restaurant, clicking Confirm will
          create a new cart with new items
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button size="large" onClick={handleCloseAlert}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            cartAlertState.cb();
            handleCloseAlert();
          }}
          variant="contained"
          size="large"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CartAlertDialog;
