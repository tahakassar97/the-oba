'use client';

import { FC } from 'react';

export type StatusType = string;

export interface StatusStyle {
  color: string;
  bg: string;
  label?: string;
}

interface Props {
  status: StatusType;
  styles: Record<StatusType, StatusStyle>;
  defaultStyle?: StatusStyle;
}

export const Status: FC<Props> = ({ status, styles, defaultStyle }) => {
  const style = styles[status] ??
    defaultStyle ?? {
      color: 'text-gray-800',
      bg: 'bg-gray-200',
    };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${style.color} ${style.bg}`}>
      {style.label ?? status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
