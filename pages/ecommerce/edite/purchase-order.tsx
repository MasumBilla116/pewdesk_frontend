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

export default function EditePurchaseOrder() {
    useEffect(() => {
        typeof document !== undefined ? require("bootstrap/dist/js/bootstrap.bundle.min") : null
    }, [])
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
                                        <h1 className="text-caption">Edite Purchase Order</h1>
                                        {/*<!-- start product order -->*/}
                                        <form>
                                            <fieldset className="fieldset">
                                                <legend>Document</legend>
                                                <div className="row">

                                                    <div className="col-lg-6 ">
                                                        <div className="form-input-con">
                                                            <input type="text" name="doc-type" value="" placeholder=" "
                                                                className="form-input" id="doc-no" title=" " />
                                                            <label htmlFor="doc-no" className="form-label">Document No</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 ">
                                                        <div className="form-input-con">
                                                            <input type="text" name="doc-type" value="" placeholder=" "
                                                                className="form-input" id="doc-type" title=" " />
                                                            <label htmlFor="doc-type" className="form-label">Document Type</label>
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
                                                            <input type="text" name="requisition" value="" placeholder=" "
                                                                className="form-input" id="requisition" />
                                                            <label htmlFor="requisition" className="form-label">Requisition</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 mt-5">
                                                        <div className="form-date">
                                                            <label htmlFor="from-doc-date" className="form-label">From Doc. Date</label>
                                                            <h6 className="overlap-date-title">
                                                                <Image width={30} height={20} src="/theme_icon/calendar.png" alt=""
                                                                    className="pe-2" />
                                                                Select Date
                                                            </h6>
                                                            <input type="date" name="from-doc-date" value="" placeholder=" "
                                                                className="form-date-input" id="from-doc-date" />

                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 mt-5">
                                                        <div className="form-date">
                                                            <label htmlFor="to-doc-date" className="form-label">To Doc.
                                                                Date.</label>
                                                            <h6 className="overlap-date-title">
                                                                <Image width={30} height={20} src="/theme_icon/calendar.png" alt=""
                                                                    className="pe-2" />
                                                                Select Date
                                                            </h6>
                                                            <input type="date" name="to-doc-date" value="" placeholder=" "
                                                                className="form-date-input" id="to-doc-date" />

                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            {/*<!-- end product order -->*/}

                                            {/*<!-- start payment order -->*/}
                                            <fieldset className="fieldset">
                                                <legend>Save all information</legend>
                                                <div className="row">
                                                    <div className="col-lg-6 ">
                                                        <label htmlFor="cur-status" className="text-light">Current status</label>
                                                        <select name="cur-status" id="cur-status" className="form-select">
                                                            <option value="">Select Current Status</option>
                                                            <option value="approved">Approved</option>
                                                            <option value="in-process">In-Process</option>
                                                            <option value="release-from-approve">Release From Approve</option>
                                                            <option value="partial-approve">Partial Approve</option>
                                                            <option value="discuss">Discuss</option>
                                                        </select>
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
