import { FC } from 'react';

import './styles.css';

interface Props {
  variant?: 'center' | 'default';
}

const Loader: FC<Props> = ({ variant = 'center' }) => {
  return (
    <div
      className={
        variant === 'center'
          ? 'fixed inset-0 w-full h-full min-h-80 flex justify-center items-center z-10'
          : 'flex items-center'
      }
    >
      <span className='loader after:bg-primary before:bg-primary'></span>
    </div>
  );
};

export { Loader };
