import { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/dist/client/router';
import { dehydrate, QueryClient } from 'react-query';
import { getSingleItem } from '../../lib/queries/queries';
import { useGetSingleItem } from '../../src/hooks/queryHooks/useGetSingleItem';
import isMobile from '../../utils/isMobile';
import Image from 'next/image';
import { Box } from '@mui/system';
import { DarkImageOverlay } from '../../src/components/DarkImageOverlay';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ItemPageDetails from '../../src/components/ItemPageDetails';
import { memo, useState } from 'react';
import Navbar from '../../src/components/Navbar';
const SingleItem: NextPage<{ isMobileDevice: boolean }> = memo(
  ({ isMobileDevice }) => {
    const {
      query: { id },
    } = useRouter();
    const { data } = useGetSingleItem({ id: Number(id) });
    const { t } = useTranslation();
    const [quantity, setQuantity] = useState<number>(1);

    const handleAppendQuantity = () => {
      if (!data?.max_allowed) {
        setQuantity(quantity + 1);
      } else {
        if (data.max_allowed === quantity) {
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
    return (
      <div>
        <Navbar variant="normal" logoVariant="colored" withBorderBottom />
        {data && (
          <>
            <Box height="200px" position="relative">
              <Image
                placeholder="blur"
                blurDataURL={`https://sweetat.co/${data.placeholder_image}`}
                src={`https://sweetat.co/${data.image}`}
                alt={`${data.name} photo`}
                layout="fill"
                objectFit="cover"
                // height={200}
                // width={350}
              />
              {data.in_stock === 0 && (
                <DarkImageOverlay>
                  <Typography
                    variant="h6"
                    fontWeight="medium"
                  >{t`closed`}</Typography>
                </DarkImageOverlay>
              )}
            </Box>
            <ItemPageDetails
              quantity={quantity}
              handleAppendQuantity={handleAppendQuantity}
              handleSubstractQuantity={handleSubstractQuantity}
              item={data}
            />
          </>
        )}
      </div>
    );
  }
);

export default SingleItem;
export const getServerSideProps: GetServerSideProps = async ctx => {
  const { id } = ctx.query;
  const f = ctx.req;
  const queryClient = new QueryClient();

  const isMobileDevice = isMobile(ctx.req);
  const { locale } = ctx;
  await queryClient.prefetchQuery(['single-item', id], () =>
    getSingleItem(Number(id))
  );

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
      isMobileDevice,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
