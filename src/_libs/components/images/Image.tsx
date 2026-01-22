'use client';

import { FC, useState } from 'react';
import NextImage, { ImageProps } from 'next/image';

type Props = ImageProps;

const AppImage: FC<Props> = ({ ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className='relative'>
      <NextImage {...props} src={props.src} onLoad={() => setIsLoaded(true)} />
      {!isLoaded && <div className='absolute backdrop-blur inset-0 bg-gray-100' />}
    </div>
  );
};

export { AppImage };
