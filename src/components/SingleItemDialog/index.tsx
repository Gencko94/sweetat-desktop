import { Dialog, useMediaQuery } from '@mui/material';
import { useApplicationState } from '../../contexts/ApplicationContext';
import { useTheme } from '@mui/material/styles';
import DialogTitleWithClose from '../DialogTitleWithClose';
import { useRouter } from 'next/dist/client/router';
import SingleItemDialogContent from './SingleItemDialogContent';

const SingleItemDialog = () => {
  const { locale } = useRouter();

  const [{ selectedItem, itemDialogOpen }, setState] = useApplicationState();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleHideItem = () => {
    setState(prev => ({
      ...prev,
      selectedItem: null,
      itemDialogOpen: false,
    }));
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth="sm"
      onClose={handleHideItem}
      open={itemDialogOpen}
    >
      {selectedItem && (
        <>
          <DialogTitleWithClose onClose={handleHideItem}>
            {locale === 'ar' ? selectedItem.ar_name : selectedItem.name}
          </DialogTitleWithClose>
          {selectedItem && (
            <SingleItemDialogContent
              handleHideItem={handleHideItem}
              selectedItem={selectedItem}
            />
          )}
        </>
      )}
    </Dialog>
  );
};

export default SingleItemDialog;
