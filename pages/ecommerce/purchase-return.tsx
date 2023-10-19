import Head from "next/head";
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
import PrintMin from "./../load_js/controllers/PrintMin";
import JqueryUiMin from "./../load_js/plugin/JqueryUiMin";
import DraggElements from "./../load_js/controllers/DraggElements";
import PickDate from "./../load_js/controllers/PickDate";
import FetchData from "../api/Helper/FetchData";
import StoreItem from "../api/Helper/StoreItem";
import UpdateItem from "../api/Helper/UpdateItem";
import DeleteItem from "../api/Helper/DeleteItem";
import PagingLink from "@/components/PagingLink";
import PaginateData from "../api/Helper/PaginateData";
import { useForm } from "react-hook-form";
import OrgId from "../api/Helper/OrgId";
import Loader from "@/components/Loader";
import $ from "jquery";
import Table2ExcelMinJs from "./../load_js/plugin/table2excel.min.js";
import Table2Excel from "./../load_js/controllers/table2excel";
import GetMonthName from "../api/Helper/GetMonthName";
import GetFullYear from "../api/Helper/GetFullYear";
import AddModalTableBtn from "@/components/AddModalTableBtn";
import ActionBtn from "@/components/ActionBtn";
import { decrypt } from "n-krypta";
import AccessKey from "../../pages/api/AccessKey";
import Cookies from "js-cookie";

function PurchaseReturn(props: any) {
  const { purchaseReturnInfo, orgname } = props;

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

  const [purchaseOrderReturnPaginateData, setPurchaseOrderReturnPaginateData] =
    useState(purchaseReturnInfo);
  const [loader, setLoader] = useState(false);
  const [paginateUrl, setPaginateUrl] = useState(
    purchaseReturnInfo?.links[1].url
  );
  const [checkSign, setCheckSign] = useState(false);
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
  useEffect(() => {}, [
    purchaseOrderReturnPaginateData,
    paginateUrl,
    purchaseReturnInfo,
  ]);

  const FetchPaginateInfo = useCallback(async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setPurchaseOrderReturnPaginateData(res);
    }
  }, []);

  const checkProduct = useCallback(async () => {
    const id = $("#add_po_id").val();
    const orgid = OrgId();
    const res = await FetchData(`/check/ecm/product-id/${orgid}/${id}`);
    if (res.success === 200) {
      setCheckSign(true);
    }
    if (res.error === 404) {
      setCheckSign(false);
    }
  }, []);

  const UpdateInfo = useCallback(async (target: any) => {
    const data = $(`#${target}`).serializeArray();

    const formData = JSON.stringify({
      total_item: data[0].value,
      uom: data[1].value,
      price: data[2].value,
      return_quantity: data[3].value,
      orgid: data[4].value,
      id: data[5].value,
    });
    UpdateItem(
      "/update/ecm/purchase/order/return/info/",
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
        <title>ECM | Purchase return</title>
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
                      <caption>Purchase Return Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={14}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Purchase Return</b>
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
                          <th scope="col">Product ID</th>
                          <th scope="col">Total Item</th>
                          <th scope="col"> UOM </th>
                          <th scope="col"> Unit Price </th>
                          <th scope="col">Return Quantity </th>
                          {(roleSuperAdmin === 1 ||
                            roleAdmin === 1 ||
                            roleCreator === 1) && <th scope="col"> Action </th>}
                        </tr>
                      </thead>
                      <tbody>
                        {purchaseOrderReturnPaginateData?.data?.map(
                          (data: any, index: any) => (
                            <tr key={data.purchase_return_id}>
                              <td className="debit  text-end">{index + 1}</td>
                              <td className="debit  text-start">
                                {data.purchase_return_id + 9167945978}{" "}
                              </td>
                              <td className="credit text-success text-end">
                                <span className="badge bg-success rounded">
                                  {data.how_many_item}
                                </span>
                              </td>
                              <td className="credit text-success text-end">
                                {data.uom}
                              </td>
                              <td className="credit text-success text-end">
                                {data.unite_price}
                              </td>
                              <td className="credit text-success text-end">
                                <span className="badge bg-danger rounded">
                                  {data.return_quantity}
                                </span>
                              </td>
                              {/* <td className="d-flex justify-content-center align-items-center">
                                <button
                                  type="button"
                                  className="btn bg-transparent text-success btn-sm"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#edit_modal_${data.purchase_return_id}`}
                                >
                                  <i className="fas fa fa-edit"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn bg-transparent text-danger btn-sm"
                                  onClick={() => {
                                    DeleteItem(
                                      `/delete/ecm/purchase/order/return/info/${data.purchase_return_id}`,
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
                                    modalid={data.purchase_return_id}
                                    deleteFunc={DeleteItem}
                                    deleteurl={`/delete/ecm/purchase/order/return/info/${data.purchase_return_id}`}
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
                      pageInfo={purchaseOrderReturnPaginateData}
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
              <h1 className="text-caption">Add Purchase Return</h1>
              <button
                className="btn-close bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit((data) =>
                  StoreItem(
                    "/store/ecm/purchase/order/return/info",
                    data,
                    setLoader,
                    FetchPaginateInfo,
                    paginateUrl
                  )
                )}
              >
                <fieldset className="fieldset">
                  <legend>Document</legend>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12  mb-4">
                      <div className="form-input-con ">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add_po_id"
                          {...register("po_id", { required: true })}
                          onKeyUp={() => {
                            checkProduct();
                          }}
                        />
                        <label htmlFor="add_po_id" className="form-label">
                          Product id
                          {checkSign === true ? (
                            <i className="fas fa fa-check ms-4 text-success"></i>
                          ) : (
                            <i className="fas fa fa-times ms-4 text-danger"></i>
                          )}
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.po_id?.type === "required" &&
                          "Product id is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-item-no"
                          title=" "
                          {...register("total_item", { required: true })}
                        />
                        <label htmlFor="add-item-no" className="form-label">
                          Total item
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.total_item?.type === "required" &&
                          "Total item is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
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
                        {errors.item_no?.type === "required" &&
                          "UoM is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-price"
                          title=" "
                          {...register("price", { required: true })}
                        />
                        <label htmlFor="add-price" className="form-label">
                          Unit Price
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.price?.type === "required" &&
                          " Unit Price is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-qty"
                          title=" "
                          {...register("return_quantity", { required: true })}
                        />
                        <label htmlFor="add-qty" className="form-label">
                          Return Quantity
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.return_quantity?.type === "required" &&
                          "Return Quantity is required"}
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
                        value={OrgId()}
                      />
                      {loader ? (
                        <Loader title="Save" />
                      ) : (
                        <button
                          type={`${checkSign ? "submit" : "button"}`}
                          className="btn btn-success"
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
      {/* <!-- end add modal -->*/}

      {/*<!-- start edit modal -->*/}
      {purchaseOrderReturnPaginateData?.data?.map((data: any, index: any) => (
        <div
          className="modal"
          key={`edit_modal_${data.purchase_return_id}`}
          id={`edit_modal_${data.purchase_return_id}`}
        >
          <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
            <div className="modal-content modal-content-bg">
              <div className="modal-header">
                <h1 className="text-caption">Edite Purchase Return</h1>
                <button
                  className="btn-close bg-light"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form id={`edit_form_${data.purchase_return_id}`}>
                  <fieldset className="fieldset">
                    <legend>Document</legend>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id="add-item-no"
                            title=" "
                            name="total_item"
                            defaultValue={data.how_many_item}
                          />
                          <label htmlFor="add-item-no" className="form-label">
                            Total item
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id="add-uom"
                            title=" "
                            name="uom"
                            defaultValue={data.uom}
                          />
                          <label htmlFor="add-uom" className="form-label">
                            UoM
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id="add-price"
                            title=" "
                            name="price"
                            defaultValue={data.unite_price}
                          />
                          <label htmlFor="add-price" className="form-label">
                            Unit Price
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id="add-qty"
                            title=" "
                            name="return_quantity"
                            defaultValue={data.return_quantity}
                          />
                          <label htmlFor="add-qty" className="form-label">
                            Return Quantity
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
                        <input type="hidden" name="orgid" value={OrgId()} />
                        <input
                          type="hidden"
                          name="id"
                          value={data.purchase_return_id}
                        />
                        {loader ? (
                          <Loader title="Update" />
                        ) : (
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                              UpdateInfo(
                                `edit_form_${data.purchase_return_id}`
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

export default memo(PurchaseReturn);

export async function getServerSideProps(context: any) {
  const id = context.query.v;
  const purchaseReturnInfo = await FetchData(
    `/get/ecm/purchase/order/return/info/${id}`
  );

  return {
    props: {
      purchaseReturnInfo,
    },
  };
}
