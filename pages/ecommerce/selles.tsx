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
import PrintMin from "./../load_js/controllers/PrintMin";
import JqueryUiMin from "./../load_js/plugin/JqueryUiMin";
import DraggElements from "./../load_js/controllers/DraggElements";
import SellesJs from "./../load_js/controllers/SellesJs";
import { useForm } from "react-hook-form";
import OrgId from "../api/Helper/OrgId";
import axios from "axios";
import swal from "sweetalert";
import FetchData from "../api/Helper/FetchData";
import Loader from "@/components/Loader";
import PaginateData from "../api/Helper/PaginateData";
import PagingLink from "@/components/PagingLink";
import $ from "jquery";
import StoreItem from "../api/Helper/StoreItem";
import GetOrgCurrencies from "../api/PreloadOrgInfo/GetOrgCurrencies";
import ImgLoader from "../api/Helper/ImgLoader";
import Table2ExcelMinJs from "./../load_js/plugin/table2excel.min.js";
import Table2Excel from "./../load_js/controllers/table2excel";
import OrgName from "../api/Helper/OrgName";
import AddModalTableBtn from "@/components/AddModalTableBtn";
import ActionBtn from "@/components/ActionBtn";
import { decrypt } from "n-krypta";
import AccessKey from "../../pages/api/AccessKey";
import Cookies from "js-cookie";

function Selles(props: any) {
  const { brands, categories, sellesInfo, orgCurrencie, orgname } = props;

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
  const [sellesPaginateData, setSellesPaginateData] = useState(sellesInfo);
  const [paginateUrl, setPaginateUrl] = useState(sellesInfo?.links[0].url);

  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle.min")
      : null;
  }, []);

  useEffect(() => {}, [sellesPaginateData, paginateUrl]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const FetchPaginateInfo = useCallback(async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setSellesPaginateData(res);
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
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ECM | Selles</title>
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
                  {/*<!-- BEGIN: start sells table -->*/}
                  <div className="card bg-input-dark mt-4">
                    <div className="card-body">
                      <div className="table-responsive">
                        {/*<!-- start table btn group -->*/}
                        {(roleSuperAdmin === 1 ||
                          roleAdmin === 1 ||
                          roleCreator === 1) && <AddModalTableBtn />}
                        {/*<!-- end table btn group -->*/}
                        <table
                          id="sells-table"
                          className="font-13 erp-table-dark table title-color table-dark"
                        >
                          <caption className="text-warning font-monospace">
                            Selles Ledger
                          </caption>
                          <thead className="text-center">
                            <tr>
                              <th className="col-1" scope="col ">
                                Brand
                              </th>
                              <th className="col-2" scope="col">
                                Product ID
                              </th>
                              <th className="col-3" scope="col">
                                Name
                              </th>
                              <th className="col-4" scope="col">
                                Category
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {sellesPaginateData?.data?.map(
                              (data: any, index: any) => (
                                <>
                                  <tr>
                                    <td className="col-1 toggle-next">
                                      <a
                                        role="button"
                                        className="text-decoration-none text-light d-flex justify-content-between text-light"
                                      >
                                        <span>
                                          <i
                                            className={`fa-solid  text-danger ${
                                              index === 0
                                                ? "fa-minus"
                                                : "fa-plus"
                                            }`}
                                          ></i>
                                        </span>
                                        <span>{data.brand_name}</span>
                                      </a>
                                    </td>
                                    <td className="col-2">
                                      {data.product_id + process.env.PRO_ID}
                                    </td>
                                    <td className="col-3">{data.cat_name}</td>
                                    <td className="col-4">
                                      {data.product_title}
                                    </td>
                                  </tr>
                                  <tr
                                    className={`tbl-description ${
                                      index >= 1 && "d-none"
                                    }`}
                                  >
                                    <td colSpan={4}>
                                      <div className="tbl-description-container">
                                        <div className="row">
                                          <div className="col-lg-6 bg-black-border rounded">
                                            <table className="table  mt-3 title-color">
                                              <thead>
                                                <tr>
                                                  <th className="text-success bg-black-border ">
                                                    Total sells
                                                  </th>
                                                  <td className="text-warning bg-black-border">
                                                    {data.total_sells}{" "}
                                                    <span className="text-secondary">
                                                      {" "}
                                                      Qnt.
                                                    </span>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <th className="text-success bg-black-border">
                                                    Sells Amount
                                                  </th>
                                                  <td className="text-warning bg-black-border">
                                                    <span className="text-secondary me-1">
                                                      =
                                                    </span>
                                                    {data.sells_amount}
                                                    <span className="text-secondary ">
                                                      /-
                                                    </span>
                                                    <span className="pill">
                                                      {orgCurrencie}
                                                    </span>
                                                  </td>
                                                </tr>
                                              </thead>
                                            </table>
                                          </div>
                                          <div className="col-lg-6">
                                            <div className="tbl-product-container   p-3 text-center font-weight-bold   rounded bg-black-border ">
                                              <Image
                                                loader={() =>
                                                  ImgLoader(data.product_image)
                                                }
                                                src={`${process.env.BASE_LINK_URL}/${data.product_image}`}
                                                alt="PRODUCT IMAE"
                                                className="img-fluid rounded border border-dark"
                                                width={500}
                                                height={300}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="d-none"> </td>
                                    <td className="d-none"> </td>
                                    <td className="d-none"> </td>
                                  </tr>
                                </>
                              )
                            )}
                          </tbody>
                        </table>
                        {/* start paginate  */}
                        <PagingLink
                          pageInfo={sellesPaginateData}
                          fetchdata={FetchPaginateInfo}
                        />
                        {/* end paginate  */}
                      </div>
                    </div>
                  </div>
                  {/* end selles table */}
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
      {/* start script */}
      <JqueryMin />
      <AsidejQuery />
      <FullScreenMode />
      <PrintMin />
      <JqueryUiMin />
      <DraggElements />
      <SellesJs />
      <Table2ExcelMinJs />
      <Table2Excel />
    </>
  );
}

export default memo(Selles);

export async function getServerSideProps(context: any) {
  const id = context.query.v;

  const brands = await FetchData(`/get/brands/${id}`);
  const categories = await FetchData(`/get/category/${id}`);
  const sellesInfo = await FetchData(`/get/ecm/selles/info/${id}`);
  const orgCurrencie = await GetOrgCurrencies(id);
  const orgname = await OrgName(id);

  return {
    props: {
      brands,
      categories,
      sellesInfo,
      orgCurrencie,
      orgname,
    },
  };
}
