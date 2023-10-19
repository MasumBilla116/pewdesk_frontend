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
import PaginateData from "@/pages/api/Helper/PaginateData";
import Loader from "@/components/Loader";
import OrgId from "@/pages/api/Helper/OrgId";
import FetchData from "@/pages/api/Helper/FetchData";
import PagingLink from "@/components/PagingLink";
import DeleteItem from "@/pages/api/Helper/DeleteItem";
import UpdateItem from "@/pages/api/Helper/UpdateItem";
import StoreItem from "@/pages/api/Helper/StoreItem";
import { useForm } from "react-hook-form";
import GetOrgCurrencies from "@/pages/api/PreloadOrgInfo/GetOrgCurrencies";
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

function TransferOut(props: any) {
  const { transferOutData, orgCurrencie, orgname } = props;

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
  const [transferOutPaginateData, setTransferOutPaginateData] =
    useState(transferOutData);
  const [paginateUrl, setPaginateUrl] = useState(transferOutData?.links[1].url);
  const [checkSign, setCheckSign] = useState(false);
  const [initCheckSign, setInitCheckSign] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalUom, setTotalUom] = useState(0);
  const [totalQnty, setTotalQnty] = useState(0);
  const [totalCurStock, setTotalCurStock] = useState(0);
  const [totalTransacQnty, setTotalTransacQnty] = useState(0);

  useEffect(() => {
    var amount = 0,
      uom = 0,
      qnty = 0,
      stock = 0,
      tranQnty = 0;
    transferOutPaginateData?.data?.map((data: any) => {
      amount += data.ammount;
      uom += data.uom;
      qnty += data.transaction_qnty + data.transac_qnty;
      stock += data.product_qnty;
      tranQnty += data.transac_qnty;
    });

    setTotalCurStock(stock);
    setTotalQnty(qnty);
    setTotalTransacQnty(tranQnty);
    setTotalUom(uom);
    setTotalAmount(amount);
  }, [
    paginateUrl,
    transferOutPaginateData,
    totalAmount,
    totalCurStock,
    totalQnty,
    totalUom,
    totalTransacQnty,
  ]);
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle.min")
      : null;
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const FetchPaginateInfo = useCallback(async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setTransferOutPaginateData(res);
    }
  }, []);

  const [itemCodeQuantity, setItemCodeQuantity] = useState();
  const checkItem = useCallback(async (target: any) => {
    const id = $(`#${target}`).val();
    if (id != "") {
      const orgid = OrgId();
      const res = await fetch(
        `${process.env.BASE_URL}/check/ivm/out/goods/item-code/info/${orgid}/${id}`
      );
      const data = await res.json();

      if (data.success === 200) {
        setCheckSign(true);
        setItemCodeQuantity(data?.data?.product_qnty);
      }
      if (data.error === 404) {
        setCheckSign(false);
        setItemCodeQuantity(undefined);
      }
    }
  }, []);

  const UpdateInfo = useCallback(async (target: any) => {
    const data = $(`#${target}`).serializeArray();

    console.log(data);

    const formData = JSON.stringify({
      item_code: data[0].value,
      product_qnty: data[1].value,
      transac_qnty: data[2].value,
      uom: data[3].value,
      amount: data[4].value,
      orgid: data[5].value,
      id: data[6].value,
      impact: data[7].value,
    });
    UpdateItem(
      "/update/ivm/transfer/out/info",
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
        <title>IVM | Transfer out</title>
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
                      <caption>Transfer Out Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={10}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Transfer-out</b>
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
                          <th scope="col">Item Code</th>
                          <th scope="col"> UOM </th>
                          <th scope="col"> Total Qnty. </th>
                          <th scope="col">Current Stock </th>
                          <th scope="col"> Transaction Qty. </th>
                          <th scope="col"> Amount </th>
                          <th scope="col"> Impact </th>
                          {(roleSuperAdmin === 1 ||
                            roleAdmin === 1 ||
                            roleCreator === 1) && <th scope="col"> Action </th>}
                        </tr>
                      </thead>
                      <tbody>
                        {transferOutPaginateData?.data?.map(
                          (data: any, index: any) => (
                            <tr key={data.transfer_out_id}>
                              <td className="debit  text-end">{index + 1}</td>
                              <td className="debit text-info text-end">
                                {data.cat_name}
                              </td>
                              <td className="credit text-light text-end">
                                {data.item_code}
                              </td>
                              <td className="credit text-light text-end">
                                <span className="badge bg-success rounded">
                                  {data.uom}
                                </span>
                              </td>
                              <td className="credit text-success text-end">
                                {data.product_qnty + data.transac_qnty}{" "}
                                <span className="text-secondary ">Qnty</span>
                              </td>
                              <td className="credit text-success text-end">
                                {data.product_qnty}{" "}
                                <span className="text-secondary ">Qnty</span>
                              </td>
                              <td className="credit text-success text-end">
                                {data.transac_qnty}{" "}
                                <span className="text-secondary ">Qnty</span>
                              </td>
                              <td className="credit text-success text-end">
                                {data.ammount}{" "}
                                <span className="text-secondary ">/-</span>
                              </td>
                              <td
                                className={`credit text-end ${
                                  data.impact === "positive"
                                    ? "text-success"
                                    : "text-warning"
                                }`}
                              >
                                {data.impact}
                              </td>
                              {/* <td className=" ">
                                <button
                                  type="button"
                                  className="btn bg-transparent text-success btn-sm"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#edit_modal_${data.transfer_out_id}`}
                                >
                                  <i className="fas fa fa-edit"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn bg-transparent text-danger btn-sm"
                                  onClick={() => {
                                    DeleteItem(
                                      `/delete/ivm/transfer/out/info/${data.transfer_out_id}`,
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
                                    modalid={data.transfer_out_id}
                                    deleteFunc={DeleteItem}
                                    deleteurl={`/delete/ivm/transfer/out/info/${data.transfer_out_id}`}
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
                          <td colSpan={3}>Total</td>
                          <td className="text-end">
                            <span className="text-secondary me-1">=</span>
                            {totalUom}
                            <span className="pill">UOM</span>
                          </td>
                          <td className="text-end">{}</td>
                          <td className="text-end">
                            <span className="text-secondary me-1">=</span>
                            {totalCurStock}
                            <span className="pill">Qnty</span>
                          </td>
                          <td className="text-end">
                            <span className="text-secondary me-1">=</span>
                            {totalTransacQnty}
                            <span className="pill">Qnty</span>
                          </td>
                          <td className="text-end">
                            <span className="text-secondary me-1">=</span>
                            {totalAmount}
                            <span className="pill">{orgCurrencie}</span>
                          </td>
                          <td colSpan={2}> </td>
                        </tr>
                      </tfoot>
                    </table>

                    {/* start paginate */}
                    <PagingLink
                      pageInfo={transferOutPaginateData}
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
              <h1 className="text-caption">Add Transfer Out</h1>
              <button
                className="btn-close bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit((data) =>
                  StoreItem(
                    "/store/ivm/transfer/out/info",
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
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-item-no"
                          title=" "
                          onKeyUp={() => checkItem("add-item-no")}
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
                          defaultValue={itemCodeQuantity}
                          placeholder=" "
                          className="form-input"
                          id="add-curr-stock"
                          title=" "
                          readOnly
                        />
                        <label htmlFor="add-curr-stock" className="form-label">
                          Current Stock
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
                          {...register("uom", { required: true })}
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
                          id="add-transac-qty"
                          title=" "
                          minLength={1}
                          maxLength={itemCodeQuantity}
                          {...register("transac_qnty", { required: true })}
                        />
                        <label htmlFor="add-transac-qty" className="form-label">
                          Transac Qty
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.transac_qnty?.type === "required" &&
                          "Transac Qnty. is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-amount"
                          title=" "
                          {...register("amount", { required: true })}
                        />
                        <label htmlFor="add-amount" className="form-label">
                          Amount
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.amount?.type === "required" &&
                          "Amount is required"}
                      </div>
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end product order -->*/}

                {/*<!-- start payment order -->*/}
                <fieldset className="fieldset">
                  <legend>Save </legend>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 ">
                      <input
                        type="hidden"
                        {...register("orgid")}
                        value={OrgId()}
                      />
                      <label htmlFor="add-impact" className="text-light">
                        Impact
                      </label>
                      <select
                        id="add-impact"
                        className="form-select"
                        {...register("impact", { required: true })}
                      >
                        <option value="">Select product impact</option>
                        <option value="positive">Positive</option>
                        <option value="negative">Negative</option>
                      </select>
                      <hr className="bg-secondary" />
                      <div className="text-warning">
                        {errors.impact?.type === "required" &&
                          "Impact is required"}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
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
      {transferOutPaginateData?.data?.map((data: any) => (
        <div
          className="modal"
          id={`edit_modal_${data.transfer_out_id}`}
          key={data.transfer_out_id}
        >
          <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
            <div className="modal-content modal-content-bg">
              <div className="modal-header">
                <h1 className="text-caption">Edite Transfer Out</h1>
                <button
                  className="btn-close  bg-light"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form id={`edit_form_${data.transfer_out_id}`}>
                  <fieldset className="fieldset">
                    <legend>Product</legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-item-no_${data.transfer_out_id}`}
                            title=" "
                            name="item_code"
                            defaultValue={data.item_code}
                            readOnly={true}
                          />
                          <label
                            htmlFor={`edit-item-no_${data.transfer_out_id}`}
                            className="form-label"
                          >
                            Item Code
                            <i className="fas fa fa-check ms-4 text-success"></i>
                          </label>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`edit-curr-stock_${data.transfer_out_id}`}
                            title=" "
                            readOnly
                            name="product_qnty"
                            defaultValue={data.product_qnty}
                          />
                          <label
                            htmlFor={`edit-curr-stock_${data.transfer_out_id}`}
                            className="form-label"
                          >
                            Current Stock
                          </label>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`edit-transac-qty_${data.transfer_out_id}`}
                            title=" "
                            minLength={1}
                            maxLength={data.product_qnty}
                            name="transac_qnty"
                            defaultValue={0}
                          />
                          <label
                            htmlFor={`edit-transac-qty_${data.transfer_out_id}`}
                            className="form-label"
                          >
                            Transac Qty
                          </label>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`edit-uom_${data.transfer_out_id}`}
                            title=" "
                            name="uom"
                            defaultValue={data.uom}
                          />
                          <label
                            htmlFor={`edit-uom_${data.transfer_out_id}`}
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
                            placeholder=" "
                            className="form-input"
                            id={`edit-amount_${data.transfer_out_id}`}
                            title=" "
                            name="amount"
                            defaultValue={data.ammount}
                          />
                          <label
                            htmlFor={`edit-amount_${data.transfer_out_id}`}
                            className="form-label"
                          >
                            Amount
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  {/*<!-- end product order -->*/}

                  {/*<!-- start payment order -->*/}
                  <fieldset className="fieldset">
                    <legend>Save </legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 ">
                        <input
                          type="hidden"
                          {...register("orgid")}
                          value={OrgId()}
                        />
                        <input
                          type="hidden"
                          name="id"
                          defaultValue={data.transfer_out_id}
                        />
                        <label htmlFor="add-impact" className="text-light">
                          Impact
                        </label>
                        <select
                          id="add-impact"
                          className="form-select"
                          name="impact"
                        >
                          <option value="">Select product impact</option>
                          <option
                            value="positive"
                            selected={data.impact === "positive" ? true : false}
                          >
                            Positive
                          </option>
                          <option
                            value="negative"
                            selected={data.impact === "negatice" ? true : false}
                          >
                            Negative
                          </option>
                        </select>
                        <hr className="bg-secondary" />
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                        {loader ? (
                          <Loader title="Save" />
                        ) : (
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                              UpdateInfo(`edit_form_${data.transfer_out_id}`);
                            }}
                          >
                            <i className="fas fa  fa-save me-2"></i>
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

export default memo(TransferOut);

export async function getServerSideProps(context: any) {
  const id = context.query.v;

  const transferOutData = await FetchData(`/get/ivm/transfer/out/info/${id}`);
  const orgCurrencie = await GetOrgCurrencies(id);
  const orgname = await OrgName(id);

  return {
    props: {
      transferOutData,
      orgCurrencie,
      orgname,
    },
  };
}
