export default async function GetCRMAccountInfoWithPagination(
  year: any,
  month: any,
  orgid: any
) {
  const res = await fetch(
    `${process.env.BASE_URL}/crm/get/account/info/paging-data/${year}/${month}/${orgid}`
  );
  return await res.json();
}
