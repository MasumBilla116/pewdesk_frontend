import Head from "next/head";
import Image from "next/image";
import { memo, useCallback, useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import GetDesignation from "../api/Helper/GetDesignation";
import StoreItem from "../api/Helper/StoreItem";
import PagingLink from "@/components/PagingLink";
import FetchData from "../api/Helper/FetchData";
import Loader from "@/components/Loader";
import PaginateData from "../api/Helper/PaginateData";
import OrgId from "../api/Helper/OrgId";
import GetFullYear from "../api/Helper/GetFullYear";
import GetMonthName from "../api/Helper/GetMonthName";
import DeleteItem from "../api/Helper/DeleteItem";
import UpdateItem from "../api/Helper/UpdateItem";
import Router from "next/router";
import Table2ExcelMinJs from "./../load_js/plugin/table2excel.min.js";
import Table2Excel from "./../load_js/controllers/table2excel";
import OrgName from "../api/Helper/OrgName";
import AddModalTableBtn from "@/components/AddModalTableBtn";
import { decrypt } from "n-krypta";
import AccessKey from "../../pages/api/AccessKey";
import Cookies from "js-cookie";
import ActionBtn from "@/components/ActionBtn";

function Recruitment(props: any) {
  const {
    designationInfo,
    recruitmentInfo,
    curMonthDateCount,
    curYearMonth,
    orgname,
  } = props;

  /**
   * -------------------------------------------
   * ---- Start Module Access Permissions ------
   * -------------------------------------------
   */
  const [roleReader, setRoleReader] = useState(0);
  const [roleCreator, setRoleCreator] = useState(0);
  const [roleMonitor, setRoleMonitor] = useState(0);
  const [roleAdmin, setRoleAdmin] = useState(0);
  const [roleSuperAdmin, setRoleSuperAdmin] = useState(0);
  useEffect(() => {
    const IMA = Cookies.get("IMA");
    const decrypt_IMA = decrypt(`${IMA}`, `${AccessKey()}`);
    // IMA Identity Module Access permission
    setRoleReader(decrypt_IMA.roleReader);
    setRoleCreator(decrypt_IMA.roleCreator);
    setRoleMonitor(decrypt_IMA.roleMonitor);
    setRoleAdmin(decrypt_IMA.roleAdmin);
    setRoleSuperAdmin(decrypt_IMA.roleSuperAdmin);
  }, [roleReader, roleCreator, roleMonitor, roleAdmin, roleSuperAdmin]);
  /**
   * -------------------------------------------
   * ---- Start Module Access Permissions ------
   * -------------------------------------------
   */

  const [loader, setLoader] = useState(false);
  const [PaginateInfo, setPaginateInfo] = useState(recruitmentInfo);
  const [paginateUrl, setPaginateUrl] = useState(recruitmentInfo?.links[1].url);
  const [curMonthDateCountState, setCurMonthDateCountState] =
    useState(curMonthDateCount);

  useEffect(() => {}, [loader, PaginateInfo, paginateUrl, curMonthDateCount]);

  const FetchPaginateInfo = useCallback(async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setPaginateInfo(res);
      setCurMonthDateCountState(
        await FetchData(
          `/count/crm/recruiment/info/${GetFullYear()}/${GetMonthName()}/${
            Router.query.v
          }`
        )
      );
    }
  }, []);

  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle.min")
      : null;
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  var count = 0;
  const dateRow = useCallback((date: any) => {
    count -= 1;
    return (
      <>
        {curMonthDateCountState.map((row: any, index: any) => {
          if (row.curren_date === date && count <= 0) {
            count = row.count;
            return (
              <>
                <td
                  key={index + 8710926}
                  rowSpan={row.count}
                  className="date text-center"
                >
                  {date}
                </td>
              </>
            );
          }
        })}
      </>
    );
  }, []);

  const UpdateInfo = useCallback(async (target: any) => {
    const data = $(`#${target}`).serializeArray();
    const formData = JSON.stringify({
      date: data[0].value,
      last_date: data[1].value,
      job_title: data[2].value,
      designation: data[3].value,
      vacancy: data[4].value,
      posted_by: data[5].value,
      description: data[6].value,
      orgid: data[7].value,
      id: data[8].value,
    });
    UpdateItem(
      "/update/crm/recruiment/info",
      formData,
      setLoader,
      FetchPaginateInfo,
      paginateUrl
    );
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CRM | Recruitment</title>
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
                    {/*<!-- start table btn group -->*/}
                    {(roleSuperAdmin === 1 ||
                      roleAdmin === 1 ||
                      roleCreator === 1) && <AddModalTableBtn />}
                    {/*<!-- end table btn group -->*/}
                    <table
                      id="printable"
                      className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark"
                    >
                      <caption>Recruitment Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={10}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Recruitment</b>
                              </h3>
                              <h4 className="erp-trial-date">
                                <em>
                                  As on {curYearMonth[0].current_month}{" "}
                                  {curYearMonth[0].current_year}
                                </em>
                              </h4>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th scope="col" colSpan={2}>
                            Date
                          </th>
                          <th scope="col"> Job Title</th>
                          <th scope="col">Designation</th>
                          <th scope="col"> Vacancy</th>
                          <th scope="col">Last Date</th>
                          <th scope="col">Posted By</th>
                          <th scope="col">Description</th>
                          {(roleSuperAdmin === 1 ||
                            roleAdmin === 1 ||
                            roleCreator === 1) && <th scope="col"> Action </th>}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            className="date text-center"
                            scope="row"
                            colSpan={2}
                          >
                            {curYearMonth[0].current_year}
                          </td>
                          <td scope="row" colSpan={9}></td>
                        </tr>
                        <tr>
                          <td rowSpan={12}>{curYearMonth[0].current_month}</td>
                        </tr>
                        {/*<!--start  First date info -->*/}
                        {PaginateInfo.data?.map((data: any) => (
                          <tr key={data.recruiment_id}>
                            {dateRow(data.curren_date)}
                            <td className="text-success text-start">
                              {data.job_title}
                            </td>
                            <td className="text-success text-start">
                              {data.designation}
                            </td>
                            <td className="text-center">
                              <span className="badge rounded bg-primary">
                                {data.vacancy}
                              </span>
                            </td>
                            <td className="debit text-danger text-start">
                              {data.last_date}
                            </td>
                            <td className="credit text-success text-start">
                              {data.posted_by}
                            </td>
                            <td className="text-justify">{data.description}</td>
                            {/* <td>
                              <button
                                type="button"
                                className="btn bg-transparent text-success btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target={`#edit_modal_${data.recruiment_id}`}
                              >
                                <i className="fas fa fa-edit"></i>
                              </button>
                              <button
                                type="button"
                                className="btn bg-transparent text-danger btn-sm"
                                onClick={() => {
                                  DeleteItem(
                                    `/delete/crm/recruiment/info/${data.recruiment_id}`,
                                    paginateUrl,
                                    FetchPaginateInfo
                                  );
                                }}
                              >
                                <i className="fas fa fa-trash"></i>
                              </button>
                            </td> */}
                            {/* start actio btn*/}
                            {(roleSuperAdmin === 1 ||
                              roleAdmin === 1 ||
                              roleCreator === 1) && (
                              <td className="text-center">
                                <ActionBtn
                                  modalid={data.recruiment_id}
                                  deleteFunc={DeleteItem}
                                  deleteurl={`/delete/crm/recruiment/info/${data.recruiment_id}`}
                                  paginateUrl={paginateUrl}
                                  FetchPaginateInfo={FetchPaginateInfo}
                                  roleCreator={roleCreator}
                                />
                              </td>
                            )}

                            {/* end actio btn*/}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* start paging */}
                    <PagingLink
                      pageInfo={PaginateInfo}
                      fetchdata={FetchPaginateInfo}
                    />
                    {/* end paging */}
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
      {/*<!-- start add modal -->*/}
      <div className="modal" id="add-modal">
        <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
          <div className="modal-content modal-content-bg">
            <div className="modal-header">
              <h1 className="text-caption">Add Recruitment</h1>
              <button
                className="btn-close bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit((data) =>
                  StoreItem(
                    "/store/crm/recruiment/info",
                    data,
                    setLoader,
                    FetchPaginateInfo,
                    paginateUrl
                  )
                )}
              >
                <fieldset className="fieldset">
                  <legend>Recruitment</legend>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                      <div className="form-date">
                        <label htmlFor="add-date" className="form-label">
                          Date.
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
                          placeholder=" "
                          className="form-date-input"
                          id="add-date"
                          {...register("date", { required: true })}
                        />
                      </div>
                      <div className="text-warning">
                        {errors.date?.type === "required" && "Date is required"}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                      <div className="form-date">
                        <label htmlFor="add-last-date" className="form-label">
                          Last Date
                        </label>
                        <h6 className="overlap-date-title load-date text-light">
                          <Image
                            width={30}
                            height={20}
                            src="/theme_icon/calendar.png"
                            alt="select date"
                            className="pe-2"
                          />
                          Select Date
                        </h6>
                        <input
                          type="date"
                          placeholder=" "
                          className="form-date-input"
                          id="add-last-date"
                          {...register("last_date", { required: true })}
                        />
                      </div>
                      <div className="text-warning">
                        {errors.last_date?.type === "required" &&
                          "Last date is required"}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-job-title"
                          title=" "
                          {...register("job_title", { required: true })}
                        />
                        <label htmlFor="add-job-title" className="form-label">
                          Job Title
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.job_title?.type === "required" &&
                          "Jon title is required"}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <label htmlFor="add-designation" className="text-light">
                        Designation
                      </label>
                      <select
                        id="add-designation"
                        className="form-select text-light"
                        {...register("designation", {
                          required: true,
                        })}
                      >
                        <option value="">Select Grades</option>
                        {designationInfo?.map((data: any) => (
                          <option
                            key={data.designation_id}
                            value={`${data.designation_id}`}
                          >
                            {data.designation}
                          </option>
                        ))}
                      </select>
                      <div className="text-warning">
                        {errors.designation?.type === "required" &&
                          "Saklary grade is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-vacancy"
                          title=" "
                          {...register("vacancy", { required: true })}
                        />
                        <label htmlFor="add-vacancy" className="form-label">
                          Vacancy
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.vacancy?.type === "required" &&
                          "Vacancy is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-posted-by"
                          title=" "
                          {...register("posted_by", { required: true })}
                        />
                        <label htmlFor="add-posted-by" className="form-label">
                          Posted By
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.posted_by?.type === "required" &&
                          "Posted by is required"}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <label htmlFor="add-description" className="text-light">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="add-description"
                        cols={30}
                        rows={10}
                        style={{ height: 100 + "px" }}
                        {...register("description", {
                          required: true,
                        })}
                      ></textarea>
                    </div>
                    <div className="text-warning">
                      {errors.description?.type === "required" &&
                        "Description is required"}
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end product order -->*/}

                {/*<!-- start payment order -->*/}
                <fieldset className="fieldset">
                  <legend>Save </legend>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                      <input
                        type="hidden"
                        {...register("orgid")}
                        value={OrgId()}
                      />
                      {loader ? (
                        <Loader title="Save" />
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-danger w-50 shadow-dark"
                        >
                          <i className="fas fa fa-save me-2"></i>
                          Save
                        </button>
                      )}
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end payment  order -->*/}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-danger modal-close-btn"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*<!-- end add modal -->*/}

      {/*<!-- start edit modal -->*/}
      {PaginateInfo.data?.map((data: any) => (
        <div
          className="modal"
          key={`edit_modal_${data.recruiment_id}`}
          id={`edit_modal_${data.recruiment_id}`}
        >
          <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
            <div className="modal-content modal-content-bg">
              <div className="modal-header">
                <h1 className="text-caption">Edite Recruitment</h1>
                <button
                  className="btn-close  bg-light"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form id={`edit_form_${data.recruiment_id}`}>
                  <fieldset className="fieldset">
                    <legend>Recruitment</legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                        <div className="form-date">
                          <label
                            htmlFor={`edit-date${data.recruiment_id}`}
                            className="form-label"
                          >
                            Date.
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.current_year} / {data.current_month} /{" "}
                            {data.curren_date}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`edit-date${data.recruiment_id}`}
                            name="date"
                          />
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                        <div className="form-date">
                          <label
                            htmlFor={`edit-last-date${data.recruiment_id}`}
                            className="form-label"
                          >
                            Last Date
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt="select date"
                              className="pe-2"
                            />
                            {data.last_date}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`edit-last-date${data.recruiment_id}`}
                            name="last_date"
                            defaultValue={data.last_date}
                          />
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-job-title${data.recruiment_id}`}
                            title=" "
                            name="job_title"
                            defaultValue={data.job_title}
                          />
                          <label
                            htmlFor={`edit-job-title${data.recruiment_id}`}
                            className="form-label"
                          >
                            Job Title
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                        <label
                          htmlFor={`edit-designation${data.recruiment_id}`}
                          className="text-light"
                        >
                          Designation
                        </label>
                        <select
                          id={`edit-designation${data.recruiment_id}`}
                          className="form-select text-light"
                          name="designation"
                        >
                          <option value="">Select Grades</option>
                          {designationInfo?.map((row: any) => (
                            <option
                              key={row.designation_id}
                              value={`${row.designation_id}`}
                              selected={
                                row.designation_id === data.designation_id &&
                                true
                              }
                            >
                              {row.designation}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-vacancy${data.recruiment_id}`}
                            title=" "
                            name="vacancy"
                            defaultValue={data.vacancy}
                          />
                          <label
                            htmlFor={`edit-vacancy${data.recruiment_id}`}
                            className="form-label"
                          >
                            Vacancy
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-posted-by${data.recruiment_id}`}
                            title=" "
                            name="posted_by"
                            defaultValue={data.posted_by}
                          />
                          <label
                            htmlFor={`edit-posted-by${data.recruiment_id}`}
                            className="form-label"
                          >
                            Posted By
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                        <label
                          htmlFor={`edit-description${data.recruiment_id}`}
                          className="text-light"
                        >
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          id={`edit-description${data.recruiment_id}`}
                          cols={30}
                          rows={10}
                          style={{ height: 100 + "px" }}
                          name="description"
                          defaultValue={data.description}
                        ></textarea>
                      </div>
                    </div>
                  </fieldset>
                  {/*<!-- end product order -->*/}

                  {/*<!-- start payment order -->*/}
                  <fieldset className="fieldset">
                    <legend>Save </legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                        <input type="hidden" value={OrgId()} name="orgid" />
                        <input
                          type="hidden"
                          value={data.recruiment_id}
                          name="id"
                        />
                        {loader ? (
                          <Loader title="Save" />
                        ) : (
                          <button
                            type="button"
                            className="btn btn-danger w-50 shadow-dark"
                            onClick={() => {
                              UpdateInfo(`edit_form_${data.recruiment_id}`);
                            }}
                          >
                            <i className="fas fa fa-save me-2"></i>
                            Save
                          </button>
                        )}
                      </div>
                    </div>
                  </fieldset>
                  {/*<!-- end payment  order -->*/}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger modal-close-btn"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

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

export default memo(Recruitment);

export async function getServerSideProps(context: any) {
  const id = context.query.v;

  const designationInfo = await GetDesignation();
  const recruitmentInfo = await FetchData(`/get/crm/recruiment/info/${id}`);

  const curMonthDateCount = await FetchData(
    `/count/crm/recruiment/info/${GetFullYear()}/${GetMonthName()}/${id}`
  );

  const curYearMonth = await FetchData(
    `/get/crm/recruiment/info/${GetFullYear()}/${GetMonthName()}/${id}`
  );

  const orgname = await OrgName(id);

  return {
    props: {
      designationInfo,
      recruitmentInfo,
      curMonthDateCount,
      curYearMonth,
      orgname,
    },
  };
}
