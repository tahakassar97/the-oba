'use client';

import { useRouter } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';

import { Button } from '@/_libs/components';

const ForbiddenPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className='flex items-center justify-center px-4 min-h-screen bg-linear-to-br from-gray-50 to-gray-100'>
      <div className='text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl'>
        <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-amber-100 flex items-center justify-center'>
          <ShieldAlert className='w-10 h-10 text-amber-600' />
        </div>
        <h1 className='text-3xl font-bold text-gray-900 mb-3'>Access Denied</h1>
        <p className='text-gray-600 mb-2'>403 Forbidden</p>
        <p className='text-gray-600 mb-8'>
          You don&apos;t have permission to access this resource. Please contact an administrator if
          you believe this is a mistake.
        </p>
        <div className='flex flex-col gap-3 justify-center'>
          <Button onClick={() => router.back()} variant='outline' className='w-full'>
            Go Back
          </Button>
          <Button onClick={() => router.push('/')} variant='gradient' className='w-full'>
            Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
