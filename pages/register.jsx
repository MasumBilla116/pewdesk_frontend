import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import JqueryMin from "./load_js/plugin/jquery.min.js";
import JqueryValidationMinJs from "./load_js/plugin/jquery.validation.min.js";
import AdditionalMethodsJs from "./load_js/plugin/additional-methods.min.js";
import AdminRegisterJs from "./load_js/controllers/admin-registration.js";
import FormValidationJs from "./load_js/controllers/form-validation.js";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import getCountry from "./api/getCountry";
import getCity from "./api/getCity";
import getLanguage from "./api/getLanguage";
import getDesignation from "./api/getDesignation";
import getCurrencie from "./api/getCurrencie";
import getTaxCode from "./api/getTaxCode";
import getBusinessType from "./api/getBusinessType";
import getSoftwareVersion from "./api/getSoftwareVersion";
import swal from "sweetalert";
import Router from "next/router.js";
import Cookies from "js-cookie";
import { encrypt } from "n-krypta";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

export default function Register(props) {
  const {
    countryData,
    cityData,
    languageData,
    designationData,
    currencieData,
    taxcodeData,
    businessTypeData,
    softwareVersionData,
  } = props;
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState();
  const InputPhoneNumberHandler = (e) => {
    setPhone(e.target.value);
  };
  const organizationRegister = useCallback((formData) => {
    setLoading(true);
    axios.get("sanctum/csrf-cookie").then((res) => {
      axios
        .post("http://localhost:8000/api/register/organization", formData)
        .then((res) => {
          setLoading(false);
          if (res.data.failed === 500) {
            toast.warn("Something is worng try again");
          } else if (res.data.phone_number_exist === true) {
            toast.warn("Phone number already exist");
          } else if (res.data.user_email_exist === true) {
            toast.warn("Email already exist");
          } else if (res.data.org_email_exist === true) {
            toast.warn("Business email already exist");
          } else {
            swal(
              `${res.data.org_name} you are welcome`,
              "Registration is successfull",
              "success"
            ).then(() => {
              const NID = {
                // national identity document
                email: res.data.email,
                orgemail: res.data.org_email,
                password: res.data.password,
                software: "pewdesk",
                orgid: res.data.org_id,
              };
              const SMPS = {
                // software module positions
                moduleFA: res.data.module_fa,
                moduleCRM: res.data.module_crm,
                moduleECM: res.data.module_ecm,
                moduleIVM: res.data.module_ivm,
                moduleODM: res.data.module_odm,
                moduleHCM: res.data.module_hcm,
                moduleSM: res.data.module_sm,
              };

              const IMA = {
                // identity module access means all role of user
                roleEmployee: 0,
                roleSuperAdmin: 1,
                roleAdmin: 0,
                roleReader: 0,
                roleCreator: 0,
                roleMonitor: 0,
                rolePermissionFA: res.data.module_fa,
                rolePermissionCRM: res.data.module_crm,
                rolePermissionECM: res.data.module_ecm,
                rolePermissionIVM: res.data.module_ivm,
                rolePermissionODM: res.data.module_odm,
                rolePermissionHCM: res.data.module_hcm,
                rolePermissionSM: res.data.module_sm,
                roleStatus: "Active",
                userStatus: 1,
              };
              const SMPSA = true; // software module positions access
              const VIL = true; // viewer information live
              const VI = {
                // viewer information
                name: res.data.name,
                profile: res.data.profile,
                designation: res.data.designation,
              };
              const PD_SV = res.data.version; // pewdesk_software_version

              const XSRL_TOKEN = {
                // crose server side live token note : make a key
                email: res.data.email,
                password: res.data.password,
                orgid: res.data.org_id,
              };
              const encrypt_XSRL_TOKEN = encrypt(
                XSRL_TOKEN,
                `${process.env.KEY_A}` + `${process.env.KEY_C}`
              );
              Cookies.set("XSRL_TOKEN", encrypt_XSRL_TOKEN);
              const secrateKey =
                `${process.env.KEY_C}` +
                res.data.email +
                `${process.env.KEY_B}` +
                res.data.password +
                `${process.env.KEY_A}` +
                res.data.org_id;
              Cookies.set("SMPS", encrypt(SMPS, secrateKey), {
                expires: 30,
              });
              Cookies.set("NID", encrypt(NID, secrateKey), { expires: 7 });
              Cookies.set("SMPSA", encrypt(SMPSA, secrateKey), { expires: 7 });
              Cookies.set("VIL", encrypt(VIL, secrateKey), { expires: 7 });
              Cookies.set("VI", encrypt(VI, secrateKey), { expires: 7 });
              Cookies.set("PD_SV", encrypt(PD_SV, secrateKey), { expires: 7 });
              Cookies.set("IMA", encrypt(IMA, secrateKey), { expires: 7 });

              Router.push("/dashboard");
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          console.warn("Error : ", error);
          toast.warn("Internal error try again");
        });
    });
  }, []);

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <div className="er-container login-body-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 d-lg-flex justify-content-center table-responsive">
              <form
                action="#"
                method="post"
                id="erad-reg-form"
                onSubmit={handleSubmit((data) => organizationRegister(data))}
              >
                <div className="erp-login-form position-relative erp-bg-front shadow-none">
                  <div className="erp-form-loader d-none">
                    <div className="erp-loader-container-inner text-black">
                      <div className="erp-gear-first">
                        <i
                          className="fa-solid fa-gear fa-spin"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div className="erp-gear-second">
                        <i
                          className="fa-solid fa-cog fa-spin"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div className="erp-gear-third">
                        <i
                          className="fa-solid fa-cog fa-spin fa-spin-reverse"
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div className="erp-login-header">
                    {/*<!-- <span className="erp-login-title text-secondary">ERP admin Login</span> -->*/}
                    <div className="erp-tab-nav" data-tab="#registration-tab">
                      <button
                        type="submit"
                        className="erp-tab-item btn text-secondary erp-tab-active btn-focus-box-shadow-0"
                        data-target="#personal-info"
                      >
                        Personal Info
                      </button>
                      <button
                        type="submit"
                        className="erp-tab-item btn text-secondary btn-focus-box-shadow-0"
                        data-target="#company-info"
                        disabled
                      >
                        Company Info
                      </button>
                      <button
                        type="button"
                        className="erp-tab-item btn text-secondary btn-focus-box-shadow-0"
                        data-target="#software-settings"
                        disabled
                      >
                        Software Settings
                      </button>
                    </div>
                    <div className="erp-logo">
                      <Image
                        width={70}
                        height={70}
                        className="img img-fluid"
                        src="/favicon.png"
                        alt="ERP"
                      />
                    </div>
                  </div>
                  <div className="erp-login-body  pb-4">
                    <div className="container mt-2">
                      <div className="alert mt-3 d-none"></div>
                      <div
                        className="erp-tab-content rounded-top"
                        id="registration-tab"
                      >
                        <div
                          className="erp-tab erp-tab-active pb-3 bg-transparent border-bottom-0"
                          id="personal-info"
                        >
                          <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2 mt-2">
                              <div className="form-group  mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2 ">
                                <div className="input-group">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fas fa-user"></i>
                                  </span>
                                  <input
                                    type="text"
                                    id="fname"
                                    className="form-control erp-input-dark text-light"
                                    placeholder="First Name"
                                    {...register("fname")}
                                  />
                                  <span
                                    className="input-group-text erp-input-group-text-dark text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="First name"
                                  >
                                    <i className="fa-solid fa-circle-info"></i>
                                  </span>
                                </div>
                                <label
                                  id="fname-error"
                                  className="error"
                                  htmlFor="fname"
                                ></label>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2 mt-lg-2 mt-xl-2 mt-md-2">
                              <div className="form-group  mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="input-group position-relative">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fas fa-user"></i>
                                  </span>
                                  <input
                                    type="text"
                                    id="lname"
                                    className="form-control erp-input-dark text-light"
                                    placeholder="Last Name"
                                    {...register("lname")}
                                  />
                                  <span
                                    className="input-group-text erp-input-group-text-dark text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Last name"
                                  >
                                    <i className="fa-solid fa-circle-info"></i>
                                  </span>
                                </div>
                                <label
                                  id="lname-error"
                                  className="error"
                                  htmlFor="lname"
                                ></label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2">
                              <div className="form-group  mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="input-group">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fa-solid fa-envelope"></i>
                                  </span>
                                  <input
                                    type="email"
                                    id="email"
                                    className="form-control erp-input-dark text-light"
                                    placeholder="Email"
                                    {...register("email")}
                                  />
                                  <span
                                    className="input-group-text erp-input-group-text-dark text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Email"
                                  >
                                    <i className="fa-solid fa-circle-info"></i>
                                  </span>
                                </div>
                                <label
                                  id="email-error"
                                  className="error"
                                  htmlFor="email"
                                ></label>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2">
                              <div className="form-group   mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="input-group  flex-nowrap">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fa-solid fa-mobile"></i>
                                  </span>
                                  <input
                                    type="tel"
                                    id="phone"
                                    className="form-control erp-input-dark text-light"
                                    placeholder="Phone"
                                    onChange={InputPhoneNumberHandler}
                                    {...register("phone")}
                                  />
                                  <span
                                    className="input-group-text erp-input-group-text-dark text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Phone"
                                  >
                                    <i className="fa-solid fa-circle-info"></i>
                                  </span>
                                </div>
                                <label
                                  id="phone-error"
                                  className="error"
                                  htmlFor="phone"
                                ></label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2">
                              <div className="form-group  mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="input-group">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fa-solid fa-flag"></i>
                                  </span>
                                  <select
                                    id="country"
                                    className="form-select erp-input-dark text-light bg-dark"
                                    {...register("country")}
                                  >
                                    <option value="">Select Country</option>
                                    {countryData
                                      ? countryData.map((data, index) => (
                                          <option
                                            key={index}
                                            value={data.country_id}
                                          >
                                            {data.country_name}
                                          </option>
                                        ))
                                      : ""}
                                  </select>
                                  <span
                                    className="input-group-text erp-input-group-text-dark text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Country"
                                  >
                                    <i className="fa-solid fa-circle-info"></i>
                                  </span>
                                </div>
                                <label
                                  id="country-error"
                                  className="error"
                                  htmlFor="country"
                                ></label>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2">
                              <div className="form-group  mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="input-group">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fa-solid fa-street-view"></i>
                                  </span>
                                  <select
                                    id="state"
                                    className="form-select erp-input-dark text-light bg-dark"
                                    {...register("state")}
                                  >
                                    <option>Select state</option>
                                    <option value="rangpur">rangpur</option>
                                  </select>
                                  <span
                                    className="input-group-text erp-input-group-text-dark text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="State"
                                  >
                                    <i className="fa-solid fa-circle-info"></i>
                                  </span>
                                </div>
                                <label
                                  id="state-error"
                                  className="error"
                                  htmlFor="state"
                                ></label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2">
                              <div className="form-group  mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="input-group">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fas fa-city"></i>
                                  </span>
                                  <select
                                    id="city"
                                    className="form-select erp-input-dark text-light bg-dark"
                                    {...register("city")}
                                  >
                                    <option value={""}>Select City</option>
                                    {cityData
                                      ? cityData.map((data, index) => (
                                          <option
                                            key={index}
                                            value={data.city_id}
                                          >
                                            {data.city_name}
                                          </option>
                                        ))
                                      : ""}
                                  </select>
                                  <span
                                    className="input-group-text erp-input-group-text-dark text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="City"
                                  >
                                    <i className="fa-solid fa-circle-info"></i>
                                  </span>
                                </div>
                                <label
                                  id="city-error"
                                  className="error"
                                  htmlFor="city"
                                ></label>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2">
                              <div className="form-group  mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="input-group">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fa-solid fa-location-dot"></i>
                                  </span>
                                  <input
                                    type="text"
                                    id="zipcode"
                                    className="form-control erp-input-dark text-light"
                                    placeholder="Zip code"
                                    {...register("zipcode")}
                                  />
                                  <span
                                    className="input-group-text erp-input-group-text-dark text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Zip-code"
                                  >
                                    <i className="fa-solid fa-circle-info"></i>
                                  </span>
                                </div>
                                <label
                                  id="zipcode-error"
                                  className="error"
                                  htmlFor="zipcode"
                                ></label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2">
                              <div className="form-group  mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="input-group">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fa-solid fa-address-card"></i>
                                  </span>
                                  <input
                                    type="text"
                                    id="address-line-1"
                                    className="form-control erp-input-dark text-light"
                                    placeholder="Address Line 1"
                                    {...register("addrline1")}
                                  />
                                  <span
                                    className="input-group-text erp-input-group-text-dark text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Address"
                                  >
                                    <i className="fa-solid fa-circle-info"></i>
                                  </span>
                                </div>
                              </div>
                              <label
                                id="addrline1-error"
                                className="error"
                                htmlFor="address-line-1"
                              ></label>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2">
                              <div className="form-group  mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="input-group">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fa-solid fa-address-card"></i>
                                  </span>
                                  <input
                                    type="tel"
                                    id="address-line-2"
                                    className="form-control erp-input-dark text-light"
                                    placeholder="Address Line 2 optional"
                                    {...register("addrline2")}
                                  />
                                  <span
                                    className="input-group-text erp-input-group-text-dark text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Address"
                                  >
                                    <i className="fa-solid fa-circle-info"></i>
                                  </span>
                                </div>
                              </div>
                              <label
                                id="addrline2-error"
                                className="error"
                                htmlFor="address-line-2"
                              ></label>
                            </div>
                          </div>
                        </div>
                        {/*<!-- company info -->*/}
                        <div
                          className="erp-tab pb-3 bg-transparent border-bottom-0 bg-er-dark"
                          id="company-info"
                        >
                          <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2 mt-2">
                              <div className="form-group mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="input-group">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fa-solid fa-building"></i>
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control erp-input-dark text-light"
                                    placeholder="Organization Name"
                                    {...register("orgname")}
                                  />
                                  <span
                                    className="input-group-text erp-input-group-text-dark text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Organization"
                                  >
                                    <i className="fa-solid fa-circle-info"></i>
                                  </span>
                                </div>
                                <label
                                  id="orgname-error"
                                  className="error"
                                  htmlFor="orgname"
                                ></label>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2 mt-xl-2 mt-lg-2 mt-md-2">
                              <div className="form-group  mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="input-group">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fa-solid fa-rectangle-list"></i>
                                  </span>
                                  <select
                                    id="businesstype"
                                    className="form-select erp-input-dark text-light bg-dark"
                                    {...register("businesstype")}
                                  >
                                    <option value={""}>
                                      Select business type
                                    </option>
                                    {businessTypeData
                                      ? businessTypeData.map((data, index) => (
                                          <option
                                            key={index}
                                            value={data.business_type_id}
                                          >
                                            {data.business_type_name}
                                          </option>
                                        ))
                                      : ""}
                                  </select>
                                  <span
                                    className="input-group-text erp-input-group-text-dark text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Business-type"
                                  >
                                    <i className="fa-solid fa-circle-info"></i>
                                  </span>
                                </div>
                                <label
                                  id="businesstype-error"
                                  className="error"
                                  htmlFor="businesstype"
                                ></label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2">
                              <div className="form-group  mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="input-group">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fa-solid fa-envelope"></i>
                                  </span>
                                  <input
                                    type="email"
                                    id="business-email"
                                    className="form-control erp-input-dark text-light"
                                    placeholder="Business email"
                                    {...register("business_email")}
                                  />
                                  <span
                                    className="input-group-text erp-input-group-text-dark text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Business-email"
                                  >
                                    <i className="fa-solid fa-circle-info"></i>
                                  </span>
                                </div>
                              </div>
                              <label
                                id="business-email-error"
                                className="error"
                                htmlFor="business-email"
                              ></label>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2">
                              <div className="form-group  mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="input-group">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fa-solid fa-location-dot"></i>
                                  </span>
                                  <input
                                    type="text"
                                    id="business-location"
                                    className="form-control erp-input-dark text-light"
                                    placeholder="Business location"
                                    {...register("business_location")}
                                  />
                                  <span
                                    className="input-group-text erp-input-group-text-dark text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Business-location"
                                  >
                                    <i className="fa-solid fa-circle-info"></i>
                                  </span>
                                </div>
                              </div>
                              <label
                                id="business_location-error"
                                className="error"
                                htmlFor="business-location"
                              ></label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2">
                              <div className="form-group  mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="input-group">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fa-solid fa-users"></i>
                                  </span>
                                  <input
                                    type="number"
                                    id="employees"
                                    className="form-control erp-input-dark text-light"
                                    placeholder="How many employees"
                                    {...register("employees")}
                                  />
                                  <span
                                    className="input-group-text erp-input-group-text-dark text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Employees"
                                  >
                                    <i className="fa-solid fa-circle-info"></i>
                                  </span>
                                </div>
                              </div>
                              <label
                                id="employees-error"
                                className="error"
                                htmlFor="employees"
                              ></label>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2">
                              <div className="form-group  mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="input-group">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fa-solid fa-user-alt"></i>
                                  </span>
                                  <select
                                    id="designation"
                                    className="form-select erp-input-dark text-light bg-dark"
                                    {...register("designation")}
                                  >
                                    <option value={""}>Your designation</option>
                                    <option value="1"> Admin </option>
                                  </select>
                                </div>
                              </div>
                              <label
                                id="designation-error"
                                className="error"
                                htmlFor="designation"
                              ></label>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2">
                              <div className="form-group  mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="input-group">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fas fa fa-lock-open"></i>
                                  </span>
                                  <input
                                    type="password"
                                    id="password"
                                    className="form-control erp-input-dark text-light"
                                    placeholder="Enter your secure password"
                                    {...register("password")}
                                  />
                                  <span
                                    className="input-group-text erp-input-group-text-dark text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="password"
                                  >
                                    <i className="fa-solid fa-circle-info"></i>
                                  </span>
                                </div>
                              </div>

                              <label
                                id="password-error"
                                className="error"
                                htmlFor="password"
                              ></label>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2">
                              <div className="form-group  mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="input-group">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fas fa fa-lock"></i>
                                  </span>
                                  <input
                                    type="password"
                                    id="confpassword"
                                    className="form-control erp-input-dark text-light"
                                    placeholder="comfirm password"
                                    {...register("confpassword")}
                                  />
                                  <span
                                    className="input-group-text erp-input-group-text-dark text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="confpassword"
                                  >
                                    <i className="fa-solid fa-circle-info"></i>
                                  </span>
                                </div>
                              </div>
                              <label
                                id="confpassword-error"
                                className="error"
                                htmlFor="confpassword"
                              ></label>
                            </div>
                          </div>
                        </div>
                        {/*<!-- software settings -->*/}
                        <div
                          className="erp-tab pb-3 bg-transparent border-bottom-0 bg-er-dark"
                          id="software-settings"
                        >
                          <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2 mt-xl-2 mt-lg-2 mt-md-2">
                              <div className="form-group  mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="input-group">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fas fa-language"></i>
                                  </span>
                                  <select
                                    id="language"
                                    className="form-select erp-input-dark text-light bg-dark"
                                    {...register("language")}
                                  >
                                    <option value={""}>
                                      Choose a language
                                    </option>
                                    {languageData
                                      ? languageData.map((data, index) => (
                                          <option
                                            key={index}
                                            value={data.language_id}
                                          >
                                            {data.language}
                                          </option>
                                        ))
                                      : ""}
                                  </select>
                                </div>
                                <label
                                  id="language-error"
                                  className="error"
                                  htmlFor="language"
                                ></label>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  mb-2 mt-xl-2 mt-lg-2 mt-md-2">
                              <div className="form-group  mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="input-group">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fa-solid fa-file-code"></i>
                                  </span>
                                  <select
                                    id="version"
                                    className="form-select erp-input-dark text-light bg-dark"
                                    {...register("version")}
                                  >
                                    <option value={""}>Choose Version</option>

                                    {softwareVersionData
                                      ? softwareVersionData.map(
                                          (data, index) => (
                                            <option
                                              key={index}
                                              value={data.software_version_id}
                                            >
                                              {" "}
                                              {data.software_version_name}
                                            </option>
                                          )
                                        )
                                      : ""}
                                  </select>
                                </div>
                                <label
                                  id="version-error"
                                  className="error"
                                  htmlFor="version"
                                ></label>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2">
                              <div className="form-group  mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="input-group">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fa-solid fa-money-check-dollar"></i>
                                  </span>
                                  <select
                                    id="currency"
                                    className="form-select erp-input-dark text-light bg-dark"
                                    {...register("currency")}
                                  >
                                    <option value={""}>Set Currency</option>

                                    {currencieData
                                      ? currencieData.map((data, index) => (
                                          <option
                                            key={index}
                                            value={data.currencie_id}
                                          >
                                            {data.currencie_name}
                                          </option>
                                        ))
                                      : ""}
                                  </select>
                                </div>
                                <label
                                  id="currency-error"
                                  className="error"
                                  htmlFor="currency"
                                ></label>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2">
                              <div className="form-group mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="input-group">
                                  <span className="input-group-text erp-input-group-text-dark text-secondary">
                                    <i className="fa-solid fa-percent"></i>
                                  </span>
                                  <select
                                    id="taxcode"
                                    className="form-select erp-input-dark text-light bg-dark"
                                    {...register("taxcode")}
                                  >
                                    <option value={""}>Set Tax Code</option>
                                    {taxcodeData
                                      ? taxcodeData.map((data, index) => (
                                          <option
                                            key={index}
                                            value={data.tax_code_id}
                                          >
                                            {data.tax_code_name}
                                          </option>
                                        ))
                                      : ""}
                                  </select>
                                </div>
                                <label
                                  id="taxcode-error"
                                  className="error"
                                  htmlFor="taxcode"
                                ></label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2 mt-2">
                              <div className="form-group  mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <h5 className="text-success text-bold">
                                  Choose your module
                                </h5>
                                {/* fa module */}
                                <div className="form-check">
                                  <input
                                    className="form-check-input use-module"
                                    type="checkbox"
                                    id="fa_module"
                                    value={"1"}
                                    {...register("fa_module")}
                                  />
                                  <label
                                    className="form-check-label text-light"
                                    htmlFor="fa_module"
                                  >
                                    Finance & Accounting
                                  </label>
                                </div>
                                {/* crm module */}
                                <div className="form-check">
                                  <input
                                    className="form-check-input use-module"
                                    type="checkbox"
                                    id="crm_module"
                                    value={"1"}
                                    {...register("crm_module")}
                                  />
                                  <label
                                    className="form-check-label text-light"
                                    htmlFor="crm_module"
                                  >
                                    Customer Relationship Management
                                  </label>
                                </div>
                                {/* ecm module */}
                                <div className="form-check">
                                  <input
                                    className="form-check-input use-module"
                                    type="checkbox"
                                    id="ecm_module"
                                    value={"1"}
                                    {...register("ecm_module")}
                                  />
                                  <label
                                    className="form-check-label text-light"
                                    htmlFor="ecm_module"
                                  >
                                    E-commerce Management
                                  </label>
                                </div>
                                {/* ivm module */}
                                <div className="form-check">
                                  <input
                                    className="form-check-input use-module"
                                    type="checkbox"
                                    id="ivm_module"
                                    value={"1"}
                                    {...register("ivm_module")}
                                  />
                                  <label
                                    className="form-check-label text-light"
                                    htmlFor="ivm_module"
                                  >
                                    Inventory Management
                                  </label>
                                </div>
                                {/* odm module */}
                                <div className="form-check">
                                  <input
                                    className="form-check-input use-module"
                                    type="checkbox"
                                    id="odm_module"
                                    value={"1"}
                                    {...register("odm_module")}
                                  />
                                  <label
                                    className="form-check-label text-light"
                                    htmlFor="odm_module"
                                  >
                                    Order Management
                                  </label>
                                </div>
                                {/* hcm module */}
                                <div className="form-check">
                                  <input
                                    className="form-check-input use-module"
                                    type="checkbox"
                                    id="hcm_module"
                                    value={"1"}
                                    {...register("hcm_module")}
                                  />
                                  <label
                                    className="form-check-label text-light"
                                    htmlFor="hcm_module"
                                  >
                                    Human Capital Management
                                  </label>
                                </div>
                                {/* sm module */}
                                {/* <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" name="sm_module" value="1" id="sm_module" />
                                                                <label className="form-check-label text-light" htmlFor="sm_module">
                                                                    School Management
                                                                </label>
                                                            </div> */}
                                <p className="text-danger module-error">
                                  Must be select a module
                                </p>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2">
                              <div className="form-group mt-xxl-5 mt-xl-4 mt-lg-3 mt-md-2 mt-sm-2">
                                <div className="form-check">
                                  <input
                                    className="form-check-input "
                                    type="checkbox"
                                    id="conditions"
                                    {...register("conditions")}
                                  />
                                  <label
                                    className="form-check-label text-primary"
                                    htmlFor="conditions"
                                  >
                                    Are you agree with us ?
                                  </label>
                                </div>
                                <Link
                                  href="/"
                                  className="text-decoration-none text-light"
                                >
                                  Please read Terms & conditions .
                                </Link>
                              </div>
                              <label
                                id="conditions-error"
                                className="error"
                                htmlFor="conditions"
                              ></label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="hr-outer-process bg-light">
                        <div className="hr-inner-process"></div>
                      </div>
                      <div className="d-flex mt-4 justify-content-between erp-next-back-btn-con">
                        <Link href="/" className="text-light">
                          Login Now?
                        </Link>
                        {loading ? (
                          <>
                            <Loader title="Submit" />
                          </>
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-success ps-lg-3 pe-lg-3 erp-reg-submit"
                            id="submit"
                            disabled
                          >
                            Submit
                          </button>
                        )}
                        <button
                          type="submit"
                          className="btn btn-success ps-lg-3 pe-lg-3 "
                          id="erp-btn-next"
                        >
                          Next
                          <i className="fas fa fa-arrow-right ms-2"></i>
                        </button>
                      </div>
                      <div className="form-group mt-lg-3">
                        <Link href="#" className="text-success">
                          Terms &amp; conditions
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-4">
              {/*<!-- <img className="erp-glob" src="../../assets/theme_icon/glob.png" alt="" srcset=""> -->*/}
              <div className="erp-earth"></div>
              <p className="text-light">
                Wellcome to PEWDESK ERP system. World largest cloud base ERP
                system. Most secure, stable, supper first techlogy for your
                biggest medium organization.
              </p>
              <div className="finance-img-con">
                <Image
                  width={500}
                  height={200}
                  src="/logo/finance-3.jpg"
                  alt="finance"
                  className="img rounded img-fluid erp-finance-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* start js Link */}
      <JqueryMin />
      <JqueryValidationMinJs />
      <AdditionalMethodsJs />
      {/* <PhoneMinJs /> */}
      <AdminRegisterJs />
      <FormValidationJs />
      {/* <PhoneInitJs /> */}
      {/* end js link */}
    </>
  );
}

export async function getServerSideProps() {
  const countryData = await getCountry();
  const cityData = await getCity();
  const languageData = await getLanguage();
  const designationData = await getDesignation();
  const currencieData = await getCurrencie();
  const taxcodeData = await getTaxCode();
  const businessTypeData = await getBusinessType();
  const softwareVersionData = await getSoftwareVersion();

  return {
    props: {
      countryData,
      cityData,
      languageData,
      designationData,
      currencieData,
      taxcodeData,
      businessTypeData,
      softwareVersionData,
    },
  };
}
