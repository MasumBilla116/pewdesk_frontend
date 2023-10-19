import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import { useEffect } from 'react'
import Header from "./../../components/Header"
import Aside from "./../../components/Aside"
import ToggleOption from "./../../components/ToggleOption"
import Footer from "./../../components/Footer"
import TablePrint from '@/components/TablePrint'
import TableFilter from '@/components/TableFilter'
import JqueryMin from "./../load_js/plugin/jquery.min.js"
import AsidejQuery from "./../load_js/controllers/AsidejQuery"
import FullScreenMode from "./../load_js/controllers/FullScreenMode"
import PrintMin from "./../load_js/controllers/PrintMin"
import JqueryUiMin from "./../load_js/plugin/JqueryUiMin"
import DraggElements from "./../load_js/controllers/DraggElements"
import PickDate from "./../load_js/controllers/PickDate"
import SweetDeleteAlert from "./../load_js/controllers/SweetDeleteAlert"

export default function Notification() {
    useEffect(() => {
        typeof document !== undefined ? require("bootstrap/dist/js/bootstrap.bundle.min") : null
    }, [])
    return (
        <>
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>School | Notification</title>
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
                                    {/*<!-- start notification -->*/}
                                    <div className="row bg-light rounded">

                                        <div
                                            className="noti-student-img-con col-xxl-2 col-xl-2 col-lg-2 col-md-4 col-sm-6 p-4 d-flex justify-content-center">

                                            <Image width={100} height={50} className="rounded-circle img-fluid" src="/images/user-300x300.jpg" alt="student" />
                                        </div>
                                        <div
                                            className="noti-student-info-con col-xxl-10 col-xl-10 col-lg-10 col-md-8 col-sm-6  d-flex flex-column justify-content-center">
                                            <address>
                                                <h1>Jon Abraham</h1>
                                                <h5>Study in (Delta Computer Science College) </h5>
                                                <h5>Class: XX Roll: 01</h5>
                                            </address>
                                        </div>
                                        <div className="col-12 p-4">
                                            <div className="notification bg-light w-100 h-100">
                                                <nav>
                                                    <div className="nav nav-tabs" id="nav-tab">
                                                        <button className="nav-link active" id="nav-notice-tab" data-bs-toggle="tab"
                                                            data-bs-target="#nav-notice" type="button">Notice</button>
                                                        <button className="nav-link" id="nav-diary-tab" data-bs-toggle="tab"
                                                            data-bs-target="#nav-diary" type="button">Diary</button>
                                                        <button className="nav-link" id="nav-attendance-tab" data-bs-toggle="tab"
                                                            data-bs-target="#nav-attendance" type="button">
                                                            Attendance
                                                        </button>
                                                        <button className="nav-link" id="nav-result-tab" data-bs-toggle="tab"
                                                            data-bs-target="#nav-result" type="button">
                                                            Result
                                                        </button>
                                                    </div>
                                                </nav>
                                                <div className="tab-content" id="nav-tabContent">
                                                    {/*<!-- start notice tab-pane -->*/}
                                                    <div className="tab-pane fade show active pt-4 pb-4" id="nav-notice">
                                                        <h1>Notice</h1>
                                                        <div className="table-responsive">
                                                            <table
                                                                className="table table-bordered table-responsive table-striped table-hover bg-secondary table-secondary">
                                                                <thead>
                                                                    <tr>
                                                                        <th className="bg-secondary">S.I</th>
                                                                        <th className="bg-secondary">Notice</th>
                                                                        <th className="bg-secondary">Date</th>
                                                                        <th className="bg-secondary">Download</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>1</td>
                                                                        <td>Opening :The institution started functioning in 1978
                                                                            from Nursery to
                                                                            class VI.</td>
                                                                        <td>20/12/2023</td>
                                                                        <td>
                                                                            <a href="#" download="notice"
                                                                                className="text-decoration-none btn btn-success rounded-circle text-center">
                                                                                <i className="fas fa fa-download"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>2</td>
                                                                        <td>School : Later on, it extended up to class X in
                                                                            1980 and the students
                                                                            first appeared in the S.S.C examination of1982.</td>
                                                                        <td>20/12/2023</td>
                                                                        <td>
                                                                            <a href="#"
                                                                                className="text-decoration-none btn btn-success rounded-circle text-center">
                                                                                <i className="fas fa fa-download"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    {/*<!-- end notice tab pane -->*/}
                                                    {/*<!-- start diary tab pane -->*/}
                                                    <div className="tab-pane fade" id="nav-diary">
                                                        <h1>Diary</h1>
                                                        <div className="table-responsive">
                                                            <table
                                                                className="font-13 mt-4 erp-table-dark tbl-bg table table-bordered text-light table-dark">
                                                                <caption>Student Diary</caption>
                                                                <thead className="text-center">
                                                                    <tr className="erp-tbl-top-head">
                                                                        <th scope="col" colSpan={10}>
                                                                            <div className="erp-trial-header">
                                                                                <h2 className="erp-h2"><b>Delta Computer Science
                                                                                    College</b></h2>
                                                                                <h3 className="erp-h3"><b>Student Diary</b></h3>
                                                                                <h4 className="erp-trial-date"><em>As on January
                                                                                    01/01/2023</em></h4>
                                                                            </div>
                                                                        </th>
                                                                    </tr>

                                                                    <tr>
                                                                        <th rowSpan={2}>Roll</th>
                                                                        <th rowSpan={2}>Day</th>
                                                                        <th rowSpan={2}>Houre</th>
                                                                        <th colSpan={2} className="text-center">Home Work / H.W</th>
                                                                        <th colSpan={2} className="text-center">Class Test / C.T
                                                                        </th>
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
                                                                   {/* <!-- start one column and row -->*/}
                                                                    <tr>
                                                                        <td>1</td>
                                                                        <td className="date"></td>
                                                                        <td className="time"></td>
                                                                        <td>
                                                                            <div className="form-floating">
                                                                                <textarea
                                                                                    className="today-hw form-control text-light bg-transparent border-success"
                                                                                    placeholder="Present address"
                                                                                    style={{ height: 100 + "px" }}></textarea>
                                                                                <label htmlFor="present-addr">Home Work</label>
                                                                            </div>
                                                                            <hr />
                                                                            <button type="button"
                                                                                className="btn btn-success btn-sm float-end d-block m-2"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#addtodayTask-modal">
                                                                                <i className="fas fa fa-book-open-reader"></i>
                                                                                H.W
                                                                            </button>
                                                                        </td>
                                                                        <td>

                                                                            <div
                                                                                className="d-flex justify-content-between align-items-center">
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
                                                                                className="bg-transparent border-0 w-100 text-light"
                                                                                readOnly disabled />
                                                                            <hr />
                                                                            <div className="form-floating">
                                                                                <textarea
                                                                                    className="form-control text-light bg-transparent border-success"
                                                                                    placeholder="Present address"
                                                                                    style={{ height: 100 + "px" }}></textarea>
                                                                                <label htmlFor="present-addr">Teacher
                                                                                    Comment</label>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div
                                                                                className="d-flex justify-content-center align-items-center">
                                                                                <button type="button"
                                                                                    className="rounded-circle  task-btn task-btn-g me-4">P</button>
                                                                                <button type="button"
                                                                                    className="rounded-circle task-btn task-btn-n">F</button>
                                                                            </div>
                                                                            <hr />
                                                                            <input type="text" value="N/A" name="yhw[]"
                                                                                className="bg-transparent border-0 w-100 text-light"
                                                                                readOnly disabled />
                                                                            <hr />
                                                                            <div className="form-floating">
                                                                                <textarea
                                                                                    className="form-control text-light bg-transparent border-success"
                                                                                    placeholder="Present address"
                                                                                    style={{ height: 100 + "px" }}></textarea>
                                                                                <label htmlFor="present-addr">C.T Mark &
                                                                                    Comment</label>
                                                                            </div>
                                                                        </td>
                                                                        <td>N/A</td>
                                                                        <td>jonabraham</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colSpan={4}>
                                                                            <div className="form-floating">
                                                                                <textarea
                                                                                    className="form-control text-light bg-transparent border-success"
                                                                                    placeholder="Present address"
                                                                                    style={{ height: 100 + "px" }}></textarea>
                                                                                <label htmlFor="present-addr">Parents
                                                                                    Comments</label>
                                                                            </div>
                                                                        </td>
                                                                        <td colSpan={4}>
                                                                            <div className="form-floating">
                                                                                <textarea
                                                                                    className="teacher-comment form-control text-light bg-transparent border-success"
                                                                                    placeholder="Present address"
                                                                                    style={{ height: 100 + "px" }}></textarea>
                                                                                <label htmlFor="present-addr">Teacher
                                                                                    Comments</label>
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
                                                                                    placeholder="Present address"
                                                                                    style={{ height: 100 + "px" }}></textarea>
                                                                                <label htmlFor="present-addr">Home Work</label>
                                                                            </div>
                                                                            <hr />
                                                                            <button type="button"
                                                                                className="btn btn-success btn-sm float-end d-block m-2"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#addtodayTask-modal">
                                                                                <i className="fas fa fa-book-open-reader"></i>
                                                                                H.W
                                                                            </button>
                                                                        </td>
                                                                        <td>

                                                                            <div
                                                                                className="d-flex justify-content-between align-items-center">
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
                                                                                className="bg-transparent border-0 w-100 text-light"
                                                                                readOnly disabled />
                                                                            <hr />
                                                                            <div className="form-floating">
                                                                                <textarea
                                                                                    className="form-control text-light bg-transparent border-success"
                                                                                    placeholder="Present address"
                                                                                    style={{ height: 100 + "px" }}></textarea>
                                                                                <label htmlFor="present-addr">Teacher
                                                                                    Comment</label>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div
                                                                                className="d-flex justify-content-center align-items-center">
                                                                                <button type="button"
                                                                                    className="rounded-circle  task-btn task-btn-g me-4">P</button>
                                                                                <button type="button"
                                                                                    className="rounded-circle task-btn task-btn-n">F</button>
                                                                            </div>
                                                                            <hr />
                                                                            <input type="text" value="N/A" name="yhw[]"
                                                                                className="bg-transparent border-0 w-100 text-light"
                                                                                readOnly disabled />
                                                                            <hr />
                                                                            <div className="form-floating">
                                                                                <textarea
                                                                                    className="form-control text-light bg-transparent border-success"
                                                                                    placeholder="Present address"
                                                                                    style={{ height: 100 + "px" }}></textarea>
                                                                                <label htmlFor="present-addr">C.T Mark &
                                                                                    Comment</label>
                                                                            </div>
                                                                        </td>
                                                                        <td>N/A</td>
                                                                        <td>jonabraham</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colSpan={4}>
                                                                            <div className="form-floating">
                                                                                <textarea
                                                                                    className="form-control text-light bg-transparent border-success"
                                                                                    placeholder="Present address"
                                                                                    style={{ height: 100 + "px" }}></textarea>
                                                                                <label htmlFor="present-addr">Parents
                                                                                    Comments</label>
                                                                            </div>
                                                                        </td>
                                                                        <td colSpan={4}>
                                                                            <div className="form-floating">
                                                                                <textarea
                                                                                    className="teacher-comment form-control text-light bg-transparent border-success"
                                                                                    placeholder="Present address"
                                                                                    style={{ height: 100 + "px" }}></textarea>
                                                                                <label htmlFor="present-addr">Teacher
                                                                                    Comments</label>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    {/*<!-- end one column and row -->*/}
                                                                </tbody>
                                                                <tfoot>

                                                                </tfoot>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    {/*<!-- end diary tab pane -->*/}
                                                    {/*<!-- start student attendace calendar -->*/}
                                                    <div className="tab-pane fade" id="nav-attendance">
                                                        <h1>Attendance</h1>
                                                        <div className="attendance-calendar"></div>
                                                    </div>
                                                    {/*<!-- end student attendace calendar -->*/}
                                                    {/*<!-- start student result -->*/}
                                                    <div className="tab-pane fade" id="nav-result">
                                                        <h1>Result</h1>
                                                        <div className="table-responsive">
                                                            <table id="printable"
                                                                className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark">
                                                                <caption>Student Result Sheet</caption>
                                                                <thead className="text-center">
                                                                    <tr className="erp-tbl-top-head">
                                                                        <th scope="col" colSpan={10}>
                                                                            <div className="erp-trial-header">
                                                                                <h2 className="erp-h2"><b>Delta Computer Science
                                                                                    College</b></h2>
                                                                                <h3 className="erp-h3"><b>Student Result Sheet</b>
                                                                                </h3>
                                                                                <h4 className="erp-trial-date"><em>As on January
                                                                                    2023</em></h4>
                                                                            </div>
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>S.I</th>
                                                                        <th>Subject Name</th>
                                                                        <th>Mark</th>
                                                                        <th>Grade</th>
                                                                        <th>Points</th>
                                                                        <th>CGPA</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>01</td>
                                                                        <td>Math</td>
                                                                        <td>100/96</td>
                                                                        <td>A+</td>
                                                                        <td>5</td>
                                                                        <td rowSpan={20}>5</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>2</td>
                                                                        <td>English</td>
                                                                        <td>100/85</td>
                                                                        <td>A+</td>
                                                                        <td>5</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>3</td>
                                                                        <td>Bengali</td>
                                                                        <td>100/90</td>
                                                                        <td>A+</td>
                                                                        <td>5</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>4</td>
                                                                        <td>Biology</td>
                                                                        <td>100/88</td>
                                                                        <td>A+</td>
                                                                        <td>5</td>
                                                                    </tr>
                                                                </tbody>
                                                                <tfoot>
                                                                    <tr>
                                                                        <td colSpan={20} style={{textAlign: "right"}}>
                                                                            <button id="print" type="button"
                                                                                className=" btn btn-success shadow-dark me-4">
                                                                                <i className="fas fa fa-print"></i> Print
                                                                            </button>
                                                                            <button type="button"
                                                                                className="btn btn-primary shadow-dark pdf-download-btn"
                                                                                data-target="result" data-pdf="result.pdf">
                                                                                <i className="fas fa fa-download"></i>
                                                                                Download
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div>

                                                    </div>
                                                    {/*<!-- end student result -->*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*<!-- end notification -->*/}
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
