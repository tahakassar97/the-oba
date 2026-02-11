'use client';

import { FC } from 'react';

import {
  Button,
  ConfirmDeletePopover,
  Icon,
  Link,
  Popover,
  SearchInput,
  Table,
  TableField,
} from '@/_libs/components';
import { List } from '@/_libs/api';
import { useSearch } from '@/_libs/hooks';
import { useAuth } from '@/_libs/auth';

import PageHead from '../../_layouts/PageHead';

const UsersList: FC = () => {
  const { query, setSearchQuery } = useSearch();
  const { role } = useAuth();

  return (
    <>
      <PageHead title='Users' />

      <div className='p-5 bg-white rounded-lg border border-gray-200'>
        <div className='flex justify-between items-center w-full mb-4'>
          <SearchInput
            placeholder='Search users...'
            defaultValue={query}
            onSearch={(query) => setSearchQuery(query)}
          />

          {role.title === 'admin' && (
            <Link href='users/create'>
              <Button variant='primary'>Add New User</Button>
            </Link>
          )}
        </div>

        <List url='users'>
          <Table>
            <TableField header='First Name' name='firstName' />
            <TableField header='Last Name' name='lastName' />
            <TableField header='Email' name='email' />
            <TableField header='Phone' name='phone' />
            <TableField
              header='Role'
              name='role'
              transform={(role) => {
                if (!role) return '-';
                return String(role).charAt(0).toUpperCase() + String(role).slice(1);
              }}
            />

            <TableField
              header='Actions'
              transform={(data) => {
                return (
                  <div className='flex items-center gap-2'>
                    <Link href={`users/update/${data.id}`}>
                      {' '}
                      <Button
                        variant='link'
                        size='icon'
                        className='text-primary hover:text-primary/90'
                      >
                        <Icon name='edit' />
                      </Button>
                    </Link>

                    <Popover
                      content={
                        <ConfirmDeletePopover
                          name={`${data.firstName} ${data.lastName}`}
                          id={`${data.id}`}
                          url='users'
                        />
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

export default UsersList;
