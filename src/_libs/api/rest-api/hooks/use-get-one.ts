'use client';

import { useState, useEffect } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { auth } from '@/_libs/auth';

import { fetcher, UseGetOptions } from './fetcher';
import { queryClient } from '../../provider';

interface Props extends UseGetOptions {
  id: string;
}

type UseGetOneReturn =
  | ReturnType<typeof useQuery>
  | {
      data: unknown;
      isLoading: boolean;
      error: null;
    };

export function useGetOne({
  mode = 'client',
  url,
  params = {},
  accessToken = '',
  serverOptions = { prefetch: false },
  id,
  queryOptions,
}: Props): UseGetOneReturn {
  const token = auth.getToken();

  // Generate query key if not provided
  const queryKey = { ...params, lang: 'ar' };

  const _url = `${url}/${id}`;

  // Client-side fetching using React Query
  const query = useQuery({
    queryKey: [_url, queryKey],
    queryFn: () =>
      fetcher({
        queryKey: [_url, queryKey],
        meta: { accessToken: token },
        client: queryClient,
        ...queryOptions,
      }),
    enabled: mode === 'client',
    ...queryOptions,
  }) as UseQueryResult;

  // Server-side rendering support
  const [serverData, setServerData] = useState<unknown>([]);

  useEffect(() => {
    if (mode === 'server' && serverOptions.prefetch) {
      const fetchData = async () => {
        try {
          const data = await fetcher({
            queryKey: [_url, queryKey],
            meta: { accessToken: token },
            client: queryClient,
            ...queryOptions,
          });
          setServerData(data);
        } catch (error) {
          console.error('Server-side data fetch failed:', error);
        }
      };

      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, serverOptions.prefetch, url, id, params, accessToken]);

  // Return different data based on mode
  return mode === 'client'
    ? query
    : {
        data: serverData,
        isLoading: false,
        error: null,
      };
}
