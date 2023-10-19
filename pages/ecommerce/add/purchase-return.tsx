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

export default function PurchaseReturn() {
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
        <title>ECM | Purchase Return</title>
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
                    <form>
                      <fieldset className="fieldset">
                        <legend>Document</legend>
                        <div className="row">
                          <div className="col-lg-6 ">
                            <div className="form-input-con">
                              <input
                                type="text"
                                name="doc-type"
                                value=""
                                placeholder=" "
                                className="form-input"
                                id="doc-type"
                                title=" "
                              />
                              <label htmlFor="doc-type" className="form-label">
                                Document Type
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 ">
                            <div className="form-input-con">
                              <input
                                type="text"
                                name="doc-no"
                                value=""
                                placeholder=" "
                                className="form-input"
                                id="doc-no"
                              />
                              <label htmlFor="doc-no" className="form-label">
                                Document No.
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 mt-5">
                            <div className="form-date">
                              <label htmlFor="doc-date" className="form-label">
                                Document Date.
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
                                name="doc-date"
                                value=""
                                placeholder=" "
                                className="form-date-input"
                                id="doc-date"
                              />
                            </div>
                          </div>

                          <div className="col-lg-6  mt-5">
                            <div className="form-input-con">
                              <input
                                type="text"
                                name="location"
                                value=""
                                placeholder=" "
                                className="form-input"
                                id="location"
                              />
                              <label htmlFor="location" className="form-label">
                                Location
                              </label>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      {/*<!-- end product order -->*/}
                      {/*<!-- start payment order -->*/}
                      <fieldset className="fieldset">
                        <legend>Others</legend>
                        <div className="row">
                          <div className="col-lg-6 ">
                            <div className="form-input-con ">
                              <input
                                type="text"
                                name="purchase-order"
                                value=""
                                placeholder=" "
                                className="form-input"
                                id="purchase-order"
                              />
                              <label
                                htmlFor="purchase-order"
                                className="form-label"
                              >
                                Purchase Order
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 ">
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

                          <div className="col-lg-6 mt-5">
                            <div className="form-date">
                              <label htmlFor="return" className="form-label">
                                Return Date.
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
                                name="return-date"
                                value=""
                                placeholder=" "
                                className="form-date-input"
                                id="return-date"
                              />
                            </div>
                          </div>

                          <div className="col-lg-6  mt-5">
                            <div className="form-input-con">
                              <input
                                type="text"
                                name="grn-number"
                                value=""
                                placeholder=" "
                                className="form-input"
                                id="grn-number"
                              />
                              <label
                                htmlFor="grn-number"
                                className="form-label"
                              >
                                GRN Number
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
                                Advance %
                              </label>
                            </div>
                          </div>

                          <div className="col-lg-6 mt-4">
                            <label htmlFor="invoice" className="text-light">
                              Invoice
                            </label>
                            <select
                              name="cur-status"
                              id="invoice"
                              className="form-select"
                            >
                              <option value="">Select the Invoice</option>
                              <option value="015416">0021</option>
                              <option value="0132">058856</option>
                            </select>
                          </div>

                          <div className="col-lg-6  mt-5">
                            <div className="form-input-con">
                              <input
                                type="text"
                                name="gross-amount"
                                value=""
                                placeholder=" "
                                className="form-input"
                                id="gross-amount"
                              />
                              <label
                                htmlFor="gross-amount"
                                className="form-label"
                              >
                                Gross Amount %
                              </label>
                            </div>
                          </div>

                          <div className="col-lg-6  mt-5">
                            <div className="form-input-con">
                              <input
                                type="text"
                                name="amount"
                                value=""
                                placeholder=" "
                                className="form-input"
                                id="amount"
                              />
                              <label htmlFor="amount" className="form-label">
                                Amount %
                              </label>
                            </div>
                          </div>

                          <div className="col-lg-6 mt-5">
                            <label htmlFor="cur-status" className="text-light">
                              Current status
                            </label>
                            <select
                              name="cur-status"
                              id="cur-status"
                              className="form-select"
                            >
                              <option value="">Select Current Status</option>
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
                    </form>
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
