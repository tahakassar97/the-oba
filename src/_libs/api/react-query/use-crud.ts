import { useQuery, useMutation, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import { IGenericObject } from '@/_libs/types';
import { useToast } from '@/_libs/hooks';
import { useAuth } from '@/_libs/auth';

import { queryClient } from '../provider';
import { createRestService } from '../rest-api/services';

export type FetchType = 'server' | 'client';

interface UseAppMutationProps {
  url: string;
  method?: AxiosRequestConfig['method'];
  message?: string | null;
  id?: string;
  errorMsg?: string;
  headers?: object;
  invalidateQueries?: string[];
  customFullUrl?: string;
  hideMsg?: boolean;
  queryFn?: (url: string, params?: Record<string, unknown>) => Promise<unknown>;
}

export interface UseGetOptions {
  mode?: FetchType;
  url: string;
  params?: Record<string, unknown>;
  id?: string;
  accessToken?: string;
  serverOptions?: {
    prefetch?: boolean;
  };
  customUrl?: string;
  queryOptions?: Omit<UseQueryOptions<unknown, Error, unknown, readonly unknown[]>, 'queryKey'>;
  queryFn?: (url: string, params?: Record<string, unknown>) => Promise<unknown>;
}

interface ListResult<T> extends Omit<UseQueryResult<T>, 'data'> {
  data: T | undefined;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function useList<T = IGenericObject>(props: UseGetOptions): ListResult<T> {
  const service = createRestService<T>(props.url);

  const { getToken } = useAuth();
  const { errorNotify } = useToast();

  const result = useQuery({
    queryKey: [props.url, props.params],
    queryFn: () =>
      service?.list(props.params, {
        Authorization: `Bearer ${getToken() || ''}`,
      }) as IGenericObject,
    ...props.queryOptions,
  });

  if (result.error) errorNotify((result.error as IGenericObject)?.response?.data?.message);

  return {
    ...result,
    data: result.data,
  } as ListResult<T>;
}

export function useCreate<T = IGenericObject>(props: Omit<UseAppMutationProps, 'method'>) {
  const { invalidateQueries, message, hideMsg, url } = props;
  const { successNotify, errorNotify } = useToast();

  const service = createRestService<T>(url);

  const { getToken } = useAuth();

  return useMutation({
    mutationFn: (item: T) =>
      service?.create(item as Omit<T & { id: string; }, 'id'>, {
        Authorization: `Bearer ${getToken() || ''}`,
      }),
    onSuccess: () => {
      const result = onMutationSuccess({
        invalidateQueries,
        message,
        hideMsg,
        url,
        method: 'POST',
      });

      if (!props.hideMsg) successNotify(message ?? 'Created Successfully!');

      return result;
    },
    mutationKey: [url],
    onError: (error) => {
      errorNotify(
        (error as IGenericObject)?.response?.data?.error ??
        props.errorMsg ??
        'Something went wrong!',
      );
    },
    meta: {
      Authorization: `Bearer ${getToken() || ''}`,
    },
  });
}

export function useUpdate<T = IGenericObject>(props: Omit<UseAppMutationProps, 'method'>) {
  const { invalidateQueries, message, hideMsg, url, headers, id } = props;
  const { successNotify, errorNotify } = useToast();

  const service = createRestService<T>(url);

  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (params: { id: string;[key: string]: unknown; }) => {
      if (!service?.update) throw new Error('Service not available');
      await service.update(id ?? params.id, params as Partial<T & { id: string; }>, {
        Authorization: `Bearer ${getToken() || ''}`,
        ...headers,
      });
      return;
    },
    onSuccess: () => {
      const result = onMutationSuccess({
        invalidateQueries,
        message,
        hideMsg,
        url,
        method: 'PUT',
        headers,
      });

      if (!props.hideMsg) successNotify(message ?? 'Updated Successfully!');

      return result;
    },
    mutationKey: [url],
    onError: (error) => {
      errorNotify(
        (error as IGenericObject)?.response?.data?.error ??
        props.errorMsg ??
        'Something went wrong!',
      );
    },
  });
}

export function useDelete<T = IGenericObject>(props: Omit<UseAppMutationProps, 'method'>) {
  const { invalidateQueries, message, hideMsg, url } = props;
  const { successNotify, errorNotify } = useToast();

  const service = createRestService<T>(url);

  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!service?.remove) throw new Error('Service not available');

      await service.remove(id, { Authorization: `Bearer ${getToken() || ''}` });
      return;
    },
    onSuccess: () => {
      const result = onMutationSuccess({
        invalidateQueries,
        message,
        hideMsg,
        url,
        method: 'DELETE',
      });

      successNotify(message ?? 'Deleted Successfully!');

      return result;
    },
    mutationKey: [url],
    onError: (error) => {
      errorNotify(
        (error as IGenericObject)?.response?.data?.error ??
        props.errorMsg ??
        'Something went wrong!',
      );
    },
  });
}

export function useGetOne<T = IGenericObject>(props: UseGetOptions) {
  const service = createRestService<T>(props.url);

  const { errorNotify } = useToast();

  const { getToken } = useAuth();

  const { data, error, ...queryResult } = useQuery({
    queryKey: [props.url, props.params, props.id],
    queryFn: () =>
      service?.get(props.id ? props.id : '',
        {
          Authorization: `Bearer ${getToken() || ''}`
        }
      ),
    ...props.queryOptions,
  });

  if (error) errorNotify(error?.message);

  return {
    ...queryResult,
    data,
  } as ListResult<T>;
}

const onMutationSuccess = ({ invalidateQueries, url }: UseAppMutationProps) => {
  if (invalidateQueries && invalidateQueries.length > 0) {
    queryClient.invalidateQueries({
      predicate(query) {
        return invalidateQueries.some((_query) =>
          ((query?.queryKey?.[0] || query?.queryKey?.[1]) as IGenericObject)?.includes(_query),
        );
      },
    });
  } else {
    queryClient.invalidateQueries({
      predicate(query) {
        return url.includes((query.queryKey?.[0] as string) || (query.queryKey?.[1] as string));
      },
    });
  }
};
