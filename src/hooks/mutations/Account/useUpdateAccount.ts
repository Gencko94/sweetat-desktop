import { useMutation } from 'react-query';
import { updateAccount } from '../../../../lib/queries/accountService';

const useUpdateAccount = () => {
  return useMutation(updateAccount);
};

export default useUpdateAccount;
