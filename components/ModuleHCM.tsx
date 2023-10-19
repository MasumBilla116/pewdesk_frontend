import Link from "next/link";
import { useEffect, useState, memo } from "react";
import OrgId from "@/pages/api/Helper/OrgId";

export default function ModuleHCM() {
  const [org, setOrg] = useState(null);
  useEffect(() => {
    setOrg(OrgId());
  }, []);
  return (
    <>
      <button className="erp-aside-menue-item title-color list-group-item list-group-item-action bg-transparent d-flex justify-content-between align-items-center">
        <span>
          <i className="fas fa fa-users me-1 "></i>
          HCM <span className="menu-des">(Human Capital Management)</span>
        </span>
        <i className="menue-angle fa-solid fa-angle-right"></i>
      </button>
      <div className="sub-menu">
        <div className="list-group list-group-flush">
          {/* <Link
            href={`/hcm/report/attendance?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="attendance report"
            >
              <i className="fas fa fa-snowflake-o" aria-hidden="true"></i>
            </div>
            <span>Attendance Report</span>
          </Link> */}
          <Link
            href={`/hcm/budget/expenses?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="budget Expense"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Budget Expense</span>
          </Link>
          <Link
            href={`/hcm/budget/revenues?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Budget Revenue"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Budget Revienue</span>
          </Link>
          <Link
            href={`/hcm/budget/?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Budget"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Budgets</span>
          </Link>
          <Link
            href={`/hcm/categories?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Category"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Categories</span>
          </Link>
          {/* <Link
            href={`/hcm/report/daily?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="daily report"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Daily Report</span>
          </Link> */}

          {/* <Link
            href={`/hcm/estimates?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="estimates"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Estimates</span>
          </Link> */}
          <Link
            href={`/hcm/report/expense?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="expense report"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Expense Report</span>
          </Link>
          <Link
            href={`/hcm/expenses?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="expense"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Expenses</span>
          </Link>
          <Link
            href={`/hcm/invoice/report?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="invoice report"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Invoice Report</span>
          </Link>
          <Link
            href={`/hcm/invoice/?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="invoice "
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Invoice </span>
          </Link>
          <Link
            href={`/hcm/report/leave?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="leave report "
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Leave Report </span>
          </Link>
          <Link
            href={`/hcm/payment/?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Payment"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Payments</span>
          </Link>
          <Link
            href={`/hcm/payment/reports?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Payment Report"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Payment Report</span>
          </Link>
          {/* <Link
            href={`/hcm/payment/payroll-item?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Payroll item"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Payroll Item</span>
          </Link> */}
          {/* <Link
            href={`/hcm/payslip/?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Payslip"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Payslip</span>
          </Link>
          <Link
            href={`/hcm/payslip/report?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Payslip report"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Payslip Report</span>
          </Link> */}
          {/* <Link
            href={`/hcm/report/project?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="project report"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Project Report</span>
          </Link> */}
          <Link
            href={`/hcm/provident-fund?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="provident fund"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Provident Fund</span>
          </Link>
          {/* <Link
            href={`/hcm/sells?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="sells"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Sells</span>
          </Link> */}
          <Link
            href={`/hcm/report/task?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="tast report"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Task Report</span>
          </Link>
          <Link
            href={`/hcm/report/user?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="user report"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>User Report</span>
          </Link>
        </div>
      </div>
    </>
  );
}
 
