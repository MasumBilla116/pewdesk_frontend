export default async function AcCraditCurrentMonthDateCounts(
  year: any,
  month: any,
  orgid: any
) {
  const res = await fetch(
    `http://127.0.0.1:8000/api/fa/account/cradit/current-month-date-count/${year}/${month}/${orgid}`
  );
  return await res.json();
}
