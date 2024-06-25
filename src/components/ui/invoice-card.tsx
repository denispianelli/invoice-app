import * as React from 'react';
import { cn } from '@/lib/utils';

const InvoiceCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'my-4 grid rounded-[8px] bg-white p-6 dark:bg-third md:shadow-sm',
      className,
    )}
    {...props}
  />
));
InvoiceCard.displayName = 'InvoiceCard';

export { InvoiceCard };
