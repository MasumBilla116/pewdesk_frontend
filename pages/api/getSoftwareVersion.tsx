export default async function getSoftwareVersion()
{
    const res = await fetch("http://127.0.0.1:8000/api/get/software/version");
    const data = await res.json();
    return data;
}