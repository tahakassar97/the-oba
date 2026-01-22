import { QueryFunctionContext, UseQueryOptions } from '@tanstack/react-query';

import { getAxiosInstance, commonHeaders } from '../../utils';

export type FetchMode = 'client' | 'server';

export interface UseGetOptions {
  mode?: FetchMode;
  url: string;
  params?: Record<string, unknown>;
  accessToken?: string;
  serverOptions?: {
    prefetch?: boolean;
  };
  customUrl?: string;
  queryOptions?: Omit<UseQueryOptions<unknown, Error, unknown, readonly unknown[]>, 'queryKey'>;
}

export interface Meta {
  accessToken: string;
}

export const fetcher = async <T>(
  context: Omit<QueryFunctionContext, 'signal'> & { customUrl?: string },
): Promise<T> => {
  const { queryKey, meta, customUrl } = context;
  const [fullUrl, params] = queryKey;
  const { accessToken } = meta as unknown as Meta;

  return getAxiosInstance(customUrl)
    .get<T>(`${fullUrl}`, {
      params: { ...(params as object) },
      headers: { ...commonHeaders, Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => res.data);
};
