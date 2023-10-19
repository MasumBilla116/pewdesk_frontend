import Link from "next/link";
import { useEffect, useState } from "react";
import OrgId from "@/pages/api/Helper/OrgId";

export default function ModuleAttendance(props: any) {
  const [org, setOrg] = useState(null);
  useEffect(() => {
    setOrg(OrgId());
  }, []);
  return (
    <>
      {/*<!-- start attendance -->*/}
      <button
        type="button"
        className="aside-menu-btn erp-aside-menue-item active menu-active title-color list-group-item list-group-item-action bg-transparent"
      >
        <span className="d-flex justify-content-between align-items-center">
          <span>
            <i className="fas fa fa-user-check erp-left-icon me-1"></i>
            AT <span className="menu-des">(Attendance)</span>
          </span>
          <i className="menue-angle fa-solid fa-angle-right"></i>
        </span>
      </button>
      <div className="sub-menu">
        <div className="list-group list-group-flush">
          <Link
            href={`/attendance?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="General Ledger"
            >
              <i className="fas fa fa-snowflake-o" aria-hidden="true"></i>
            </div>
            <span>Go to attendance</span>
          </Link>
        </div>
      </div>

      {/*<!-- end attendance -->*/}
    </>
  );
}
