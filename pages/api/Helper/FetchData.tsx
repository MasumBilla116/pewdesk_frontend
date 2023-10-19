export default async function FetchData(url: any) {
  const res = await fetch(`${process.env.BASE_URL}${url}`);

  return await res.json();
}
