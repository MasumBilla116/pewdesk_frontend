export default async function GetCRMAccountInfo(
  year: any,
  month: any,
  orgid: any
) {
  const res = await fetch(
    `${process.env.BASE_URL}/crm/get/account/info/${year}/${month}/${orgid}`
  );
  return await res.json();
}
