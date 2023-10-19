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
import ActionBtn from "@/components/ActionBtn";
import Check from "@/pages/api/Helper/Check";
import Table2ExcelMinJs from "../../load_js/plugin/table2excel.min.js";
import Table2Excel from "../../load_js/controllers/table2excel";
import GetMonthName from "@/pages/api/Helper/GetMonthName";
import GetFullYear from "@/pages/api/Helper/GetFullYear";
import OrgName from "@/pages/api/Helper/OrgName";
import AddModalTableBtn from "@/components/AddModalTableBtn";
import { decrypt } from "n-krypta";
import AccessKey from "../../../pages/api/AccessKey";
import Cookies from "js-cookie";

export default function Payments(props: any) {
  const { paymentData, orgCurrencie, orgname } = props;

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
        <title>HCM | Payments</title>
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
                    {(roleSuperAdmin === 1 ||
                      roleAdmin === 1 ||
                      roleCreator === 1) && <AddModalTableBtn />}
                    {/*<!-- end table btn group -->*/}

                    <table
                      id="printable"
                      className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark"
                    >
                      <caption>Payment Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={10}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Payment</b>
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
                          <th scope="col"> Invoice ID</th>
                          <th scope="col"> Client</th>
                          <th scope="col">Payment Type</th>
                          <th scope="col">Paid Date</th>
                          <th scope="col">
                            Paid Amount
                            <span className="pill">{orgCurrencie}</span>
                          </th>
                          {(roleSuperAdmin === 1 ||
                            roleAdmin === 1 ||
                            roleCreator === 1) && <th scope="col"> Action </th>}
                        </tr>
                      </thead>
                      <tbody>
                        {paymentPaginateInfo?.data?.map((data: any) => (
                          <tr key={data.payment_id}>
                            <td>{data.invoice_id + process.env.INVOICE_ID}</td>
                            <td>{data.client_name}</td>
                            <td className="debit text-success text-end">
                              {data.payment_method}
                            </td>
                            <td className="debit text-success text-end">
                              {data.paid_date}
                            </td>
                            <td className="credit text-success text-end">
                              {data.paid_amount}
                              <span className="text-secondary ">/-</span>
                            </td>
                            {/* <td className="text-center">
                              <ActionBtn
                                modalid={data.payment_id}
                                deleteFunc={DeleteItem}
                                deleteurl={`/delete/hcm/payment/info/${data.payment_id}`}
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
                                  modalid={data.user_id}
                                  deleteFunc={DeleteItem}
                                  deleteurl={`/delete/emp/report/info/${data.user_id}`}
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
                          <td colSpan={4}>total</td>
                          <td className="text-end">
                            <span className="text-secondary me-2">=</span>
                            {totalAmount}
                            <span className="pill">{orgCurrencie}</span>
                          </td>

                          {(roleSuperAdmin === 1 ||
                            roleAdmin === 1 ||
                            roleCreator === 1) && <td> </td>}
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
      {/*<!-- start add modal -->*/}
      <div className="modal" id="add-modal">
        <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
          <div className="modal-content modal-content-bg">
            <div className="modal-header">
              <h1 className="text-caption">Add Payment</h1>
              <button
                className="btn-close bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit((data) =>
                  StoreItem(
                    "/store/hcm/payment/info",
                    data,
                    setLoader,
                    FetchPaginateInfo,
                    paginateUrl
                  )
                )}
              >
                <fieldset className="fieldset">
                  <legend>Payment</legend>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4  ">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-invoice-id"
                          title=" "
                          onKeyUp={() =>
                            Check(
                              "/check/invoice-id/info",
                              "add-invoice-id",
                              setCheckSign
                            )
                          }
                          {...register("invoice_id", { required: true })}
                        />
                        <label htmlFor="add-invoice-id" className="form-label">
                          Invoice ID
                          {checkSign === true ? (
                            <i className="fas fa fa-check ms-4 text-success"></i>
                          ) : (
                            <i className="fas fa fa-times ms-4 text-danger"></i>
                          )}
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.invoice_id?.type === "required" &&
                          "Invoice ID is required "}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 ">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-paid-amount"
                          title=" "
                          {...register("paid_amount", { required: true })}
                        />
                        <label htmlFor="add-paid-amount" className="form-label">
                          Paid Amount
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.paid_amount?.type === "required" &&
                          "Paid Amount is required "}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-payment-type"
                          title=" "
                          {...register("payment_type", { required: true })}
                        />
                        <label
                          htmlFor="add-payment-type"
                          className="form-label"
                        >
                          Payment type
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.payment_type?.type === "required" &&
                          "Payment type is required "}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-5">
                      <div className="form-date">
                        <label htmlFor="add-paid-date" className="form-label">
                          Paid Date
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
                          id="add-paid-date"
                          {...register("paid_date", { required: true })}
                        />
                      </div>
                      <div className="text-warning">
                        {errors.paid_date?.type === "required" &&
                          " Paid Date is required "}
                      </div>
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
      {paymentPaginateInfo?.data?.map((data: any) => (
        <div
          className="modal"
          id={`edit_modal_${data.payment_id}`}
          key={`edit_modal_${data.payment_id}`}
        >
          <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
            <div className="modal-content modal-content-bg">
              <div className="modal-header">
                <h1 className="text-caption">Edit Payment</h1>
                <button
                  className="btn-close  bg-light"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form id={`edit_form_${data.payment_id}`}>
                  <fieldset className="fieldset">
                    <legend>Payment</legend>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4  ">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-invoice-id_${data.payment_id}`}
                            title=" "
                            name="invoice_id"
                            defaultValue={
                              data.invoice_id + process.env.INVOICE_ID
                            }
                            readOnly={true}
                          />
                          <label
                            htmlFor={`edit-invoice-id_${data.payment_id}`}
                            className="form-label"
                          >
                            Invoice ID
                            <i className="fas fa fa-check ms-4 text-success"></i>
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 ">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`edit-paid-amount_${data.payment_id}`}
                            title=" "
                            name="paid_amount"
                            defaultValue={data.paid_amount}
                          />
                          <label
                            htmlFor={`edit-paid-amount_${data.payment_id}`}
                            className="form-label"
                          >
                            Paid Amount
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-payment-type_${data.payment_id}`}
                            title=" "
                            name="payment_type"
                            defaultValue={data.payment_method}
                          />
                          <label
                            htmlFor={`edit-payment-type_${data.payment_id}`}
                            className="form-label"
                          >
                            Payment type
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-5">
                        <div className="form-date">
                          <label
                            htmlFor={`edit-paid-date_${data.payment_id}`}
                            className="form-label"
                          >
                            Paid Date
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.paid_date}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`edit-paid-date_${data.payment_id}`}
                            name="paid_date"
                            defaultValue={data.paid_date}
                          />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  {/*<!-- end product order -->*/}

                  {/*<!-- start payment order -->*/}
                  <fieldset className="fieldset">
                    <legend>Update </legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                        <input type="hidden" name="orgid" value={OrgId()} />
                        <input
                          type="hidden"
                          name="id"
                          value={data.payment_id}
                        />
                        {loader ? (
                          <Loader title="Update" />
                        ) : (
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                              UpdateInfo(`edit_form_${data.payment_id}`);
                            }}
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

  const paymentData = await FetchData(`/get/hcm/payment/info/${id}`);
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
