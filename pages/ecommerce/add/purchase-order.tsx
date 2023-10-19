import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Header from "./../../../components/Header";
import Aside from "./../../../components/Aside";
import ToggleOption from "./../../../components/ToggleOption";
import Footer from "./../../../components/Footer";
import TablePrint from "@/components/TablePrint";
import TableFilter from "@/components/TableFilter";
import JqueryMin from "./../../load_js/plugin/jquery.min.js";
import AsidejQuery from "./../../load_js/controllers/AsidejQuery";
import FullScreenMode from "./../../load_js/controllers/FullScreenMode";

export default function PurchaseOrder() {
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
        <title>ECM | Purchase Order</title>
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
                  {/*<!-- start form container -->*/}
                  <div className="container-fluid pt-3 pb-3 ">
                    <h1 className="text-caption">Add Purchase Order</h1>
                    {/*<!-- start product order -->*/}
                    <fieldset className="fieldset">
                      <legend>Product Order</legend>
                      <div className="row">
                        <div className="col-lg-6 ">
                          <div className="form-input-con ">
                            <input
                              type="text"
                              name="po-type"
                              value=""
                              placeholder=" "
                              className="form-input"
                              id="po-type"
                              title=" "
                            />
                            <label htmlFor="po-type" className="form-label">
                              P.O Type
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6 ">
                          <div className="form-input-con">
                            <input
                              type="text"
                              name="po-no"
                              value=""
                              placeholder=" "
                              className="form-input"
                              id="po-no"
                            />
                            <label htmlFor="po-no" className="form-label">
                              P.O No.
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6 mt-5">
                          <div className="form-date">
                            <label htmlFor="po-date" className="form-label">
                              P.O Date.
                            </label>
                            <h6 className="overlap-date-title">
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
                              name="po-date"
                              value=""
                              placeholder=" "
                              className="form-date-input"
                              id="po-date"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6  mt-5">
                          <div className="form-check form-switch">
                            <label
                              htmlFor="direct-po"
                              className="form-check-label text-light"
                            >
                              Direct P.O
                            </label>
                            <input
                              type="checkbox"
                              name="direct-po"
                              value=""
                              placeholder=" "
                              className="form-check-input"
                              id="direct-po"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6  mt-5">
                          <div className="form-input-con">
                            <input
                              type="text"
                              name="frq-no"
                              value=""
                              placeholder=" "
                              className="form-input"
                              id="frq-no"
                            />
                            <label htmlFor="frq-no" className="form-label">
                              FRQ No.
                            </label>
                          </div>
                        </div>

                        <div className="col-lg-6  mt-5">
                          <div className="form-input-con">
                            <input
                              type="text"
                              name="quotation"
                              value=""
                              placeholder=" "
                              className="form-input"
                              id="quotation"
                            />
                            <label htmlFor="quotation" className="form-label">
                              Quotation:
                            </label>
                          </div>
                        </div>

                        <div className="col-lg-6  mt-5">
                          <div className="form-input-con">
                            <input
                              type="text"
                              name="requisition-no"
                              value=""
                              placeholder=" "
                              className="form-input"
                              id="requisition-no"
                            />
                            <label
                              htmlFor="requisition-no"
                              className="form-label"
                            >
                              Requisition No.
                            </label>
                          </div>
                        </div>

                        <div className="col-lg-6  mt-5">
                          <div className="form-input-con">
                            <input
                              type="text"
                              name="supplier"
                              value=""
                              placeholder=" "
                              className="form-input"
                              id="supplier"
                            />
                            <label htmlFor="supplier" className="form-label">
                              Supplier
                            </label>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    {/*<!-- end product order -->*/}
                    {/*<!-- start payment order -->*/}
                    <fieldset className="fieldset">
                      <legend>Payment Order</legend>
                      <div className="row">
                        <div className="col-lg-6 ">
                          <div className="form-input-con ">
                            <input
                              type="text"
                              name="payment-terms"
                              value=""
                              placeholder=" "
                              className="form-input"
                              id="payment-terms"
                            />
                            <label
                              htmlFor="payment-terms"
                              className="form-label"
                            >
                              Payment Terms
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6 ">
                          <div className="form-input-con">
                            <input
                              type="text"
                              name="delivery-period"
                              value=""
                              placeholder=" "
                              className="form-input"
                              id="delivery-period"
                            />
                            <label
                              htmlFor="delivery-period"
                              className="form-label"
                            >
                              Delivery Period
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6 mt-5">
                          <div className="form-date">
                            <label htmlFor="po-date" className="form-label">
                              P.O Due Date.
                            </label>
                            <h6 className="overlap-date-title load-date">
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
                              name="po-due-date"
                              value=""
                              placeholder=" "
                              className="form-date-input"
                              id="po-due-date"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6  mt-5">
                          <div className="form-input-con">
                            <input
                              type="text"
                              name="note-to-vendor"
                              value=""
                              placeholder=" "
                              className="form-input"
                              id="note-to-vendor"
                            />
                            <label
                              htmlFor="note-to-vendor"
                              className="form-label"
                            >
                              Note To Vendor
                            </label>
                          </div>
                        </div>

                        <div className="col-lg-6  mt-5">
                          <div className="form-input-con">
                            <input
                              type="text"
                              name="advance"
                              value=""
                              placeholder=" "
                              className="form-input"
                              id="advance"
                            />
                            <label htmlFor="advance" className="form-label">
                              Advance &percnt;
                            </label>
                          </div>
                        </div>

                        <div className="col-lg-6  mt-5">
                          <div className="form-check form-switch">
                            <input
                              type="checkbox"
                              name="include-gst"
                              value=""
                              placeholder=" "
                              className="form-check-input"
                              id="include-gst"
                            />
                            <label
                              htmlFor="include-gst"
                              className="form-check-label"
                            >
                              Including GST:
                            </label>
                          </div>
                        </div>

                        <div className="col-lg-6  mt-5">
                          <div className="form-input-con">
                            <input
                              type="text"
                              name="total-amount"
                              value=""
                              placeholder=" "
                              className="form-input"
                              id="total-amount"
                            />
                            <label
                              htmlFor="total-amount"
                              className="form-label"
                            >
                              Total Amount
                            </label>
                          </div>
                        </div>

                        <div className="col-lg-6  mt-5">
                          <div className="form-input-con">
                            <input
                              type="text"
                              name="comments"
                              value=""
                              placeholder=" "
                              className="form-input"
                              id="comments"
                            />
                            <label htmlFor="comments" className="form-label">
                              Comments
                            </label>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    {/*<!-- end payment  order -->*/}
                    {/*<!-- start payment order -->*/}
                    <fieldset className="fieldset">
                      <legend>Others</legend>
                      <div className="row">
                        <div className="col-lg-6 ">
                          <div className="form-floating">
                            <textarea
                              className="form-control bg-dark"
                              name="purchase-terms"
                              id="purchase-terms"
                              cols={30}
                              rows={30}
                            ></textarea>
                            <label htmlFor="purchase-terms" className="">
                              Purchase Terms
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6 ">
                          <select
                            name="cur-status"
                            id="cur-status"
                            className="form-select"
                          >
                            <option value="">Select a status</option>
                            <option value="approved">Approved</option>
                            <option value="pending">Pending</option>
                          </select>
                        </div>
                      </div>
                    </fieldset>
                    {/*<!-- end payment  order -->*/}
                    {/*<!-- start payment order -->*/}
                    <fieldset className="fieldset">
                      <legend>Save all information</legend>
                      <div className="row">
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
                  </div>
                  {/*<!-- end form container -->*/}
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

      {/* start script */}
      <JqueryMin />
      <AsidejQuery />
      <FullScreenMode />
    </>
  );
}
