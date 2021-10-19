import { QueryOptions, useQuery, UseQueryOptions } from 'react-query';
import { useRouter } from 'next/router';

export async function fetchSession() {
  const res = await fetch('/api/auth/session');
  const session = await res.json();
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
    queryConfig?: UseQueryOptions<any>;
  } = {
    queryConfig: {
      staleTime: 50 * 50 * 50,
      refetchOnMount: false,
    },
  }
) => {
  const router = useRouter();
  const query = useQuery('session', fetchSession, {
    ...queryConfig,
    onSettled(data, error) {
      if (queryConfig?.onSettled) queryConfig?.onSettled(data, error);
      if (data || !required) return;
      router.push(redirectTo);
    },
  });
  return [query.data, query.status === 'loading'];
};
