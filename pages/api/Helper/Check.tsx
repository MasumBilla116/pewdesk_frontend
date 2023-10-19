import $ from "jquery";
import OrgId from "./OrgId";

export default async function Check(url: any, target: any, setCheck: any) {
  const id = $(`#${target}`).val();
  if (id != "") {
    const orgid = OrgId();
    const res = await fetch(`${process.env.BASE_URL}${url}/${orgid}/${id}`);
    const data = await res.json();
    if (data.success === 200) {
      setCheck(true);
    }
    if (data.error === 404) {
      setCheck(false);
    }
  }
}
