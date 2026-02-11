'use client';

import { FC, useMemo } from 'react';

import { useList } from '@/_libs/api';
import { Icon, IconName, Paragraph } from '@/_libs/components';
import { IGenericObject } from '@/_libs/types';

import PageHead from '../_layouts/PageHead';

interface OrderByDayItem {
  date?: string;
  count?: number;
}

interface TopMealItem {
  id?: string | number;
  arName?: string;
  enName?: string;
  totalQuantity?: string | number;
}

interface ChartDay {
  key: string;
  label: string;
  dayNumber: number;
  value: number;
}

interface StatCardItem {
  title: string;
  value: string | number;
  hint: string;
  icon: IconName;
  iconClass: string;
}

const normalizeList = <T,>(payload: unknown): T[] => {
  if (Array.isArray(payload)) return payload as T[];

  if (payload && typeof payload === 'object') {
    const data = (payload as { data?: unknown }).data;
    if (Array.isArray(data)) return data as T[];
  }

  return [];
};

const parseDate = (value?: string) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date;
};

const toDayKey = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const getCurrentMonthDays = (): Date[] => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, index) => {
    const date = new Date(year, month, index + 1);
    date.setHours(0, 0, 0, 0);
    return date;
  });
};

const formatDayLabel = (date: Date) => date.toLocaleDateString('en-US', { weekday: 'short' });

const formatMonthLabel = (date: Date) =>
  date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

const toNumber = (value: string | number | undefined) => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
};

const StatCard: FC<StatCardItem> = ({ title, value, hint, icon, iconClass }) => {
  return (
    <div className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-[11px] uppercase tracking-wide text-gray-500'>{title}</p>
          <p className='mt-2 text-3xl font-semibold text-gray-900'>{value}</p>
        </div>
        <div className={`rounded-xl p-2.5 ${iconClass}`}>
          <Icon name={icon} size={18} />
        </div>
      </div>
      <p className='mt-3 text-xs text-gray-500'>{hint}</p>
    </div>
  );
};

const Dashboard: FC = () => {
  const ordersQuery = useList<IGenericObject>({
    url: 'analytics/orders/by-day',
    queryOptions: {
      refetchInterval: 60000,
    },
  });

  const mealsQuery = useList<IGenericObject>({
    url: 'analytics/meals/top',
    queryOptions: {
      refetchInterval: 120000,
    },
  });

  const orders = useMemo(() => normalizeList<OrderByDayItem>(ordersQuery.data), [ordersQuery.data]);
  const meals = useMemo(() => normalizeList<TopMealItem>(mealsQuery.data), [mealsQuery.data]);

  const chartDays = useMemo<ChartDay[]>(() => {
    const byDate = new Map<string, number>();

    orders.forEach((item) => {
      const date = parseDate(item.date);
      if (!date) return;

      byDate.set(toDayKey(date), (byDate.get(toDayKey(date)) || 0) + (item.count || 0));
    });

    return getCurrentMonthDays().map((date) => {
      const key = toDayKey(date);

      return {
        key,
        label: formatDayLabel(date),
        dayNumber: date.getDate(),
        value: byDate.get(key) || 0,
      };
    });
  }, [orders]);

  const maxChartValue = useMemo(
    () => Math.max(...chartDays.map((item) => item.value), 1),
    [chartDays],
  );

  const currentMonthLabel = useMemo(() => formatMonthLabel(new Date()), []);

  const totalOrders = useMemo(
    () => orders.reduce((sum, item) => sum + (item.count || 0), 0),
    [orders],
  );

  const todayOrders = useMemo(() => {
    const todayKey = toDayKey(new Date());
    const today = orders.find((item) => item.date === todayKey);

    return today?.count || 0;
  }, [orders]);

  const totalTopMealsQty = useMemo(
    () => meals.reduce((sum, item) => sum + toNumber(item.totalQuantity), 0),
    [meals],
  );

  const statCards = useMemo<StatCardItem[]>(
    () => [
      {
        title: 'Total Orders',
        value: totalOrders,
        hint: 'Order counts',
        icon: 'shoppingBasket',
        iconClass: 'bg-blue-100 text-blue-700',
      },
      {
        title: 'Orders Today',
        value: todayOrders,
        hint: 'Today only',
        icon: 'calendar',
        iconClass: 'bg-green-100 text-green-700',
      },
      {
        title: 'Top Qty Total',
        value: totalTopMealsQty,
        hint: 'Total quantity across the top meals list.',
        icon: 'activity',
        iconClass: 'bg-purple-100 text-purple-700',
      },
    ],
    [todayOrders, totalOrders, totalTopMealsQty],
  );

  return (
    <>
      <PageHead title='Dashboard' />

      <div className='space-y-6'>
        <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
          {statCards.map((item) => (
            <StatCard
              key={item.title}
              title={item.title}
              value={item.value}
              hint={item.hint}
              icon={item.icon}
              iconClass={item.iconClass}
            />
          ))}
        </div>

        <div className='grid gap-5 xl:grid-cols-5'>
          <section className='rounded-2xl border overflow-y-auto border-gray-200 bg-white p-5 shadow-sm xl:col-span-3'>
            <div className='mb-5 flex items-center justify-between'>
              <div>
                <h3 className='text-lg font-semibold text-gray-900'>Orders by day</h3>
                <p className='text-xs text-gray-500'>{currentMonthLabel}</p>
              </div>
              <div className='flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary'>
                <Icon name='trendingUp' size={14} />
                <span>{totalOrders} total</span>
              </div>
            </div>

            {ordersQuery.isLoading ? (
              <div className='flex h-56 items-center justify-center text-sm text-gray-500'>
                Loading orders analytics...
              </div>
            ) : (
              <div className='overflow-x-auto pb-1'>
                <div
                  className='grid h-56 min-w-245 items-end gap-2'
                  style={{ gridTemplateColumns: `repeat(${chartDays.length}, minmax(24px, 1fr))` }}
                >
                  {chartDays.map((item) => {
                    const height = Math.max(
                      Math.round((item.value / maxChartValue) * 100),
                      item.value > 0 ? 12 : 3,
                    );

                    return (
                      <div
                        key={item.key}
                        className='flex h-full flex-col items-center justify-end gap-2'
                      >
                        <span className='text-[10px] font-semibold text-gray-700'>
                          {item.value}
                        </span>
                        <div className='flex h-36 w-full items-end rounded-md bg-gray-100'>
                          <div
                            className='w-full rounded-md bg-primary transition-all duration-300'
                            style={{ height: `${height}%` }}
                            title={`${item.key}: ${item.value}`}
                          />
                        </div>
                        <span className='text-[10px] text-gray-500'>{item.dayNumber}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          <section className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-2'>
            <div className='mb-5 flex items-center justify-between'>
              <div>
                <h3 className='text-lg font-semibold text-gray-900'>Top meals</h3>
                <p className='text-xs text-gray-500'>Ranked by ordered quantity</p>
              </div>
              <div className='rounded-full bg-orange-100 p-2 text-orange-700'>
                <Icon name='boxes' size={14} />
              </div>
            </div>

            {mealsQuery.isLoading ? (
              <div className='flex h-56 items-center justify-center text-sm text-gray-500'>
                Loading meals analytics...
              </div>
            ) : meals.length === 0 ? (
              <div className='flex h-56 flex-col items-center justify-center gap-2 text-sm text-gray-500'>
                <Icon name='boxes' className='text-gray-400' size={18} />
                <span>No top meals yet.</span>
              </div>
            ) : (
              <ul className='space-y-3'>
                {meals.map((item, index) => {
                  const value = toNumber(item.totalQuantity);
                  const width = Math.max(
                    Math.round((value / Math.max(totalTopMealsQty, 1)) * 100),
                    value > 0 ? 8 : 0,
                  );

                  return (
                    <li key={item.id} className='rounded-xl border border-gray-200 bg-gray-50 p-3'>
                      <div className='mb-2 flex items-center justify-between text-sm'>
                        <Paragraph className='font-medium text-gray-800'>
                          {index + 1}. {item.enName || item.arName || `Meal ${item.id}`}
                        </Paragraph>
                        <Paragraph className='text-gray-600'>{value}</Paragraph>
                      </div>
                      <div className='h-2 rounded-full bg-gray-200'>
                        <div
                          className='h-2 rounded-full bg-secondary transition-all duration-300'
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
