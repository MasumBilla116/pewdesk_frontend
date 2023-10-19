import Link from "next/link";
import { useEffect, useState, memo } from "react";
import OrgId from "@/pages/api/Helper/OrgId";

export default function ModuleSM() {
  const [org, setOrg] = useState(null);
  useEffect(() => {
    setOrg(OrgId());
  }, []);
  return (
    <>
      <button className="erp-aside-menue-item title-color list-group-item list-group-item-action bg-transparent d-flex justify-content-between align-items-center">
        <span>
          <i className="fas fa fa-building me-1"></i>
          SM <span className="menu-des">(School Management)</span>
        </span>
        <i className="menue-angle fa-solid fa-angle-right"></i>
      </button>
      <div className="sub-menu">
        <div className="list-group list-group-flush">
          <Link
            href={`/school/dashboard?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Dashboard"
            >
              <i className="fas fa fa-snowflake-o" aria-hidden="true"></i>
            </div>
            <span>Dashboard</span>
          </Link>
          <Link
            href={`/school/add/student?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="add student"
            >
              <i className="fas fa fa-snowflake-o" aria-hidden="true"></i>
            </div>
            <span>Add Student</span>
          </Link>
          <Link
            href={`/school/student/attendance?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="attendance"
            >
              <i className="fas fa fa-snowflake-o" aria-hidden="true"></i>
            </div>
            <span>Attendance</span>
          </Link>
          <Link
            href={`/school/create/result?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="create result"
            >
              <i className="fas fa fa-snowflake-o" aria-hidden="true"></i>
            </div>
            <span>Create Result</span>
          </Link>
          <Link
            href={`/school/student/diary?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="diary"
            >
              <i className="fas fa fa-snowflake-o" aria-hidden="true"></i>
            </div>
            <span>Diary</span>
          </Link>
          <Link
            href={`/school/student/pay?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="diary"
            >
              <i className="fas fa fa-snowflake-o" aria-hidden="true"></i>
            </div>
            <span>Pay</span>
          </Link>
          <Link
            href={`/school/organization?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="organization"
            >
              <i className="fas fa fa-snowflake-o" aria-hidden="true"></i>
            </div>
            <span>Organization</span>
          </Link>
          <Link
            href={`/school/result-sheet?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="result-sheet"
            >
              <i className="fas fa fa-snowflake-o" aria-hidden="true"></i>
            </div>
            <span>Result-Sheet</span>
          </Link>
        </div>
      </div>
    </>
  );
}
 
