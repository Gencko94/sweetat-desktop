import axios from '../../utils/axios';

export const getUserInfo = async (token: string, user_id: number) => {
  const resp = await axios.post('/update-user-info', {
    token,
    user_id,
  });
  return resp.data;
};
