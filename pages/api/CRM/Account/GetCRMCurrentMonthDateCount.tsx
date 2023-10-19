export default async function GetCRMCurrentMonthDateCount(
  year: any,
  month: any,
  orgid: any
) {
  const res = await fetch(
    `${process.env.BASE_URL}/crm/get/account/current-month-date/count/${year}/${month}/${orgid}`
  );
  return await res.json();
}
