'use client';

import { FC } from 'react';
import {
  AppImage,
  Button,
  Drawer,
  Form,
  Icon,
  Paragraph,
  SelectInput,
  TextInput,
} from '@/_libs/components';
import { useCartStore } from '@/app/(stores)';
import { Create, SelectList } from '@/_libs/api';
import { IGenericObject } from '@/_libs/types';
import { PlaceOrderValidation } from '../menu/validations';

const PlaceOrderDrawer: FC = () => {
  const items = useCartStore((s) => s.items);
  const totalItems = useCartStore((s) => s.totalItems());

  const transformBody = async (body: IGenericObject) => {
    return {
      ...body,
      tableId: body.table.value,
      status: 'preparing',
      items: items.map(({ item, quantity }) => ({
        mealId: item.id,
        quantity,
      })),
    };
  };

  return (
    <Drawer hideButton drawerKey='place-order' drawerValue='place-order'>
      {({ toggle }) => (
        <Create
          url='orders'
          onSuccess={() => {
            toggle();
            useCartStore.getState().clear();
          }}
          transformBody={transformBody}
        >
          <Form
            className='flex h-[96dvh] flex-col p-0'
            buttonProps={{
              title: 'Place Order',
            }}
            schema={PlaceOrderValidation}
          >
            <div className='flex-1 overflow-auto px-2 lg:px-4'>
              <div className='flex w-full justify-between items-center mb-4'>
                <Paragraph className='text-xl font-bold'>Order Summary</Paragraph>

                <Button variant='outline' className='rounded-full' size='sm' onClick={toggle}>
                  <Icon name='close' size={24} />
                </Button>
              </div>

              {items.length === 0 ? (
                <div className='mt-6 rounded-md border border-gray-200 bg-gray-50 p-4 text-center text-sm text-gray-500'>
                  Your cart is empty.
                </div>
              ) : (
                <ul className='space-y-3'>
                  {items.map(({ item, quantity }) => {
                    return (
                      <li
                        key={item.id}
                        className='flex items-center justify-between rounded-lg border border-gray-200 bg-white p-1'
                      >
                        <div className='flex items-center gap-3'>
                          <AppImage
                            src={item.image || '/images/1.jpg'}
                            alt={item.name}
                            width={64}
                            height={64}
                            className='h-full w-16 rounded-lg object-cover'
                          />
                          <div>
                            <Paragraph className='font-semibold'>{item.name}</Paragraph>
                            <div className='flex items-center gap-2 mt-2'>
                              Ð
                              <Paragraph className='text-xs text-gray-500'>
                                {quantity} × {+item?.price}
                              </Paragraph>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className='mt-4 rounded-t-xl border-t border-gray-200 bg-white p-4'>
              <div className='mb-3 flex items-center justify-between text-sm text-gray-600'>
                <span>Items</span>
                <span className='font-semibold'>{totalItems}</span>
              </div>

              <TableSelector />

              <TextInput name='notes' label='Customer Notes' containerClassName='mt-4' />
            </div>
          </Form>
        </Create>
      )}
    </Drawer>
  );
};

export default PlaceOrderDrawer;

const TableSelector = () => {
  return (
    <SelectList url='tables' enableSearch={false}>
      <SelectInput label='Table Number' name='table' optionLabel='number' optionValue='id' />
    </SelectList>
  );
};
