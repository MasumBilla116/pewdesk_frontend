"use client";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { decrypt, encrypt } from "n-krypta";
import Cookies from "js-cookie";
import Router from "next/router";
import AccessKey from "./api/AccessKey";
import Loader from "./../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loader, setLoader] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const [userCaptureNumber, setUserCaptureNumber] = useState(0);
  const getCaptureNumber = useCallback(() => {
    return Math.floor(Math.random() * 10);
  }, []);
  const [captureNumber1, setCaptureNumber1] = useState(0);
  const [captureNumber2, setCaptureNumber2] = useState(0);

  useEffect(() => {
    setCaptureNumber1(getCaptureNumber());
    setCaptureNumber2(getCaptureNumber());
    const View_live = Cookies.get("VIL");
    const SMPSA = Cookies.get("SMPSA");
    const NID = Cookies.get("NID");

    const decrypt_SMPSA = decrypt(`${SMPSA}`, `${AccessKey()}`);
    const decrypt_VIL = decrypt(`${View_live}`, `${AccessKey()}`);
    const decrypt_NID = decrypt(`${NID}`, `${AccessKey()}`);

    if (decrypt_VIL === true && decrypt_SMPSA === true) {
      setIsLogin(true);
      Router.push(`/dashboard?v=${decrypt_NID.orgid}`);
    }
  }, []);

  const UseLogin = useCallback((formData) => {
    setLoader(true);
    axios.get("sanctum/csrf-cookie").then((res) => {
      axios
        .post("http://127.0.0.1:8000/api/login", formData)
        .then((res) => {
          setLoader(false);
          if (!res.data.role) {
            toast.success("Your are login");
            Cookies.set("login", true);
            Cookies.set("access", true);
            /**
             * ----------------------------------------
             * New login remove all cookie
             * ----------------------------------------
             * */
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
            const SMPSA = true; // software module positions access
            const VIL = true; // viewer information live
            const VI = {
              // viewer information
              name: res.data.name,
              profile: res.data.profile,
              designation: res.data.designation,
            };

            const PD_SV = {
              version: res.data.version,
              remaining_day: res.data.remaining_day,
            }; // pewdesk_software_version

            const XSRL_TOKEN = {
              // crose server side live token note : make a key
              email: res.data.email,
              password: res.data.password,
              orgid: res.data.org_id,
            };

            const IMA = {
              // identity module access means all role of user
              roleEmployee: res.data.role_employee,
              roleSuperAdmin: res.data.role_super_admin,
              roleAdmin: res.data.role_admin,
              roleReader: res.data.role_reader,
              roleCreator: res.data.role_creator,
              roleMonitor: res.data.role_monitor,
              rolePermissionFA: res.data.role_permission_fa,
              rolePermissionCRM: res.data.role_permission_crm,
              rolePermissionECM: res.data.role_permission_ecm,
              rolePermissionIVM: res.data.role_permission_ivm,
              rolePermissionODM: res.data.role_permission_odm,
              rolePermissionHCM: res.data.role_permission_hcm,
              rolePermissionSM: res.data.role_permission_sm,
              roleStatus: res.data.role_status,
              userStatus: res.data.status,
            };

            const encrypt_XSRL_TOKEN = encrypt(
              XSRL_TOKEN,
              `${process.env.KEY_A}` + `${process.env.KEY_C}`
            );
            if (formData.remember) {
              Cookies.set("XSRL_TOKEN", encrypt_XSRL_TOKEN, { expires: 365 });
            } else {
              Cookies.set("XSRL_TOKEN", encrypt_XSRL_TOKEN);
            }
            const secrateKey =
              `${process.env.KEY_C}` +
              res.data.email +
              `${process.env.KEY_B}` +
              res.data.password +
              `${process.env.KEY_A}` +
              res.data.org_id;
            if (formData.remember) {
              // VILS Viewer Information Live Stay means Remember or not this data.
              const VILS = {
                email: res.data.email,
                password: res.data.password,
                remember: true,
              }; // remember cookies permissions
              Cookies.set("VILS", encrypt(VILS, secrateKey), { expires: 365 });
              Cookies.set("IMA", encrypt(IMA, secrateKey), { expires: 365 });
              Cookies.set("SMPS", encrypt(SMPS, secrateKey), { expires: 365 });
              Cookies.set("NID", encrypt(NID, secrateKey), { expires: 365 });
              Cookies.set("SMPSA", encrypt(SMPSA, secrateKey), {
                expires: 365,
              });
              Cookies.set("VIL", encrypt(VIL, secrateKey), { expires: 365 });
              Cookies.set("VI", encrypt(VI, secrateKey), { expires: 365 });
              Cookies.set("PD_SV", encrypt(PD_SV, secrateKey), {
                expires: 365,
              });
              Router.push(`/dashboard?v=${res.data.org_id}`);
            } else {
              // VILS Viewer Information Live Stay means Remember or not this data.
              const VILS = {
                email: false,
                password: false,
                remember: false,
              }; // remember cookies permissions
              Cookies.set("VILS", encrypt(VILS, secrateKey));
              Cookies.set("IMA", encrypt(IMA, secrateKey));
              Cookies.set("SMPS", encrypt(SMPS, secrateKey));
              Cookies.set("NID", encrypt(NID, secrateKey));
              Cookies.set("SMPSA", encrypt(SMPSA, secrateKey));
              Cookies.set("VIL", encrypt(VIL, secrateKey));
              Cookies.set("VI", encrypt(VI, secrateKey));
              Cookies.set("PD_SV", encrypt(PD_SV, secrateKey));
              Router.push(`/dashboard?v=${res.data.org_id}`);
            }
          } else {
            setCaptureNumber1(getCaptureNumber());
            setCaptureNumber2(getCaptureNumber());
            toast.warn("You are not aligible");
          }
        })
        .catch((error) => {
          setCaptureNumber1(getCaptureNumber());
          setCaptureNumber2(getCaptureNumber());
          setLoader(false);
          toast.warn("Ops.. Email or Password Incorrect");
        });
    });
  }, []);
  return (
    <>
      <ToastContainer />
      <Head>
        <title>Login</title>
      </Head>
      {isLogin && (
        <div className="isLoginMessage">
          <p>Please wait...</p>
        </div>
      )}
      <div className="er-container login-body-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 d-flex justify-content-center">
              <form
                method="post"
                className="w-max-content w-75 user-form"
                onSubmit={handleSubmit((data) => {
                  if (captureNumber1 + captureNumber2 == userCaptureNumber) {
                    UseLogin(data);
                  } else {
                    toast.info("Capture is incorrect");
                    setCaptureNumber1(getCaptureNumber());
                    setCaptureNumber2(getCaptureNumber());
                  }
                })}
              >
                <div className="erp-login-form position-relative p-4">
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
                  <div className="erp-login-header d-flex justify-content-center align-item-center">
                    <h5 className="erp-login-title text-light">PEWDESK</h5>
                    <div className="erp-logo">
                      <Image
                        width={200}
                        height={200}
                        className="img img-fluid"
                        src="/favicon.png"
                        alt="ERP"
                      />
                    </div>
                  </div>
                  <div className="erp-login-body pb-4">
                    <div className="container">
                      <div className="alert mt-3 d-none"></div>
                      <div className="form-group mt-3">
                        <div className="input-group">
                          <span className="input-group-text erp-input-group-text-dark text-light">
                            <i className="fas fa-user"></i>
                          </span>
                          <input
                            type="email"
                            className="form-control erp-input-dark text-light"
                            placeholder="Email"
                            {...register("email", { required: true })}
                          />
                        </div>
                        <div className="text-warning">
                          {errors.email?.type === "required" &&
                            "Email is required"}
                        </div>
                      </div>
                      <div className="form-group mt-3">
                        <div className="input-group">
                          <span className="input-group-text erp-input-group-text-dark text-light">
                            <i className="fas fa-lock"></i>
                          </span>
                          <input
                            type="password"
                            className="form-control erp-input-dark text-light"
                            placeholder="Password"
                            {...register("password", { required: true })}
                          />
                        </div>
                        <div className="text-warning">
                          {errors.password?.type === "required" &&
                            "Password is required"}
                        </div>
                      </div>
                      <div className="form-group mt-3">
                        <div className="form-check">
                          <input
                            className="form-check-input use-module"
                            type="checkbox"
                            id="remember"
                            {...register("remember")}
                          />
                          <label
                            className="form-check-label text-light"
                            htmlFor="remember"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      {/* start capture */}
                      <div className="form-group mt-3">
                        <div className="row">
                          {/* start capture number */}
                          <div className="col-lg-3 col-md-3 col-sm-3 d-flex justify-content-between align-items-center">
                            <p
                              style={{
                                fontSize: "25px",
                                fontFamily: "sans-serif",
                                color: "#a4a4a5",
                              }}
                            >
                              {captureNumber1}
                            </p>
                            <p
                              style={{
                                fontSize: "25px",
                                color: "#a4a4a5",
                              }}
                            >
                              +
                            </p>
                            <p
                              style={{
                                fontSize: "25px",
                                fontFamily: "sans-serif",
                                color: "#a4a4a5",
                              }}
                            >
                              {captureNumber2}
                            </p>
                          </div>
                          {/* end capture number */}
                          <div className="col-lg-3 col-md-3 col-sm-3">
                            <input
                              type="text"
                              className="form-control erp-input-dark text-light border-radius-2"
                              onChange={(e) =>
                                setUserCaptureNumber(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      {/* end capture */}
                      <div className="d-flex mt-4 justify-content-between">
                        <Link href="/register" className="text-light">
                          Signup Now ?
                        </Link>
                        {loader ? (
                          <Loader title="Login" />
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-success ps-lg-3 pe-lg-3 "
                            id="erp-btn-login"
                            style={{
                              background: "#00b5ec",
                              border: "1px solid #77ecff",
                              boxShadow: "0 5px 8px #ffffff61",
                            }}
                          >
                            Login
                          </button>
                        )}
                      </div>
                      <div className="form-group mt-lg-3">
                        <Link href="#" className="text-light">
                          Terms & conditions
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-4">
              <div className="erp-earth"></div>
              <p className="text-light">
                Wellcome to PEWDESK ERP system. World largest cloud base ERP
                system. Most secure, stable, supper first techlogy for your
                biggest medium organization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
