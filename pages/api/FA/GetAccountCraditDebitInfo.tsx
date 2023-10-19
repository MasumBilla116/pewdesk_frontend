export default async function GetAccountCraditDebitInfo(
  year: any,
  month: any,
  orgid: any
) {
  const res = await fetch(
    `http://127.0.0.1:8000/api/fa/account/credit-debit/info/${year}/${month}/${orgid}`
  );
  return await res.json();
}
