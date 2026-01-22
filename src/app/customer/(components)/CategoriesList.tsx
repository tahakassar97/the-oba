import { FC } from 'react';

import { AppImage, cn, Paragraph, Slider } from '@/_libs/components';
import { List } from '@/_libs/api';
import { IGenericObject } from '@/_libs/types';
import { useParams } from '@/_libs/hooks';
import { useCartStore } from '@/app/(stores)';

const CategoriesList: FC = () => {
  const { getParam } = useParams();

  const { setCategory, selectedCategoryId } = useCartStore();

  const language = getParam('lang') || 'en';

  return (
    <List url='categories' ignoredParams={['lang']}>
      {(data) => {
        if (!selectedCategoryId) setCategory(data?.data[0]?.id || null);

        return (
          <Slider
            slidesToShow={10}
            arrows
            responsive={[
              { breakpoint: 1536, settings: { slidesToShow: 10 } },
              { breakpoint: 1280, settings: { slidesToShow: 8 } },
              { breakpoint: 1024, settings: { slidesToShow: 4 } },
              { breakpoint: 640, settings: { slidesToShow: 3 } },
            ]}
            className='py-2 px-2 lg:px-5'
          >
            {data?.data?.map((item: IGenericObject, i: number) => (
              <div
                key={i}
                className={cn(
                  'rounded-lg transition-300 border group border-gray-100 p-2 cursor-pointer',
                  {
                    'border-secondary': selectedCategoryId === item.id,
                  },
                )}
                onClick={() => setCategory(item.id)}
              >
                <div className='flex flex-col items-center justify-center h-28 rounded-md'>
                  <AppImage
                    src={item.image}
                    className='rounded-full group-hover:scale-105 transition-300'
                    alt='Menu Item'
                    width={80}
                    height={80}
                  />
                  <Paragraph className='font-semibold mt-1 text-xs'>
                    {item?.[language + 'Name']}
                  </Paragraph>
                </div>
              </div>
            ))}
          </Slider>
        );
      }}
    </List>
  );
};

export default CategoriesList;
