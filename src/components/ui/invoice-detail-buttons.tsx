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
import EditInvoice from '@/app/invoices/[id]/_components/edit-invoice';
import { InvoiceDetail } from '@/lib/definitions';

export default function InvoiceDetailButtons({
  invoice,
}: {
  invoice: InvoiceDetail;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const { id } = invoice;

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
      <EditInvoice invoice={invoice} />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="w-[89px]" variant={'four'}>
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[327px] bg-white p-12 dark:bg-third md:w-[480px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="heading-m text-[24px]">
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription className="body font-medium text-sixth">
              Are your sure you want to delete invoice #{id}? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="body-variant h-[48px] w-[90px] rounded-[24px] border-none bg-[#F9FAFE] font-bold text-seventh hover:bg-[#DFE3FA] hover:text-seventh dark:bg-fourth dark:text-fifth dark:hover:bg-white dark:hover:text-fifth">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="body-variant h-[48px] w-[90px] rounded-[24px] bg-ninth font-bold hover:bg-tenth dark:text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button onClick={handleUpdate} className="w-[149px]" variant={'one'}>
        Mark as Paid
      </Button>
    </>
  );
}
