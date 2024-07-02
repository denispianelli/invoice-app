export default function formatLocalDate(date: Date) {
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

let date = new Date(
  'Sat Aug 21 2021 00:00:00 GMT+0200 (heure d’été d’Europe centrale)',
);
let localDate = formatLocalDate(date);
console.log(localDate); // Output: 2021-08-21
