export default function invoiceDate({
  children,
  date,
}: {
  children: React.ReactNode;
  date: Date;
}) {
  return (
    <div className="grid gap-[13px]">
      <p className="body text-seventh dark:text-fifth">{children}</p>
      <p className="body-variant text-[15px] font-bold">
        {date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })}
      </p>
    </div>
  );
}
