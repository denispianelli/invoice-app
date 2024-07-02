import { InvoiceCard } from '@/components/ui/invoice-card';
import InvoiceId from '@/components/ui/invoice-id';
import InvoiceBadge from '@/components/ui/invoice-badge';
import InvoiceAddress from '@/components/ui/invoice-address';
import { InvoiceDetail } from '@/lib/definitions';
import InvoiceDate from '@/components/ui/invoice-date';
import InvoiceBillTo from '@/components/ui/invoice-bill-to';
import InvoiceSentTo from '@/components/ui/invoice-sent-to';
import InvoiceItemsList from '@/components/ui/invoice-items-list';
import InvoiceDetailButtons from '@/components/ui/invoice-detail-buttons';

export default function InvoiceDetails({
  invoice,
}: {
  invoice: InvoiceDetail;
}) {
  return (
    <>
      <InvoiceCard className="top-[80px] z-50 p-6 drop-shadow-sm md:sticky md:flex md:justify-between md:p-8">
        <div className="flex items-center justify-between md:justify-start md:gap-[20px]">
          <p className="body text-[#857BB2] dark:text-fifth">Status</p>
          <InvoiceBadge status={invoice.status} />
        </div>
        <div className="hidden gap-2 md:flex">
          <InvoiceDetailButtons invoice={invoice} />
        </div>
      </InvoiceCard>
      <InvoiceCard className="mb-[56px] drop-shadow-md md:p-8 md:drop-shadow-sm">
        <div className="md:flex md:justify-between">
          <div>
            <InvoiceId id={invoice.id} />
            <p className="body mb-[30px] text-seventh dark:text-fifth md:mt-2">
              {invoice.description}
            </p>
          </div>
          <InvoiceAddress type="sender" invoice={invoice} />
        </div>
        <div className="mt-[31px] grid grid-cols-2 gap-8 md:mr-[65px] md:grid-cols-3">
          <div className="grid gap-[31px]">
            <InvoiceDate date={invoice.created_at}>Invoice Date</InvoiceDate>
            <InvoiceDate date={invoice.payment_due}>Payment Due</InvoiceDate>
          </div>
          <InvoiceBillTo invoice={invoice} />
          <InvoiceSentTo invoice={invoice}>Sent to</InvoiceSentTo>
        </div>
        <InvoiceItemsList invoice={invoice} />
      </InvoiceCard>
    </>
  );
}
