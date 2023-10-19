import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
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
import SweetDeleteAlert from "./../../load_js/controllers/SweetDeleteAlert";
import { useForm } from "react-hook-form";
import PaginateData from "@/pages/api/Helper/PaginateData";
import axios from "axios";
import swal from "sweetalert";
import Loader from "@/components/Loader";
import OrgId from "@/pages/api/Helper/OrgId";
import FetchData from "@/pages/api/Helper/FetchData";
import PagingLink from "@/components/PagingLink";
import Table2ExcelMinJs from "../../load_js/plugin/table2excel.min.js";
import Table2Excel from "../../load_js/controllers/table2excel";
import OrgName from "@/pages/api/Helper/OrgName";
import GetMonthName from "@/pages/api/Helper/GetMonthName";
import GetFullYear from "@/pages/api/Helper/GetFullYear";

function StockRequisition(props: any) {
  const { goodsReceipNoteInfo, orgname } = props;

  const [loader, setLoader] = useState(false);
  const [goodsReceiptNotePaginateData, setGoodsReceiptNotePaginateData] =
    useState(goodsReceipNoteInfo);
  const [paginateUrl, setPaginateUrl] = useState(
    goodsReceipNoteInfo?.links[1].url
  );

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
    goodsReceiptNotePaginateData?.data?.map((data: any) => {
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
    totalUom,
    totalTransaction,
    goodsReceiptNotePaginateData,
  ]);

  const FetchPaginateInfo = useCallback(async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setGoodsReceiptNotePaginateData(res);
    }
  }, []);

  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle.min")
      : null;
  }, []);
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>IVM | Stock requisition</title>
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
                    <table
                      id="printable"
                      className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark"
                    >
                      <caption>Stock Requisition Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={10}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Stock Requisition</b>
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
                          <th scope="col">Category</th>
                          <th scope="col">Item</th>
                          <th scope="col"> Transc UOM </th>
                          <th scope="col"> Current Stock </th>
                          <th scope="col">Transc Qty </th>
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
                              <td className="debit text-info text-end">
                                {data.cat_name}
                              </td>
                              <td className="credit text-light text-end">
                                {data.product_qnty}
                              </td>
                              <td className="credit text-light text-end">
                                {data.uom}
                              </td>
                              <td className="credit text-light text-end">
                                {data.product_qnty}
                              </td>
                              <td className="credit text-success text-end">
                                {data.transaction_qnty}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                      <tfoot>
                        <tr className="text-center">
                          <td colSpan={3}>Total</td>
                          <td className="text-end">
                            <span className="text-secondary me-1">=</span>
                            {totalItem} <span className="pill">Item</span>
                          </td>
                          <td className="text-end">
                            <span className="text-secondary me-1">=</span>
                            {totalUom} <span className="pill">UOM</span>
                          </td>
                          <td className="text-end">
                            <span className="text-secondary me-1">=</span>
                            {totalCurrentStock}
                            <span className="pill">Qnty</span>
                          </td>
                          <td className="text-end">
                            <span className="text-secondary me-1">=</span>
                            {totalTransaction}
                            <span className="pill">Qnty</span>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    {/* start paginate */}
                    <PagingLink
                      pageInfo={goodsReceiptNotePaginateData}
                      fetchdata={FetchPaginateInfo}
                    />

                    {/* end paginate */}
                  </div>
                  {/* end ladger table */}
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
              <h1 className="text-caption">Add Stock Requisition</h1>
              <button
                className="btn-close bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <fieldset className="fieldset">
                  <legend>Product Info.</legend>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          name="date"
                          value="11/06/1999"
                          placeholder=" "
                          className="form-input"
                          id="add-date"
                          title=" "
                          readOnly
                        />
                        <label htmlFor="add-date" className="form-label">
                          Date
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          name="category"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="add-category"
                          title=" "
                        />
                        <label htmlFor="add-category" className="form-label">
                          Category
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          name="item-no"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="add-item-no"
                          title=" "
                        />
                        <label htmlFor="add-item-no" className="form-label">
                          Item No
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          name="transc-uom"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="add-transc-uom"
                          title=" "
                        />
                        <label htmlFor="add-transc-uom" className="form-label">
                          Transc UoM
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          name="transc-qty"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="add-transc-qty"
                          title=" "
                        />
                        <label htmlFor="add-transc-qty" className="form-label">
                          Transc Qty
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          name="cur-stock"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="add-cur-stock"
                          title=" "
                        />
                        <label htmlFor="add-cur-stock" className="form-label">
                          Current Stock
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
                      <button
                        type="submit"
                        className="btn btn-outline-danger w-50"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end payment  order -->*/}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
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
      <div className="modal" id="edit-modal">
        <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
          <div className="modal-content modal-content-bg">
            <div className="modal-header">
              <h1 className="text-caption">Edite Stock Requisition</h1>
              <button
                className="btn-close  bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <fieldset className="fieldset">
                  <legend>Product Info.</legend>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          name="date"
                          value="11/06/1999"
                          placeholder=" "
                          className="form-input"
                          id="edit-date"
                          title=" "
                          readOnly
                        />
                        <label htmlFor="edit-date" className="form-label">
                          Date
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          name="category"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="edit-category"
                          title=" "
                        />
                        <label htmlFor="edit-category" className="form-label">
                          Category
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          name="item-no"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="edit-item-no"
                          title=" "
                        />
                        <label htmlFor="edit-item-no" className="form-label">
                          Item No
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          name="transc-uom"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="edit-transc-uom"
                          title=" "
                        />
                        <label htmlFor="edit-transc-uom" className="form-label">
                          Transc UoM
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          name="transc-qty"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="edit-transc-qty"
                          title=" "
                        />
                        <label htmlFor="edit-transc-qty" className="form-label">
                          Transc Qty
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          name="cur-stock"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="edit-cur-stock"
                          title=" "
                        />
                        <label htmlFor="edit-cur-stock" className="form-label">
                          Current Stock
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
                      <button
                        type="submit"
                        className="btn btn-outline-danger w-50"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </fieldset>
                {/* <!-- end payment  order -->*/}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
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
export default memo(StockRequisition);

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
