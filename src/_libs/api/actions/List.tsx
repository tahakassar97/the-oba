'use client';

import React, { Children, isValidElement, cloneElement, ReactNode } from 'react';
import { UseQueryOptions } from '@tanstack/react-query';

// import { ErrorComponent, Loader } from '@ui';
import { IGenericObject } from '@/_libs/types';
import { Icon, Loader } from '@/_libs/components';

import { useList, FetchType } from '../react-query/use-crud';
import { useQueryParams } from '../rest-api/hooks/use-query-params';

interface Props {
  url: string;
  customUrl?: string;
  children:
    | ReactNode
    | ((
        data: IGenericObject,
        params: {
          isLoading: boolean;
          hasNextPage: boolean;
          hasPreviousPage: boolean;
          totalRecords: number;
        },
      ) => ReactNode);
  mode?: FetchType;
  fallback?: ReactNode;
  loader?: ReactNode;
  hideLoader?: boolean;
  ignoredParams?: string[];
  responseKey?: string | null;
  queryOptions?: Omit<UseQueryOptions<unknown, Error, unknown, readonly unknown[]>, 'queryKey'>;
  onError?: (error: Error) => ReactNode;
}

function List({
  url,
  customUrl,
  mode = 'client',
  children,
  fallback,
  loader = <Loader />,
  hideLoader,
  ignoredParams,
  responseKey = 'data',
  queryOptions,
  onError,
}: Props): React.ReactElement {
  const params = useQueryParams(ignoredParams);

  const { data, isLoading, error, hasNextPage, hasPreviousPage } = useList({
    url,
    customUrl,
    mode,
    params,
    queryOptions,
  });

  // Handle error with custom error handler or default error display
  if (error) {
    if (onError) return onError(error) as React.ReactElement;

    return (
      <div
        // type="error"
        title='Something went wrong'
        className='flex justify-center gap-3 font-bold text-lg items-center border border-red-500 text-red-500 mt-10 rounded-md p-3'
        // message={error?.response?.data?.Message ?? error?.message}
      >
        <Icon name='x' className='text-red-500' size={22} />
        Something went wrong
      </div>
    );
  }

  if (isLoading && loader && !hideLoader) return cloneElement(loader as React.ReactElement);

  if (typeof children === 'function') {
    const result = children(data as IGenericObject, {
      isLoading,
      hasNextPage,
      hasPreviousPage,
      totalRecords: data?.meta?.total || 0,
    });
    return result as React.ReactElement;
  }

  const childrenArray = Children.toArray(children);
  if (childrenArray.length === 1 && isValidElement(childrenArray[0])) {
    return cloneElement(
      childrenArray[0] as React.ReactElement,
      {
        data: responseKey ? (data as IGenericObject)[responseKey as string] : data,
        isLoading,
        totalRecords: data?.meta?.total || 0,
      } as React.Attributes,
    );
  }

  // If multiple children, wrap with a fragment and pass data to first child
  if (childrenArray.length > 0 && isValidElement(childrenArray[0])) {
    return cloneElement(
      childrenArray[0] as React.ReactElement,
      {
        data: responseKey ? (data as IGenericObject)?.[responseKey as string] : data,
        isLoading,
        hasNextPage: hasNextPage,
        hasPrevPage: hasPreviousPage,
        totalRecords: data?.meta?.total || 0,
      } as React.Attributes,
      ...childrenArray.slice(1),
    );
  }

  return fallback as React.ReactElement;
}

export { List };
