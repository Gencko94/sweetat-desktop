import { Tabs, Tab, TabProps, TabsProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IAccountTabsProps {
  activeTab: number;
  handleChangeTab: (_: number) => void;
}

const AccountTabs = ({ activeTab, handleChangeTab }: IAccountTabsProps) => {
  return (
    <StyledTabs
      value={activeTab}
      variant="scrollable"
      onChange={(_, value) => {
        handleChangeTab(value);
      }}
    >
      <StyledTab value={0} label="Account Details" />
      <StyledTab value={1} label="My Addresses" />
      <StyledTab value={2} label="My Wallet" />
      <StyledTab value={3} label="My Favourate Shops" />
    </StyledTabs>
  );
};

export default AccountTabs;
const StyledTabs = styled((props: TabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'none',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: '3px',
  },
});
const StyledTab = styled((props: TabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    marginRight: theme.spacing(0.5),
    color: '#ebebeb',
    minHeight: '32px',
    padding: '0.75rem',
    transition: 'color 150ms ease',
    ':hover': {
      color: '#fff',
    },

    '&.Mui-selected': {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
      borderRadius: '25px',
      backgroundColor: '#fff',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  })
);
