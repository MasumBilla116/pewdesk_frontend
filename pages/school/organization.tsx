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

export default function Organization() {
    useEffect(() => {
        typeof document !== undefined ? require("bootstrap/dist/js/bootstrap.bundle.min") : null
    }, [])
    return (
        <>
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title> Organization</title>
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
                                    {/*<!-- start your code -->*/}
                                    <div className="container p-0 mb-5">
                                        {/*<!-- Slider main container -->*/}
                                        <div className="swiper top-slider w-100 position-relative">
                                            <div className="position-absolute swiper-btn-right">
                                                <button type="button" className="me-4 btn rounded-circle border-light  text-light"
                                                    id="swiper-button-prev"><i className="fas fa fa-caret-left"></i></button>
                                                <button type="button" className="btn rounded-circle border-light  text-light"
                                                    id="swiper-button-next"><i className="fas fa fa-caret-right"></i></button>
                                            </div>
                                            <div className="swiper-wrapper">
                                                <div className="swiper-slide rounded">
                                                    <Image width={400} height={200} src="/organization/1.jpg" alt="portfolio"
                                                        className="img-fluid rounded w-100 " />
                                                </div>
                                                <div className="swiper-slide rounded">
                                                    <Image width={400} height={200} src="/organization/2.jpg" alt="portfolio"
                                                        className="img-fluid rounded  w-100" />
                                                </div>
                                                <div className="swiper-slide rounded">
                                                    <Image width={400} height={200} src="/organization/3.jpg" alt="portfolio"
                                                        className="img-fluid rounded  w-100 " />
                                                </div>
                                                <div className="swiper-slide rounded">
                                                    <Image width={400} height={200} src="/organization/4.jpg" alt="portfolio"
                                                        className="img-fluid rounded  w-100 " />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container p-0 mt-4 mb-5 rounded bg-gradient border-top border-black">
                                            <div>
                                                <i className="fas fa fa-hand-pointer "></i>
                                                <a href="#" className="text-blinking">
                                                    Hot news yeasterday campus off
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    {/*<!-- start welcome text -->*/}
                                    <div className="container mb-5 rounded erp-bg-back box-shadow">
                                        <div className="row">
                                            <div className="col-12">
                                                <h1 className="text-primary mt-2 font-weight-bolder text-shadow text-capitalize">
                                                    Welcome to Delta College
                                                </h1>
                                                <hr />
                                                <div className="swiper inline-min-slider me-4">
                                                    <div className="swiper-wrapper">
                                                        <div className="swiper-slide rounded">
                                                            <Image width={150} height={300} src="/images/user-300x300.jpg"
                                                                className="me-4 img-fluid rounded" alt="" />
                                                            <p className="text-center text-success font-weight-bolder">Principal</p>
                                                        </div>
                                                        <div className="swiper-slide rounded">
                                                            <Image width={150} height={300} src="/images/user-300x300.jpg"
                                                                className="me-4 img-fluid rounded" alt="" />
                                                            <p className="text-center text-success font-weight-bolder">Principal</p>
                                                        </div>
                                                        <div className="swiper-slide rounded">
                                                            <Image width={150} height={300} src="/images/user-300x300.jpg"
                                                                className="me-4 img-fluid rounded" alt="" />
                                                            <p className="text-center text-success font-weight-bolder">Principal</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="text-light-blue text-justify">
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur eligendi
                                                    autem debitis exercitationem maxime vel voluptatum saepe necessitatibus. Esse
                                                    odit dolorum cupiditate ullam qui sit quia omnis harum quos voluptate!
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos aspernatur nihil
                                                    impedit consectetur maiores optio ea sit, possimus nobis commodi nostrum, vitae

                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore maiores
                                                    perferendis voluptates eaque

                                                    doloremque vero, natus animi earum voluptatem
                                                    officiis, modi veniam vel corrupti exercitationem magnam officia in quidem
                                                    maxime. officia aut molestias

                                                    minima eos adipisci pariatur tempora.
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur eligendi
                                                    autem debitis exercitationem maxime vel voluptatum saepe necessitatibus. Esse
                                                    odit dolorum cupiditate ullam qui sit quia omnis harum quos voluptate!
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos aspernatur nihil
                                                    impedit consectetur maiores optio ea sit, possimus nobis commodi nostrum, vitae

                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore maiores
                                                    perferendis voluptates eaque

                                                    doloremque vero, natus animi earum voluptatem
                                                    officiis, modi veniam vel corrupti exercitationem magnam officia in quidem
                                                    maxime. officia aut molestias

                                                    minima eos adipisci pariatur tempora.
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                    {/*<!-- end welcome text -->*/}
                                    {/*<!-- start notice -->*/}
                                    <div className="container p-4 rounded mb-5 erp-bg-back box-shadow">
                                        <h1 className="text-bisque text-shadow font-cursive">Notice Board</h1>
                                        <div className="notice-board">
                                            <table
                                                className="table table-bordered table-responsive table-striped table-hover bg-dark table-dark">
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
                                                        <td>Opening :The institution started functioning in 1978 from Nursery to
                                                            class VI.</td>
                                                        <td>20/12/2023</td>
                                                        <td>
                                                            <a href="#"
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
                                    {/*<!-- end notice -->*/}
                                    {/*<!-- start education is life section -->*/}
                                    <div className="container mb-5">
                                        <div className="row">
                                            <div className="col-lg-8">
                                                <Image width={500} height={100} src="/theme_images/undraw_teacher.svg" className="img-fluid"
                                                    alt="teacher" />
                                            </div>
                                            <div className="col-lg-4  erp-bg-back p-4 rounded box-shadow">
                                                <h1 className="text-bisque text-shadow">Education is life</h1>
                                                <hr />
                                                <p className="d-block text-light-blue">Lorem ipsum dolor sit amet consectetur
                                                    adipisicing elit. Magnam,
                                                    ipsum
                                                    laudantium? Vel suscipit repellendus, error maxime enim temporibus fugiat a
                                                    dolore recusandae earum commodi rerum minus explicabo vitae delectus
                                                    consequuntur?</p>
                                                {/*<!-- start icon wraper -->*/}
                                                <div
                                                    className="d-flex mt-4 justify-content-start align-content-center align-items-center custom-icon-wraper">
                                                    <span className="icon-wraper me-3">
                                                        <i className="fas fa fa-graduation-cap"></i>
                                                    </span>
                                                    <p className="mt-4 text-light-blue">22,931 Yearly Graduates</p>
                                                </div>
                                                <div
                                                    className="d-flex mt-4 justify-content-start align-content-center align-items-center custom-icon-wraper">
                                                    <span className="icon-wraper me-3">
                                                        <i className="fas fa fa-university"></i>
                                                    </span>
                                                    <p className="mt-4 text-light-blue">150 Universities Worldwide</p>
                                                </div>
                                                {/*<!-- end icon waper -->*/}
                                            </div>
                                        </div>
                                    </div>
                                    {/*<!-- end education is life section -->*/}
                                    {/*<!-- start why choose us  -->*/}
                                    <div className="container mb-5 mt-5">
                                        <div className="row">
                                            <div className="col-lg-5 erp-bg-back p-4 rounded box-shadow">
                                                <h1 className="text-bisque text-shadow">Strive for Excellent</h1>
                                                <hr />
                                                <p className="text-light-blue">
                                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum accusantium
                                                    inventore vero aperiam, dolorem quisquam nesciunt nihil. Officiis id accusamus
                                                    quas
                                                    culpa aliquid, labore eaque perferendis et fugiat at cum!
                                                </p>
                                                {/*<!-- start icon wraper -->*/}
                                                <div
                                                    className="d-flex mt-4 justify-content-start align-content-center align-items-center custom-icon-wraper">
                                                    <span className="icon-wraper me-3">
                                                        <i className="fas fa fa-graduation-cap"></i>
                                                    </span>
                                                    <p className="mt-4 text-light-blue">22,931 Yearly Graduates</p>
                                                </div>
                                                <div
                                                    className="d-flex mt-4 justify-content-start align-content-center align-items-center custom-icon-wraper">
                                                    <span className="icon-wraper me-3">
                                                        <i className="fas fa fa-university"></i>
                                                    </span>
                                                    <p className="mt-4 text-light-blue">150 Universities Worldwide</p>
                                                </div>
                                                {/*<!-- end icon waper -->*/}
                                            </div>
                                            <div className="col-lg-7">
                                                <Image width={500} height={300} className="img-fluid" src="/theme_images/undraw_teaching.svg"
                                                    alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    {/*<!-- end why choose us -->*/}
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-7">
                                                <Image width={500} height={300} src="/theme_images/Workflow_Flat.svg" alt="switch"
                                                    className="img-fluid m-auto" />
                                            </div>
                                            <div className="col-lg-5 erp-bg-back p-4 rounded box-shadow">
                                                <h1 className="text-bisque text-shadow">We are communicate each to other</h1>
                                                <hr />
                                                <p className="text-light-blue">
                                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum accusantium
                                                    inventore vero aperiam, dolorem quisquam nesciunt nihil. Officiis id accusamus
                                                    quas
                                                    culpa aliquid, labore eaque perferendis et fugiat at cum!
                                                </p>
                                                {/*<!-- start icon wraper -->*/}
                                                <Image width={500} height={300} src="/theme_images/education_f8ru.svg" alt="education"
                                                    className="img-fluid" />
                                                {/*<!-- end icon waper -->*/}
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

            {/* start script */}
            <JqueryMin />
            <AsidejQuery />
            <FullScreenMode />

        </>
    )
}
