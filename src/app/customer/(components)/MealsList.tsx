import { FC } from 'react';

import { AppImage, Icon, Paragraph } from '@/_libs/components';
import { IGenericObject, IMeal } from '@/_libs/types';
import { useCartStore } from '@/app/(stores)';
import { List } from '@/_libs/api';
import { useParams } from '@/_libs/hooks';

interface Props {
  hideActions?: boolean;
  onSelectItem: (item: IMeal, index: number) => void;
}

const MealsList: FC<Props> = ({ onSelectItem, hideActions = false }) => {
  const cartItems = useCartStore((s) => s.items);
  const selectedCategoryId = useCartStore((s) => s.selectedCategoryId);

  const { getParam } = useParams();

  const language = getParam('lang') || 'en';

  return (
    <List url={`meals/category/${selectedCategoryId}`} ignoredParams={['lang']}>
      {(data) => {
        return data?.length ? (
          <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 overflow-hidden'>
            {data?.map((meal: IGenericObject) => (
              <li
                key={meal.id}
                className='flex gap-3 rounded-lg h-40 border cursor-pointer shadow border-gray-200 transition-300 hover:border-secondary group overflow-hidden'
                onClick={
                  !hideActions
                    ? () =>
                        onSelectItem(
                          {
                            id: meal.id,
                            name: meal?.[language + 'Name'],
                            description: meal?.[language + 'Description'],
                            price: meal.price,
                            image: meal.image,
                          } as IMeal,
                          meal.id,
                        )
                    : undefined
                }
              >
                <AppImage
                  src={meal.image}
                  className='rounded-l-lg object-cover group-hover:scale-105 transition-300 transition-transform h-full md:w-36 w-32'
                  alt='Menu Item'
                  width={120}
                  height={120}
                />
                <div className='flex flex-col justify-between w-full py-2 pr-3'>
                  <div>
                    <Paragraph className='font-semibold'>{meal?.[language + 'Name']}</Paragraph>
                    <Paragraph className='font-semibold text-xs text-gray-400 break-all line-clamp-4 w-72 mt-2'>
                      {meal?.[language + 'Description']}
                    </Paragraph>
                  </div>
                  <div className='flex items-center md:justify-between'>
                    <span className='flex items-center gap-2'>
                      <AppImage src='/images/dirham.svg' alt='Dirham' width={18} height={18} />
                      <Paragraph className='text-sm! text-gray-600'>{meal.price}</Paragraph>
                    </span>
                    <span className='px-10 md:px-0'>
                      {cartItems.find((ci) => ci.item.id === meal.id) && !hideActions ? (
                        <Paragraph className='text-sm! text-primary underline'>
                          <strong className='font-semibold'>
                            {cartItems.find((ci) => ci.item.id === meal.id)?.quantity}
                          </strong>{' '}
                          In Cart
                        </Paragraph>
                      ) : null}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className='flex justify-center items-center w-full'>
            <div className='flex flex-col h-48 justify-center gap-6 border border-primary/50 mt-5 rounded-2xl p-5 items-center w-fit'>
              <Icon name='search' size={50} className='text-primary' />
              <Paragraph variant='h5' textColor='primary'>
                No results found for your search.
              </Paragraph>
            </div>
          </div>
        );
      }}
    </List>
  );
};

export default MealsList;
