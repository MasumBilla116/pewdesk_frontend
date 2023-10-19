export default async function GetCRMCurAcYearMonth(
  year: any,
  month: any,
  orgid: any
) {
  const res = await fetch(
    `${process.env.BASE_URL}/crm/get/account/cur-year-month/${year}/${month}/${orgid}`
  );
  return await res.json();
}
