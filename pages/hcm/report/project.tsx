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
import PrintMin from "./../../load_js/controllers/PrintMin"
import JqueryUiMin from "./../../load_js/plugin/JqueryUiMin"
import DraggElements from "./../../load_js/controllers/DraggElements"
import PickDate from "./../../load_js/controllers/PickDate"
import SweetDeleteAlert from "./../../load_js/controllers/SweetDeleteAlert"

export default function ProjectReport() {
    useEffect(() => {
        typeof document !== undefined ? require("bootstrap/dist/js/bootstrap.bundle.min") : null
    }, [])
    return (
        <>
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>HCM | Project report</title>
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
                                    <div className="table-responsive">
                                        <table id="printable"
                                            className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark">
                                            <caption>General Ledger</caption>
                                            <thead className="text-center">
                                                <tr className="erp-tbl-top-head">
                                                    <th scope="col" colSpan={10}>
                                                        <div className="erp-trial-header">
                                                            <h2 className="erp-h2"><b>Julfidar Garments Ltd.</b></h2>
                                                            <h3 className="erp-h3"><b>Trial Balance</b></h3>
                                                            <h4 className="erp-trial-date"><em>As on August 2021</em></h4>
                                                        </div>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th scope="col">Item</th>
                                                    <th scope="col">Purchase From</th>
                                                    <th scope="col">Purchase Date</th>
                                                    <th scope="col"> Purchased By </th>
                                                    <th scope="col"> Amount </th>
                                                    <th scope="col"> Paid By </th>
                                                    <th scope="col">Status </th>
                                                    <th scope="col"> Actions </th>
                                                </tr>

                                            </thead>
                                            <tbody>

                                                <tr>
                                                    <td className="debit  text-end">DEll Laptop</td>
                                                    <td className="debit text-danger text-end"> Amazon </td>
                                                    <td className="credit text-light text-end">5 Jan 2022</td>
                                                    <td className="credit text-light text-end">Jon Abraham</td>
                                                    <td className="credit text-light text-end">1215</td>
                                                    <td className="credit text-light text-end">Cash</td>
                                                    <td className="text-center">
                                                        <span className="badge  bg-warning">Pending</span>
                                                    </td>
                                                    <td className="text-center">
                                                        <button type="button" className="btn rounded-circle btn-outline-warning me-2"
                                                            data-bs-toggle="modal" data-bs-target="#edit-modal">
                                                            <i className="fas fa fa-pen"></i>
                                                        </button>
                                                        <button type="button"
                                                            className="btn rounded-circle btn-outline-danger delete-item"
                                                            data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                                                            <i className="fas fa fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="debit  text-end">DEll Laptop</td>
                                                    <td className="debit text-danger text-end"> Amazon </td>
                                                    <td className="credit text-light text-end">5 Jan 2022</td>
                                                    <td className="credit text-light text-end">Jon Abraham</td>
                                                    <td className="credit text-light text-end">1215</td>
                                                    <td className="credit text-light text-end">Cash</td>
                                                    <td className="text-center">
                                                        <span className="badge  bg-warning">Pending</span>
                                                    </td>
                                                    <td className="text-center">
                                                        <button type="button" className="btn rounded-circle btn-outline-warning me-2"
                                                            data-bs-toggle="modal" data-bs-target="#edit-modal">
                                                            <i className="fas fa fa-pen"></i>
                                                        </button>
                                                        <button type="button"
                                                            className="btn rounded-circle btn-outline-danger delete-item"
                                                            data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                                                            <i className="fas fa fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>


                                            </tbody>
                                            <tfoot>
                                                <tr className="text-center">
                                                    <td colSpan={4}>total</td>
                                                    <td className="text-end">= 320000</td>
                                                    <td colSpan={3}>   </td>
                                                </tr>
                                            </tfoot>
                                        </table>
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
            {/*<!-- start edit modal -->*/}
            <div className="modal" id="edit-modal">
                <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
                    <div className="modal-content erp-bg-back">
                        <div className="modal-header">
                            <h1 className="text-caption">Edite Expenses</h1>
                            <button className="btn-close  bg-light" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <fieldset className="fieldset">
                                    <legend>Product</legend>
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                                            <div className="form-input-con">
                                                <input type="text" name="item" value="" placeholder=" " className="form-input"
                                                    id="edit-item" title=" " />
                                                <label htmlFor="edit-item" className="form-label">Item</label>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                                            <div className="form-input-con">
                                                <input type="text" name="purchase-from" value="" placeholder=" "
                                                    className="form-input" id="edit-purchase-from" title=" " />
                                                <label htmlFor="edit-purchase-from" className="form-label">Purchase From</label>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-5">
                                            <div className="form-date">
                                                <label htmlFor="edit-purchase-date" className="form-label">Purchase Date.</label>
                                                <h6 className="overlap-date-title load-date text-light">
                                                    <Image width={30} height={20} src="/theme_icon/calendar.png" alt="" className="pe-2" />
                                                    Select Date
                                                </h6>
                                                <input type="date" name="purchase-date" value="" placeholder=" "
                                                    className="form-date-input" id="edit-purchase-date" />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-5">
                                            <div className="form-input-con">
                                                <input type="text" name="purchase-by" value="" placeholder=" "
                                                    className="form-input" id="edit-purchase-by" title=" " />
                                                <label htmlFor="edit-purchase-by" className="form-label">Purchase By</label>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                                            <div className="form-input-con">
                                                <input type="text" name="paid-by" value="" placeholder=" " className="form-input"
                                                    id="edit-paid-by" title=" " />
                                                <label htmlFor="edit-paid-by" className="form-label">Paid By</label>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                                            <div className="form-input-con">
                                                <input type="number" name="amount" value="" placeholder=" " className="form-input"
                                                    id="edit-amount" title=" " />
                                                <label htmlFor="edit-amount" className="form-label">Amount (Tk)</label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                                {/*<!-- end product order -->*/}

                                {/*<!-- start payment order -->*/}
                                <fieldset className="fieldset">
                                    <legend>Update </legend>
                                    <div className="row">

                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                                            <label htmlFor="edit-cur-status" className="text-light">Current status</label>
                                            <select name="cur-status" id="edit-cur-status" className="form-select">
                                                <option value="">Select Current Status</option>
                                                <option value="approved">Approved</option>
                                                <option value="in-process">In-Process</option>
                                                <option value="release-from-approve">Release From Approve</option>
                                                <option value="partial-approve">Partial Approve</option>
                                                <option value="discuss">Discuss</option>
                                            </select>
                                            <hr className="bg-secondary" />
                                        </div>
                                        <div
                                            className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">

                                            <button type="submit" className="btn btn-danger w-50 shadow-dark">
                                                <i className="fas fa fa-save"></i>
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </fieldset>
                                {/*<!-- end payment  order -->*/}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
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
            <SweetDeleteAlert />
        </>
    )
}
