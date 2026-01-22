/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { useToast } from '@/_libs/hooks';
import { auth } from '@/_libs/auth';

import { queryClient } from '../../provider';
import { getAxiosInstance, commonHeaders } from '../../utils';
import { IGenericObject } from '../../../types';

export interface MutationProps {
  url: string;
  method: AxiosRequestConfig['method'];
  message?: string | null;
  errorMsg?: string;
  headers?: object;
  invalidateQueries?: string[];
  customFullUrl?: string;
  hideMsg?: boolean;
}

export const useAppMutation = ({
  url,
  method,
  invalidateQueries,
  message = 'Operation Completed Successfully!',
  errorMsg,
  headers,
  customFullUrl,
  hideMsg,
}: MutationProps): UseMutationResult<any, AxiosError, object> => {
  const token = auth.getToken();
  const { errorNotify, successNotify } = useToast();

  const mutationOptions: UseMutationOptions<AxiosResponse, AxiosError, object> = {
    mutationFn: async (data: object) => {
      const response = await getAxiosInstance().request({
        method,
        data,
        headers: {
          ...commonHeaders,
          ...headers,
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        url: customFullUrl ? undefined : url,
        baseURL: customFullUrl,
      });

      return response?.data;
    },

    onSuccess: () => {
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

      if (message && !hideMsg) {
        successNotify(message);
      }
    },

    onError: (err: AxiosError) => {
      errorNotify(errorMsg ?? (err?.response?.data as IGenericObject)?.Message);
    },
  };

  return useMutation(mutationOptions);
};

// Utility type for easier type inference
export type AppMutationHook = ReturnType<typeof useAppMutation>;
