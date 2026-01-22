import { FC } from 'react';

import { Icon, Paragraph } from '@/_libs/components';

const Header: FC = () => {
  return (
    <header className='fixed w-full shadow bg-white backdrop-blur-lg py-4 flex items-center justify-between z-20 pl-79 pr-5'>
      <span className='flex items-center space-x-2'>
        <Paragraph variant='h3' textColor='primary' className='font-bold'>
          The Oba Restaurant
        </Paragraph>
      </span>
      <span className='flex items-center space-x-4'>
        {/* <Link href="notifications"> */}
        <button className='p-2.5 bg-primary/20 rounded-full cursor-pointer hover:bg-primary/70 text-primary-500 hover:text-white group transform will-change-transform transition-300'>
          <Icon name='bellRing' className='group-hover:-rotate-3' />
        </button>
        {/* </Link> */}
      </span>
    </header>
  );
};

export default Header;
