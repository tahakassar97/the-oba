'use client';

import React, { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';

import { cn } from '../utils';
import { Button } from '../buttons/Button';

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  alwaysExpanded?: boolean;
  onSearch?: (query: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
  onSearch,
  className,
  defaultValue,
  alwaysExpanded,
}) => {
  const [isExpanded, setIsExpanded] = useState(!!defaultValue || alwaysExpanded);
  const [query, setQuery] = useState(defaultValue || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    setIsExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleBlur = () => {
    if (!query && !alwaysExpanded) {
      setIsExpanded(false);
    }
  };

  const handleSearch = () => {
    onSearch?.(query);
  };

  const handleClear = () => {
    onSearch?.('');
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        'flex items-center transition-300',
        'rounded-full border border-primary/40',
        isExpanded || alwaysExpanded
          ? 'w-80 h-10 px-4 py-2 shadow-sm'
          : 'w-10 h-10 justify-center cursor-pointer bg-gray-50',
        className,
      )}
      onClick={alwaysExpanded ? undefined : !isExpanded ? handleSearchClick : undefined}
    >
      {isExpanded ? (
        <div className='flex items-center w-full space-x-2'>
          <Search className='h-5 w-5 text-primary/70' />
          <input
            ref={inputRef}
            type='text'
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className={cn(
              'grow bg-transparent outline-none text-xs text-gray-700 placeholder-gray-400',
              isExpanded ? 'h-10' : 'h-auto',
            )}
          />
          {query ? (
            <Button
              variant='link'
              size='xs'
              onClick={handleClear}
              className='text-gray-400 hover:text-gray-600 transition-colors'
            >
              <X className='h-4 w-4' />
            </Button>
          ) : null}
        </div>
      ) : (
        <Search className='h-5 w-5 text-primary/70' />
      )}
    </div>
  );
};
