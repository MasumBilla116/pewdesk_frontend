import Link from "next/link";
import Image from "next/image";
import NavbarDropdownMenu from "./NavbarDropdownMenu";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Key from "../pages/api/AccessKey";
import { decrypt } from "n-krypta/dist/app";
import Router from "next/router";
import ImgLoader from "@/pages/api/Helper/ImgLoader";
import OrgId from "@/pages/api/Helper/OrgId";
import { ToastContainer } from "react-toastify";

export default function Header(props: any) {
  const { profileFile } = props;
  const [username, setUserName] = useState(String);
  const [login, setLogin] = useState(Boolean);
  // const [designation, setDegisnation] = useState(String);
  const [profile, setProfile] = useState(String);

  useEffect(() => {
    const VI = Cookies.get("VI");
    const VIL = Cookies.get("VIL");
    const SMPSA = Cookies.get("SMPSA");

    const decrypt_VI = decrypt(`${VI}`, `${Key()}`);
    const decrypt_VIL = decrypt(`${VIL}`, `${Key()}`);
    const decrypt_SMPSA = decrypt(`${SMPSA}`, `${Key()}`);

    // check login or not
    if (decrypt_VIL !== true && decrypt_SMPSA !== true) {
      Router.push("/");
    }

    setUserName(`${decrypt_VI.name}`);
    // setDegisnation(`${decrypt_VI.designation}`);
    setProfile(`${decrypt_VI.profile}`);
    setLogin(decrypt_VIL);
  }, [profileFile, profile]);
  console.warn(profile);
  return (
    <>
      <ToastContainer />
      <NavbarDropdownMenu profileFile={profileFile} />
      {/*<!-- BEGIN: Top menue -->*/}
      <header
        id="first-header"
        className="erp-header d-lg-flex d-xl-block d-lg-block d-md-block d-sm-none"
      >
        <div className="erp-header-right erp-bg-back">
          <nav className="navbar navbar-expand-sm">
            <div className="container-fluid">
              {/*<!-- Links -->*/}
              <div className="d-flex justify-content-between w-100">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <button
                      type="button"
                      className="menu-bars d-xl-none d-lg-none d-md-none d-sm-block"
                    >
                      <i className="fas fa fa-bars"></i>
                      <i className="fa-solid fa-times bars-times"></i>
                    </button>
                  </li>
                  <li className="nav-item me-1">
                    <Link
                      className="nav-link font-13 title-color null-menu"
                      href={`/dashboard?v=${OrgId()}`}
                    >
                      <i className="fa-solid fa-home me-2"></i>
                      <span className="home">Home</span>
                    </Link>
                  </li>
                </ul>
                {/*<!-- BEGIN: Top menue right -->*/}
                <div className="d-flex">
                  <div>
                    {/*<!-- <form action="search" method="post" className="form-group input-group">
                                <input className="form-control erp-input-dark title-color" type="search"
                                  name="search" id="search">
                                  <button type="submit"
                                    className="erp-input-dark ps-2 pe-2 search-btn title-color rounded-end"><i
                                      className="fa-solid fa-magnifying-glass"></i></button>
                              </form> -->*/}
                  </div>
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <button
                        type="button"
                        className="bg-transparent border-0 wfullscreen text-secondary ps-2 pe-2 nav-link  pe-3"
                      >
                        <i className="fa-solid fa-maximize"></i>
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#search-bar"
                        className="bg-transparent border-0 text-warning ps-2 pe-2 search-btn nav-link text-warning pe-3 erp-expand-btn"
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </li>
                    <li className="nav-item">
                      {/* cut the message  dropdown menu*/}
                      <button
                        type="button"
                        className="nav-link bg-transparent border-0 text-warning pe-3 erp-expand-btn position-relative"
                        data-target="#message-menu"
                      >
                        <i className="fa-solid fa-message"></i>
                        <span className="count-message bg-success bg-gradient pulse-green">
                          9+
                        </span>
                      </button>
                    </li>
                    <li className="nav-item position-relative">
                      {/* cut notification dropdown menu */}
                      <button
                        type="button"
                        className="nav-link bg-transparent border-0 text-warning pe-4 erp-expand-btn position-relative"
                        data-target="#notification-menu"
                      >
                        <i className="fa-solid fa-bell"></i>
                        <span className="count-message bg-danger bg-gradient pulse-red">
                          9+
                        </span>
                      </button>
                    </li>
                    <li className="nav-item position-relative">
                      {/* cut user message menu */}

                      <button
                        type="button"
                        className="nav-link bg-transparent border-0 p-0 position-relative"
                        data-target="#user-menu"
                      >
                        <span className="user-active"></span>

                        <Image
                          width={40}
                          height={40}
                          className="user-image img-fluid"
                          loader={() => ImgLoader(profile)}
                          src={`${process.env.BASE_LINK_URL}/${profile}`}
                          alt="User image"
                        />
                      </button>
                    </li>
                  </ul>
                </div>
                {/*<!-- END: Top menue right -->*/}
              </div>
            </div>
          </nav>
        </div>
      </header>
      <header
        id="secondary-header"
        className="erp-header d-lg-flex d-xl-block d-lg-block d-md-block d-sm-none"
      >
        <div className="erp-header-right erp-bg-back">
          <nav className="navbar navbar-expand-sm">
            <div className="container-fluid">
              {/*<!-- Links -->*/}
              <div className="d-flex justify-content-between w-100">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <button
                      type="button"
                      className="menu-bars d-xl-none d-lg-none d-md-none d-sm-block"
                    >
                      <i className="fas fa fa-bars"></i>
                      <i className="fa-solid fa-times bars-times"></i>
                    </button>
                  </li>
                  <li className="nav-item me-1">
                    <Link
                      className="nav-link font-13 title-color"
                      href={`/dashboard?v=${OrgId()}`}
                    >
                      <i className="fa-solid fa-home me-2"></i>
                      <span className="home">Home</span>
                    </Link>
                  </li>
                </ul>
                {/*<!-- BEGIN: Top menue right -->*/}
                <div className="d-flex">
                  <div>
                    {/*<!-- <form action="search" method="post" className="form-group input-group">
                                <input className="form-control erp-input-dark title-color" type="search"
                                  name="search" id="search">
                                  <button type="submit"
                                    className="erp-input-dark ps-2 pe-2 search-btn title-color rounded-end"><i
                                      className="fa-solid fa-magnifying-glass"></i></button>
                              </form> -->*/}
                  </div>
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <button
                        type="button"
                        className="bg-transparent border-0 wfullscreen text-secondary ps-2 pe-2 nav-link  pe-3"
                      >
                        <i className="fa-solid fa-maximize"></i>
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#search-bar"
                        className="bg-transparent border-0 text-warning ps-2 pe-2 search-btn nav-link text-warning pe-3 erp-expand-btn"
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </li>
                    <li className="nav-item">
                      {/* cut the message  dropdown menu*/}
                      <button
                        type="button"
                        className="nav-link bg-transparent border-0 text-warning pe-3 erp-expand-btn position-relative"
                        data-target="#message-menu"
                      >
                        <i className="fa-solid fa-message"></i>
                        <span className="count-message bg-success bg-gradient pulse-green">
                          9+
                        </span>
                      </button>
                    </li>
                    <li className="nav-item position-relative">
                      {/* cut notification dropdown menu */}
                      <button
                        type="button"
                        className="nav-link bg-transparent border-0 text-warning pe-4 erp-expand-btn position-relative"
                        data-target="#notification-menu"
                      >
                        <i className="fa-solid fa-bell"></i>
                        <span className="count-message bg-danger bg-gradient pulse-red">
                          9+
                        </span>
                      </button>
                    </li>
                    <li className="nav-item position-relative">
                      {/* cut user message menu */}

                      <button
                        type="button"
                        className="nav-link bg-transparent border-0 p-0 position-relative"
                        data-target="#user-menu"
                      >
                        <span className="user-active"></span>
                        <Image
                          width={40}
                          height={40}
                          className="user-image img-fluid"
                          loader={() => ImgLoader(profile)}
                          src={`${process.env.BASE_LINK_URL}/${profile}`}
                          alt="User image"
                        />
                      </button>
                    </li>
                  </ul>
                </div>
                {/*<!-- END: Top menue right -->*/}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/*<!-- END: Top menue -->*/}
    </>
  );
}
