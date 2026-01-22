/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { BaseSyntheticEvent, FC, ReactNode, useEffect } from 'react';
import { FormProvider, useForm, SubmitHandler, useFormContext } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { IGenericObject } from '../../types';
import { cn } from '../utils';
import { LoadingButton } from '../buttons/LoadingButton';

interface IFormProps {
  children: React.ReactNode;
  onSubmit?: (data: BaseSyntheticEvent<object, any, any> | undefined) => void;
  className?: string;
  title?: string;
  hideButton?: boolean;
  data?: Record<string, IGenericObject>;
  isLoading?: boolean;
  buttonProps?: {
    title?: string;
    className?: string;
  };
  Button?: ReactNode;
  resetFormByName?: string;
}

const FormUI: FC<IFormProps> = ({ children, className, onSubmit }) => {
  return (
    <form
      className={cn('px-2', className)}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
    >
      {children}
    </form>
  );
};

interface IHookFormProps extends IFormProps {
  schema?: yup.ObjectSchema<yup.Maybe<yup.AnyObject>>;
}

const Form: FC<IHookFormProps> = ({ buttonProps, Button: CustomButton, isLoading, ...props }) => {
  const schema = props.schema;

  const methods = useForm({
    resolver: schema ? yupResolver(schema as any) : undefined,
  });

  return (
    <FormProvider {...methods}>
      <FormController {...props}>
        {props.children}

        {!props.hideButton &&
          (CustomButton ?? (
            <div className='flex w-full justify-end'>
              <LoadingButton
                variant='primary'
                className={`flex items-center gap-2 mt-5 ${buttonProps?.className ?? ''}`}
                type='submit'
                isLoading={isLoading}
              >
                {buttonProps?.title ?? 'Submit'}
              </LoadingButton>
            </div>
          ))}
      </FormController>
    </FormProvider>
  );
};

export { Form };

export const FormController: FC<IHookFormProps> = ({
  children,
  onSubmit,
  resetFormByName,
  ...props
}: IHookFormProps & { onSubmit?: SubmitHandler<any> }) => {
  const methods = useFormContext();

  useEffect(() => {
    if (props.data) {
      if (resetFormByName) {
        methods.reset({
          [resetFormByName as string]: props.data,
        });
      } else {
        methods.reset(props.data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, methods.reset]);

  const handleSubmit = (data: IGenericObject) => {
    onSubmit?.(data);
  };

  return (
    <FormUI {...props} onSubmit={methods.handleSubmit(handleSubmit)}>
      {children}
    </FormUI>
  );
};
