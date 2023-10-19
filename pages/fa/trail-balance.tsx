import Head from "next/head";
import { useEffect, useState, useCallback, memo } from "react";
import Header from "./../../components/Header";
import Aside from "./../../components/Aside";
import ToggleOption from "./../../components/ToggleOption";
import Footer from "./../../components/Footer";
import TablePrint from "@/components/TablePrint";
import TableFilter from "@/components/TableFilter";
import JqueryMin from "./../load_js/plugin/jquery.min.js";
import AsidejQuery from "./../load_js/controllers/AsidejQuery";
import FullScreenMode from "./../load_js/controllers/FullScreenMode";
import PrintMin from "./../load_js/controllers/PrintMin";
import JqueryUiMin from "./../load_js/plugin/JqueryUiMin";
import DraggElements from "./../load_js/controllers/DraggElements";
import PickDate from "./../load_js/controllers/PickDate";
import GetAccountCraditDebitInfo from "../api/FA/GetAccountCraditDebitInfo";
import GetFullYear from "../api/Helper/GetFullYear";
import GetMonthName from "../api/Helper/GetMonthName";
import GetOrgCurrencies from "../api/PreloadOrgInfo/GetOrgCurrencies";
import PaginateData from "../api/Helper/PaginateData";
import PagingLink from "@/components/PagingLink";
import Table2ExcelMinJs from "./../load_js/plugin/table2excel.min.js";
import Table2Excel from "./../load_js/controllers/table2excel";
import OrgName from "../api/Helper/OrgName";
function TrialBalance(props: any) {
  const { craditDebitInfo, orgCurrencie, orgname } = props;

  const [DebitTotalAmount, setDebitTotalAmount] = useState(0);
  const [CraditTotalAmount, setCraditTotalAmount] = useState(0);
  const [acountInfo, setAcInfo] = useState(craditDebitInfo);

  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle.min")
      : null;
  }, []);

  useEffect(() => {
    var debitAmount = 0;
    var craditAmount = 0;
    acountInfo.data?.map((row: any) => {
      if (row.account_type_id === 1) debitAmount += row.amount;
      if (row.account_type_id === 2) craditAmount += row.amount;
    });

    setDebitTotalAmount(debitAmount);
    setCraditTotalAmount(craditAmount);
  }, [acountInfo, DebitTotalAmount, CraditTotalAmount]);

  const FetchPaginateData = useCallback(async (url: any) => {
    const res = await PaginateData(url);
    if (url !== null) {
      setAcInfo(res);
    }
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FA | Trail Balance</title>
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
                      <caption>Trail Balance Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={5}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Trial Balance</b>
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
                          <th scope="col" rowSpan={2}>
                            S.N
                          </th>
                          <th scope="col" rowSpan={2}>
                            Heads of Account
                          </th>
                          <th scope="col" rowSpan={2}>
                            Ref
                          </th>
                          <th scope="col" colSpan={2}>
                            {" "}
                            Amount ( {orgCurrencie} )
                          </th>
                        </tr>
                        <tr className="text-center">
                          <th scope="row">Debit</th>
                          <th>Credit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {acountInfo.data?.map((data: any, index: any) => (
                          <tr key={index}>
                            <td className="date text-center">
                              <b>{index + 1}</b>
                            </td>
                            <td> {data.description}</td>
                            <td className="text-center">
                              <span className="badge bg-primary rounded">
                                {data.reference}
                              </span>
                            </td>
                            {data.account_type_id === 1 ? (
                              <td className="text-success text-end">
                                {data.amount}
                                <span className="text-secondary ">/-</span>
                              </td>
                            ) : (
                              <td className="text-success text-end"></td>
                            )}
                            {data.account_type_id === 2 ? (
                              <td className="text-success text-end">
                                {data.amount}
                                <span className="text-secondary ">/-</span>
                              </td>
                            ) : (
                              <td className="text-success text-end"> </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="text-center">
                          <td colSpan={3}>Total</td>
                          <td className="text-end">
                            <span className="text-secondary me-1">=</span>{" "}
                            {DebitTotalAmount}{" "}
                            <span className="text-secondary ">/-</span>
                            <span className="pill">{orgCurrencie}</span>
                          </td>
                          <td className="text-end">
                            <span className="text-secondary me-1">=</span>{" "}
                            {CraditTotalAmount}{" "}
                            <span className="text-secondary ">/-</span>
                            <span className="pill">{orgCurrencie}</span>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <PagingLink
                      pageInfo={acountInfo}
                      fetchdata={FetchPaginateData}
                    />
                  </div>
                  {/* end ladger table */}
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

export default memo(TrialBalance);

export async function getServerSideProps(context: any) {
  const craditDebitInfo = await GetAccountCraditDebitInfo(
    GetFullYear(),
    GetMonthName(),
    context.query.v
  );

  const orgCurrencie = await GetOrgCurrencies(context.query.v);
  const orgname = await OrgName(context.query.v);

  return {
    props: {
      craditDebitInfo,
      orgCurrencie,
      orgname,
    },
  };
}
