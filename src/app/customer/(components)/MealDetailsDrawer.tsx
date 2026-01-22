import { FC } from 'react';

import { AppImage, Button, Drawer, Form, Icon, Paragraph, TextAreaInput } from '@/_libs/components';
import { IMeal } from '@/_libs/types';
import { useCartStore } from '@/app/(stores)';

interface Props {
  item: IMeal | null;
}

export const MealDetailsDrawer: FC<Props> = ({ item }) => {
  const addToCart = useCartStore((s) => s.addToCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const currentQty = useCartStore((s) => s.getQuantity(item?.id || ''));

  return (
    <Drawer hideButton drawerKey='item' drawerValue={item?.id?.toString() || ''}>
      {({ toggle }) => {
        return (
          <div className='flex flex-col justify-between h-[95dvh] pb-2'>
            <div>
              <div className='flex w-full justify-between'>
                <Paragraph variant='h3' textColor='primary'>
                  {item?.name || '--'}
                </Paragraph>
                <Button variant='outline' size='sm' onClick={toggle}>
                  <Icon name='close' size={16} />
                </Button>
              </div>

              <div className='flex justify-center mt-5'>
                <AppImage
                  src={item?.image || '/images/default_food.jpg'}
                  alt={item?.name || ''}
                  height={100}
                  width={100}
                  className='lg:w-64 lg:h-64 w-48 h-48 rounded-2xl'
                />
              </div>

              <Form hideButton className='p-0! mt-2'>
                <TextAreaInput
                  defaultValue={item?.description}
                  rows={6}
                  name='description'
                  label=''
                  className='border-none! outline-0!'
                  disabled
                />
              </Form>

              <div className='flex items-center justify-end w-full gap-3 mt-3'>
                <AppImage src='/images/dirham.svg' alt='Dirham' width={20} height={20} />
                <Paragraph variant='p' className='font-semibold text-end'>
                  {item?.price} x {currentQty}
                </Paragraph>
              </div>
              <div className='mt-6 flex w-full justify-end'>
                <div className='inline-flex items-center gap-2 rounded-full bg-primary/30 px-2 py-1 shadow-sm ring-1 ring-gray-200'>
                  <Button
                    variant='outline'
                    size='icon'
                    aria-label='Decrease quantity'
                    disabled={currentQty <= 1}
                    className='rounded-full h-8 w-8 border-0 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-300'
                    onClick={() => updateQuantity(item!.id, Math.max(1, currentQty - 1))}
                  >
                    <Icon name='minus' size={16} />
                  </Button>
                  <Paragraph className='min-w-8 text-center font-semibold tabular-nums'>
                    {currentQty > 0 ? currentQty : 1}
                  </Paragraph>
                  <Button
                    variant='outline'
                    size='icon'
                    aria-label='Increase quantity'
                    className='rounded-full h-8 w-8 border-0 bg-white hover:bg-gray-50 transition-300'
                    onClick={() => {
                      if (!item) return;

                      if (currentQty === 0) addToCart(item, 2);
                      else updateQuantity(item.id, currentQty + 1);
                    }}
                  >
                    <Icon name='plus' size={16} />
                  </Button>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <Button
                className='w-[60%] mt-6'
                onClick={() => {
                  if (!item) return;

                  if (currentQty === 0) addToCart(item, 1);

                  toggle();
                }}
              >
                Add to Order
              </Button>
              {currentQty > 0 ? (
                <Button
                  variant='outline'
                  className='w-[35%] mt-6'
                  onClick={() => {
                    updateQuantity(item!.id, 0);
                    toggle();
                  }}
                >
                  Remove
                </Button>
              ) : null}
            </div>
          </div>
        );
      }}
    </Drawer>
  );
};
