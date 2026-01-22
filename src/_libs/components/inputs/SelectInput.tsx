'use client';

import { FC, ReactNode, useEffect } from 'react';
import Select, { ActionMeta, Props as SelectProps } from 'react-select';
import { Controller, useFormContext } from 'react-hook-form';
import makeAnimated from 'react-select/animated';

import { IGenericObject } from '@/_libs/types';
import { useFocus } from '@/_libs/hooks';

import { Paragraph } from '../paragraphs/Paragraph';
import { Label } from './Label';
import { cn } from '../utils';
import { ErrorMessage } from './ErrorMessage';

interface Props extends SelectInputProps {
  optionValue: string;
  optionLabel: string | ((item: IGenericObject) => ReactNode);
  dataKey?: string | string[];
  error?: Error;
  handleChange?: (value: string) => void;
}

function getNestedValue(obj: IGenericObject, key: string | string[]) {
  if (!obj || !key) return undefined;

  if (typeof key === 'string') {
    return obj[key];
  }

  return key.reduce((acc, curr) => (acc[curr] !== undefined ? acc[curr] : undefined), obj);
}

function getOptions(
  options: Array<IGenericObject>,
  optionValue: string,
  optionLabel: string | ((item: IGenericObject) => ReactNode),
) {
  return options.map((item: IGenericObject) => ({
    label: typeof optionLabel === 'string' ? item[optionLabel] : optionLabel(item),
    value: item[optionValue],
  }));
}

const SelectInput: FC<Props> = ({
  options,
  optionValue,
  optionLabel,
  dataKey,
  error,
  handleChange,
  ...props
}) => {
  const _options = options ? (dataKey ? getNestedValue(options, dataKey) : options) : null;

  if (error)
    return (
      <Paragraph variant='h6' className='text-red-500'>
        {error.message}
      </Paragraph>
    );

  const onChange = (value: unknown) => {
    handleChange?.(value as string);
  };

  return (
    <SelectInputUI
      {...props}
      options={options ? getOptions(_options, optionValue, optionLabel) : []}
      onChange={onChange}
    />
  );
};

export { SelectInput };

const animatedComponents = makeAnimated();

export interface SelectInputProps extends SelectProps {
  options?: Array<{ label: string; value: string | number }>;
  label: string;
  name: string;
  isLoading?: boolean;
  onSelect?: (value: { label: string; value: string }) => void;
  containerClassName?: string;
}

const SelectInputUI: FC<SelectInputProps> = ({
  name,
  label,
  isLoading,
  onSelect,
  containerClassName,
  onChange,
  ...props
}) => {
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { handleBlur, handleFocus, isFocused } = useFocus();

  const value = getValues(name);

  const isLabelUp = isFocused || value?.length > 0 || value?.value || props.defaultValue;

  useEffect(() => {
    if (props.defaultValue && value) return;

    if (props.defaultValue && typeof props.defaultValue === 'string') {
      const option = props.options?.find(
        (option) => option.value?.toString() === props.defaultValue,
      );

      setValue(name, option);
    }

    if (
      props.defaultValue &&
      typeof props.defaultValue === 'object' &&
      props.options &&
      props.options?.length > 0
    ) {
      setValue(name, props.defaultValue);
    }

    if (
      props.defaultValue &&
      Array.isArray(props.defaultValue) &&
      props.options &&
      props.options?.length > 0
    ) {
      setValue(name, props.defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.defaultValue, props.options]);

  const hasError = Boolean(errors[name]);

  const portalTarget =
    typeof window !== 'undefined' && typeof document !== 'undefined' ? document.body : undefined;

  return (
    <div className={cn('flex flex-col gap-1', containerClassName)}>
      <div className='relative w-full'>
        <Label
          name={name}
          label={label}
          isLabelUp={!!props.defaultValue || isLabelUp}
          className={`
    absolute left-3 -top-2 z-2 transform 
    pointer-events-none transition-300
    ${isLabelUp ? 'text-[10px] text-primary bg-white px-1' : 'top-0.5 translate-y-3 text-sm'}
  `}
        />

        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange: _onChange, onBlur } }) => (
            <Select
              components={animatedComponents}
              {...props}
              value={value}
              onChange={(value) => {
                _onChange(value);
                onSelect?.(value as { label: string; value: string });
              }}
              menuPortalTarget={portalTarget}
              menuPosition='fixed'
              options={props.options}
              onBlur={onBlur}
              onMenuClose={handleBlur}
              onFocus={handleFocus}
              onInputChange={(value, actionMeta) => {
                onChange?.(value, actionMeta as unknown as ActionMeta<unknown>);
              }}
              placeholder=''
              styles={{
                menuPortal: (base) => ({
                  ...base,
                  zIndex: 9999, // High z-index for portal
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
                control: (base) => ({
                  ...base,
                  minHeight: '36px',
                }),
              }}
              instanceId={name}
              className={cn(
                'border-none focus:border-none focus:shadow-none shadow-none',
                props.className,
              )}
              classNames={{
                control: () =>
                  cn(
                    'input p-1.5 ring ring-1 ring-primary/80 !border-0 focus:!border-0 focus:!ring-primary hover:border-none focus:ring-primary hover:shadow-none !shadow-none focus:!shadow-none',
                    hasError && 'ring-red-500',
                    props.className,
                  ),
              }}
              isLoading={isLoading}
            />
          )}
        />
      </div>

      <ErrorMessage name={name} />
    </div>
  );
};

export { SelectInputUI };
