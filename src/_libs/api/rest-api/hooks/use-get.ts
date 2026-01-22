/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { auth } from '@/_libs/auth';

import { fetcher, UseGetOptions } from './fetcher';
import { queryClient } from '../../provider';

/**
 * Custom hook for fetching lists of data with flexible rendering modes
 */
export function useGet({
  mode = 'client',
  url,
  params = {},
  accessToken = '',
  serverOptions = { prefetch: false },
  queryOptions,
  customUrl,
}: UseGetOptions) {
  const token = auth.getToken();

  // Generate query key if not provided
  const queryKey = [url, { ...params, lang: 'ar', BypassCache: true }];

  // Client-side fetching using React Query
  const query = useQuery({
    queryKey,
    queryFn: () =>
      fetcher({
        queryKey,
        meta: { accessToken: token },
        client: queryClient,
        customUrl,
      }),
    enabled: mode === 'client',
    ...queryOptions,
  });

  // Server-side rendering support
  const [serverData, setServerData] = useState<unknown>([]);

  useEffect(() => {
    if (mode === 'server' && serverOptions.prefetch) {
      const fetchData = async () => {
        try {
          const data = await fetcher({
            queryKey,
            meta: { accessToken: token },
            client: queryClient,
            customUrl,
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
  }, [mode, serverOptions.prefetch, url, params, accessToken, customUrl]);

  // Return different data based on mode
  return mode === 'client'
    ? (query as Record<string, any>)
    : {
        data: serverData as Record<string, any>,
        isLoading: false,
        error: null,
      };
}
