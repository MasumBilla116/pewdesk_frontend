export default async function PaginateData(url: any) {
  if (url !== null) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
}
