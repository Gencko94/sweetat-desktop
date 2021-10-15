import ItemDialogDetails from '../ItemDialogDetails';
import Image from 'next/image';
import { Box } from '@mui/system';
import { DarkImageOverlay } from '../DarkImageOverlay';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useApplicationState } from '../../contexts/ApplicationContext';
import { useTheme } from '@mui/material/styles';
import DialogTitleWithClose from '../DialogTitleWithClose';
import { useRouter } from 'next/dist/client/router';
const SingleItemDialog = () => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [quantity, setQuantity] = useState<number>(1);
  const [{ selectedItem, itemDialogOpen }, setState] = useApplicationState();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleAppendQuantity = () => {
    if (!selectedItem?.max_allowed) {
      setQuantity(quantity + 1);
    } else {
      if (selectedItem.max_allowed === quantity) {
        return;
      }
    }
  };
  const handleSubstractQuantity = () => {
    if (quantity === 1) {
      return;
    } else {
      setQuantity(quantity - 1);
    }
  };

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
          <DialogContent sx={{ minWidth: { md: 600 } }} dividers>
            <Box
              height={{ xs: 300, md: 200, xl: 250 }}
              position="relative"
              mb={2}
            >
              <Image
                placeholder="blur"
                blurDataURL={`https://sweetat.co/${selectedItem.placeholder_image}`}
                src={`https://sweetat.co/${selectedItem.image}`}
                alt={`${selectedItem.name} photo`}
                layout="fill"
                objectFit="cover"
              />
              {selectedItem.in_stock === 0 && (
                <DarkImageOverlay>
                  <Typography
                    variant="h6"
                    fontWeight="medium"
                  >{t`closed`}</Typography>
                </DarkImageOverlay>
              )}
            </Box>
            <ItemDialogDetails
              quantity={quantity}
              handleAppendQuantity={handleAppendQuantity}
              handleSubstractQuantity={handleSubstractQuantity}
              item={selectedItem}
            />
          </DialogContent>
          <DialogActions>
            <Button size="large" onClick={handleHideItem}>
              Cancel
            </Button>
            <Button variant="contained" size="large" autoFocus>
              Add to card
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default SingleItemDialog;
