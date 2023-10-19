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
import ImagePreview from "./../load_js/controllers/ImagePreview";
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

function SellesOrder(props: any) {
  const { sellesOrderInfo, orgname } = props;

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
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle.min")
      : null;
  }, []);

  const [loader, setLoader] = useState(false);
  const [sellesOrderPaginateData, setSellesOrderPaginateData] =
    useState(sellesOrderInfo);
  const [paginateUrl, setPaginateUrl] = useState(sellesOrderInfo?.links[1].url);

  useEffect(() => {}, [sellesOrderPaginateData]);

  const FetchPaginateInfo = useCallback(async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setSellesOrderPaginateData(res);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const UpdateInfo = useCallback(async (target: any) => {
    const data = $(`#${target}`).serializeArray();
    console.warn(data);
    const formData = JSON.stringify({
      total_selles: data[0].value,
      selles_amount: data[1].value,
      orgid: data[2].value,
      id: data[3].value,
    });
    UpdateItem(
      "/update/odm/selles/order/info/",
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
        <title>ECM | Selles Order</title>
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
                      <caption>Selles Order Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={17}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Selles Order</b>
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
                          <th scope="col">Product Id </th>
                          <th scope="col">Category </th>
                          <th scope="col" className="text-warning">
                            Stock Qt.
                          </th>
                          <th scope="col" className="text-warning">
                            ODR Qt.
                          </th>
                          <th scope="col"> UOM </th>
                          <th scope="col"> Price </th>
                          <th scope="col"> Note To Vendor </th>
                          <th scope="col"> Discount %</th>
                          <th scope="col"> Taxable </th>
                          <th scope="col" className="text-warning">
                            Amount
                          </th>
                          <th scope="col" className="text-warning">
                            Selles Amount
                          </th>
                          {(roleSuperAdmin === 1 ||
                            roleAdmin === 1 ||
                            roleCreator === 1) && <th scope="col"> Action </th>}
                        </tr>
                      </thead>
                      <tbody>
                        {sellesOrderPaginateData?.data?.map(
                          (data: any, index: any) => (
                            <tr key={data.sells_id}>
                              <td className="debit  text-end"> {index + 1}</td>
                              <td className="debit  text-start text-primary">
                                {data.purchase_order_id + process.env.PRO_ID}
                              </td>
                              <td className="debit text-light text-start">
                                {data.cat_name}
                              </td>
                              <td className="credit text-warning text-start">
                                <span className="badge bg-primary rounded">
                                  {data.how_many_item}
                                  <span className="text-dark ms-1 ">Qnty</span>
                                </span>
                              </td>
                              <td className="credit text-warning text-start">
                                <span className="badge bg-success rounded">
                                  {data.total_sells}
                                  <span className="text-dark  ms-1">Qnty</span>
                                </span>
                              </td>
                              <td className="credit text-light text-start">
                                {data.uom}
                              </td>
                              <td className="credit text-light text-end">
                                {data.price}
                                <span className="text-secondary ">/-</span>
                              </td>
                              <td className="credit text-success text-center">
                                {data.note_to_vendor}
                              </td>
                              <td className="credit text-success text-end">
                                {data.discount}
                                {data.discount && (
                                  <span className="text-secondary ">%</span>
                                )}
                              </td>
                              <td className="credit text-success text-end">
                                {data.taxable}
                                {data.taxable && (
                                  <span className="text-secondary ">%</span>
                                )}
                              </td>

                              <td className="credit text-success text-end">
                                {data.amount}
                                <span className="text-secondary ">/-</span>
                              </td>
                              <td className="credit text-success text-end">
                                {data.sells_amount}
                                <span className="text-secondary ">/-</span>
                              </td>

                              {/* <td>
                                <button
                                  type="button"
                                  className="btn bg-transparent text-success btn-sm"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#edit_modal_${data.sells_id}`}
                                >
                                  <i className="fas fa fa-edit"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn bg-transparent text-danger btn-sm"
                                  onClick={() =>
                                    DeleteItem(
                                      `/delete/odm/selles/order/info/${data.sells_id}`,
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
                                    modalid={data.sells_id}
                                    deleteFunc={DeleteItem}
                                    deleteurl={`/delete/odm/selles/order/info/${data.sells_id}`}
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
                      pageInfo={sellesOrderPaginateData}
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
              <h5 className="text-caption">Add Selles</h5>
              <button
                className="btn-close  bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit((data) =>
                  StoreItem(
                    "/store/ecm/selles/info",
                    data,
                    setLoader,
                    FetchPaginateInfo,
                    paginateUrl
                  )
                )}
                encType={"multipart/form-data"}
              >
                {/*<!-- start payment order -->*/}
                <fieldset className="fieldset">
                  <legend>Selles</legend>
                  <div className="row">
                    <div className="col-lg-6 ">
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

                    <div className="col-lg-6  mb-2">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-total_selles"
                          {...register("total_selles", { required: true })}
                        />
                        <label
                          htmlFor="add-total_selles"
                          className="form-label"
                        >
                          Total selles
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.total_selles?.type === "required" &&
                          "Total selles is required"}
                      </div>
                    </div>

                    <div className="col-lg-6  mt-5">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-selles_amount"
                          {...register("selles_amount", { required: true })}
                        />
                        <label
                          htmlFor="add-selles_amount"
                          className="form-label"
                        >
                          Selles amount
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.selles_amount?.type === "required" &&
                          "Selles amount is required"}
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
                          type={`${checkSign ? "submit" : "button"}`}
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
      {sellesOrderPaginateData?.data?.map((data: any, index: any) => (
        <div
          className="modal"
          key={`edit_modal_${data.sells_id}`}
          id={`edit_modal_${data.sells_id}`}
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
                  id={`edit_form_${data.sells_id}`}
                  encType={"multipart/form-data"}
                >
                  {/*<!-- start payment order -->*/}
                  <fieldset className="fieldset">
                    <legend>Selles</legend>
                    <div className="row">
                      <div className="col-lg-6  mb-2">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id="add-total_selles"
                            name="total_selles"
                            defaultValue={data.total_sells}
                          />
                          <label
                            htmlFor="add-total_selles"
                            className="form-label"
                          >
                            Total selles
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-6  mb-5">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id="add-selles_amount"
                            name="selles_amount"
                            defaultValue={data.sells_amount}
                          />
                          <label
                            htmlFor="add-selles_amount"
                            className="form-label"
                          >
                            Selles amount
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  {/*<!-- end payment  order -->*/}

                  {/*<!-- start payment order -->*/}
                  <fieldset className="fieldset">
                    <legend>Update all information</legend>
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
                          defaultValue={data.sells_id}
                        />

                        {loader ? (
                          <Loader title="Update" />
                        ) : (
                          <button
                            type="button"
                            className="btn bg-success text-light"
                            onClick={() =>
                              UpdateInfo(`edit_form_${data.sells_id}`)
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
      <ImagePreview />
    </>
  );
}

export default memo(SellesOrder);

export async function getServerSideProps(context: any) {
  const id = context.query.v;

  const sellesOrderInfo = await FetchData(`/get/odm/selles/order/info/${id}`);
  const orgname = await OrgName(id);

  return {
    props: {
      sellesOrderInfo,
      orgname,
    },
  };
}
