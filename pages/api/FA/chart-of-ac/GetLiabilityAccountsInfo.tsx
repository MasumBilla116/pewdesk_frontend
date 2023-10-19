export default async function GetLiabilityAccountsInfo(orgid: any) {
  const res = await fetch(
    `http://127.0.0.1:8000/api/get/fa/chart-of-account/liability/account/${orgid}`
  );
  return await res.json();
}
