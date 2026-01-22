import { FC } from 'react';

import { AppImage, Button, Drawer, Form, Icon, Paragraph, SelectInput } from '@/_libs/components';
import { GetOne, useUpdate } from '@/_libs/api';
import { IGenericObject } from '@/_libs/types';

interface Props {
  orderId: string | number;
}

const OrderDetailsDrawer: FC<Props> = ({ orderId }) => {
  const { mutateAsync } = useUpdate({
    url: 'orders',
    message: 'Order status updated successfully',
  });
  const onChangeStatus = async (status: string) => {
    await mutateAsync({
      id: orderId.toString(),
      status,
    });
  };

  return (
    <Drawer
      buttonProps={{
        label: <Icon name='view' />,
        variant: 'link',
        size: 'icon',
      }}
      drawerKey='order-details'
      className='py-1'
      drawerValue={orderId.toString()}
    >
      {({ close }) => {
        return (
          <GetOne url='orders' id={orderId.toString()}>
            {(data) => {
              return (
                <div className='flex flex-col overflow-y-auto pb-4'>
                  <Paragraph className='mb-5 underline' variant='h4' textColor='primary'>
                    Meals List
                  </Paragraph>

                  <ul className='space-y-3 h-full overflow-y-auto'>
                    {data?.meals?.map((meal: IGenericObject) => (
                      <li
                        key={meal.id}
                        className='flex gap-3 rounded-lg h-24 border cursor-pointer shadow border-gray-200 transition-300 hover:border-secondary group overflow-hidden'
                      >
                        <AppImage
                          src={meal.image}
                          className='rounded-l-lg object-cover group-hover:scale-105 transition-300 transition-transform h-full w-28'
                          alt='Menu Item'
                          width={120}
                          height={120}
                        />
                        <div className='flex flex-col w-full justify-between py-2 pr-3'>
                          <Paragraph className='font-semibold text-sm'>{meal.enName}</Paragraph>
                          <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                              <AppImage
                                src='/images/dirham.svg'
                                alt='Dirham'
                                width={15}
                                height={15}
                              />
                              <Paragraph className='text-sm! text-gray-600'>{meal.price}</Paragraph>
                            </div>

                            <Paragraph className='text-sm! text-primary underline'>
                              <strong className='font-semibold'>{meal.orderItems?.quantity}</strong>{' '}
                              item(s)
                            </Paragraph>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Paragraph className='font-semibold text-xs text-gray-400 break-all line-clamp-4 w-72 mt-5 border border-gray-300 rounded-md p-2'>
                    {data?.notes}
                  </Paragraph>

                  <Form hideButton className='mt-8 px-1'>
                    <SelectInput
                      optionValue='value'
                      optionLabel='label'
                      label='Status'
                      isDisabled={data?.status === 'completed' || data?.status === 'cancelled'}
                      name='status'
                      options={[
                        { label: 'Pending', value: 'pending' },
                        { label: 'Processing', value: 'processing' },
                        { label: 'Completed', value: 'completed' },
                        { label: 'Cancelled', value: 'cancelled' },
                      ]}
                      className='text-xs'
                      onSelect={({ value }) => onChangeStatus(value)}
                      defaultValue={data?.status}
                    />
                  </Form>

                  <Button variant='outline' className='mt-5' onClick={close}>
                    Close
                  </Button>
                </div>
              );
            }}
          </GetOne>
        );
      }}
    </Drawer>
  );
};

export { OrderDetailsDrawer };
