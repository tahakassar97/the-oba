/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import DatePicker, { type DatePickerProps } from 'react-datepicker';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { InputProps } from './IProps';
import { Label } from './Label';
import { ErrorMessage, getErrorMessage } from './ErrorMessage';
import { useFocus } from '../../hooks';
import { cn } from '../utils';

import './styles.css';
import 'react-datepicker/dist/react-datepicker.css';

type Props = InputProps &
  Omit<DatePickerProps, 'selectsRange' | 'autoComplete' | 'name'> & {
    onSelectDate?: (date: Date | Date[] | null) => void;
    onChange?: (date: Date | Date[] | null) => void;
    selectsMultiple?: boolean;
  };

const baseClassName = 'text-center align-center w-9 pr-0.5 h-9 pt-1.5';

const DatePickerInput: React.FC<Props> = ({
  containerClassName,
  selectsMultiple = true,
  showMonthYearDropdown = false,
  label,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { handleBlur, handleFocus, isFocused } = useFocus();

  const watchedValue = useWatch({ name: props.name });

  const isLabelUp = isFocused || watchedValue || props.defaultValue;

  return (
    <div className={cn('flex flex-col gap-1', containerClassName)}>
      <div className='relative'>
        <Label name={props.name} label={label} isLabelUp={isLabelUp} />
        <Controller
          name={props.name}
          control={control}
          defaultValue={props.defaultValue}
          render={({ field: { value, onChange, onBlur } }) => {
            const parsedValue = (() => {
              if (!value) return null;

              if (value instanceof Date) return value;

              if (typeof value === 'object' && value?.seconds) {
                return new Date(value.seconds * 1000);
              }

              const parsed = new Date(value);
              return isNaN(parsed.getTime()) ? null : parsed;
            })();

            return (
              <DatePicker
                isClearable
                selected={parsedValue}
                onChange={(date: Date | null) => {
                  onChange(date);
                  props.onSelectDate?.(date);
                }}
                defaultValue={props.defaultValue}
                calendarClassName='!z-40 w-full'
                wrapperClassName='w-full'
                popperPlacement='top'
                dateFormat={
                  props.dateFormat
                    ? props.dateFormat
                    : props.showTimeSelect
                      ? 'dd MMM, yyyy HH:mm a'
                      : 'dd MMM, yyyy'
                }
                className={cn('input w-full', props.className, {
                  'input-invalid': Boolean(getErrorMessage(errors, props.name)),
                })}
                dayClassName={(day: Date) => {
                  const isSelected = Array.isArray(parsedValue)
                    ? parsedValue.some((v) => v?.getTime() === day.getTime())
                    : parsedValue?.getTime() === day.getTime();

                  return cn(baseClassName, {
                    'bg-primary text-white': isSelected,
                  });
                }}
                onBlur={() => {
                  handleBlur();
                  onBlur();
                }}
                onFocus={handleFocus}
                {...props}
              />
            );
          }}
        />
      </div>

      <ErrorMessage name={props.name} />
    </div>
  );
};

export { DatePickerInput };
