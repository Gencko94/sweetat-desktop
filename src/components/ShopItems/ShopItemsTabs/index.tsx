import { Tab, Tabs as MuiTabs, TabsProps } from '@mui/material';
import { styled } from '@mui/system';
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
      {tabTitles.map(title => (
        <Tab
          key={title}
          onClick={() => {
            const element = document.getElementById(title);
            if (element) {
              const y =
                element.getBoundingClientRect().top + window.scrollY + -50;

              scrollTo({
                behavior: 'smooth',
                top: y,
              });
            }
          }}
          label={title}
        />
      ))}
    </Tabs>
  );
};

export default ShopItemsTabs;
const Tabs = styled((props: TabsProps) => <MuiTabs {...props} />)(
  ({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      backgroundPosition: 'bottom',
      flex: 1,
    },
    [theme.breakpoints.up('md')]: {
      backgroundPosition: 'bottom',
      flexBasis: '67%',
    },
  })
);
