'use client';

import { Suspense } from 'react';

import Sidebar from './_layouts/Sidebar';
import Header from './_layouts/Header';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import ErrorPage from './error';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='flex min-h-screen bg-linear-to-br from-sky-50 to-indigo-100 overflow-hidden'>
        <Header />

        <Sidebar />

        <main className='lg:ml-72.5 flex-1 pt-24 pb-5 px-2 overflow-y-auto bg-gray-50/50'>
          <div className='xl:container xl:mx-auto w-full lg:px-3'>
            <ErrorBoundary errorComponent={ErrorPage}>
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </>
  );
}
