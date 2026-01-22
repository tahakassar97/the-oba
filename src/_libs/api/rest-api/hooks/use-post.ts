'use client';

import { MutationProps, useAppMutation } from './use-app-mutation';

export const usePost = (
  props: Omit<MutationProps, 'method'>,
): ReturnType<typeof useAppMutation> => {
  return useAppMutation({
    method: 'POST',
    message: 'Created Successfully!',
    ...props,
  });
};
