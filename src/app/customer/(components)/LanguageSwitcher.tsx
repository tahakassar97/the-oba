import React from 'react';

import { useParams } from '@/_libs/hooks';
import { Button } from '@/_libs/components';

const LanguageSwitcher: React.FC = () => {
  const { changeParams, getParam } = useParams();

  const language = getParam('lang') || 'en';

  return (
    <div className='flex items-center justify-end px-2 lg:px-5'>
      <div className='flex items-center justify-between gap-2 border border-gray-300 rounded-full py-1 px-2'>
        <Button
          variant='link'
          size='sm'
          onClick={() => changeParams('lang', 'en')}
          className={
            'text-sm ' +
            (language === 'en' ? 'text-primary font-bold underline' : 'text-gray-400 font-medium')
          }
        >
          English
        </Button>
        <Button
          variant='link'
          size='sm'
          onClick={() => changeParams('lang', 'ar')}
          className={
            'text-sm ' +
            (language === 'ar' ? 'text-primary font-bold underline' : 'text-gray-400 font-medium')
          }
        >
          عربي
        </Button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
