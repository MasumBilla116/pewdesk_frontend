import Link from "next/link";
import { useEffect, useState, memo } from "react";
import OrgId from "@/pages/api/Helper/OrgId";

export default function ModuleODM() {
  const [org, setOrg] = useState(null);
  useEffect(() => {
    setOrg(OrgId());
  }, []);
  return (
    <>
      <button className="erp-aside-menue-item title-color list-group-item list-group-item-action bg-transparent d-flex justify-content-between align-items-center">
        <span>
          <i className="fa-solid fa-truck-fast me-1"></i>
          ODM <span className="menu-des">(Order Management)</span>
        </span>
        <i className="menue-angle fa-solid fa-angle-right"></i>
      </button>
      <div className="sub-menu">
        <div className="list-group list-group-flush">
          <Link
            href={`/odm/delivary-order?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="General Ledger"
            >
              <i className="fas fa fa-snowflake-o" aria-hidden="true"></i>
            </div>
            <span>Delivery Order</span>
          </Link>
          <Link
            href={`/odm/selles-order?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Chart of accounts"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Selles Order</span>
          </Link>
          <Link
            href={`/odm/dispatch-order?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Chart of accounts"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Dispatch Order</span>
          </Link>
        </div>
      </div>
    </>
  );
}
 
