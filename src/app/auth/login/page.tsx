'use client';

import { AppImage, EmailInput, Form, PasswordInput } from '@/_libs/components';
import { Paragraph } from '@/_libs/components';
import { LoginValidations } from './validations';
import { Create } from '@/_libs/api';
import { IGenericObject } from '@/_libs/types';
import { useAuth } from '@/_libs/auth';

export default function Login() {
  const { setToken } = useAuth();

  const onSuccess = (response: IGenericObject) => {
    setToken(response.token, response.user.role);

    window.location.href = '/admin/orders';
  };

  return (
    <div className='relative min-h-screen overflow-hidden bg-linear-to-br from-primary/10 via-white to-secondary/10'>
      {/* Decorative blobs */}
      <div className='pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-secondary/30 blur-3xl' />

      <div className='container mx-auto mt-12 px-4 py-10'>
        <div className='mx-auto grid max-w-lg grid-cols-1 gap-6'>
          {/* Form card */}
          <div className='order-2 lg:order-1 shadow-2xl rounded-2xl bg-white p-6 backdrop-blur-md ring-1 ring-gray-200 sm:p-8'>
            <div className='flex flex-col items-center gap-2 w-full mb-6'>
              <AppImage src='/images/logo.jpg' alt='logo' width={120} height={120} />
              <Paragraph className='text-gray-500 text-sm'>
                Sign in to continue to The OBA.
              </Paragraph>
            </div>

            <Create url='auth/login' onSuccess={onSuccess} hideMsg>
              <Form buttonProps={{ title: 'Sign in' }} schema={LoginValidations}>
                <EmailInput name='email' label='Email' />
                <PasswordInput name='password' label='Password' containerClassName='mt-4' />
              </Form>
            </Create>
          </div>
        </div>
      </div>
    </div>
  );
}
