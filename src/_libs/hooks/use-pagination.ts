'use client';

import { useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { pageSize } from '../components';

export function usePagination(totalRecords?: number) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get current page from URL or default to 1
  const currentPage = Number(searchParams.get('page') || 1);

  // Calculate total pages
  const totalPages = totalRecords ? Math.ceil(totalRecords / pageSize) : 1;

  const enableNext = currentPage < totalPages;
  const enablePrev = currentPage > 1;

  // Function to change page
  const setPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      if (page <= 1) {
        params.delete('page');
      } else {
        params.set('page', page.toString());
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  return {
    enableNext,
    enablePrev,
    currentPage,
    setPage,
  };
}
