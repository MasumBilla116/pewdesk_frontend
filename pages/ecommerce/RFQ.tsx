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
import PickDate from "./../load_js/controllers/PickDate";
import SweetDeleteAlert from "./../load_js/controllers/SweetDeleteAlert";
import FetchData from "../api/Helper/FetchData";
import PaginateData from "../api/Helper/PaginateData";
import PagingLink from "@/components/PagingLink";
import Table2ExcelMinJs from "./../load_js/plugin/table2excel.min.js";
import Table2Excel from "./../load_js/controllers/table2excel";
import OrgName from "../api/Helper/OrgName";
import GetMonthName from "../api/Helper/GetMonthName";
import GetFullYear from "../api/Helper/GetFullYear";

function RFQ(props: any) {
  const { purchaseOrderInfo, orgname } = props;
  const [loader, setLoader] = useState(false);
  const [purchaseOrderPaginateData, setPurchaseOrderPaginateData] =
    useState(purchaseOrderInfo);
  const [paginateUrl, setPaginateUrl] = useState(
    purchaseOrderInfo?.links[0].url
  );
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle.min")
      : null;
  }, []);

  useEffect(() => {}, [purchaseOrderPaginateData]);

  const FetchPaginateInfo = useCallback(async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setPurchaseOrderPaginateData(res);
    }
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ECM | RFQ</title>
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
                    {/* <!-- start table btn group -->*/}
                    <div className="w-100 d-flex justify-content-end align-items-center mb-2">
                      <div className="btn-group tbl-btn-group d-none">
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#add-modal"
                        >
                          <i className="fas fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                    {/*<!-- end table btn group -->*/}

                    <table className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark">
                      <caption>RFQ Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={14}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Trial Balance</b>
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
                          <th scope="col">Requisition No. </th>
                          <th scope="col">Category</th>
                          <th scope="col"> Item </th>
                          <th scope="col"> UOM </th>
                          <th scope="col"> Quantity </th>
                          <th scope="col"> Supplier</th>
                          {/* <th scope="col"> Actions </th> */}
                        </tr>
                      </thead>

                      <tbody>
                        {purchaseOrderPaginateData?.data?.map(
                          (data: any, index: any) => (
                            <tr key={data.purchase_order_id}>
                              <td className="debit  text-end"> {index + 1}</td>
                              <td className="debit text-danger text-end">
                                {data.rfq}
                              </td>
                              <td className="credit text-light text-end">
                                {data.cat_name}
                              </td>
                              <td className="credit text-light text-end">
                                <span className="badge bg-primary rounded">
                                  {data.how_many_item}
                                  <span className="text-dark ms-1">Item</span>
                                </span>
                              </td>
                              <td className="credit text-light text-end">
                                <span className="badge bg-danger rounded">
                                  {data.uom}
                                </span>
                              </td>
                              <td className="credit text-success text-center">
                                <span className="badge bg-primary rounded">
                                  {data.how_many_item}
                                  <span className="text-dark ms-1">Qnty</span>
                                </span>
                              </td>
                              <td className="credit text-success text-end">
                                {data.supplier}
                              </td>
                              {/* <td className="credit text-center">
                                <button
                                  type="button"
                                  className="btn rounded-circle btn-outline-warning me-2"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-modal"
                                >
                                  <i className="fas fa fa-pen"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn rounded-circle btn-outline-danger delete-item"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Delete"
                                >
                                  <i className="fas fa fa-trash"></i>
                                </button>
                              </td> */}
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                    {/* start paginate */}

                    <PagingLink
                      pageInfo={purchaseOrderPaginateData}
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
              <h1 className="text-caption">Add RFQ</h1>
              <button
                className="btn-close bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <fieldset className="fieldset">
                  <legend>Information</legend>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          name="requisition"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="add-requisition"
                          title=" "
                        />
                        <label htmlFor="add-requisition" className="form-label">
                          Requisition
                        </label>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          name="doc-type"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="add-doc-type"
                          title=" "
                        />
                        <label htmlFor="add-doc-type" className="form-label">
                          Document Type
                        </label>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4 mt-5">
                      <div className="form-input-con">
                        <input
                          type="text"
                          name="ref-no"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="add-ref-no"
                        />
                        <label htmlFor="radd-ref-no" className="form-label">
                          Ref. No:
                        </label>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4 mt-5">
                      <div className="form-date">
                        <label htmlFor="add-rfq-date" className="form-label">
                          RFQ Date
                        </label>
                        <h6 className="overlap-date-title text-secondary">
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
                          name="rfq-date"
                          value=""
                          placeholder=" "
                          className="form-date-input"
                          id="add-rfq-date"
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4 mt-5">
                      <div className="form-date">
                        <label htmlFor="add-due-date" className="form-label">
                          Due Date.
                        </label>
                        <h6 className="overlap-date-title text-secondary">
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
                          name="due-date"
                          value=""
                          placeholder=" "
                          className="form-date-input"
                          id="add-due-date"
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4 mt-5">
                      <div className="form-date">
                        <label
                          htmlFor="add-delivary-date"
                          className="form-label"
                        >
                          Delivery Date.
                        </label>
                        <h6 className="overlap-date-title text-secondary">
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
                          name="delivary-date"
                          value=""
                          placeholder=" "
                          className="form-date-input"
                          id="add-delivary-date"
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end product order -->*/}

                {/*<!-- start payment order -->*/}
                <fieldset className="fieldset">
                  <legend>Save all information</legend>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
                      <div className="form-floating">
                        <textarea
                          className="form-control bg-dark"
                          name="purchase-terms"
                          id="add-purchase-terms"
                          cols={30}
                          rows={10}
                        ></textarea>
                        <label
                          htmlFor="add-purchase-terms"
                          className="text-light"
                        >
                          Comments
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4 ">
                      <label htmlFor="add-cur-status" className="text-light">
                        Current status
                      </label>
                      <select
                        name="cur-status"
                        id="add-cur-status"
                        className="form-select"
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
                    </div>
                    <div className="col-lg-12 mt-5 d-flex justify-content-center align-items-center">
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
              <h1 className="text-caption">Edit RFQ</h1>
              <button
                className="btn-close  bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <fieldset className="fieldset">
                  <legend>Information</legend>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          name="requisition"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="edit-requisition"
                          title=" "
                        />
                        <label
                          htmlFor="edit-requisition"
                          className="form-label"
                        >
                          Requisition
                        </label>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          name="doc-type"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="edit-doc-type"
                          title=" "
                        />
                        <label htmlFor="edit-doc-type" className="form-label">
                          Document Type
                        </label>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4 mt-5">
                      <div className="form-input-con">
                        <input
                          type="text"
                          name="ref-no"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="edit-ref-no"
                        />
                        <label htmlFor="edit-ref-no" className="form-label">
                          Ref. No:
                        </label>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4 mt-5">
                      <div className="form-date">
                        <label htmlFor="edit-rfq-date" className="form-label">
                          RFQ Date
                        </label>
                        <h6 className="overlap-date-title text-secondary">
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
                          name="rfq-date"
                          value=""
                          placeholder=" "
                          className="form-date-input"
                          id="edit-rfq-date"
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4 mt-5">
                      <div className="form-date">
                        <label htmlFor="edit-due-date" className="form-label">
                          Due Date.
                        </label>
                        <h6 className="overlap-date-title text-secondary">
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
                          name="due-date"
                          value=""
                          placeholder=" "
                          className="form-date-input"
                          id="edit-due-date"
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4 mt-5">
                      <div className="form-date">
                        <label
                          htmlFor="edit-delivary-date"
                          className="form-label"
                        >
                          Delivery Date.
                        </label>
                        <h6 className="overlap-date-title text-secondary">
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
                          name="delivary-date"
                          value=""
                          placeholder=" "
                          className="form-date-input"
                          id="edit-delivary-date"
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end product order -->*/}

                {/*<!-- start payment order -->*/}
                <fieldset className="fieldset">
                  <legend>Save all information</legend>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <div className="form-floating">
                        <textarea
                          className="form-control bg-dark"
                          name="purchase-terms"
                          id="edit-purchase-terms"
                          cols={30}
                          rows={10}
                        ></textarea>
                        <label
                          htmlFor="edit-purchase-terms"
                          className=" text-light"
                        >
                          Comments
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 ">
                      <label htmlFor="edit-cur-status" className="text-light">
                        Current status
                      </label>
                      <select
                        name="cur-status"
                        id="edit-cur-status"
                        className="form-select"
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
                    </div>
                    <div className="col-lg-12 mt-5 d-flex justify-content-center align-items-center">
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
export default memo(RFQ);
export async function getServerSideProps(context: any) {
  const id = context.query.v;

  const purchaseOrderInfo = await FetchData(`/get/ecm/purchase/order/${id}`);
  const orgname = await OrgName(id);

  return {
    props: {
      purchaseOrderInfo,
      orgname,
    },
  };
}
