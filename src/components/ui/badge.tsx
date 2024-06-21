import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'flex items-center justify-center items-center before:h-2 before:w-2 before:rounded-full font-bold w-[104px] before:mr-2 h-[40px] rounded-[9px] border px-2.5 py-0.5 body-variant transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        paid: 'before:bg-[#33D69F] bg-[#33D69F]/5 border-transparent text-[#33D69F]',
        pending:
          'before:bg-[#FF8F00] bg-[#FF8F00]/5 border-transparent text-[#FF8F00]',
        draft:
          'before:bg-[#373B53] dark:before:bg-fifth dark:text-fifth bg-[#373B53]/5 border-transparent text-[#373B53] dark:bg-fifth/5',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
