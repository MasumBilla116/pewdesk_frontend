import Head from "next/head";
import Image from "next/image";
import { useEffect, useState,   useCallback } from "react";
import Header from "../../components/Header";
import Aside from "../../components/Aside";
import ToggleOption from "../../components/ToggleOption";
import Footer from "../../components/Footer";
import TablePrint from "@/components/TablePrint";
import TableFilter from "@/components/TableFilter";
import JqueryMin from "../load_js/plugin/jquery.min.js";
import AsidejQuery from "../load_js/controllers/AsidejQuery";
import FullScreenMode from "../load_js/controllers/FullScreenMode";
import PrintMin from "../load_js/controllers/PrintMin";
import JqueryUiMin from "../load_js/plugin/JqueryUiMin";
import DraggElements from "../load_js/controllers/DraggElements";
import PickDate from "../load_js/controllers/PickDate";
import { useForm } from "react-hook-form";
import Loader from "@/components/Loader";
import OrgId from "../api/Helper/OrgId";
import FetchData from "../api/Helper/FetchData";
import PaginateData from "../api/Helper/PaginateData";
import PagingLink from "@/components/PagingLink";
import StoreItem from "../api/Helper/StoreItem";
import UpdateItem from "../api/Helper/UpdateItem";
import DeleteItem from "../api/Helper/DeleteItem";
import GetOrgCurrencies from "@/pages/api/PreloadOrgInfo/GetOrgCurrencies";
import ActionBtn from "@/components/ActionBtn";
import Table2ExcelMinJs from "./../load_js/plugin/table2excel.min.js";
import Table2Excel from "./../load_js/controllers/table2excel";
import OrgName from "../api/Helper/OrgName";
import GetMonthName from "../api/Helper/GetMonthName";
import GetFullYear from "../api/Helper/GetFullYear";
import AddModalTableBtn from "@/components/AddModalTableBtn";
import { decrypt } from "n-krypta";
import AccessKey from "../../pages/api/AccessKey";
import Cookies from "js-cookie";

export default function Report(props: any) {
  const {
    departmentData,
    designationData,
    empTypeData,
    country,
    city,
    employeeData,
    orgCurrencie,
    orgname,
  } = props;

  const [loader, setLoader] = useState(false);
  const [employeePaginateInfo, setEmployeePaginateInfo] =
    useState(employeeData);
  const [paginateUrl, setPaginateUrl] = useState(employeeData?.links[1]?.url);

  const FetchPaginateInfo = useCallback(async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setEmployeePaginateInfo(res);
    }
  }, []);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const UpdateInfo = async (target: any) => {
    const data = $(`#${target}`).serializeArray();

    const formData = JSON.stringify({
      emp_name: data[0].value,
      email: data[1].value,
      country: data[2].value,
      city: data[3].value,
      marital_status: data[4].value,
      gender: data[5].value,
      DoB: data[6].value,
      joining_date: data[7].value,
      terminated_date: data[8].value,
      reliving_date: data[9].value,
      emp_type: data[10].value,
      designation: data[11].value,
      department: data[12].value,
      salary: data[13].value,
      phone_number: data[14].value,
      emergency_number: data[15].value,
      experience: data[16].value,
      address: data[17].value,
      status: data[18].value,
      orgid: data[19].value,
      emp_id: data[20].value,
      user_id: data[21].value,
    });

    UpdateItem(
      "/update/emp/report/info",
      formData,
      setLoader,
      FetchPaginateInfo,
      paginateUrl
    );
  };
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
        <title>HCM | Report</title>
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
                      className="font-13 table-responsive erp-table-dark tbl-bg table table-bordered text-light table-dark"
                    >
                      <caption>Employee Report Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={18}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Employee Report</b>
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
                          <th scope="col">Employee Name</th>
                          <th scope="col">Employee Type</th>
                          <th scope="col"> Email </th>
                          <th scope="col"> Department </th>
                          <th scope="col"> Designation </th>
                          <th scope="col"> Joining Date </th>
                          <th scope="col"> DOB </th>
                          <th scope="col"> Martial Status </th>
                          <th scope="col"> Gender </th>
                          <th scope="col"> Terminated Date </th>
                          <th scope="col"> Reliving Date </th>
                          <th scope="col"> Salary </th>
                          <th scope="col"> Address </th>
                          <th scope="col"> Contact Number </th>
                          <th scope="col"> Emercency Contact Details </th>
                          <th scope="col"> Experience </th>
                          <th scope="col"> Status </th>
                          {(roleSuperAdmin === 1 ||
                            roleAdmin === 1 ||
                            roleCreator === 1) && <th scope="col"> Action </th>}
                        </tr>
                      </thead>
                      <tbody>
                        {employeePaginateInfo?.data?.map(
                          (data: any, index: any) => (
                            <tr key={data.emp_id}>
                              <td className="debit  text-start">{data.name}</td>
                              <td className="debit text-warning text-start">
                                {data.emp_type}
                              </td>
                              <td className="debit text-primary text-start">
                                {data.email}
                              </td>
                              <td className="credit text-start">
                                {data.department}
                              </td>
                              <td className="credit   text-start">
                                {data.designation}
                              </td>
                              <td className="credit text-success text-start">
                                {data.joining_date}
                              </td>
                              <td className="credit t  text-start">
                                {data.DoB}
                              </td>
                              <td className="credit   text-start">
                                {data.marital_status}
                              </td>
                              <td className="credit   text-start">
                                {data.gender}
                              </td>
                              <td className="credit text-warning text-center">
                                {data.terminated_date}
                              </td>
                              <td className="credit text-warning text-center">
                                {data.relieving_date}
                              </td>
                              <td className="credit text-primary text-start">
                                {data.salary}
                                <span className="text-secondary ">/-</span>
                                <span className="pill">{orgCurrencie}</span>
                              </td>
                              <td className="credit text-info text-start">
                                {data.address_1}
                              </td>
                              <td className="credit text-start">
                                {data.phone_1}
                              </td>
                              <td className="credit   text-start">
                                {data.phone}
                              </td>
                              <td className="credit text-success text-start">
                                {data.experience}
                              </td>
                              <td className="text-center">
                                <span
                                  className={`badge 
                                ${data.status === "active" && "bg-success"}
                                ${data.status === "deactive" && "bg-danger"}
                                ${data.status === "in-process" && "bg-warning"}
                                `}
                                >
                                  {data.status}
                                </span>
                              </td>
                              {(roleSuperAdmin === 1 ||
                                roleAdmin === 1 ||
                                roleCreator === 1) && (
                                <td className="text-center">
                                  <ActionBtn
                                    modalid={data.user_id}
                                    deleteFunc={DeleteItem}
                                    deleteurl={`/delete/emp/report/info/${data.user_id}`}
                                    paginateUrl={paginateUrl}
                                    FetchPaginateInfo={FetchPaginateInfo}
                                    roleCreator={roleCreator}
                                  />
                                </td>
                              )}
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                  {/* start paginate */}
                  <div className="mt-5">
                    <PagingLink
                      pageInfo={employeePaginateInfo}
                      fetchdata={FetchPaginateInfo}
                    />
                  </div>
                  {/* end paginate */}
                  {/* end ladger table */}
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
              <h1 className="text-caption">Add Employee Report</h1>
              <button
                className="btn-close bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit((data) =>
                  StoreItem(
                    "/store/emp/report/info",
                    data,
                    setLoader,
                    FetchPaginateInfo,
                    paginateUrl
                  )
                )}
              >
                <fieldset className="fieldset">
                  <legend>Emp. Report</legend>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-emp-name"
                          title=" "
                          {...register("emp_name", { required: true })}
                        />
                        <label htmlFor="add-emp-name" className="form-label">
                          Employee Name
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.emp_name?.type === "required" &&
                          "Employee Name is required "}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-email"
                          title=" "
                          {...register("email", { required: true })}
                        />
                        <label htmlFor="add-email" className="form-label">
                          Email
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.email?.type === "required" &&
                          "Email is required "}
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <label htmlFor="add-country" className="text-light">
                        Country
                      </label>
                      <select
                        id="add-country"
                        className="form-select"
                        {...register("country", { required: true })}
                      >
                        <option value="">Select Country</option>
                        {country?.map((data: any) => (
                          <>
                            <option value={`${data.country_id}`}>
                              {data.country_name}
                            </option>
                          </>
                        ))}
                      </select>
                      <div className="text-warning">
                        {errors.country?.type === "required" &&
                          "Country is required "}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <label htmlFor="add-city" className="text-light">
                        City
                      </label>
                      <select
                        id="add-city"
                        className="form-select"
                        {...register("city", { required: true })}
                      >
                        <option value="">Select city</option>
                        {city?.map((data: any) => (
                          <>
                            <option value={`${data.city_id}`}>
                              {data.city_name}
                            </option>
                          </>
                        ))}
                      </select>
                      <div className="text-warning">
                        {errors.city?.type === "required" &&
                          "City is required "}
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <label
                        htmlFor="add-merital-status"
                        className="text-light"
                      >
                        Maritial Status
                      </label>
                      <select
                        id="add-merital-status"
                        className="form-select"
                        {...register("marital_status", { required: true })}
                      >
                        <option value="">Select designation</option>
                        <option value="married">Married</option>
                        <option value="unmarried">Unmarried</option>
                      </select>
                      <div className="text-warning">
                        {errors.marital_status?.type === "required" &&
                          "Marital Status is required "}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                      <label
                        htmlFor="add-merital-status"
                        className="text-light"
                      >
                        Gender
                      </label>
                      <select
                        id="add-gender"
                        className="form-select"
                        {...register("gender", { required: true })}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female </option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="text-warning">
                        {errors.gender?.type === "required" &&
                          "Gender is required "}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <div className="form-date">
                        <label htmlFor="add-DoB" className="form-label">
                          DoB
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
                          id="add-DoB"
                          {...register("DoB", { required: true })}
                        />
                      </div>
                      <div className="text-warning">
                        {errors.DoB?.type === "required" && "DoB is required "}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <div className="form-date">
                        <label
                          htmlFor="add-joining-date"
                          className="form-label"
                        >
                          Joining Date.
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
                          id="add-joining-date"
                          {...register("joining_date", { required: true })}
                        />
                      </div>
                      <div className="text-warning">
                        {errors.joining_date?.type === "required" &&
                          "Joining Date is required "}
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <div className="form-date">
                        <label
                          htmlFor="add-terminated-date"
                          className="form-label"
                        >
                          Terminated Date
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
                          id="add-terminated-date"
                          {...register("terminated_date")}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <div className="form-date">
                        <label
                          htmlFor="add-reliving-date"
                          className="form-label"
                        >
                          Reliving Date
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
                          id="add-reliving-date"
                          {...register("reliving_date")}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <label htmlFor="add-emp-type" className="text-light">
                        Employee Type
                      </label>
                      <select
                        id="add-emp-type"
                        className="form-select"
                        {...register("emp_type", { required: true })}
                      >
                        <option value="">Select Emp Type</option>
                        {empTypeData?.map((data: any) => (
                          <>
                            <option value={`${data.emp_type_id}`}>
                              {data.emp_type}
                            </option>
                          </>
                        ))}
                      </select>
                      <div className="text-warning">
                        {errors.emp_type?.type === "required" &&
                          "Employee Type is required "}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <label htmlFor="add-designation" className="text-light">
                        Designation
                      </label>
                      <select
                        id="add-designation"
                        className="form-select"
                        {...register("designation", { required: true })}
                      >
                        <option value="">Select designation</option>
                        {designationData?.map((data: any) => (
                          <>
                            <option value={data.designation_id}>
                              {data.designation}
                            </option>
                          </>
                        ))}
                      </select>
                      <div className="text-warning">
                        {errors.designation?.type === "required" &&
                          "Designation is required "}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-department"
                          title=" "
                          {...register("department", { required: true })}
                          list="department_list"
                        />
                        <label htmlFor="add-department" className="form-label">
                          Department
                        </label>
                        <datalist id="department_list">
                          {departmentData?.map((data: any) => (
                            <>
                              <option
                                key={data.department_id}
                                value={`${data.department}`}
                              />
                            </>
                          ))}
                        </datalist>
                      </div>
                      <div className="text-warning">
                        {errors.department?.type === "required" &&
                          "Department is required "}
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-salary"
                          title=" "
                          {...register("salary", { required: true })}
                        />
                        <label htmlFor="add-salary" className="form-label">
                          Salary
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.salary?.type === "required" &&
                          "Salary is required "}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-number"
                          title=" "
                          {...register("phone_number")}
                        />
                        <label htmlFor="add-number" className="form-label">
                          Contact Number
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-emergency-number"
                          title=" "
                          {...register("emergency_number", { required: true })}
                        />
                        <label
                          htmlFor="add-emergency-number"
                          className="form-label"
                        >
                          Emercency Contact
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.emergency_number?.type === "required" &&
                          "Emercency Contact is required "}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-experience"
                          title=" "
                          {...register("experience")}
                        />
                        <label htmlFor="add-experience" className="form-label">
                          Experience
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                      <label htmlFor="add-address" className="text-light">
                        Address
                      </label>
                      <textarea
                        className="form-control"
                        id="add-address"
                        cols={30}
                        rows={10}
                        style={{ height: 100 + "px" }}
                        {...register("address", { required: true })}
                      ></textarea>
                    </div>
                    <div className="text-warning">
                      {errors.address?.type === "required" &&
                        "Address is required "}
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end product order -->*/}

                {/*<!-- start payment order -->*/}
                <fieldset className="fieldset">
                  <legend>Save </legend>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <label htmlFor="add-cur-status" className="text-light">
                        Current status
                      </label>
                      <select
                        id="add-cur-status"
                        className="form-select"
                        {...register("status", { required: true })}
                      >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="in-process">In-Process</option>
                        <option value="deactive">Deactive</option>
                      </select>
                      <hr className="bg-secondary" />
                      <div className="text-warning">
                        {errors.status?.type === "required" &&
                          "Status is required "}
                      </div>
                      <div className="text-center">
                        <span className="badge bg-primary">
                          Password: 123456
                        </span>
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                      <input
                        type="hidden"
                        {...register("orgid")}
                        value={OrgId()}
                      />
                      {loader ? (
                        <Loader title="Save" />
                      ) : (
                        <button type="submit" className="btn btn-success">
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

      {/*<!-- start edit modal -->*/}
      {employeePaginateInfo?.data?.map((data: any) => (
        <div
          className="modal"
          id={`edit_modal_${data.user_id}`}
          key={`edit_modal_${data.user_id}`}
        >
          <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
            <div className="modal-content modal-content-bg">
              <div className="modal-header">
                <h1 className="text-caption">Edite Employee Report</h1>
                <button
                  className="btn-close  bg-light"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form id={`edit_form_${data.user_id}`}>
                  <fieldset className="fieldset">
                    <legend>Emp. Report</legend>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-emp-name_${data.user_id}`}
                            title=" "
                            name="emp_name"
                            defaultValue={data.name}
                          />
                          <label
                            htmlFor={`edit-emp-name_${data.user_id}`}
                            className="form-label"
                          >
                            Employee Name
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-email_${data.user_id}`}
                            title=" "
                            name="email"
                            defaultValue={data.email}
                            readOnly={true}
                          />
                          <label
                            htmlFor={`edit-email_${data.user_id}`}
                            className="form-label"
                          >
                            Email
                          </label>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <label
                          htmlFor={`edit-country_${data.user_id}`}
                          className="text-light"
                        >
                          Country
                        </label>
                        <select
                          id={`edit-country_${data.user_id}`}
                          className="form-select"
                          name="country"
                        >
                          <option value="">Select Country</option>
                          {country?.map((country: any) => (
                            <>
                              <option
                                value={`${data.country_id}`}
                                selected={
                                  data.country_id === country.country_id
                                    ? true
                                    : false
                                }
                              >
                                {country.country_name}
                              </option>
                            </>
                          ))}
                        </select>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <label
                          htmlFor={`edit-city_${data.user_id}`}
                          className="text-light"
                        >
                          City
                        </label>
                        <select
                          id={`edit-city_${data.user_id}`}
                          className="form-select"
                          name="city"
                        >
                          <option value="">Select city</option>
                          {city?.map((city: any) => (
                            <>
                              <option
                                value={`${city.city_id}`}
                                selected={
                                  data.city_id === city.city_id ? true : false
                                }
                              >
                                {city.city_name}
                              </option>
                            </>
                          ))}
                        </select>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <label
                          htmlFor={`edit-merital-status_${data.user_id}`}
                          className="text-light"
                        >
                          Maritial Status
                        </label>
                        <select
                          id={`edit-merital-status_${data.user_id}`}
                          className="form-select"
                          name="marital_status"
                        >
                          <option value="">Select marital status</option>
                          <option
                            value="married"
                            selected={
                              data.marital_status === "married" ? true : false
                            }
                          >
                            Married
                          </option>
                          <option
                            value="unmarried"
                            selected={
                              data.marital_status === "unmarried" ? true : false
                            }
                          >
                            Unmarried
                          </option>
                        </select>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                        <label
                          htmlFor={`edit-gender_${data.user_id}`}
                          className="text-light"
                        >
                          Gender
                        </label>
                        <select
                          id={`edit-gender_${data.user_id}`}
                          className="form-select"
                          name="gender"
                        >
                          <option value="">Select Gender</option>
                          <option
                            value="Male"
                            selected={data.gender === "Male" ? true : false}
                          >
                            Male
                          </option>
                          <option
                            value="Female"
                            selected={data.gender === "Female" ? true : false}
                          >
                            Female{" "}
                          </option>
                          <option
                            value="Other"
                            selected={data.gender === "Other" ? true : false}
                          >
                            Other
                          </option>
                        </select>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                        <div className="form-date">
                          <label
                            htmlFor={`edit-DoB_${data.user_id}`}
                            className="form-label"
                          >
                            DoB
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.DoB}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`edit-DoB_${data.user_id}`}
                            name="DoB"
                            defaultValue={data.DoB}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                        <div className="form-date">
                          <label
                            htmlFor={`edit-joining-date_${data.user_id}`}
                            className="form-label"
                          >
                            Joining Date.
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.joining_date}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`edit-joining-date_${data.user_id}`}
                            name="joining_date"
                            defaultValue={data.joining_date}
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                        <div className="form-date">
                          <label
                            htmlFor={`edit-terminated-date_${data.user_id}`}
                            className="form-label"
                          >
                            Terminated Date
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.terminated_date}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`edit-terminated-date_${data.user_id}`}
                            name="terminated_date"
                            defaultValue={data.terminated_date}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                        <div className="form-date">
                          <label
                            htmlFor={`edit-reliving-date_${data.user_id}`}
                            className="form-label"
                          >
                            Reliving Date
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.relieving_date}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`edit-reliving-date_${data.user_id}`}
                            name="reliving_date"
                            defaultValue={data.relieving_date}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                        <label
                          htmlFor={`edit-emp-type_${data.user_id}`}
                          className="text-light"
                        >
                          Employee Type
                        </label>
                        <select
                          id={`edit-emp-type_${data.user_id}`}
                          className="form-select"
                          name="emp_type"
                        >
                          <option value="">Select Emp Type</option>
                          {empTypeData?.map((empType: any) => (
                            <>
                              <option
                                value={`${empType.emp_type_id}`}
                                selected={
                                  empType.emp_type_id === data.emp_type_id
                                    ? true
                                    : false
                                }
                              >
                                {empType.emp_type}
                              </option>
                            </>
                          ))}
                        </select>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                        <label
                          htmlFor={`edit-designation_${data.user_id}`}
                          className="text-light"
                        >
                          Designation
                        </label>
                        <select
                          id={`edit-designation_${data.user_id}`}
                          className="form-select"
                          name="designation"
                        >
                          <option value="">Select designation</option>
                          {designationData?.map((designation: any) => (
                            <>
                              <option
                                value={designation.designation_id}
                                selected={
                                  designation.designation_id ===
                                  data.designation_id
                                    ? true
                                    : false
                                }
                              >
                                {designation.designation}
                              </option>
                            </>
                          ))}
                        </select>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-department_${data.user_id}`}
                            title=" "
                            name="department"
                            defaultValue={data.department}
                            list="department_list"
                          />
                          <label
                            htmlFor={`edit-department_${data.user_id}`}
                            className="form-label"
                          >
                            Department
                          </label>
                          <datalist id="department_list">
                            {departmentData?.map((dept: any) => (
                              <>
                                <option
                                  key={dept.department_id}
                                  value={`${dept.department}`}
                                />
                              </>
                            ))}
                          </datalist>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`edit-salary_${data.user_id}`}
                            title=" "
                            name="salary"
                            defaultValue={data.salary}
                          />
                          <label
                            htmlFor={`edit-salary_${data.user_id}`}
                            className="form-label"
                          >
                            Salary
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-number_${data.user_id}`}
                            title=" "
                            name="phone_number"
                            defaultValue={data.phone_1}
                          />
                          <label
                            htmlFor={`edit-number_${data.user_id}`}
                            className="form-label"
                          >
                            Contact Number
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-emergency-number_${data.user_id}`}
                            title=" "
                            name="emergency_number"
                            defaultValue={data.phone}
                          />
                          <label
                            htmlFor={`edit-emergency-number_${data.user_id}`}
                            className="form-label"
                          >
                            Emercency Contact
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-experience_${data.user_id}`}
                            title=" "
                            name="experience"
                            defaultValue={data.experience}
                          />
                          <label
                            htmlFor={`edit-experience_${data.user_id}`}
                            className="form-label"
                          >
                            Experience
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                        <label
                          htmlFor={`edit-address_${data.user_id}`}
                          className="text-light"
                        >
                          Address
                        </label>
                        <textarea
                          className="form-control"
                          id={`edit-address_${data.user_id}`}
                          cols={30}
                          rows={10}
                          style={{ height: 100 + "px" }}
                          name="address"
                        >
                          {data.address_1}
                        </textarea>
                      </div>
                    </div>
                  </fieldset>
                  {/*<!-- end product order -->*/}

                  {/*<!-- start payment order -->*/}
                  <fieldset className="fieldset">
                    <legend>Update </legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                        <label
                          htmlFor={`edit-cur-status_${data.user_id}`}
                          className="text-light"
                        >
                          Current status
                        </label>
                        <select
                          id={`edit-cur-status_${data.user_id}`}
                          className="form-select"
                          name="status"
                        >
                          <option value="">Select Status</option>
                          <option
                            value="active"
                            selected={data.status === "active" ? true : false}
                          >
                            Active
                          </option>
                          <option
                            value="in-process"
                            selected={
                              data.status === "in-process" ? true : false
                            }
                          >
                            In-Process
                          </option>
                          <option
                            value="deactive"
                            selected={data.status === "deactive" ? true : false}
                          >
                            Deactive
                          </option>
                        </select>
                        <hr className="bg-secondary" />
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                        <input type="hidden" name="orgid" value={OrgId()} />
                        <input
                          type="hidden"
                          name="emp_id"
                          value={data.emp_id}
                        />
                        <input
                          type="hidden"
                          name="user_id"
                          value={data.user_id}
                        />
                        {loader ? (
                          <Loader title="Update" />
                        ) : (
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() =>
                              UpdateInfo(`edit_form_${data.user_id}`)
                            }
                            style={{
                              background: "#00b5ec",
                              border: "1px solid #77ecff",
                              boxShadow: "0 5px 8px #ffffff61",
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

  const departmentData = await FetchData(`/get/department/${id}`);
  const designationData = await FetchData("/get/designation");
  const empTypeData = await FetchData("/get/emp/type");
  const country = await FetchData("/get/country");
  const city = await FetchData("/get/city");
  const employeeData = await FetchData(`/get/emp/report/info/${id}`);
  const orgCurrencie = await GetOrgCurrencies(id);
  const orgname = await OrgName(id);

  return {
    props: {
      departmentData,
      designationData,
      empTypeData,
      country,
      city,
      employeeData,
      orgCurrencie,
      orgname,
    },
  };
}
