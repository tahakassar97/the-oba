import { FC } from 'react';

import { LoadingButton, Paragraph } from '@/_libs/components';
import { Delete } from '@/_libs/api';

interface Props {
  name: string;
  url: string;
  id?: string;
  invalidateQueries?: string[];
  onClick?: VoidFunction;
}

const ConfirmDeletePopover: FC<Props> = ({ name, url, id, invalidateQueries, onClick }) => {
  return (
    <div>
      <Paragraph className='mb-5 font-semibold'>
        Are you sure you want to delete this <strong className='font-bold underline'>{name}</strong>
        ?
      </Paragraph>
      <div className='flex w-full justify-end'>
        <Delete url={url} id={id} onSuccess={onClick} invalidateQueries={invalidateQueries}>
          <LoadingButton variant='primary' type='button'>
            Delete
          </LoadingButton>
        </Delete>
      </div>
    </div>
  );
};

export { ConfirmDeletePopover };
