import Link from "next/link";
import { useEffect, useState, memo } from "react";
import OrgId from "@/pages/api/Helper/OrgId";

export default function ModuleIVM() {
  const [org, setOrg] = useState(null);
  useEffect(() => {
    setOrg(OrgId());
  }, []);
  return (
    <>
      <button className="erp-aside-menue-item title-color list-group-item list-group-item-action bg-transparent d-flex justify-content-between align-items-center">
        <span>
          <i className="fa-solid fa-address-book erp-left-icon me-1"></i>
          IVM
          <span className="menu-des"> (Inventory Management)</span>
        </span>
        <i className="menue-angle fa-solid fa-angle-right"></i>
      </button>
      <div className="sub-menu">
        <div className="list-group list-group-flush">
          <Link
            href={`/ivm/stock/requisition?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="General Ledger"
            >
              <i className="fas fa fa-snowflake-o" aria-hidden="true"></i>
            </div>
            <span>Stock Requisition</span>
          </Link>
          <Link
            href={`/ivm/goods/receipt-note?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Chart of accounts"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Goods Receipt Note</span>
          </Link>
          <Link
            href={`/ivm/goods/issu-note?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Trial Balance"
            >
              <i className="fas fa fa-balance-scale " aria-hidden="true"></i>
            </div>
            <span>Goods Issu Note</span>
          </Link>
          <Link
            href={`/ivm/goods/return-note?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Trial Balance"
            >
              <i className="fas fa fa-balance-scale " aria-hidden="true"></i>
            </div>
            <span>Goods Return Note</span>
          </Link>
          <Link
            href={`/ivm/gate-entry?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Accounts Receivable"
            >
              <i className="fas fa fa-user " aria-hidden="true"></i>
            </div>
            <span>Gate Entry</span>
          </Link>
          <Link
            href={`/ivm/transfer/in?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Accounts Payable"
            >
              <i className="fas fa fa-university " aria-hidden="true"></i>
            </div>
            <span>Transfer-In</span>
          </Link>
          <Link
            href={`/ivm/transfer/out?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Point of salle Module"
            >
              <i className="fas fa fa-shopping-cart " aria-hidden="true"></i>
            </div>
            <span>Transfer-Out</span>
          </Link>
          <Link
            href={`/ivm/inventory/in-out?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Point of salle Module"
            >
              <i className="fas fa fa-shopping-cart " aria-hidden="true"></i>
            </div>
            <span>Inventory-In-Out</span>
          </Link>
        </div>
      </div>
    </>
  );
}
 
