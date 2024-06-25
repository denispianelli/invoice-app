import { InvoiceDetail } from '@/lib/definitions';

export default function InvoiceAddress({
  type,
  invoice,
}: {
  type: 'sender' | 'client';
  invoice: InvoiceDetail;
}) {
  if (type === 'sender') {
    return (
      <ul className="body leading-[18px] text-seventh dark:text-fifth">
        <li>{invoice.sender_street}</li>
        <li>{invoice.sender_city}</li>
        <li>{invoice.sender_postcode}</li>
        <li>{invoice.sender_country}</li>
      </ul>
    );
  }

  if (type === 'client') {
    return (
      <ul className="body leading-[18px] text-seventh dark:text-fifth">
        <li>{invoice.client_street}</li>
        <li>{invoice.client_city}</li>
        <li>{invoice.client_postcode}</li>
        <li>{invoice.client_country}</li>
      </ul>
    );
  }
}
