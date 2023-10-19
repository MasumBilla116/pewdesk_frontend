export default async function GetChartOfAcAssetAcInfo(orgid: any) {
  const res = await fetch(
    `http://127.0.0.1:8000/api/get/fa/chart-of-account/asset/account/${orgid}`
  );
  return await res.json();
}
