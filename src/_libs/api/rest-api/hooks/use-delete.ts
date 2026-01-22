'use client';

import { MutationProps, useAppMutation } from './use-app-mutation';

export const useDelete = (
  props: Omit<MutationProps, 'method'>,
): ReturnType<typeof useAppMutation> => {
  return useAppMutation({
    method: 'DELETE',
    ...props,
  });
};
