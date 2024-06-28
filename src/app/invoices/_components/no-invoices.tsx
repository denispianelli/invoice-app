import IllustrationEmpty from './illustration-empty';

export default function noInvoices() {
  return (
    <div className="flex flex-col items-center">
      <IllustrationEmpty />
      <h2 className="heading-m mb-[23px]">There is nothing here</h2>
      <p className="body w-[200px] text-center font-medium text-sixth dark:text-fifth">
        Create a new invoice by clicking the{' '}
        <span className="font-bold">
          New <span className="hidden md:inline">Invoice</span>
        </span>{' '}
        button and get started
      </p>
    </div>
  );
}
