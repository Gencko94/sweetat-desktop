import { Container, Hidden, Paper, Stack, Typography } from '@mui/material';
import { Box, BoxProps, styled } from '@mui/system';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IRestaurantInfo } from '../../../lib/interfaces/IRestaurantInfo';
import { useApplicationState } from '../../contexts/ApplicationContext';
import { useGetRestaurantItems } from '../../hooks/queryHooks/useGetRestaurantItems';
import DesktopCartCard from '../DesktopCartCard';
import ItemsViewToggle from '../ItemsViewToggle';
import ShopItemsSection from './ShopItemsSection';
import ShopItemsTabs from './ShopItemsTabs';
import ShopTopSellingSection from './ShopTopSellingSection';

interface IShopItemsProps {
  shop: IRestaurantInfo;
}

const ShopItems = ({ shop }: IShopItemsProps) => {
  const { t } = useTranslation();
  const [state] = useApplicationState();
  const [activeTab, setActiveTab] = useState<number>(0);
  const { data } = useGetRestaurantItems({ slug: shop.slug });
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
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
          <CategoriesWrapper>
            <Container
              sx={{
                maxWidth: { xl: 'xl', lg: 'lg', md: 'md' },
              }}
            >
              <Stack direction="row" spacing={4}>
                <ShopItemsTabs
                  handleChangeTab={handleChangeTab}
                  activeTab={activeTab}
                  tabTitles={tabTitles}
                />
                <Hidden mdDown>
                  <DesktopCartCard />
                </Hidden>
              </Stack>
            </Container>
          </CategoriesWrapper>
          <Box position="relative">
            <Container>
              <br />
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
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default ShopItems;
const CategoriesWrapper = styled((props: BoxProps) => (
  <Box component={Paper} elevation={0} {...props} />
))(({ theme }) => ({
  // backgroundColor: theme.palette.background.paper,
  position: 'sticky',
  top: 0,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  zIndex: theme.zIndex.appBar,
}));
