'use client';

import { FC } from 'react';

import {
  AppImage,
  Button,
  ConfirmDeletePopover,
  Icon,
  Popover,
  SearchInput,
  Table,
  TableField,
} from '@/_libs/components';
import { List } from '@/_libs/api';

import PageHead from '../_layouts/PageHead';
import { CreateCategoryDrawer } from './components/CreateCategoryDrawer';
import { UpdateCategoryDrawer } from './components/UpdateCategoryDrawer';

const CategoriesPage: FC = () => {
  return (
    <>
      <PageHead title='Meals Category' />

      <div className='p-5 bg-white rounded-lg border border-gray-200'>
        <div className='flex justify-between w-full items-center mb-4'>
          <SearchInput placeholder='Search categories...' />
          <CreateCategoryDrawer />
        </div>
        <List url='categories' ignoredParams={['update-category', 'create-category']}>
          <Table>
            <TableField header='Arabic Name' name='arName' />
            <TableField header='English Name' name='enName' />
            <TableField
              header='Image'
              name='image'
              transform={(image) => {
                return (
                  <AppImage
                    src={image?.toString() || '/images/default_food.png'}
                    width={75}
                    height={40}
                    className='w-16 rounded-md h-16 object-cover'
                    alt=''
                  />
                );
              }}
            />

            <TableField
              header='Actions'
              transform={(data) => {
                return (
                  <div className='flex items-center'>
                    <UpdateCategoryDrawer id={data?.id} />

                    <Popover
                      content={
                        <ConfirmDeletePopover name={data?.enName} url='categories' id={data?.id} />
                      }
                    >
                      <Button
                        variant='link'
                        size='icon'
                        className='text-red-600 hover:text-red-500'
                      >
                        <Icon name='trash' />
                      </Button>
                    </Popover>
                  </div>
                );
              }}
            />
          </Table>
        </List>
      </div>
    </>
  );
};

export default CategoriesPage;
