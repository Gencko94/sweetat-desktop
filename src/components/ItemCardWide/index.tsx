import { Box } from '@mui/system';
import { IItemsSearchResult } from '../../../lib/interfaces/IItem';

import Image from 'next/image';
import { Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { DarkImageOverlay } from '../DarkImageOverlay';
import { ITEM } from '../../../lib/interfaces/IRestaurantItem';
import { useApplicationState } from '../../contexts/ApplicationContext';
interface IItemCardWide {
  item: IItemsSearchResult | ITEM;
}

const ItemCardWide = ({ item }: IItemCardWide) => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [_, setState] = useApplicationState();
  const handleShowItem = () => {
    setState(prev => ({
      ...prev,
      selectedItem: item as ITEM,
      itemDialogOpen: true,
    }));
  };
  return (
    <Box
      borderRadius="6px"
      position="relative"
      overflow="hidden"
      display="flex"
      gap={1}
      component={Paper}
      elevation={2}
      onClick={handleShowItem}
      sx={{ cursor: 'pointer' }}
    >
      <Box
        sx={{
          overflow: 'hidden',
        }}
        width="30%"
        position="relative"
      >
        <Image
          placeholder="blur"
          blurDataURL={`https://sweetat.co/${item.placeholder_image}`}
          src={`https://sweetat.co/${item.image}`}
          alt={`${item.name} photo`}
          layout="responsive"
          objectFit="cover"
          height="100%"
          width="100%"
        />
        {item.in_stock === 0 && (
          <DarkImageOverlay>
            <Typography variant="body1" fontWeight="medium">
              {t`out-of-stock`}
            </Typography>
          </DarkImageOverlay>
        )}
      </Box>
      <Box p={1}>
        <Typography fontWeight="bold" variant="body2">
          {item.name}
        </Typography>
        <Typography variant="body1" fontWeight="medium" color="secondary">
          {item.price === '0.00' ? 'Price on Selection' : item.price + 'KD'}
        </Typography>
        {item.restaurant && (
          <Typography
            color="text.secondary"
            variant="caption"
            fontWeight="medium"
          >
            From :{' '}
            <Typography color="primary" variant="caption" fontWeight="medium">
              {locale === 'ar' ? item.restaurant.ar_name : item.restaurant.name}
            </Typography>
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ItemCardWide;
