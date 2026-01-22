import React, { isValidElement, cloneElement } from 'react';
import { Table as ReactTable, Cell, CellContext } from '@tanstack/react-table';
import { cn } from '../utils';

export interface TableBodyProps<TData> {
  table: ReactTable<TData>;
  children?: React.ReactNode;
  onRowClick?: (row: TData) => void;
}

function renderCellContent<TData, TValue = unknown>(
  cell: Cell<TData, TValue>,
  table: ReactTable<TData>,
  children?: React.ReactNode,
  row?: TData,
) {
  // First, try to render using column cell definition
  const cellDef = cell.column.columnDef.cell;
  const columnCellContent =
    typeof cellDef === 'function'
      ? cellDef({
          row: cell.row,
          getValue: () => cell.getValue(),
          cell,
          column: cell.column,
          renderValue: () => cell.renderValue(),
          table,
        } as CellContext<TData, TValue>)
      : cellDef;

  if (columnCellContent) return columnCellContent;

  // If no column cell definition, try to render children
  if (children && row) {
    return React.Children.map(children, (child) =>
      isValidElement(child as React.ReactElement)
        ? cloneElement(child as React.ReactElement<{ row: TData }>, { row })
        : child,
    );
  }

  // Fallback to cell value as string
  return String(cell.getValue());
}

export function TableBody<TData>({ table, children, onRowClick }: TableBodyProps<TData>) {
  return (
    <tbody className='bg-white'>
      {table?.getRowModel()?.rows?.map((row, index) => {
        return (
          <tr
            key={index}
            className='hover:bg-gray-100 transition-300'
            onClick={() => onRowClick && onRowClick(row.original)}
          >
            {row.getVisibleCells().map((cell, _index) => (
              <td
                key={_index}
                className={cn('px-4 whitespace-nowrap text-sm text-gray-500', {
                  'py-3': !!row.original,
                })}
              >
                {renderCellContent(cell, table, children, row.original)}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}
