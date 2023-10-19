import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import Aside from "../components/Aside";
import ToggleOption from "../components/ToggleOption";
import Footer from "../components/Footer";
import JqueryMin from "./load_js/plugin/jquery.min.js";
import AsidejQuery from "./load_js/controllers/AsidejQuery";
import FullScreenMode from "./load_js/controllers/FullScreenMode";
import PickDate from "./load_js/controllers/PickDate";
import Cookies from "js-cookie";
import { decrypt } from "n-krypta";
import AccessKey from "./api/AccessKey";
import Router from "next/router";
import { useForm } from "react-hook-form";
import getCountry from "./api/getCountry";
import getCity from "./api/getCity";
import axios from "axios";
import Loader from "../components/Loader";
import FetchData from "./api/Helper/FetchData";
import OrgId from "./api/Helper/OrgId";
import UserEmail from "./api/Helper/UserEmail";
import { toast } from "react-toastify";

export default function Settings(props: any) {
  const {
    countryData,
    cityData,
    departmentData,
    designationData,
    empTypeData,
    country,
    city,
  } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: TeamRegisterReg,
    handleSubmit: handleSubmitTeamRegister,
    formState: { errors: TeamRegisterErrors },
  } = useForm();

  const NID = Cookies.get("NID");
  const decrypt_NID = decrypt(`${NID}`, `${AccessKey()}`);
  const [teamFA, setTeamFA] = useState(0);
  const [teamCRM, setTeamCRM] = useState(0);
  const [teamECM, setTeamECM] = useState(0);
  const [teamIVM, setTeamIVM] = useState(0);
  const [teamODM, setTeamODM] = useState(0);
  const [teamHCM, setTeamHCM] = useState(0);
  const [teamSM, setTeamSM] = useState(0);
  const [createTeamLoader, setCreateTeamLoader] = useState(false);
  const [orgid, setOrgId] = useState(decrypt_NID.orgid);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const SMPS = Cookies.get("SMPS");
    const IMA = Cookies.get("IMA");

    const decrypt_SMPS = decrypt(`${SMPS}`, `${AccessKey()}`);
    const decrypt_IMA = decrypt(`${IMA}`, `${AccessKey()}`);
    if (!decrypt_IMA.roleSuperAdmin) {
      Router.push("/dashboard");
    }
    setTeamFA(decrypt_SMPS.moduleFA);
    setTeamCRM(decrypt_SMPS.moduleCRM);
    setTeamECM(decrypt_SMPS.moduleECM);
    setTeamIVM(decrypt_SMPS.moduleIVM);
    setTeamODM(decrypt_SMPS.moduleODM);
    setTeamHCM(decrypt_SMPS.moduleHCM);
    setTeamSM(decrypt_SMPS.moduleSM);

    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle.min")
      : null;
  }, []);

  useEffect(() => {
    $("#phone").trigger("click");
    $("#email").trigger("click");
  }, [email, phone, loader]);

  const createTeam = useCallback(async (formData: any) => {
    setLoader(true);
    axios.get("sanctum/csrf-cookie").then((res) => {
      axios
        .post("http://127.0.0.1:8000/api/create/team", formData)
        .then((res) => {
          setLoader(false);
          if (res.data.email_or_phone_not_exist === true) {
            toast.info("Email Or Phone is not exist");
            toast.info("Please register first");
          }

          if (res.data.error) {
            toast.warn("Please try again");
          }

          if (res.data.success) {
            setEmail("");
            setPhone("");
            $("#create_team_form").trigger("reset");
            toast.success("Now Your team is ready");
          }
        })
        .catch((error) => {
          setLoader(false);
          toast.warn("Something is worng.");
        });
    });
  }, []);

  const teamRegister = useCallback((formData: any) => {
    setLoader(true);
    axios.get("sanctum/csrf-cookie").then((res) => {
      axios
        .post("http://127.0.0.1:8000/api/team/member/register", formData)
        .then((res) => {
          setLoader(false);
          if (res.data.emp_limitation_full) {
            toast.info(`Ooops..! ${res.data.title} \n ${res.data.message}`);
          }
          if (res.data.exist) {
            toast.warn(`${res.data.message} is already existed.`);
          }
          if (res.data.error === 500) {
            toast.warn("Something is worng try again");
          }
          if (res.data.success === 200) {
            setEmail(formData.email);
            setPhone(formData.emergency_number);
            $("#teamRegisterForm").trigger("reset");
            $("#phone").trigger("click");
            $("#email").trigger("click");
            $(".modal-close-btn").click();
          }
        })
        .catch((error) => {
          setLoader(false);
          toast.warn("Something is worng try again");
        });
    });
  }, []);

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePhone = (e: any) => {
    setPhone(e.target.value);
  };
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Settings</title>
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
                  {/* <!-- start main code --> */}
                  {/* <!-- start add admin tab pane --> */}
                  <div className="row">
                    {/* start member register text*/}
                    <div className="col-4 ">
                      <div className="mt-4 bg-black d-flex justify-content-center flex-column border border-secondary rounded p-4">
                        <p className="text-info text-center text-bg-dark p-4 rounded">
                          Make your project team members. You first Register
                          team members then give the authentication permessions
                        </p>
                        <button
                          type="button"
                          className="btn btn-success mt-2"
                          data-bs-toggle="modal"
                          data-bs-target="#register"
                          style={{
                            background: "#00b5ec",
                            border: "1px solid #77ecff",
                            boxShadow: "0 5px 8px #ffffff61",
                          }}
                        >
                          Register
                        </button>
                      </div>
                    </div>
                    {/* end member register text*/}
                    {/* start form */}
                    <div className="col-8">
                      {/* <!-- start fa admin --> */}
                      <div className="bg-black-border text-light p-3 mt-4 rounded">
                        <h4>Create Team</h4>
                        <hr />
                        <form
                          id={"create_team_form"}
                          onSubmit={handleSubmit((data) => {
                            createTeam(data);
                          })}
                        >
                          <div className="row">
                            <div className="col mb-4">
                              <label htmlFor="team_name">Team name</label>
                              <input
                                type="text"
                                className="form-control roll-input"
                                id="team_name"
                                placeholder="team_name"
                                {...register("team_name", {
                                  required: true,
                                })}
                              />
                              <div className="text-danger">
                                {errors.team_name?.type === "required" &&
                                  "Team name is required"}
                              </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                              <label htmlFor="email">Email</label>
                              <input
                                type="email"
                                className="form-control roll-input"
                                id="email"
                                placeholder="Email"
                                {...register("email", {
                                  required: true,
                                })}
                                defaultValue={email}
                                onKeyUp={(e) => {
                                  handleEmail(e);
                                }}
                              />
                              <div className="text-danger">
                                {errors.email?.type === "required" &&
                                  "Email is required"}
                              </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                              <label htmlFor="fa-admin-name">Phone</label>
                              <input
                                type="text"
                                className="form-control roll-input"
                                id="phone"
                                placeholder="Phone"
                                {...register("phone", {
                                  required: true,
                                  minLength: 11,
                                  maxLength: 11,
                                })}
                                defaultValue={phone}
                                onKeyUp={(e) => {
                                  handlePhone(e);
                                }}
                              />
                              <div className="text-danger">
                                {errors.phone?.type === "required" &&
                                  "Phone number is required"}
                                {errors.phone?.type === "maxLength" &&
                                  "Max length 11"}
                                {errors.phone?.type === "minLength" &&
                                  "Min length 11"}
                              </div>
                            </div>

                            {/* start status */}
                            <div className="col-lg-6 mb-4">
                              <label
                                htmlFor="add-role_status"
                                className="text-light"
                              >
                                Role status
                              </label>
                              <select
                                id="add-role_status"
                                className="form-select roll-input"
                                {...register("role_status", { required: true })}
                              >
                                <option value="">Select Status</option>
                                <option value="active">Active</option>
                                <option value="in-process">In-Process</option>
                                <option value="deactive">Deactive</option>
                              </select>
                              <div className="text-warning">
                                {errors.role_status?.type === "required" &&
                                  "Role Status is required "}
                              </div>
                            </div>

                            {/* end status */}

                            {/* start permission and access */}
                            {/* start permission to access */}
                            <div className="col-lg-6 mb-4">
                              {/* start admin roll list */}
                              <h5>Access Module</h5>
                              <ul className="list-group ">
                                {teamFA === 1 && (
                                  <li
                                    className="list-group-item text-light bg-transparent roll-list-border"
                                    style={{
                                      borderColor: "#8d0095 !important",
                                    }}
                                  >
                                    <input
                                      id="permission_fa"
                                      className="form-check-input me-1"
                                      type="checkbox"
                                      {...register("permission_fa")}
                                    />
                                    <label htmlFor="permission_fa">FA</label>
                                  </li>
                                )}
                                {teamCRM === 1 && (
                                  <li
                                    className="list-group-item text-light bg-transparent roll-list-border"
                                    style={{
                                      borderColor: "#8d0095 !important",
                                    }}
                                  >
                                    <input
                                      id="permission_crm"
                                      className="form-check-input me-1"
                                      type="checkbox"
                                      {...register("permission_crm")}
                                    />
                                    <label htmlFor="permission_crm">CRM</label>
                                  </li>
                                )}
                                {teamECM === 1 && (
                                  <li
                                    className="list-group-item text-light bg-transparent roll-list-border"
                                    style={{
                                      borderColor: "#8d0095 !important",
                                    }}
                                  >
                                    <input
                                      id="permission_ecm"
                                      className="form-check-input me-1"
                                      type="checkbox"
                                      {...register("permission_ecm")}
                                    />
                                    <label htmlFor="permission_ecm">ECM</label>
                                  </li>
                                )}
                                {teamIVM === 1 && (
                                  <li
                                    className="list-group-item text-light bg-transparent roll-list-border"
                                    style={{
                                      borderColor: "#8d0095 !important",
                                    }}
                                  >
                                    <input
                                      id="permission_ivm"
                                      className="form-check-input me-1"
                                      type="checkbox"
                                      {...register("permission_ivm")}
                                    />
                                    <label htmlFor="permission_ivm">IVM</label>
                                  </li>
                                )}
                                {teamODM === 1 && (
                                  <li
                                    className="list-group-item text-light bg-transparent roll-list-border"
                                    style={{
                                      borderColor: "#8d0095 !important",
                                    }}
                                  >
                                    <input
                                      id="permission_odm"
                                      className="form-check-input me-1"
                                      type="checkbox"
                                      {...register("permission_odm")}
                                    />
                                    <label htmlFor="permission_odm">ODM</label>
                                  </li>
                                )}
                                {teamHCM === 1 && (
                                  <li
                                    className="list-group-item text-light bg-transparent roll-list-border"
                                    style={{
                                      borderColor: "#8d0095 !important",
                                    }}
                                  >
                                    <input
                                      id="permission_hcm"
                                      className="form-check-input me-1"
                                      type="checkbox"
                                      {...register("permission_hcm")}
                                    />
                                    <label htmlFor="permission_hcm">HCM</label>
                                  </li>
                                )}
                                {teamSM === 1 && (
                                  <li
                                    className="list-group-item text-light bg-transparent roll-list-border"
                                    style={{
                                      borderColor: "#8d0095 !important",
                                    }}
                                  >
                                    <input
                                      id="permission_sm"
                                      className="form-check-input me-1"
                                      type="checkbox"
                                      {...register("permission_sm")}
                                    />
                                    <label htmlFor="permission_sm">SM</label>
                                  </li>
                                )}
                              </ul>
                              {/* end admin roll list */}
                            </div>
                            {/* end permission to access */}
                            {/* start permission */}
                            <div className="col-lg-6 mb-4">
                              {/* start admin roll list */}
                              <h5>Permission</h5>
                              <ul className="list-group ">
                                <li
                                  className="list-group-item text-light bg-transparent roll-list-border"
                                  style={{
                                    borderColor: "#8d0095 !important",
                                  }}
                                >
                                  <input
                                    id="admin"
                                    className="form-check-input me-1"
                                    type="radio"
                                    {...register("permissions")}
                                    defaultValue={"admin"}
                                  />
                                  <label htmlFor="admin">Admin</label>
                                </li>
                                <li
                                  className="list-group-item text-light bg-transparent roll-list-border"
                                  style={{
                                    borderColor: "#8d0095 !important",
                                  }}
                                >
                                  <input
                                    id="reader"
                                    className="form-check-input me-1"
                                    type="radio"
                                    {...register("permissions")}
                                    defaultValue={"reader"}
                                  />
                                  <label htmlFor="reader">Reader</label>
                                </li>
                                <li
                                  className="list-group-item text-light bg-transparent roll-list-border"
                                  style={{
                                    borderColor: "#8d0095 !important",
                                  }}
                                >
                                  <input
                                    id="creator"
                                    className="form-check-input me-1"
                                    type="radio"
                                    {...register("permissions")}
                                    defaultValue={"creator"}
                                  />
                                  <label htmlFor="creator">Creator</label>
                                </li>
                                <li
                                  className="list-group-item text-light bg-transparent roll-list-border"
                                  style={{
                                    borderColor: "#8d0095 !important",
                                  }}
                                >
                                  <input
                                    id="monitor"
                                    className="form-check-input me-1"
                                    type="radio"
                                    {...register("permissions")}
                                    defaultValue={"monitor"}
                                  />
                                  <label htmlFor="monitor">Monitor</label>
                                </li>
                              </ul>
                              {/* end admin roll list */}
                            </div>
                            {/* end permission */}
                            {/* end permission and access */}
                            <div className="col-12 mb-4">
                              <hr />
                              <div className="d-flex justify-content-end">
                                <input
                                  type="hidden"
                                  {...register("orgid")}
                                  value={OrgId()}
                                />
                                <input
                                  type="hidden"
                                  {...register("ref_email")}
                                  value={UserEmail()}
                                />
                                {loader ? (
                                  <Loader title="Save" />
                                ) : (
                                  <button
                                    type="submit"
                                    className="btn  btn-success shadow"
                                    style={{
                                      background: "#00b5ec",
                                      border: "1px solid #77ecff",
                                      boxShadow: "0 5px 8px #ffffff61",
                                    }}
                                  >
                                    Save
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      {/* <!-- end fa admin --> */}
                    </div>
                    {/* end form */}
                  </div>
                  {/* <!-- end main code --> */}
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
      {/* start team member register modal */}
      {/*<!-- start add modal -->*/}
      <div className="modal" id="register">
        <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
          <div className="modal-content modal-content-bg">
            <div className="modal-header">
              <h1 className="text-caption">Employee Register</h1>
              <button
                className="btn-close bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                id="teamRegisterForm"
                onSubmit={handleSubmitTeamRegister((data) =>
                  teamRegister(data)
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
                          {...TeamRegisterReg("emp_name", { required: true })}
                        />
                        <label htmlFor="add-emp-name" className="form-label">
                          Employee Name
                        </label>
                      </div>
                      <div className="text-warning">
                        {TeamRegisterErrors.emp_name?.type === "required" &&
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
                          {...TeamRegisterReg("email", { required: true })}
                        />
                        <label htmlFor="add-email" className="form-label">
                          Email
                        </label>
                      </div>
                      <div className="text-warning">
                        {TeamRegisterErrors.email?.type === "required" &&
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
                        {...TeamRegisterReg("country", { required: true })}
                      >
                        <option value="">Select Country</option>
                        {country?.map((data: any) => (
                          <>
                            <option
                              value={`${data.country_id}`}
                              key={`${data.country_id}`}
                            >
                              {data.country_name}
                            </option>
                          </>
                        ))}
                      </select>
                      <div className="text-warning">
                        {TeamRegisterErrors.country?.type === "required" &&
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
                        {...TeamRegisterReg("city", { required: true })}
                      >
                        <option value="">Select city</option>
                        {city?.map((data: any) => (
                          <>
                            <option
                              value={`${data.city_id}`}
                              key={`${data.city_id}`}
                            >
                              {data.city_name}
                            </option>
                          </>
                        ))}
                      </select>
                      <div className="text-warning">
                        {TeamRegisterErrors.city?.type === "required" &&
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
                        {...TeamRegisterReg("marital_status", {
                          required: true,
                        })}
                      >
                        <option value="">Select designation</option>
                        <option value="married">Married</option>
                        <option value="unmarried">Unmarried</option>
                      </select>
                      <div className="text-warning">
                        {TeamRegisterErrors.marital_status?.type ===
                          "required" && "Marital Status is required "}
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
                        {...TeamRegisterReg("gender", { required: true })}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female </option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="text-warning">
                        {TeamRegisterErrors.gender?.type === "required" &&
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
                          {...TeamRegisterReg("DoB", { required: true })}
                        />
                      </div>
                      <div className="text-warning">
                        {TeamRegisterErrors.DoB?.type === "required" &&
                          "DoB is required "}
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
                          {...TeamRegisterReg("joining_date", {
                            required: true,
                          })}
                        />
                      </div>
                      <div className="text-warning">
                        {TeamRegisterErrors.joining_date?.type === "required" &&
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
                          {...TeamRegisterReg("terminated_date")}
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
                          {...TeamRegisterReg("reliving_date")}
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
                        {...TeamRegisterReg("emp_type", { required: true })}
                      >
                        <option value="">Select Emp Type</option>
                        {empTypeData?.map((data: any) => (
                          <>
                            <option
                              value={`${data.emp_type_id}`}
                              key={`${data.emp_type_id}`}
                            >
                              {data.emp_type}
                            </option>
                          </>
                        ))}
                      </select>
                      <div className="text-warning">
                        {TeamRegisterErrors.emp_type?.type === "required" &&
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
                        {...TeamRegisterReg("designation", { required: true })}
                      >
                        <option value="">Select designation</option>
                        {designationData?.map((data: any) => (
                          <>
                            <option
                              value={data.designation_id}
                              key={data.designation_id}
                            >
                              {data.designation}
                            </option>
                          </>
                        ))}
                      </select>
                      <div className="text-warning">
                        {TeamRegisterErrors.designation?.type === "required" &&
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
                          {...TeamRegisterReg("department", { required: true })}
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
                        {TeamRegisterErrors.department?.type === "required" &&
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
                          {...TeamRegisterReg("salary", { required: true })}
                        />
                        <label htmlFor="add-salary" className="form-label">
                          Salary
                        </label>
                      </div>
                      <div className="text-warning">
                        {TeamRegisterErrors.salary?.type === "required" &&
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
                          {...TeamRegisterReg("phone_number", {
                            minLength: 11,
                            maxLength: 11,
                          })}
                        />
                        <label htmlFor="add-number" className="form-label">
                          Contact Number
                        </label>
                      </div>
                      <div className="text-warning">
                        {TeamRegisterErrors.phone_number?.type ===
                          "minLength" && "Minimum 11 digits"}

                        {TeamRegisterErrors.phone_number?.type ===
                          "maxLength" && "Maximum 11 digits"}
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
                          {...TeamRegisterReg("emergency_number", {
                            required: true,
                            minLength: 11,
                            maxLength: 11,
                          })}
                        />
                        <label
                          htmlFor="add-emergency-number"
                          className="form-label"
                        >
                          Emercency Contact
                        </label>
                      </div>
                      <div className="text-warning">
                        {TeamRegisterErrors.emergency_number?.type ===
                          "required" && "Emercency Contact is required "}

                        {TeamRegisterErrors.emergency_number?.type ===
                          "minLength" && "Minimum 11 digits"}

                        {TeamRegisterErrors.emergency_number?.type ===
                          "maxLength" && "Maximum 11 digits"}
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
                          {...TeamRegisterReg("experience")}
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
                        {...TeamRegisterReg("address", { required: true })}
                      ></textarea>
                    </div>
                    <div className="text-warning">
                      {TeamRegisterErrors.address?.type === "required" &&
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
                        {...TeamRegisterReg("status", { required: true })}
                      >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="in-process">In-Process</option>
                        <option value="deactive">Deactive</option>
                      </select>
                      <hr className="bg-secondary" />
                      <div className="text-warning">
                        {TeamRegisterErrors.status?.type === "required" &&
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
                        {...TeamRegisterReg("orgid")}
                        value={OrgId()}
                      />
                      {loader ? (
                        <Loader title="Save" />
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-success"
                          style={{
                            background: "#00b5ec",
                            border: "1px solid #77ecff",
                            boxShadow: "0 5px 8px #ffffff61",
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
      {/*<!-- end add modal -->*/}

      {/* start load script */}
      <JqueryMin />
      <AsidejQuery />
      <FullScreenMode />
      <PickDate />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const id = context.query.v;
  const countryData = await getCountry();
  const cityData = await getCity();
  const departmentData = await FetchData(`/get/department/${id}`);
  const designationData = await FetchData("/get/designation");
  const empTypeData = await FetchData("/get/emp/type");
  const country = await FetchData("/get/country");
  const city = await FetchData("/get/city");

  return {
    props: {
      countryData,
      cityData,
      departmentData,
      designationData,
      empTypeData,
      country,
      city,
    },
  };
}
