export default async function GetAcYearMonth(
  year: any,
  month: any,
  orgid: any
) {
  const res = await fetch(
    `http://127.0.0.1:8000/api/fa/account/information/${year}/${month}/${orgid}`
  );

  return await res.json();
}
