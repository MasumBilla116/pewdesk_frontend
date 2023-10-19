export default async function GetCRMPayrollInfo(id: any) {
  const res = await fetch(`${process.env.BASE_URL}/get/crm/payroll/info/${id}`);
  return await res.json();
}
