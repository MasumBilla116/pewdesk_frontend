export default async function getBusinessType( ) {
    const res = await fetch("http://127.0.0.1:8000/api/get/business/type");
    const data = await res.json();

    return data;
}