'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';

import {
  Button,
  Form,
  Icon,
  Link,
  Paragraph,
  PasswordInput,
  SelectInput,
  TextAreaInput,
  TextInput,
} from '@/_libs/components';
import { Create } from '@/_libs/api';
import { IGenericObject } from '@/_libs/types';
import { UserRolesTitles } from '@/_libs/auth/types';

import PageHead from '../../_layouts/PageHead';
import { UsersValidations } from '../validations';

export const roleOptions = [
  { label: UserRolesTitles.ADMIN, value: UserRolesTitles.ADMIN },
  { label: UserRolesTitles.CHEF, value: UserRolesTitles.CHEF },
  { label: UserRolesTitles.WAITER, value: UserRolesTitles.WAITER },
];

const CreateUser: FC = () => {
  const { back } = useRouter();

  const transformBody = (body: IGenericObject) => {
    return {
      ...body,
      role: body?.role?.value ?? body?.role,
    };
  };

  return (
    <>
      <PageHead title='Create User'>
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

      <Create
        url='users'
        message='User Created Successfully!'
        onSuccess={back}
        transformBody={transformBody}
      >
        <Form
          className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-2 lg:p-5 border border-gray-200 rounded-md bg-white'
          schema={UsersValidations}
          Button={
            <Button type='submit' className='col-span-full w-fit'>
              Create
            </Button>
          }
        >
          <Paragraph className='mb-1 font-semibold col-span-full underline'>
            Basic Information
          </Paragraph>
          <TextInput label='First Name' name='firstName' required />
          <TextInput label='Last Name' name='lastName' required />

          <TextInput label='Email' name='email' required />
          <PasswordInput label='Password' name='password' required />
          <TextInput label='Phone' name='phone' required />

          <Paragraph className='mb-1 mt-5 font-semibold col-span-full underline'>
            Other Details
          </Paragraph>
          <TextAreaInput
            label='Address'
            name='address'
            required
            rows={5}
            containerClassName='w-full'
          />

          <SelectInput
            optionValue='value'
            optionLabel='label'
            label='Role'
            name='role'
            required
            options={roleOptions}
          />
        </Form>
      </Create>
    </>
  );
};

export default CreateUser;
