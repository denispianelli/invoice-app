import { Badge } from './badge';

export default function InvoiceBadge({
  status,
}: {
  status: 'paid' | 'pending' | 'draft';
}) {
  return (
    <Badge className="justify-self-end" variant={status}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
