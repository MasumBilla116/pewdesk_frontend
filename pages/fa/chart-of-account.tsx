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
import SweetDeleteAlert from "./../load_js/controllers/SweetDeleteAlert";
import GetAccountType from "../api/GetAccountType";
import { useForm } from "react-hook-form";
import Loader from "@/components/Loader";
import GetChartOfAcAssetAcInfo from "../api/FA/chart-of-ac/GetChartOfAcAssetAcInfo";
import OrgId from "../api/Helper/OrgId";
import GetLiabilityAccountsInfo from "../api/FA/chart-of-ac/GetLiabilityAccountsInfo";
import GetOperatingExpenseAccountsInfo from "../api/FA/chart-of-ac/GetOperatingExpenseAccountsInfo";
import GetOperatingRevenueAccountsInfo from "../api/FA/chart-of-ac/GetOperatingRevenueAccountsInfo";
import GetOwnersEquityAccountsInfo from "../api/FA/chart-of-ac/GetOwnersEquityAccountsInfo";
import PaginateData from "../api/Helper/PaginateData";
import PagingLink from "@/components/PagingLink";
import StoreItem from "../api/Helper/StoreItem";
import { decrypt } from "n-krypta";
import AccessKey from "../../pages/api/AccessKey";
import Cookies from "js-cookie";

function ChartOfAccounts(props: any) {
  const {
    accountType,
    assetAc,
    liabilityAc,
    operatingExpense,
    operatingRevenue,
    ownersEquity,
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

  const [assetAcInfo, setAssetAcInfo] = useState(assetAc);
  const [liabilityAcInfo, setLiabilityAcInfo] = useState(liabilityAc);
  const [operatingExpenseInfo, setOperatingExpenseInfo] =
    useState(operatingExpense);
  const [operatingRevenueInfo, setOperatingRevenueInfo] =
    useState(operatingRevenue);
  const [ownersEquityInfo, setOwnersEquityInfo] = useState(ownersEquity);
  const [loader, setLoader] = useState(false);

  const [assetAcPagingUrl, setAssetAcPagingUrl] = useState(
    assetAcInfo?.links[1].url
  );

  const [liabilityAcInfoPagingUrl, setLiabilityAcInfoPagingUrl] = useState(
    liabilityAcInfo?.links[1].url
  );

  const [operatingExpenseInfoPagingUrl, setOperatingExpenseInfoPagingUrl] =
    useState(operatingExpenseInfo?.links[1].url);

  const [operatingRevenueInfoPagingUrl, setOperatingRevenueInfoPagingUrl] =
    useState(operatingRevenueInfo?.links[1].url);

  const [ownersEquityInfoPagingUrl, setOwnersEquityInfoPagingUrl] = useState(
    ownersEquityInfo?.links[1].url
  );

  const {
    handleSubmit: HandleSubmitAssetAccounts,
    register: AssetAcRegister,
    formState: { errors: AssetAcErrors },
  } = useForm();

  const {
    handleSubmit: HandleSubmitLiabilityAccounts,
    register: LiabilityAccountsRegister,
    formState: { errors: LiabilityAccountsErrors },
  } = useForm();

  const {
    handleSubmit: HandleSubmitOwnersEquityAccounts,
    register: OwnersEquityAccountsRegister,
    formState: { errors: OwnersEquityAccountsErrors },
  } = useForm();

  const {
    handleSubmit: HandleSubmitOperatingRevenueAccounts,
    register: OperatingRevenueAccountsRegister,
    formState: { errors: OperatingRevenueAccountsErrors },
  } = useForm();

  const {
    handleSubmit: HandleSubmitOperatingExpenseAccounts,
    register: OperatingExpenseAccountsRegister,
    formState: { errors: OperatingExpenseAccountsErrors },
  } = useForm();

  const {
    register,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle.min")
      : null;
  }, []);

  const FetchPagingAssetsInfo = useCallback(async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setAssetAcPagingUrl(url);
      setAssetAcInfo(res);
    }
  }, []);

  const FetchPagingLiabilityAcInfo = useCallback(async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setLiabilityAcInfoPagingUrl(url);
      setLiabilityAcInfo(res);
    }
  }, []);

  const FetchPagingOwnersEquityAcInfo = useCallback(async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setOwnersEquityInfoPagingUrl(url);
      setOwnersEquityInfo(res);
    }
  }, []);

  const FetchPagingOperatingRevenueAcInfo = useCallback(async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setOperatingRevenueInfoPagingUrl(url);
      setOperatingRevenueInfo(res);
    }
  }, []);

  const FetchPagingOperatingExpenseAcInfo = useCallback(async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setOperatingExpenseInfoPagingUrl(url);
      setOperatingExpenseInfo(res);
    }
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FA | Chart of accounts</title>
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
                    {/*<!-- start table btn group -->*/}

                    {/*<!-- end table btn group -->*/}
                    <div className="d-flex justify-content-end align-item-center mb-2">
                      {(roleSuperAdmin === 1 ||
                        roleAdmin === 1 ||
                        roleCreator === 1) && (
                        <button
                          type="button"
                          className="btn btn-primary "
                          data-bs-toggle="modal"
                          data-bs-target="#add-assets-ac"
                        >
                          <i className="fas fa fa-plus"></i>
                        </button>
                      )}
                    </div>
                    <table className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark">
                      <caption>Asset Accounts</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={5}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>Julfidar Garments Ltd.</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>
                                  Chart of accounts{" "}
                                  <small>(for small business)</small>
                                </b>
                              </h3>
                              <h3 className="erp-h3">
                                <b>Asset Accounts</b>
                              </h3>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th scope="col" rowSpan={2}>
                            {" "}
                            Code No.
                          </th>
                          <th scope="col" rowSpan={2}>
                            {" "}
                            Account Tittle
                          </th>
                          <th scope="col" rowSpan={2}>
                            {" "}
                            To Increase
                          </th>
                          <th scope="col" colSpan={2}>
                            {" "}
                            Explanation of Account
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {assetAcInfo.data?.map((data: any, index: any) => (
                          <tr key={index + 45789}>
                            <td className="date text-center">
                              <b>{data.code_no}</b>
                            </td>
                            <td> {data.account_title}</td>
                            <td>{data.account_type}</td>
                            <td>{data.explaid_of_account}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* start paging */}
                    <PagingLink
                      pageInfo={assetAcInfo}
                      fetchdata={FetchPagingAssetsInfo}
                    />
                    {/* end paging */}
                  </div>
                  {/*<!-- liability accounts -->*/}
                  <div className="table-responsive">
                    <div className="d-flex justify-content-end align-item-center mb-2">
                      {/*<!-- start table btn group -->*/}
                      {(roleSuperAdmin === 1 ||
                        roleAdmin === 1 ||
                        roleCreator === 1) && (
                        <button
                          type="button"
                          className="btn btn-primary "
                          data-bs-toggle="modal"
                          data-bs-target="#add-liability-ac"
                        >
                          <i className="fas fa fa-plus"></i>
                        </button>
                      )}
                      {/*<!-- end table btn group -->*/}
                    </div>
                    <table className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark">
                      <caption>Liability Accounts</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={5}>
                            <div className="erp-trial-header">
                              <h3 className="erp-h3 text-start">
                                <b>
                                  <small>Liability Accounts</small>
                                </b>
                              </h3>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th scope="col" rowSpan={2}>
                            {" "}
                            Code No.
                          </th>
                          <th scope="col" rowSpan={2}>
                            {" "}
                            Account Tittle
                          </th>
                          <th scope="col" rowSpan={2}>
                            {" "}
                            To Increase
                          </th>
                          <th scope="col" colSpan={2}>
                            {" "}
                            Explanation of Account
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {liabilityAcInfo.data?.map((data: any, index: any) => (
                          <tr key={index + 87109}>
                            <td className="date text-center">
                              <b>{data.code_no}</b>
                            </td>
                            <td> {data.account_title}</td>
                            <td>{data.account_type}</td>
                            <td>{data.explaid_of_account}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* start paging */}
                    <PagingLink
                      pageInfo={liabilityAcInfo}
                      fetchdata={FetchPagingLiabilityAcInfo}
                    />
                    {/* end paging */}
                  </div>
                  {/*<!-- owners equity accounts -->*/}
                  <div className="table-responsive">
                    <div className="d-flex justify-content-end align-item-center mb-2">
                      {/*<!-- start table btn group -->*/}
                      {(roleSuperAdmin === 1 ||
                        roleAdmin === 1 ||
                        roleCreator === 1) && (
                        <button
                          type="button"
                          className="btn btn-primary "
                          data-bs-toggle="modal"
                          data-bs-target="#add-owner-equity-ac"
                        >
                          <i className="fas fa fa-plus"></i>
                        </button>
                      )}
                      {/*<!-- end table btn group -->*/}
                    </div>
                    <table
                      id="printable"
                      className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark"
                    >
                      <caption>Owners Equity Accounts</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={5}>
                            <div className="erp-trial-header">
                              <h3 className="erp-h3 text-start">
                                <b>
                                  <small>Owners Equity Accounts</small>
                                </b>
                              </h3>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th scope="col" rowSpan={2}>
                            {" "}
                            Code No.
                          </th>
                          <th scope="col" rowSpan={2}>
                            {" "}
                            Account Tittle
                          </th>
                          <th scope="col" rowSpan={2}>
                            {" "}
                            To Increase
                          </th>
                          <th scope="col" colSpan={2}>
                            {" "}
                            Explanation of Account
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ownersEquityInfo.data?.map((data: any, index: any) => (
                          <tr key={index + 97109846}>
                            <td className="date text-center">
                              <b>{data.code_no}</b>
                            </td>
                            <td> {data.account_title}</td>
                            <td>{data.account_type}</td>
                            <td>{data.explaid_of_account}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* start paging */}
                    <PagingLink
                      pageInfo={ownersEquityInfo}
                      fetchdata={FetchPagingOwnersEquityAcInfo}
                    />
                    {/* end paging */}
                  </div>
                  {/*<!-- operating revinue accounts accounts -->*/}
                  <div className="table-responsive">
                    <div className="d-flex justify-content-end align-item-center mb-2">
                      {/*<!-- start table btn group -->*/}
                      {(roleSuperAdmin === 1 ||
                        roleAdmin === 1 ||
                        roleCreator === 1) && (
                        <button
                          type="button"
                          className="btn btn-primary "
                          data-bs-toggle="modal"
                          data-bs-target="#add-operating-revinue-ac"
                        >
                          <i className="fas fa fa-plus"></i>
                        </button>
                      )}
                      {/*<!-- end table btn group -->*/}
                    </div>
                    <table className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark">
                      <caption>Operating Revinue Accounts</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={5}>
                            <div className="erp-trial-header">
                              <h3 className="erp-h3 text-start">
                                <b>
                                  <small>Operating Revenue Accounts</small>
                                </b>
                              </h3>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th scope="col" rowSpan={2}>
                            {" "}
                            Code No.
                          </th>
                          <th scope="col" rowSpan={2}>
                            {" "}
                            Account Tittle
                          </th>
                          <th scope="col" rowSpan={2}>
                            {" "}
                            To Increase
                          </th>
                          <th scope="col" colSpan={2}>
                            {" "}
                            Explanation of Account
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {operatingRevenueInfo.data?.map(
                          (data: any, index: any) => (
                            <tr key={index + 9730975}>
                              <td className="date text-center">
                                <b>{data.code_no}</b>
                              </td>
                              <td> {data.account_title}</td>
                              <td>{data.account_type}</td>
                              <td>{data.explaid_of_account}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                    {/* start paging */}
                    <PagingLink
                      pageInfo={operatingRevenueInfo}
                      fetchdata={FetchPagingOperatingRevenueAcInfo}
                    />
                    {/* end paging */}
                  </div>
                  {/*<!-- operating expense accounts -->*/}
                  <div className="table-responsive">
                    <div className="d-flex justify-content-end align-item-center mb-2">
                      {/*<!-- start table btn group -->*/}
                      {(roleSuperAdmin === 1 ||
                        roleAdmin === 1 ||
                        roleCreator === 1) && (
                        <button
                          type="button"
                          className="btn btn-primary "
                          data-bs-toggle="modal"
                          data-bs-target="#add-operating-expense-ac"
                        >
                          <i className="fas fa fa-plus"></i>
                        </button>
                      )}
                      {/*<!-- end table btn group -->*/}
                    </div>
                    <table className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark">
                      <caption>Operating Expense Accounts</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={5}>
                            <div className="erp-trial-header">
                              <h3 className="erp-h3 text-start">
                                <b>
                                  <small>Operating Expense Accounts</small>
                                </b>
                              </h3>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th scope="col" rowSpan={2}>
                            {" "}
                            Code No.
                          </th>
                          <th scope="col" rowSpan={2}>
                            {" "}
                            Account Tittle
                          </th>
                          <th scope="col" rowSpan={2}>
                            {" "}
                            To Increase
                          </th>
                          <th scope="col" colSpan={2}>
                            {" "}
                            Explanation of Account
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {operatingExpenseInfo.data?.map(
                          (data: any, index: any) => (
                            <tr key={index + 98736}>
                              <td className="date text-center">
                                <b>{data.code_no}</b>
                              </td>
                              <td> {data.account_title}</td>
                              <td>{data.account_type}</td>
                              <td>{data.explaid_of_account}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                    {/* start paging */}
                    <PagingLink
                      pageInfo={operatingExpenseInfo}
                      fetchdata={FetchPagingOperatingExpenseAcInfo}
                    />
                    {/* end paging */}
                  </div>
                  {/* end chart of account */}
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
      {/*<!-- start add operating expense account -->*/}
      {/*<!-- start add modal -->*/}
      <div className="modal" id="add-operating-expense-ac">
        <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
          <div className="modal-content erp-bg-back">
            <div className="modal-header">
              <h4 className="text-light">Add Operating Expense Accounts</h4>
              <button
                className="btn-close bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={HandleSubmitOperatingExpenseAccounts((data) =>
                  StoreItem(
                    "/store/fa/chart-of-account/operating-expense/account",
                    data,
                    setLoader,
                    FetchPagingOperatingExpenseAcInfo,
                    operatingExpenseInfoPagingUrl
                  )
                )}
              >
                <fieldset className="fieldset">
                  <legend>Document</legend>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="op-code-no"
                          title=" "
                          {...OperatingExpenseAccountsRegister("codeNo", {
                            required: true,
                            valueAsNumber: true,
                          })}
                        />
                        <label htmlFor="op-code-no" className="form-label">
                          Code No.
                        </label>
                      </div>
                      <div className="text-warning">
                        {OperatingExpenseAccountsErrors.codeNo?.type ===
                          "required" && "Code is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 mb-4">
                      <label
                        htmlFor="account-type"
                        className="form-label text-white mb-0"
                      >
                        To Increase
                      </label>
                      <select
                        className="form-select"
                        id="account-type"
                        {...OperatingExpenseAccountsRegister("toIncrease", {
                          required: true,
                        })}
                      >
                        <option value="">Select To Increase</option>
                        {accountType.map((row: any, index: any) => (
                          <option key={index} value={row.account_type_id}>
                            {" "}
                            {row.account_type}
                          </option>
                        ))}
                      </select>
                      <div className="text-warning">
                        {OperatingExpenseAccountsErrors.toIncrease?.type ===
                          "required" && "To Increase is required"}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="op-ac-title"
                          title=" "
                          {...OperatingExpenseAccountsRegister("actitle", {
                            required: true,
                          })}
                        />
                        <label htmlFor="op-ac-title" className="form-label">
                          Account Tittle
                        </label>
                      </div>
                      <div className="text-warning">
                        {OperatingExpenseAccountsErrors.actitle?.type ===
                          "required" && "Account title is required"}
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                      <label htmlFor="op-explain-of-ac" className="text-light">
                        Explanation of Account
                      </label>
                      <textarea
                        className="form-control"
                        id="op-explain-of-ac"
                        cols={30}
                        rows={10}
                        style={{ height: 100 + "px" }}
                        {...OperatingExpenseAccountsRegister("explainOfAc", {
                          required: true,
                        })}
                      ></textarea>
                    </div>
                    <div className="text-warning">
                      {OperatingExpenseAccountsErrors.explainOfAc?.type ===
                        "required" && "Explain of ac is required"}
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
                        {...OperatingExpenseAccountsRegister("orgid")}
                      />
                      {loader ? (
                        <Loader title="Save" />
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-danger w-50 shadow-dark"
                        >
                          <i className="fas fa fa-save me-1"></i>
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
      {/* <!-- end add modal -->*/}
      {/*<!-- end add operating expense account -->*/}
      {/* <!-- start add operating revinue account -->*/}
      <div className="modal " id="add-operating-revinue-ac">
        <div className="modal-dialog modal-fullscreen-sm modal-fullscreen-md">
          <div className="modal-content erp-bg-back">
            <div className="modal-header">
              <h6 className="text-light">
                Add Operating Revinue Account Information
              </h6>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={HandleSubmitOperatingRevenueAccounts((data) =>
                  StoreItem(
                    "/store/fa/chart-of-account/operating-revinue/account",
                    data,
                    setLoader,
                    FetchPagingOperatingRevenueAcInfo,
                    operatingRevenueInfoPagingUrl
                  )
                )}
              >
                <fieldset className="fieldset">
                  <legend>Document</legend>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="op-rev-code-no"
                          title=" "
                          {...OperatingRevenueAccountsRegister("codeNo", {
                            required: true,
                            valueAsNumber: true,
                          })}
                        />
                        <label htmlFor="op-rev-code-no" className="form-label">
                          Code No.
                        </label>
                      </div>
                      <div className="text-warning">
                        {OperatingRevenueAccountsErrors.codeNo?.type ===
                          "required" && "Code is required"}
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 mb-4">
                      <label
                        htmlFor="account-type"
                        className="form-label text-white mb-0"
                      >
                        To Increase
                      </label>
                      <select
                        className="form-select"
                        id="account-type"
                        {...OperatingRevenueAccountsRegister("toIncrease", {
                          required: true,
                        })}
                      >
                        <option value="">Select To Increase</option>
                        {accountType.map((row: any, index: any) => (
                          <option key={index} value={row.account_type_id}>
                            {" "}
                            {row.account_type}
                          </option>
                        ))}
                      </select>
                      <div className="text-warning">
                        {OperatingRevenueAccountsErrors.toIncrease?.type ===
                          "required" && "To Increase is required"}
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="op-rev-ac-title"
                          title=" "
                          {...OperatingRevenueAccountsRegister("actitle", {
                            required: true,
                          })}
                        />
                        <label htmlFor="op-rev-ac-title" className="form-label">
                          Account Tittle
                        </label>
                      </div>
                      <div className="text-warning">
                        {OperatingRevenueAccountsErrors.actitle?.type ===
                          "required" && "Account title is required"}
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                      <label
                        htmlFor="op-rev-explain-of-ac"
                        className="text-light"
                      >
                        Explanation of Account
                      </label>
                      <textarea
                        className="form-control"
                        id="op-rev-explain-of-ac"
                        cols={30}
                        rows={10}
                        style={{ height: 100 + "px" }}
                        {...OperatingRevenueAccountsRegister("explainOfAc", {
                          required: true,
                        })}
                      ></textarea>
                    </div>
                    <div className="text-warning">
                      {OperatingRevenueAccountsErrors.explainOfAc?.type ===
                        "required" && "Explain of ac is required"}
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
                        {...OperatingRevenueAccountsRegister("orgid")}
                      />
                      {loader ? (
                        <Loader title="Save" />
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-danger w-50 shadow-dark"
                        >
                          <i className="fas fa fa-save me-1"></i>
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
      {/*<!-- end add operating revinue account -->*/}
      {/*<!-- start add owner equity account -->*/}
      <div className="modal " id="add-owner-equity-ac">
        <div className="modal-dialog modal-fullscreen-sm modal-fullscreen-md">
          <div className="modal-content erp-bg-back">
            <div className="modal-header">
              <h4 className="text-light">
                Add Owner Equity Account Information
              </h4>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={HandleSubmitOwnersEquityAccounts((data) =>
                  StoreItem(
                    "/store/fa/chart-of-account/woner-equity/account",
                    data,
                    setLoader,
                    FetchPagingOwnersEquityAcInfo,
                    ownersEquityInfoPagingUrl
                  )
                )}
              >
                <fieldset className="fieldset">
                  <legend>Document</legend>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 mb-4 mt-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="wnr-eq-ac-rev-code-no"
                          title=" "
                          {...OwnersEquityAccountsRegister("codeNo", {
                            required: true,
                            valueAsNumber: true,
                          })}
                        />
                        <label
                          htmlFor="wnr-eq-ac-rev-code-no"
                          className="form-label"
                        >
                          Code No.
                        </label>
                      </div>
                      <div className="text-warning">
                        {OwnersEquityAccountsErrors.codeNo?.type ===
                          "required" && "Code is required"}
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 mb-4">
                      <label
                        htmlFor="account-type"
                        className="form-label text-white mb-0"
                      >
                        To Increase
                      </label>
                      <select
                        className="form-select"
                        id="account-type"
                        {...OwnersEquityAccountsRegister("toIncrease", {
                          required: true,
                        })}
                      >
                        <option value="">Select To Increase</option>
                        {accountType.map((row: any, index: any) => (
                          <option key={index} value={row.account_type_id}>
                            {" "}
                            {row.account_type}
                          </option>
                        ))}
                      </select>
                      <div className="text-warning">
                        {OwnersEquityAccountsErrors.toIncrease?.type ===
                          "required" && "To Increase is required"}
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="wnr-eq-ac-rev-ac-title"
                          title=" "
                          {...OwnersEquityAccountsRegister("actitle", {
                            required: true,
                          })}
                        />
                        <label
                          htmlFor="wnr-eq-ac-rev-ac-title"
                          className="form-label"
                        >
                          Account Tittle
                        </label>
                      </div>
                      <div className="text-warning">
                        {OwnersEquityAccountsErrors.actitle?.type ===
                          "required" && "Account title is required"}
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                      <label
                        htmlFor="wnr-eq-ac-rev-explain-of-ac"
                        className="text-light"
                      >
                        Explanation of Account
                      </label>
                      <textarea
                        className="form-control"
                        id="wnr-eq-ac-rev-explain-of-ac"
                        cols={30}
                        rows={10}
                        style={{ height: 100 + "px" }}
                        {...OwnersEquityAccountsRegister("explainOfAc", {
                          required: true,
                        })}
                      ></textarea>
                    </div>
                    <div className="text-warning">
                      {OwnersEquityAccountsErrors.explainOfAc?.type ===
                        "required" && "Explain of ac is required"}
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
                        {...OwnersEquityAccountsRegister("orgid")}
                      />
                      {loader ? (
                        <Loader title="Save" />
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-danger w-50 shadow-dark"
                        >
                          <i className="fas fa fa-save me-1"></i>
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
      {/*<!-- end add owner equity account -->*/}
      {/*<!-- start add liability account -->*/}
      <div className="modal " id="add-liability-ac">
        <div className="modal-dialog modal-fullscreen-sm modal-fullscreen-md">
          <div className="modal-content erp-bg-back">
            <div className="modal-header">
              <h5 className="text-light">Add Liability Account Information</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={HandleSubmitLiabilityAccounts((data) =>
                  StoreItem(
                    "/store/fa/chart-of-account/lisbility/account",
                    data,
                    setLoader,
                    FetchPagingLiabilityAcInfo,
                    liabilityAcInfoPagingUrl
                  )
                )}
              >
                <fieldset className="fieldset">
                  <legend>Document</legend>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 mb-4 mt-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="liability-ac-rev-code-no"
                          title=" "
                          {...LiabilityAccountsRegister("codeNo", {
                            required: true,
                            valueAsNumber: true,
                          })}
                        />
                        <label
                          htmlFor="liability-ac-rev-code-no"
                          className="form-label"
                        >
                          Code No.
                        </label>
                      </div>
                      <div className="text-warning">
                        {LiabilityAccountsErrors.codeNo?.type === "required" &&
                          "Code is required"}
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 mb-4">
                      <label
                        htmlFor="account-type"
                        className="form-label text-white mb-0"
                      >
                        To Increase
                      </label>
                      <select
                        className="form-select"
                        id="account-type"
                        {...LiabilityAccountsRegister("toIncrease", {
                          required: true,
                        })}
                      >
                        <option value="">Select To Increase</option>
                        {accountType.map((row: any, index: any) => (
                          <option key={index} value={row.account_type_id}>
                            {" "}
                            {row.account_type}
                          </option>
                        ))}
                      </select>
                      <div className="text-warning">
                        {LiabilityAccountsErrors.toIncrease?.type ===
                          "required" && "To Increase is required"}
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="liability-ac-rev-ac-title"
                          title=" "
                          {...LiabilityAccountsRegister("actitle", {
                            required: true,
                          })}
                        />
                        <label
                          htmlFor="liability-ac-rev-ac-title"
                          className="form-label"
                        >
                          Account Tittle
                        </label>
                      </div>
                      <div className="text-warning">
                        {LiabilityAccountsErrors.actitle?.type === "required" &&
                          "Account title is required"}
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                      <label
                        htmlFor="liability-ac-rev-explain-of-ac"
                        className="text-light"
                      >
                        Explanation of Account
                      </label>
                      <textarea
                        className="form-control"
                        id="liability-ac-rev-explain-of-ac"
                        cols={30}
                        rows={10}
                        style={{ height: 100 + "px" }}
                        {...LiabilityAccountsRegister("explainOfAc", {
                          required: true,
                        })}
                      ></textarea>
                    </div>
                    <div className="text-warning">
                      {LiabilityAccountsErrors.explainOfAc?.type ===
                        "required" && "Explain of ac is required"}
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
                        {...LiabilityAccountsRegister("orgid")}
                      />
                      {loader ? (
                        <Loader title="Save" />
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-danger w-50 shadow-dark"
                        >
                          <i className="fas fa fa-save me-1"></i>
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
      {/*<!-- end add liability account -->*/}
      {/*<!-- start add assets acount -->*/}
      <div className="modal " id="add-assets-ac">
        <div className="modal-dialog modal-fullscreen-sm modal-fullscreen-md">
          <div className="modal-content erp-bg-back">
            <div className="modal-header">
              <h4 className="text-light">Add Assets Account Information</h4>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={HandleSubmitAssetAccounts((data) =>
                  StoreItem(
                    "/store/fa/chart-of-account/asset/account",
                    data,
                    setLoader,
                    FetchPagingAssetsInfo,
                    assetAcPagingUrl
                  )
                )}
              >
                <fieldset className="fieldset">
                  <legend>Document</legend>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="assets-ac-code-no"
                          title=" "
                          {...AssetAcRegister("codeNo", {
                            required: true,
                            valueAsNumber: true,
                          })}
                        />
                        <label
                          htmlFor="assets-ac-code-no"
                          className="form-label"
                        >
                          Code No.
                        </label>
                      </div>
                      <div className="text-warning">
                        {AssetAcErrors.codeNo?.type === "required" &&
                          "Code is required"}
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 mb-4">
                      <label
                        htmlFor="account-type"
                        className="form-label text-white mb-0"
                      >
                        To Increase
                      </label>
                      <select
                        className="form-select"
                        id="account-type"
                        {...AssetAcRegister("toIncrease", { required: true })}
                      >
                        <option>Select To Increase</option>
                        {accountType.map((row: any, index: any) => (
                          <option key={index} value={row.account_type_id}>
                            {" "}
                            {row.account_type}
                          </option>
                        ))}
                      </select>
                      <div className="text-warning">
                        {AssetAcErrors.accounttype?.type === "required" &&
                          "Account type is required"}
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="assets-ac-title"
                          title=" "
                          {...AssetAcRegister("actitle", { required: true })}
                        />
                        <label htmlFor="assets-ac-title" className="form-label">
                          Account Tittle
                        </label>
                      </div>
                      <div className="text-warning">
                        {AssetAcErrors.actitle?.type === "required" &&
                          "Account title is required"}
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                      <label
                        htmlFor="assets-explain-of-ac"
                        className="text-light"
                      >
                        Explanation of Account
                      </label>
                      <textarea
                        className="form-control"
                        id="assets-explain-of-ac"
                        cols={30}
                        rows={10}
                        style={{ height: 100 + "px" }}
                        {...AssetAcRegister("explainOfAc", { required: true })}
                      ></textarea>
                    </div>
                    <div className="text-warning">
                      {AssetAcErrors.explainOfAc?.type === "required" &&
                        "Account title is required"}
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
                        {...AssetAcRegister("orgid")}
                      />
                      {loader ? (
                        <Loader title="Save" />
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-danger w-50 shadow-dark"
                        >
                          <i className="fas fa fa-save me-1"></i>
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
      {/*<!-- end  add assets acount -->*/}
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

export default memo(ChartOfAccounts);
export async function getServerSideProps(context: any) {
  const id = context.query.v;
  const accountType = await GetAccountType();
  const assetAc = await GetChartOfAcAssetAcInfo(id);
  const liabilityAc = await GetLiabilityAccountsInfo(id);
  const operatingExpense = await GetOperatingExpenseAccountsInfo(id);
  const operatingRevenue = await GetOperatingRevenueAccountsInfo(id);
  const ownersEquity = await GetOwnersEquityAccountsInfo(id);
  return {
    props: {
      accountType,
      assetAc,
      liabilityAc,
      operatingExpense,
      operatingRevenue,
      ownersEquity,
    },
  };
}
