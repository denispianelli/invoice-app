export default function generateInvoiceId() {
  const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LETTERS_LENGTH = LETTERS.length;

  function generateTwoRandomLetters() {
    const firstLetter = LETTERS[Math.floor(Math.random() * LETTERS_LENGTH)];
    const secondLetter = LETTERS[Math.floor(Math.random() * LETTERS_LENGTH)];
    return firstLetter + secondLetter;
  }

  function generateFourRandomDigits() {
    const min = 1000;
    const max = 9999;
    return Math.round(Math.random() * (max - min)) + min;
  }

  const invoiceId = generateTwoRandomLetters() + generateFourRandomDigits();
  return invoiceId;
}
