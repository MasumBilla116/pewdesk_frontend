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

export default function Diary() {
    useEffect(() => {
        typeof document !== undefined ? require("bootstrap/dist/js/bootstrap.bundle.min") : null
    }, [])
    return (
        <>
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>School | Student Diary</title>
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
                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <label htmlFor="year"
                                                            className="form-label title-color font-monospace title-font-1.3">Choose
                                                            Class</label>
                                                        <select name="month" id="month"
                                                            className="form-select erp-input-dark text-secondary font-monospace font-13">
                                                            <option value="">Select class</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <label htmlFor="year"
                                                            className="form-label title-color font-monospace title-font-1.3">Teacher</label>
                                                        <select name="month" id="month"
                                                            className="form-select erp-input-dark text-secondary font-monospace font-13">
                                                            <option value="">Select class teacher name</option>
                                                            <option value="jon">Jon</option>
                                                            <option value="abraham">Abraham</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
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
                                        <div id="task-btn-container" className="d-flex float-end m-2">
                                            <button type="button" className="btn btn-success btn-sm" data-bs-toggle="modal"
                                                data-bs-target="#addtodayTask-modal">
                                                <i className="fas fa fa-book-open-reader"></i>
                                                H.W
                                            </button>
                                            <button type="button" className="ms-2 btn btn-success btn-sm" data-bs-toggle="modal"
                                                data-bs-target="#yhw-modal">
                                                <i className="fas fa fa-th-list"></i>
                                                Y.H.W
                                            </button>
                                            <button type="button" className="ms-2 btn btn-success btn-sm" data-bs-toggle="modal"
                                                data-bs-target="#ct-modal">
                                                <i className="fas fa fa-pen"></i>
                                                C.T
                                            </button>
                                            <button type="button" className="ms-2 btn btn-success btn-sm" data-bs-toggle="modal"
                                                data-bs-target="#comment-modal">
                                                <i className="fas fa fa-comment"></i>
                                                Comment
                                            </button>
                                        </div>
                                        <table id="printable"
                                            className="font-13 mt-4 erp-table-dark tbl-bg table table-bordered text-light table-dark">
                                            <caption>Student Diary</caption>
                                            <thead className="text-center">
                                                <tr className="erp-tbl-top-head">
                                                    <th scope="col" colSpan={10}>
                                                        <div className="erp-trial-header">
                                                            <h2 className="erp-h2"><b>Delta Computer Science College</b></h2>
                                                            <h3 className="erp-h3"><b>Student Diary</b></h3>
                                                            <h4 className="erp-trial-date"><em>As on January 01/01/2023</em></h4>
                                                        </div>
                                                    </th>
                                                </tr>

                                                <tr>
                                                    <th rowSpan={2}>Roll</th>
                                                    <th rowSpan={2}>Day</th>
                                                    <th rowSpan={2}>Houre</th>
                                                    <th colSpan={2} className="text-center">Home Work / H.W</th>
                                                    <th colSpan={2} className="text-center">Class Test / C.T</th>
                                                    <th rowSpan={2}>Teacher <br />Signature</th>
                                                </tr>
                                                <tr>
                                                    <th>Today H.W</th>
                                                    <th>Yeasterday H.W</th>
                                                    <th>Today C.T</th>
                                                    <th>Yesterday C.T</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/*<!-- start one column and row -->*/}
                                                <tr>
                                                    <td>1</td>
                                                    <td className="date"></td>
                                                    <td className="time"></td>
                                                    <td>
                                                        <div className="form-floating">
                                                            <textarea
                                                                className="today-hw form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Home Work</label>
                                                        </div>
                                                        <hr />
                                                        <button type="button" className="btn btn-success btn-sm float-end d-block m-2"
                                                            data-bs-toggle="modal" data-bs-target="#addtodayTask-modal">
                                                            <i className="fas fa fa-book-open-reader"></i>
                                                            H.W
                                                        </button>
                                                    </td>
                                                    <td>

                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-c">C</button>
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-g">G</button>
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-b">B</button>
                                                            <button type="button"
                                                                className="rounded-circle task-btn task-btn-n">N</button>
                                                        </div>
                                                        <hr />
                                                        <input type="text" value="N/A" name="yhw[]"
                                                            className="bg-transparent border-0 w-100 text-light" readOnly disabled />
                                                        <hr />
                                                        <div className="form-floating">
                                                            <textarea className="form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Teacher Comment</label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-g me-4">P</button>
                                                            <button type="button"
                                                                className="rounded-circle task-btn task-btn-n">F</button>
                                                        </div>
                                                        <hr />
                                                        <input type="text" value="N/A" name="yhw[]"
                                                            className="bg-transparent border-0 w-100 text-light" readOnly disabled />
                                                        <hr />
                                                        <div className="form-floating">
                                                            <textarea className="form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">C.T Mark & Comment</label>
                                                        </div>
                                                    </td>
                                                    <td>N/A</td>
                                                    <td>jonabraham</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={4}>
                                                        <div className="form-floating">
                                                            <textarea className="form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Parents Comments</label>
                                                        </div>
                                                    </td>
                                                    <td colSpan={4}>
                                                        <div className="form-floating">
                                                            <textarea
                                                                className="teacher-comment form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Teacher Comments</label>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {/*<!-- end one column and row -->*/}
                                                {/*<!-- start one column and row -->*/}
                                                <tr>
                                                    <td>1</td>
                                                    <td className="date"></td>
                                                    <td className="time"></td>
                                                    <td>
                                                        <div className="form-floating">
                                                            <textarea
                                                                className="today-hw form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Home Work</label>
                                                        </div>
                                                        <hr />
                                                        <button type="button" className="btn btn-success btn-sm float-end d-block m-2"
                                                            data-bs-toggle="modal" data-bs-target="#addtodayTask-modal">
                                                            <i className="fas fa fa-book-open-reader"></i>
                                                            H.W
                                                        </button>
                                                    </td>
                                                    <td>

                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-c">C</button>
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-g">G</button>
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-b">B</button>
                                                            <button type="button"
                                                                className="rounded-circle task-btn task-btn-n">N</button>
                                                        </div>
                                                        <hr />
                                                        <input type="text" value="N/A" name="yhw[]"
                                                            className="bg-transparent border-0 w-100 text-light" readOnly disabled />
                                                        <hr />
                                                        <div className="form-floating">
                                                            <textarea className="form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Teacher Comment</label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-g me-4">P</button>
                                                            <button type="button"
                                                                className="rounded-circle task-btn task-btn-n">F</button>
                                                        </div>
                                                        <hr />
                                                        <input type="text" value="N/A" name="yhw[]"
                                                            className="bg-transparent border-0 w-100 text-light" readOnly disabled />
                                                        <hr />
                                                        <div className="form-floating">
                                                            <textarea className="form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">C.T Mark & Comment</label>
                                                        </div>
                                                    </td>
                                                    <td>N/A</td>
                                                    <td>jonabraham</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={4}>
                                                        <div className="form-floating">
                                                            <textarea className="form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Parents Comments</label>
                                                        </div>
                                                    </td>
                                                    <td colSpan={4}>
                                                        <div className="form-floating">
                                                            <textarea
                                                                className="teacher-comment form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Teacher Comments</label>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {/*<!-- end one column and row -->*/}
                                                {/* <!-- start one column and row -->*/}
                                                <tr>
                                                    <td>1</td>
                                                    <td className="date"></td>
                                                    <td className="time"></td>
                                                    <td>
                                                        <div className="form-floating">
                                                            <textarea
                                                                className="today-hw form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Home Work</label>
                                                        </div>
                                                        <hr />
                                                        <button type="button" className="btn btn-success btn-sm float-end d-block m-2"
                                                            data-bs-toggle="modal" data-bs-target="#addtodayTask-modal">
                                                            <i className="fas fa fa-book-open-reader"></i>
                                                            H.W
                                                        </button>
                                                    </td>
                                                    <td>

                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-c">C</button>
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-g">G</button>
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-b">B</button>
                                                            <button type="button"
                                                                className="rounded-circle task-btn task-btn-n">N</button>
                                                        </div>
                                                        <hr />
                                                        <input type="text" value="N/A" name="yhw[]"
                                                            className="bg-transparent border-0 w-100 text-light" readOnly disabled />
                                                        <hr />
                                                        <div className="form-floating">
                                                            <textarea className="form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Teacher Comment</label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-g me-4">P</button>
                                                            <button type="button"
                                                                className="rounded-circle task-btn task-btn-n">F</button>
                                                        </div>
                                                        <hr />
                                                        <input type="text" value="N/A" name="yhw[]"
                                                            className="bg-transparent border-0 w-100 text-light" readOnly disabled />
                                                        <hr />
                                                        <div className="form-floating">
                                                            <textarea className="form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">C.T Mark & Comment</label>
                                                        </div>
                                                    </td>
                                                    <td>N/A</td>
                                                    <td>jonabraham</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={4}>
                                                        <div className="form-floating">
                                                            <textarea className="form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Parents Comments</label>
                                                        </div>
                                                    </td>
                                                    <td colSpan={4}>
                                                        <div className="form-floating">
                                                            <textarea
                                                                className="teacher-comment form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Teacher Comments</label>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {/*<!-- end one column and row -->*/}
                                                {/*<!-- start one column and row -->*/}
                                                <tr>
                                                    <td>1</td>
                                                    <td className="date"></td>
                                                    <td className="time"></td>
                                                    <td>
                                                        <div className="form-floating">
                                                            <textarea
                                                                className="today-hw form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Home Work</label>
                                                        </div>
                                                        <hr />
                                                        <button type="button" className="btn btn-success btn-sm float-end d-block m-2"
                                                            data-bs-toggle="modal" data-bs-target="#addtodayTask-modal">
                                                            <i className="fas fa fa-book-open-reader"></i>
                                                            H.W
                                                        </button>
                                                    </td>
                                                    <td>

                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-c">C</button>
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-g">G</button>
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-b">B</button>
                                                            <button type="button"
                                                                className="rounded-circle task-btn task-btn-n">N</button>
                                                        </div>
                                                        <hr />
                                                        <input type="text" value="N/A" name="yhw[]"
                                                            className="bg-transparent border-0 w-100 text-light" readOnly disabled />
                                                        <hr />
                                                        <div className="form-floating">
                                                            <textarea className="form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Teacher Comment</label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-g me-4">P</button>
                                                            <button type="button"
                                                                className="rounded-circle task-btn task-btn-n">F</button>
                                                        </div>
                                                        <hr />
                                                        <input type="text" value="N/A" name="yhw[]"
                                                            className="bg-transparent border-0 w-100 text-light" readOnly disabled />
                                                        <hr />
                                                        <div className="form-floating">
                                                            <textarea className="form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">C.T Mark & Comment</label>
                                                        </div>
                                                    </td>
                                                    <td>N/A</td>
                                                    <td>jonabraham</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={4}>
                                                        <div className="form-floating">
                                                            <textarea className="form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Parents Comments</label>
                                                        </div>
                                                    </td>
                                                    <td colSpan={4}>
                                                        <div className="form-floating">
                                                            <textarea
                                                                className="teacher-comment form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Teacher Comments</label>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {/*<!-- end one column and row -->*/}
                                                {/*<!-- start one column and row -->*/}
                                                <tr>
                                                    <td>1</td>
                                                    <td className="date"></td>
                                                    <td className="time"></td>
                                                    <td>
                                                        <div className="form-floating">
                                                            <textarea
                                                                className="today-hw form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Home Work</label>
                                                        </div>
                                                        <hr />
                                                        <button type="button" className="btn btn-success btn-sm float-end d-block m-2"
                                                            data-bs-toggle="modal" data-bs-target="#addtodayTask-modal">
                                                            <i className="fas fa fa-book-open-reader"></i>
                                                            H.W
                                                        </button>
                                                    </td>
                                                    <td>

                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-c">C</button>
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-g">G</button>
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-b">B</button>
                                                            <button type="button"
                                                                className="rounded-circle task-btn task-btn-n">N</button>
                                                        </div>
                                                        <hr />
                                                        <input type="text" value="N/A" name="yhw[]"
                                                            className="bg-transparent border-0 w-100 text-light" readOnly disabled />
                                                        <hr />
                                                        <div className="form-floating">
                                                            <textarea className="form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Teacher Comment</label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-g me-4">P</button>
                                                            <button type="button"
                                                                className="rounded-circle task-btn task-btn-n">F</button>
                                                        </div>
                                                        <hr />
                                                        <input type="text" value="N/A" name="yhw[]"
                                                            className="bg-transparent border-0 w-100 text-light" readOnly disabled />
                                                        <hr />
                                                        <div className="form-floating">
                                                            <textarea className="form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">C.T Mark & Comment</label>
                                                        </div>
                                                    </td>
                                                    <td>N/A</td>
                                                    <td>jonabraham</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={4}>
                                                        <div className="form-floating">
                                                            <textarea className="form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Parents Comments</label>
                                                        </div>
                                                    </td>
                                                    <td colSpan={4}>
                                                        <div className="form-floating">
                                                            <textarea
                                                                className="teacher-comment form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Teacher Comments</label>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {/*<!-- end one column and row -->*/}
                                                {/*<!-- start one column and row -->*/}
                                                <tr>
                                                    <td>1</td>
                                                    <td className="date"></td>
                                                    <td className="time"></td>
                                                    <td>
                                                        <div className="form-floating">
                                                            <textarea
                                                                className="today-hw form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Home Work</label>
                                                        </div>
                                                        <hr />
                                                        <button type="button" className="btn btn-success btn-sm float-end d-block m-2"
                                                            data-bs-toggle="modal" data-bs-target="#addtodayTask-modal">
                                                            <i className="fas fa fa-book-open-reader"></i>
                                                            H.W
                                                        </button>
                                                    </td>
                                                    <td>

                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-c">C</button>
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-g">G</button>
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-b">B</button>
                                                            <button type="button"
                                                                className="rounded-circle task-btn task-btn-n">N</button>
                                                        </div>
                                                        <hr />
                                                        <input type="text" value="N/A" name="yhw[]"
                                                            className="bg-transparent border-0 w-100 text-light" readOnly disabled />
                                                        <hr />
                                                        <div className="form-floating">
                                                            <textarea className="form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Teacher Comment</label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <button type="button"
                                                                className="rounded-circle  task-btn task-btn-g me-4">P</button>
                                                            <button type="button"
                                                                className="rounded-circle task-btn task-btn-n">F</button>
                                                        </div>
                                                        <hr />
                                                        <input type="text" value="N/A" name="yhw[]"
                                                            className="bg-transparent border-0 w-100 text-light" readOnly disabled />
                                                        <hr />
                                                        <div className="form-floating">
                                                            <textarea className="form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">C.T Mark & Comment</label>
                                                        </div>
                                                    </td>
                                                    <td>N/A</td>
                                                    <td>jonabraham</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={4}>
                                                        <div className="form-floating">
                                                            <textarea className="form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Parents Comments</label>
                                                        </div>
                                                    </td>
                                                    <td colSpan={4}>
                                                        <div className="form-floating">
                                                            <textarea
                                                                className="teacher-comment form-control text-light bg-transparent border-success"
                                                                placeholder="Present address" style={{ height: 100 + "px" }}></textarea>
                                                            <label htmlFor="present-addr">Teacher Comments</label>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {/*<!-- end one column and row -->*/}

                                            </tbody>
                                            <tfoot>

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
            {/*<!-- start teacher Comments -->*/}

            <div className="modal" id="comment-modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Teacher Comment</h3>
                            <button type="button" className=" btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-floating">
                                <textarea className="form-control w-100 bg-transparent border-success shadow-none"
                                    id="comment-write" style={{ height: 100 + "%" }} spellCheck="true" autoComplete="true"></textarea>
                                <label htmlFor="present-addr">Your Comment</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="spinner-border spinner spinner-border-sm  text-success d-none">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <i className="fas fa fa-check text-success cmnts-add-success-check d-none"></i>
                            <i className="fas fa fa-pen text-danger cmnts-pls-write-error d-none"></i>
                            <button type="button" id="add-comment" className="btn btn-success comment">
                                <i className="fas fa fa-book-reader"></i>
                                Add
                            </button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/*<!-- end teacher Comments -->*/}


            {/*<!-- start C.T-->*/}
            <div className="modal" id="ct-modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Class Test / C.T</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <p><strong>All Students Class Test is..</strong></p>
                            <hr />
                            <div className="form-check">
                                <input className="form-check-input ct-cust-input-field" type="radio" name="yhw" value="P"
                                    id="ct-input-field-p" />
                                <label className="form-check-label" htmlFor="ct-input-field-p">
                                    Pass
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input ct-cust-input-field" type="radio" name="yhw" value="F"
                                    id="ct-input-field-f" />
                                <label className="form-check-label" htmlFor="ct-input-field-f">
                                    Failed
                                </label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/*<!-- end C.T-->*/}

            {/*<!-- start Yeasterday H.W-->*/}
            <div className="modal" id="yhw-modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Yeasterday H.W</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <p><strong>All Students Yeasterday Home Work is..</strong></p>
                            <hr />
                            <div className="form-check">
                                <input className="form-check-input yhw-cust-input-field" type="radio" name="yhw" value="C"
                                    id="yhw-input-field-c" />
                                <label className="form-check-label" htmlFor="yhw-input-field-c">
                                    Complete
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input yhw-cust-input-field" type="radio" name="yhw" value="G"
                                    id="yhw-input-field-g" />
                                <label className="form-check-label" htmlFor="yhw-input-field-g">
                                    Good
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input yhw-cust-input-field" type="radio" name="yhw" value="B"
                                    id="yhw-input-field-b" />
                                <label className="form-check-label" htmlFor="yhw-input-field-b">
                                    Better
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input yhw-cust-input-field" type="radio" name="yhw" value="N"
                                    id="yhw-input-field-n" />
                                <label className="form-check-label" htmlFor="yhw-input-field-n">
                                    Not Complete
                                </label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/*<!-- end Yeasterday H.W -->*/}


            {/*<!-- start add today task or home work modal -->*/}
            <div className="modal" id="addtodayTask-modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Write your Home work</h3>
                            <button type="button" className=" btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-floating">
                                <textarea className="form-control w-100 bg-transparent border-success shadow-none"
                                    id="today-hw-write" style={{ height: 100 + "%" }} spellCheck="true" autoComplete="true"></textarea>
                                <label htmlFor="present-addr">To-Day Home Work</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="spinner-border spinner spinner-border-sm  text-success d-none">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <i className="fas fa fa-check text-success hw-add-success-check d-none"></i>
                            <i className="fas fa fa-pen text-danger hw-pls-write-error d-none"></i>
                            <button type="button" id="add-today-hw" className="btn btn-success hw">

                                <i className="fas fa fa-book-reader"></i>
                                Add
                            </button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/*<!-- end add today task or home work modal -->*/}
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
