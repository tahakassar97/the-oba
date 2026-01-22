'use client';

import { forwardRef } from 'react';
import { BaseInput } from './BaseInput';

import { InputProps } from './IProps';

const TextInput = forwardRef<HTMLInputElement, InputProps>(({ type = 'text', ...props }, ref) => {
  return <BaseInput type={type} {...props} ref={ref} />;
});

TextInput.displayName = 'TextInput';

export { TextInput };
