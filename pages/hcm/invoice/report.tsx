import Head from "next/head";
import Image from "next/image";
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
import Table2ExcelMinJs from "../../load_js/plugin/table2excel.min.js";
import Table2Excel from "../../load_js/controllers/table2excel";
import { useForm } from "react-hook-form";
import Loader from "@/components/Loader";
import OrgId from "../../api/Helper/OrgId";
import FetchData from "../../api/Helper/FetchData";
import PaginateData from "../../api/Helper/PaginateData";
import PagingLink from "@/components/PagingLink";
import UpdateItem from "../../api/Helper/UpdateItem";
import DeleteItem from "../../api/Helper/DeleteItem";
import GetOrgCurrencies from "@/pages/api/PreloadOrgInfo/GetOrgCurrencies";
import ActionBtn from "@/components/ActionBtn";
import GetMonthName from "@/pages/api/Helper/GetMonthName";
import GetFullYear from "@/pages/api/Helper/GetFullYear";
import OrgName from "@/pages/api/Helper/OrgName";
import AddModalTableBtn from "@/components/AddModalTableBtn";
import { decrypt } from "n-krypta";
import AccessKey from "../../../pages/api/AccessKey";
import Cookies from "js-cookie";

export default function InvoiceReport(props: any) {
  const { invoiceData, orgCurrencie, orgname } = props;

  /**
   * -------------------------------------------
   * ---- Start Module Access Permissions ------
   * -------------------------------------------
   */
  const [roleReader, setRoleReader] = useState(0);
  const [roleCreator, setRoleCreator] = useState(0);
  const [roleMonitor, setRoleMonitor] = useState(0);
  const [roleAdmin, setRoleAdmin] = useState(0);
  const [roleSuperAdmin, setRoleSuperAdmin] = useState(0);
  useEffect(() => {
    const IMA = Cookies.get("IMA");
    const decrypt_IMA = decrypt(`${IMA}`, `${AccessKey()}`);
    // IMA Identity Module Access permission
    setRoleReader(decrypt_IMA.roleReader);
    setRoleCreator(decrypt_IMA.roleCreator);
    setRoleMonitor(decrypt_IMA.roleMonitor);
    setRoleAdmin(decrypt_IMA.roleAdmin);
    setRoleSuperAdmin(decrypt_IMA.roleSuperAdmin);
  }, [roleReader, roleCreator, roleMonitor, roleAdmin, roleSuperAdmin]);
  /**
   * -------------------------------------------
   * ---- Start Module Access Permissions ------
   * -------------------------------------------
   */

  const [loader, setLoader] = useState(false);
  const [invoiceDataPaginateInfo, setInvoiceDataPaginateInfo] =
    useState(invoiceData);
  const [paginateUrl, setPaginateUrl] = useState(invoiceData?.links[1].url);
  const [totalAmount, setTotalAmount] = useState(0);

  const FetchPaginateInfo = async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setInvoiceDataPaginateInfo(res);
    }
  };

  useEffect(() => {
    var total = 0;
    invoiceDataPaginateInfo?.data?.map((data: any) => {
      total += data.amount;
    });
    setTotalAmount(total);
  }, [totalAmount, invoiceDataPaginateInfo, paginateUrl, invoiceData]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const UpdateInfo = async (target: any) => {
    const data = $(`#${target}`).serializeArray();

    const formData = JSON.stringify({
      invoice_number: data[0].value,
      client: data[1].value,
      create_date: data[2].value,
      due_date: data[3].value,
      amount: data[4].value,
      status: data[5].value,
      orgid: data[6].value,
      id: data[7].value,
    });
    UpdateItem(
      "/update/hcm/invoice/info",
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
        <title>HCM | Invoice Report </title>
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
                  {/* <!-- start ledger table -->*/}
                  <div className="table-responsive mt-3">
                    <table
                      id="printable"
                      className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark"
                    >
                      <caption>Invoice Report Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={10}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Invoice Report</b>
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
                          <th scope="col"> Invoice Number</th>
                          <th scope="col"> Client</th>
                          <th scope="col">Create Date</th>
                          <th scope="col">Due Date</th>
                          <th scope="col">
                            Amount <span className="pill">{orgCurrencie}</span>
                          </th>
                          <th scope="col"> Status </th>
                          {(roleSuperAdmin === 1 ||
                            roleAdmin === 1 ||
                            roleCreator === 1) && <th scope="col"> Action </th>}
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceDataPaginateInfo?.data?.map(
                          (data: any, index: any) => (
                            <tr key={data.invoice_id}>
                              <td className="text-primary">
                                IVN-{data.invoice_number}
                              </td>
                              <td>{data.client_name}</td>
                              <td className="debit text-success text-end">
                                {data.created_date}
                              </td>
                              <td className="debit text-danger text-end">
                                {data.due_date}
                              </td>
                              <td className="credit text-success text-end">
                                {data.amount}
                                <span className="text-secondary ">/-</span>
                              </td>
                              <td className="credit text-success text-center">
                                <span
                                  className={`badge 
                                    ${
                                      data.status === "accepted" && "bg-success"
                                    }
                                    ${
                                      data.status === "approved" && "bg-success"
                                    }
                                    ${
                                      data.status === "in-process" &&
                                      "bg-danger"
                                    }
                                    ${
                                      data.status === "release-from-approve" &&
                                      "bg-primary"
                                    }
                                    ${
                                      data.status === "partial-approve" &&
                                      "bg-primary"
                                    }
                                    ${data.status === "discuss" && "bg-info"} 
                                `}
                                >
                                  {data.status}
                                </span>
                              </td>
                              {/* <td>
                                <ActionBtn
                                  modalid={data.invoice_id}
                                  deleteFunc={DeleteItem}
                                  deleteurl={`/delete/hcm/invoice/info/${data.invoice_id}`}
                                  paginateUrl={paginateUrl}
                                  FetchPaginateInfo={FetchPaginateInfo}
                                />
                              </td> */}
                              {/* start actio btn*/}
                              {(roleSuperAdmin === 1 ||
                                roleAdmin === 1 ||
                                roleCreator === 1) && (
                                <td className="text-center">
                                  <ActionBtn
                                    modalid={data.invoice_id}
                                    deleteFunc={DeleteItem}
                                    deleteurl={`/delete/hcm/invoice/info/${data.invoice_id}`}
                                    paginateUrl={paginateUrl}
                                    FetchPaginateInfo={FetchPaginateInfo}
                                    roleCreator={roleCreator}
                                  />
                                </td>
                              )}

                              {/* end actio btn*/}
                            </tr>
                          )
                        )}
                      </tbody>
                      <tfoot>
                        <tr className="text-center">
                          <td colSpan={4}>Total</td>
                          <td className="text-end">
                            <span className="text-secondary me-1">=</span>
                            {totalAmount}
                            <span className="pill">{orgCurrencie}</span>
                          </td>
                          <td colSpan={2}> </td>
                        </tr>
                      </tfoot>
                    </table>
                    {/* start paginate */}
                    <PagingLink
                      pageInfo={invoiceDataPaginateInfo}
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

      {/*<!-- start edit modal -->*/}
      {invoiceDataPaginateInfo?.data?.map((data: any) => (
        <div
          className="modal"
          id={`edit_modal_${data.invoice_id}`}
          key={`edit_modal_${data.invoice_id}`}
        >
          <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
            <div className="modal-content modal-content-bg">
              <div className="modal-header">
                <h1 className="text-caption">Edite Invoice</h1>
                <button
                  className="btn-close  bg-light"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form id={`edit_form_${data.invoice_id}`}>
                  <fieldset className="fieldset">
                    <legend>Invoice</legend>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-invoice-number_${data.invoice_id}`}
                            title=" "
                            defaultValue={data.invoice_number}
                            name="invoice_number"
                          />
                          <label
                            htmlFor={`edit-invoice-number_${data.invoice_id}`}
                            className="form-label"
                          >
                            Invoice Number
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-client_${data.invoice_id}`}
                            title=" "
                            defaultValue={data.client_name}
                            name="client"
                          />
                          <label
                            htmlFor={`edit-client_${data.invoice_id}`}
                            className="form-label"
                          >
                            Client
                          </label>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-5">
                        <div className="form-date">
                          <label
                            htmlFor={`edit-create-date_${data.invoice_id}`}
                            className="form-label"
                          >
                            Create Date
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.created_date}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`edit-create-date_${data.invoice_id}`}
                            defaultValue={data.created_date}
                            name="create_date"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-5">
                        <div className="form-date">
                          <label
                            htmlFor={`edit-due-date_${data.invoice_id}`}
                            className="form-label"
                          >
                            Due Date
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.due_date ? data.due_date : "Select date"}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`edit-due-date_${data.invoice_id}`}
                            defaultValue={data.due_date}
                            name="due_date"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`edit-amount_${data.invoice_id}`}
                            title=" "
                            defaultValue={data.amount}
                            name="amount"
                          />
                          <label
                            htmlFor={`edit-amount_${data.invoice_id}`}
                            className="form-label"
                          >
                            Amount
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  {/*<!-- end product order -->*/}
                  {/*<!-- start payment order -->*/}
                  <fieldset className="fieldset">
                    <legend>Update </legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                        <label
                          htmlFor={`edit-cur-status_${data.invoice_id}`}
                          className="text-light"
                        >
                          Current status
                        </label>
                        <select
                          id={`edit-cur-status_${data.invoice_id}`}
                          className="form-select"
                          name="status"
                        >
                          <option value="">Select Current Status</option>
                          <option
                            value="accepted"
                            selected={data.status === "accepted" ? true : false}
                          >
                            Accepted
                          </option>
                          <option
                            value="approved"
                            selected={data.status === "approved" ? true : false}
                          >
                            Approved
                          </option>
                          <option
                            value="in-process"
                            selected={
                              data.status === "in-process" ? true : false
                            }
                          >
                            In-Process
                          </option>
                          <option
                            value="release-from-approve"
                            selected={
                              data.status === "release-from-approve"
                                ? true
                                : false
                            }
                          >
                            Release From Approve
                          </option>
                          <option
                            value="partial-approve"
                            selected={
                              data.status === "partial-approve" ? true : false
                            }
                          >
                            Partial Approve
                          </option>
                          <option
                            value="discuss"
                            selected={data.status === "discuss" ? true : false}
                          >
                            Discuss
                          </option>
                        </select>
                        <hr className="bg-secondary" />
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                        <input
                          type="hidden"
                          name="orgid"
                          defaultValue={OrgId()}
                        />
                        <input
                          type="hidden"
                          name="id"
                          defaultValue={data.invoice_id}
                        />
                        {loader ? (
                          <Loader title="Update" />
                        ) : (
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() =>
                              UpdateInfo(`edit_form_${data.invoice_id}`)
                            }
                          >
                            <i className="fas fa fa-save me-2"></i>
                            Update
                          </button>
                        )}
                      </div>
                    </div>
                  </fieldset>
                  {/*<!-- end payment  order -->*/}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger modal-close-btn"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/*<!-- end edit modal -->*/}
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

  const invoiceData = await FetchData(`/get/hcm/invoice/report/${id}`);
  const orgCurrencie = await GetOrgCurrencies(id);
  const orgname = await OrgName(id);

  return {
    props: {
      invoiceData,
      orgCurrencie,
      orgname,
    },
  };
}
