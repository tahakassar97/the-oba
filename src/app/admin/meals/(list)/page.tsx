'use client';

import { FC } from 'react';

import {
  Button,
  ConfirmDeletePopover,
  Form,
  Icon,
  Link,
  Popover,
  SearchInput,
  Table,
  TableField,
  ToggleInput,
} from '@/_libs/components';
import { useSearch } from '@/_libs/hooks';
import { List, useUpdate } from '@/_libs/api';
import { useAuth } from '@/_libs/auth';

import PageHead from '../../_layouts/PageHead';

const MealsList: FC = () => {
  const { query, setSearchQuery } = useSearch();

  const { role } = useAuth();

  const { mutateAsync } = useUpdate({
    url: 'meals',
    message: 'Meal updated successfully',
  });

  const onChangeVisibility = async (value: boolean, id: string) => {
    await mutateAsync({
      id,
      isAvailable: value,
    });
  };

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

          {role.title === 'admin' && (
            <Link href='meals/create'>
              <Button variant='primary'>Add New Meal</Button>
            </Link>
          )}
        </div>
        <List url='meals'>
          <Table>
            <TableField header='Arabic Name' name='arName' />
            <TableField header='English Name' name='enName' />

            <TableField
              header='Price'
              name='price'
              transform={(price) => (
                <div className='flex items-center gap-1.5'>Ð {price.toString()}</div>
              )}
            />
            <TableField
              header='Available'
              name='isAvailable'
              transform={(available) => `${available ? 'Yes' : 'No'}`}
            />

            {role.title === 'admin' ? (
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
                      <Button
                        variant='link'
                        size='icon'
                        className='text-red-600 hover:text-red-500'
                      >
                        <Icon name='trash' />
                      </Button>
                    </Popover>
                  </div>
                )}
              />
            ) : ['chef', 'waiter'].includes(role.title) ? (
              <TableField
                header='Actions'
                transform={(data) => (
                  <div>
                    <Form hideButton>
                      <ToggleInput
                        name='isAvailable'
                        rightLabel='Available'
                        defaultValue={data?.isAvailable}
                        onChange={(value) => onChangeVisibility(value, data?.id)}
                      />
                    </Form>
                  </div>
                )}
              />
            ) : null}
          </Table>
        </List>
      </div>
    </>
  );
};

export default MealsList;
