import { DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
interface DialogTitleProps {
  children?: React.ReactNode;
  onClose?: () => void;
}
const DialogTitleWithClose = ({ onClose, children }: DialogTitleProps) => {
  return (
    <DialogTitle sx={{ m: 0, p: 2 }}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 10,
            top: 12,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default DialogTitleWithClose;
