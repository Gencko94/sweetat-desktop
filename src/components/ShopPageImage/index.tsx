import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { DarkImageOverlay } from '../DarkImageOverlay';

interface IShopPageImageProps {
  src: string;
  alt: string;
  placeholder: string;
  is_active: boolean;
  accept_preorder: boolean;
}

const ShopPageImage = ({
  alt,
  src,
  placeholder,
  accept_preorder,
  is_active,
}: IShopPageImageProps) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        height: { md: '160px', xs: '230px' },
        width: '100%',
        position: 'relative',
      }}
    >
      <Image
        placeholder="blur"
        blurDataURL={`https://sweetat.co/${placeholder}`}
        layout="fill"
        src={`https://sweetat.co/${src}`}
        alt={alt}
        objectFit="cover"
      />
      {!is_active && (
        <DarkImageOverlay>
          <Typography variant="h6" fontWeight="medium">{t`closed`}</Typography>
          {accept_preorder && (
            <Typography
              variant="h6"
              fontWeight="medium"
            >{t`accepts-pre-order`}</Typography>
          )}
        </DarkImageOverlay>
      )}
    </Box>
  );
};

export default ShopPageImage;
