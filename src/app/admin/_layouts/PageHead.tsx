import { FC, ReactNode } from 'react';

import { Paragraph } from '@/_libs/components';

interface Props {
  title: string;
  children?: ReactNode;
}

const PageHead: FC<Props> = ({ title, children }) => {
  return (
    <div className='flex items-center bg-white mb-2 border border-gray-200 rounded-lg gap-5 py-3 px-5'>
      {children}

      {title && (
        <Paragraph variant='h4' textColor='primary' className='font-bold text-primary'>
          {title}
        </Paragraph>
      )}
    </div>
  );
};

export default PageHead;
