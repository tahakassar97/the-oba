'use client';

import React, { useMemo } from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';

import { TableField, createColumnsFromChildren } from './TableField';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { Pagination } from '../pagination/Pagination';
import { cn } from '../utils';
import { AppImage } from '../images/Image';

// Export all components for convenience
export { TableField, TableHeader, TableBody };

export interface TableProps<TData> {
  data?: TData[];
  columns?: ColumnDef<TData>[];
  children?: React.ReactNode;
  enablePagination?: boolean;
  enableSorting?: boolean;
  initialPageSize?: number;
  onRowClick?: (row: TData) => void;
  serverPagination?: {
    currentPage: number;
    onPageChange: (page: number) => void;
  };
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  totalRecords?: number;
  className?: string;
}

export function Table<TData>({
  data = [],
  columns,
  children,
  enablePagination = true,
  enableSorting = false,
  onRowClick,
  className,
  totalRecords,
}: TableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const tableColumns = useMemo(() => {
    if (columns) return columns as ColumnDef<TData>[];
    return createColumnsFromChildren(children) as ColumnDef<TData>[];
  }, [columns, children]);

  const table = useReactTable<TData>({
    data,
    columns: tableColumns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    manualPagination: true,
  });

  return (
    <div className='w-full border border-gray-200 rounded-lg overflow-x-auto'>
      {data.length === 0 && (
        <div className='flex flex-col gap-3 items-center justify-center h-full p-7'>
          <AppImage src='/images/no-data.png' alt='' width={450} height={450} />
        </div>
      )}
      {data.length > 0 && (
        <>
          <table className={cn('min-w-full divide-y divide-gray-200', className)}>
            <TableHeader table={table} />
            <TableBody table={table} onRowClick={onRowClick}>
              {children}
            </TableBody>
          </table>
        </>
      )}
      {enablePagination && data.length >= 0 && <Pagination totalRecords={totalRecords} />}
    </div>
  );
}
