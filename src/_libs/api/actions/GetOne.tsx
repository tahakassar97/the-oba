/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { Children, isValidElement, cloneElement, ReactNode } from 'react';
import { useParams } from 'next/navigation';
import { Loader } from '@/_libs/components/icons/Loader';

import { useGetOne, FetchType } from '../react-query/use-crud';

interface Props {
  url: string;
  children: ReactNode | ((data: any, isLoading: boolean) => ReactNode);
  id?: string;
  withoutId?: boolean;
  mode?: FetchType;
  fallback?: ReactNode;
  loader?: ReactNode;
  onError?: (error: unknown) => ReactNode;
}

function GetOne({
  url,
  mode = 'client',
  children,
  fallback = <div>No data available</div>,
  loader = <Loader />,
  onError,
  id: customId,
  withoutId,
}: Props): React.ReactElement {
  const { id } = useParams();

  const { data, isLoading, error } = useGetOne({
    url,
    mode,
    id: withoutId ? '' : (id as string) || (customId as string),
    queryOptions: {
      enabled: withoutId ? true : !!(id || customId),
    },
  });

  // Handle error with custom error handler or default error display
  if (error) {
    if (onError) {
      return onError(error) as React.ReactElement;
    }
    return <div>Error: {(error as Error)?.message}</div>;
  }

  if (isLoading) return <>{loader}</>;

  if (typeof children === 'function') {
    const result = children(data || {}, isLoading);
    return result as React.ReactElement;
  }

  const childrenArray = Children.toArray(children);
  if (childrenArray.length === 1 && isValidElement(childrenArray[0])) {
    return cloneElement(
      childrenArray[0] as React.ReactElement,
      { data, isLoading } as React.Attributes,
    );
  }

  return fallback as React.ReactElement;
}

export { GetOne };
