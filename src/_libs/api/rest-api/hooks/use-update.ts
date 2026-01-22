import { MutationProps, useAppMutation } from './use-app-mutation';

interface Props extends Omit<MutationProps, 'method'> {
  method?: 'PUT' | 'PATCH';
}

export const useUpdate = (props: Props): ReturnType<typeof useAppMutation> => {
  return useAppMutation({
    method: props.method || 'PUT',
    message: 'Updated Successfully!',
    ...props,
  });
};
