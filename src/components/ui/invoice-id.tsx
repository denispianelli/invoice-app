export default function invoiceId({ id }: { id: string }) {
  return (
    <p className="body-variant text-[15px] font-bold text-foreground">
      <span className="text-seventh">#</span>
      {id}
    </p>
  );
}
