'use client';

import { FC } from 'react';

import {
  Button,
  ConfirmDeletePopover,
  Drawer,
  Form,
  Icon,
  NumberInput,
  Popover,
  SearchInput,
  Table,
  TableField,
} from '@/_libs/components';
import { useSearch } from '@/_libs/hooks';

import PageHead from '../_layouts/PageHead';
import { Create, List } from '@/_libs/api';

const TablesPage: FC = () => {
  const { query, setSearchQuery } = useSearch();

  return (
    <div>
      <PageHead title='Tables' />

      <div className='p-5 bg-white rounded-lg border border-gray-200'>
        <div className='flex justify-between w-full items-center mb-4'>
          <SearchInput
            placeholder='Search tables...'
            defaultValue={query}
            onSearch={(query) => setSearchQuery(query)}
          />
          <Drawer
            buttonProps={{
              label: (
                <div className='flex items-center gap-1.5'>
                  <Icon name='plus' size={16} />
                  Add Table
                </div>
              ),
              size: 'default',
            }}
          >
            {({ close }) => {
              return (
                <Create url='tables' onSuccess={close} message='Table Added Successfully!'>
                  <Form className='border border-gray-300 p-5 rounded-md'>
                    <NumberInput label='Table Number' name='number' required max={50} />
                  </Form>
                </Create>
              );
            }}
          </Drawer>
        </div>
        <List url='tables'>
          <Table>
            <TableField name='number' header='Table Number' />

            <TableField
              header='Actions'
              transform={(data) => {
                return (
                  <div className='flex items-center gap-2'>
                    <Popover
                      content={
                        <ConfirmDeletePopover
                          name={`Table ${data.number}`}
                          url='tables'
                          id={data?.id}
                        />
                      }
                    >
                      <Button variant='outline' size='sm' className='rounded-full border-red-500'>
                        <Icon name='trash' className='text-red-500 cursor-pointer' size={16} />
                      </Button>
                    </Popover>
                  </div>
                );
              }}
            />
          </Table>
        </List>
      </div>
    </div>
  );
};

export default TablesPage;
