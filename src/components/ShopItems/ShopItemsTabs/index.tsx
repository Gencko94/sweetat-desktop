import { Tab, Tabs as MuiTabs } from "@mui/material";
import { styled } from "@mui/system";
import { IGetRestaurantItemsResponse } from "../../../hooks/queryHooks/useGetRestaurantItems";

interface IShopItemsTabsProps {
  handleChangeTab: (e: React.SyntheticEvent, newValue: number) => void;
  activeTab: number;
  tabTitles: string[];
}

const ShopItemsTabs = ({
  activeTab,
  handleChangeTab,
  tabTitles,
}: IShopItemsTabsProps) => {
  return (
    <Tabs
      value={activeTab}
      onChange={handleChangeTab}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="Restaurant Categories"
    >
      {tabTitles.map((title) => (
        <Tab key={title} label={title} />
      ))}
    </Tabs>
  );
};

export default ShopItemsTabs;
const Tabs = styled(MuiTabs)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  position: "sticky",
  top: 0,
  // @ts-ignore
  zIndex: theme.zIndex.appBar,
}));
