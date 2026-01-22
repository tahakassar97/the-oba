'use client';

import { FC } from 'react';

import {
  AppImage,
  Button,
  ConfirmDeletePopover,
  Icon,
  Link,
  Popover,
  SearchInput,
  Table,
  TableField,
} from '@/_libs/components';
import { useSearch } from '@/_libs/hooks';
import { List } from '@/_libs/api';

import PageHead from '../../_layouts/PageHead';

const MealsList: FC = () => {
  const { query, setSearchQuery } = useSearch();

  return (
    <>
      <PageHead title='Meals' />

      <div className='p-5 bg-white rounded-lg border border-gray-200'>
        <div className='flex justify-between items-center w-full mb-4'>
          <SearchInput
            placeholder='Search meals...'
            defaultValue={query}
            onSearch={(query) => setSearchQuery(query)}
          />

          <Link href='meals/create'>
            <Button variant='primary'>+ Add Meal</Button>
          </Link>
        </div>
        <List url='meals'>
          <Table>
            <TableField header='Arabic Name' name='arName' />
            <TableField header='English Name' name='enName' />
            <TableField
              header='Category'
              transform={(data) => `${data?.category?.enName} - ${data?.category?.arName}`}
            />
            <TableField
              header='Price'
              name='price'
              transform={(price) => (
                <div className='flex items-center gap-1.5'>
                  <AppImage src='/images/dirham.svg' alt='currency' width={12} height={12} />
                  {price.toString()}
                </div>
              )}
            />
            <TableField
              header='Available'
              name='isAvailable'
              transform={(available) => `${available ? 'Yes' : 'No'}`}
            />

            <TableField
              header='Actions'
              transform={(data) => (
                <div className='flex items-center'>
                  <Link href={`meals/update/${data?.id}`}>
                    <Button
                      variant='link'
                      size='icon'
                      className='text-primary hover:text-primary/90'
                    >
                      <Icon name='edit' />
                    </Button>
                  </Link>
                  <Popover content={<ConfirmDeletePopover name={data?.enName} url='meals' />}>
                    <Button variant='link' size='icon' className='text-red-600 hover:text-red-500'>
                      <Icon name='trash' />
                    </Button>
                  </Popover>
                </div>
              )}
            />
          </Table>
        </List>
      </div>
    </>
  );
};

export default MealsList;
