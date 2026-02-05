'use client';

import { FC, useEffect } from 'react';

import { SearchInput, Table, TableField } from '@/_libs/components';
import { useDate, useSearch, useSound, useToast } from '@/_libs/hooks';
import { IGenericObject, ORDER_STATUSES } from '@/_libs/types';
import { List } from '@/_libs/api';

import { OrderDetailsDrawer } from './components/OrderDetailsDrawer';
import PageHead from '../_layouts/PageHead';
import { useOrderStream } from '@/app/(hooks)';
import { useAuth } from '@/_libs/auth';
import { UserRolesTitles } from '@/_libs/auth/types';

const Orders: FC = () => {
  const { setSearchQuery, query } = useSearch('query');
  const { successNotify } = useToast(undefined, { duration: 60000 });

  const { formatDate, isTodayDate } = useDate();

  const { play } = useSound();

  const { notification } = useOrderStream();

  const { role } = useAuth();

  useEffect(() => {
    if (notification && role.title === UserRolesTitles.WAITER) {
      successNotify(notification.message);
      play();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

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
            refetchInterval: 30000,
          }}
        >
          <Table>
            <TableField name='id' header='Order ID' />

            <TableField
              name='createdAt'
              header='Order Date'
              transform={(date) => {
                if (isTodayDate(date as string | Date)) {
                  return `Today, ${formatDate(date as string | Date, 'hh:mm a')}`;
                }

                return formatDate(date as string | Date, 'dd MMM, yyyy');
              }}
            />

            <TableField
              header='Ready At'
              transform={(data: IGenericObject) => {
                return [ORDER_STATUSES[1], ORDER_STATUSES[2]].includes(data?.status)
                  ? isTodayDate(data?.readyAt as string | Date)
                    ? `Today, ${formatDate(data?.readyAt as string | Date, 'hh:mm a')}`
                    : formatDate(data?.readyAt as string | Date, 'dd MMM, yyyy hh:mm a')
                  : 'No ready';
              }}
            />

            <TableField
              header='Served At'
              transform={(data) =>
                data?.status === ORDER_STATUSES[2]
                  ? isTodayDate(data?.updatedAt as string | Date)
                    ? `Today, ${formatDate(data?.updatedAt as string | Date, 'hh:mm a')}`
                    : formatDate(data?.updatedAt as string | Date, 'dd MMM, yyyy hh:mm a')
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
                      data?.status === 'ready'
                        ? 'bg-primary'
                        : data?.status === 'preparing'
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
