import { FC, useEffect } from 'react';

import { AppImage, cn, Paragraph, Slider } from '@/_libs/components';
import { useList } from '@/_libs/api';
import { IGenericObject } from '@/_libs/types';
import { useParams } from '@/_libs/hooks';
import { useCartStore } from '@/app/(stores)';

const CategoriesList: FC = () => {
  const { getParam } = useParams();

  const { setCategory, selectedCategoryId } = useCartStore();

  const language = getParam('lang') || 'en';

  const { data } = useList({
    url: 'categories',
  });

  useEffect(() => {
    if (data?.data?.length && !selectedCategoryId) {
      setCategory(data.data[0]?.id || null);
    }
  }, [data?.data, selectedCategoryId, setCategory]);

  return (
    <Slider
      arrows
      responsive={[
        { breakpoint: 1920, settings: { slidesToShow: 10 } },
        { breakpoint: 1536, settings: { slidesToShow: 7 } },
        { breakpoint: 1280, settings: { slidesToShow: 6 } },
        { breakpoint: 1024, settings: { slidesToShow: 5 } },
        { breakpoint: 640, settings: { slidesToShow: 3 } },
        { breakpoint: 375, settings: { slidesToShow: 1 } },
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
          <div className='flex flex-col items-center justify-center gap-2 h-32'>
            <div className='flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 overflow-hidden shrink-0'>
              <AppImage
                src={item.image}
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                alt={item?.[language + 'Name']}
                width={96}
                height={96}
              />
            </div>
            <Paragraph className='font-semibold text-xs text-center line-clamp-1 px-1'>
              {item?.[language + 'Name']}
            </Paragraph>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default CategoriesList;
