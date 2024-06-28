import { Button } from '@/components/ui/button';
import styles from '@/components/ui/home.module.css';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import ArrowLeft from '../[id]/_components/arrow-left';
import { InvoiceForm } from '../new/_components/new-invoice-form';

export default function NewInvoice() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative w-[90px] p-0" variant={'one'}>
          <div className="absolute left-[6px] flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
                  fill="#7C5DFA"
                  fillRule="nonzero"
                />
              </svg>
            </div>
            New
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent
        className={`mt-[70px] max-h-[calc(100vh-72px)] w-screen overflow-y-auto bg-white p-0 pb-0 pt-9 dark:bg-[#141625] md:mt-[80px] md:max-h-[calc(100vh-80px)] md:w-[616px] md:overflow-y-hidden md:rounded-r-[20px] ${styles['scroll-container']}`}
        side={'left'}
      >
        <SheetHeader>
          <SheetClose asChild>
            <Button
              variant={'ghost'}
              className="body-variant mx-6 mb-6 flex w-fit items-center gap-6 pl-0 font-bold md:hidden"
            >
              <ArrowLeft />
              Go back
            </Button>
          </SheetClose>
          <SheetTitle className="text-left">New Invoice</SheetTitle>
        </SheetHeader>
        <InvoiceForm />
      </SheetContent>
    </Sheet>
  );
}
