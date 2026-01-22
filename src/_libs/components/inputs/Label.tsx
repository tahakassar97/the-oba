import { FC } from 'react';

import { cn } from '../utils';

interface Props {
  name: string;
  label: string;
  isLabelUp: boolean;
  className?: string;
}

const Label: FC<Props> = ({ name, label, isLabelUp, className }) => {
  return (
    <label
      htmlFor={name}
      className={cn(
        'absolute left-3 z-2 transform transition-all duration-300 pointer-events-none',
        isLabelUp
          ? 'text-[10px] -top-2 text-primary bg-white h-2.5 px-1'
          : 'top-3 text-sm text-gray-500',
        className,
      )}
    >
      {label}
    </label>
  );
};

export { Label };
