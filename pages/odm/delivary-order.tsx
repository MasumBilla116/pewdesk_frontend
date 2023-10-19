import Head from "next/head";
import Image from "next/image";
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
import { useForm } from "react-hook-form";
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
import GetMonthName from "../api/Helper/GetMonthName";
import GetFullYear from "../api/Helper/GetFullYear";
import AddModalTableBtn from "@/components/AddModalTableBtn";
import ActionBtn from "@/components/ActionBtn";
import { decrypt } from "n-krypta";
import AccessKey from "./../../pages/api/AccessKey";
import Cookies from "js-cookie";

function DelivaryOrder(props: any) {
  const { delivaryOrderInfo, orgname } = props;

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

  const [checkSign, setCheckSign] = useState(false);
  const [loader, setLoader] = useState(false);
  const [delivaryOrderPaginateInfo, setDelivaryOrderPaginateInfo] =
    useState(delivaryOrderInfo);
  const [paginateUrl, setPaginateUrl] = useState(
    delivaryOrderInfo?.links[1].url
  );

  const FetchPaginateInfo = useCallback(async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setDelivaryOrderPaginateInfo(res);
    }
  }, []);

  useEffect(() => {}, [
    delivaryOrderInfo,
    delivaryOrderPaginateInfo,
    paginateUrl,
  ]);
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
      doc_type: data[0].value,
      cust_name: data[1].value,
      location: data[2].value,
      valid_upto_date: data[3].value,
      delivary_date: data[4].value,
      status: data[5].value,
      orgid: data[6].value,
      id: data[7].value,
    });
    UpdateItem(
      "/update/odm/order/delivary/info",
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
        <title>ODM | Delivary order</title>
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
                      <caption>Delivary Order Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={14}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Delivary Order</b>
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
                          <th scope="col">Document Type </th>
                          <th scope="col">Delivery Date</th>
                          <th scope="col"> Delivery No. </th>
                          <th scope="col"> Location </th>
                          <th scope="col"> Customer </th>
                          <th scope="col"> Seles Order No.</th>
                          <th scope="col"> Valid Upto: </th>
                          <th scope="col"> Status </th>
                          {(roleSuperAdmin === 1 ||
                            roleAdmin === 1 ||
                            roleCreator === 1) && <th scope="col"> Action </th>}
                        </tr>
                      </thead>
                      <tbody>
                        {delivaryOrderPaginateInfo?.data?.map(
                          (data: any, index: any) => (
                            <tr key={data.delivary_order_id}>
                              <td className="debit  text-end"> {index + 1}</td>
                              <td className="debit text-info text-end">
                                {data.doc_type}
                              </td>
                              <td className="credit text-light text-end">
                                {data.delivary_date}
                              </td>
                              <td className="credit text-primary text-end">
                                {data.delivary_order_id + 58719}
                              </td>
                              <td className="credit text-light text-end">
                                {data.location}
                              </td>
                              <td className="credit text-success text-end">
                                {data.customer}
                              </td>

                              <td className="credit text-success text-end">
                                {data.sells_order_id + process.env.PRO_ID}
                              </td>
                              <td className="credit text-success text-end">
                                {data.valid_up_to_date}
                              </td>
                              <td>
                                <span
                                  className={`badge rounded-pill  
                            ${data.status === "approved" && "bg-success"}
                            ${data.status === "in-process" && "bg-warning"}
                            ${
                              data.status === "release-from-approve" &&
                              "bg-warning"
                            }
                            ${data.status === "partial-approve" && "bg-info"}
                            ${data.status === "discuss" && "bg-warning"}
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
                                  data-bs-target={`#edit_modal_${data.delivary_order_id}`}
                                >
                                  <i className="fas fa fa-edit"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn bg-transparent text-danger btn-sm"
                                  onClick={() =>
                                    DeleteItem(
                                      `/delete/odm/order/delivary/info/${data.delivary_order_id}`,
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
                                    modalid={data.delivary_order_id}
                                    deleteFunc={DeleteItem}
                                    deleteurl={`/delete/odm/order/delivary/info/${data.delivary_order_id}`}
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
                      pageInfo={delivaryOrderPaginateInfo}
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
              <h1 className="text-caption">Add Delivary Order</h1>
              <button
                className="btn-close bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit((data) =>
                  StoreItem(
                    "/store/odm/order/delivary/info",
                    data,
                    setLoader,
                    FetchPaginateInfo,
                    paginateUrl
                  )
                )}
              >
                <fieldset className="fieldset">
                  <legend>Product</legend>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-5">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-doc-type"
                          title=" "
                          {...register("doc_type", { required: true })}
                        />
                        <label htmlFor="add-doc-type" className="form-label">
                          Document type
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.doc_type?.type === "required" &&
                          "Doc. Type is required"}
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-5">
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

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-5">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-cust-name"
                          title=" "
                          {...register("cust_name", { required: true })}
                        />
                        <label htmlFor="add-cust-name" className="form-label">
                          Customer Name
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.cust_name?.type === "required" &&
                          "Name is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-5 ">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-location"
                          title=" "
                          {...register("location", { required: true })}
                        />
                        <label htmlFor="add-location" className="form-label">
                          Location
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.location?.type === "required" &&
                          "Location is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-5">
                      <div className="form-date">
                        <label
                          htmlFor="add-valid-upto-date"
                          className="form-label"
                        >
                          Valid Upto:
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
                          id="add-valid-upto-date"
                          {...register("valid_upto_date", { required: true })}
                        />
                      </div>
                      <div className="text-warning">
                        {errors.valid_upto_date?.type === "required" &&
                          "Validate date is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-5">
                      <div className="form-date">
                        <label
                          htmlFor="add-delivary-date"
                          className="form-label"
                        >
                          Delivery Date
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
                          id="add-delivary-date"
                          {...register("delivary_date", { required: true })}
                        />
                      </div>
                      <div className="text-warning">
                        {errors.delivary_date?.type === "required" &&
                          "Delivary date is required"}
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
                      <label htmlFor="add-cur-status" className="text-light">
                        Current status
                      </label>
                      <select
                        id="add-cur-status"
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
                          "Status is required"}
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
                        <button
                          type="submit"
                          className="btn btn-success"
                          disabled={checkSign ? false : true}
                        >
                          <i className="fas fa fa-save me-2"></i>
                          {checkSign ? "Save" : "Product id required"}
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
      {delivaryOrderPaginateInfo?.data?.map((data: any, index: any) => (
        <div
          className="modal"
          id={`edit_modal_${data.delivary_order_id}`}
          key={`edit_modal_${data.delivary_order_id}`}
        >
          <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
            <div className="modal-content modal-content-bg">
              <div className="modal-header">
                <h1 className="text-caption">Edite Delivary Order</h1>
                <button
                  className="btn-close  bg-light"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form id={`edit_form_${data.delivary_order_id}`}>
                  <fieldset className="fieldset">
                    <legend>Product</legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-5">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-doc-type_${data.delivary_order_id}`}
                            title=" "
                            name="doc_type"
                            defaultValue={data.doc_type}
                            onChange={() => {}}
                          />
                          <label
                            htmlFor={`edit-doc-type_${data.delivary_order_id}`}
                            className="form-label"
                          >
                            Document type
                          </label>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-5">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-cust-name_${data.delivary_order_id}`}
                            title=" "
                            name="cust_name"
                            defaultValue={data.customer}
                            onChange={() => {}}
                          />
                          <label
                            htmlFor={`edit-cust-name_${data.delivary_order_id}`}
                            className="form-label"
                          >
                            Customer Name
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-5 ">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-location_${data.delivary_order_id}`}
                            title=" "
                            name="location"
                            value={data.location}
                            onChange={() => {}}
                          />
                          <label
                            htmlFor={`edit-location_${data.delivary_order_id}`}
                            className="form-label"
                          >
                            Location
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-5">
                        <div className="form-date">
                          <label
                            htmlFor={`edit-valid-upto-date_${data.delivary_order_id}`}
                            className="form-label"
                          >
                            Valid Upto:
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.valid_up_to_date}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`edit-valid-upto-date_${data.delivary_order_id}`}
                            name="valid_upto_date"
                            onChange={() => {}}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-5">
                        <div className="form-date">
                          <label
                            htmlFor={`edit-delivary-date_${data.delivary_order_id}`}
                            className="form-label"
                          >
                            Delivery Date
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.delivary_date}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`edit-delivary-date_${data.delivary_order_id}`}
                            name="delivary_date"
                            onChange={() => {}}
                          />
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
                          htmlFor={`edit-cur-status_${data.delivary_order_id}`}
                          className="text-light"
                        >
                          Current status
                        </label>
                        <select
                          id={`edit-cur-status_${data.delivary_order_id}`}
                          className="form-select"
                          name="status"
                          onChange={() => {}}
                        >
                          <option value="">
                            Select Current Status {data.status}
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
                          value={data.delivary_order_id}
                        />
                        {loader ? (
                          <Loader title="Update" />
                        ) : (
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() =>
                              UpdateInfo(`edit_form_${data.delivary_order_id}`)
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

      {/* <!-- end edit modal -->*/}
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
export default memo(DelivaryOrder);
export async function getServerSideProps(context: any) {
  const id = context.query.v;

  const delivaryOrderInfo = await FetchData(
    `/get/odm/order/delivary/info/${id}`
  );

  const orgname = await OrgName(id);

  return {
    props: {
      delivaryOrderInfo,

      orgname,
    },
  };
}
