'use client';

import { cloneElement, FC } from 'react';

import { IGenericObject } from '@/_libs/types';
import { useCreate } from '../react-query/use-crud';

interface Props {
  url: string;
  children: React.ReactNode;
  invalidateQueries?: string[];
  hideMsg?: boolean;
  message?: string;
  headers?: object;
  transformBody?: (body: IGenericObject) => Promise<object> | object;
  onSuccess?: (response: IGenericObject) => void;
}

const Create: FC<Props> = ({
  url,
  children,
  headers,
  invalidateQueries,
  hideMsg,
  message,
  onSuccess,
  transformBody,
}) => {
  const { isPending, mutateAsync } = useCreate({
    url,
    invalidateQueries,
    headers,
    hideMsg,
    message,
  });

  const onSubmit = async (data: object) => {
    const body = transformBody ? await transformBody(data) : data;

    await mutateAsync(body, {
      onSuccess: (response: unknown) => {
        if (response) onSuccess?.(response);
      },
    });
  };

  return cloneElement(
    children as React.ReactElement<{
      onSubmit: (data: object) => void;
      isLoading: boolean;
    }>,
    {
      onSubmit,
      isLoading: isPending,
    },
  );
};

export { Create };
