import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
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
import $ from "jquery";
import OrgId from "../api/Helper/OrgId";
import Loader from "@/components/Loader";
import GetDesignation from "../api/Helper/GetDesignation";
import GetOrgCurrencies from "../api/PreloadOrgInfo/GetOrgCurrencies";
import GetCRMPayrollInfo from "../api/CRM/Payroll/GetCRMPayrollInfo";
import PaginateData from "../api/Helper/PaginateData";
import PagingLink from "@/components/PagingLink";
import DeleteItem from "../api/Helper/DeleteItem";
import UpdateItem from "../api/Helper/UpdateItem";
import StoreItem from "../api/Helper/StoreItem";
import Table2ExcelMinJs from "./../load_js/plugin/table2excel.min.js";
import Table2Excel from "./../load_js/controllers/table2excel";
import OrgName from "../api/Helper/OrgName";
import AddModalTableBtn from "@/components/AddModalTableBtn";
import { decrypt } from "n-krypta";
import AccessKey from "../../pages/api/AccessKey";
import Cookies from "js-cookie";
import ActionBtn from "@/components/ActionBtn";

export default function Payroll(props: any) {
  const { designationInfo, orgCurrencie, payrollInfo, orgname } = props;

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
  const [payrollPaginateInfo, setPayrollPaginateInfo] = useState(payrollInfo);
  const [paginateUrl, setPaginateUrl] = useState(payrollInfo.links[1].url);
  const [basicSalary, setBasicSalary] = useState(0);
  const [overtime, setOvertime] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(0);

  const FetchPaginateInfo = useCallback(async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setPayrollPaginateInfo(res);
    }
  }, []);

  useEffect(() => {
    var calculate_basic_salary = 0;
    var calculate_over_time = 0;
    var calculate_hourly_rate = 0;
    payrollPaginateInfo.data?.map((data: any) => {
      calculate_basic_salary += data.basic_salary;
      calculate_over_time += data.over_time;
      calculate_hourly_rate += data.hourly_rate;
    });
    setBasicSalary(calculate_basic_salary);
    setHourlyRate(calculate_hourly_rate);
    setOvertime(calculate_over_time);
  }, [
    basicSalary,
    hourlyRate,
    overtime,
    payrollPaginateInfo,
    payrollInfo,
    designationInfo,
  ]);

  const {
    register: AddPayrollRegister,
    handleSubmit: AddPayrollInfo,
    formState: { errors: AddPayrollErrors },
  } = useForm();

  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle.min")
      : null;
  }, []);

  const UpdatePayrollInfo = async (target: any) => {
    const data = $(`#${target}`).serializeArray();
    const formData = JSON.stringify({
      date: data[0].value,
      designation: data[1].value,
      basic_salary: data[2].value,
      over_time: data[3].value,
      hourly_grade: data[4].value,
      hourly_rate: data[5].value,
      orgid: data[6].value,
      id: data[7].value,
    });

    UpdateItem(
      `/update/crm/payroll/info`,
      formData,
      setLoader,
      FetchPaginateInfo,
      paginateUrl
    );
  };

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CRM | Payroll</title>
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
                      <caption>Payroll Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={8}>
                            <div className="erp-trial-header">
                              <h3>
                                <b>{orgname}</b>
                              </h3>
                              <h5 className="erp-h2">
                                <b>Salary Template</b>
                              </h5>
                              <h5 className="erp-h3">
                                <b>Or</b>
                              </h5>
                              <h5 className="erp-trial-date">
                                <em>Catalog</em>
                              </h5>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th rowSpan={2}> S.I</th>
                          <th scope="col" colSpan={3} rowSpan={2}>
                            {" "}
                            Salary Template
                          </th>
                          <th colSpan={2} rowSpan={2}>
                            Hourly Calculation
                          </th>
                          <th rowSpan={2}>Issu date</th>

                          {(roleSuperAdmin === 1 ||
                            roleAdmin === 1 ||
                            roleCreator === 1) && (
                            <th scope="col" rowSpan={2}>
                              Action
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {/*<!-- table head option -->*/}
                        <tr>
                          <th>&nbsp;</th>
                          <th scope="col">Salary Grades</th>
                          <th scope="col">Basic Salary</th>
                          <th scope="col">Overtime</th>

                          <th scope="col">Hourly Grades</th>
                          <th scope="col">Hourly rates</th>
                          <th>&nbsp;</th>
                          <th>&nbsp;</th>
                        </tr>
                        {/*<!-- end table head option -->*/}
                        {payrollPaginateInfo.data?.map(
                          (data: any, index: any) => (
                            <tr key={data.salary_grade_id}>
                              <td>{index + 1}</td>
                              <td>{data.designation}</td>
                              <td className="text-end text-success">
                                {data.basic_salary}
                                <span className="text-secondary ">/-</span>
                              </td>
                              <td className="text-end text-success">
                                <span className="badge bg-danger rounded">
                                  {data.over_time}
                                </span>
                              </td>
                              <td>
                                <span
                                  className={`
                                  ${
                                    data.hourly_grade === "Low" && "text-danger"
                                  }
                                  ${
                                    data.hourly_grade === "High" &&
                                    "text-success"
                                  }
                                  ${
                                    data.hourly_grade === "Medium" &&
                                    "text-warning"
                                  }
                                  `}
                                >
                                  {data.hourly_grade}
                                </span>
                              </td>
                              <td className="text-end text-success">
                                {data.hourly_rate}
                                <span className="text-secondary ">/-</span>
                              </td>
                              <td>{data.issu_date}</td>
                              {/* <td className="text-center">
                                <button
                                  type="button"
                                  className="btn bg-transparent text-warning btn-sm"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#edit_modal_${data.salary_grade_id}`}
                                >
                                  <i className="fas fa fa-edit"></i>
                                </button>
                                <button
                                  className="btn bg-transparent text-danger btn-sm"
                                  onClick={() => {
                                    DeleteItem(
                                      `/delete/crm/payroll/info/${data.salary_grade_id}`,
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
                                    modalid={data.salary_grade_id}
                                    deleteFunc={DeleteItem}
                                    deleteurl={`/delete/crm/payroll/info/${data.salary_grade_id}`}
                                    paginateUrl={paginateUrl}
                                    FetchPaginateInfo={FetchPaginateInfo}
                                    roleCreator={roleCreator}
                                  />
                                </td>
                              )}

                              {/* end actio btn*/}
                            </tr>
                          )
                        )}
                      </tbody>
                      <tfoot>
                        <tr className="text-center">
                          <td colSpan={2} className="">
                            Total
                          </td>
                          <td className="text-end text-success">
                            <span className="text-secondary me-1">=</span>
                            {basicSalary}
                            <span className="text-secondary ">/-</span>
                            <span className="pill">{orgCurrencie}</span>
                          </td>
                          <td className="text-end text-success">
                            <span className="text-secondary me-1">=</span>
                            {overtime}
                            <span className="text-secondary ">/-</span>
                            <span className="pill">{orgCurrencie}</span>
                          </td>

                          <td colSpan={1} className="">
                            Total
                          </td>
                          <td className="text-end text-success">
                            <span className="text-secondary me-1">=</span>
                            {hourlyRate}
                            <span className="text-secondary ">/-</span>
                            <span className="pill">{orgCurrencie}</span>
                          </td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                      </tfoot>
                    </table>
                    {/* start paging */}
                    <PagingLink
                      pageInfo={payrollPaginateInfo}
                      fetchdata={FetchPaginateInfo}
                    />
                    {/* end paging */}
                  </div>
                  {/*<!-- end ledger table -->*/}
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
              <h1 className="text-caption">Add Payroll</h1>
              <button
                className="btn-close bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={AddPayrollInfo((data) =>
                  StoreItem(
                    "/store/crm/payroll/info",
                    data,
                    setLoader,
                    FetchPaginateInfo,
                    paginateUrl
                  )
                )}
              >
                <fieldset className="fieldset">
                  <legend>Salary Template</legend>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                      <div className="form-date">
                        <label htmlFor="add-salary-date" className="form-label">
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
                          id="add-salary-date"
                          {...AddPayrollRegister("date", { required: true })}
                        />
                      </div>
                      <div className="text-warning">
                        {AddPayrollErrors.date?.type === "required" &&
                          "Date is required"}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <label htmlFor="add-salary-grade" className="text-light">
                        Salary Grades
                      </label>
                      <select
                        id="add-salary-grade"
                        className="form-select text-light"
                        {...AddPayrollRegister("salary_grade", {
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
                        {AddPayrollErrors.salary_grade?.type === "required" &&
                          "Saklary grade is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-basic-salary"
                          title=" "
                          {...AddPayrollRegister("basic_salary", {
                            required: true,
                          })}
                        />
                        <label
                          htmlFor="add-basic-salary"
                          className="form-label"
                        >
                          Basic Salary ( {orgCurrencie[0].currencie_name} )
                        </label>
                      </div>
                      <div className="text-warning">
                        {AddPayrollErrors.basic_salary?.type === "required" &&
                          "Basic salary is required"}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-overtime"
                          title=" "
                          {...AddPayrollRegister("overtime", {
                            required: true,
                          })}
                        />
                        <label htmlFor="add-overtime" className="form-label">
                          Overtime
                        </label>
                      </div>
                      <div className="text-warning">
                        {AddPayrollErrors.overtime?.type === "required" &&
                          "Overtime is required"}
                      </div>
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end salary template -->*/}
                <fieldset className="fieldset">
                  <legend>Hourly Calculation</legend>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <label htmlFor="add-hourly-grade" className="text-light">
                        Hourly Grades
                      </label>
                      <select
                        id="add-hourly-grade"
                        className="form-select"
                        {...AddPayrollRegister("hourly_grade", {
                          required: true,
                        })}
                      >
                        <option value="">Select Grades</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="Heig">Heigh</option>
                      </select>
                      <div className="text-warning">
                        {AddPayrollErrors.hourly_grade?.type === "required" &&
                          "Hourly grade is required"}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-2">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-hourly-rate"
                          title=" "
                          {...AddPayrollRegister("hourly_rate", {
                            required: true,
                          })}
                        />
                        <label htmlFor="add-hourly-rate" className="form-label">
                          Hourly rates ( {orgCurrencie[0].currencie_name} )
                        </label>
                      </div>
                      <div className="text-warning">
                        {AddPayrollErrors.hourly_rate?.type === "required" &&
                          "Hourly rate is required"}
                      </div>
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end salary template -->*/}

                {/*<!-- start payment order -->*/}
                <fieldset className="fieldset">
                  <legend>Save </legend>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                      <input
                        type="hidden"
                        {...AddPayrollRegister("orgid")}
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
      {/*<!-- end add modal -->*/}
      {/*<!-- start edit  modal -->*/}
      {payrollPaginateInfo.data?.map((data: any, index: any) => (
        <div
          className="modal"
          key={`edit_modal_${data.salary_grade_id}`}
          id={`edit_modal_${data.salary_grade_id}`}
        >
          <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
            <div className="modal-content modal-content-bg">
              <div className="modal-header">
                <h1 className="text-caption">Edit Payroll</h1>
                <button
                  className="btn-close bg-light"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form id={`edit_form_${data.salary_grade_id}`}>
                  <fieldset className="fieldset">
                    <legend>Salary Template</legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                        <div className="form-date">
                          <label
                            htmlFor="add-salary-date"
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
                            {data.issu_date}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`add-salary-date_${data.salary_grade_id}`}
                            name="date"
                          />
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                        <label
                          htmlFor={`add-salary-grade_${data.salary_grade_id}`}
                          className="text-light"
                        >
                          Salary Grades
                        </label>
                        <select
                          id={`add-salary-grade_${data.salary_grade_id}`}
                          className="form-select text-light"
                          name="designation"
                        >
                          <option value="">Select Grades</option>
                          {designationInfo?.map((option: any) => (
                            <option
                              key={option.designation_id}
                              value={`${option.designation_id}`}
                              selected={
                                data.designation_id === option.designation_id &&
                                true
                              }
                            >
                              {option.designation}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`add-basic-salary_${data.salary_grade_id}`}
                            title=" "
                            name="basic_salary"
                            defaultValue={data.basic_salary}
                          />
                          <label
                            htmlFor={`add-basic-salary_${data.salary_grade_id}`}
                            className="form-label"
                          >
                            Basic Salary ( {orgCurrencie[0].currencie_name} )
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`add-overtime_${data.salary_grade_id}`}
                            title=" "
                            name="overtime"
                            defaultValue={data.over_time}
                          />
                          <label
                            htmlFor={`add-overtime_${data.salary_grade_id}`}
                            className="form-label"
                          >
                            Overtime
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  {/*<!-- end salary template -->*/}
                  <fieldset className="fieldset">
                    <legend>Hourly Calculation</legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                        <label
                          htmlFor={`add-hourly-grade_${data.salary_grade_id}`}
                          className="text-light"
                        >
                          Hourly Grades
                        </label>
                        <select
                          id={`add-hourly-grade_${data.salary_grade_id}`}
                          className="form-select"
                          name="hourly_grade"
                        >
                          <option value="">Select Grades</option>
                          <option
                            value="Low"
                            selected={data.hourly_grade === "Low" && true}
                          >
                            Low
                          </option>
                          <option
                            value="Medium"
                            selected={data.hourly_grade === "Medium" && true}
                          >
                            Medium
                          </option>
                          <option
                            value="Heigh"
                            selected={data.hourly_grade === "Heigh" && true}
                          >
                            Heigh
                          </option>
                        </select>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-2">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`add-hourly-rate_${data.salary_grade_id}`}
                            title=" "
                            name="hourly_rate"
                            defaultValue={data.hourly_rate}
                          />
                          <label
                            htmlFor={`add-hourly-rate_${data.salary_grade_id}`}
                            className="form-label"
                          >
                            Hourly rates ( {orgCurrencie[0].currencie_name} )
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  {/*<!-- end salary template -->*/}

                  {/*<!-- start payment order -->*/}
                  <fieldset className="fieldset">
                    <legend>Save </legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                        <input type="hidden" name="orgid" value={OrgId()} />
                        <input
                          type="hidden"
                          name="id"
                          value={data.salary_grade_id}
                        />
                        {loader ? (
                          <Loader title="Update" />
                        ) : (
                          <button
                            type="button"
                            className="btn btn-danger w-50 shadow-dark"
                            onClick={() => {
                              UpdatePayrollInfo(
                                `edit_form_${data.salary_grade_id}`
                              );
                            }}
                          >
                            <i className="fas fa fa-save me-2"></i>
                            Update
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

export async function getServerSideProps(context: any) {
  const id = context.query.v;

  const designationInfo = await GetDesignation();
  const orgCurrencie = await GetOrgCurrencies(id);
  const payrollInfo = await GetCRMPayrollInfo(id);
  const orgname = await OrgName(id);

  return {
    props: {
      designationInfo,
      orgCurrencie,
      payrollInfo,
      orgname,
    },
  };
}
