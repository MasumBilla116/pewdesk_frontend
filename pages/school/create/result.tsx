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

export default function Result() {
    useEffect(() => {
        typeof document !== undefined ? require("bootstrap/dist/js/bootstrap.bundle.min") : null
    }, [])
    return (
        <>
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Shool | Create Result</title>
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
                                    {/* end report action */}
                                    <section
                                        className="erp-filter-ledger pb-lg-4 bg-er-dark-black ps-3 pe-3 pt-4 mb-2 border-bottom border-dark-theme border-2 bg-input-dark">

                                        <div className="filter-input-container">
                                            <div className="row">
                                                <div className="col-lg-3">
                                                    <div className="form-group">
                                                        <label htmlFor="class"
                                                            className="form-label title-color font-monospace title-font-1.3">Select
                                                            Class</label>
                                                        <select name="month" id="class"
                                                            className="form-select erp-input-dark text-secondary font-monospace font-13">
                                                            <option>Select Your class</option>
                                                            <option value="">One</option>
                                                            <option value="">Two</option>
                                                            <option value="">Three</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="form-group">
                                                        <label htmlFor="subject"
                                                            className="form-label title-color font-monospace title-font-1.3">Select
                                                            your
                                                            subject</label>
                                                        <select name="month" id="subject"
                                                            className="form-select erp-input-dark text-secondary font-monospace font-13">
                                                            <option value="">Select Your Subject</option>
                                                            <option value="Math">Math</option>
                                                            <option value="Biology">Biology</option>
                                                            <option value="English">English</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="form-group">
                                                        <label htmlFor="year"
                                                            className="form-label title-color font-monospace title-font-1.3">Exam
                                                            category</label>
                                                        <select name="month" id="month"
                                                            className="form-select erp-input-dark text-secondary font-monospace font-13">
                                                            <option>Select Exam Category</option>
                                                            <option value="">Weekly</option>
                                                            <option value="">Monthly</option>
                                                            <option value="">Half-Yearly</option>
                                                            <option value="">Yearly</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="form-group">
                                                        <label htmlFor="totalMark"
                                                            className="form-label title-color font-monospace title-font-1.3">Total
                                                            Mark</label>
                                                        <input id="totalMark" type="number" max="100" min="20"
                                                            className="form-control erp-input-dark font-13 text-light"
                                                            placeholder="Total mark" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    {/*<!-- END: Report -->*/}
                                    {/*<!-- start your code -->*/}
                                    <div className="table-responsive">
                                        <table id="printable"
                                            className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark">
                                            <caption>Create Result</caption>
                                            <thead className="text-center">
                                                <tr className="erp-tbl-top-head">
                                                    <th scope="col" colSpan={10}>
                                                        <div className="erp-trial-header">
                                                            <h2 className="erp-h2"><b>Delta Computer Science College</b></h2>
                                                            <h3 className="erp-h3"><b>Create Result</b></h3>
                                                            <h4 className="erp-trial-date"><em>As on January 2023</em></h4>
                                                        </div>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>Roll</th>
                                                    <th>Name</th>
                                                    <th>Subject</th>
                                                    <th>Total Mark</th>
                                                    <th>Exam Mark</th>
                                                    <th className="toggle-td"> Grate</th>
                                                    <th className="toggle-td">Points</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>01</td>
                                                    <td>Jon</td>
                                                    <td className="subject"></td>
                                                    <td className="total-mark">0</td>
                                                    <td>
                                                        <input type="text"
                                                            className="exam-mark form-control border-0  bg-transparent text-light"
                                                            placeholder="Mark" />
                                                    </td>
                                                    <td className="toggle-td">
                                                        <input type="text" name="letter-grate" value=""
                                                            className="border-0  bg-transparent" disabled />
                                                    </td>
                                                    <td className="toggle-td">
                                                        <input type="text" name="points" value=""
                                                            className="border-0  bg-transparent" disabled />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>01</td>
                                                    <td>Jon</td>
                                                    <td className="subject"></td>
                                                    <td className="total-mark">0</td>
                                                    <td>
                                                        <input type="text"
                                                            className="exam-mark form-control border-0  bg-transparent text-light"
                                                            placeholder="Mark" />
                                                    </td>
                                                    <td className="toggle-td">
                                                        <input type="text" name="letter-grate" value=""
                                                            className="border-0  bg-transparent" disabled />
                                                    </td>
                                                    <td className="toggle-td">
                                                        <input type="text" name="points" value=""
                                                            className="border-0  bg-transparent" disabled />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>01</td>
                                                    <td>Jon</td>
                                                    <td className="subject"></td>
                                                    <td className="total-mark">0</td>
                                                    <td>
                                                        <input type="text"
                                                            className="exam-mark form-control border-0  bg-transparent text-light"
                                                            placeholder="Mark" />
                                                    </td>
                                                    <td className="toggle-td">
                                                        <input type="text" name="letter-grate" value=""
                                                            className="border-0  bg-transparent" disabled />
                                                    </td>
                                                    <td className="toggle-td">
                                                        <input type="text" name="points" value=""
                                                            className="border-0  bg-transparent" disabled />
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colSpan={7} style={{ textAlign: "right" }}>
                                                        <button type="button" id="reset"
                                                            className="btn btn-danger shadow-dark me-4">
                                                            <i className="fas fa fa-history"></i> Reset
                                                        </button>
                                                        <button type="button" className="print btn btn-success shadow-dark me-4">
                                                            <i className="fas fa fa-print"></i> Print
                                                        </button>
                                                        <button type="button" className="btn btn-primary shadow-dark">
                                                            <i className="fas fa fa-save"></i>
                                                            Save
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>

                                    {/*<!-- end your code -->*/}
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
            <PrintMin />
            <JqueryUiMin />
            <DraggElements />
            <PickDate />
            <SweetDeleteAlert />
        </>
    )
}
