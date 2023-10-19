export default async function AcCurrentMonthDateCounts(
  year: any,
  month: any,
  orgid: any
) {
  const res = await fetch(
    `http://127.0.0.1:8000/api/fa/account/current-month-date-count/${year}/${month}/${orgid}`
  );
  return await res.json();
}
