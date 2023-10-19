export default async function GetOrgCurrencies(orgid: any) {
  const res = await fetch(
    `http://127.0.0.1:8000/api/get/org/currencie/${orgid}`
  );
  const data = await res.json();
  return data.currencie_name;
}
