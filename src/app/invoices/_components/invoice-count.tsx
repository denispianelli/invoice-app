export default function InvoiceCount({
  count,
  filters,
}: {
  count: number;
  filters?: string[];
}) {
  return (
    <p className="body text-[12px] font-medium text-sixth md:text-[13px]">
      <span className="hidden md:inline">
        {count === 1 && 'There is '}
        {count > 1 && 'There are '}
      </span>
      <span>
        {count === 0 && 'No '}
        {count >= 1 && `${count} `}
        {count >= 1 && !filters && 'total'}
        {count >= 1 && filters && `${filters.join(' and ')}`}
      </span>{' '}
      <span>{`invoice${count === 1 ? '' : 's'}`}</span>
    </p>
  );
}
