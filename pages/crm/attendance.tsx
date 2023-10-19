import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, memo } from "react";
import Header from "./../../components/Header";
import Aside from "./../../components/Aside";
import ToggleOption from "./../../components/ToggleOption";
import Footer from "./../../components/Footer";
import TablePrint from "@/components/TablePrint";
import TableFilter from "@/components/TableFilter";
import JqueryMin from "./../load_js/plugin/jquery.min.js";
import AsidejQuery from "./../load_js/controllers/AsidejQuery";
import FullScreenMode from "./../load_js/controllers/FullScreenMode";
import PrintMin from "./../load_js/controllers/PrintMin";
import JqueryUiMin from "./../load_js/plugin/JqueryUiMin";
import DraggElements from "./../load_js/controllers/DraggElements";
import PickDate from "./../load_js/controllers/PickDate";
import Table2ExcelMinJs from "./../load_js/plugin/table2excel.min.js";
import Table2Excel from "./../load_js/controllers/table2excel";
import OrgName from "../api/Helper/OrgName";
import GetMonthName from "../api/Helper/GetMonthName";
import GetFullYear from "../api/Helper/GetFullYear";
export default function Attendance(props: any) {
  const { orgname } = props;
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle.min")
      : null;
  }, []);
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CRM | Attendance </title>
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
                  <div className="table-responsive mt-3">
                    <table
                      id="printable"
                      className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark"
                    >
                      <caption>Attendance Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th colSpan={10}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Attendance</b>
                              </h3>
                              <h4 className="erp-trial-date">
                                <em>
                                  As on {GetMonthName()} {GetFullYear()}
                                </em>
                              </h4>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th colSpan={2}> Date</th>
                          <th> Emp. Name</th>
                          <th>Emp. Id</th>
                          <th>Type</th>
                          <th>In-Time</th>
                          <th>Out-Time</th>
                          <th> Hourse </th>
                          <th> Status </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            className="date text-center"
                            scope="row"
                            colSpan={2}
                          >
                            2023
                          </td>
                          <td scope="row" colSpan={8}></td>
                        </tr>
                        <tr>
                          <td rowSpan={12}>Jan</td>
                          <td rowSpan={4} className="date text-center">
                            3
                          </td>
                        </tr>
                        {/*<!--start  First date info -->*/}

                        <tr>
                          <td>Disa</td>
                          <td>464654</td>
                          <td className="debit text-success text-end">
                            Devloper
                          </td>
                          <td className="debit text-danger text-end">9:00am</td>
                          <td className="debit text-danger text-end">
                            12:00pm
                          </td>
                          <td className="credit text-success text-end">
                            100,000
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="btn rounded-circle btn-outline-warning me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-modal"
                            >
                              <i className="fas fa fa-pen"></i>
                            </button>
                            <button
                              type="button"
                              className="btn rounded-circle btn-outline-danger delete-item"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Delete"
                            >
                              <i className="fas fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>popy</td>
                          <td>464654</td>
                          <td className="debit text-success text-end">
                            Devloper
                          </td>
                          <td className="debit text-danger text-end">9:00am</td>
                          <td className="debit text-danger text-end">
                            12:00pm
                          </td>
                          <td className="credit text-success text-end">
                            100,000
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="btn rounded-circle btn-outline-warning me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-modal"
                            >
                              <i className="fas fa fa-pen"></i>
                            </button>
                            <button
                              type="button"
                              className="btn rounded-circle btn-outline-danger delete-item"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Delete"
                            >
                              <i className="fas fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Jack</td>
                          <td>464654</td>
                          <td className="debit text-success text-end">
                            Devloper
                          </td>
                          <td className="debit text-danger text-end">9:00am</td>
                          <td className="debit text-danger text-end">
                            12:00pm
                          </td>
                          <td className="credit text-success text-end">
                            100,000
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="btn rounded-circle btn-outline-warning me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-modal"
                            >
                              <i className="fas fa fa-pen"></i>
                            </button>
                            <button
                              type="button"
                              className="btn rounded-circle btn-outline-danger delete-item"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Delete"
                            >
                              <i className="fas fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                        {/*<!-- second date info -->*/}
                        <tr>
                          <td rowSpan={3} className="date text-center">
                            4
                          </td>
                          <td>Jon</td>
                          <td>464654</td>
                          <td className="debit text-success text-end">
                            Devloper
                          </td>
                          <td className="debit text-danger text-end">9:00am</td>
                          <td className="debit text-danger text-end">
                            12:00pm
                          </td>
                          <td className="credit text-success text-end">
                            100,000
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="btn rounded-circle btn-outline-warning me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-modal"
                            >
                              <i className="fas fa fa-pen"></i>
                            </button>
                            <button
                              type="button"
                              className="btn rounded-circle btn-outline-danger delete-item"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Delete"
                            >
                              <i className="fas fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Nodi</td>
                          <td>464654</td>
                          <td className="debit text-success text-end">
                            Devloper
                          </td>
                          <td className="debit text-danger text-end">9:00am</td>
                          <td className="debit text-danger text-end">
                            12:00pm
                          </td>
                          <td className="credit text-success text-end">
                            100,000
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="btn rounded-circle btn-outline-warning me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-modal"
                            >
                              <i className="fas fa fa-pen"></i>
                            </button>
                            <button
                              type="button"
                              className="btn rounded-circle btn-outline-danger delete-item"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Delete"
                            >
                              <i className="fas fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Abraham</td>
                          <td>464654</td>
                          <td className="debit text-success text-end">
                            Devloper
                          </td>
                          <td className="debit text-danger text-end">9:00am</td>
                          <td className="debit text-danger text-end">
                            12:00pm
                          </td>
                          <td className="credit text-success text-end">
                            100,000
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="btn rounded-circle btn-outline-warning me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-modal"
                            >
                              <i className="fas fa fa-pen"></i>
                            </button>
                            <button
                              type="button"
                              className="btn rounded-circle btn-outline-danger delete-item"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Delete"
                            >
                              <i className="fas fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                        {/*<!-- Third date info -->*/}
                        <tr>
                          <td rowSpan={3} className="date text-center">
                            4
                          </td>
                          <td>Jack</td>
                          <td>464654</td>
                          <td className="debit text-success text-end">
                            Devloper
                          </td>
                          <td className="debit text-danger text-end">9:00am</td>
                          <td className="debit text-danger text-end">
                            12:00pm
                          </td>
                          <td className="credit text-success text-end">
                            100,000
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="btn rounded-circle btn-outline-warning me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-modal"
                            >
                              <i className="fas fa fa-pen"></i>
                            </button>
                            <button
                              type="button"
                              className="btn rounded-circle btn-outline-danger delete-item"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Delete"
                            >
                              <i className="fas fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>soma</td>
                          <td>78974</td>
                          <td className="debit text-success text-end">
                            Devloper
                          </td>
                          <td className="debit text-danger text-end">9:00am</td>
                          <td className="debit text-danger text-end">
                            12:00pm
                          </td>
                          <td className="credit text-success text-end">
                            100,000
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="btn rounded-circle btn-outline-warning me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-modal"
                            >
                              <i className="fas fa fa-pen"></i>
                            </button>
                            <button
                              type="button"
                              className="btn rounded-circle btn-outline-danger delete-item"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Delete"
                            >
                              <i className="fas fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Sumi</td>
                          <td>464654</td>
                          <td className="debit text-success text-end">
                            Devloper
                          </td>
                          <td className="debit text-danger text-end">9:00am</td>
                          <td className="debit text-danger text-end">
                            12:00pm
                          </td>
                          <td className="credit text-success text-end">
                            100,000
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="btn rounded-circle btn-outline-warning me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-modal"
                            >
                              <i className="fas fa fa-pen"></i>
                            </button>
                            <button
                              type="button"
                              className="btn rounded-circle btn-outline-danger delete-item"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Delete"
                            >
                              <i className="fas fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr className="text-center">
                          <td colSpan={5}> </td>
                          <td className="text-end"></td>
                          <td className="text-end"></td>
                          <td className="text-end"></td>
                          <td>&nbsp;</td>
                        </tr>
                      </tfoot>
                    </table>
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
      {/*<!-- start edit modal -->*/}
      <div className="modal" id="edit-modal">
        <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
          <div className="modal-content erp-bg-back">
            <div className="modal-header">
              <h1 className="text-caption">Edite Attendance</h1>
              <button
                className="btn-close  bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <fieldset className="fieldset">
                  <legend>Document</legend>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                      <div className="form-date">
                        <label htmlFor="add-date" className="form-label">
                          Date
                        </label>
                        <h6 className="overlap-date-title load-date text-light">
                          <Image
                            width={30}
                            height={20}
                            src="/theme_icon/calendar.png"
                            alt=""
                            className="pe-2"
                          />
                          Select Date
                        </h6>
                        <input
                          type="date"
                          name="return-date"
                          value=""
                          placeholder=" "
                          className="form-date-input"
                          id="add-date"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          name="emp-name"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="edit-emp-name"
                          title=" "
                        />
                        <label htmlFor="edit-emp-name" className="form-label">
                          Emp. Name
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          name="emp-id"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="edit-emp-id"
                          title=" "
                          readOnly
                        />
                        <label htmlFor="edit-emp-id" className="form-label">
                          Emp. Id
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          name="emp-type"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="edit-emp-type"
                          title=" "
                        />
                        <label htmlFor="edit-emp-type" className="form-label">
                          Emp. Type
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          name="in-time"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="edit-in-time"
                          title=" "
                        />
                        <label htmlFor="edit-in-time" className="form-label">
                          In-Time
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          name="out-time"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="edit-out-time"
                          title=" "
                        />
                        <label htmlFor="edit-out-time" className="form-label">
                          Out‐Time
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          name="hourse"
                          value=""
                          placeholder=" "
                          className="form-input"
                          id="edit-hourse"
                          title=" "
                          readOnly
                        />
                        <label htmlFor="edit-hourse" className="form-label">
                          Hourse
                        </label>
                      </div>
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end product order -->*/}

                {/*<!-- start payment order -->*/}
                <fieldset className="fieldset">
                  <legend>Update</legend>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                      <button
                        type="submit"
                        className="btn btn-danger w-50 shadow-dark"
                      >
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
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
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

      <Table2ExcelMinJs />
      <Table2Excel />
    </>
  );
}
export async function getServerSideProps(context: any) {
  const id = context.query.v;

  const orgname = await OrgName(id);

  return {
    props: {
      orgname,
    },
  };
}
