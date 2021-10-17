import { TOKEN_LOCAL_STORAGE_KEY } from '../src/constants';

export const getToken = () => {
  if (typeof window != 'undefined') {
    return localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  } else {
    return '';
  }
};
