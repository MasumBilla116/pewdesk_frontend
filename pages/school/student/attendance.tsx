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

export default function Attendance() {
    useEffect(() => {
        typeof document !== undefined ? require("bootstrap/dist/js/bootstrap.bundle.min") : null
    }, [])
    return (
        <>
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>School | Student Attendance</title>
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
                                    <div className="container main-con">
                                        <div className="d-flex justify-content-between align-items-center w-100">
                                            <h4 className="text-white">Student List</h4>
                                            <div>
                                                <p className="text-white"><strong>Dept:</strong> CSE</p>
                                                <p className="text-white"><strong>Total student:</strong> 60</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="mt-4 mb-4 col-xl-2 col-lg-2 col-md-4 col-sm-6">
                                                {/*<!-- start student card -->*/}
                                                <div className="student-card">
                                                    <div
                                                        className="w-100 rounded-circle position-relative d-flex justify-content-center align-items-center">
                                                        <Image width={90} height={50}  src="/images/user-300x300.jpg"  className="img-fluid"  alt="student" />
                                                        <button type="button" className="view" data-bs-toggle="modal"
                                                            data-bs-target="#student-details-1">
                                                            <i className="fas fa fa-eye "></i>
                                                        </button>
                                                    </div>

                                                    <p className="text-white m-0">Jon Abraham</p>
                                                    <p className="text-warning m-0">25487</p>
                                                    <div className="student-card-body">
                                                        <button type="button" className="student-card-btn student-present">P</button>
                                                        <button type="button" className="student-card-btn  student-absent">A</button>
                                                        <button type="button" className="student-card-btn  student-null">N</button>
                                                    </div>
                                                </div>
                                                {/* <!-- end student card -->*/}
                                            </div>
                                            <div className="mt-4 mb-4 col-xl-2 col-lg-3 col-md-4 col-sm-6">
                                                {/* <!-- start student card -->*/}
                                                <div className="student-card">
                                                    <div
                                                        className="w-100 rounded-circle position-relative d-flex justify-content-center align-items-center">
                                                        <Image width={90} height={50}  src="/images/user-300x300.jpg"  className="img-fluid"  alt="" />
                                                        <button type="button" className="view" data-bs-toggle="modal"
                                                            data-bs-target="#student-details-1">
                                                            <i className="fas fa fa-eye "></i>
                                                        </button>
                                                    </div>

                                                    <p className="text-white m-0">Jon Abraham</p>
                                                    <p className="text-warning m-0">25487</p>
                                                    <div className="student-card-body">
                                                        <button type="button" className="student-card-btn student-present">P</button>
                                                        <button type="button" className="student-card-btn  student-absent">A</button>
                                                        <button type="button" className="student-card-btn  student-null">N</button>
                                                    </div>
                                                </div>
                                                {/*<!-- end student card -->*/}
                                            </div>
                                            <div className="mt-4 mb-4 col-xl-2 col-lg-3 col-md-4 col-sm-6">
                                                {/*<!-- start student card -->*/}
                                                <div className="student-card">
                                                    <div
                                                        className="w-100 rounded-circle position-relative d-flex justify-content-center align-items-center">
                                                        <Image width={90} height={50}  src="/images/user-300x300.jpg"  className="img-fluid"  alt="" />
                                                        <button type="button" className="view" data-bs-toggle="modal"
                                                            data-bs-target="#student-details-1">
                                                            <i className="fas fa fa-eye "></i>
                                                        </button>
                                                    </div>

                                                    <p className="text-white m-0">Jon Abraham</p>
                                                    <p className="text-warning m-0">25487</p>
                                                    <div className="student-card-body">
                                                        <button type="button" className="student-card-btn student-present">P</button>
                                                        <button type="button" className="student-card-btn  student-absent">A</button>
                                                        <button type="button" className="student-card-btn  student-null">N</button>
                                                    </div>
                                                </div>
                                                {/*<!-- end student card -->*/}
                                            </div>
                                            <div className="mt-4 mb-4 col-xl-2 col-lg-3 col-md-4 col-sm-6">
                                                {/*<!-- start student card -->*/}
                                                <div className="student-card">
                                                    <div
                                                        className="w-100 rounded-circle position-relative d-flex justify-content-center align-items-center">
                                                        <Image width={90} height={50}  src="/images/user-300x300.jpg"  className="img-fluid"  alt="" />
                                                        <button type="button" className="view" data-bs-toggle="modal"
                                                            data-bs-target="#student-details-1">
                                                            <i className="fas fa fa-eye "></i>
                                                        </button>
                                                    </div>

                                                    <p className="text-white m-0">Jon Abraham</p>
                                                    <p className="text-warning m-0">25487</p>
                                                    <div className="student-card-body">
                                                        <button type="button" className="student-card-btn student-present">P</button>
                                                        <button type="button" className="student-card-btn  student-absent">A</button>
                                                        <button type="button" className="student-card-btn  student-null">N</button>
                                                    </div>
                                                </div>
                                                {/*<!-- end student card -->*/}
                                            </div>
                                        </div>
                                    </div>
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
            {/* <!-- start moal section -->*/}
            <div id="student-details-1" className="modal">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h1>Jon Abraham</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="student-1"></div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--  end modal section -->*/}
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
