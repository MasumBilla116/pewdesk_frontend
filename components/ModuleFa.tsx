import Link from "next/link";
import { useEffect, useState } from "react";
import OrgId from "@/pages/api/Helper/OrgId";

export default function ModuleFa() {
  const [org, setOrg] = useState(String);
  useEffect(() => {
    setOrg(OrgId());
  }, []);

  return (
    <>
      <button className="erp-aside-menue-item active menu-active d-flex justify-content-between align-items-center title-color list-group-item list-group-item-action bg-transparent">
        <span className="">
          <span>
            <i className="fa-solid fa-money-check-dollar erp-left-icon me-1"></i>
            FA <span className="menu-des">(Finance & Accounting) </span>
          </span>
        </span>
        <i className="menue-angle fa-solid fa-angle-right"></i>
      </button>
      <div className="sub-menu">
        <div className="list-group list-group-flush">
          <Link
            href={`/fa/accounts?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="General Ledger"
            >
              <i className="fas fa fa-snowflake-o" aria-hidden="true"></i>
            </div>
            <span>Account</span>
          </Link>
          <Link
            href={`/fa/general-ledger?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="General Ledger"
            >
              <i className="fas fa fa-snowflake-o" aria-hidden="true"></i>
            </div>
            <span>General Ledger</span>
          </Link>
          <Link
            href={`/fa/chart-of-account?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Chart of accounts"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Chart of accounts</span>
          </Link>
          <Link
            href={`/fa/trail-balance?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Trial Balance"
            >
              <i className="fas fa fa-balance-scale " aria-hidden="true"></i>
            </div>
            <span>Trail Balance</span>
          </Link>
        </div>
      </div>
    </>
  );
}
