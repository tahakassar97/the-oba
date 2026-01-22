import { ChevronLeft, ChevronRight } from 'lucide-react';

import { usePagination } from '@/_libs/hooks/use-pagination';

import { Button } from '../buttons/Button';
import { cn } from '../utils';

interface PaginationWithUrlProps {
  className?: string;
  totalRecords?: number;
}

const Pagination: React.FC<PaginationWithUrlProps> = ({ className, totalRecords }) => {
  const { currentPage, enableNext, enablePrev, setPage } = usePagination(totalRecords);

  return (
    <div className={cn('flex items-center justify-center space-x-2 my-5', className)}>
      <Button
        variant='outline'
        className='rounded-md w-24 h-9 text-xs text-primary border-primary px-0'
        onClick={() => setPage(+currentPage - 1)}
        type='button'
        disabled={!enablePrev}
        aria-label='Go to previous page'
      >
        <ChevronLeft className='h-4 w-4' /> Previous
      </Button>

      <Button
        variant='outline'
        size='icon'
        className='rounded-md w-24 h-9 text-primary border-primary text-xs px-0'
        onClick={() => setPage(+currentPage + 1)}
        type='button'
        disabled={!enableNext}
        aria-label='Go to next page'
      >
        Next <ChevronRight className='h-4 w-4' />
      </Button>
    </div>
  );
};

export { Pagination };
