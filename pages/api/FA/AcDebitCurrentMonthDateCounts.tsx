export default async function AcDebitCurrentMonthDateCounts(
  year: any,
  month: any,
  orgid: any
) {
  const res = await fetch(
    `http://127.0.0.1:8000/api/fa/account/debit/current-month-date-count/${year}/${month}/${orgid}`
  );
  return await res.json();
}
