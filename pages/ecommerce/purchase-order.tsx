import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useEffect, useState } from "react";
import Header from "./../../components/Header";
import Aside from "./../../components/Aside";
import ToggleOption from "./../../components/ToggleOption";
import Footer from "./../../components/Footer";
import TablePrint from "@/components/TablePrint";
import TableFilter from "@/components/TableFilter";
import JqueryMin from "./../load_js/plugin/jquery.min.js";
import AsidejQuery from "./../load_js/controllers/AsidejQuery";
import FullScreenMode from "./../load_js/controllers/FullScreenMode";
import ImagePreview from "./../load_js/controllers/ImagePreview";
import PrintMin from "./../load_js/controllers/PrintMin";
import JqueryUiMin from "./../load_js/plugin/JqueryUiMin";
import DraggElements from "./../load_js/controllers/DraggElements";
import PickDate from "./../load_js/controllers/PickDate";
import SweetDeleteAlert from "./../load_js/controllers/SweetDeleteAlert";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import Loader from "@/components/Loader";
import OrgId from "../api/Helper/OrgId";
import FetchData from "../api/Helper/FetchData";
import PaginateData from "../api/Helper/PaginateData";
import PagingLink from "@/components/PagingLink";
import StoreItem from "../api/Helper/StoreItem";
import UpdateItem from "../api/Helper/UpdateItem";
import DeleteItem from "../api/Helper/DeleteItem";
import Table2ExcelMinJs from "./../load_js/plugin/table2excel.min.js";
import Table2Excel from "./../load_js/controllers/table2excel";
import OrgName from "../api/Helper/OrgName";
import GetOrgCurrencies from "../api/PreloadOrgInfo/GetOrgCurrencies";
import GetMonthName from "../api/Helper/GetMonthName";
import GetFullYear from "../api/Helper/GetFullYear";
import AddModalTableBtn from "@/components/AddModalTableBtn";
import ActionBtn from "@/components/ActionBtn";
import { decrypt } from "n-krypta";
import AccessKey from "../../pages/api/AccessKey";
import Cookies from "js-cookie";

function PurchaseOrder(props: any) {
  const { brands, categories, purchaseOrderInfo, orgname, orgCurrencie } =
    props;

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

  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle.min")
      : null;
  }, []);

  const [loader, setLoader] = useState(false);
  const [purchaseOrderPaginateData, setPurchaseOrderPaginateData] =
    useState(purchaseOrderInfo);
  const [paginateUrl, setPaginateUrl] = useState(
    purchaseOrderInfo?.links[1].url
  );

  useEffect(() => {}, [purchaseOrderPaginateData]);

  const FetchPaginateInfo = async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setPurchaseOrderPaginateData(res);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const UpdateInfo = useCallback(async (target: any) => {
    const data = $(`#${target}`).serializeArray();

    const formData = JSON.stringify({
      po_date: data[0].value,
      rfq: data[1].value,
      supplier: data[2].value,
      category: data[3].value,
      brand: data[4].value,
      title: data[5].value,
      quantity: data[6].value,
      price: data[7].value,
      note_to_vendor: data[8].value,
      discount: data[9].value,
      taxable: data[10].value,
      total_amount: data[11].value,
      due_amount: data[12].value,
      uom: data[13].value,
      due_date: data[14].value,
      status: data[15].value,
      orgid: data[16].value,
      id: data[17].value,
    });
    UpdateItem(
      "/update/ecm/purchase/order",
      formData,
      setLoader,
      FetchPaginateInfo,
      paginateUrl
    );
  }, []);
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ECM | Purchase Order</title>
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
                      <caption>Purchase Order Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={17}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Purchase Order</b>
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
                          <th scope="col">S.I</th>
                          <th scope="col">Category </th>
                          <th scope="col">Item</th>
                          <th scope="col"> UOM </th>
                          <th scope="col">
                            {" "}
                            Price<span className="pill">
                              {orgCurrencie}
                            </span>{" "}
                          </th>
                          <th scope="col"> Note To Vendor </th>
                          <th scope="col"> Discount %</th>
                          <th scope="col"> Taxable </th>
                          <th scope="col">
                            {" "}
                            Amount<span className="pill">
                              {orgCurrencie}
                            </span>{" "}
                          </th>
                          <th scope="col">
                            Due amount
                            <span className="pill">{orgCurrencie}</span>
                          </th>
                          <th scope="col"> Order date</th>
                          <th scope="col"> Due Paid date</th>
                          {(roleSuperAdmin === 1 ||
                            roleAdmin === 1 ||
                            roleCreator === 1) && <th scope="col"> Action </th>}
                        </tr>
                      </thead>
                      <tbody>
                        {purchaseOrderPaginateData?.data?.map(
                          (data: any, index: any) => (
                            <tr key={data.purchase_order_id}>
                              <td className="debit  text-end"> {index + 1}</td>
                              <td className="debit text-light text-start">
                                {data.cat_name}
                              </td>
                              <td className="credit text-light text-start">
                                {data.quantity}
                              </td>
                              <td className="credit text-light text-start">
                                {data.uom}
                              </td>
                              <td className="credit text-success text-end">
                                {data.price}
                                <span className="text-secondary ">/-</span>
                              </td>
                              <td className="credit text-success text-center">
                                {data.note_to_vendor}
                              </td>
                              <td className="credit text-success text-end">
                                {data.discount}
                              </td>
                              <td className="credit text-success text-end">
                                {data.taxable}
                              </td>

                              <td className="credit text-success text-end">
                                {data.amount}
                                <span className="text-secondary ">/-</span>
                              </td>
                              <td className="credit text-warning text-end">
                                {data.due_amount}
                                <span className="text-secondary ">/-</span>
                              </td>
                              <td className="credit text-light text-end">
                                {data.order_date}
                              </td>
                              <td className="credit text-warning text-end">
                                {data.due_date}
                              </td>

                              {/* <td>
                                <button
                                  type="button"
                                  className="btn bg-transparent text-success btn-sm"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#edit_modal_${data.purchase_order_id}`}
                                >
                                  <i className="fas fa fa-edit"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn bg-transparent text-danger btn-sm"
                                  onClick={() =>
                                    DeleteItem(
                                      `/delete/ecm/purchase/order/${data.purchase_order_id}`,
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
                                    modalid={data.purchase_order_id}
                                    deleteFunc={DeleteItem}
                                    deleteurl={`/delete/ecm/purchase/order/${data.purchase_order_id}`}
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
                    </table>
                    {/* start paginate */}
                    <PagingLink
                      pageInfo={purchaseOrderPaginateData}
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
              <h5 className="text-caption">Add Purchase Order</h5>
              <button
                className="btn-close  bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit((data) =>
                  StoreItem(
                    "/store/ecm/purchase/order",
                    data,
                    setLoader,
                    FetchPaginateInfo,
                    paginateUrl
                  )
                )}
                encType={"multipart/form-data"}
              >
                {/*<!-- start product order -->*/}
                <fieldset className="fieldset">
                  <legend>Product Order</legend>
                  <div className="row">
                    <div className="col-lg-6 mt-5">
                      <div className="form-date">
                        <label htmlFor="add-po-date" className="form-label">
                          P.O Date.
                        </label>
                        <h6 className="overlap-date-title text-light">
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
                          id="add-po-date"
                          {...register("po_date", { required: true })}
                        />
                      </div>
                      <div className="text-warning">
                        {errors.po_date?.type === "required" &&
                          "Date is required"}
                      </div>
                    </div>

                    <div className="col-lg-6  mt-5">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-frq-no"
                          {...register("rfq", { required: true })}
                        />
                        <label htmlFor="add-frq-no" className="form-label">
                          FRQ No.
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.rfq?.type === "required" &&
                          "RFQ no. is required"}
                      </div>
                    </div>

                    <div className="col-lg-6  mt-5">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-requisition-no"
                          {...register("requisition_no", { required: true })}
                        />
                        <label
                          htmlFor="add-requisition-no"
                          className="form-label"
                        >
                          Requisition No.
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.requisition_no?.type === "required" &&
                          "Requisition No. is required"}
                      </div>
                    </div>

                    <div className="col-lg-6  mt-5">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-supplier"
                          {...register("supplier", { required: true })}
                        />
                        <label htmlFor="add-supplier" className="form-label">
                          Supplier Name
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.supplier?.type === "required" &&
                          "Supplier is required"}
                      </div>
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end product order -->*/}
                {/*<!-- start product img and title -->*/}
                <fieldset className="fieldset">
                  <legend>Product</legend>
                  <div className="row">
                    <div className="col-lg-12 mb-5 ">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-category"
                          {...register("category", { required: true })}
                          list="category-list"
                        />
                        <label htmlFor="add-category" className="form-label">
                          Category
                        </label>
                        <datalist id="category-list">
                          {categories.map((data: any) => {
                            <option
                              key={data.category_id}
                              value={`${data.cat_name}`}
                            />;
                          })}
                        </datalist>
                      </div>
                      <div className="text-warning">
                        {errors.category?.type === "required" &&
                          "Category is required"}
                      </div>
                    </div>

                    <div className="col-lg-12  mb-5">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-brand"
                          {...register("brand", { required: true })}
                          list="brand-list"
                        />
                        <label htmlFor="add-brand" className="form-label">
                          Brand
                        </label>

                        <datalist id="brand-list">
                          {brands.map((data: any) => {
                            <option
                              key={data.brand_id}
                              value={`${data.brand_name}`}
                            />;
                          })}
                        </datalist>
                      </div>
                      <div className="text-warning">
                        {errors.brand?.type === "required" &&
                          "Brand is required"}
                      </div>
                    </div>

                    <div className="col-lg-12  mb-5">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-title"
                          {...register("title", { required: true })}
                        />
                        <label htmlFor="add-title" className="form-label">
                          Title
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.title?.type === "required" &&
                          "Title is required"}
                      </div>
                    </div>

                    <div className="col-lg-6  mb-5">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-quantity"
                          {...register("quantity", { required: true })}
                        />
                        <label htmlFor="add-quantity" className="form-label">
                          Quantity
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.quantity?.type === "required" &&
                          "Quantity is required"}
                      </div>
                    </div>

                    <div className="col-lg-6  mb-5">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-price"
                          {...register("price", { required: true })}
                        />
                        <label htmlFor="add-price" className="form-label">
                          Price
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.price?.type === "required" &&
                          "Price is required"}
                      </div>
                    </div>

                    <div className="col-lg-12  mb-5  mt-2">
                      <div className="form-input-con">
                        <input
                          type="file"
                          className="form-control bg-transparent text-light reader"
                          id="add-file"
                          data-view="#img-preview"
                          {...register("file", { required: true })}
                        />
                        <label
                          htmlFor="add-file"
                          className="form-label text-light mb-3"
                        >
                          Product Img
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.file?.type === "required" &&
                          "Image is required"}
                      </div>
                      <div className="d-flex justify-content-center mt-4">
                        <Image
                          id="img-preview"
                          src="/organization/ecommerce.jpg"
                          width={150}
                          height={120}
                          alt="product"
                          className="rounded"
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end product img and title -->*/}
                {/*<!-- start payment order -->*/}
                <fieldset className="fieldset">
                  <legend>Payment Order</legend>
                  <div className="row">
                    <div className="col-lg-6 ">
                      <div className="form-input-con ">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-payment-terms"
                          {...register("payment_terms")}
                          list="payment-terms-list"
                        />
                        <label
                          htmlFor="add-payment-terms"
                          className="form-label"
                        >
                          Payment Terms
                        </label>
                        <datalist id="payment-terms-list">
                          <option value="Cash" />
                          <option value="Card" />
                          <option value="Bank" />
                        </datalist>
                      </div>
                    </div>

                    <div className="col-lg-6  mb-2">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-note-to-vendor"
                          {...register("note_to_vendor")}
                        />
                        <label
                          htmlFor="add-note-to-vendor"
                          className="form-label"
                        >
                          Note To Vendor
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-6  mt-5">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-discount"
                          {...register("discount")}
                        />
                        <label htmlFor="add-discount" className="form-label">
                          Discount %
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-6  mt-5">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-taxable"
                          {...register("taxable")}
                        />
                        <label htmlFor="add-taxable" className="form-label">
                          Include Tax %
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-6  mt-5 mb-2">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-total-amount"
                          {...register("total_amount", { required: true })}
                        />
                        <label
                          htmlFor="add-total-amount"
                          className="form-label"
                        >
                          Total Amount
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.total_amount?.type === "required" &&
                          "Amount is required"}
                      </div>
                    </div>

                    <div className="col-lg-6  mt-5 mb-2">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-due-amount"
                          {...register("due_amount")}
                        />
                        <label htmlFor="add-due-amount" className="form-label">
                          Due Amount
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-6  mt-5 mb-2">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-uom"
                          {...register("uom", { required: true })}
                        />
                        <label htmlFor="add-uom" className="form-label">
                          UOM
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.uom?.type === "required" && "UOM is required"}
                      </div>
                    </div>
                    <div className="col-lg-6 mt-5">
                      <div className="form-date">
                        <label htmlFor="add-po-date" className="form-label">
                          Due paid Date.
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
                          id="add-po-due-date"
                          {...register("due_date")}
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end payment  order -->*/}

                {/*<!-- start payment order -->*/}
                <fieldset className="fieldset">
                  <legend>Status</legend>
                  <div className="row">
                    <div className="col-lg-12 mb-4 ">
                      <select
                        id="add-cur-status"
                        className="form-select"
                        {...register("status", { required: true })}
                      >
                        <option value="">Select a status</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="process">Process</option>
                      </select>
                      <div className="text-warning">
                        {errors.status?.type === "required" &&
                          "Status is required"}
                      </div>
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end payment  order -->*/}
                {/*<!-- start payment order -->*/}
                <fieldset className="fieldset">
                  <legend>Save all information</legend>
                  <div className="row">
                    <div className="col-lg-12 mt-5 d-flex justify-content-center align-items-center">
                      <input
                        type="hidden"
                        {...register("orgid")}
                        defaultValue={OrgId()}
                      />
                      {loader ? (
                        <Loader title="Save" />
                      ) : (
                        <button
                          type="submit"
                          className="btn bg-success text-light"
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

      {/*<!-- start edit modal  -->*/}
      {purchaseOrderPaginateData?.data?.map((data: any, index: any) => (
        <div
          className="modal"
          key={`edit_modal_${data.purchase_order_id}`}
          id={`edit_modal_${data.purchase_order_id}`}
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
                <form
                  id={`edit_form_${data.purchase_order_id}`}
                  encType={"multipart/form-data"}
                >
                  {/*<!-- start product order -->*/}
                  <fieldset className="fieldset">
                    <legend>Product Order</legend>
                    <div className="row">
                      <div className="col-lg-6 mt-5">
                        <div className="form-date">
                          <label
                            htmlFor={`edit-po-date_${data.purchase_order_id}`}
                            className="form-label"
                          >
                            P.O Date.
                          </label>
                          <h6 className="overlap-date-title text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.order_date}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`edit-po-date_${data.purchase_order_id}`}
                            name="po_date"
                            defaultValue={data.po_date}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6  mt-5">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-frq-no_${data.purchase_order_id}`}
                            name="rfq"
                            defaultValue={data.rfq}
                          />
                          <label
                            htmlFor={`edit-frq-no_${data.purchase_order_id}`}
                            className="form-label"
                          >
                            FRQ No.
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-6  mt-5">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-supplier_${data.purchase_order_id}`}
                            name="supplier"
                            defaultValue={data.supplier}
                          />
                          <label
                            htmlFor={`edit-supplier_${data.purchase_order_id}`}
                            className="form-label"
                          >
                            Supplier Name
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  {/*<!-- end product order -->*/}
                  {/*<!-- start product img and title -->*/}
                  <fieldset className="fieldset">
                    <legend>Product</legend>
                    <div className="row">
                      <div className="col-lg-12 mb-5 ">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-category_${data.purchase_order_id}`}
                            list={`edit_category-list_${data.purchase_order_id}`}
                            name="category"
                            defaultValue={data.cat_name}
                          />
                          <label
                            htmlFor={`edit-category_${data.purchase_order_id}`}
                            className="form-label"
                          >
                            Category
                          </label>
                          <datalist
                            id={`edit_category-list_${data.purchase_order_id}`}
                          >
                            {categories.map((data: any) => {
                              <option
                                key={data.category_id}
                                value={`${data.cat_name}`}
                              />;
                            })}
                          </datalist>
                        </div>
                      </div>

                      <div className="col-lg-12  mb-5">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-brand_${data.purchase_order_id}`}
                            list="brand-list"
                            name="brand"
                            defaultValue={data.purchase_order_id}
                          />
                          <label
                            htmlFor={`edit-brand_${data.purchase_order_id}`}
                            className="form-label"
                          >
                            Brand
                          </label>

                          <datalist id="brand-list">
                            {brands.map((data: any) => {
                              <option
                                key={data.brand_id}
                                value={`${data.brand_name}`}
                              />;
                            })}
                          </datalist>
                        </div>
                      </div>

                      <div className="col-lg-12  mb-5">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-title_${data.purchase_order_id}`}
                            name="title"
                            defaultValue={data.product_title}
                          />
                          <label
                            htmlFor={`edit-title_${data.purchase_order_id}`}
                            className="form-label"
                          >
                            Title
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-6  mb-5">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`edit-quantity_${data.purchase_order_id}`}
                            name="quantity"
                            defaultValue={data.how_many_item}
                          />
                          <label
                            htmlFor={`edit-quantity_${data.purchase_order_id}`}
                            className="form-label"
                          >
                            Quantity
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-6  mb-5">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-price_${data.purchase_order_id}`}
                            name="price"
                            defaultValue={data.price}
                          />
                          <label
                            htmlFor={`edit-price_${data.purchase_order_id}`}
                            className="form-label"
                          >
                            Price
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  {/*<!-- end product img and title -->*/}
                  {/*<!-- start payment order -->*/}
                  <fieldset className="fieldset">
                    <legend>Payment Order</legend>
                    <div className="row">
                      <div className="col-lg-6  mb-2">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-note-to-vendor_${data.purchase_order_id}`}
                            name="note_to_vendor"
                            defaultValue={data.note_to_vendor}
                          />
                          <label
                            htmlFor={`edit-note-to-vendor_${data.purchase_order_id}`}
                            className="form-label"
                          >
                            Note To Vendor
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-6  mb-2">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`edit-discount_${data.purchase_order_id}`}
                            name="discount"
                            defaultValue={data.discount}
                          />
                          <label
                            htmlFor={`edit-discount_${data.purchase_order_id}`}
                            className="form-label"
                          >
                            Discount %
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-6  mt-5">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`edit-taxable_${data.purchase_order_id}`}
                            name="taxable"
                            defaultValue={data.taxable}
                          />
                          <label
                            htmlFor={`edit-taxable_${data.purchase_order_id}`}
                            className="form-label"
                          >
                            Include Tax %
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-6  mt-5 mb-2">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`edit-total-amount_${data.purchase_order_id}`}
                            name="total_amount"
                            defaultValue={data.amount}
                          />
                          <label
                            htmlFor={`edit-total-amount_${data.purchase_order_id}`}
                            className="form-label"
                          >
                            Total Amount
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-6  mt-5 mb-2">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`edit-due-amount_${data.purchase_order_id}`}
                            name="due_amount"
                            defaultValue={data.due_amount}
                          />
                          <label
                            htmlFor={`edit-due-amount_${data.purchase_order_id}`}
                            className="form-label"
                          >
                            Due Amount
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-6  mt-5 mb-2">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`edit-uom_${data.purchase_order_id}`}
                            name="uom"
                            defaultValue={data.uom}
                          />
                          <label
                            htmlFor={`edit-uom_${data.purchase_order_id}`}
                            className="form-label"
                          >
                            UOM
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 mt-5">
                        <div className="form-date">
                          <label
                            htmlFor={`edit-po-date_${data.purchase_order_id}`}
                            className="form-label"
                          >
                            Due paid Date.
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.due_date}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`edit-po-due-date_${data.purchase_order_id}`}
                            name="due_date"
                          />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  {/*<!-- end payment  order -->*/}

                  {/*<!-- start payment order -->*/}
                  <fieldset className="fieldset">
                    <legend>Status</legend>
                    <div className="row">
                      <div className="col-lg-12 mb-4 ">
                        <select
                          id={`edit-cur-status_${data.purchase_order_id}`}
                          className="form-select"
                          name="status"
                        >
                          <option value="">Select a status</option>
                          <option
                            value="approved"
                            selected={data.status === "approved" && true}
                          >
                            Approved
                          </option>
                          <option
                            value="pending"
                            selected={data.status === "pending" && true}
                          >
                            Pending
                          </option>
                          <option
                            value="process"
                            selected={data.status === "process" && true}
                          >
                            Process
                          </option>
                        </select>
                      </div>
                    </div>
                  </fieldset>
                  {/*<!-- end payment  order -->*/}
                  {/*<!-- start payment order -->*/}
                  <fieldset className="fieldset">
                    <legend>Save all information</legend>
                    <div className="row">
                      <div className="col-lg-12 mt-5 d-flex justify-content-center align-items-center">
                        <input
                          type="hidden"
                          name="orgid"
                          defaultValue={OrgId()}
                        />
                        <input
                          type="hidden"
                          name="id"
                          defaultValue={data.purchase_order_id}
                        />
                        {loader ? (
                          <Loader title="Save" />
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              UpdateInfo(`edit_form_${data.purchase_order_id}`)
                            }
                            className="btn bg-success text-light"
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
      {/* start script */}
      <JqueryMin />
      <AsidejQuery />
      <FullScreenMode />
      <PrintMin />
      <JqueryUiMin />
      <DraggElements />
      <PickDate />
      <SweetDeleteAlert />
      <ImagePreview />
      <Table2ExcelMinJs />
      <Table2Excel />
    </>
  );
}
export default memo(PurchaseOrder);
export async function getServerSideProps(context: any) {
  const id = context.query.v;

  const brands = await FetchData(`/get/brands/${id}`);
  const categories = await FetchData(`/get/category/${id}`);
  const purchaseOrderInfo = await FetchData(`/get/ecm/purchase/order/${id}`);
  const orgname = await OrgName(id);
  const orgCurrencie = await GetOrgCurrencies(id);

  return {
    props: {
      brands,
      categories,
      purchaseOrderInfo,
      orgname,
      orgCurrencie,
    },
  };
}
