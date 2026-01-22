import { FC } from 'react';

import { Button } from './Button';
import { Loader } from '../icons/Loader';
import { ButtonProps } from './Button';
import { cn } from '../utils';

interface Props extends ButtonProps {
  isLoading?: boolean;
}

const LoadingButton: FC<Props> = ({ isLoading, children, className, ...props }) => {
  return (
    <Button
      disabled={isLoading}
      className={cn(
        className,
        isLoading ? 'hover:bg-inherit bg-inherit text-primary cursor-progress' : '',
      )}
      {...props}
    >
      {isLoading && <Loader variant='default' />}
      {children}
    </Button>
  );
};

export { LoadingButton };
