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

export default function Student() {
    useEffect(() => {
        typeof document !== undefined ? require("bootstrap/dist/js/bootstrap.bundle.min") : null
    }, [])
    return (
        <>
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>School | Add Student </title>
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
                                                        <label htmlFor="year"
                                                            className="form-label title-color font-monospace title-font-1.3">Insert
                                                            Row</label>
                                                        <input type="text" value="1" name="row" id="row"
                                                            className="form-control erp-input-dark text-light font-monospace font-13" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="form-group">
                                                        <label htmlFor="class"
                                                            className="form-label title-color font-monospace title-font-1.3">Choose Your
                                                            class</label>
                                                        <select name="month" id="class"
                                                            className="form-select erp-input-dark text-light font-monospace font-13">
                                                            <option value="">Select class</option>
                                                            <option value="Play" selected>Play</option>
                                                            <option value="One">One</option>
                                                            <option value="Two">Two</option>
                                                            <option value="Three">Three</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="form-group">
                                                        <label htmlFor="year"
                                                            className="form-label title-color font-monospace title-font-1.3">Year</label>
                                                        <input type="date" value="2023" name="year" id="year"
                                                            className="form-control erp-input-dark text-light font-monospace font-13" />
                                                    </div>
                                                </div>

                                                <div className="col-lg-3">
                                                    <label htmlFor="action"
                                                        className="form-label title-color font-monospace title-font-1.3"> Choose more
                                                        action</label>
                                                    <div className="d-flex align-items-center">
                                                        <button
                                                            className="btn w-100 me-lg-2 me-sm-2 title-color bg-gradient  font-monospace font-13">View
                                                            All</button>
                                                        <button
                                                            className="btn w-100 me-lg-2 me-sm-2 title-color bg-gradient font-monospace  font-13">Reset
                                                            All</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    {/*<!-- END: Report -->*/}
                                    {/*<!-- start your code -->*/}
                                    <div className="table-responsive position-relative">
                                        <div className="overlap-loader">
                                            <div className="spinner-border text-warning" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        <table id="printable"
                                            className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark">
                                            <caption>Add Student</caption>
                                            <thead className="text-center">
                                                <tr className="erp-tbl-top-head">
                                                    <th scope="col" colSpan={10}>
                                                        <div className="erp-trial-header">
                                                            <h2 className="erp-h2"><b>Delta Computer Science College</b></h2>
                                                            <h3 className="erp-h3"><b>Add Student</b></h3>
                                                            <h4 className="erp-trial-date"><em>As on January 2023</em></h4>
                                                        </div>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th rowSpan={2}>Class</th>
                                                    <th rowSpan={2}>Roll</th>
                                                    <th colSpan={3} className="text-center">Name & Phone</th>
                                                    <th colSpan={2} className="text-center">Address</th>
                                                    <th rowSpan={2}>Action</th>
                                                </tr>
                                                <tr>
                                                    <th>Student</th>
                                                    <th>Father</th>
                                                    <th>Mother</th>
                                                    <th>Present</th>
                                                    <th>Permanent</th>
                                                </tr>

                                            </thead>
                                            <tbody>

                                                <tr>
                                                    <td className="class">Play</td>
                                                    <td className="class-roll"></td>
                                                    <td>
                                                        <input type="text" name="student" id="student" placeholder="Student name"
                                                            className="form-control bg-transparent border-success text-light mb-3" />
                                                        <input type="text" name="phone[]" id="phone" placeholder="Phone number"
                                                            className="form-control bg-transparent border-success text-light" />

                                                    </td>
                                                    <td>
                                                        <input type="text" name="father" id="father" placeholder="Father name"
                                                            className="form-control bg-transparent border-success text-light mb-3" />
                                                        <input type="text" name="phone[]" id="phone" placeholder="Phone number"
                                                            className="form-control bg-transparent border-success text-light" />
                                                    </td>
                                                    <td>
                                                        <input type="text" name="mother[]" id="mother" placeholder="Mother name"
                                                            className="form-control bg-transparent border-success text-light mb-3" />
                                                        <input type="text" name="phone[]" id="phone" placeholder="Phone number"
                                                            className="form-control bg-transparent border-success text-light" />
                                                    </td>
                                                    <td>
                                                        <div className="form-floating">
                                                            <textarea className="form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" id="present-addr"
                                                                style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Present Address</label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-floating">
                                                            <textarea className="form-control text-light bg-transparent border-success"
                                                                placeholder="Permanent address" id="permanent-addr"
                                                                style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Permanent Address</label>
                                                        </div>
                                                    </td>
                                                    <td>

                                                        <button className="add btn btn-success rounded-circle d-block btn-sm mb-2">
                                                            <i className="fas fa fa-add"></i>
                                                        </button>
                                                        <button className="remove btn btn-danger rounded-circle d-block btn-sm ">
                                                            <i className="fas fa fa-trash"></i>
                                                        </button>

                                                    </td>
                                                </tr>

                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colSpan={20} style={{ textAlign: "right" }}>
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
