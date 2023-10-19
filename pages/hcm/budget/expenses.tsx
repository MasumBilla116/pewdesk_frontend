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
import StoreItem from "../../api/Helper/StoreItem";
import UpdateItem from "../../api/Helper/UpdateItem";
import DeleteItem from "../../api/Helper/DeleteItem";
import GetOrgCurrencies from "@/pages/api/PreloadOrgInfo/GetOrgCurrencies";
import Check from "@/pages/api/Helper/Check";
import ActionBtn from "@/components/ActionBtn";
import OrgName from "@/pages/api/Helper/OrgName";
import GetMonthName from "@/pages/api/Helper/GetMonthName";
import GetFullYear from "@/pages/api/Helper/GetFullYear";
import AddModalTableBtn from "@/components/AddModalTableBtn";
import { decrypt } from "n-krypta";
import AccessKey from "../../../pages/api/AccessKey";
import Cookies from "js-cookie";

export default function Expenses(props: any) {
  const { categoriesData, budgetExpensesData, orgCurrencie, orgname } = props;

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
  const [budgetExpensesPaginateInfo, setBudgetExpensesPaginateInfo] =
    useState(budgetExpensesData);
  const [paginateUrl, setPaginateUrl] = useState(
    budgetExpensesData?.links[1].url
  );
  const [totalAmount, stTotalAmount] = useState(0);
  const [checkSign, setCheckSign] = useState(false);
  const [subCategory, setSubCategory] = useState([]);
  const [updateSubCat, setUpdateSubCat] = useState([]);
  useEffect(() => {
    var total = 0;
    budgetExpensesPaginateInfo?.data?.map((data: any) => {
      total += data.amount;
    });
    stTotalAmount(total);
    setUpdateSubCat([]);
  }, [budgetExpensesPaginateInfo, paginateUrl, totalAmount]);

  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle.min")
      : null;
  }, []);

  const FetchPaginateInfo = async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setBudgetExpensesPaginateInfo(res);
    }
  };

  const GetSubCategory = async (event: any) => {
    const catid = event.target.value;
    const res = await FetchData(`/get/sub-category/${OrgId()}/${catid}`);
    setSubCategory(res);
  };

  const GetEditSubCategory = async (value: any) => {
    const res = await FetchData(`/get/sub-category/${OrgId()}/${value}`);
    setUpdateSubCat(res);
  };

  useEffect(() => {
    $("#add-main-category").on("change", function (e) {
      GetSubCategory(e);
    });
    $(".edit_main_cat").on("change", function (e) {
      GetEditSubCategory($(this).val());
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const UpdateInfo = async (target: any) => {
    const data = $(`#${target}`).serializeArray();

    const formData = JSON.stringify({
      budget_no: data[0].value,
      amount: data[1].value,
      category: data[2].value,
      sub_cat: data[3].value,
      revenue_date: data[4].value,
      note: data[5].value,
      orgid: data[6].value,
      id: data[7].value,
    });
    UpdateItem(
      "/update/hcm/budget/expenses/info",
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
        <title>HCM | Expenses</title>
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
                    {/*<!-- start table btn group -->*/}
                    {(roleSuperAdmin === 1 ||
                      roleAdmin === 1 ||
                      roleCreator === 1) && <AddModalTableBtn />}
                    {/*<!-- end table btn group -->*/}
                    <table
                      id="printable"
                      className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark"
                    >
                      <caption>Budget Expenses Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={10}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Budget Expenses</b>
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
                          <th scope="col">No.</th>
                          <th scope="col">Budget No.</th>
                          <th scope="col">Notes</th>
                          <th scope="col">Category Name</th>
                          <th scope="col">Sub-Category Name Date</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Expenses Date</th>
                          {(roleSuperAdmin === 1 ||
                            roleAdmin === 1 ||
                            roleCreator === 1) && <th scope="col"> Action </th>}
                        </tr>
                      </thead>
                      <tbody>
                        {budgetExpensesPaginateInfo?.data?.map(
                          (data: any, index: any) => (
                            <tr key={data.budget_expense_id}>
                              <td className="debit  text-end">{index + 1}</td>
                              <td className="debit  text-end text-primary">
                                {data.budget_id + process.env.BUDGET_ID}
                              </td>
                              <td className="debit text-light text-start">
                                {data.note}
                              </td>
                              <td className="credit text-light text-end">
                                {data.cat_name}
                              </td>
                              <td className="credit text-light text-end">
                                {data.sub_cat_name}
                              </td>
                              <td className="credit text-light text-end">
                                {data.amount}
                                <span className="text-secondary ">/-</span>
                              </td>
                              <td className="credit text-light text-end">
                                {data.revenue_date}
                              </td>
                              {/* <td>
                                <ActionBtn
                                  modalid={data.budget_expense_id}
                                  deleteFunc={DeleteItem}
                                  deleteurl={`/delete/hcm/budget/expenses/info/${data.budget_expense_id}`}
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
                                    modalid={data.budget_expense_id}
                                    deleteFunc={DeleteItem}
                                    deleteurl={`/delete/hcm/budget/expenses/info/${data.budget_expense_id}`}
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
                          <td colSpan={5}>total</td>
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
                      pageInfo={budgetExpensesPaginateInfo}
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
              <h1 className="text-caption">Add Budget Expenses</h1>
              <button
                className="btn-close bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit((data) =>
                  StoreItem(
                    "/store/hcm/budget/expenses/info",
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
                          id="add-budget-no"
                          title=" "
                          onKeyUp={() =>
                            Check(
                              "/check/hcm/budget/expenses/info",
                              "add-budget-no",
                              setCheckSign
                            )
                          }
                          {...register("budget_no", { required: true })}
                        />
                        <label htmlFor="add-budget-no" className="form-label">
                          Budget No
                          {checkSign === true ? (
                            <i className="fas fa fa-check ms-4 text-success"></i>
                          ) : (
                            <i className="fas fa fa-times ms-4 text-danger"></i>
                          )}
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.budget_no?.type === "required" &&
                          "Budget No is required"}
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
                          {...register("amount", { required: true })}
                        />
                        <label htmlFor="add-amount" className="form-label">
                          Amount
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.amount?.type === "required" &&
                          "Amount is required"}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <label htmlFor="add-main-category" className="text-light">
                        Category
                      </label>
                      <select
                        id="add-main-category"
                        className="form-select"
                        {...register("category", { required: true })}
                      >
                        <option value="">Select main-category</option>
                        {categoriesData?.map((data: any) => (
                          <option
                            key={data.category_id}
                            value={data.category_id}
                          >
                            {data.cat_name}
                          </option>
                        ))}
                      </select>
                      <div className="text-warning">
                        {errors.category?.type === "required" &&
                          "Category is required"}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <label htmlFor="add-sub-category" className="text-light">
                        Sub-category
                      </label>
                      <select
                        id="add-sub-category"
                        className="form-select"
                        {...register("sub_cat")}
                      >
                        <option value="">Select sub-category</option>
                        {subCategory?.map((data: any) => (
                          <option
                            key={data.sub_category_id}
                            value={data.sub_category_id}
                          >
                            {data.sub_cat_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-5">
                      <div className="form-date">
                        <label
                          htmlFor="add-expenses-date"
                          className="form-label"
                        >
                          Expenses Date
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
                          id="add-expenses-date"
                          {...register("expenses_date", { required: true })}
                        />
                      </div>
                      <div className="text-warning">
                        {errors.expenses_date?.type === "required" &&
                          "Expenses Date is required"}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <label htmlFor="add-note" className="text-light">
                        Note
                      </label>
                      <textarea
                        className="form-control"
                        id="add-note"
                        cols={30}
                        rows={10}
                        style={{ height: 120 + "px" }}
                        {...register("note")}
                      ></textarea>
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end product order -->*/}

                {/*<!-- start payment order -->*/}
                <fieldset className="fieldset">
                  <legend>Save</legend>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                      <input
                        type="hidden"
                        {...register("orgid")}
                        value={OrgId()}
                      />
                      {loader ? (
                        <Loader title="Save" />
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-success"
                          disabled={checkSign ? false : true}
                        >
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
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*<!-- end add modal -->*/}

      {/*<!-- start edit modal -->*/}
      {budgetExpensesPaginateInfo?.data?.map((data: any) => (
        <div
          className="modal"
          id={`edit_modal_${data.budget_expense_id}`}
          key={`edit_modal_${data.budget_expense_id}`}
        >
          <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
            <div className="modal-content modal-content-bg">
              <div className="modal-header">
                <h1 className="text-caption">Edit Budget Expenses</h1>
                <button
                  className="btn-close bg-light"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form id={`edit_form_${data.budget_expense_id}`}>
                  <fieldset className="fieldset">
                    <legend>Budget</legend>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-budget-no_${data.budget_expense_id}`}
                            title=" "
                            name="budget_no"
                            defaultValue={
                              data.budget_expense_id + process.env.BUDGET_ID
                            }
                            readOnly={true}
                          />
                          <label
                            htmlFor={`edit-budget-no_${data.budget_expense_id}`}
                            className="form-label"
                          >
                            Budget No
                            <i className="fas fa fa-check ms-4 text-success"></i>
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`edit-amount_${data.budget_expense_id}`}
                            title=" "
                            name="amount"
                            defaultValue={data.amount}
                          />
                          <label
                            htmlFor={`edit-amount_${data.budget_expense_id}`}
                            className="form-label"
                          >
                            Amount
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                        <label
                          htmlFor={`edit-main-category_${data.budget_expense_id}`}
                          className="text-light "
                        >
                          Category
                        </label>
                        <select
                          id={`edit-main-category_${data.budget_expense_id}`}
                          className="form-select edit_main_cat"
                          name="category"
                        >
                          <option value="">Select main-category</option>
                          {categoriesData?.map((cat: any) => (
                            <option
                              key={cat.category_id}
                              value={cat.category_id}
                              selected={
                                cat.category_id === data.category_id
                                  ? true
                                  : false
                              }
                            >
                              {cat.cat_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                        <label
                          htmlFor={`edit-sub-category_${data.budget_expense_id}`}
                          className="text-light"
                        >
                          Sub-category
                        </label>
                        <select
                          id={`edit-sub-category_${data.budget_expense_id}`}
                          className="form-select"
                          name="sub_cat"
                        >
                          {updateSubCat.length > 0 && (
                            <option value="">Select sub-category</option>
                          )}
                          {updateSubCat.length > 0 ? (
                            updateSubCat?.map((subcat: any) => (
                              <option
                                key={subcat.sub_category_id}
                                value={subcat.sub_category_id}
                                selected={
                                  subcat.sub_category_id ===
                                  data.sub_category_id
                                    ? true
                                    : false
                                }
                              >
                                {subcat.sub_cat_name}
                              </option>
                            ))
                          ) : (
                            <option value={data.sub_category_id}>
                              {data.sub_cat_name}
                            </option>
                          )}
                        </select>
                      </div>

                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-5">
                        <div className="form-date">
                          <label
                            htmlFor={`edit-expenses-date_${data.budget_expense_id}`}
                            className="form-label"
                          >
                            Expenses Date
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.revenue_date}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`edit-expenses-date_${data.budget_expense_id}`}
                            name="revenue_date"
                            defaultValue={data.revenue_date}
                          />
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                        <label
                          htmlFor={`edit-note_${data.budget_expense_id}`}
                          className="text-light"
                        >
                          Note
                        </label>
                        <textarea
                          className="form-control"
                          id={`edit-note_${data.budget_expense_id}`}
                          cols={30}
                          rows={10}
                          style={{ height: 120 + "px" }}
                          name="note"
                        >
                          {data.note}
                        </textarea>
                      </div>
                    </div>
                  </fieldset>
                  {/*<!-- end product order -->*/}

                  {/*<!-- start payment order -->*/}
                  <fieldset className="fieldset">
                    <legend>Update</legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                        <input type="hidden" name="orgid" value={OrgId()} />
                        <input
                          type="hidden"
                          name="id"
                          value={data.budget_expense_id}
                        />
                        {loader ? (
                          <Loader title="Update" />
                        ) : (
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() =>
                              UpdateInfo(`edit_form_${data.budget_expense_id}`)
                            }
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

export async function getServerSideProps(context: any) {
  const id = context.query.v;

  const categoriesData = await FetchData(`/get/category/${id}`);
  const budgetExpensesData = await FetchData(
    `/get/hcm/budget/expenses/info/${id}`
  );
  const orgCurrencie = await GetOrgCurrencies(context.query.v);
  const orgname = await OrgName(id);

  return {
    props: {
      categoriesData,
      budgetExpensesData,
      orgCurrencie,
      orgname,
    },
  };
}
