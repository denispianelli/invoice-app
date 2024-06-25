'use client';

import { deleteInvoice, markInvoiceAsPaid } from '@/lib/actions';
import { Button } from './button';
import { useRouter } from 'next/navigation';
import { useToast } from './use-toast';

export default function InvoiceDetailButtons({ id }: { id: string }) {
  const { toast } = useToast();
  const router = useRouter();

  const handleUpdate = async () => {
    await markInvoiceAsPaid({ id });
    toast({
      title: 'Invoice Updated',
      description: `Invoice ${id} has been marked as paid.`,
      variant: 'success',
    });
    router.refresh();
  };

  const handleDelete = async () => {
    await deleteInvoice({ id });
    toast({
      title: 'Invoice Deleted',
      description: `Invoice ${id} has been deleted.`,
      variant: 'success',
    });
    router.push('/invoices');
  };
  return (
    <>
      <Button className="w-[73px]" variant={'two'}>
        Edit
      </Button>
      <Button onClick={handleDelete} className="w-[89px]" variant={'four'}>
        Delete
      </Button>
      <Button onClick={handleUpdate} className="w-[149px]" variant={'one'}>
        Mark as Paid
      </Button>
    </>
  );
}
