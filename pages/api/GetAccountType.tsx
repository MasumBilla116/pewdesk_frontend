export default async function GetAccountType() {
  const res = await fetch("http://127.0.0.1:8000/api/get/account/type");
  const data = await res.json();
  return data;
}
