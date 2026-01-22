'use client';

import { useSearchParams } from 'next/navigation';
import { pageSize as _pageSize } from '@/_libs/components';

const useQueryParams = (ignoredParams?: string[]) => {
  const searchParams = useSearchParams();

  const page = searchParams.get('PageNumber') || '1';
  const pageSize = searchParams.get('PageSize') || _pageSize;

  const _params = Object.fromEntries(searchParams.entries());

  if (ignoredParams) {
    ignoredParams.filter((param) => delete _params[param]);
  }

  const params = Object.fromEntries(Object.entries(_params));

  return {
    page: Number(page),
    limit: Number(pageSize),
    ...params,
  };
};

export { useQueryParams };
