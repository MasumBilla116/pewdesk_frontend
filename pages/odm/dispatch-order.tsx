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
import Loader from "@/components/Loader";
import OrgId from "../api/Helper/OrgId";
import FetchData from "../api/Helper/FetchData";
import PaginateData from "../api/Helper/PaginateData";
import PagingLink from "@/components/PagingLink";
import StoreItem from "../api/Helper/StoreItem";
import UpdateItem from "../api/Helper/UpdateItem";
import DeleteItem from "../api/Helper/DeleteItem";
import { useForm } from "react-hook-form";
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

 function DispatchOrder(props: any) {
  const { dispatchOrderData, orgname } = props;

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
  const [dispatchOrderPaginateData, setDispatchOrderPaginateData] =
    useState(dispatchOrderData);
  const [paginateUrl, setPaginateUrl] = useState(
    dispatchOrderData?.links[1].url
  ); 
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

  const FetchPaginateInfo = useCallback(async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setDispatchOrderPaginateData(res);
    }
  },[]);

  const [delivaryOrderStatus, setDelivaryOrderStatus] =
    useState("Select a status");

  const checkDlivaryOrderId = useCallback(async () => {
    const id = $("#add-delivary-no").val();
    if (id != "") {
      const orgid = OrgId();
      const res = await FetchData(
        `/check/delivary-order-id/in-dispatch-order/${orgid}/${id}`
      );
      if (res.success === 200) {
        setCheckSign(true);
        console.warn(res.data);
        setDelivaryOrderStatus(res.data.status);
      }
      if (res.error === 404) {
        setCheckSign(false);
        setDelivaryOrderStatus("Select a status");
      }
    }
  },[]);

  const UpdateInfo = useCallback (async (target: any) => {
    const data = $(`#${target}`).serializeArray();

    const formData = JSON.stringify({
      pso_ref: data[0].value,
      dispatch_date: data[1].value,
      department: data[2].value,
      remark: data[3].value,
      orgid: data[4].value,
      id: data[5].value,
    });
    UpdateItem(
      "/update/odm/dispatch/order/info",
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
        <title>ODM | Dispatch order</title>
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
                      <caption>Dispatch Order Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={14}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Dispatch Order</b>
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
                          <th scope="col">Dispatch No. </th>
                          <th scope="col">Dispatch Date </th>
                          <th scope="col">PSO Ref: </th>
                          <th scope="col"> Customer </th>
                          <th scope="col">Delivery No.</th>
                          <th scope="col"> Department </th>
                          <th scope="col"> Cost Centre </th>

                          <th scope="col"> Current Status </th>
                          <th scope="col"> Remarks </th>
                          <th scope="col"> Location </th>

                          {(roleSuperAdmin === 1 ||
                            roleAdmin === 1 ||
                            roleCreator === 1) && <th scope="col"> Action </th>}
                        </tr>
                      </thead>
                      <tbody>
                        {dispatchOrderPaginateData?.data?.map(
                          (data: any, index: any) => (
                            <tr key={data.dispatch_order_id}>
                              <td className="debit  text-end">{index + 1}</td>
                              <td className="debit text-info text-end">
                                {data.doc_type}
                              </td>
                              <td className="credit text-primary text-end">
                                {data.dispatch_order_id + 56987}
                              </td>
                              <td className="credit text-light text-end">
                                {data.dispatch_date}
                              </td>
                              <td className="credit text-light text-end">
                                {data.pso_reference}
                              </td>
                              <td className="credit text-success text-end">
                                {data.customer}
                              </td>

                              <td className="credit text-primary text-end">
                                {data.dispatch_order_id}
                              </td>
                              <td className="credit text-success text-end">
                                Production
                              </td>
                              <td className="credit text-success text-end">
                                {data.department}
                              </td>
                              <td className="credit text-success text-end">
                                <span className="badge badge-pill bg-success">
                                  {data.status}
                                </span>
                              </td>
                              <td className="text-justify">{data.remarks}</td>
                              <td className="credit text-success text-end">
                                {data.location}
                              </td>
                              {/* <td>
                                <button
                                  type="button"
                                  className="btn bg-transparent text-success btn-sm"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#edit_modal_${data.dispatch_order_id}`}
                                >
                                  <i className="fas fa fa-edit"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn bg-transparent text-danger btn-sm"
                                  onClick={() =>
                                    DeleteItem(
                                      `/delete/odm/dispatch/order/info/${data.dispatch_order_id}`,
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
                                    modalid={data.dispatch_order_id}
                                    deleteFunc={DeleteItem}
                                    deleteurl={`/delete/odm/dispatch/order/info/${data.dispatch_order_id}`}
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
                      pageInfo={dispatchOrderPaginateData}
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
      <div className="modal  " id="add-modal">
        <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
          <div className="modal-content modal-content-bg">
            <div className="modal-header">
              <h1 className="text-caption">Add Dispatch Order</h1>
              <button
                className="btn-close bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit((data) =>
                  StoreItem(
                    "/store/odm/dispatch/order/info",
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
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-delivary-no"
                          title=" "
                          onKeyUp={() => {
                            checkDlivaryOrderId();
                          }}
                          {...register("delivary_on", { required: true })}
                        />
                        <label htmlFor="add-delivary-no" className="form-label">
                          Delivery ID
                          {checkSign === true ? (
                            <i className="fas fa fa-check ms-4 text-success"></i>
                          ) : (
                            <i className="fas fa fa-times ms-4 text-danger"></i>
                          )}
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.delivary_on?.type === "required" &&
                          "Delivary id is required"}
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <label htmlFor="add-cur-status" className="text-light">
                        Current status
                      </label>
                      <select
                        id="add-cur-status"
                        className="form-select"
                        {...register("status", { required: true })}
                      >
                        <option value="">{delivaryOrderStatus}</option>
                        {checkSign === true && (
                          <option value="approved">Approved</option>
                        )}
                      </select>
                      <div className="text-warning">
                        {errors.status?.type === "required" &&
                          "Status is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-pso-ref"
                          title=" "
                          {...register("pso_ref", { required: true })}
                        />
                        <label htmlFor="add-pso-ref" className="form-label">
                          PSO Ref:
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.pso_ref?.type === "required" &&
                          "PSO Ref. is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <div className="form-date">
                        <label
                          htmlFor="add-dispatch_date"
                          className="form-label"
                        >
                          Dispatch date
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
                          id="add-dispatch_date"
                          {...register("dispatch_date", { required: true })}
                        />
                      </div>
                      <div className="text-warning">
                        {errors.dispatch_date?.type === "required" &&
                          "Diapatch date is required"}
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-department"
                          title=" "
                          {...register("department", { required: true })}
                        />
                        <label htmlFor="add-department" className="form-label">
                          Cost center
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.department?.type === "required" &&
                          "Department is required"}
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                      <label htmlFor="add-remark" className="text-light">
                        Remark
                      </label>
                      <textarea
                        className="form-control"
                        id="add-remark"
                        cols={30}
                        rows={10}
                        style={{ height: 100 + "px" }}
                        {...register("remark")}
                      ></textarea>
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end product order -->*/}

                {/* <!-- start payment order -->*/}
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
                          type={checkSign ? "submit" : "button"}
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
      {/*<!-- end add modal -->*/}

      {/*<!-- start edit modal -->*/}
      {dispatchOrderPaginateData?.data?.map((data: any, index: any) => (
        <div
          className="modal"
          id={`edit_modal_${data.dispatch_order_id}`}
          key={data.dispatch_order_id}
        >
          <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
            <div className="modal-content modal-content-bg">
              <div className="modal-header">
                <h1 className="text-caption">Edite Dispatch Order</h1>
                <button
                  className="btn-close  bg-light"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form id={`edit_form_${data.dispatch_order_id}`}>
                  <fieldset className="fieldset">
                    <legend>Product</legend>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id="add-pso-ref"
                            title=" "
                            name="pso_ref"
                            defaultValue={data.pso_reference}
                          />
                          <label htmlFor="add-pso-ref" className="form-label">
                            PSO Ref:
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                        <div className="form-date">
                          <label
                            htmlFor="add-dispatch_date"
                            className="form-label"
                          >
                            Dispatch date
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.dispatch_date}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id="add-dispatch_date"
                            name="dispatch_date"
                          />
                        </div>
                      </div>

                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id="add-department"
                            title=" "
                            name="department"
                            defaultValue={data.department}
                          />
                          <label
                            htmlFor="add-department"
                            className="form-label"
                          >
                            Cost center
                          </label>
                        </div>
                      </div>

                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                        <label htmlFor="add-remark" className="text-light">
                          Remark
                        </label>
                        <textarea
                          className="form-control"
                          id="add-remark"
                          cols={30}
                          rows={10}
                          style={{ height: 200 + "px" }}
                          name="remark"
                          defaultValue={data.remarks}
                        ></textarea>
                      </div>
                    </div>
                  </fieldset>
                  {/*<!-- end product order -->*/}

                  {/* <!-- start payment order -->*/}
                  <fieldset className="fieldset">
                    <legend>Save</legend>
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
                          defaultValue={data.dispatch_order_id}
                        />
                        {loader ? (
                          <Loader title="Save" />
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              UpdateInfo(`edit_form_${data.dispatch_order_id}`);
                            }}
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

export default memo(DispatchOrder)

export async function getServerSideProps(context: any) {
  const id = context.query.v;

  const dispatchOrderData = await FetchData(
    `/get/odm/dispatch/order/info/${id}`
  );
  const orgname = await OrgName(id);

  return {
    props: {
      dispatchOrderData,
      orgname,
    },
  };
}
