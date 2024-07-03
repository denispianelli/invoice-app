import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import styles from '@/components/ui/home.module.css';
import ArrowLeft from './arrow-left';
import { InvoiceDetail } from '@/lib/definitions';
import { InvoiceForm } from '../../_components/new-invoice-form';

export default function EditInvoice({ invoice }: { invoice: InvoiceDetail }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-[73px]" variant={'two'}>
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent
        className={`mt-[70px] max-h-[calc(100vh-72px)] w-screen overflow-y-auto overflow-x-hidden bg-white p-0 pb-0 pt-9 dark:bg-[#141625] md:mt-[80px] md:max-h-[calc(100vh-80px)] md:w-[616px] md:overflow-y-hidden md:rounded-r-[20px] lg:mt-0 lg:max-h-screen lg:translate-x-[103px] ${styles['scroll-container']}`}
        side={'left'}
      >
        <SheetHeader>
          <SheetClose asChild>
            <Button
              variant={'ghost'}
              className="body-variant mx-6 mb-6 flex w-fit items-center gap-6 pl-0 font-bold md:hidden"
            >
              <ArrowLeft />
              <p className="body-variant h-[12px] text-[15px] font-bold">
                Go back
              </p>{' '}
            </Button>
          </SheetClose>
          <SheetTitle className="text-left">
            Edit <span className="text-[#777F98]">#</span>
            {invoice.id}
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <InvoiceForm invoice={invoice} />
      </SheetContent>
    </Sheet>
  );
}
