import Link from "next/link";
import { useEffect, useState, memo } from "react";
import OrgId from "@/pages/api/Helper/OrgId";

export default function ModuleCRM() {
  const [org, setOrg] = useState(null);
  useEffect(() => {
    setOrg(OrgId());
  }, []);
  return (
    <>
      <button className=" erp-aside-menue-item title-color list-group-item list-group-item-action bg-transparent d-flex justify-content-between align-items-center">
        <span className="btn-left-text-icon">
          {/*<!-- <i className="fa-solid fa-address-book"></i> -->*/}
          <i className="fa-solid fa-handshake erp-left-icon me-1"></i>
          <span className="btn-abv-con">CRM</span>
          <span className="menu-des">
            <span className="btn-des-inner">
              (Customer Relationship Managment)
            </span>
          </span>
        </span>
        <i className="menue-angle fa-solid fa-angle-right"></i>
      </button>
      <div className="sub-menu">
        <div className="list-group list-group-flush">
          <Link
            href={`/crm/accounting?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="General Ledger"
            >
              <i className="fas fa fa-snowflake-o" aria-hidden="true"></i>
            </div>
            <span>Accounting</span>
          </Link>
          <Link
            href={`/crm/attendance?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Chart of accounts"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Attendance</span>
          </Link>
          <Link
            href={`/crm/payroll?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Chart of accounts"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Payroll</span>
          </Link>
          <Link
            href={`/crm/recruitment?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Chart of accounts"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Recruitment</span>
          </Link>
        </div>
      </div>
    </>
  );
}
