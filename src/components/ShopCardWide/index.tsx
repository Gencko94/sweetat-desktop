import { Box, BoxProps } from '@mui/system';
import { IRestaurantInfo } from '../../../lib/interfaces/IRestaurantInfo';
import Image from 'next/image';
import { Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';
import { useApplicationState } from '../../contexts/ApplicationContext';
import ShopPageDescription from '../ShopPageDescription';
interface IShopSliderCard {
  shop: IRestaurantInfo;
}

const ShopCardWide = ({ shop }: IShopSliderCard) => {
  const { t } = useTranslation();
  const [state, setState] = useApplicationState();
  return (
    <Link href={`/shop/${shop.slug}`} passHref shallow>
      <Box
        borderRadius="6px"
        position="relative"
        overflow="hidden"
        sx={{
          cursor: 'pointer',
          height: '300px',
          minHeight: '300px',
          border: theme => `1px solid ${theme.palette.divider}`,
        }}
        onClick={() => {
          if (state.searchMenuOpen) {
            setState(prev => ({
              ...prev,
              searchMenuOpen: false,
            }));
          }
        }}
      >
        <Box height="50%" position="relative">
          <Image
            placeholder="blur"
            blurDataURL={`https://sweetat.co/${shop.placeholder_image}`}
            src={`https://sweetat.co/${shop.image}`}
            alt={`${shop.name} photo`}
            layout="fill"
            objectFit="cover"
          />
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              bgcolor: 'primary.main',
              color: 'white',
              p: 0.5,
              borderRadius: '6px',
            }}
          >
            <Typography variant="caption" fontWeight="bold">
              {shop.deliverable_by_sweetat ? 'Delivered By Sweetat' : ''}
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: -18,
              right: 9,
              bgcolor: 'rgba(255,255,255,0.9)',

              borderRadius: 12,
            }}
          >
            <DeliveryTimeChip>
              <Typography fontWeight="bold" variant="subtitle2">
                {shop.delivery_time_label} {t`minutes`}
              </Typography>
              <Typography></Typography>
            </DeliveryTimeChip>
          </Box>
        </Box>
        <Box p={1} pt={3}>
          <Typography fontWeight="bold">{shop.name}</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <StarIcon
              fontSize="small"
              color={
                parseFloat(shop.rating) > 4.5
                  ? 'success'
                  : parseFloat(shop.rating) > 4.0
                  ? 'success'
                  : 'disabled'
              }
            />
            {/* <StyledRating
              size="small"
              color="primary"
              name="read-only"
              value={Number(shop.rating)}
              readOnly
            /> */}
            <Typography
              variant="body2"
              color={
                parseFloat(shop.rating) > 4.5
                  ? 'success.dark'
                  : parseFloat(shop.rating) > 4.0
                  ? 'success.main'
                  : 'inherit'
              }
            >
              ({parseFloat(shop.rating).toFixed(1)}){' '}
              {parseFloat(shop.rating) > 4.5
                ? 'Excellent'
                : parseFloat(shop.rating) > 4.0
                ? 'Very Good'
                : ''}
            </Typography>
            {shop.price_range && shop.price_range !== '0' && (
              <Typography variant="subtitle2" color="primary" fontWeight="bold">
                ~{shop.price_range} KD
              </Typography>
            )}
          </Stack>
          <ShopPageDescription shop={shop} />
          <Typography color="secondary" variant="body2" fontWeight="bold">
            {shop.delivery_charges === '0.000'
              ? t`free-delivery`
              : `${shop.delivery_charges} KD Delivery cost`}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default ShopCardWide;
const DeliveryTimeChip = styled((props: BoxProps) => (
  <Box component={Paper} elevation={1} {...props} />
))(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));
// const StyledRating = styled(Rating)(({ theme }) => ({
//   '& .MuiRating-iconFilled': {
//     color: theme.palette.secondary.main,
//   },
//   '& .MuiRating-iconHover': {
//     color: theme.palette.secondary.dark,
//   },
// }));
