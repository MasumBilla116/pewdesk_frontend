import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import { useEffect } from 'react'
import Header from "./../../../components/Header"
import Aside from "./../../../components/Aside"
import ToggleOption from "./../../../components/ToggleOption"
import Footer from "./../../../components/Footer"
import TablePrint from '@/components/TablePrint'
import TableFilter from '@/components/TableFilter'
import JqueryMin from "./../../load_js/plugin/jquery.min.js"
import AsidejQuery from "./../../load_js/controllers/AsidejQuery"
import FullScreenMode from "./../../load_js/controllers/FullScreenMode"

export default function VendowQuatation() {
    useEffect(() => {
        typeof document !== undefined ? require("bootstrap/dist/js/bootstrap.bundle.min") : null
    }, [])
    return (
        <>
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>ECM | Vendow Quatation</title>
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
                                                <legend>Information</legend>
                                                <div className="row">
                                                    <div className="col-lg-6 ">
                                                        <div className="form-input-con">
                                                            <input type="text" name="rfq-no" value="" placeholder=" " className="form-input"
                                                                id="rfq-no" title=" " />
                                                            <label htmlFor="rfq-no" className="form-label">RFQ No:</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 ">
                                                        <div className="form-input-con">
                                                            <input type="text" name="requisition-no" value="" placeholder=" "
                                                                className="form-input" id="requisition-no" title=" " />
                                                            <label htmlFor="requisition-no" className="form-label">Requisition No:</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 mt-5">
                                                        <div className="form-input-con">
                                                            <input type="text" name="supplier" value="" placeholder=" "
                                                                className="form-input" id="supplier" />
                                                            <label htmlFor="supplier" className="form-label">Supplier</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 mt-5">
                                                        <div className="form-input-con">
                                                            <input type="text" name="doc-no" value="" placeholder=" " className="form-input"
                                                                id="doc-no" />
                                                            <label htmlFor="doc-no" className="form-label">Document No.</label>
                                                        </div>
                                                    </div>


                                                    <div className="col-lg-6 mt-5">
                                                        <div className="form-date">
                                                            <label htmlFor="quoted-date" className="form-label">Quoted Date.</label>
                                                            <h6 className="overlap-date-title">
                                                                <Image width={30} height={20} src="/theme_icon/calendar.png" alt=""
                                                                    className="pe-2" />
                                                                Select Date
                                                            </h6>
                                                            <input type="date" name="quoted-date" value="" placeholder=" "
                                                                className="form-date-input" id="quoted-date" />

                                                        </div>
                                                    </div>


                                                </div>
                                            </fieldset>
                                            {/*<!-- end product order -->*/}
                                            <fieldset className="fieldset">
                                                <legend>Delivary</legend>
                                                <div className="row">
                                                    <div className="col-lg-6  ">
                                                        <div className="form-date">
                                                            <label htmlFor="delivary-date" className="form-label">Delivary Date.</label>
                                                            <h6 className="overlap-date-title">
                                                                <Image width={30} height={20} src="/theme_icon/calendar.png" alt=""
                                                                    className="pe-2" />
                                                                Select Date
                                                            </h6>
                                                            <input type="date" name="delivary-date" value="" placeholder=" "
                                                                className="form-date-input" id="delivary-date" />

                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 ">
                                                        <div className="form-input-con">
                                                            <input type="text" name="delivery-period" value="" placeholder=" "
                                                                className="form-input" id="delivery-period" />
                                                            <label htmlFor="delivery-period" className="form-label">Delivery
                                                                Period.</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 mt-4">
                                                        <label htmlFor="cost-center" className="text-light">Cost Center</label>
                                                        <select name="cost-center" id="cost-center" className="form-select">
                                                            <option value="">Select the cost center</option>
                                                            <option value="marketing">Merketing</option>
                                                            <option value="sales">Sales</option>
                                                            <option value="Inventory-store">Inventory Store</option>
                                                            <option value="finish-goods-ware-house">Finish Goods Ware House</option>
                                                            <option value="Quality assurance">Quality Assurance</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-lg-6 mt-5">
                                                        <div className="form-input-con">
                                                            <input type="text" name="ref-no" value="" placeholder=" " className="form-input"
                                                                id="ref-no" />
                                                            <label htmlFor="ref-no" className="form-label">Ref.
                                                                No.</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 mt-5">
                                                        <div className="form-input-con">
                                                            <input type="text" name="gst" value="" placeholder=" " className="form-input"
                                                                id="gst" />
                                                            <label htmlFor="gst" className="form-label">GST %</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 mt-5">
                                                        <div className="form-input-con">
                                                            <input type="text" name="freight-detail" value="" placeholder=" "
                                                                className="form-input" id="freight-detail" />
                                                            <label htmlFor="freight-detail" className="form-label">Freight Detail </label>
                                                        </div>
                                                    </div>

                                                </div>
                                            </fieldset>
                                            {/*<!-- start payment order -->*/}
                                            <fieldset className="fieldset">
                                                <legend>Payments</legend>
                                                <div className="row">
                                                    <div className="col-lg-6 ">
                                                        <div className="form-input-con ">
                                                            <input type="text" name="payment-term" value="" placeholder=" "
                                                                className="form-input" id="payment-term" />
                                                            <label htmlFor="payment-term" className="form-label">Payment Term</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 ">
                                                        <div className="form-input-con">
                                                            <input type="text" name="total-amount" value="" placeholder=" "
                                                                className="form-input" id="total-amount" />
                                                            <label htmlFor="total-amount" className="form-label">Total Amount</label>
                                                        </div>
                                                    </div>

                                                </div>
                                            </fieldset>
                                            {/*<!-- end payment  order -->*/}
                                            {/*<!-- start payment order -->*/}
                                            <fieldset className="fieldset">
                                                <legend>Save all information</legend>
                                                <div className="row">
                                                    <div className="col-lg-6 ">
                                                        <div className="form-floating">
                                                            <textarea className="form-control bg-dark" name="comments" id="comments"
                                                                cols={30} rows={30}></textarea>
                                                            <label htmlFor="comments" className="">Comments</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 d-flex justify-content-center align-items-center">
                                                        <button type="submit" className="btn btn-outline-danger w-50">Save</button>
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
    )
}
