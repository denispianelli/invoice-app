'use client';

import { Button } from '@/components/ui/button';
import styles from '@/components/ui/home.module.css';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import ArrowLeft from '../[id]/_components/arrow-left';
import { InvoiceForm } from './new-invoice-form';

export default function NewInvoice() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="relative h-[44px] w-[90px] p-0 md:h-[48px] md:w-[150px]"
          variant={'one'}
        >
          <div className="absolute left-[6px] flex items-center gap-2 md:left-[8px] md:gap-[16px]">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
                  fill="#7C5DFA"
                  fillRule="nonzero"
                />
              </svg>
            </div>
            <p>
              New <span className="hidden md:inline">Invoice</span>
            </p>
          </div>
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
              Go back
            </Button>
          </SheetClose>
          <SheetTitle className="text-left">New Invoice</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <InvoiceForm />
      </SheetContent>
    </Sheet>
  );
}
