'use client';

import React from 'react';
import { ColumnDef, CellContext } from '@tanstack/react-table';

import { IGenericObject } from '../../types';

export interface TableFieldProps {
  name?: string;
  header?: string;
  row?: unknown;
  transform?: (value: IGenericObject) => React.ReactNode;
}

export function TableField({ name, header, row, transform }: TableFieldProps) {
  if (name?.includes('.')) {
    const keys = name.split('.');

    let value = row;

    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = (value as IGenericObject)[key];
      }
    }

    if (value === null || value === undefined) return null;

    if (transform) return transform(value);

    return (
      <div title={header || name} className='text-gray-700'>
        {value as string}
      </div>
    );
  }

  const value = row && name && typeof row === 'object' ? (row as IGenericObject)[name] : row;

  if (transform) return transform(value);

  if (value === null || value === undefined) return null;

  return (
    <div title={header || name} className='text-gray-700'>
      {value}
    </div>
  );
}

// Utility function to create columns from children
export function createColumnsFromChildren(children?: React.ReactNode): ColumnDef<unknown>[] {
  if (!children) return [];

  return React.Children?.map?.(children, (child) => {
    if (!React.isValidElement(child)) return null;

    const { name, header, transform } = child.props as IGenericObject;

    if (!name && !header) {
      console.warn('TableField requires a name or header prop');
      return null;
    }

    return {
      accessorKey: name ?? header,
      header: header || name,
      cell: (cellContext: CellContext<unknown, unknown>) => {
        return (
          <TableField
            name={name}
            header={header}
            row={cellContext.row.original}
            transform={transform}
          />
        );
      },
    };
  })?.filter(Boolean) as ColumnDef<unknown>[];
}
