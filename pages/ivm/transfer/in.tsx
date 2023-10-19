import Head from "next/head";
import { useEffect, useState } from "react";
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
import FetchData from "@/pages/api/Helper/FetchData";
import PagingLink from "@/components/PagingLink";
import PaginateData from "@/pages/api/Helper/PaginateData";
import Table2ExcelMinJs from "../../load_js/plugin/table2excel.min.js";
import Table2Excel from "../../load_js/controllers/table2excel";
import OrgName from "@/pages/api/Helper/OrgName";
import GetMonthName from "@/pages/api/Helper/GetMonthName";
import GetFullYear from "@/pages/api/Helper/GetFullYear";

export default function TransferIn(props: any) {
  const { transferInData, orgname } = props;
  const [transferInPaginateData, setTransferInPaginateData] =
    useState(transferInData);
  const [paginateUrl, setPaginateUrl] = useState(transferInData?.links[1].url);

  const FetchPaginateInfo = async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setTransferInPaginateData(res);
    }
  };

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
        <title>IVM | Transfer In</title>
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
                  <div className="table-responsive mt-4">
                    <table
                      id="printable"
                      className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark"
                    >
                      <caption>Transfer In Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={10}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Transfer In</b>
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
                          <th scope="col">S.I</th>
                          <th scope="col">Category</th>
                          <th scope="col">Item Code</th>
                          <th scope="col">Transac UOM </th>
                          <th scope="col"> Transac Qty. </th>
                        </tr>
                      </thead>
                      <tbody>
                        {transferInPaginateData?.data?.map(
                          (data: any, index: any) => (
                            <tr key={data.goods_receipt_note_id}>
                              <td className="debit  text-end"> {index + 1}</td>
                              <td className="debit text-light text-start">
                                {data.cat_name}
                              </td>
                              <td className="credit text-light text-start">
                                <span className="badge bg-success rounded">
                                  {data.item_code}
                                </span>
                              </td>
                              <td className="credit text-light text-start">
                                <span className="badge bg-success rounded">
                                  {data.uom}
                                </span>
                              </td>
                              <td className="credit text-success text-start">
                                <span className="badge bg-success rounded">
                                  {data.transaction_qnty}
                                </span>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>

                    {/* start paginate */}
                    <PagingLink
                      pageInfo={transferInPaginateData}
                      fetchdata={FetchPaginateInfo}
                    />
                    {/* end paginate */}
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

export async function getServerSideProps(context: any) {
  const id = context.query.v;
  const transferInData = await FetchData(`/get/ivm/transfer/in/info/${id}`);
  const orgname = await OrgName(id);

  return {
    props: {
      transferInData,
      orgname,
    },
  };
}
