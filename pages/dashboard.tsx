import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import JqueryMin from "./load_js/plugin/jquery.min.js";
import AsidejQuery from "./load_js/controllers/AsidejQuery.js";
import FullScreenMode from "./load_js/controllers/FullScreenMode.js";
import Header from "../components/Header";
import Aside from "../components/Aside";
import ToggleOption from "../components/ToggleOption";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { useSwiper } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Home(props: any) {
  const { total_users, total_salary, currencie } = props;
  const swiper = useSwiper();
  const [useModuleFA, setUseModuleFa] = useState(Cookies.get("module_fa"));
  const [useModuleCRM, setUseModuleERM] = useState(Cookies.get("module_crm"));
  const [useModuleECM, setUseModuleECM] = useState(Cookies.get("module_ecm"));
  const [useModuleIVM, setUseModuleIVM] = useState(Cookies.get("module_ivm"));
  const [useModuleODM, setUseModuleODM] = useState(Cookies.get("module_odm"));
  const [useModuleHCM, setUseModuleHCM] = useState(Cookies.get("module_hcm"));
  const [useModuleSM, setUseModuleSM] = useState(Cookies.get("module_sm"));
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ERP | Dashboard</title>
      </Head>

      <ToggleOption />

      <div className="erp-container erp-bg-front">
        <div className="erp-container-fluid">
          <div className="erp-page-body d-lg-flex">
            {/* start aside */}
            <Aside />
            {/* end aside */}
            <main className="erp-main text-secondary">
              <div className="all-content-wraper">
                {/* start Header */}
                <Header />
                {/* end Header */}
                {/*<!-- start your code -->*/}
                <div className="container-fluid pt-3 pb-3 dashboard-content">
                  <div
                    className="erp-color-chart-con"
                    style={{ marginTop: 5 + "rem" }}
                  >
                    <div id="wrapper">
                      <div id="chart-area"></div>
                      <div id="chart-bar"></div>
                    </div>
                  </div>
                  {/*<!-- start message -->*/}
                  <div className="message-bg d-flex justify-content-between align-items-center">
                    <Image
                      priority={true}
                      width={150}
                      height={100}
                      src="/theme_images/Group126@2x.png"
                      alt="messages"
                    />
                    <h5>Now you are enjoy the world best erp software</h5>
                    <Image
                      width={40}
                      height={50}
                      src="/theme_icon/smile.png"
                      alt="smile"
                    />
                  </div>
                  {/*<!-- end message -->*/}
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <div className="erp-linechart-container">
                          <div id="radial-gradiant-chart"></div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <div className="erp-linechart-container">
                          <div id="radial-gradiant-chart2"></div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <div className="erp-linechart-container">
                          <div id="radial-gradiant-chart3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*<!-- start shorts message -->*/}
                  <div className="container mt-5 mb-5">
                    <div className="row">
                      {/*<!-- first -->*/}
                      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12  mb-4">
                        <div className="col-gradient shadow-dark rounded p-3 d-flex justify-content-between align-items-center">
                          <div>
                            <h5>
                              <strong>
                                {total_users?.user}
                                <span className="pill">{"people"}</span>
                              </strong>
                              {/* <small className="text-green">+.02</small> */}
                            </h5>
                            <h6 className="text-secondary">Total Employees</h6>
                          </div>
                          <div className="chart-success">
                            <i
                              className="fas fa fa-users"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                      {/*<!-- secound -->*/}
                      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12  mb-4">
                        <div className="col-gradient shadow-dark rounded p-3 d-flex justify-content-between align-items-center">
                          <div>
                            <h5>
                              <strong>$25</strong>
                              <small className="text-green">+.02</small>
                            </h5>
                            <h6 className="text-secondary">Revenue current</h6>
                          </div>
                          <div className="chart-success">
                            <i
                              className="fa fa-line-chart"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>

                      {/*<!-- third -->*/}
                      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12  mb-4">
                        <div className="col-gradient shadow-dark rounded p-3 d-flex justify-content-between align-items-center">
                          <div>
                            <h5>
                              <strong>$26</strong>
                              <small className="text-red">-3.02</small>
                            </h5>
                            <h6 className="text-secondary">Daily Income</h6>
                          </div>
                          <div className="chart-warning">
                            <i
                              className="fa fa-line-chart"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                      {/*<!-- fourth -->*/}
                      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 mb-4">
                        <div className="col-gradient shadow-dark rounded p-3 d-flex justify-content-between align-items-center">
                          <div>
                            <h5>
                              <strong>
                                {total_salary?.salary}
                                <span
                                  className="text-success ms-1"
                                  style={{ fontSize: "12px" }}
                                >
                                  {currencie?.currencie_name}
                                </span>
                              </strong>
                              {/* <small className="text-green">+.02</small> */}
                            </h5>
                            <h6 className="text-secondary">Expense current</h6>
                          </div>
                          <div className="chart-success">
                            <i
                              className="fa fa-line-chart"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*<!-- end shorts message -->*/}
                  {/*<!-- start transection chart -->*/}
                  <div className="container">
                    <div className="row">
                      {/*<!-- start chart -->*/}
                      <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 mb-5">
                        <div className="h-100 col-gradient p-5 p.3 rounded shadow-dark text-light">
                          <h4 className="font-weight-bolder">
                            Transaction History
                          </h4>
                          <hr />
                          <div id="transection-chart"></div>
                          <div className="d-flex justify-content-between align-items-center mt-4">
                            <h6>
                              Transfer To PayPal
                              <br />
                              <p className="text-secondary">
                                23 Aug 2023, 09:12AM
                              </p>
                            </h6>
                            <div>$26</div>
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between align-items-center">
                            <h6>
                              Tranfer to Stripe
                              <br />
                              <p className="text-secondary">
                                24 Aug 2023, 10:12AM
                              </p>
                            </h6>
                            <div>$35</div>
                          </div>
                        </div>
                      </div>
                      {/*<!-- end chart -->*/}
                      {/*<!-- <div className="col-lg-1"></div> -->*/}
                      {/*<!-- start system status-->*/}
                      <div className="col-xl-7 col-lg-7 col-md-6 col-sm-12 mb-5">
                        <div className="h-100 col-gradient shadow-dark p-5 rounded text-light p.3">
                          <h5 className="font-weight-bolder">Today Status</h5>
                          <hr />
                          {/*<!-- start notification -->*/}
                          <div className="table-responsive">
                            <table className="table text-light  text-center">
                              <thead>
                                <tr>
                                  <th></th>
                                  <th>Today Notification</th>
                                  <th>Old Notification</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <i className="fas fa fa-bell text-warning font-size-2"></i>
                                  </td>
                                  <td>
                                    <span className="badge badge-pill bg-warning">
                                      05
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-pill bg-success">
                                      105
                                    </span>
                                  </td>
                                </tr>
                                {/*<!-- start email -->*/}
                                <tr>
                                  <th></th>
                                  <th>Today Email</th>
                                  <th>Old Email</th>
                                </tr>
                                <tr>
                                  <td>
                                    <i className="fa-solid fa-message text-primary font-size-2"></i>
                                  </td>
                                  <td>
                                    <span className="badge badge-pill bg-warning">
                                      05
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-pill bg-success">
                                      105
                                    </span>
                                  </td>
                                </tr>
                                {/*<!-- start order -->*/}
                                <tr>
                                  <th></th>
                                  <th>Today Order</th>
                                  <th>Old Order</th>
                                </tr>
                                <tr>
                                  <td>
                                    <i className="fas fa fa-shopping-bag text-danger font-size-2"></i>
                                  </td>
                                  <td>
                                    <span className="badge badge-pill bg-warning">
                                      05
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-pill bg-success">
                                      105
                                    </span>
                                  </td>
                                </tr>
                                {/*<!-- start sels -->*/}
                                <tr>
                                  <th></th>
                                  <th>Today Sels</th>
                                  <th>Old Sels</th>
                                </tr>
                                <tr>
                                  <td>
                                    <i className="fas fa fa-car text-success font-size-2"></i>
                                  </td>
                                  <td>
                                    <span className="badge badge-pill bg-warning">
                                      05
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-pill bg-success">
                                      105
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {/*<!-- start system status -->*/}
                      </div>
                    </div>
                  </div>
                  {/*<!-- end transection chart -->*/}
                  {/*<!-- start shorts message -->*/}
                  <div className="container mt-5 mb-5">
                    <div className="row">
                      {/*<!-- first -->*/}
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="col-gradient shadow-dark rounded p-3 d-flex justify-content-between align-items-center">
                          <div>
                            <h3 className="text-light">
                              <strong>Revenue</strong>
                            </h3>
                            <h5>
                              <strong>$25</strong>
                              <small className="text-green">+.02</small>
                            </h5>
                            <h6 className="text-secondary">
                              11.38% Since last month
                            </h6>
                          </div>
                          <div className="chart-success">
                            <i className="fa-brands fa-codepen font-size-2"></i>
                          </div>
                        </div>
                      </div>
                      {/*<!-- secound -->*/}
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="col-gradient shadow-dark rounded p-3 d-flex justify-content-between align-items-center">
                          <div>
                            <h3 className="text-light">
                              <strong>salles</strong>
                            </h3>
                            <h5>
                              <strong>$25</strong>
                              <small className="text-green">+.02</small>
                            </h5>
                            <h6 className="text-secondary">
                              9.61% Since last month
                            </h6>
                          </div>
                          <div className="chart-success">
                            <i className="fa-solid fa-money-bill-trend-up font-size-2"></i>
                          </div>
                        </div>
                      </div>

                      {/*<!-- third -->*/}
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="col-gradient shadow-dark rounded p-3 d-flex justify-content-between align-items-center">
                          <div>
                            <h3 className="text-light">
                              <strong>Purchase </strong>
                            </h3>
                            <h5>
                              <strong>$26</strong>
                              <small className="text-green">+.02</small>
                            </h5>
                            <h6 className="text-secondary">
                              2.27% Since last month
                            </h6>
                          </div>
                          <div className="chart-success">
                            <i className="fa-sharp fa-solid fa-bag-shopping font-size-2"></i>
                          </div>
                        </div>
                      </div>
                      {/*<!-- end -->*/}
                    </div>
                  </div>
                  {/*<!-- end shorts message -->*/}
                  {/*<!-- start order status -->*/}
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className=" table-responsive">
                          <table className="table  shadow-dark  text-light tbl-bg">
                            <thead>
                              <tr>
                                <th className="text-center">
                                  <div className="form-check">
                                    <input
                                      type="checkbox"
                                      name="check"
                                      className="form-check"
                                    />
                                  </div>
                                </th>
                                <th className="text-center">Client Name </th>
                                <th className="text-center">Order No</th>
                                <th className="text-center">Product cost</th>
                                <th className="text-center">Project</th>
                                <th className="text-center">Payment Mode</th>
                                <th className="text-center">Start Date</th>
                                <th className="text-center">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="text-center">
                                  <div className="form-check">
                                    <input
                                      type="checkbox"
                                      name="check"
                                      className="form-input-check"
                                    />
                                  </div>
                                </td>
                                <td className="text-center">
                                  <div className="text-center">
                                    <Image
                                      width={40}
                                      height={40}
                                      src="/images/user-300x300.jpg"
                                      alt="client images"
                                      className="rounded-circle"
                                    />
                                  </div>
                                </td>
                                <td className="text-center">146</td>
                                <td className="text-center">$5</td>
                                <td className="text-center">Dashboard</td>
                                <td className="text-center">Credit card</td>
                                <td className="text-center">28 Aug 2023</td>
                                <td className="text-center">
                                  <button
                                    type="button"
                                    disabled
                                    className="btn chart-success text-green"
                                  >
                                    Approved
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-center">
                                  <div className="form-check">
                                    <input
                                      type="checkbox"
                                      name="check"
                                      className="form-input-check"
                                    />
                                  </div>
                                </td>
                                <td className="text-center">
                                  <div>
                                    <Image
                                      width={40}
                                      height={40}
                                      src="/images/user-300x300.jpg"
                                      alt="client images"
                                      className="rounded-circle"
                                    />
                                  </div>
                                </td>
                                <td className="text-center">1456</td>
                                <td className="text-center">$25</td>
                                <td className="text-center">Dashboard</td>
                                <td className="text-center">Credit card</td>
                                <td className="text-center">30 Aug 2023</td>
                                <td className="text-center">
                                  <button
                                    type="button"
                                    disabled
                                    className="btn chart-success text-green"
                                  >
                                    Approved
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-center">
                                  <div className="form-check">
                                    <input
                                      type="checkbox"
                                      name="check"
                                      className="form-input-check"
                                    />
                                  </div>
                                </td>
                                <td className="text-center">
                                  <div>
                                    <Image
                                      width={40}
                                      height={40}
                                      src="/images/user-300x300.jpg"
                                      alt="client images"
                                      className="rounded-circle"
                                    />
                                  </div>
                                </td>
                                <td className="text-center">1456</td>
                                <td className="text-center">$5840</td>
                                <td className="text-center">Dashboard</td>
                                <td className="text-center">Credit card</td>
                                <td className="text-center">30 Aug 2023</td>
                                <td className="text-center">
                                  <button
                                    type="button"
                                    disabled
                                    className="btn chart-warning text-red"
                                  >
                                    Pending
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-center">
                                  <div className="form-check">
                                    <input
                                      type="checkbox"
                                      name="check"
                                      className="form-input-check"
                                    />
                                  </div>
                                </td>
                                <td className="text-center">
                                  <div>
                                    <Image
                                      width={40}
                                      height={40}
                                      src="/images/user-300x300.jpg"
                                      alt="client images"
                                      className="rounded-circle"
                                    />
                                  </div>
                                </td>
                                <td className="text-center">1456</td>
                                <td className="text-center">$5840</td>
                                <td className="text-center">Dashboard</td>
                                <td className="text-center">Credit card</td>
                                <td className="text-center">30 Aug 2023</td>
                                <td className="text-center">
                                  <button
                                    type="button"
                                    disabled
                                    className="btn chart-warning text-red"
                                  >
                                    Process
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*<!-- end order status -->*/}
                  {/*<!-- start message , notification and portfolio -->*/}
                  <div className="container mt-5">
                    <div className="row">
                      {/*<!-- messages -->*/}
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="col-gradient shadow-dark p-4 p.3 rounded h-100">
                          <div className="d-flex justify-content-between align-items-lg-center">
                            <h5>
                              <strong>Messages</strong>
                            </h5>
                            <p>View all</p>
                          </div>
                          <hr />
                          <div className="message-container">
                            <div className="d-flex justify-content-between align-items-center">
                              <Image
                                width={40}
                                height={40}
                                src="/images/user-300x300.jpg"
                                alt="user image"
                                className="rounded-circle"
                              />
                              <div>
                                <div className="d-flex justify-content-between align-items-center">
                                  <strong className="text-light font-size-20">
                                    Jon
                                  </strong>
                                  <small className="text-secondary">
                                    Two days ago
                                  </small>
                                </div>
                                <p className="text-secondary font-size-14">
                                  Well, it seems to be working now.
                                </p>
                              </div>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center">
                              <Image
                                width={40}
                                height={40}
                                src="/images/user-300x300.jpg"
                                alt="user image"
                                className="rounded-circle"
                              />
                              <div>
                                <div className="d-flex justify-content-between align-items-center">
                                  <strong className="text-light font-size-20">
                                    Jon
                                  </strong>
                                  <small className="text-secondary">
                                    Two days ago
                                  </small>
                                </div>
                                <p className="text-secondary font-size-14">
                                  Well, it seems to be working now.
                                </p>
                              </div>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center">
                              <Image
                                width={40}
                                height={40}
                                src="/images/user-300x300.jpg"
                                alt="user image"
                                className="rounded-circle"
                              />
                              <div>
                                <div className="d-flex justify-content-between align-items-center">
                                  <strong className="text-light font-size-20">
                                    Jon
                                  </strong>
                                  <small className="text-secondary">
                                    Two days ago
                                  </small>
                                </div>
                                <p className="text-secondary font-size-14">
                                  Well, it seems to be working now.
                                </p>
                              </div>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center">
                              <Image
                                width={40}
                                height={40}
                                src="/images/user-300x300.jpg"
                                alt="user image"
                                className="rounded-circle"
                              />
                              <div>
                                <div className="d-flex justify-content-between align-items-center">
                                  <strong className="text-light font-size-20">
                                    Jon
                                  </strong>
                                  <small className="text-secondary">
                                    Two days ago
                                  </small>
                                </div>
                                <p className="text-secondary font-size-14">
                                  Well, it seems to be working now.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*<!-- portfolio -->*/}
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="col-gradient shadow-dark p-4 p.3 rounded h-100">
                          <div className="d-flex justify-content-between align-items-center">
                            <h5 className="text-light">
                              <strong>Portfolio Slide </strong>
                            </h5>
                            <button
                              className="btn btn-outline-light rounded-circle pb-1"
                              id="swiper-next"
                            >
                              <i className="fas fa fa-caret-left"></i>
                            </button>
                            <button
                              className="btn btn-outline-light rounded-circle pb-1"
                              id="swiper-prev"
                            >
                              <i className="fas fa fa-caret-right"></i>
                            </button>
                          </div>
                          <hr />
                          <div className="mt-4 mb-4">
                            <Swiper
                              navigation={{
                                nextEl: "#swiper-next",
                                prevEl: "#swiper-prev",
                              }}
                              autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                              }}
                              modules={[Autoplay, Pagination, Navigation]}
                              slidesPerView={1}
                              spaceBetween={30}
                              loop={true}
                              pagination={{
                                clickable: true,
                                type: "fraction",
                              }}
                            >
                              <SwiperSlide>
                                <Image
                                  width={400}
                                  height={250}
                                  src="/theme_images/WordPress-Web-Design-Development-Agency-2.jpg.webp"
                                  alt="portfolio"
                                  className="img-fluid rounded"
                                />
                              </SwiperSlide>
                              <SwiperSlide>
                                <Image
                                  width={400}
                                  height={250}
                                  src="/theme_images/WordPress-Web-Design-Development-Agency-2.jpg.webp"
                                  alt="portfolio"
                                  className="img-fluid rounded"
                                />
                              </SwiperSlide>
                              <SwiperSlide>
                                <Image
                                  width={400}
                                  height={250}
                                  src="/theme_images/WordPress-Web-Design-Development-Agency-2.jpg.webp"
                                  alt="portfolio"
                                  className="img-fluid rounded"
                                />
                              </SwiperSlide>
                              <SwiperSlide>
                                <Image
                                  width={400}
                                  height={250}
                                  src="/theme_images/WordPress-Web-Design-Development-Agency-2.jpg.webp"
                                  alt="portfolio"
                                  className="img-fluid rounded"
                                />
                              </SwiperSlide>
                            </Swiper>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <Image
                              width={40}
                              height={50}
                              src="/images/user-300x300.jpg"
                              alt="user image"
                              className="rounded-circle"
                            />
                            <div>
                              <div className="d-flex justify-content-between align-items-center">
                                <strong className="text-light font-size-20">
                                  Jon
                                </strong>
                                <small className="text-secondary">
                                  Two days ago
                                </small>
                              </div>
                              <p className="text-secondary font-size-14">
                                Well, it seems to be working now.
                              </p>
                            </div>
                          </div>
                          <div>
                            <h6>Well, it seems to be working now.</h6>
                            <div className="progress">
                              <div className="progress-bar bg-success w-50"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*<!-- Notification -->*/}
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="col-gradient shadow-dark p-4 p.3 h-100 rounded">
                          <div className="d-flex justify-content-between align-items-center">
                            <h5 className="text-light">
                              <strong>Stock Product Status </strong>
                            </h5>
                          </div>

                          <hr />
                          <div id="stock-product-chart" className="mt-4 mb-4">
                            {" "}
                          </div>
                          <p>
                            Not find any where find all product stock , exchange
                            ,<br /> export and import all information.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*<!-- end message , notification and portfolio -->*/}
                  {/*<!-- start visitor all country -->*/}
                  <div className="container mt-5 mb-5">
                    <div className="row p-0">
                      <div className="col-lg-12 p-0">
                        <iframe
                          id="map"
                          className="border-0"
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17095.804028099097!2d89.26046142219629!3d25.739164351268325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fccdcecf5fefc9%3A0x68bf330fbc933bd3!2sRangpur%20District!5e0!3m2!1sen!2sbd!4v1665339708995!5m2!1sen!2sbd"
                          width="600"
                          height="450"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                  {/*<!-- end visitor all country -->*/}
                </div>
                {/*<!-- End your code -->*/}
              </div>
              {/*<!-- start footer -->*/}
              <Footer />
              {/*<!-- end footer -->*/}
            </main>
          </div>
        </div>
      </div>
      <JqueryMin />
      <AsidejQuery />
      <FullScreenMode />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const id = context.query.v;
  try {
    const res = await fetch(`${process.env.BASE_URL}/total/users/${id}`);
    var total_users = await res.json();
  } catch (error) {}
  try {
    const salary_res = await fetch(
      `${process.env.BASE_URL}/total/salary/${id}`
    );
    var total_salary = await salary_res.json();
  } catch (error) {}

  try {
    const currency_res = await fetch(
      `${process.env.BASE_URL}/get/org/currencie/${id}`
    );
    var currencie = await currency_res.json();
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      total_users,
      total_salary,
      currencie,
    },
  };
}
