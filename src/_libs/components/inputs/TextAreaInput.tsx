'use client';

import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Label } from './Label';
import { InputProps } from './IProps';
import { useFocus } from '../../hooks';
import { ErrorMessage, getErrorMessage } from './ErrorMessage';
import { cn } from '../utils';

export const TextAreaInput: React.FC<
  InputProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ label, containerClassName, className, ...props }) => {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { handleBlur, handleFocus, isFocused } = useFocus();
  const value = getValues(props.name);

  useEffect(() => {
    if (props.defaultValue) {
      setValue(props.name, props.defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.defaultValue]);

  const isLabelUp = isFocused || value || props.defaultValue;

  const { ref, onChange } = register(props.name);

  const hasError = Boolean(getErrorMessage(errors, props.name));

  return (
    <div className={`flex w-full flex-col gap-1 ${containerClassName}`}>
      <div className='relative'>
        <Label
          name={props.name}
          label={label}
          isLabelUp={isLabelUp}
          className={`
    absolute left-3 -top-2 z-2 transform 
    pointer-events-none transition-300
    ${isLabelUp ? 'text-[10px] text-primary bg-white px-1' : 'top-1 translate-y-3 text-sm'}
  `}
        />
        <textarea
          ref={ref}
          id={props.name}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn('input resize-none', className, hasError && '!input-invalid')}
          onChange={onChange}
          placeholder={props.placeholder}
          {...props}
        />
      </div>

      <ErrorMessage name={props.name} />
    </div>
  );
};
