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
import PaginateData from "@/pages/api/Helper/PaginateData";
import Loader from "@/components/Loader";
import OrgId from "@/pages/api/Helper/OrgId";
import FetchData from "@/pages/api/Helper/FetchData";
import PagingLink from "@/components/PagingLink";
import DeleteItem from "@/pages/api/Helper/DeleteItem";
import UpdateItem from "@/pages/api/Helper/UpdateItem";
import StoreItem from "@/pages/api/Helper/StoreItem";
import Check from "@/pages/api/Helper/Check";
import { useForm } from "react-hook-form";
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

 function GoodsIssueNote(props: any) {
  const { goodsIssueData, orgname } = props;

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
  const [goodsIssueNotePaginateData, setGoodsIssuetNotePaginateData] =
    useState(goodsIssueData);
  const [paginateUrl, setPaginateUrl] = useState(goodsIssueData?.links[1].url);
  const [checkSign, setCheckSign] = useState(false);
  const [initCheckSign, setInitCheckSign] = useState(true);
  const [totalItem, setTotalItem] = useState(0);
  const [totalUom, setTotalUom] = useState(0);
  const [totalCurrentStock, setTotalCurrentStock] = useState(0);
  const [totalRequestedQnty, setTotalRequestedQnty] = useState(0);
  const [totalTransaction, setTotalTransaction] = useState(0);
  useEffect(() => {
    var cal_item = 0,
      cal_uom = 0,
      cal_stock = 0,
      cal_req_qnty = 0,
      cal_tran = 0;
    goodsIssueNotePaginateData?.data?.map((data: any) => {
      cal_item += data.product_qnty;
      cal_uom += data.uom;
      cal_stock += data.product_qnty;
      cal_req_qnty += data.requested_qnty;
      cal_tran += data.transaction_qnty;
    });
    setTotalItem(cal_item);
    setTotalUom(cal_uom);
    setTotalCurrentStock(cal_stock);
    setTotalRequestedQnty(cal_req_qnty);
    setTotalTransaction(cal_tran);
  }, [
    totalItem,
    totalCurrentStock,
    totalRequestedQnty,
    totalUom,
    totalTransaction,
    goodsIssueNotePaginateData,
  ]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const FetchPaginateInfo = useCallback(async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setGoodsIssuetNotePaginateData(res);
    }
  },[]);

  const UpdateInfo = useCallback(async (target: any) => {
    const data = $(`#${target}`).serializeArray();

    const formData = JSON.stringify({
      item_code: data[0].value,
      issue_date: data[1].value,
      reqs_qty: data[2].value,
      comment: data[3].value,
      orgid: data[4].value,
      id: data[5].value,
    });
    UpdateItem(
      "/update/ivm/goods/issue/info",
      formData,
      setLoader,
      FetchPaginateInfo,
      paginateUrl
    );
  },[]);

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>IVM | Goods Issu note</title>
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
                      className="font-13 erp-table-dark tbl-bg table table-bordered text-lightght table-dark"
                    >
                      <caption>Goods Issu Note Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={11}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Goods Issu Note</b>
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
                          <th scope="col">Category</th>
                          <th scope="col">Item</th>
                          <th scope="col"> UOM </th>
                          <th scope="col"> Item Code t </th>
                          <th scope="col">Current Stock </th>
                          <th scope="col"> Requested Qty. </th>
                          <th scope="col"> Transaction Qty. </th>
                          <th scope="col"> Comments </th>
                          <th scope="col"> Issue date</th>
                          {(roleSuperAdmin === 1 ||
                            roleAdmin === 1 ||
                            roleCreator === 1) && <th scope="col"> Action </th>}
                        </tr>
                      </thead>
                      <tbody>
                        {goodsIssueNotePaginateData?.data?.map(
                          (data: any, index: any) => (
                            <tr key={data.goods_issu_note_id}>
                              <td className="debit  text-end"> {index + 1}</td>
                              <td className="debit text-danger text-end">
                                {data.cat_name}
                              </td>
                              <td className="credit text-light text-end">
                                {data.product_qnty}
                              </td>
                              <td className="credit text-light text-end">
                                {data.uom}
                              </td>
                              <td className="credit text-light text-end">
                                {data.item_code}
                              </td>
                              <td className="credit text-success text-end">
                                {data.product_qnty}
                              </td>
                              <td className="credit text-success text-end">
                                {data.requested_qnty}
                              </td>
                              <td className="credit text-success text-end">
                                {data.transaction_qnty}
                              </td>

                              <td
                                className={`credit text-justify ${
                                  data.comments
                                    ? "text-light"
                                    : "text-secondary"
                                }`}
                              >
                                {data.comments ? data.comments : "No Comments"}
                              </td>
                              <td className="credit text-success text-end">
                                {data.issue_date}
                              </td>
                              {/* <td className=" ">
                                <button
                                  type="button"
                                  className="btn bg-transparent text-success btn-sm"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#edit_modal_${data.goods_issu_note_id}`}
                                >
                                  <i className="fas fa fa-edit"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn bg-transparent text-danger btn-sm"
                                  onClick={() => {
                                    DeleteItem(
                                      `/delete/ivm/goods/issue/info/${data.goods_issu_note_id}`,
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
                                    modalid={data.goods_issu_note_id}
                                    deleteFunc={DeleteItem}
                                    deleteurl={`/delete/ivm/goods/issue/info/${data.goods_issu_note_id}`}
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
                          <td colSpan={2}>Total</td>
                          <td className="text-end">
                            {totalItem} <span className="pill">item</span>
                          </td>
                          <td className="text-end">
                            {" "}
                            {totalUom} <span className="pill">uom</span>
                          </td>
                          <td className="text-end"></td>
                          <td className="text-end">
                            {totalCurrentStock}{" "}
                            <span className="pill">Qnty</span>
                          </td>
                          <td className="text-end">
                            {totalRequestedQnty}{" "}
                            <span className="pill">Qnty</span>
                          </td>
                          <td className="text-end">
                            {totalTransaction}{" "}
                            <span className="pill">Qnty</span>
                          </td>
                          <td colSpan={3}> </td>
                        </tr>
                      </tfoot>
                    </table>
                    {/* start paginate */}
                    <PagingLink
                      pageInfo={goodsIssueNotePaginateData}
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
              <h1 className="text-caption">Goods Issu</h1>
              <button
                className="btn-close bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit((data) =>
                  StoreItem(
                    "/store/ivm/goods/issue/info",
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
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-item-no"
                          title=" "
                          onKeyUp={() => {
                            Check(
                              "/check/ivm/goods/receipt/item-code",
                              "add-item-no",
                              setCheckSign
                            );
                          }}
                          {...register("item_code", { required: true })}
                        />
                        <label htmlFor="add-item-no" className="form-label">
                          Item Code
                          {checkSign === true ? (
                            <i className="fas fa fa-check ms-4 text-success"></i>
                          ) : (
                            <i className="fas fa fa-times ms-4 text-danger"></i>
                          )}
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.item_code?.type === "required" &&
                          "Item Code is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <div className="form-date">
                        <label htmlFor="add-issue_date" className="form-label">
                          Issue date
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
                          id="add-issue_date"
                          {...register("issue_date")}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-reqs-qty"
                          title=" "
                          {...register("reqs_qty", { required: true })}
                        />
                        <label htmlFor="add-reqs-qty" className="form-label">
                          Requested Qty.
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.reqs_qty?.type === "required" &&
                          "Requested Qnty. is required"}
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
                      <label htmlFor="add-comment" className="text-light">
                        Comments
                      </label>
                      <textarea
                        className="form-control"
                        id="add-comment"
                        cols={30}
                        rows={10}
                        style={{ height: 100 + "px" }}
                        {...register("comment")}
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
                        <button
                          type="submit"
                          className="btn btn-success"
                          disabled={checkSign ? false : true}
                        >
                          <i className="fas fa  fa-save me-2"></i>
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
      {goodsIssueNotePaginateData?.data?.map((data: any) => (
        <div
          className="modal"
          id={`edit_modal_${data.goods_issu_note_id}`}
          key={`edit_modal_${data.goods_issu_note_id}`}
        >
          <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
            <div className="modal-content modal-content-bg">
              <div className="modal-header">
                <h1 className="text-caption">Edit Goods Issu</h1>
                <button
                  className="btn-close  bg-light"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form id={`edit_form_${data.goods_issu_note_id}`}>
                  <fieldset className="fieldset">
                    <legend>Product Info.</legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-item-no_${data.goods_issu_note_id}`}
                            title=" "
                            onKeyUp={() => {
                              Check(
                                "/check/ivm/goods/receipt/item-code",
                                `edit-item-no_${data.goods_issu_note_id}`,
                                setInitCheckSign
                              );
                            }}
                            name="item_code"
                            defaultValue={data.item_code}
                          />
                          <label
                            htmlFor={`edit-item-no_${data.goods_issu_note_id}`}
                            className="form-label"
                          >
                            Item Code
                            {initCheckSign === true ? (
                              <i className="fas fa fa-check ms-4 text-success"></i>
                            ) : (
                              <i className="fas fa fa-times ms-4 text-danger"></i>
                            )}
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                        <div className="form-date">
                          <label
                            htmlFor={`edit-issue_date_${data.goods_issu_note_id}`}
                            className="form-label"
                          >
                            Issue date
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.issue_date}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`edit-issue_date_${data.goods_issu_note_id}`}
                            name="issue_date"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`edit-reqs-qty_${data.goods_issu_note_id}`}
                            title=" "
                            name="reqs_qty"
                            defaultValue={data.requested_qnty}
                          />
                          <label
                            htmlFor={`edit-reqs-qty_${data.goods_issu_note_id}`}
                            className="form-label"
                          >
                            Requested Qty.
                          </label>
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
                        <label
                          htmlFor={`edit-comment_${data.goods_issu_note_id}`}
                          className="text-light"
                        >
                          Comments
                        </label>
                        <textarea
                          className="form-control"
                          id={`edit-comment_${data.goods_issu_note_id}`}
                          cols={30}
                          rows={10}
                          style={{ height: 100 + "px" }}
                          name="comment"
                          defaultValue={data.comments}
                        ></textarea>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                        <input
                          type="hidden"
                          name="orgid"
                          defaultValue={OrgId()}
                        />
                        <input
                          type="hidden"
                          name="id"
                          defaultValue={data.goods_issu_note_id}
                        />
                        {loader ? (
                          <Loader title="Update" />
                        ) : (
                          <button
                            type="button"
                            className="btn btn-success"
                            disabled={initCheckSign ? false : true}
                            onClick={() =>
                              UpdateInfo(`edit_form_${data.goods_issu_note_id}`)
                            }
                          >
                            <i className="fas fa  fa-save me-2"></i>
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

export default memo(GoodsIssueNote);

export async function getServerSideProps(context: any) {
  const id = context.query.v;

  const goodsIssueData = await FetchData(`/get/ivm/goods/issue/info/${id}`);
  const orgname = await OrgName(id);

  return {
    props: {
      goodsIssueData,
      orgname,
    },
  };
}
