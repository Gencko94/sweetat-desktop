import { IUpdateUserAccountProps } from '../../src/components/Account/AccountDetails';
import axios from '../../utils/axios';
import { getToken } from '../../utils/getToken';

export const updateAccount = async (data: IUpdateUserAccountProps) => {
  const token = getToken();
  const resp = await axios.post('/update-profile', {
    token,
    ...data,
  });
  return resp.data;
};
