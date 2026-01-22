import { flexRender, Table as ReactTable, Header } from '@tanstack/react-table';

export interface TableHeaderProps<TData> {
  table: ReactTable<TData>;
  enableSorting?: boolean;
}

export function TableHeader<TData>({ table, enableSorting = false }: TableHeaderProps<TData>) {
  const handleHeaderClick = (header: Header<TData, unknown>, event: React.MouseEvent) => {
    if (enableSorting) {
      const sortHandler = header.column.getToggleSortingHandler();
      if (sortHandler) sortHandler(event);
    }
  };

  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup, index) => (
        <tr key={index}>
          {headerGroup.headers.map((header, i) => (
            <th
              key={index + i}
              className={`p-4 bg-gray-100 text-xs text-left font-medium text-gray-500 uppercase tracking-wider
                ${enableSorting ? 'cursor-pointer' : ''}`}
              onClick={(event) => handleHeaderClick(header, event)}
            >
              {header.isPlaceholder
                ? null
                : (flexRender(
                    header.column.columnDef.header ?? 'Header',
                    header.getContext(),
                  ) as React.ReactNode)}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
