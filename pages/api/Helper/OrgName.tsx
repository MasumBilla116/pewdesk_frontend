export default async function OrgName(orgid: any) {
  const res = await fetch(`${process.env.BASE_URL}/get/org/name/${orgid}`);
  const data = await res.json();
  return data.org_name;
}
