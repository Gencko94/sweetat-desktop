import { Container } from '@mui/material';
import { useState } from 'react';
import AccountAddresses from '../../src/components/Account/AccountAddresses';
import AccountDetails from '../../src/components/Account/AccountDetails';
import AccountHeader from '../../src/components/Account/AccountHeader';

const Account = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleChangeTab = (tab: number) => setActiveTab(tab);
  return (
    <>
      <AccountHeader activeTab={activeTab} handleChangeTab={handleChangeTab} />
      <Container maxWidth="md" sx={{ py: 2 }}>
        {activeTab === 0 && <AccountDetails />}
        {activeTab === 1 && <AccountAddresses />}
      </Container>
    </>
  );
};

export default Account;
