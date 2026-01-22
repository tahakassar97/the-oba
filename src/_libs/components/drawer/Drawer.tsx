import { ReactNode } from 'react';
import { X } from 'lucide-react';

import { Button } from '../buttons/Button';
import { useParams, useScrollLock } from '../../hooks';
import { cn } from '../utils';
import { Paragraph } from '../paragraphs/Paragraph';

export interface DrawerProps {
  position?: 'left' | 'right';
  title?: string | ReactNode;
  children: (props: { toggle: () => void; close: () => void; isOpen: boolean }) => ReactNode;
  className?: string;
  buttonProps?: {
    label?: string | ReactNode;
    className?: string;
    size?: 'default' | 'sm' | 'xs' | 'lg' | 'icon';
    variant?: 'primary' | 'secondary' | 'link' | 'outline';
    onClick?: (isOpen: boolean) => void;
    onClose?: () => void;
  };
  hideButton?: boolean;
  drawerKey?: string;
  drawerValue?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  position = 'right',
  title,
  children,
  className,
  buttonProps,
  drawerKey = 'drawer',
  drawerValue = 'drawer',
  hideButton = false,
}) => {
  const { changeParams, getParam } = useParams();
  const isMounted = useScrollLock(getParam(drawerKey) === drawerValue);

  const toggle = () => {
    if (getParam(drawerKey) === drawerValue) {
      changeParams(drawerKey, undefined);
    } else {
      changeParams(drawerKey, drawerValue);
    }
  };

  const close = () => {
    buttonProps?.onClose?.();
    changeParams(drawerKey, undefined);
  };

  const positionClasses = {
    left: {
      container: 'left-0 translate-x-0 data-[state=closed]:-translate-x-full',
      overlay: 'left-0',
    },
    right: {
      container: 'right-0 translate-x-0 data-[state=closed]:translate-x-full',
      overlay: 'right-0',
    },
  }[position];

  const handleButtonClick = () => {
    buttonProps?.onClick?.(getParam(drawerKey) === drawerValue);
    toggle();
  };

  return isMounted ? (
    <>
      {!hideButton && (
        <Button {...buttonProps} onClick={handleButtonClick}>
          {buttonProps?.label ?? 'Open Drawer'}
        </Button>
      )}

      {getParam(drawerKey) === drawerValue && (
        <div
          className={cn(
            'fixed inset-0 z-40 bg-black/20 backdrop-blur-sm',
            `${positionClasses.overlay}`,
          )}
          onClick={close}
        />
      )}
      <aside
        data-state={getParam(drawerKey) === drawerValue ? 'open' : 'closed'}
        className={cn(
          'fixed top-0 bottom-0 w-100 shadow-xl z-40 transition-transform overflow-auto bg-white duration-300 ease-in-out',
          positionClasses.container,
          className,
        )}
      >
        {/* Header */}
        {title && (
          <div className='flex items-center justify-between p-4 border-b border-gray-200'>
            <Paragraph variant='h4' className='font-semibold px-4'>
              {title}
            </Paragraph>
            <Button onClick={close} variant='link'>
              <X className='h-6 w-6' />
            </Button>
          </div>
        )}

        {/* Content */}
        <div className={`p-4 h-[calc(100vh-5rem)] ${title ? 'pt-2' : ''}`}>
          {getParam(drawerKey) === drawerValue &&
            children({ toggle, close, isOpen: getParam(drawerKey) === drawerValue })}
        </div>
      </aside>
    </>
  ) : null;
};
