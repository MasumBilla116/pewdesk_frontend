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
import GetOrgCurrencies from "@/pages/api/PreloadOrgInfo/GetOrgCurrencies";
import GetMonthName from "@/pages/api/Helper/GetMonthName";
import GetFullYear from "@/pages/api/Helper/GetFullYear";
import OrgName from "@/pages/api/Helper/OrgName";
import AddModalTableBtn from "@/components/AddModalTableBtn";
import ActionBtn from "@/components/ActionBtn";
import { decrypt } from "n-krypta";
import AccessKey from "../../../pages/api/AccessKey";
import Cookies from "js-cookie";

export default function Budgets(props: any) {
  const { budgetData, orgCurrencie, orgname } = props;

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
  const [budgetPaginateInfo, setBudgetPaginateInfo] = useState(budgetData);
  const [paginateUrl, setPaginateUrl] = useState(budgetData?.links[1].url);
  const [totalRevienue, stTotalRevienue] = useState(0);
  const [totalExpenses, stTotalExpenses] = useState(0);
  const [totalTaxAmount, stTotalTaxAmount] = useState(0);
  const [totalBudgetAmount, stTotalBudgetAmount] = useState(0);

  useEffect(() => {
    var revienue = 0,
      expenses = 0,
      tax = 0,
      budget = 0;
    budgetPaginateInfo?.data?.map((data: any) => {
      revienue += data.total_revenue;
      expenses += data.total_revenue;
      tax += data.tax_amount;
      budget += data.tax_amount;
    });
    stTotalRevienue(revienue);
    stTotalExpenses(expenses);
    stTotalTaxAmount(tax);
    stTotalBudgetAmount(budget);
  }, [
    budgetPaginateInfo,
    paginateUrl,
    totalBudgetAmount,
    totalExpenses,
    totalRevienue,
    totalTaxAmount,
  ]);

  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle.min")
      : null;
  }, []);

  const FetchPaginateInfo = async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setBudgetPaginateInfo(res);
    }
  };

  useEffect(() => {}, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle.min")
      : null;
  }, []);

  const store = (formData: any) => {
    setLoader(true);
    axios.get("sanctum/csrf-cookie").then((res) => {
      axios
        .post(`${process.env.BASE_URL}/store/hcm/budget/info`, formData)
        .then((res) => {
          setLoader(false);
          console.warn("Respose : ", res.data);
          if (res.data.success === 200) {
            $(".modal-close-btn").click();
            $("form").trigger("reset");
          }
          if (res.data.error === 500) {
            swal("Ooppss...!!", "Something worng, please try again", "warning");
          }
        })
        .catch((error) => {
          setLoader(false);
          console.warn(error);
        });
    });
  };

  const UpdateInfo = async (target: any) => {
    const data = $(`#${target}`).serializeArray();

    const formData = JSON.stringify({
      budget_title: data[0].value,
      budget_type: data[1].value,
      start_date: data[2].value,
      end_date: data[3].value,
      total_revenue: data[4].value,
      total_expenses: data[5].value,
      tax_amount: data[6].value,
      budget_amount: data[7].value,
      status: data[8].value,
      orgid: data[9].value,
      id: data[10].value,
    });
    UpdateItem(
      "/update/hcm/budget/info",
      formData,
      setLoader,
      FetchPaginateInfo,
      paginateUrl
    );
  };

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>HCM | Budgets</title>
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
                  <div className="table-responsive">
                    {/*<!-- start table btn group -->*/}
                    {(roleSuperAdmin === 1 ||
                      roleAdmin === 1 ||
                      roleCreator === 1) && <AddModalTableBtn />}
                    {/*<!-- end table btn group -->*/}
                    <table
                      id="printable"
                      className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark"
                    >
                      <caption>Budget Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={11}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Budget</b>
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
                          <th scope="col">Budget No.</th>
                          <th scope="col">Budget Title</th>
                          <th scope="col">Budget Type</th>
                          <th scope="col">Start Date</th>
                          <th scope="col">End Date</th>
                          <th scope="col">Total Revenue</th>
                          <th scope="col">Total Expenses</th>
                          <th scope="col">Tax Amount</th>
                          <th scope="col">Budget Amount</th>
                          <th scope="col"> Status </th>
                          {(roleSuperAdmin === 1 ||
                            roleAdmin === 1 ||
                            roleCreator === 1) && <th scope="col"> Action </th>}
                        </tr>
                      </thead>
                      <tbody>
                        {budgetPaginateInfo?.data?.map(
                          (data: any, index: any) => (
                            <tr key={data.budget_id}>
                              <td className="debit  text-end text-primary">
                                {process.env.BUDGET_ID + data.budget_id}
                              </td>
                              <td className="debit text-warning text-start">
                                {data.budget_title}
                              </td>
                              <td className="credit text-light text-end">
                                {data.budget_type}
                              </td>
                              <td className="credit text-light text-end">
                                {data.start_date}
                              </td>
                              <td className="credit text-light text-end">
                                {data.end_date}
                              </td>
                              <td className="credit text-light text-end">
                                {data.total_revenue}
                                <span className="text-secondary ">/-</span>
                              </td>
                              <td className="credit text-light text-end">
                                {data.total_expenses}
                                <span className="text-secondary ">/-</span>
                              </td>
                              <td className="credit text-light text-end">
                                {data.tax_amount}
                                <span className="text-secondary ">/-</span>
                              </td>
                              <td className="credit text-light text-end">
                                {data.budget_amount}
                                <span className="text-secondary ">/-</span>
                              </td>
                              <td className="text-center">
                                <span
                                  className={`badge 
                                    ${
                                      data.status === "approved" && "bg-success"
                                    }
                                    ${
                                      data.status === "in-process" &&
                                      "bg-warning"
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
                                <button
                                  type="button"
                                  className="btn bg-transparent text-success btn-sm"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#edit_modal_${data.budget_id}`}
                                >
                                  <i className="fas fa fa-edit"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn bg-transparent text-danger btn-sm"
                                  onClick={() =>
                                    DeleteItem(
                                      `/delete/hcm/budget/info/${data.budget_id}`,
                                      paginateUrl,
                                      FetchPaginateInfo
                                    )
                                  }
                                >
                                  <i className="fas fa fa-trash"></i>
                                </button>
                              </td> */}

                              {/* start actio btn*/}
                              {(roleSuperAdmin === 1 ||
                                roleAdmin === 1 ||
                                roleCreator === 1) && (
                                <td className="text-center">
                                  <ActionBtn
                                    modalid={data.budget_id}
                                    deleteFunc={DeleteItem}
                                    deleteurl={`/delete/hcm/budget/info/${data.budget_id}`}
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
                          <td colSpan={5}>Total</td>
                          <td className="text-end">
                            <span className="text-secondary me-1">=</span>
                            {totalRevienue}
                            <span className="pill">{orgCurrencie}</span>
                          </td>
                          <td className="text-end">
                            <span className="text-secondary me-1">=</span>
                            {totalExpenses}
                            <span className="pill">{orgCurrencie}</span>
                          </td>
                          <td className="text-end">
                            <span className="text-secondary me-1">=</span>
                            {totalTaxAmount}
                            <span className="pill">{orgCurrencie}</span>
                          </td>
                          <td className="text-end">
                            <span className="text-secondary me-1">=</span>
                            {totalBudgetAmount}
                            <span className="pill">{orgCurrencie}</span>
                          </td>
                          <td colSpan={2}> </td>
                        </tr>
                      </tfoot>
                    </table>
                    {/* start paginate */}
                    <PagingLink
                      pageInfo={budgetPaginateInfo}
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
      {/*<!-- start add modal -->*/}
      <div className="modal" id="add-modal">
        <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
          <div className="modal-content modal-content-bg">
            <div className="modal-header">
              <h1 className="text-caption">Add Budget</h1>
              <button
                className="btn-close bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit((data) =>
                  StoreItem(
                    "/store/hcm/budget/info",
                    data,
                    setLoader,
                    FetchPaginateInfo,
                    paginateUrl
                  )
                )}
              >
                <fieldset className="fieldset">
                  <legend>Budget</legend>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="edit-budget-title"
                          title=" "
                          {...register("budget_title", { required: true })}
                        />
                        <label
                          htmlFor="edit-budget-title"
                          className="form-label"
                        >
                          Budget Title
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.budget_title?.type === "required" &&
                          "Budget Title is required "}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="edit-budget-type"
                          title=" "
                          {...register("budget_type", { required: true })}
                        />
                        <label
                          htmlFor="edit-budget-type"
                          className="form-label"
                        >
                          Budget Type
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.budget_type?.type === "required" &&
                          "Budget Type is required "}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-5">
                      <div className="form-date">
                        <label htmlFor="edit-start-date" className="form-label">
                          Start Date
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
                          id="edit-start-date"
                          {...register("start_date", { required: true })}
                        />
                      </div>
                      <div className="text-warning">
                        {errors.start_date?.type === "required" &&
                          "Start Date is required "}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-5">
                      <div className="form-date">
                        <label htmlFor="edit-end-date" className="form-label">
                          End Date
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
                          id="edit-end-date"
                          {...register("end_date", { required: true })}
                        />
                      </div>
                      <div className="text-warning">
                        {errors.end_date?.type === "required" &&
                          "End Date is required "}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          min={1}
                          placeholder=" "
                          className="form-input"
                          id="edit-total-revenue"
                          title=" "
                          {...register("total_revenue", { required: true })}
                        />
                        <label
                          htmlFor="edit-total-revenue"
                          className="form-label"
                        >
                          Total Revenue
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.total_revenue?.type === "required" &&
                          "Total Revenue is required "}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          min={1}
                          placeholder=" "
                          className="form-input"
                          id="edit-total-expenses"
                          title=" "
                          {...register("total_expenses", { required: true })}
                        />
                        <label
                          htmlFor="edit-total-expenses"
                          className="form-label"
                        >
                          Total Expenses
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.total_expenses?.type === "required" &&
                          "Total Expenses is required "}
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          min={1}
                          placeholder=" "
                          className="form-input"
                          id="edit-total-amount"
                          title=" "
                          {...register("tax_amount", { required: true })}
                        />
                        <label
                          htmlFor="edit-total-amount"
                          className="form-label"
                        >
                          Tax Amount
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.tax_amount?.type === "required" &&
                          "Tax Amount is required "}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          min={1}
                          placeholder=" "
                          className="form-input"
                          id="edit-budget-amount"
                          title=" "
                          {...register("budget_amount", { required: true })}
                        />
                        <label
                          htmlFor="edit-budget-amount"
                          className="form-label"
                        >
                          Budget Amount
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.budget_amount?.type === "required" &&
                          "Budget Amount  is required "}
                      </div>
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end product order -->*/}

                {/*<!-- start payment order -->*/}
                <fieldset className="fieldset">
                  <legend>Save</legend>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <label htmlFor="edit-cur-status" className="text-light">
                        Current status
                      </label>
                      <select
                        id="edit-cur-status"
                        className="form-select"
                        {...register("status", { required: true })}
                      >
                        <option value="">Select Current Status</option>
                        <option value="approved">Approved</option>
                        <option value="in-process">In-Process</option>
                        <option value="release-from-approve">
                          Release From Approve
                        </option>
                        <option value="partial-approve">Partial Approve</option>
                        <option value="discuss">Discuss</option>
                      </select>
                      <hr className="bg-secondary" />
                      <div className="text-warning">
                        {errors.status?.type === "required" &&
                          "Status is required "}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                      <input
                        type="hidden"
                        {...register("orgid")}
                        value={OrgId()}
                      />
                      {loader ? (
                        <Loader title="Save" />
                      ) : (
                        <button type="submit" className="btn btn-success">
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
      {budgetPaginateInfo?.data?.map((data: any) => (
        <div
          className="modal"
          id={`edit_modal_${data.budget_id}`}
          key={`edit_modal_${data.budget_id}`}
        >
          <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
            <div className="modal-content modal-content-bg">
              <div className="modal-header">
                <h1 className="text-caption">Edite Budget</h1>
                <button
                  className="btn-close  bg-light"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form id={`edit_form_${data.budget_id}`}>
                  <fieldset className="fieldset">
                    <legend>Budget</legend>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-budget-title_${data.budget_id}`}
                            title=" "
                            name="budget_title"
                            defaultValue={data.budget_title}
                          />
                          <label
                            htmlFor={`edit-budget-title_${data.budget_id}`}
                            className="form-label"
                          >
                            Budget Title
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-budget-type_${data.budget_id}`}
                            title=" "
                            name="budget_type"
                            defaultValue={data.budget_type}
                          />
                          <label
                            htmlFor={`edit-budget-type_${data.budget_id}`}
                            className="form-label"
                          >
                            Budget Type
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-5">
                        <div className="form-date">
                          <label
                            htmlFor={`edit-start-date_${data.budget_id}`}
                            className="form-label"
                          >
                            Start Date
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.start_date}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`edit-start-date_${data.budget_id}`}
                            name="start_date"
                            defaultValue={data.start_date}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-5">
                        <div className="form-date">
                          <label htmlFor="edit-end-date" className="form-label">
                            End Date
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.end_date}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`edit-end-date_${data.budget_id}`}
                            name="end_date"
                            defaultValue={data.end_date}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            min={1}
                            placeholder=" "
                            className="form-input"
                            id={`edit-total-revenue_${data.budget_id}`}
                            title=" "
                            name="total_revenue"
                            defaultValue={data.total_revenue}
                          />
                          <label
                            htmlFor={`edit-total-revenue_${data.budget_id}`}
                            className="form-label"
                          >
                            Total Revenue
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            min={1}
                            placeholder=" "
                            className="form-input"
                            id={`edit-total-expenses_${data.budget_id}`}
                            title=" "
                            name="total_expenses"
                            defaultValue={data.total_expenses}
                          />
                          <label
                            htmlFor={`edit-total-expenses_${data.budget_id}`}
                            className="form-label"
                          >
                            Total Expenses
                          </label>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            min={1}
                            placeholder=" "
                            className="form-input"
                            id={`edit-total-amount_${data.budget_id}`}
                            title=" "
                            name="tax_amount"
                            defaultValue={data.tax_amount}
                          />
                          <label
                            htmlFor={`edit-total-amount_${data.budget_id}`}
                            className="form-label"
                          >
                            Tax Amount
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            min={1}
                            placeholder=" "
                            className="form-input"
                            id={`edit-budget-amount_${data.budget_id}`}
                            title=" "
                            name="budget_amount"
                            defaultValue={data.budget_amount}
                          />
                          <label
                            htmlFor={`edit-budget-amount_${data.budget_id}`}
                            className="form-label"
                          >
                            Budget Amount
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  {/*<!-- end product order -->*/}

                  {/*<!-- start payment order -->*/}
                  <fieldset className="fieldset">
                    <legend>Update</legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                        <label
                          htmlFor={`edit-cur-status_${data.budget_id}`}
                          className="text-light"
                        >
                          Current status
                        </label>
                        <select
                          id={`edit-cur-status_${data.budget_id}`}
                          className="form-select"
                          name="status"
                        >
                          <option value="">Select Current Status</option>
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
                        <input type="hidden" name="orgid" value={OrgId()} />
                        <input type="hidden" name="id" value={data.budget_id} />
                        {loader ? (
                          <Loader title="Update" />
                        ) : (
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() =>
                              UpdateInfo(`edit_form_${data.budget_id}`)
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

  const budgetData = await FetchData(`/get/hcm/budget/info/${id}`);
  const orgCurrencie = await GetOrgCurrencies(context.query.v);
  const orgname = await OrgName(id);

  return {
    props: {
      budgetData,
      orgCurrencie,
      orgname,
    },
  };
}
