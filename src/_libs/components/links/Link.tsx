'use client';

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

  const externalProps = isExternal
    ? {
        target: props.target || '_blank',
        rel: props.rel || 'noopener noreferrer',
        prefetch: false,
      }
    : {};

  return (
    <NextLink
      href={href}
      {...props}
      {...externalProps}
      className={cn('transition-300', props.className)}
    >
      {children}
    </NextLink>
  );
}
