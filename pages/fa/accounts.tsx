import Head from "next/head";
import Image from "next/image";
import { useEffect, useCallback, memo, useMemo } from "react";
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
import { useForm } from "react-hook-form";
import { useState } from "react";
import GetAccountType from "../api/GetAccountType";
import Loader from "@/components/Loader";
import GetAcYearMonth from "../api/FA/GetAcYearMonth";
import GetAccountCraditDebitInfo from "../api/FA/GetAccountCraditDebitInfo";
import AcCurrentMonthDateCounts from "../api/FA/AcCurrentMonthDateCounts";
import OrgId from "../api/Helper/OrgId";
import GetFullYear from "../api/Helper/GetFullYear";
import GetMonthName from "../api/Helper/GetMonthName";
import GetOrgCurrencies from "../api/PreloadOrgInfo/GetOrgCurrencies";
import PaginateData from "../api/Helper/PaginateData";
import PagingLink from "@/components/PagingLink";
import StoreItem from "../api/Helper/StoreItem";
import OrgName from "../api/Helper/OrgName";
import { decrypt } from "n-krypta";
import AccessKey from "../../pages/api/AccessKey";
import Cookies from "js-cookie";
import AddModalTableBtn from "@/components/AddModalTableBtn";

function Accounts(props: any) {
  const { acYearMonth, craditDebitInfo, orgCurrencie, orgname } = props;
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
  }, []);
  /**
   * -------------------------------------------
   * ---- Start Module Access Permissions ------
   * -------------------------------------------
   */
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const [accountType, setAccountType] = useState(props.accountType);
  const [loader, setLoader] = useState(false);
  const [DebitTotalAmount, setDebitTotalAmount] = useState(0);
  const [CraditTotalAmount, setCraditTotalAmount] = useState(0);
  const [paginateAcInfo, setPaginateAcInfo] = useState(craditDebitInfo);
  const [pagingUrl, setPagingUrl] = useState(paginateAcInfo.links[1].url);

  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle.min")
      : null;
  }, []);

  useEffect(() => {
    var debitAmount = 0;
    var craditAmount = 0;
    paginateAcInfo.data?.map((row: any) => {
      if (row.account_type_id === 1) debitAmount += row.amount;
      if (row.account_type_id === 2) craditAmount += row.amount;
    });
    setDebitTotalAmount(debitAmount);
    setCraditTotalAmount(craditAmount);
  }, [
    paginateAcInfo,
    DebitTotalAmount,
    CraditTotalAmount,
    pagingUrl,
    accountType,
  ]);

  const FetchPaginateData = useCallback(async (url: any) => {
    const res = await PaginateData(url);
    if (url !== null) {
      setPagingUrl(url);
      setPaginateAcInfo(res);
    }
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FA | Accounts</title>
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
                  <div className="table-responsive w-100 mt-3">
                    {/*<!-- start table btn group -->*/}
                    {/*<!-- start table btn group -->*/}
                    {(roleSuperAdmin === 1 ||
                      roleAdmin === 1 ||
                      roleCreator === 1) && <AddModalTableBtn />}
                    {/*<!-- end table btn group -->*/}
                    {/*<!-- end table btn group -->*/}

                    <table
                      id="printable"
                      className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark"
                    >
                      <caption>Account Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={5}>
                            Debit
                          </th>
                          <th scope="col" rowSpan={3} className="tbl-ac-blank">
                            {" "}
                          </th>
                          <th scope="col" colSpan={4}>
                            Credit
                          </th>
                        </tr>
                        <tr>
                          <th scope="col" colSpan={2} rowSpan={2}>
                            {"Date"}
                          </th>
                          <th scope="col" rowSpan={2}>
                            {"Description"}
                          </th>
                          <th scope="col" rowSpan={2}>
                            {"Ref"}
                          </th>
                          <th scope="col">Amount ( {orgCurrencie} )</th>
                          {/*<!-- blank collumn -->*/}
                          {/*<!-- <th scope="col">    </th> -->*/}
                          {/* <!-- credit collumn -->*/}
                          <th scope="col" rowSpan={2}>
                            {"Date"}
                          </th>
                          <th scope="col" rowSpan={2}>
                            {"Description"}
                          </th>
                          <th scope="col" rowSpan={2}>
                            {"Ref"}
                          </th>
                          <th scope="col"> Amount ( {orgCurrencie} )</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* start year  & month*/}
                        {acYearMonth.map((row1: any, index1: any) => (
                          <>
                            <tr key={index1 + 500} className="text-center">
                              <td colSpan={2} scope="row">
                                {row1.current_year}
                              </td>
                              <td rowSpan={2}> </td>
                              <td rowSpan={2}> </td>
                              <td rowSpan={2}> </td>
                              {/*<!-- blank collumn -->*/}
                              <td rowSpan={35} className="tbl-ac-blank">
                                {" "}
                              </td>
                              {/* <!-- credit collumn -->*/}
                              <td scope="row"> </td>
                              <td rowSpan={2}> </td>
                              <td rowSpan={2}> </td>
                              <td rowSpan={2}> </td>
                              {/*<!-- <td rowSpan={2}>    </td> -->*/}
                            </tr>
                            <tr>
                              <td rowSpan={31}>{row1.current_month}</td>
                            </tr>
                          </>
                        ))}
                        {/* end year & month */}
                        {/* start date and other information */}
                        {paginateAcInfo.data?.map((row2: any, index2: any) => (
                          <tr key={index2}>
                            {row2.account_type_id === 1 ? (
                              <>
                                <td rowSpan={1} className="date text-center">
                                  <span className="badge bg-danger rounded">
                                    {row2.curren_date}
                                  </span>
                                </td>
                                <td>{row2.description}</td>
                                <td>
                                  {" "}
                                  <span className="badge bg-primary rounded">
                                    {row2.reference}
                                  </span>
                                </td>
                                <td className="debit text-success text-end">
                                  {row2.amount}{" "}
                                  <span className="text-secondary ">/-</span>
                                </td>
                              </>
                            ) : (
                              <>
                                <td> </td>
                                <td></td>
                                <td> </td>
                                <td> </td>
                              </>
                            )}

                            {/*<!-- credit collumn -->*/}
                            {row2.account_type_id === 2 ? (
                              <>
                                <td rowSpan={1} className="date text-center">
                                  <span className="badge bg-danger rounded">
                                    {row2.curren_date}
                                  </span>
                                </td>
                                <td>{row2.description}</td>
                                <td>
                                  <span className="badge bg-primary rounded">
                                    {row2.reference}
                                  </span>
                                </td>
                                <td className="debit text-success text-end">
                                  {row2.amount}{" "}
                                  <span className="text-secondary ">/-</span>
                                </td>
                              </>
                            ) : (
                              <>
                                <td> </td>
                                <td></td>
                                <td> </td>
                                <td> </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="text-center">
                          <td colSpan={4}>Total</td>
                          <td className="text-end">
                            <span className="text-secondary me-1">=</span>
                            {DebitTotalAmount}
                            <span className="text-secondary ">/-</span>

                            <span className="pill">{orgCurrencie}</span>
                          </td>
                          {/*<!-- blank collum -->*/}
                          <td className="tbl-ac-blank" rowSpan={2}>
                            {" "}
                          </td>
                          {/*<!-- credit collumn -->*/}
                          <td colSpan={3}>Total</td>
                          <td className="text-end">
                            <span className="text-secondary me-1">=</span>
                            {CraditTotalAmount}{" "}
                            <span className="text-secondary ">/-</span>
                            <span className="pill"> {orgCurrencie}</span>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <PagingLink
                      pageInfo={paginateAcInfo}
                      fetchdata={FetchPaginateData}
                    />
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

      {/*<!-- start add-debit modal -->*/}
      <div className="modal" id="add-modal">
        <div className="modal-dialog modal-fullscreen-sm modal-fullscreen-md">
          <div className="modal-content modal-content-bg">
            <div className="modal-header">
              <h1 className="text-caption">Add Information</h1>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form
                id="account-form"
                onSubmit={handleSubmit((data) =>
                  StoreItem(
                    "/store/fa/account",
                    data,
                    setLoader,
                    FetchPaginateData,
                    pagingUrl
                  )
                )}
              >
                <fieldset className="fieldset">
                  <legend>Document</legend>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <div className="form-date">
                        <label htmlFor="add-debit-date" className="form-label">
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
                          id="date"
                          min="2020-01-01"
                          max="2050-01-01"
                          {...register("date", { required: true })}
                        />
                      </div>
                      <div className="text-warning">
                        {errors.date?.type === "required" && "Date is required"}
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
                        {...register("accounttype", { required: true })}
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
                        {errors.accounttype?.type === "required" &&
                          "Account type is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-debit-ref"
                          title=" "
                          {...register("ref")}
                        />
                        <label htmlFor="add-debit-ref" className="form-label">
                          Reference
                        </label>
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
                          {...register("amount", {
                            required: true,
                            valueAsNumber: true,
                          })}
                        />
                        <label htmlFor="amount" className="form-label">
                          Amount ( {orgCurrencie[0].currencie_name} )
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.amount?.type === "required" &&
                          "Amount is required"}
                        {errors.amount?.type === "valueAsNumber" &&
                          "Only number is allowed"}
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
                        {...register("description", { required: true })}
                      ></textarea>
                    </div>
                    <div className="text-warning">
                      {errors.description?.type === "required" &&
                        "Description is required"}
                    </div>
                  </div>
                </fieldset>
                {/*  <!-- end product order -->*/}

                {/* <!-- start payment order -->*/}
                <fieldset className="fieldset">
                  <legend>Save </legend>
                  <input type="hidden" value={OrgId()} {...register("orgid")} />
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                      {loader ? (
                        <Loader title="Save" />
                      ) : (
                        <button type="submit" className="btn  shadow-dark">
                          <i className="fas fa fa-save me-2"></i>
                          Save
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
                id="modal-close-btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end add-debit modal -->*/}
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

export default memo(Accounts);

export async function getServerSideProps(context: any) {
  const accountType = await GetAccountType();
  const acYearMonth = await GetAcYearMonth(
    GetFullYear(),
    GetMonthName(),
    context.query.v
  );

  const craditDebitInfo = await GetAccountCraditDebitInfo(
    GetFullYear(),
    GetMonthName(),
    context.query.v
  );

  const curMonthDateCount = await AcCurrentMonthDateCounts(
    GetFullYear(),
    GetMonthName(),
    context.query.v
  );

  const orgCurrencie = await GetOrgCurrencies(context.query.v);

  const orgname = await OrgName(context.query.v);

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
