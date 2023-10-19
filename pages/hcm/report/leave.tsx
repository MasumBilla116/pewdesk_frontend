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
import SweetDeleteAlert from "./../../load_js/controllers/SweetDeleteAlert";
import OrgName from "@/pages/api/Helper/OrgName";
import GetMonthName from "@/pages/api/Helper/GetMonthName";
import GetFullYear from "@/pages/api/Helper/GetFullYear";

export default function LeaveReport(props: any) {
  const { orgname } = props;
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
        <title>HCM | Leave Report</title>
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
                  <div className="table-responsive mt-3">
                    <table
                      id="printable"
                      className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark"
                    >
                      <caption>Leave Report Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={10}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Leave Report</b>
                              </h3>
                              <h4 className="erp-trial-date">
                                <em>
                                  As on {GetMonthName()} {GetFullYear()}
                                </em>
                              </h4>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th scope="col">Emp. ID</th>
                          <th scope="col">Emp. Name</th>
                          <th scope="col">Date</th>
                          <th scope="col"> Department </th>
                          <th scope="col"> Leave Type </th>
                          <th scope="col"> No. Of Days </th>
                          <th scope="col">Remaining Leave</th>
                          <th scope="col">Total Leaves</th>
                          <th scope="col">Total Leave Taken</th>
                          <th scope="col">Leave Carry Forward</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="debit  text-end">92159 </td>
                          <td className="debit  text-end">Jon Abraham </td>
                          <td className="debit text-danger text-end">
                            {" "}
                            22 Mar 2022{" "}
                          </td>
                          <td className="credit text-success text-center">
                            Design
                          </td>
                          <td className="credit text-success text-center">
                            Sick Leave
                          </td>
                          <td className="credit text-success text-center">
                            <span className="badge rounded bg-danger">05</span>
                          </td>
                          <td className="credit text-success text-center">
                            <span className="badge rounded bg-danger">08</span>
                          </td>
                          <td className="credit text-success text-center">
                            <span className="badge rounded bg-danger">25</span>
                          </td>
                          <td className="credit text-warning text-center">
                            12
                          </td>
                          <td className="credit text-warning text-center">8</td>
                        </tr>
                        <tr>
                          <td className="debit  text-end">326975 </td>
                          <td className="debit  text-end">Jon Abraham </td>
                          <td className="debit text-danger text-end">
                            {" "}
                            22 Mar 2022{" "}
                          </td>
                          <td className="credit text-success text-center">
                            Design
                          </td>
                          <td className="credit text-success text-center">
                            Sick Leave
                          </td>
                          <td className="credit text-success text-center">
                            <span className="badge rounded bg-danger">05</span>
                          </td>
                          <td className="credit text-success text-center">
                            <span className="badge rounded bg-danger">08</span>
                          </td>
                          <td className="credit text-success text-center">
                            <span className="badge rounded bg-danger">25</span>
                          </td>
                          <td className="credit text-warning text-center">
                            12
                          </td>
                          <td className="credit text-warning text-center">8</td>
                        </tr>
                      </tbody>
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
      <SweetDeleteAlert />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const id = context.query.v;

  const orgname = await OrgName(id);

  return {
    props: {
      orgname,
    },
  };
}
