'use client';

import { useEffect, forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Label } from './Label';
import { ErrorMessage, getErrorMessage } from './ErrorMessage';
import { InputProps } from './IProps';
import { cn } from '../utils';
import { useFocus } from '../../hooks';

const BaseInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, containerClassName, defaultValue, ...props }, ref) => {
    const {
      control,
      getValues,
      setValue,
      formState: { errors },
    } = useFormContext();
    const { handleBlur, handleFocus, isFocused } = useFocus();
    const value = getValues(props.name);

    useEffect(() => {
      if (defaultValue) {
        setValue(props.name, defaultValue);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue]);

    const isLabelUp = isFocused || value || defaultValue || (props.type === 'number' && value >= 0);

    const hasError = Boolean(getErrorMessage(errors, props.name));

    return (
      <div className={cn('flex flex-col gap-1', containerClassName)}>
        <div className='relative w-full h-fit'>
          <Label name={props.name} label={label} isLabelUp={isLabelUp} />
          <Controller
            name={props.name}
            control={control}
            render={({ field: { value: _value, onChange, onBlur } }) => {
              return (
                <input
                  {...props}
                  id={props.name}
                  value={_value ?? value ?? ''}
                  onChange={onChange}
                  onBlur={() => {
                    handleBlur();
                    onBlur();
                  }}
                  onFocus={handleFocus}
                  ref={ref}
                  className={cn('input', hasError && 'input-invalid', props.className)}
                />
              );
            }}
          />
        </div>
        <ErrorMessage name={props.name} />
      </div>
    );
  },
);

BaseInput.displayName = 'BaseInput';

export { BaseInput };
