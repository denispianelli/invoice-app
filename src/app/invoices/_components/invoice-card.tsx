import { Badge } from '@/components/ui/badge';
import { InvoiceCard } from '@/components/ui/invoice-card';
import { Invoice } from '@/lib/definitions';
import InvoiceId from '@/components/ui/invoice-id';
import InvoiceBadge from '@/components/ui/invoice-badge';

export default function InvoiceInfos({ invoice }: { invoice: Invoice }) {
  return (
    <InvoiceCard className="grid grid-cols-2 items-center gap-6 md:grid md:grid-cols-[15%,60%,20%,5%] md:place-content-center md:gap-0">
      <InvoiceId id={invoice.id} />
      <h2 className="body justify-self-end font-medium text-[#858BB2] dark:text-foreground md:hidden">
        {invoice.client_name}
      </h2>
      <div className="grid items-center justify-center gap-2 md:grid-cols-3">
        <p className="body-variant font-medium text-seventh dark:text-fifth">
          <span className="text-sixth dark:text-fifth">Due&nbsp;</span>
          {invoice.payment_due.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </p>{' '}
        <h2 className="body hidden font-medium text-[#858BB2] dark:text-foreground md:inline">
          {invoice.client_name}
        </h2>
        <p className="self-end text-[15px] font-bold text-foreground md:justify-self-end">
          {new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
          })
            .format(invoice.total)
            .replace('£', '£ ')}
        </p>
      </div>
      <InvoiceBadge status={invoice.status} />
      <svg
        className="mx-auto hidden md:block"
        width="7"
        height="10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1l4 4-4 4"
          stroke="#7C5DFA"
          strokeWidth="2"
          fill="none"
          fillRule="evenodd"
        />
      </svg>
    </InvoiceCard>
  );
}
