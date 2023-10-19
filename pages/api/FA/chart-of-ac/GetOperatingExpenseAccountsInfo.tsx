export default async function GetOperatingExpenseAccountsInfo(orgid: any) {
  const res = await fetch(
    `http://127.0.0.1:8000/api/get/fa/chart-of-account/operating/expense/account/${orgid}`
  );
  return await res.json();
}
