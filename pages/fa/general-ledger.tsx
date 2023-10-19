import Head from "next/head";
import Image from "next/image";
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
import Table2ExcelMinJs from "./../load_js/plugin/table2excel.min.js";
import Table2Excel from "./../load_js/controllers/table2excel";
import GetAccountType from "../api/GetAccountType";
import $ from "jquery";
import GetAcYearMonth from "../api/FA/GetAcYearMonth";
import GetAccountCraditDebitInfo from "../api/FA/GetAccountCraditDebitInfo";
import AcCurrentMonthDateCounts from "../api/FA/AcCurrentMonthDateCounts";
import { useForm } from "react-hook-form";
import Loader from "@/components/Loader";
import OrgId from "../api/Helper/OrgId";
import GetFullYear from "../api/Helper/GetFullYear";
import GetMonthName from "../api/Helper/GetMonthName";
import GetOrgCurrencies from "../api/PreloadOrgInfo/GetOrgCurrencies";
import PaginateData from "../api/Helper/PaginateData";
import PagingLink from "@/components/PagingLink";
import DeleteItem from "../api/Helper/DeleteItem";
import StoreItem from "../api/Helper/StoreItem";
import UpdateItem from "../api/Helper/UpdateItem";
import OrgName from "../api/Helper/OrgName";
import AddModalTableBtn from "@/components/AddModalTableBtn";
import { decrypt } from "n-krypta";
import AccessKey from "../../pages/api/AccessKey";
import Cookies from "js-cookie";
import ActionBtn from "@/components/ActionBtn";

function GeneralLedger(props: any) {
  const {
    acYearMonth,
    craditDebitInfo,
    curMonthDateCount,
    accountType,
    orgCurrencie,
    orgname,
  } = props;

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

  const [DebitTotalAmount, setDebitTotalAmount] = useState(0);
  const [CraditTotalAmount, setCraditTotalAmount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [acountInfo, setAcInfo] = useState(craditDebitInfo);
  const [paginateUrl, setPaginateUrl] = useState(craditDebitInfo.links[1].url);
  const {
    register: addInfoRegister,
    handleSubmit: AddInfoHandleSubmit,
    formState: { errors: addInfoErrors },
  } = useForm();

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
  }, [
    acountInfo,
    DebitTotalAmount,
    CraditTotalAmount,
    curMonthDateCount,
    acYearMonth,
    paginateUrl,
  ]);

  var count = 0;
  const dateRow = useCallback((date: any) => {
    count -= 1;
    return (
      <>
        {curMonthDateCount.map((row: any, index: any) => {
          if (row.curren_date === date && count <= 0) {
            count = row.count;
            return (
              <>
                <td
                  key={index + 8710926}
                  rowSpan={row.count}
                  className="date text-center"
                >
                  {date}
                </td>
              </>
            );
          }
        })}
      </>
    );
  }, []);

  const FetchPagingAcInfo = useCallback(async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setAcInfo(res);
    }
  }, []);

  const UpdateInfo = useCallback(async (target: any) => {
    const data = $(`#${target}`).serializeArray();

    const formData = JSON.stringify({
      date: data[0].value,
      description: data[1].value,
      reference: data[2].value,
      amount: data[3].value,
      account_type: data[4].value,
      orgid: data[5].value,
      id: data[6].value,
    });
    UpdateItem(
      "/update/fa/account/info",
      formData,
      setLoader,
      FetchPagingAcInfo,
      paginateUrl
    );
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FA | General Ledger</title>
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
                  <div className="">
                    {/*<!-- end table btn group -->*/}
                    <div className="table-responsive mt-3">
                      {/*<!-- start table btn group -->*/}
                      {(roleSuperAdmin === 1 ||
                        roleAdmin === 1 ||
                        roleCreator === 1) && <AddModalTableBtn />}
                      {/*<!-- end table btn group -->*/}
                      <table
                        id="printable"
                        className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark"
                      >
                        <caption>General Ledger</caption>
                        <thead className="text-center">
                          <tr className="erp-tbl-top-head">
                            <th scope="col" colSpan={11}>
                              <div className="erp-trial-header">
                                <h2 className="erp-h2">
                                  <b>{orgname}</b>
                                </h2>
                                <h3 className="erp-h3">
                                  <b>General Ledger</b>
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
                            <th scope="col" colSpan={2} rowSpan={2}>
                              {" "}
                              Date
                            </th>
                            <th scope="col" rowSpan={2}>
                              {" "}
                              Account Title & Explanations
                            </th>
                            <th scope="col" rowSpan={2}>
                              {" "}
                              Ref
                            </th>
                            <th scope="col" colSpan={2}>
                              {" "}
                              Amount ( {orgCurrencie} )
                            </th>
                            {(roleSuperAdmin === 1 ||
                              roleAdmin === 1 ||
                              roleCreator === 1) && (
                              <th scope="col" rowSpan={2}>
                                {" "}
                                Action{" "}
                              </th>
                            )}
                          </tr>
                          <tr>
                            <th>Debit</th>
                            <th>Credit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/*<!-- start year and month -->*/}
                          {acYearMonth.map((row1: any, index1: any) => (
                            <>
                              <tr key={index1} className="text-center">
                                <td colSpan={2} scope="row">
                                  {row1.current_year}
                                </td>
                                <td rowSpan={2}> </td>
                                <td rowSpan={2}> </td>
                                <td rowSpan={2}> </td>
                                <td rowSpan={2}> </td>
                                {/*<!-- start table btn group -->*/}
                                {(roleSuperAdmin === 1 ||
                                  roleAdmin === 1 ||
                                  roleCreator === 1) && <td rowSpan={2}> </td>}
                                {/*<!-- end table btn group -->*/}
                              </tr>
                              <tr>
                                <td rowSpan={30}>{row1.current_month}</td>
                              </tr>
                            </>
                          ))}

                          {/* end year and month */}
                          {/* start account information */}
                          {acountInfo.data?.map((row2: any, index2: any) => (
                            <tr key={index2 + 9731097}>
                              {dateRow(row2.curren_date)}

                              <td>{row2.description} </td>
                              <td>
                                <span className="badge bg-primary rounded">
                                  {row2.reference}
                                </span>
                              </td>
                              {row2.account_type_id === 1 && (
                                <>
                                  <td className="debit text-success text-center">
                                    {row2.amount}
                                    <span className="text-secondary ">/-</span>
                                  </td>
                                  <td></td>
                                </>
                              )}

                              {row2.account_type_id === 2 && (
                                <>
                                  <td></td>
                                  <td className="debit text-success text-center">
                                    {row2.amount}
                                    <span className="text-secondary ">/-</span>
                                  </td>
                                </>
                              )}

                              {(roleSuperAdmin === 1 ||
                                roleAdmin === 1 ||
                                roleCreator === 1) && (
                                <td className="text-center">
                                  <ActionBtn
                                    modalid={row2.account_id}
                                    deleteFunc={DeleteItem}
                                    deleteurl={`/delete/fa/account/info/${row2.account_id}`}
                                    paginateUrl={paginateUrl}
                                    FetchPaginateInfo={FetchPagingAcInfo}
                                    roleCreator={roleCreator}
                                  />
                                </td>
                              )}
                            </tr>
                          ))}
                          {/* end account information */}

                          {/*<!-- end month -->*/}
                        </tbody>
                        <tfoot>
                          <tr className="text-center">
                            <td colSpan={4}>Total</td>
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
                            {/*<!-- start table btn group -->*/}
                            {(roleSuperAdmin === 1 ||
                              roleAdmin === 1 ||
                              roleCreator === 1) && <td></td>}
                            {/*<!-- end table btn group -->*/}
                          </tr>
                        </tfoot>
                      </table>
                      {/* start paging */}
                      <PagingLink
                        pageInfo={acountInfo}
                        fetchdata={FetchPagingAcInfo}
                      />
                      {/* end paging */}
                    </div>
                  </div>
                  {/* end ledger  */}
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
      <div className="modal" id="add-modal">
        <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
          <div className="modal-content modal-content-bg">
            <div className="modal-header">
              <h1 className="text-caption">Add General Ledger</h1>
              <button
                className="btn-close bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={AddInfoHandleSubmit((data) =>
                  StoreItem(
                    "/store/fa/account",
                    data,
                    setLoader,
                    FetchPagingAcInfo,
                    paginateUrl
                  )
                )}
              >
                <fieldset className="fieldset">
                  <legend>Ledger</legend>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <div className="form-date">
                        <label htmlFor="add-date" className="form-label">
                          Date
                        </label>
                        <h6 className="overlap-date-title load-date text-light">
                          <Image
                            width={30}
                            height={20}
                            src="/theme_icon/calendar.png"
                            alt=""
                            className="pe-2"
                          />
                          Select Date
                        </h6>
                        <input
                          type="date"
                          placeholder=" "
                          className="form-date-input"
                          id="add-date"
                          {...addInfoRegister("date", { required: true })}
                        />
                      </div>
                      <div className="text-warning">
                        {addInfoErrors.date?.type === "required" &&
                          "Date is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <label
                        htmlFor="account-type"
                        className="form-label text-white mb-0"
                      >
                        Account Type
                      </label>
                      <select
                        className="form-select"
                        id="account-type"
                        {...addInfoRegister("accounttype", { required: true })}
                      >
                        <option value="">Select Account type</option>
                        {accountType.map((row: any, index: any) => (
                          <option
                            key={index + 999878}
                            value={row.account_type_id}
                          >
                            {" "}
                            {row.account_type}
                          </option>
                        ))}
                      </select>
                      <div className="text-warning">
                        {addInfoErrors.accounttype?.type === "required" &&
                          "Account type is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="amount"
                          title=" "
                          {...addInfoRegister("amount", {
                            required: true,
                          })}
                        />
                        <label htmlFor="amount" className="form-label">
                          Amount ( {orgCurrencie} )
                        </label>
                      </div>
                      <div className="text-warning">
                        {addInfoErrors.amount?.type === "required" &&
                          "Amount is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 ">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-reference"
                          title=" "
                          {...addInfoRegister("ref")}
                        />
                        <label htmlFor="add-reference" className="form-label">
                          Reference
                        </label>
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                      <label
                        htmlFor="add-debit-description"
                        className="text-light"
                      >
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="add-debit-description"
                        cols={30}
                        rows={20}
                        style={{ height: 100 + "px" }}
                        {...addInfoRegister("description", { required: true })}
                      ></textarea>
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end product order -->*/}

                {/*<!-- start payment order -->*/}
                <fieldset className="fieldset">
                  <legend>Save </legend>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                      <input
                        type="hidden"
                        value={OrgId()}
                        {...addInfoRegister("orgid")}
                      />

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
      {acountInfo.data?.map((data: any) => (
        <div
          key={data.account_id}
          className="modal"
          id={`edit_modal_${data.account_id}`}
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
                <form id={`edit_form_${data.account_id}`}>
                  <fieldset className="fieldset">
                    <legend>Ledger</legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                        <div className="form-date">
                          <label htmlFor="eidt-date" className="form-label">
                            Date
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.current_year}-{data.current_month}-
                            {data.curren_date}
                          </h6>
                          <input
                            type="date"
                            value=""
                            placeholder=" "
                            className="form-date-input"
                            id={`eidt_date_${data.account_id}`}
                            name="date"
                            onChange={() => {}}
                          />
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`eidt-ac-title_${data.account_id}`}
                            title=" "
                            defaultValue={data.description}
                            name="title"
                            onChange={() => {}}
                          />
                          <label
                            htmlFor={`eidt-ac-title_${data.account_id}`}
                            className="form-label"
                          >
                            Account Title & Explanations
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`eidt-reference_${data.account_id}`}
                            title=" "
                            defaultValue={data.reference}
                            name="reference"
                            onChange={() => {}}
                          />
                          <label
                            htmlFor={`eidt-reference_${data.account_id}`}
                            className="form-label"
                          >
                            Reference
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`eidt-amount_${data.account_id}`}
                            title=" "
                            defaultValue={data.amount}
                            name="amount"
                            onChange={() => {}}
                          />
                          <label
                            htmlFor={`eidt-amount_${data.account_id}`}
                            className="form-label"
                          >
                            Amount
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                        <label
                          htmlFor="account-type"
                          className="form-label text-white mb-0"
                        >
                          Account Type
                        </label>
                        <select
                          className="form-select"
                          id={`account-type_${data.account_id}`}
                          name="ac_type"
                        >
                          <option value="">Select Account type</option>
                          <option
                            value="1"
                            selected={data.account_type_id === 1 && true}
                          >
                            Debit
                          </option>
                          <option
                            value="2"
                            selected={data.account_type_id === 2 && true}
                          >
                            Cradit
                          </option>
                        </select>
                      </div>
                    </div>
                  </fieldset>
                  {/* <!-- end product order -->*/}

                  {/*<!-- start payment order -->*/}
                  <fieldset className="fieldset">
                    <legend>Update </legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                        <input type="hidden" name="orgid" value={OrgId()} />
                        <input
                          type="hidden"
                          name="id"
                          value={data.account_id}
                        />
                        {loader ? (
                          <Loader title="Update" />
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-danger w-50 shadow-dark"
                            onClick={() => {
                              UpdateInfo(`edit_form_${data.account_id}`);
                            }}
                          >
                            <i className="fas fa fa-save me-2"></i>
                            Update
                          </button>
                        )}
                      </div>
                    </div>
                  </fieldset>
                  {/* <!-- end payment  order -->*/}
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

export default memo(GeneralLedger);

export async function getServerSideProps(context: any) {
  const id = context.query.v;
  const accountType = await GetAccountType();
  const acYearMonth = await GetAcYearMonth(GetFullYear(), GetMonthName(), id);
  const craditDebitInfo = await GetAccountCraditDebitInfo(
    GetFullYear(),
    GetMonthName(),
    id
  );

  const curMonthDateCount = await AcCurrentMonthDateCounts(
    GetFullYear(),
    GetMonthName(),
    id
  );
  const orgCurrencie = await GetOrgCurrencies(id);
  const orgname = await OrgName(id);
  return {
    props: {
      accountType,
      acYearMonth,
      craditDebitInfo,
      curMonthDateCount,
      orgCurrencie,
      orgname,
    },
  };
}
