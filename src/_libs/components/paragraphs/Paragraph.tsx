'use client';

import { ElementType } from 'react';
import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '../utils';

const paragraphVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-5xl md:text-6xl font-bold',
      h2: 'text-4xl font-bold',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-semibold',
      h5: 'text-lg font-semibold',
      h6: 'text-base font-semibold',
      p: 'text-base',
      small: 'text-sm',
      large: 'text-lg',
    },
    textColor: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      muted: 'text-gray-600',
      white: 'text-white',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    variant: 'p',
    textColor: 'muted',
    align: 'left',
  },
});

type ParagraphVariants = VariantProps<typeof paragraphVariants>;

interface ParagraphProps extends React.HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: ParagraphVariants['variant'];
  textColor?: ParagraphVariants['textColor'];
  align?: ParagraphVariants['align'];
}

export function Paragraph({
  className,
  variant,
  textColor,
  align,
  as: Component = 'p',
  ...props
}: ParagraphProps) {
  return (
    <Component
      className={cn(paragraphVariants({ variant, textColor, align, className }))}
      {...props}
    />
  );
}
