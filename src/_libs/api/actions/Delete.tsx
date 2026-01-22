'use client';

import { cloneElement } from 'react';
import { useDelete } from '../react-query/use-crud';

interface Props {
  url: string;
  id?: string;
  children: React.ReactNode;
  invalidateQueries?: string[];
  onSuccess?: VoidFunction;
}

const Delete = ({ url, id, children, onSuccess, invalidateQueries }: Props) => {
  const { isPending, mutateAsync } = useDelete({
    url,
    invalidateQueries,
  });

  const onSubmit = async () => {
    await mutateAsync(id!, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  return cloneElement(
    children as React.ReactElement<{ onClick: VoidFunction; isLoading: boolean }>,
    {
      onClick: onSubmit,
      isLoading: isPending,
    },
  );
};

export { Delete };
