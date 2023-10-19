import Link from "next/link";
import Cookies from "js-cookie";
import { decrypt } from "n-krypta";
import { memo, useEffect, useState } from "react";
import Key from "@/pages/api/AccessKey";

export default function ModuleECM() {
  const [org, setOrg] = useState(null);
  useEffect(() => {
    const NID = Cookies.get("NID");
    const decrypt_NID = decrypt(`${NID}`, `${Key()}`);
    setOrg(decrypt_NID.orgid);
  }, []);
  return (
    <>
      <button className="erp-aside-menue-item title-color list-group-item list-group-item-action bg-transparent d-flex justify-content-between align-items-center">
        <span>
          <i className="fa-solid fa-dolly erp-left-icon me-1"></i>
          ECM <span className="menu-des">E-commerce</span>
        </span>
        <i className="menue-angle fa-solid fa-angle-right"></i>
      </button>
      <div className="sub-menu">
        <div className="list-group list-group-flush">
          <Link
            href={`/ecommerce/selles?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="General Ledger"
            >
              <i className="fas fa fa-snowflake-o" aria-hidden="true"></i>
            </div>
            <span>Selles</span>
          </Link>
          <Link
            href={`/ecommerce/purchase-order?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="General Ledger"
            >
              <i className="fas fa fa-snowflake-o" aria-hidden="true"></i>
            </div>
            <span>Purchase Order</span>
          </Link>
          <Link
            href={`/ecommerce/purchase-return?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Chart of accounts"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Purchase Return</span>
          </Link>
          <Link
            href={`/ecommerce/RFQ?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Chart of accounts"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>RFQ</span>
          </Link>
          {/* <Link
            href={`/ecommerce/add/purchase-order?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Chart of accounts"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Add Purchase Order</span>
          </Link>
          <Link
            href={`/ecommerce/add/purchase-return?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Chart of accounts"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Add Purchase return</span>
          </Link>
          <Link
            href={`/ecommerce/add/vendor-quatation?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Chart of accounts"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Add Vendor Quatation</span>
          </Link>
          <Link
            href={`/ecommerce/add/RFQ?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Chart of accounts"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Add RFQ</span>
          </Link>
          <Link
            href={`/ecommerce/edite/purchase-order?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Chart of accounts"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Edite Purchase Order</span>
          </Link>
          <Link
            href={`/ecommerce/edite/purchase-return?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Chart of accounts"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Edite Purchase return</span>
          </Link>
          <Link
            href={`/ecommerce/edite/vendor-quatation?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Chart of accounts"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Edit Vendor Quatation</span>
          </Link>
          <Link
            href={`/ecommerce/edite/quotation-approval?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Chart of accounts"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Edit Quatation Approval</span>
          </Link>
          <Link
            href={`/ecommerce/edite/RFQ?v=${org}`}
            className="border-0 list-group-item list-group-item-action sub-menu-item title-color"
          >
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Chart of accounts"
            >
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </div>
            <span>Edit RFQ</span>
          </Link> */}
        </div>
      </div>
    </>
  );
}
