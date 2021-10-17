import { Typography } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IRestaurantInfo } from '../../../lib/interfaces/IRestaurantInfo';
import SpacerDot from '../SpacerDot';

interface IShopPageDescription {
  shop: IRestaurantInfo;
}

const ShopPageDescription = ({ shop }: IShopPageDescription) => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const info = useMemo(() => {
    return [
      locale === 'ar' ? shop.ar_description : shop.description,
      // `${shop.distance} ${t`km-away`}`,
      shop.delivery_charges === '0.000'
        ? t`free-delivery`
        : `${shop.delivery_charges} ${t`delivery-cost`}`,
      shop.min_order_price === '0.000'
        ? t`no-order-limit`
        : `${shop.min_order_price} ${t`min-order-limit`}`,
    ];
  }, [
    locale,
    shop.ar_description,
    shop.delivery_charges,
    shop.description,
    // shop.distance,
    shop.min_order_price,
    t,
  ]);

  return (
    <>
      {info
        .map<React.ReactNode>(i => (
          <Typography
            key={i}
            sx={{ display: 'inline' }}
            color="text.secondary"
            variant="body2"
            // fontWeight="medium"
          >
            {i}
          </Typography>
        ))
        .reduce((prev, curr) => [prev, <SpacerDot key={1} />, curr])}
    </>
  );
};

export default ShopPageDescription;
