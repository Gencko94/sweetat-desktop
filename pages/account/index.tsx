import { Container } from '@mui/material';
import { NextPage } from 'next';
import { useState } from 'react';
import AccountAddresses from '../../src/components/Account/AccountAddresses';
import AccountDetails from '../../src/components/Account/AccountDetails';
import AccountHeader from '../../src/components/Account/AccountHeader';
import { useSession } from '../../src/hooks/useSession';

const Account: NextPage = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [session, loading] = useSession();
  console.log(session, 'SESSION');
  const handleChangeTab = (tab: number) => setActiveTab(tab);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {session && (
        <>
          <AccountHeader
            user={{ name: session.user.name, email: session.user.email }}
            activeTab={activeTab}
            handleChangeTab={handleChangeTab}
          />
          <Container maxWidth="md" sx={{ py: 2 }}>
            {activeTab === 0 && <AccountDetails user={session.user} />}
            {activeTab === 1 && <AccountAddresses />}
          </Container>
        </>
      )}
    </>
  );
};

export default Account;
