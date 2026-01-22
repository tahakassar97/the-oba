'use client';

import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '../utils';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-200',
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none border border-gray-300 block h-5 w-5 rounded-full bg-gray-100 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
      )}
    />
  </SwitchPrimitives.Root>
));

Switch.displayName = 'Switch';

interface ToggleInputProps {
  name: string;
  defaultValue?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
  disabled?: boolean;
}

export function ToggleInput({
  name,
  defaultValue = false,
  leftLabel,
  rightLabel,
  className,
  disabled,
  ...props
}: ToggleInputProps) {
  const { control, setValue } = useFormContext();

  React.useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange, ...field } }) => (
        <div className='flex items-center gap-2'>
          {leftLabel && <label className='text-sm'>{leftLabel}</label>}
          <Switch
            checked={value}
            onCheckedChange={onChange}
            disabled={disabled}
            className={cn('data-[state=checked]:bg-primary', className)}
            {...field}
            {...props}
          />
          {rightLabel && <label className='text-sm'>{rightLabel}</label>}
        </div>
      )}
    />
  );
}

export { Switch };
