import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "@/components/Loader";
import OrgId from "./../../api/Helper/OrgId";
import FetchData from "./../../api/Helper/FetchData";
import PaginateData from "./../../api/Helper/PaginateData";
import PagingLink from "@/components/PagingLink";
import UpdateItem from "./../../api/Helper/UpdateItem";
import DeleteItem from "./../../api/Helper/DeleteItem";
import GetOrgCurrencies from "@/pages/api/PreloadOrgInfo/GetOrgCurrencies";
import ActionBtn from "@/components/ActionBtn";
import GetMonthName from "@/pages/api/Helper/GetMonthName";
import GetFullYear from "@/pages/api/Helper/GetFullYear";
import OrgName from "@/pages/api/Helper/OrgName";
import AddModalTableBtn from "@/components/AddModalTableBtn";
import { decrypt } from "n-krypta";
import AccessKey from "../../../pages/api/AccessKey";
import Cookies from "js-cookie";

export default function ExpensesReport(props: any) {
  const { expensesData, orgCurrencie, orgname } = props;

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
  const [expensesPaginateInfo, setExpensesPaginateInfo] =
    useState(expensesData);
  const [paginateUrl, setPaginateUrl] = useState(expensesData?.links[1].url);
  const [totalAmount, setTotalAmount] = useState(0);

  const FetchPaginateInfo = async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setExpensesPaginateInfo(res);
    }
  };

  useEffect(() => {
    var total = 0;
    expensesPaginateInfo?.data?.map((data: any) => {
      total += data.amount;
    });
    setTotalAmount(total);
  }, [totalAmount, expensesPaginateInfo, expensesData, paginateUrl]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const UpdateInfo = async (target: any) => {
    const data = $(`#${target}`).serializeArray();
    console.warn(data);

    const formData = JSON.stringify({
      item_title: data[0].value,
      purchase_from: data[1].value,
      purchase_date: data[2].value,
      purchase_by: data[3].value,
      paid_by: data[4].value,
      amount: data[5].value,
      status: data[6].value,
      orgid: data[7].value,
      id: data[8].value,
    });
    UpdateItem(
      "/update/hcm/expenses/info",
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
        <title>HCM | Expenses Report</title>
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
                      <caption>Expenses Report Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={11}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Expenses Report</b>
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
                          <th scope="col">Expenses Code</th>
                          <th scope="col">Item</th>
                          <th scope="col">Purchase From</th>
                          <th scope="col">Purchase Date</th>
                          <th scope="col">Purchase By</th>
                          <th scope="col">Amount &#40; {orgCurrencie} &#41;</th>
                          <th scope="col">Paid By</th>
                          <th scope="col"> Status </th>
                          {(roleSuperAdmin === 1 ||
                            roleAdmin === 1 ||
                            roleCreator === 1) && <th scope="col"> Action </th>}
                        </tr>
                      </thead>
                      <tbody>
                        {expensesPaginateInfo?.data?.map((data: any) => (
                          <tr key={data.expenses_id}>
                            <td>
                              {data.expenses_id + process.env.EXPENSES_ID}
                            </td>
                            <td>{data.item_name}</td>
                            <td>{data.purchase_from}</td>
                            <td className="debit text-success text-end">
                              {data.purchase_date}
                            </td>
                            <td className="debit text-danger text-end">
                              {data.purchase_by}
                            </td>
                            <td className="credit text-success text-end">
                              {data.amount}
                              <span className="text-secondary">/-</span>
                            </td>
                            <td className="credit text-success text-end">
                              {data.paid_by}
                            </td>
                            <td className="credit text-success text-center">
                              <span
                                className={`badge rounded 
                                ${data.status === "accepted" && "bg-success"}
                                ${data.status === "approved" && "bg-success"}
                                ${data.status === "in-process" && "bg-danger"}
                                ${
                                  data.status === "release-from-approve" &&
                                  "bg-info"
                                }
                                ${
                                  data.status === "partial-approve" &&
                                  "bg-secondary"
                                }
                                ${data.status === "discuss" && "bg-info"}
                              `}
                              >
                                {data.status}
                              </span>{" "}
                            </td>
                            {/* <td className="text-center">
                              <ActionBtn
                                modalid={data.expenses_id}
                                deleteFunc={DeleteItem}
                                deleteurl={`/delete/hcm/expenses/info/${data.expenses_id}`}
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
                                  modalid={data.expenses_id}
                                  deleteFunc={DeleteItem}
                                  deleteurl={`/delete/hcm/expenses/info/${data.expenses_id}`}
                                  paginateUrl={paginateUrl}
                                  FetchPaginateInfo={FetchPaginateInfo}
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
                          <td colSpan={5}>Total</td>
                          <td className="text-end text-success">
                            <span className="text-secondary me-1">=</span>
                            {totalAmount}
                            <span className="pill">{orgCurrencie}</span>
                          </td>
                          <td colSpan={3}> </td>
                        </tr>
                      </tfoot>
                    </table>
                    {/* start paginate  */}
                    <PagingLink
                      pageInfo={expensesPaginateInfo}
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
      {expensesPaginateInfo?.data?.map((data: any) => (
        <div
          className="modal"
          id={`edit_modal_${data.expenses_id}`}
          key={`edit_modal_${data.expenses_id}`}
        >
          <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
            <div className="modal-content modal-content-bg">
              <div className="modal-header">
                <h1 className="text-caption">Edite Expenses</h1>
                <button
                  className="btn-close  bg-light"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form id={`edit_form_${data.expenses_id}`}>
                  <fieldset className="fieldset">
                    <legend>Product</legend>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-item_${data.expenses_id}`}
                            title=" "
                            name="item_title"
                            defaultValue={data.title_name}
                          />
                          <label
                            htmlFor={`edit-item_${data.expenses_id}`}
                            className="form-label"
                          >
                            Item title
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-purchase-from_${data.expenses_id}`}
                            title=" "
                            name="purchase_from"
                            defaultValue={data.purchase_from}
                          />
                          <label
                            htmlFor={`edit-purchase-from_${data.expenses_id}`}
                            className="form-label"
                          >
                            Purchase From
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-5">
                        <div className="form-date">
                          <label
                            htmlFor={`edit-purchase-date_${data.expenses_id}`}
                            className="form-label"
                          >
                            Purchase Date.
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.purchase_date}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`edit-purchase-date_${data.expenses_id}`}
                            name="purchase_date"
                            defaultValue={data.purchase_date}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-5">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-purchase-by_${data.expenses_id}`}
                            title=" "
                            name="purchase_by"
                            defaultValue={data.purchase_by}
                          />
                          <label
                            htmlFor={`edit-purchase-by_${data.expenses_id}`}
                            className="form-label"
                          >
                            Purchase By
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-paid-by_${data.expenses_id}`}
                            title=" "
                            list="paid_list"
                            name="paid_by"
                            defaultValue={data.paid_by}
                          />
                          <label
                            htmlFor={`edit-paid-by_${data.expenses_id}`}
                            className="form-label"
                          >
                            Paid By
                          </label>
                          <datalist id="paid_list">
                            <option value="Cash" />
                            <option value="Card" />
                            <option value="Hand to Hand" />
                            <option value="Online payment" />
                          </datalist>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`edit-amount_${data.expenses_id}`}
                            title=" "
                            name="amount"
                            defaultValue={data.amount}
                          />
                          <label
                            htmlFor={`edit-amount_${data.expenses_id}`}
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
                    <legend>Save </legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                        <label
                          htmlFor={`edit-cur-status_${data.expenses_id}`}
                          className="text-light"
                        >
                          Current status
                        </label>
                        <select
                          id={`edit-cur-status_${data.expenses_id}`}
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
                        <input type="hidden" name="orgid" value={OrgId()} />
                        <input
                          type="hidden"
                          name="id"
                          value={data.expenses_id}
                        />
                        {loader ? (
                          <Loader title="Update" />
                        ) : (
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() =>
                              UpdateInfo(`edit_form_${data.expenses_id}`)
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

  const expensesData = await FetchData(`/get/hcm/expenses/info/${id}`);
  const orgCurrencie = await GetOrgCurrencies(id);
  const orgname = await OrgName(id);

  return {
    props: {
      expensesData,
      orgCurrencie,
    },
  };
}
