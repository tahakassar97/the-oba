'use client';

import { FC } from 'react';

import { SearchInput, Table, TableField } from '@/_libs/components';
import { useDate, useSearch } from '@/_libs/hooks';
import { ORDER_STATUSES } from '@/_libs/types';

import { OrderDetailsDrawer } from './components/OrderDetailsDrawer';
import PageHead from '../_layouts/PageHead';
import { List } from '@/_libs/api';

const data = [
  {
    id: 1,
    tableNo: 'Table 1',
    orderDate: new Date(),
    servedAt: new Date(),
    total: '100',
    status: 'pending',
    meals: [
      {
        id: 1,
        name: 'Meal 1',
        quantity: 2,
      },
      {
        id: 2,
        name: 'Meal 2',
        quantity: 1,
      },
    ],
  },
  {
    id: 2,
    tableNo: 'Table 2',
    orderDate: new Date(),
    servedAt: new Date(),
    total: '100',
    status: 'processing',
    meals: [
      {
        id: 7,
        name: 'Meal 3',
        quantity: 2,
      },
      {
        id: 5,
        name: 'Meal 4',
        quantity: 3,
      },
    ],
  },
  {
    id: 3,
    tableNo: 'Table 3',
    orderDate: new Date(),
    servedAt: new Date(),
    total: '100',
    status: 'cancelled',
    meals: [
      {
        id: 4,
        name: 'Meal 4',
        quantity: 2,
      },
      {
        id: 10,
        name: 'Meal 10',
        quantity: 3,
      },
    ],
  },
  {
    id: 4,
    tableNo: 'Table 4',
    orderDate: new Date(),
    servedAt: new Date(),
    total: '100',
    status: 'completed',
    meals: [
      {
        id: 11,
        name: 'Meal 12',
        quantity: 1,
      },
      {
        id: 6,
        name: 'Meal 6',
        quantity: 2,
      },
    ],
  },
];

const Orders: FC = () => {
  const { setSearchQuery, query } = useSearch('query');
  const { formatDate } = useDate();

  return (
    <>
      <PageHead title='Orders' />

      <div className='p-5 bg-white rounded-lg border border-gray-200'>
        <SearchInput
          placeholder='Search orders'
          className='mb-4'
          defaultValue={query}
          onSearch={(query) => setSearchQuery(query)}
        />

        <List
          url='orders'
          ignoredParams={['order-details']}
          queryOptions={{
            refetchInterval: 20000,
          }}
        >
          <Table data={data}>
            <TableField name='id' header='Order ID' />

            <TableField
              name='createdAt'
              header='Order Date'
              transform={(date) => formatDate(date as string | Date, 'dd MMM, yyyy hh:mm a')}
            />

            <TableField
              header='Served At'
              transform={(data) =>
                data?.status === ORDER_STATUSES[2]
                  ? formatDate(data?.updatedAt as string | Date, 'dd MMM, yyyy hh:mm a')
                  : 'Not served'
              }
            />

            <TableField
              header='Total Time'
              transform={(row) => {
                const orderDate = new Date(row.createdAt);
                const servedAt = new Date(row.updatedAt);
                const diff = servedAt.getTime() - orderDate.getTime();
                const minutes = Math.floor(diff / 60000);
                return `${minutes} minutes`;
              }}
            />

            <TableField
              header='Status'
              transform={(data) => {
                return (
                  <span
                    className={`px-3 py-1 rounded-full text-white font-semibold text-[11px] capitalize ${
                      data?.status === 'pending'
                        ? 'bg-primary'
                        : data?.status === 'processing'
                          ? 'bg-yellow-500'
                          : data?.status === 'cancelled'
                            ? 'bg-red-500'
                            : 'bg-green-500'
                    }`}
                  >
                    {data?.status}
                  </span>
                );
              }}
            />

            <TableField
              header='Actions'
              transform={(data) => {
                return (
                  <div className='flex items-center gap-2'>
                    <OrderDetailsDrawer orderId={data?.id} />
                  </div>
                );
              }}
            />
          </Table>
        </List>
      </div>
    </>
  );
};

export default Orders;
