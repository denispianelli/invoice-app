import { InvoiceDetail } from '@/lib/definitions';

export default function invoiceSentTo({
  children,
  invoice,
}: {
  children: React.ReactNode;
  invoice: InvoiceDetail;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="body text-seventh dark:text-fifth">{children}</p>
      <p className="body-variant text-[15px] font-bold">
        {invoice.client_email}
      </p>
    </div>
  );
}
