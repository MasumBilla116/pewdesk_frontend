import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useCallback, useMemo, memo } from "react";
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
import { useForm } from "react-hook-form";
import Loader from "@/components/Loader";
import OrgId from "../api/Helper/OrgId";
import $ from "jquery";
import GetCRMCurrentMonthDateCount from "../api/CRM/Account/GetCRMCurrentMonthDateCount";
import GetFullYear from "../api/Helper/GetFullYear";
import GetMonthName from "../api/Helper/GetMonthName";
import GetCRMAccountInfo from "../api/CRM/Account/GetCRMAccountInfo";
import GetOrgCurrencies from "../api/PreloadOrgInfo/GetOrgCurrencies";
import GetCRMCurAcYearMonth from "../api/CRM/Account/GetCRMCurAcYearMonth";
import PaginateData from "../api/Helper/PaginateData";
import PagingLink from "@/components/PagingLink";
import DeleteItem from "../api/Helper/DeleteItem";
import UpdateItem from "../api/Helper/UpdateItem";
import StoreItem from "../api/Helper/StoreItem";
import Table2ExcelMinJs from "./../load_js/plugin/table2excel.min.js";
import Table2Excel from "./../load_js/controllers/table2excel";
import OrgName from "../api/Helper/OrgName";
import AddModalTableBtn from "@/components/AddModalTableBtn";
import { decrypt } from "n-krypta";
import AccessKey from "../../pages/api/AccessKey";
import Cookies from "js-cookie";
import ActionBtn from "@/components/ActionBtn";

function Accounting(props: any) {
  const {
    countCurMonthDate,
    accountInfo,
    orgCurrencie,
    curYearMonth,
    orgname,
  } = props;
  console.log(curYearMonth);
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
  const [paginateAcInfo, setPaginateAcInfo] = useState(accountInfo);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDue, setTotalDue] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [paginateUrl, setPaginateUrl] = useState(paginateAcInfo.links[1].url);

  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle.min")
      : null;
  }, []);
  var count = 0;
  const dateRow = useCallback((date: any) => {
    count -= 1;
    return (
      <>
        {countCurMonthDate.map((row: any, index: any) => {
          if (row.current_day === date && count <= 0) {
            count = row.count;
            return (
              <>
                <td
                  key={index + 8710926}
                  rowSpan={row.count}
                  className="date text-center"
                >
                  {" "}
                  {date * 1}{" "}
                </td>
              </>
            );
          }
        })}
      </>
    );
  }, []);

  useEffect(() => {
    var amount = 0;
    var due = 0;
    var balance = 0;
    paginateAcInfo.data?.map((data: any) => {
      if (data.amount > 0) amount += data.amount;
      if (data.due >= 0) due += data.due;
      if (data.balance >= 0) balance += data.balance;
    });
    setTotalAmount(amount);
    setTotalDue(due);
    setTotalBalance(balance);
  }, [
    totalAmount,
    totalDue,
    totalBalance,
    paginateAcInfo,
    accountInfo,
    curYearMonth,
    countCurMonthDate,
  ]);
  const FetchPaginateData = useCallback(async (url: any) => {
    const res = await PaginateData(url);
    if (url !== null) {
      setPaginateUrl(url);
      setPaginateAcInfo(res);
    }
  }, []);

  const {
    register: accountingRegister,
    handleSubmit: AccuntingHandleSubmit,
    formState: { errors: accountingErrors },
  } = useForm();

  const UpdateInfo = async (target: any) => {
    const data = $(`#${target}`).serializeArray();
    const formData = JSON.stringify({
      date: data[0].value,
      ac_id: data[1].value,
      invoice: data[2].value,
      amount: data[3].value,
      due: data[4].value,
      balance: data[5].value,
      type: data[6].value,
      description: data[7].value,
      orgid: data[8].value,
      id: data[9].value,
      status: data[10].value,
    });
    UpdateItem(
      `/update/crm/account/info`,
      formData,
      setLoader,
      FetchPaginateData,
      paginateUrl
    );
  };

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CRM | Accounting</title>
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
                  {/*<!-- BEGIN: Report -->*/}
                  <TablePrint />
                  <TableFilter />
                  {/*<!-- END: Report -->*/}
                  {/*<!-- start ledger table -->*/}
                  <div className="table-responsive mt-3">
                    {/*<!-- start table btn group -->*/}
                    {(roleSuperAdmin === 1 ||
                      roleAdmin === 1 ||
                      roleCreator === 1) && <AddModalTableBtn />}
                    {/*<!-- end table btn group -->*/}
                    <table
                      id="printable"
                      className="font-13  erp-table-dark tbl-bg table table-bordered text-light table-dark"
                    >
                      <caption>Accounting Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={11}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Accounting</b>
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
                          <th scope="col" colSpan={2}>
                            Date
                          </th>
                          <th scope="col"> Account</th>
                          <th scope="col">Invoice</th>
                          <th scope="col">Amount ( {orgCurrencie} )</th>
                          <th scope="col"> Due ( {orgCurrencie} )</th>
                          <th scope="col"> Balance </th>
                          <th scope="col"> Type </th>
                          <th scope="col"> Description </th>
                          <th scope="col"> Status </th>
                          {(roleSuperAdmin === 1 ||
                            roleAdmin === 1 ||
                            roleCreator === 1) && <th scope="col"> Action </th>}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            className="date text-center"
                            scope="row"
                            colSpan={2}
                          >
                            {curYearMonth[0].current_year}
                          </td>
                          <td scope="row" colSpan={9}></td>
                        </tr>
                        <tr>
                          <td rowSpan={31}>{curYearMonth[0].current_month}</td>
                        </tr>

                        {/*<!--start  First date info -->*/}
                        {paginateAcInfo.data?.map((data: any) => (
                          <tr key={`table-row-${data?.account_id}`}>
                            {dateRow(data.current_day)}

                            <td>{data.ac_id}</td>
                            <td>{data.invoice}</td>
                            <td className="credit text-success text-end">
                              {data.amount}{" "}
                              <span className="text-secondary ">/-</span>
                            </td>

                            {data.due && data.due ? (
                              <td className="debit text-warning text-end">
                                {data.due}{" "}
                                <span className="text-secondary ">/-</span>
                              </td>
                            ) : (
                              <td className="debit text-light text-center">
                                --
                              </td>
                            )}

                            <td className="credit text-success text-end">
                              {data.balance}
                              <span className="text-secondary ">/-</span>
                            </td>
                            <td className="credit text-success text-center">
                              {data.type}
                            </td>
                            <td className="credit text-success text-end">
                              {data.description}
                            </td>
                            {/* paid */}
                            <td>
                              <span
                                className={`badge  rounded
                            ${data.status === "Paid" && "bg-success"}
                            ${data.status === "Unpaid" && "bg-danger"}
                            ${data.status === "Draft" && "bg-warning"}
                            `}
                              >
                                {data.status}
                              </span>
                            </td>

                            {/* start actio btn*/}

                            {(roleSuperAdmin === 1 ||
                              roleAdmin === 1 ||
                              roleCreator === 1) && (
                              <td className="text-center">
                                <ActionBtn
                                  modalid={data.account_id}
                                  deleteFunc={DeleteItem}
                                  deleteurl={`/delete/crm/account/info/${data.account_id}`}
                                  paginateUrl={paginateUrl}
                                  FetchPaginateInfo={FetchPaginateData}
                                  roleCreator={roleCreator}
                                />
                              </td>
                            )}

                            {/* end actio btn*/}
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="text-center">
                          <td colSpan={4}>Total</td>
                          <td className="text-end">
                            <span className="text-secondary me-1">=</span>
                            {totalAmount}
                            <span className="text-secondary ">/-</span>
                            <span className="pill">{orgCurrencie}</span>
                          </td>
                          <td className="text-end">
                            <span className="text-secondary me-1">=</span>{" "}
                            {totalDue}
                            <span className="text-secondary ">/-</span>
                            <span className="pill">{orgCurrencie}</span>
                          </td>
                          <td className="text-end">
                            <span className="text-secondary me-1">=</span>
                            {totalBalance}
                            <span className="text-secondary ">/-</span>
                            <span className="pill">{orgCurrencie}</span>
                          </td>
                          <td colSpan={4}> </td>
                        </tr>
                      </tfoot>
                    </table>
                    {/* start pagination */}
                    <PagingLink
                      pageInfo={paginateAcInfo}
                      fetchdata={FetchPaginateData}
                    />
                    {/* end pagination */}
                  </div>
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
      {/*<!-- start add modal -->*/}
      <div className="modal " id="add-modal">
        <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
          <div className="modal-content modal-content-bg">
            <div className="modal-header">
              <h1 className="text-caption">Add Accounting Information</h1>
              <button
                className="btn-close bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={AccuntingHandleSubmit((data) =>
                  StoreItem(
                    "/store/crm/account/info",
                    data,
                    setLoader,
                    FetchPaginateData,
                    paginateUrl
                  )
                )}
              >
                <fieldset className="fieldset">
                  <legend>Document</legend>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                      <div className="form-date">
                        <label htmlFor="add-date" className="form-label">
                          Date
                        </label>
                        <h6 className="overlap-date-title load-date text-light">
                          <Image
                            width={30}
                            height={20}
                            src="/theme_icon/calendar.png"
                            alt="Images"
                            className="pe-2"
                          />
                          Select Date
                        </h6>
                        <input
                          type="date"
                          placeholder=" "
                          className="form-date-input"
                          id="add-date"
                          {...accountingRegister("date", { required: true })}
                        />
                      </div>
                      <div className="text-warning">
                        {accountingErrors.date?.type === "required" &&
                          "Date is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-ac-no"
                          title=" "
                          {...accountingRegister("ac_no", { required: true })}
                        />
                        <label htmlFor="add-ac-no" className="form-label">
                          Account No
                        </label>
                      </div>
                      <div className="text-warning">
                        {accountingErrors.ac_no?.type === "required" &&
                          "Account No. is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-invoice"
                          title=" "
                          {...accountingRegister("invoice", { required: true })}
                        />
                        <label htmlFor="add-invoice" className="form-label">
                          Invoice
                        </label>
                      </div>
                      <div className="text-warning">
                        {accountingErrors.invoice?.type === "required" &&
                          "Invoice is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-amount"
                          title=" "
                          {...accountingRegister("amount", { required: true })}
                        />
                        <label htmlFor="add-amount" className="form-label">
                          Amount (Tk)
                        </label>
                      </div>
                      <div className="text-warning">
                        {accountingErrors.amount?.type === "required" &&
                          "Amount is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-due"
                          title=" "
                          {...accountingRegister("due", {
                            valueAsNumber: true,
                          })}
                        />
                        <label htmlFor="add-due" className="form-label">
                          Due ( {orgCurrencie[0].currencie_name} )
                        </label>
                      </div>
                      <div className="text-warning">
                        {accountingErrors.due?.type === "valueAsNumber" &&
                          "Only digit allow"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-balance"
                          title=" "
                          {...accountingRegister("balance", { required: true })}
                        />
                        <label htmlFor="add-balance" className="form-label">
                          Balance
                        </label>
                      </div>
                      <div className="text-warning">
                        {accountingErrors.balance?.type === "required" &&
                          "Balance is required"}
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-type"
                          title=" "
                          {...accountingRegister("type")}
                        />
                        <label htmlFor="add-type" className="form-label">
                          Type
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                      <label htmlFor="add-description" className="text-light">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="add-description"
                        cols={30}
                        rows={10}
                        style={{ height: 100 + "px" }}
                        {...accountingRegister("description", {
                          required: true,
                        })}
                      ></textarea>
                    </div>
                    <div className="text-warning">
                      {accountingErrors.description?.type === "required" &&
                        "Description is required"}
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end product order -->*/}

                {/*<!-- start payment order -->*/}
                <fieldset className="fieldset">
                  <legend>Save </legend>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <input
                        type="hidden"
                        value={OrgId()}
                        {...accountingRegister("orgid")}
                      />
                      <label htmlFor="add-cur-status" className="text-light">
                        Status
                      </label>
                      <select
                        id="add-cur-status"
                        className="form-select"
                        {...accountingRegister("status", { required: true })}
                      >
                        <option value="">Select Current Status</option>
                        <option value="Draft">Draft</option>
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                      </select>
                      <hr className="bg-secondary" />
                      <div className="text-warning">
                        {accountingErrors.status?.type === "required" &&
                          "Status is required"}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                      {loader ? (
                        <Loader title="Save" />
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-danger w-50 shadow-dark"
                        >
                          <i className="fas fa fa-save me-2"></i>
                          Save
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
      {/*<!-- end add modal -->*/}
      {/*<!-- start edit modal -->*/}
      {paginateAcInfo.data?.map((row: any) => (
        <div
          className="modal"
          key={`edit-modal_xwq30197lo${row.account_id * 999}lqu598746wms`}
          id={`edit-modal_${row.account_id}`}
        >
          <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
            <div className="modal-content modal-content-bg">
              <div className="modal-header">
                <h1 className="text-caption">Edite</h1>
                <button
                  className="btn-close  bg-light"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form id={`edit_form_${row.account_id}`}>
                  <fieldset className="fieldset">
                    <legend>Document</legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                        <div className="form-date">
                          <label htmlFor="edit-date" className="form-label">
                            Date
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt="Images"
                              className="pe-2"
                            />
                            {row.current_year} - {row.current_month} -
                            {row.current_day}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id="edit-date"
                            name="date"
                            onChange={() => {}}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-ac-no_${row.account_id}`}
                            title=" "
                            defaultValue={row.ac_id}
                            name="ac_id"
                            onChange={() => {}}
                          />
                          <label
                            htmlFor={`edit-ac-no_${row.account_id}`}
                            className="form-label"
                          >
                            Account No
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-invoice_${row.account_id}`}
                            title=" "
                            defaultValue={row.invoice}
                            name="invoice"
                            onChange={() => {}}
                          />
                          <label
                            htmlFor={`edit-invoice_${row.account_id}`}
                            className="form-label"
                          >
                            Invoice
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`edit-amount_${row.account_id}`}
                            title=" "
                            name="amount"
                            value={row.amount}
                            onChange={() => {}}
                          />
                          <label
                            htmlFor={`edit-amount_${row.account_id}`}
                            className="form-label"
                          >
                            Amount ( {orgCurrencie[0].currencie_name} )
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`edit-due_${row.account_id}`}
                            title=" "
                            defaultValue={row.due}
                            name="due"
                            onChange={() => {}}
                          />
                          <label
                            htmlFor={`edit-due_${row.account_id}`}
                            className="form-label"
                          >
                            Due ( {orgCurrencie[0].currencie_name} )
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`edit-balance_${row.account_id}`}
                            title=" "
                            defaultValue={row.balance}
                            name="balance"
                            onChange={() => {}}
                          />
                          <label htmlFor="edit-balance" className="form-label">
                            Balance
                          </label>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-type_${row.account_id}`}
                            title=" "
                            value={row.type}
                            name="type"
                            onChange={() => {}}
                          />
                          <label
                            htmlFor={`edit-type_${row.account_id}`}
                            className="form-label"
                          >
                            Type
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                        <label
                          htmlFor="edit-description"
                          className="text-light"
                        >
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          id={`edit-description_${row.account_id}`}
                          cols={30}
                          rows={10}
                          style={{ height: 100 + "px" }}
                          name="description"
                          value={row.description}
                          onChange={() => {}}
                        ></textarea>
                      </div>
                    </div>
                  </fieldset>
                  {/*<!-- end product order -->*/}

                  {/*<!-- start payment order -->*/}
                  <fieldset className="fieldset">
                    <legend>Update </legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                        <input
                          type="hidden"
                          defaultValue={OrgId()}
                          name="orgid"
                        />
                        <input
                          type="hidden"
                          defaultValue={row.account_id}
                          name="id"
                        />
                        <label htmlFor="add-cur-status" className="text-light">
                          Status
                        </label>
                        <select
                          id={`add-cur-status_${row.account_id}`}
                          className="form-select"
                          name="status"
                          onChange={() => {}}
                        >
                          <option value="">Select Status</option>
                          <option
                            value="Draft"
                            selected={row.status === "Draft" && true}
                          >
                            Draft
                          </option>
                          <option
                            value="Paid"
                            selected={row.status === "Paid" && true}
                          >
                            Paid
                          </option>
                          <option
                            value="Unpaid"
                            selected={row.status === "Unpaid" && true}
                          >
                            Unpaid
                          </option>
                        </select>
                        <hr className="bg-secondary" />
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                        {loader ? (
                          <Loader title="Update" />
                        ) : (
                          <button
                            type="button"
                            className="btn btn-danger w-50 shadow-dark"
                            onClick={() =>
                              UpdateInfo(`edit_form_${row.account_id}`)
                            }
                          >
                            <i className="fas fa fa-save me-2"></i>
                            Save
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
      {/* start load script */}
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

export default memo(Accounting);

export async function getServerSideProps(context: any) {
  const id = context.query.v;
  const countCurMonthDate = await GetCRMCurrentMonthDateCount(
    GetFullYear(),
    GetMonthName(),
    id
  );

  const accountInfo = await GetCRMAccountInfo(
    GetFullYear(),
    GetMonthName(),
    id
  );
  const curYearMonth = await GetCRMCurAcYearMonth(
    GetFullYear(),
    GetMonthName(),
    id
  );

  const orgCurrencie = await GetOrgCurrencies(id);

  const orgname = await OrgName(id);

  return {
    props: {
      countCurMonthDate,
      accountInfo,
      orgCurrencie,
      curYearMonth,
      orgname,
    },
  };
}
