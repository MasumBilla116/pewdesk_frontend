import Head from "next/head";
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
import axios from "axios";
import swal from "sweetalert";
import Loader from "@/components/Loader";
import OrgId from "@/pages/api/Helper/OrgId";
import FetchData from "@/pages/api/Helper/FetchData";
import PagingLink from "@/components/PagingLink";
import DeleteItem from "@/pages/api/Helper/DeleteItem";
import UpdateItem from "@/pages/api/Helper/UpdateItem";
import StoreItem from "@/pages/api/Helper/StoreItem";
import Check from "@/pages/api/Helper/Check";
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

function GoodsReturnNote(props: any) {
  const { goodsReturnNoteInfo, orgname } = props;

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
    useState(goodsReturnNoteInfo);
  const [paginateUrl, setPaginateUrl] = useState(
    goodsReturnNoteInfo?.links[1].url
  );
  const [checkSign, setCheckSign] = useState(false);
  const [initCheckSign, setInitCheckSign] = useState(true);

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

  const store = (formData: any) => {
    setLoader(true);
    axios.get("sanctum/csrf-cookie").then((res) => {
      axios
        .post(`${process.env.BASE_URL}/store/ivm/goods/return/info`, formData)
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

  const UpdateInfo = useCallback(async (target: any) => {
    const data = $(`#${target}`).serializeArray();

    const formData = JSON.stringify({
      item_code: data[0].value,
      transac_uom: data[1].value,
      gin_balance: data[2].value,
      already_return_qnty: data[3].value,
      returned_qnty: data[4].value,
      orgid: data[5].value,
      id: data[6].value,
    });
    UpdateItem(
      "/update/ivm/goods/return/info",
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
        <title>IVM | Goods return note</title>
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
                      <caption>Goods Return Note Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={10}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Goods Return Note</b>
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
                          <th scope="col">Item / Status Code </th>
                          <th scope="col">Transaction UOM</th>
                          <th scope="col"> GIN Balance Qty. </th>
                          <th scope="col"> Already Return Qty. </th>
                          <th scope="col"> Returned Quantity </th>
                          {(roleSuperAdmin === 1 ||
                            roleAdmin === 1 ||
                            roleCreator === 1) && <th scope="col"> Action </th>}
                        </tr>
                      </thead>
                      <tbody>
                        {goodsReceiptNotePaginateData?.data?.map(
                          (data: any, index: any) => (
                            <tr key={data.ivm_goods_return_note_id}>
                              <td className="debit  text-end">{index + 1}</td>
                              <td className="debit text-light text-end">
                                {data.item_code}
                              </td>
                              <td className="credit text-light text-end">
                                <span className="badge bg-success rounded">
                                  {data.transaction_uom}
                                </span>
                              </td>
                              <td className="credit text-light text-end">
                                <span className="badge bg-success rounded">
                                  {data.gin_balance_qnty}
                                </span>
                              </td>
                              <td className="credit text-light text-end">
                                <span className="badge bg-danger rounded">
                                  {data.already_return_qnty}
                                </span>
                              </td>
                              <td className="credit text-light text-end">
                                <span className="badge bg-danger rounded">
                                  {data.returned_qnty}
                                </span>
                              </td>
                              {/* <td className=" ">
                                <button
                                  type="button"
                                  className="btn bg-transparent text-success btn-sm"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#edit_modal_${data.ivm_goods_return_note_id}`}
                                >
                                  <i className="fas fa fa-edit"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn bg-transparent text-danger btn-sm"
                                  onClick={() => {
                                    DeleteItem(
                                      `/delete/ivm/goods/return/info/${data.ivm_goods_return_note_id}`,
                                      paginateUrl,
                                      FetchPaginateInfo
                                    );
                                  }}
                                >
                                  <i className="fas fa fa-trash"></i>
                                </button> 
                              </td>*/}
                              {/* start actio btn*/}
                              {(roleSuperAdmin === 1 ||
                                roleAdmin === 1 ||
                                roleCreator === 1) && (
                                <td className="text-center">
                                  <ActionBtn
                                    modalid={data.ivm_goods_return_note_id}
                                    deleteFunc={DeleteItem}
                                    deleteurl={`/delete/ivm/goods/return/info/${data.ivm_goods_return_note_id}`}
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
              <h1 className="text-caption">Add Goods Return Note</h1>
              <button
                className="btn-close bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit((data) =>
                  StoreItem(
                    "/store/ivm/goods/return/info",
                    data,
                    setLoader,
                    FetchPaginateInfo,
                    paginateUrl
                  )
                )}
              >
                <fieldset className="fieldset">
                  <legend>Goods</legend>
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
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          min={1}
                          placeholder=" "
                          className="form-input"
                          id="add-transac-uom"
                          title=" "
                          {...register("transac_uom", { required: true })}
                        />
                        <label htmlFor="add-transac-uom" className="form-label">
                          Transaction UoM
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.transac_uom?.type === "required" &&
                          "Transaction UoM is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          min={1}
                          placeholder=" "
                          className="form-input"
                          id="add-gin-balance"
                          title=" "
                          {...register("gin_balance", { required: true })}
                        />
                        <label htmlFor="add-gin-balance" className="form-label">
                          GIN Balance Qty.
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.gin_balance?.type === "required" &&
                          "GIN Balance Qty. is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          min={1}
                          placeholder=" "
                          className="form-input"
                          id="add-already-return-qty"
                          title=" "
                          {...register("already_return_qnty")}
                        />
                        <label
                          htmlFor="add-already-return-qty"
                          className="form-label"
                        >
                          Already Return Qty.
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
                          id="add-returned-qty"
                          title=" "
                          {...register("returned_qnty", { required: true })}
                        />
                        <label
                          htmlFor="add-returned-qty"
                          className="form-label"
                        >
                          Returned Qty.
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.returned_qnty?.type === "required" &&
                          "Return Qnty. is required"}
                      </div>
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end product order -->*/}

                {/*<!-- start payment order -->*/}
                <fieldset className="fieldset">
                  <legend>Save all information</legend>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
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
      {goodsReceiptNotePaginateData?.data?.map((data: any, index: any) => (
        <div
          className="modal"
          id={`edit_modal_${data.ivm_goods_return_note_id}`}
          key={data.ivm_goods_return_note_id}
        >
          <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
            <div className="modal-content modal-content-bg">
              <div className="modal-header">
                <h1 className="text-caption">Edit Goods Return Note</h1>
                <button
                  className="btn-close  bg-light"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form id={`edit_form_${data.ivm_goods_return_note_id}`}>
                  <fieldset className="fieldset">
                    <legend>Goods</legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-item-no_${data.ivm_goods_return_note_id}`}
                            title=" "
                            onKeyUp={() =>
                              Check(
                                "/check/ivm/goods/receipt/item-code",
                                `edit-item-no_${data.ivm_goods_return_note_id}`,
                                setInitCheckSign
                              )
                            }
                            name="item_code"
                            defaultValue={data.item_code}
                          />
                          <label
                            htmlFor={`edit-item-no_${data.ivm_goods_return_note_id}`}
                            className="form-label"
                          >
                            Item Code
                            {initCheckSign === true ? (
                              <i className="fas fa fa-check ms-4 text-success"></i>
                            ) : (
                              <>
                                <i className="fas fa fa-times ms-4 text-danger"></i>
                              </>
                            )}
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
                            id={`edit-transac-uom_${data.ivm_goods_return_note_id}`}
                            title=" "
                            name="transac_uom"
                            defaultValue={data.transaction_uom}
                            onChange={() => {}}
                          />
                          <label
                            htmlFor={`edit-transac-uom_${data.ivm_goods_return_note_id}`}
                            className="form-label"
                          >
                            Transaction UoM
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
                            id={`edit-gin-balance_${data.ivm_goods_return_note_id}`}
                            title=" "
                            name="gin_balance"
                            defaultValue={data.gin_balance_qnty}
                            onChange={() => {}}
                          />
                          <label
                            htmlFor={`edit-gin-balance_${data.ivm_goods_return_note_id}`}
                            className="form-label"
                          >
                            GIN Balance Qty.
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
                            id={`edit-already-return-qty_${data.ivm_goods_return_note_id}`}
                            title=" "
                            name="already_return_qnty"
                            defaultValue={data.already_return_qnty}
                            onChange={() => {}}
                          />
                          <label
                            htmlFor={`edit-already-return-qty_${data.ivm_goods_return_note_id}`}
                            className="form-label"
                          >
                            Already Return Qty.
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
                            id={`edit-returned-qty_${data.ivm_goods_return_note_id}`}
                            title=" "
                            name="returned_qnty"
                            defaultValue={data.returned_qnty}
                            onChange={() => {}}
                          />
                          <label
                            htmlFor={`edit-returned-qty_${data.ivm_goods_return_note_id}`}
                            className="form-label"
                          >
                            Returned Qty.
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  {/*<!-- end product order -->*/}

                  {/*<!-- start payment order -->*/}
                  <fieldset className="fieldset">
                    <legend>Save all information</legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                        <input
                          type="hidden"
                          defaultValue={OrgId()}
                          name="orgid"
                        />
                        <input
                          type="hidden"
                          name="id"
                          defaultValue={data.ivm_goods_return_note_id}
                        />
                        {loader ? (
                          <Loader title="Update" />
                        ) : (
                          <button
                            type="button"
                            className="btn btn-success"
                            disabled={initCheckSign ? false : true}
                            onClick={() =>
                              UpdateInfo(
                                `edit_form_${data.ivm_goods_return_note_id}`
                              )
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

export default memo(GoodsReturnNote);

export async function getServerSideProps(context: any) {
  const id = context.query.v;

  const goodsReturnNoteInfo = await FetchData(
    `/get/ivm/goods/return/info/${id}`
  );
  const orgname = await OrgName(id);

  return {
    props: {
      goodsReturnNoteInfo,
      orgname,
    },
  };
}
