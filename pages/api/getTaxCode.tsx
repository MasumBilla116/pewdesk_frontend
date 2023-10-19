export default async function getTaxCode()
{
    const res = await fetch("http://127.0.0.1:8000/api/get/tax/code");
    const data = await res.json();

    return data;
}