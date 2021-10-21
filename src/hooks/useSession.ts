import { useQuery, UseQueryOptions } from 'react-query';
import { useRouter } from 'next/router';
import { DURATIONS } from '../constants';
import { IUser } from '../../lib/interfaces/IUser';
import axios from 'axios';

export async function fetchSession() {
  const res = await axios.get('/api/auth/session');
  const session = res.data;
  if (Object.keys(session).length > 0) {
    return session;
  }
  return null;
}

export const useSession = (
  {
    required = true,
    redirectTo = '/login',
    queryConfig,
  }: {
    required?: boolean;
    redirectTo?: string;
    queryConfig?: UseQueryOptions<{ user: IUser }>;
  } = {
    queryConfig: {
      staleTime: DURATIONS.twoMins,
    },
  }
) => {
  const router = useRouter();
  const query = useQuery<{ user: IUser }>('session', fetchSession, {
    ...queryConfig,
    onSettled(data, error) {
      if (queryConfig?.onSettled) queryConfig?.onSettled(data, error);
      if (data || !required) return;
      router.push(redirectTo);
    },
  });
  return { session: query.data, isLoading: query.status === 'loading' };
};
