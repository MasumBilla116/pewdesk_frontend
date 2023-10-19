import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Header from "./../../../components/Header";
import Aside from "./../../../components/Aside";
import ToggleOption from "./../../../components/ToggleOption";
import Footer from "./../../../components/Footer";
import TablePrint from "@/components/TablePrint";
import TableFilter from "@/components/TableFilter";
import JqueryMin from "./../../load_js/plugin/jquery.min.js";
import AsidejQuery from "./../../load_js/controllers/AsidejQuery";
import FullScreenMode from "./../../load_js/controllers/FullScreenMode";
import PrintMin from "./../../load_js/controllers/PrintMin";
import JqueryUiMin from "./../../load_js/plugin/JqueryUiMin";
import DraggElements from "./../../load_js/controllers/DraggElements";
import PickDate from "./../../load_js/controllers/PickDate";
import Table2ExcelMinJs from "../../load_js/plugin/table2excel.min.js";
import Table2Excel from "../../load_js/controllers/table2excel";

export default function PayrollItem() {
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle.min")
      : null;
  }, []);
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>HCM | Payroll item</title>
      </Head>

      <ToggleOption />
      <div className="erp-container erp-bg-front">
        <div className="erp-container-fluid">
          <div className="erp-page-body d-lg-flex">
            {/* Start aside */}
            <Aside />
            {/* end aside */}
            <main className="erp-main text-secondary">
              <div className="all-content-wraper">
                {/* start header */}
                <Header />
                {/* end header */}
                {/*<!-- start your code -->*/}
                <div className="container-fluid pt-3 pb-3 dashboard-content">
                  {/* <!-- start  code --> */}
                  {/* start report action */}
                  <TablePrint />
                  <TableFilter />
                  {/* end report action */}
                  {/*<!-- start ledger table -->*/}
                  <div className="table-responsive">
                    <table
                      id="printable"
                      className="font-13 erp-table-dark tbl-bg table table-bordered text-secondary table-dark"
                    >
                      <caption>General Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={10}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>Julfidar Garments Ltd.</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Trial Balance</b>
                              </h3>
                              <h4 className="erp-trial-date">
                                <em>As on August 2021</em>
                              </h4>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Category</th>
                          <th scope="col">Default / Unit Amount</th>
                          <th scope="col"> Action </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="debit  text-end">
                            Leave balance amount
                          </td>
                          <td className="debit text-danger text-end">
                            Monthly remuneration
                          </td>
                          <td className="credit text-light text-end">5</td>
                          <td className="d-flex justify-content-center align-items-center">
                            <button
                              type="button"
                              className="btn me-5  rounded-circle btn-outline-warning"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Edit"
                            >
                              <i className="fas fa fa-pen"></i>
                            </button>
                            <button
                              type="button"
                              className="btn rounded-circle btn-outline-danger"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Delete"
                            >
                              <i className="fas fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="debit  text-end">Arrears of salary</td>
                          <td className="debit text-danger text-end">
                            {" "}
                            Additional remuneration
                          </td>
                          <td className="credit text-light text-end">5</td>
                          <td className="d-flex justify-content-center align-items-center">
                            <button
                              type="button"
                              className="btn me-5  rounded-circle btn-outline-warning"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Edit"
                            >
                              <i className="fas fa fa-pen"></i>
                            </button>
                            <button
                              type="button"
                              className="btn rounded-circle btn-outline-danger"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Delete"
                            >
                              <i className="fas fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr className="text-center">
                          <td colSpan={2}>total</td>
                          <td className="text-end">= 320000</td>
                          <td colSpan={1}> </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  {/* end ledger table */}
                  {/* <!-- end  code --> */}
                </div>
                {/* end your code */}
              </div>
              {/*<!-- start footer -->*/}
              <Footer />
              {/*<!-- end footer -->*/}
            </main>
          </div>
        </div>
      </div>

      {/* start script */}
      <JqueryMin />
      <AsidejQuery />
      <FullScreenMode />
      <PrintMin />
      <JqueryUiMin />
      <DraggElements />
      <PickDate />
      <Table2ExcelMinJs />
      <Table2Excel />
    </>
  );
}
