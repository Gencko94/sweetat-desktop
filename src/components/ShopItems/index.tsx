import { Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IRestaurantInfo } from '../../../lib/interfaces/IRestaurantInfo';
import { useApplicationState } from '../../contexts/ApplicationContext';
import { useGetRestaurantItems } from '../../hooks/queryHooks/useGetRestaurantItems';
import ItemsViewToggle from '../ItemsViewToggle';
import ShopPageCategoriesSection from '../ShopPageCategoriesSection';
import ShopItemsSection from './ShopItemsSection';
import ShopTopSellingSection from './ShopTopSellingSection';

interface IShopItemsProps {
  shop: IRestaurantInfo;
}

const ShopItems = ({ shop }: IShopItemsProps) => {
  const { t } = useTranslation();
  const [state] = useApplicationState();
  const [activeTab, setActiveTab] = useState<number>(0);

  const { data } = useGetRestaurantItems({ slug: shop.slug });
  const handleChangeTab = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setActiveTab(newValue);
    },
    []
  );
  const tabTitles = useMemo(() => {
    if (data) {
      let titles: string[] = [];
      const itemsTitles = Object.keys(data.items).map(key => key);
      if (data.top_selling.length > 0) {
        titles.push(t`top-selling`);
      }
      titles = titles.concat(itemsTitles);
      return titles;
    } else {
      return [];
    }
  }, [data, t]);

  return (
    <>
      {data && (
        <>
          <ShopPageCategoriesSection
            tabTitles={tabTitles}
            activeTab={activeTab}
            handleChangeTab={handleChangeTab}
          />
          <Box position="relative">
            <Container
              sx={{
                maxWidth: { xl: 'xl', lg: 'lg', md: 'md' },
              }}
            >
              <br />
              <Box sx={{ width: { md: '65%', xs: '100%' } }}>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  spacing={1}
                >
                  <Typography>{t`items-view`}:</Typography>
                  <ItemsViewToggle />
                </Stack>
                {data.top_selling.length > 0 && (
                  <ShopTopSellingSection
                    index={0}
                    topSellingItems={data.top_selling}
                    setActiveTab={setActiveTab}
                  />
                )}
                {Object.keys(data.items).map((key, i) => (
                  <ShopItemsSection
                    index={i + 1}
                    key={key}
                    items={data.items[key]}
                    title={key}
                    setActiveTab={setActiveTab}
                    itemsView={state.itemsView}
                  />
                ))}
              </Box>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default ShopItems;
