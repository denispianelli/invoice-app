export default function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  })
    .format(amount)
    .replace('£', '£ ');
}
