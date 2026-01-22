'use client';

import React, { cloneElement, forwardRef, useState } from 'react';
import { Popover as PopoverComponent, PopoverProps } from 'react-tiny-popover';

interface CustomComponentProps extends React.ComponentPropsWithoutRef<'div'> {
  onClick: () => void;
  children: React.ReactNode;
}

const CustomComponent = forwardRef<HTMLDivElement, CustomComponentProps>((props, ref) => {
  const forwardedRef = ref as React.RefObject<HTMLDivElement>;
  return cloneElement(
    props.children as React.ReactElement<{
      onClick: () => void;
      ref: React.RefObject<HTMLDivElement>;
    }>,
    {
      onClick: props.onClick,
      ref: forwardedRef,
    },
  );
});

CustomComponent.displayName = 'CustomComponent';

interface PopoverComponentProps extends Partial<PopoverProps> {
  content: React.ReactElement<{
    onClick?: () => void;
    [key: string]: unknown;
  }>;
  onClick?: () => void;
}

const Popover = ({ content, children, onClick, isOpen, ...props }: PopoverComponentProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(isOpen || false);

  const portalTarget =
    typeof window !== 'undefined' && typeof document !== 'undefined' ? document.body : undefined;

  return (
    <PopoverComponent
      transformMode='relative'
      isOpen={isPopoverOpen}
      onClickOutside={() => onClick?.() || setIsPopoverOpen(false)}
      content={
        <div className='bg-white p-5 shadow-lg rounded-lg'>
          {cloneElement(content, {
            onClick: () => setIsPopoverOpen((prev) => !prev),
          })}
        </div>
      }
      containerClassName='z-50'
      containerStyle={{
        zIndex: '9999px',
      }}
      parentElement={portalTarget}
      {...props}
    >
      <CustomComponent
        onClick={() => {
          setIsPopoverOpen((prev) => !prev);
        }}
      >
        {children}
      </CustomComponent>
    </PopoverComponent>
  );
};

export { Popover };
