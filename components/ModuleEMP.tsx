import Link from "next/link";
import { useEffect, useState ,memo} from "react";
import OrgId from "@/pages/api/Helper/OrgId";

export default  function ModuleEMP(props: any) {
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
            <i className="fas fa fa-users-viewfinder erp-left-icon me-1"></i>
            EMP <span className="menu-des">(Employee)</span>
          </span>
          <i className="menue-angle fa-solid fa-angle-right"></i>
        </span>
      </button>
      <div className="sub-menu">
        <div className="list-group list-group-flush">
          <Link
            href={`/employee/report?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="employee report"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Employee Report</span>
          </Link>
          <Link
            href={`/employee/salary?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="employee salary"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Employee Salary</span>
          </Link>
        </div>
      </div>

      {/*<!-- end attendance -->*/}
    </>
  );
} 