'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';

import {
  Button,
  Form,
  Icon,
  Link,
  Paragraph,
  SelectInput,
  TextAreaInput,
  TextInput,
} from '@/_libs/components';
import { GetOne, Update } from '@/_libs/api';
import { IGenericObject } from '@/_libs/types';

import PageHead from '../../../_layouts/PageHead';
import { UsersValidations } from '../../validations';
import { roleOptions } from '../../create/page';

const UpdateUser: FC = () => {
  const { back } = useRouter();

  const transformBody = (body: IGenericObject) => {
    return {
      ...body,
      role: body?.role?.value ?? body?.role,
    };
  };

  return (
    <>
      <PageHead title='Update User'>
        <Link href='/admin/users'>
          <Button
            variant='outline'
            className='flex gap-1.5 rounded-full px-3 text-primary py-2 border-primary/30 hover:bg-primary/5 text-sm shadow'
            size='sm'
          >
            <Icon name='arrowLeft' size={16} className='text-primary' /> Back
          </Button>
        </Link>
      </PageHead>

      <GetOne url='users'>
        {(data) => {
          return (
            <Update
              url='users'
              message='User Updated Successfully!'
              onSuccess={back}
              transformBody={transformBody}
            >
              <Form
                className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-2 lg:p-5 border border-gray-200 rounded-md bg-white'
                schema={UsersValidations}
                Button={
                  <Button type='submit' className='col-span-full w-fit'>
                    Update
                  </Button>
                }
              >
                <Paragraph className='mb-1 font-semibold col-span-full underline'>
                  Basic Information
                </Paragraph>
                <TextInput
                  label='First Name'
                  name='firstName'
                  required
                  defaultValue={data?.firstName}
                />
                <TextInput
                  label='Last Name'
                  name='lastName'
                  required
                  defaultValue={data?.lastName}
                />

                <TextInput label='Email' name='email' required defaultValue={data?.email} />
                <TextInput label='Phone' name='phone' required defaultValue={data?.phone} />

                <Paragraph className='mb-1 mt-5 font-semibold col-span-full underline'>
                  Other Details
                </Paragraph>
                <TextAreaInput
                  label='Address'
                  name='address'
                  required
                  rows={5}
                  defaultValue={data?.address}
                  containerClassName='w-full'
                />

                <SelectInput
                  optionValue='value'
                  optionLabel='label'
                  label='Role'
                  name='role'
                  required
                  defaultValue={data.role}
                  options={roleOptions}
                />
              </Form>
            </Update>
          );
        }}
      </GetOne>
    </>
  );
};

export default UpdateUser;
