import Head from "next/head";
import Image from "next/image";
import { memo, useCallback, useEffect, useState } from "react";
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
import PaginateData from "@/pages/api/Helper/PaginateData";
import Loader from "@/components/Loader";
import OrgId from "@/pages/api/Helper/OrgId";
import FetchData from "@/pages/api/Helper/FetchData";
import PagingLink from "@/components/PagingLink";
import DeleteItem from "@/pages/api/Helper/DeleteItem";
import UpdateItem from "@/pages/api/Helper/UpdateItem";
import StoreItem from "@/pages/api/Helper/StoreItem";
import Table2ExcelMinJs from "../../load_js/plugin/table2excel.min.js";
import Table2Excel from "../../load_js/controllers/table2excel";
import OrgName from "@/pages/api/Helper/OrgName";
import GetMonthName from "@/pages/api/Helper/GetMonthName";
import GetFullYear from "@/pages/api/Helper/GetFullYear";
import AddModalTableBtn from "@/components/AddModalTableBtn";
import ActionBtn from "@/components/ActionBtn";
import { decrypt } from "n-krypta";
import AccessKey from "../../../pages/api/AccessKey";
import Cookies from "js-cookie";

function GoodsReceipNote(props: any) {
  const { goodsReceipNoteInfo, orgname } = props;
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
  const [goodsReceiptNotePaginateData, setGoodsReceiptNotePaginateData] =
    useState(goodsReceipNoteInfo);
  const [paginateUrl, setPaginateUrl] = useState(
    goodsReceipNoteInfo?.links[1].url
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const FetchPaginateInfo = useCallback(async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setGoodsReceiptNotePaginateData(res);
    }
  }, []);

  const UpdateInfo = useCallback(async (target: any) => {
    const data = $(`#${target}`).serializeArray();

    const formData = JSON.stringify({
      date: data[0].value,
      category: data[1].value,
      src_code: data[2].value,
      item_code: data[3].value,
      uom: data[4].value,
      po_qty: data[5].value,
      supplier_dc_qty: data[6].value,
      actual_rec_qty: data[7].value,
      short_qty: data[8].value,
      transac_qty: data[9].value,
      rejected_qty: data[10].value,
      capital_expense: data[11].value,
      orgid: data[12].value,
      id: data[13].value,
    });
    UpdateItem(
      "/update/ivm/goods/receipt/info",
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
        <title>IVM | Goods receipt note</title>
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
                      <caption>Goods Receipt Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={14}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Goods Receipt Note</b>
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
                          <th scope="col">Source Code</th>
                          <th scope="col">Item Code</th>
                          <th scope="col"> UOM </th>
                          <th scope="col"> PO Qty. </th>
                          <th scope="col"> Supplier Dc Qty. </th>
                          <th scope="col"> Actual Rec. Qty. </th>
                          <th scope="col"> Short Qty. </th>
                          <th scope="col"> Transaction Qty. </th>
                          <th scope="col"> Rejected Qty. </th>
                          <th scope="col"> Capital Expense. </th>
                          <th scope="col"> Entry Date </th>
                          {(roleSuperAdmin === 1 ||
                            roleAdmin === 1 ||
                            roleCreator === 1) && <th scope="col"> Action </th>}
                        </tr>
                      </thead>
                      <tbody>
                        {goodsReceiptNotePaginateData?.data?.map(
                          (data: any, index: any) => (
                            <tr key={data.goods_receipt_note_id}>
                              <td className="debit  text-end">{index + 1}</td>
                              <td className="debit text-info text-end">
                                {data.source_code}
                              </td>
                              <td className="credit text-info text-end">
                                {data.item_code}
                              </td>
                              <td className="credit text-light text-end">
                                {data.uom}
                              </td>
                              <td className="credit text-light text-end">
                                {data.product_qnty}
                              </td>
                              <td className="credit text-success text-end">
                                {data.product_qnty}
                              </td>
                              <td className="credit text-success text-end">
                                {data.actual_receipt_qnty}
                              </td>
                              <td className="credit text-success text-end">
                                {data.short_qnty}
                              </td>
                              <td className="credit text-success text-end">
                                {data.transaction_qnty}
                              </td>
                              <td className="credit text-success text-end">
                                {data.rejected_qnty}
                              </td>
                              <td className="credit text-success text-end">
                                {data.capital_expense}
                                <span className="text-secondary ">/-</span>
                              </td>
                              <td className="credit text-success text-end">
                                {data.entry_date}
                              </td>
                              {/* <td>
                                <button
                                  type="button"
                                  className="btn bg-transparent text-success btn-sm"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#edit_modal_${data.goods_receipt_note_id}`}
                                >
                                  <i className="fas fa fa-edit"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn bg-transparent text-danger btn-sm"
                                  onClick={() => {
                                    DeleteItem(
                                      `/delete/ivm/goods/receipt/info/${data.goods_receipt_note_id}`,
                                      paginateUrl,
                                      FetchPaginateInfo
                                    );
                                  }}
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
                                    modalid={data.goods_receipt_note_id}
                                    deleteFunc={DeleteItem}
                                    deleteurl={`/delete/ivm/goods/receipt/info/${data.goods_receipt_note_id}`}
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
                      pageInfo={goodsReceiptNotePaginateData}
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
              <h1 className="text-caption">Add Goods Receipt</h1>
              <button
                className="btn-close bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit((data) =>
                  StoreItem(
                    "/store/ivm/goods/receipt/info",
                    data,
                    setLoader,
                    FetchPaginateInfo,
                    paginateUrl
                  )
                )}
              >
                <fieldset className="fieldset">
                  <legend>Product Info.</legend>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-date">
                        <label htmlFor="add-po-date" className="form-label">
                          Date.
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
                          id="add-date"
                          {...register("date", { required: true })}
                        />
                      </div>
                      <div className="text-warning">
                        {errors.date?.type === "required" && "Date is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-category"
                          title=" "
                          {...register("category", { required: true })}
                        />
                        <label htmlFor="add-category" className="form-label">
                          Category
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.category?.type === "required" &&
                          "Category is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          min={1}
                          placeholder=" "
                          className="form-input"
                          id="add-src_code"
                          title=" "
                          {...register("src_code", { required: true })}
                        />
                        <label htmlFor="add-src_code" className="form-label">
                          Source Code
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.src_code?.type === "required" &&
                          "Source code is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          min={1}
                          placeholder=" "
                          className="form-input"
                          id="add-item-no"
                          title=" "
                          {...register("item_code", { required: true })}
                        />
                        <label htmlFor="add-item-no" className="form-label">
                          Item Code
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.item_code?.type === "required" &&
                          " Item Code is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          min={1}
                          placeholder=" "
                          className="form-input"
                          id="add-uom"
                          title=" "
                          {...register("uom", { required: true })}
                        />
                        <label htmlFor="add-uom" className="form-label">
                          UoM
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.uom?.type === "required" && "UoM is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          min={1}
                          placeholder=" "
                          className="form-input"
                          id="add-po-qty"
                          title=" "
                          {...register("po_qty", { required: true })}
                        />
                        <label htmlFor="add-po-qty" className="form-label">
                          PO. Qty
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.po_qty?.type === "required" &&
                          "PO. Qty is required"}
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          min={1}
                          placeholder=" "
                          className="form-input"
                          id="add-supplier-dc-qty"
                          title=" "
                          {...register("supplier_dc_qty", { required: true })}
                        />
                        <label
                          htmlFor="add-supplier-dc-qty"
                          className="form-label"
                        >
                          Supplier Dc Qty.
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.supplier_dc_qty?.type === "required" &&
                          "Supplier Dc Qty is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          min={1}
                          placeholder=" "
                          className="form-input"
                          id="add-actual-rec-qty"
                          title=" "
                          {...register("actual_rec_qty", { required: true })}
                        />
                        <label
                          htmlFor="add-actual-rec-qty"
                          className="form-label"
                        >
                          Actual Rec. Qty.
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.actual_rec_qty?.type === "required" &&
                          "Actual Rec. Qty is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          min={1}
                          placeholder=" "
                          className="form-input"
                          id="add-short-qty"
                          title=" "
                          {...register("short_qty", { required: true })}
                        />
                        <label htmlFor="add-short-qty" className="form-label">
                          Short Qty
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.short_qty?.type === "required" &&
                          "Short Qty is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          min={1}
                          placeholder=" "
                          className="form-input"
                          id="add-transc-qty"
                          title=" "
                          {...register("transac_qty", { required: true })}
                        />
                        <label htmlFor="add-transc-qty" className="form-label">
                          Transaction Qty.
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.transac_qty?.type === "required" &&
                          "Transaction Qty is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          min={1}
                          placeholder=" "
                          className="form-input"
                          id="add-rejected-qty"
                          title=" "
                          {...register("rejected_qty")}
                        />
                        <label
                          htmlFor="add-rejected-qty"
                          className="form-label"
                        >
                          Rejected Qty.
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
                          id="add-capital-expense"
                          title=" "
                          {...register("capital_expense", { required: true })}
                        />
                        <label
                          htmlFor="add-capital-expense"
                          className="form-label"
                        >
                          Capital Expense.
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.capital_expense?.type === "required" &&
                          "Capital Expense is required"}
                      </div>
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end product order -->*/}

                {/* <!-- start payment order -->*/}
                <fieldset className="fieldset">
                  <legend>Save all information</legend>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-ref-name"
                          title=" "
                          {...register("reference_name", { required: true })}
                        />
                        <label htmlFor="add-ref-name" className="form-label">
                          Reference name
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.reference_name?.type === "required" &&
                          "Reference name is required"}
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <label htmlFor="add-reason" className="text-light">
                        Reason
                      </label>
                      <textarea
                        className="form-control"
                        id="add-reason"
                        cols={30}
                        rows={10}
                        style={{ height: 100 + "px" }}
                        {...register("reason")}
                      ></textarea>
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
      {goodsReceiptNotePaginateData?.data?.map((data: any, index: any) => (
        <div
          className="modal"
          id={`edit_modal_${data.goods_receipt_note_id}`}
          key={`edit_modal_${data.goods_receipt_note_id}`}
        >
          <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
            <div className="modal-content modal-content-bg">
              <div className="modal-header">
                <h1 className="text-caption">Edite Goods Receipt</h1>
                <button
                  className="btn-close  bg-light"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form id={`edit_form_${data.goods_receipt_note_id}`}>
                  <fieldset className="fieldset">
                    <legend>Product Info.</legend>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-date">
                          <label
                            htmlFor={`edit_po-date_${data.goods_receipt_note_id}`}
                            className="form-label"
                          >
                            Date.
                          </label>
                          <h6 className="overlap-date-title text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.entry_date}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`edit_date_${data.goods_receipt_note_id}`}
                            name="date"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit_category_${data.goods_receipt_note_id}`}
                            title=" "
                            name="category"
                            defaultValue={data.cat_name}
                          />
                          <label
                            htmlFor={`edit_category_${data.goods_receipt_note_id}`}
                            className="form-label"
                          >
                            Category
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
                            id={`edit_src_code_${data.goods_receipt_note_id}`}
                            title=" "
                            name="src_code"
                            defaultValue={data.source_code}
                          />
                          <label
                            htmlFor={`edit_src_code_${data.goods_receipt_note_id}`}
                            className="form-label"
                          >
                            Source Code
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
                            id={`edit_item-no_${data.goods_receipt_note_id}`}
                            title=" "
                            name="item_code"
                            defaultValue={data.item_code}
                          />
                          <label
                            htmlFor={`edit_item-no_${data.goods_receipt_note_id}`}
                            className="form-label"
                          >
                            Item Code
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
                            id={`edit_uom_${data.goods_receipt_note_id}`}
                            title=" "
                            name="uom"
                            defaultValue={data.uom}
                          />
                          <label
                            htmlFor={`edit_uom_${data.goods_receipt_note_id}`}
                            className="form-label"
                          >
                            UoM
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
                            id={`edit_po-qty_${data.goods_receipt_note_id}`}
                            title=" "
                            name="po_qty"
                            defaultValue={data.product_qnty}
                          />
                          <label
                            htmlFor={`edit_po-qty_${data.goods_receipt_note_id}`}
                            className="form-label"
                          >
                            PO. Qty
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
                            id={`edit_supplier-dc-qty_${data.goods_receipt_note_id}`}
                            title=" "
                            name="supplier_dc_qty"
                            defaultValue={data.supplier_dc_qty}
                          />
                          <label
                            htmlFor={`edit_supplier-dc-qty_${data.goods_receipt_note_id}`}
                            className="form-label"
                          >
                            Supplier Dc Qty.
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
                            id={`edit_actual-rec-qty_${data.goods_receipt_note_id}`}
                            title=" "
                            name="actual_rec_qty"
                            defaultValue={data.actual_receipt_qnty}
                          />
                          <label
                            htmlFor={`edit_actual-rec-qty_${data.goods_receipt_note_id}`}
                            className="form-label"
                          >
                            Actual Rec. Qty.
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
                            id={`edit_short-qty_${data.goods_receipt_note_id}`}
                            title=" "
                            name="short_qty"
                            defaultValue={data.short_qnty}
                          />
                          <label
                            htmlFor={`edit_short-qty_${data.goods_receipt_note_id}`}
                            className="form-label"
                          >
                            Short Qty
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
                            id={`edit_transc-qty_${data.goods_receipt_note_id}`}
                            title=" "
                            name="transac_qty"
                            defaultValue={data.transaction_qnty}
                          />
                          <label
                            htmlFor={`edit_transc-qty_${data.goods_receipt_note_id}`}
                            className="form-label"
                          >
                            Transaction Qty.
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
                            id={`edit_rejected-qty_${data.goods_receipt_note_id}`}
                            title=" "
                            name="rejected_qty"
                            defaultValue={data.rejected_qnty}
                          />
                          <label
                            htmlFor={`edit_rejected-qty_${data.goods_receipt_note_id}`}
                            className="form-label"
                          >
                            Rejected Qty.
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
                            id={`edit-capital-expense_${data.goods_receipt_note_id}`}
                            title=" "
                            name="capital_expense"
                            defaultValue={data.capital_expense}
                          />
                          <label
                            htmlFor={`edit_capital-expense_${data.goods_receipt_note_id}`}
                            className="form-label"
                          >
                            Capital Expense.
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  {/*<!-- end product order -->*/}

                  {/* <!-- start payment order -->*/}
                  <fieldset className="fieldset">
                    <legend>Update all information</legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                        <input
                          type="hidden"
                          {...register("orgid")}
                          value={OrgId()}
                        />
                        <input
                          type="hidden"
                          name="id"
                          value={data.goods_receipt_note_id}
                        />
                        {loader ? (
                          <Loader title="Update" />
                        ) : (
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                              UpdateInfo(
                                `edit_form_${data.goods_receipt_note_id}`
                              );
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
export default memo(GoodsReceipNote);
export async function getServerSideProps(context: any) {
  const id = context.query.v;
  const goodsReceipNoteInfo = await FetchData(
    `/get/ivm/goods/receipt/info/${id}`
  );

  const orgname = await OrgName(id);

  return {
    props: {
      goodsReceipNoteInfo,
      orgname,
    },
  };
}
