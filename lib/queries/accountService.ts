import { IUpdateUserAccountProps } from '../../src/components/Account/AccountDetails';
import axios from '../../utils/axios';

export const updateAccount = async (
  data: IUpdateUserAccountProps & {
    token: string;
  }
) => {
  const resp = await axios.post('/update-profile', {
    ...data,
  });
  return resp.data;
};
