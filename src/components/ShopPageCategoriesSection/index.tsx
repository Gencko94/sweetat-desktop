import { Container, Hidden, Paper, Stack } from '@mui/material';
import { Box, BoxProps, styled } from '@mui/system';
import DesktopCartCard from '../DesktopCartCard';
import ShopItemsTabs from '../ShopItems/ShopItemsTabs';

interface IShopPageCategoriesSectionProps {
  tabTitles: string[];
  activeTab: number;
  handleChangeTab: (event: React.SyntheticEvent, newValue: number) => void;
}

const ShopPageCategoriesSection = ({
  tabTitles,
  activeTab,
  handleChangeTab,
}: IShopPageCategoriesSectionProps) => {
  return (
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
  );
};

export default ShopPageCategoriesSection;
const CategoriesWrapper = styled((props: BoxProps) => (
  <Box component={Paper} elevation={0} {...props} />
))(({ theme }) => ({
  position: 'sticky',
  top: 0,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  zIndex: theme.zIndex.appBar,
}));
