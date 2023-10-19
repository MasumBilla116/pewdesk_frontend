export default async function GetDesignation() {
  const res = await fetch(`${process.env.BASE_URL}/get/designation`);
  return await res.json();
}
