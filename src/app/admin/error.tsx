'use client';

import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

import { Button } from '@/_libs/components';

const ErrorPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className='flex items-center justify-center px-4 mt-20'>
      <div className='text-center max-w-md mx-auto p-8 bg-white/60 rounded-2xl shadow-xl'>
        <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center'>
          <AlertCircle className='w-10 h-10 text-red-500' />
        </div>
        <h1 className='text-3xl font-bold text-gray-900 mb-3'>Oops! Something went wrong</h1>
        <p className='text-gray-600 mb-8'>
          We&apos;re sorry, but we encountered an unexpected error. Please try again or return to
          the home page.
        </p>
        <div className='flex justify-center'>
          <Button onClick={() => router.push('/admin/dashboard')} variant='gradient'>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
