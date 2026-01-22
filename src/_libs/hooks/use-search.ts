'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { debounce } from 'lodash';

const useSearch = (key = 'key') => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get(key) || '');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateUrl = useCallback(
    debounce((value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) params.set(key, value);
      else params.delete(key);
      router.push(`?${params}`, {
        scroll: false,
      });
    }, 500),
    [searchParams, router, key],
  );

  const setSearchQuery = (value: string) => {
    setQuery(value);
    updateUrl(value);
  };

  return { query, setSearchQuery };
};

export { useSearch };
