'use client';

import { cloneElement, useState } from 'react';
import { IGenericObject } from '@/_libs/types';

import { useList, FetchType } from '../react-query/use-crud';

interface Props {
  url: string;
  mode?: FetchType;
  children?: React.ReactNode;
  searchName?: string;
  enableSearch?: boolean;
}

const SelectList = ({
  url,
  mode,
  children,
  searchName = 'SearchTerm',
  enableSearch = true,
}: Props) => {
  const [searchParam, setSearchParam] = useState({});

  const handleChange = (value: string) => {
    if (!value && !searchParam) return;

    setSearchParam({ [searchName]: value });
  };

  const { data, isLoading, error } = useList({
    url,
    mode,
    params: searchParam,
  });

  return cloneElement(
    children as React.ReactElement<{
      options: IGenericObject[];
      isLoading: boolean;
      error: Error | null;
      handleChange?: (value: string) => void;
    }>,
    {
      options: data?.data ?? data,
      isLoading,
      error,
      handleChange: enableSearch ? handleChange : undefined,
    },
  );
};

export { SelectList };
