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
    <List
      url={`meals/category/${selectedCategoryId}?isAvailable=1`}
      ignoredParams={['lang', 'place-order', 'item']}
      queryOptions={{
        enabled: !!selectedCategoryId,
      }}
    >
      {(data, isLoading) => {
        return data?.length ? (
          <ul className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5 overflow-hidden'>
            {data?.map((meal: IGenericObject) => (
              <li
                key={meal.id}
                className='flex gap-3 rounded-lg h-40 border cursor-pointer shadow border-gray-200 transition-300 w-full hover:border-secondary group overflow-hidden'
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
                <div className='relative w-32 md:w-36 h-40 rounded-l-lg overflow-hidden shrink-0 bg-gray-100'>
                  <AppImage
                    src={meal.image}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                    alt={meal?.[language + 'Name']}
                    width={144}
                    height={160}
                  />
                </div>
                <div className='flex flex-col justify-between flex-1 py-2 pr-3 min-w-0'>
                  <div>
                    <Paragraph className='font-semibold line-clamp-2'>
                      {meal?.[language + 'Name']}
                    </Paragraph>
                    <Paragraph className='font-semibold text-xs text-gray-400 break-all line-clamp-3 mt-1'>
                      {meal?.[language + 'Description']}
                    </Paragraph>
                  </div>
                  <div className='flex items-center justify-between gap-2 flex-wrap'>
                    <span className='flex items-center gap-1 whitespace-nowrap'>
                      Ð{' '}
                      <Paragraph className='text-sm! text-gray-600 truncate'>
                        {meal.price}
                      </Paragraph>
                    </span>
                    <span className=''>
                      {cartItems.find((ci) => ci.item.id === meal.id) && !hideActions ? (
                        <Paragraph className='text-xs! md:text-sm! text-primary underline whitespace-nowrap'>
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
        ) : data?.length === 0 && !isLoading ? (
          <div className='flex justify-center items-center w-full'>
            <div className='flex flex-col h-48 justify-center gap-6 border border-primary/50 mt-5 rounded-2xl p-5 items-center w-fit'>
              <Icon name='search' size={50} className='text-primary' />
              <Paragraph variant='h5' textColor='primary'>
                No results found for your search.
              </Paragraph>
            </div>
          </div>
        ) : null;
      }}
    </List>
  );
};

export default MealsList;
