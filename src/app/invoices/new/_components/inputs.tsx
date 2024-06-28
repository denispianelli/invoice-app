import {
  FormControl,
  FormDescription,
  FormField,
  FormFieldWrapper,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { Control } from 'react-hook-form';

export function SenderAddressInput({ control }: { control: Control<any> }) {
  return (
    <FormFieldWrapper
      control={control}
      name="sender-street"
      label="Street Address"
    />
  );
}

export function SenderCityInput({ control }: { control: Control<any> }) {
  return <FormFieldWrapper control={control} name="sender-city" label="City" />;
}

export function SenderPostcodeInput({ control }: { control: Control<any> }) {
  return (
    <FormFieldWrapper
      control={control}
      name="sender-postcode"
      label="Post Code"
    />
  );
}

export function SenderCountryInput({
  control,
  className,
}: {
  control: Control<any>;
  className?: string;
}) {
  return (
    <FormFieldWrapper
      control={control}
      className={className}
      name="sender-country"
      label="Country"
    />
  );
}

export function ClientNameInput({ control }: { control: Control<any> }) {
  return (
    <FormFieldWrapper
      control={control}
      name="client-name"
      label="Client's Name"
    />
  );
}

export function ClientEmailInput({ control }: { control: Control<any> }) {
  return (
    <FormFieldWrapper
      control={control}
      name="client-email"
      label="Client's Email"
    />
  );
}

export function ClientStreetInput({ control }: { control: Control<any> }) {
  return (
    <FormFieldWrapper
      control={control}
      name="client-street"
      label="Street Address"
    />
  );
}

export function ClientCityInput({ control }: { control: Control<any> }) {
  return <FormFieldWrapper control={control} name="client-city" label="City" />;
}

export function ClientPostcodeInput({ control }: { control: Control<any> }) {
  return (
    <FormFieldWrapper
      control={control}
      name="client-postcode"
      label="Post Code"
    />
  );
}

export function ClientCountryInput({
  control,
  className,
}: {
  control: Control<any>;
  className?: string;
}) {
  return (
    <FormFieldWrapper
      className={className}
      control={control}
      name="client-country"
      label="Country"
    />
  );
}

export function InvoiceDateInput({ control }: { control: Control<any> }) {
  return (
    <FormFieldWrapper
      control={control}
      name="invoice-date"
      label="Invoice Date"
      type="date"
    />
  );
}

export function PaymentTermsInput({ control }: { control: Control<any> }) {
  return (
    <FormField
      control={control}
      name="payment-terms"
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between">
            <FormLabel>Payment Terms</FormLabel>
            <FormMessage />
          </div>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Net 1 Day" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="1">Net 1 Day</SelectItem>
              <SelectItem value="7">Net 7 Days</SelectItem>
              <SelectItem value="14">Net 14 Days</SelectItem>
              <SelectItem value="30">Net 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}

export function ProjectDescriptionInput({
  control,
}: {
  control: Control<any>;
}) {
  return (
    <FormFieldWrapper
      control={control}
      name="project-description"
      label="Project Description"
    />
  );
}
