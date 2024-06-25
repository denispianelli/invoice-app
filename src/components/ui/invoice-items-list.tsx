import { InvoiceDetail } from '@/lib/definitions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import formatCurrency from '@/services/format-currency';

export default function invoiceItemsList({
  invoice,
}: {
  invoice: InvoiceDetail;
}) {
  return (
    <div className="mt-[38px]">
      <div className="grid gap-6 rounded-t-[8px] bg-[#F9FAFE] px-6 pb-6 dark:bg-fourth md:pt-6">
        <Table className="hidden md:inline-table">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Item Name</TableHead>
              <TableHead className="text-center">QTY.</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-center text-seventh dark:text-fifth">
                  {item.quantity}
                </TableCell>
                <TableCell className="text-seventh md:hidden">{`${item.quantity} x ${formatCurrency(item.price)}`}</TableCell>
                <TableCell className="text-right font-bold text-seventh dark:text-fifth">
                  {formatCurrency(item.price)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(item.total)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="grid gap-6 md:hidden">
          {invoice.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-6"
            >
              <div className="grid gap-2">
                <p className="body-variant text-[15px] font-bold">
                  {item.name}
                </p>
                <p className="body-variant text-[15px] font-bold text-seventh dark:text-fifth">
                  {item.quantity} x {formatCurrency(item.price)}
                </p>
              </div>
              <p className="body-variant font-bold">
                {formatCurrency(item.total)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="body flex items-center justify-between rounded-b-[8px] bg-[#373B53] px-6 py-8 text-white dark:bg-eighth">
        <p className="md:hidden">Grand Total</p>
        <p className="hidden md:inline">Amount Due</p>
        <p className="heading-m font-bold">
          {formatCurrency(invoice.total)}
        </p>{' '}
      </div>
    </div>
  );
}
