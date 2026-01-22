'use client';

import { AppImage, EmailInput, Form, PasswordInput } from '@/_libs/components';
import { Button, Paragraph } from '@/_libs/components';

export default function Login() {
  return (
    <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/10 via-white to-secondary/10'>
      {/* Decorative blobs */}
      <div className='pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-secondary/20 blur-3xl' />

      <div className='container mx-auto mt-12 px-4 py-10'>
        <div className='mx-auto grid max-w-lg grid-cols-1 gap-6'>
          {/* Form card */}
          <div className='order-2 lg:order-1 rounded-2xl bg-white/70 p-6 backdrop-blur-md ring-1 ring-gray-200 shadow-sm sm:p-8'>
            <div className='flex flex-col items-center gap-2 w-full mb-6'>
              <AppImage src='/images/logo.jpg' alt='logo' width={120} height={120} />
              <Paragraph className='text-gray-500 text-sm'>
                Sign in to continue to The OBA.
              </Paragraph>
            </div>

            <Form buttonProps={{ title: 'Sign in', className: 'rounded-xl py-2.5' }}>
              <EmailInput name='email' label='Email' />
              <PasswordInput name='password' label='Password' containerClassName='mt-4' />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
