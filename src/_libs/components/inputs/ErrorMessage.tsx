import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { IGenericObject } from '../../types';

interface Props {
  name: string;
  errorClassName?: string;
}

export const getErrorMessage = (errors: IGenericObject, name: string) => {
  // Handle nested field errors
  const errorPath: string | IGenericObject = name
    .split('.')
    .reduce((acc: IGenericObject, curr) => acc?.[curr], errors);
  const errorMessage = errorPath?.message as string | undefined;
  return errorMessage;
};

const ErrorMessage: FC<Props> = ({ name, errorClassName = 'text-red-500 text-xs' }) => {
  const {
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessage(errors, name);

  if (!errorMessage) return null;

  return <p className={errorClassName}>*{errorMessage}</p>;
};

export { ErrorMessage };
