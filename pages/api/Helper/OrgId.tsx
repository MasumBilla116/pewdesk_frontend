import Cookies from "js-cookie";
import AccessKey from "../AccessKey";
import { decrypt } from "n-krypta";

export default function OrgId() {
  const NID = Cookies.get("NID");
  const decrypt_NID = decrypt(`${NID}`, `${AccessKey()}`);
  return decrypt_NID.orgid;
}
