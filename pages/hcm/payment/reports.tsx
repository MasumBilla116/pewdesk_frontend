import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import Loader from "@/components/Loader";
import OrgId from "../../api/Helper/OrgId";
import FetchData from "../../api/Helper/FetchData";
import PaginateData from "../../api/Helper/PaginateData";
import PagingLink from "@/components/PagingLink";
import StoreItem from "../../api/Helper/StoreItem";
import UpdateItem from "../../api/Helper/UpdateItem";
import DeleteItem from "../../api/Helper/DeleteItem";
import { data } from "jquery";
import GetOrgCurrencies from "@/pages/api/PreloadOrgInfo/GetOrgCurrencies";
import ActionBtn from "@/components/ActionBtn";
import Check from "@/pages/api/Helper/Check";
import OrgName from "@/pages/api/Helper/OrgName";
import GetMonthName from "@/pages/api/Helper/GetMonthName";
import GetFullYear from "@/pages/api/Helper/GetFullYear";
import Table2ExcelMinJs from "../../load_js/plugin/table2excel.min.js";
import Table2Excel from "../../load_js/controllers/table2excel";

export default function Reports(props: any) {
  const { paymentData, orgCurrencie, orgname } = props;
  const [loader, setLoader] = useState(false);
  const [paymentPaginateInfo, setPaymentPaginateInfo] = useState(paymentData);
  const [paginateUrl, setPaginateUrl] = useState(paymentData?.links[1].url);
  const [checkSign, setCheckSign] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const FetchPaginateInfo = async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setPaymentPaginateInfo(res);
    }
  };

  useEffect(() => {
    var amount = 0;
    paymentPaginateInfo?.data?.map((data: any) => {
      amount += data.paid_amount;
    });
    setTotalAmount(amount);
    setCheckSign(false);
  }, [totalAmount, paginateUrl, paymentData, paymentPaginateInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const UpdateInfo = async (target: any) => {
    const data = $(`#${target}`).serializeArray();

    const formData = JSON.stringify({
      invoice_id: data[0].value,
      paid_amount: data[1].value,
      payment_type: data[2].value,
      paid_date: data[3].value,
      orgid: data[4].value,
      id: data[5].value,
    });
    UpdateItem(
      "/update/hcm/payment/info",
      formData,
      setLoader,
      FetchPaginateInfo,
      paginateUrl
    );
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
        <title>HCM | Payments Reports</title>
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
                      <caption>Payment Report Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={10}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Payment Report</b>
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
                          <th scope="col"> S.I</th>
                          <th scope="col"> Invoice Number</th>
                          <th scope="col"> Invoice ID</th>
                          <th scope="col"> Client</th>
                          <th scope="col">Payment Type</th>
                          <th scope="col">Paid Date</th>
                          <th scope="col">Create Date</th>
                          <th scope="col">Due Date</th>
                          <th scope="col">
                            Paid Amount
                            <span className="pill">{orgCurrencie}</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentPaginateInfo?.data?.map(
                          (data: any, index: any) => (
                            <tr key={data.payment_id}>
                              <td>{index + 1}</td>
                              <td className="text-primary">
                                {data.invoice_number}
                              </td>
                              <td className="text-primary">
                                {data.invoice_id + process.env.INVOICE_ID}
                              </td>
                              <td>{data.client_name}</td>
                              <td className="debit text-light text-start">
                                {data.payment_method}
                              </td>
                              <td className="debit text-success text-start">
                                {data.paid_date}
                              </td>
                              <td className="debit text-success text-start">
                                {data.created_date}
                              </td>
                              <td className="debit text-warning text-start">
                                {data.due_date}
                              </td>
                              <td className="credit text-success text-end">
                                {data.paid_amount}
                                <span className="text-secondary">/-</span>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                      <tfoot>
                        <tr className="text-center">
                          <td colSpan={8}>total</td>
                          <td className="text-end">
                            <span className="text-secondary me-2">=</span>
                            {totalAmount}
                            <span className="pill">{orgCurrencie}</span>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    {/* start paginate */}
                    <PagingLink
                      pageInfo={paymentPaginateInfo}
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

  const paymentData = await FetchData(`/get/hcm/payment/report/info/${id}`);
  const orgCurrencie = await GetOrgCurrencies(context.query.v);
  const orgname = await OrgName(id);

  return {
    props: {
      paymentData,
      orgCurrencie,
      orgname,
    },
  };
}
