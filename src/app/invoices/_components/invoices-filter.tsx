'use client';

import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Status = 'draft' | 'pending' | 'paid';

export default function InvoicesFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Extract status filters from URL query params
  const statusFilters = searchParams.getAll('status') as Status[];

  // State to manage checkbox states
  const [filters, setFilters] = useState<Record<Status, boolean>>({
    draft: statusFilters.includes('draft'),
    pending: statusFilters.includes('pending'),
    paid: statusFilters.includes('paid'),
  });

  // Function to handle filter changes
  const handleFilterChange = (filter: Status, checked: boolean) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: checked,
    }));
  };

  // Effect to update URL query params when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    const selectedFilters = Object.entries(filters)
      .filter(([, checked]) => checked)
      .map(([filter]) => filter);

    if (selectedFilters.length) {
      params.set('status', selectedFilters.join('.'));
    } else {
      params.delete('status');
    }
    replace(`${pathname}?${params.toString()}`);
  }, [filters, pathname, replace, searchParams]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="group text-[15px] font-bold leading-[15px] -tracking-[0.25px]"
          variant="ghost"
        >
          <div className="hidden md:block">Filter by status</div>
          <div className="md:hidden">Filter</div>
          <svg
            className="ml-3 transition-transform group-data-[state=open]:rotate-180 md:ml-[14px]"
            width="11"
            height="7"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1l4.228 4.228L9.456 1"
              stroke="#7C5DFA"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuCheckboxItem
          preventClose
          checked={filters.draft}
          onCheckedChange={(checked) => handleFilterChange('draft', checked)}
        >
          Draft
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          preventClose
          checked={filters.pending}
          onCheckedChange={(checked) => handleFilterChange('pending', checked)}
        >
          Pending
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          preventClose
          checked={filters.paid}
          onCheckedChange={(checked) => handleFilterChange('paid', checked)}
        >
          Paid
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
