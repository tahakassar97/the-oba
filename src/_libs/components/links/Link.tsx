import React from 'react';
import NextLink from 'next/link';

import { cn } from '../utils';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function Link({ href, children, ...props }: LinkProps) {
  const isExternal =
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:');

  if (isExternal) {
    return (
      <a
        href={href}
        target={props.target || '_blank'}
        rel={props.rel || 'noopener noreferrer'}
        {...props}
        className={cn('transition-300', props.className)}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} {...props} className={cn('transition-300', props.className)}>
      {children}
    </NextLink>
  );
}
