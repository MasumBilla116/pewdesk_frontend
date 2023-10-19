import Cookies from "js-cookie";
import { decrypt } from "n-krypta";

export default function AccessKey() {
  const XSRL_TOKEN = Cookies.get("XSRL_TOKEN");
  const XSRL_TOKEN_KEY = `${process.env.KEY_A}` + `${process.env.KEY_C}`;
  const decrept_XSRL_TOKEN = decrypt(`${XSRL_TOKEN}`, `${XSRL_TOKEN_KEY}`);
  const secrateKey =
    `${process.env.KEY_C}` +
    decrept_XSRL_TOKEN.email +
    `${process.env.KEY_B}` +
    decrept_XSRL_TOKEN.password +
    `${process.env.KEY_A}` +
    decrept_XSRL_TOKEN.orgid;
  return secrateKey;
}
