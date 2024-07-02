'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
  NumericInput,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import {
  ClientCityInput,
  ClientCountryInput,
  ClientEmailInput,
  ClientNameInput,
  ClientPostcodeInput,
  ClientStreetInput,
  InvoiceDateInput,
  PaymentTermsInput,
  ProjectDescriptionInput,
  SenderAddressInput,
  SenderCityInput,
  SenderCountryInput,
  SenderPostcodeInput,
} from './inputs';
import { SheetClose } from '@/components/ui/sheet';
import { createInvoice } from '../_actions/create-invoice';
import { DraftSchema, SendSchema } from '../_schemas/invoices-schema';
import { InvoiceDetail } from '@/lib/definitions';
import formatLocalDate from '@/lib/utils/format-local-date';

export function InvoiceForm({ invoice }: { invoice?: InvoiceDetail }) {
  const [schema, setSchema] = useState(DraftSchema);

  const form = useForm<z.infer<typeof DraftSchema | typeof SendSchema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      'sender-street': invoice?.sender_street || '',
      'sender-city': invoice?.sender_city || '',
      'sender-postcode': invoice?.sender_postcode || '',
      'sender-country': invoice?.sender_country || '',
      'client-name': invoice?.client_name || '',
      'client-email': invoice?.client_email || '',
      'client-street': invoice?.client_street || '',
      'client-city': invoice?.client_city || '',
      'client-postcode': invoice?.client_postcode || '',
      'client-country': invoice?.client_country || '',
      'invoice-date': formatLocalDate(
        invoice ? invoice.created_at : new Date(),
      ),
      'payment-terms': invoice?.payment_terms.toString() || '1',
      'project-description': invoice?.description || '',
      status: 'draft',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const { errors } = form.formState;

  const items = useWatch({
    control: form.control,
    name: 'items',
  });

  useEffect(() => {
    if (!items) {
      return;
    }

    fields.forEach((_field, index) => {
      const item = items[index];
      const prevTotal = item?.total;
      const quantity = form.watch(`items.${index}.quantity`);
      const price = form.watch(`items.${index}.price`);
      const newTotal = Number((quantity * price).toFixed(2));
      if (isNaN(newTotal)) {
        return;
      }
      if (prevTotal !== newTotal) {
        form.setValue(`items.${index}.total`, newTotal);
      }
    });
  }, [items, form, fields]);

  useEffect(() => {
    const items = invoice?.items;
    console.log('useEffect ~ items:', items);

    if (!items) {
      return;
    }

    items.forEach((item, index) => {
      append({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      });
    });
  }, [invoice]);

  async function onSubmit(data: z.infer<typeof schema>) {
    await createInvoice(data);
  }

  return (
    <div>
      <Form {...form}>
        <form className="grid max-h-[calc(100vh-80px)] gap-[69px] bg-white px-6 dark:bg-[#141625] md:overflow-y-auto">
          <div className="grid gap-4">
            <p className="body-variant text-[15px] font-bold text-first">
              Bill From
            </p>
            <div className="grid gap-6">
              <SenderAddressInput control={form.control} />
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                <SenderCityInput control={form.control} />
                <SenderPostcodeInput control={form.control} />
                <SenderCountryInput
                  className="hidden md:block"
                  control={form.control}
                />
              </div>
              <SenderCountryInput
                className="md:hidden"
                control={form.control}
              />
            </div>
          </div>
          <div className="grid gap-4">
            <p className="body-variant text-[15px] font-bold text-first">
              Bill To
            </p>{' '}
            <div className="grid gap-6">
              <ClientNameInput control={form.control} />
              <ClientEmailInput control={form.control} />
              <ClientStreetInput control={form.control} />
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                <ClientCityInput control={form.control} />
                <ClientPostcodeInput control={form.control} />
                <ClientCountryInput
                  className="hidden md:block"
                  control={form.control}
                />
              </div>
              <ClientCountryInput
                className="md:hidden"
                control={form.control}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <InvoiceDateInput control={form.control} />
                <PaymentTermsInput control={form.control} />
              </div>
              <ProjectDescriptionInput control={form.control} />
            </div>
          </div>
          <div className="pb-48 md:pb-60">
            <h2 className="mb-5 text-[18px] font-bold text-[#777F98]">
              Item List
            </h2>
            {fields.map((item, index) => {
              return (
                <div key={item.id} className="mb-12 grid gap-6">
                  <FormField
                    control={form.control}
                    name={`items.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="md:hidden">
                        <div className="flex justify-between">
                          <FormLabel>Item Name</FormLabel>
                          <FormMessage />
                        </div>
                        <FormControl>
                          <FormInput {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-[1fr,2fr,2fr,0.1fr] gap-4 md:grid-cols-[3fr,1fr,2fr,1fr,1fr]">
                    <FormField
                      control={form.control}
                      name={`items.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="hidden md:block">
                          <div className="flex justify-between">
                            <FormLabel>Item Name</FormLabel>
                            <FormMessage />
                          </div>
                          <FormControl>
                            <FormInput {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between">
                            <FormLabel>Qty.</FormLabel>
                            <FormMessage />
                          </div>
                          <FormControl>
                            <NumericInput {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between">
                            <FormLabel>Price</FormLabel>
                            <FormMessage />
                          </div>
                          <FormControl>
                            <NumericInput {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${index}.total`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between">
                            <FormLabel>Total</FormLabel>
                            <FormMessage />
                          </div>
                          <FormControl>
                            <FormInput
                              className="bg-transparant border-none p-0 text-left text-sixth dark:bg-transparent"
                              disabled
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      className="group mt-6"
                      variant="ghost"
                      type="button"
                      size={'icon'}
                      onClick={() => remove(index)}
                    >
                      <svg
                        width="13"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="group-hover:fill-destructive"
                          d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                          fill="#888EB0"
                          fillRule="nonzero"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              );
            })}
            <Button
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F9FAFE] text-[15px] font-bold text-seventh hover:bg-fifth dark:bg-fourth dark:text-sixth dark:hover:bg-third"
              type="button"
              onClick={() =>
                append({ name: '', quantity: 0, price: 0, total: 0 })
              }
            >
              + Add New Item
            </Button>
            <div className="mt-2 text-[10px] font-semibold text-destructive">
              {errors.items && 'Please add at least one item'}
            </div>
          </div>
        </form>
      </Form>
      <div className="fixed bottom-0 left-0 z-50 mb-[91px] h-[64px] w-full bg-gradient-to-b from-black/0 to-black/10 md:absolute md:w-[616px]" />
      <div className="fixed bottom-0 left-0 z-50 flex h-[91px] w-full items-center justify-center gap-2 bg-white dark:bg-third md:absolute md:w-[614px] md:justify-end md:rounded-r-[20px] md:pr-[56px]">
        <SheetClose asChild>
          <Button variant={'three'} type="button" onClick={() => form.reset()}>
            {invoice ? 'Cancel' : 'Discard'}
          </Button>
        </SheetClose>
        {!invoice && (
          <Button
            variant={'three'}
            type="button"
            onClick={() => {
              setSchema(DraftSchema);
              form.setValue('status', 'draft');
              form.handleSubmit(onSubmit)();
            }}
          >
            Save as Draft
          </Button>
        )}

        <Button
          variant={'one'}
          type="button"
          onClick={() => {
            setSchema(SendSchema);
            form.setValue('status', 'pending');
            form.handleSubmit(onSubmit)();
          }}
        >
          {invoice ? 'Save Changes' : 'Save & Send'}
        </Button>
      </div>
    </div>
  );
}
