import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Aside from "../components/Aside";
import ToggleOption from "../components/ToggleOption";
import Footer from "../components/Footer";
import JqueryMin from "./load_js/plugin/jquery.min.js";
import AsidejQuery from "./load_js/controllers/AsidejQuery";
import FullScreenMode from "./load_js/controllers/FullScreenMode";
import PrintMin from "./load_js/controllers/PrintMin";
import JqueryUiMin from "./load_js/plugin/JqueryUiMin";
import DraggElements from "./load_js/controllers/DraggElements";
import PickDate from "./load_js/controllers/PickDate";
import ImagePreview from "./load_js/controllers/ImagePreview";
import { useForm } from "react-hook-form";
import { memo, useCallback, useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import OrgId from "./api/Helper/OrgId";
import UserEmail from "./api/Helper/UserEmail";
import AccessKey from "./api/AccessKey";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "n-krypta";
import $ from "jquery";
import ImgLoader from "./api/Helper/ImgLoader";
import { toast } from "react-toastify";

export default function Profile() {
  const {
    register: UpdateProfileRegister,
    handleSubmit: UpdateProfileHandleSubmit,
    formState: { errors: UpdateProfileErrors },
  } = useForm();

  const {
    register: UpdatePasswordRegister,
    handleSubmit: UpdatePasswordHandleSubmit,
    formState: { errors: UpdatePasswordErrors },
  } = useForm();

  const {
    register: UpdateNameRegister,
    handleSubmit: UpdateNameHandleSubmit,
    formState: { errors: UpdateNameErrors },
  } = useForm();

  const [profileLoader, setProfileLoader] = useState(false);
  const [passwordLoader, setPasswordLoader] = useState(false);
  const [nameLoader, setNameLoader] = useState(false);
  const [profileFile, setProfileFile] = useState(String);

  useEffect(() => {
    const VI = Cookies.get("VI");
    const decrypt_VI = decrypt(`${VI}`, `${AccessKey()}`);
    setProfileFile(`${decrypt_VI.profile}`);
  }, [profileFile, profileLoader, passwordLoader, nameLoader]);

  const UpdateProfile = useCallback(async (formData: any) => {
    setProfileLoader(true);
    axios.get("sanctum/csrf-cookie").then((res) => {
      axios
        .post(`${process.env.BASE_URL}/update/user/profile`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setProfileLoader(false);
          console.warn(res.data);
          if (res.data.success === 200) {
            toast.success("Profile Updated Successfully");
            setProfileFile(res.data.data.profile);
            const VI = {
              // viewer information
              name: res.data.data.name,
              profile: res.data.data.profile,
            };
            Cookies.set("VI", encrypt(VI, `${AccessKey()}`), { expires: 365 });
            $("form").trigger("reset");
          }

          if (res.data.error === 500) {
            toast.warn("Something is worng try again");
          }
        })
        .catch((error) => {
          setProfileLoader(false);
          toast.warn("Something is worng try again");
        });
    });
  }, []);

  const PasswordUpdate = useCallback(async (formData: any) => {
    setPasswordLoader(true);
    axios.get("sanctum/csrf-cookie").then((res) => {
      axios
        .post(`${process.env.BASE_URL}/update/user/password`, formData)
        .then((res) => {
          setPasswordLoader(false);
          if (res.data.pass_not_match) {
            toast.info("Old Password is not matching");
            return;
          }
          if (res.data.error === 500) {
            toast.warn("Something is worng try again");
            return;
          }
          if (res.data.success === 200) {
            toast.success("Password update succesfull");
            $("form").trigger("reset");
          }
        })
        .catch((error) => {
          setPasswordLoader(false);
          toast.warn("Something is worng try again");
        });
    });
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Profile</title>
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
                <Header profileFile={profileFile} />
                {/* end header */}
                {/*<!-- start your code -->*/}
                <div className="container-fluid pt-3 pb-3 dashboard-content">
                  {/* <!-- start  code --> */}
                  {/*<!--start update profile -->*/}
                  <div className="container mt-5 mb-5 p-0">
                    <div className="row  ">
                      <div className="col-xxl-5 col-xl-5 col-lg-4 col-md-3 col-sm-0"></div>
                      <div
                        className="col-xxl-7 col-xl-7 col-lg-8 col-md-9 col-sm-12 bg-black rounded pt-4 pb-4 border-double-7"
                        data-aos="zoom-in"
                        data-aos-duration="1000"
                      >
                        <form
                          onSubmit={UpdateProfileHandleSubmit((data) =>
                            UpdateProfile(data)
                          )}
                          encType={"multipart/form-data"}
                        >
                          <h4>
                            <strong>Update Profile</strong>
                          </h4>
                          <hr />
                          <div className="row">
                            <div className="col-lg-3">
                              <Image
                                width={300}
                                height={150}
                                loader={() => ImgLoader(profileFile)}
                                src={`${process.env.BASE_LINK_URL}/${profileFile}`}
                                alt="User Image"
                                className="rounded-circle profile-img"
                                id="profile_img"
                              />
                            </div>
                            <div className="col-lg-9 d-flex justify-content-center align-items-center">
                              <div className="w-100">
                                <p className="d-block">
                                  Upload your profile photos
                                </p>
                                <hr />
                                <div className="input-group">
                                  <input
                                    type="file"
                                    className="input-flash form-control reader bg-dark text-light"
                                    data-view="#profile_img"
                                    {...UpdateProfileRegister("profile", {
                                      required: true,
                                    })}
                                  />
                                </div>
                                <div className="text-danger">
                                  {UpdateProfileErrors.profile?.type ===
                                    "required" && "File is required"}
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr />
                          <input
                            type="hidden"
                            {...UpdateProfileRegister("orgid")}
                            value={OrgId()}
                          />
                          <input
                            type="hidden"
                            {...UpdateProfileRegister("email")}
                            value={UserEmail()}
                          />
                          {profileLoader ? (
                            <div className="float-end">
                              <Loader title="SAVE" />
                            </div>
                          ) : (
                            <button
                              type="submit"
                              className="btn btn-success float-end shadow"
                            >
                              SAVE
                            </button>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                  <hr />
                  {/*<!--end update profile -->*/}
                  {/*<!--start update password -->*/}
                  <div className="container mt-5 mb-5 p-0">
                    <div className="row  ">
                      <div
                        className="col-xxl-7 col-xl-7 col-lg-8 col-md-9 col-sm-12  bg-black rounded pt-4 pb-4 border-double-7"
                        data-aos="fade-right"
                        data-aos-duration="1000"
                      >
                        <form
                          onSubmit={UpdatePasswordHandleSubmit((data) =>
                            PasswordUpdate(data)
                          )}
                        >
                          <h4>
                            <strong>Change Password</strong>
                          </h4>
                          <hr />
                          <div className="row">
                            <div className="col-lg-9 d-flex justify-content-center align-items-center">
                              <div className="w-100">
                                <input
                                  type="hidden"
                                  value={UserEmail()}
                                  {...UpdatePasswordRegister("email")}
                                  className="form-control ps-0 mb-3"
                                />
                                <div className="form-group mb-4">
                                  <label htmlFor="old-password">
                                    Old Password
                                  </label>
                                  <input
                                    id="old-password"
                                    type="password"
                                    placeholder="Enter your old password"
                                    className="form-control bg-dark text-light"
                                    {...UpdatePasswordRegister("old_pass", {
                                      required: true,
                                    })}
                                  />
                                  <div className="text-warning">
                                    {UpdatePasswordErrors.old_pass?.type ===
                                      "required" && "Old password is required"}
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="old-password">
                                    New Password
                                  </label>
                                  <input
                                    id="new_password"
                                    type="password"
                                    placeholder="Enter your new password"
                                    className="form-control bg-dark text-light"
                                    {...UpdatePasswordRegister("new_pass", {
                                      required: true,
                                      minLength: 6,
                                    })}
                                  />
                                  <div className="text-warning">
                                    {UpdatePasswordErrors.new_pass?.type ===
                                      "required" && "New password is required"}
                                    {UpdatePasswordErrors.new_pass?.type ===
                                      "minLength" &&
                                      "Minimum Length 6 charecters"}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3"> </div>
                          </div>
                          <hr />
                          {passwordLoader ? (
                            <div className="float-end">
                              <Loader title="SAVE" />
                            </div>
                          ) : (
                            <button
                              type="submit"
                              className="btn btn-success float-end shadow"
                            >
                              SAVE
                            </button>
                          )}
                        </form>
                      </div>
                      <div className="col-xxl-5 col-xl-5 col-lg-4 col-md-3 col-sm-0"></div>
                    </div>
                  </div>
                  {/*<!--end update password -->*/}

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

      {/* start jquery */}
      <JqueryMin />
      <AsidejQuery />
      <FullScreenMode />
      <PrintMin />
      <JqueryUiMin />
      <DraggElements />
      <PickDate />
      <ImagePreview />

      {/* end jquery */}
    </>
  );
}
