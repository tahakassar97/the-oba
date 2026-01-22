'use client';

import { cloneElement } from 'react';
import { useParams } from 'next/navigation';

import { IGenericObject } from '@/_libs/types';

import { useUpdate } from '../react-query/use-crud';

interface Props {
  url: string;
  id?: string;
  children: React.ReactNode;
  data?: IGenericObject;
  headers?: object;
  withoutId?: boolean;
  message?: string;
  errorMsg?: string;
  onSuccess?: (data: unknown) => void;
  transformBody?: (body: IGenericObject) => object;
}

const Update = ({
  url,
  children,
  data,
  headers,
  message,
  errorMsg,
  id: customId,
  onSuccess,
  transformBody,
}: Props) => {
  const { id } = useParams() as { id: string };

  const { isPending, mutateAsync } = useUpdate({
    url,
    id: customId || id,
    headers,
    message,
    errorMsg,
  });

  const onSubmit = async (data: object) => {
    const body = transformBody ? transformBody(data) : data;

    if (body instanceof FormData) {
      body.append('id', customId || id);
    }

    await mutateAsync(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      body as any,
      {
        onSuccess: (data: unknown) => {
          onSuccess?.(data);
        },
        onError: (err: Error) => {
          console.log('Error', err);
        },
      },
    );
  };

  return cloneElement(
    children as React.ReactElement<{
      onSubmit: (data: object) => void;
      isLoading: boolean;
      data: IGenericObject;
    }>,
    {
      onSubmit,
      data,
      isLoading: isPending,
    },
  );
};

export { Update };
