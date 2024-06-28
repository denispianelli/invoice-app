'use client';

import { deleteInvoice, markInvoiceAsPaid } from '@/lib/actions';
import { Button } from './button';
import { useRouter } from 'next/navigation';
import { useToast } from './use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';

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
      description: `Invoice #${id} has been deleted.`,
      variant: 'success',
    });
    router.push('/invoices');
  };
  return (
    <>
      <Button className="w-[73px]" variant={'two'}>
        Edit
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="w-[89px]" variant={'four'}>
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[327px] md:w-[480px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are your sure you want to delete invoice #{id}? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button onClick={handleUpdate} className="w-[149px]" variant={'one'}>
        Mark as Paid
      </Button>
    </>
  );
}
