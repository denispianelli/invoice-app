import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

type Checked = DropdownMenuCheckboxItemProps['checked'];

export default function InvoicesFilter() {
  const searchParams = useSearchParams();
  const status = searchParams.getAll('status').join('.').split('.');
  const pathname = usePathname();
  const { replace } = useRouter();

  const [showDraft, setShowDraft] = useState<Checked>(status.includes('draft'));
  const [showPending, setShowPending] = useState<Checked>(
    status.includes('pending'),
  );
  const [showPaid, setShowPaid] = useState<Checked>(status.includes('paid'));

  const handleFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams);

    const filters = [];
    if (showDraft) filters.push('draft');
    if (showPending) filters.push('pending');
    if (showPaid) filters.push('paid');

    if (filters.length) {
      params.set('status', filters.join('.'));
    } else {
      params.set('status', 'draft.pending.paid');
    }

    replace(`${pathname}?${params.toString()}`);
  }, [showDraft, showPending, showPaid, searchParams, pathname, replace]);

  useEffect(() => {
    handleFilters();
  }, [showDraft, showPending, showPaid, handleFilters]);

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
          checked={showDraft}
          onCheckedChange={setShowDraft}
        >
          Draft
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          preventClose
          checked={showPending}
          onCheckedChange={setShowPending}
        >
          Pending
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          preventClose
          checked={showPaid}
          onCheckedChange={setShowPaid}
        >
          Paid
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
