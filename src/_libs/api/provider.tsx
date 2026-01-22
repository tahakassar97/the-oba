'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 30 * 60 * 1000, // 30 minutes
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false,
    },
  },
});

export function TanstackProvider({ children }: { children: React.ReactNode }) {
  const [queryClientProvider] = useState(() => queryClient);

  return (
    <QueryClientProvider client={queryClientProvider}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </QueryClientProvider>
  );
}
