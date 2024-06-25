import { InvoiceDetail } from '@/lib/definitions';
import InvoiceAddress from './invoice-address';

export default function invoiceBillTo({ invoice }: { invoice: InvoiceDetail }) {
  return (
    <div className="body grid gap-[13px] text-seventh dark:text-fifth">
      <p>Bill To</p>
      <div className="grid gap-[8px]">
        <p className="body-variant text-[15px] font-bold text-eighth dark:text-white">
          {invoice.client_name}
        </p>
        <InvoiceAddress invoice={invoice} type="client" />
      </div>
    </div>
  );
}
