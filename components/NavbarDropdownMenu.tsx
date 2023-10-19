import Link from "next/link";
import Image from "next/image";
import { memo, useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Key from "../pages/api/AccessKey";
import { decrypt, encrypt } from "n-krypta/dist/app";
import Router from "next/router";
import ImgLoader from "@/pages/api/Helper/ImgLoader";
import OrgId from "@/pages/api/Helper/OrgId";
import AccessKey from "../pages/api/AccessKey";
import { toast } from "react-toastify";

export default function NavbarDropdownMenu(props: any) {
  const { profileFile } = props;

  /**
   * -------------------------------------------
   * ---- Start Module Access Permissions ------
   * -------------------------------------------
   */
  // const [roleReader, setRoleReader] = useState(0);
  // const [roleCreator, setRoleCreator] = useState(0);
  // const [roleMonitor, setRoleMonitor] = useState(0);
  // const [roleAdmin, setRoleAdmin] = useState(0);
  const [roleSuperAdmin, setRoleSuperAdmin] = useState(0);
  useEffect(() => {
    const IMA = Cookies.get("IMA");
    const decrypt_IMA = decrypt(`${IMA}`, `${AccessKey()}`);
    // IMA Identity Module Access permission
    // setRoleReader(decrypt_IMA.roleReader);
    // setRoleCreator(decrypt_IMA.roleCreator);
    // setRoleMonitor(decrypt_IMA.roleMonitor);
    // setRoleAdmin(decrypt_IMA.roleAdmin);
    setRoleSuperAdmin(decrypt_IMA.roleSuperAdmin);
  }, [roleSuperAdmin]);
  /**
   * -------------------------------------------
   * ---- Start Module Access Permissions ------
   * -------------------------------------------
   */

  const [profile, setProfile] = useState(String);
  const [username, setUserName] = useState(String);
  const [login, setLogin] = useState(Boolean);
  const [superAdmin, setSuperAdmin] = useState("0");
  const [admin, setAdmin] = useState("0");
  const [employee, setEmployee] = useState("0");
  const [reader, setReader] = useState("0");
  const [creator, setCreator] = useState("0");
  const [monitor, setMonitor] = useState("0");
  const [userRemember, setUserRemember] = useState();
  const [orgid, setOrgId] = useState(null);

  useEffect(() => {
    setOrgId(OrgId());
  }, []);

  useEffect(() => {
    const VI = Cookies.get("VI");
    const VIL = Cookies.get("VIL");
    const IMA = Cookies.get("IMA");
    const VILS = Cookies.get("NILS");

    const decrypt_VI = decrypt(`${VI}`, `${Key()}`);
    const decrypt_VIL = decrypt(`${VIL}`, `${Key()}`);
    const decrypt_IMA = decrypt(`${IMA}`, `${Key()}`);
    const decrypt_VILS = decrypt(`${VILS}`, `${Key()}`);

    setUserRemember(decrypt_VILS.remember);

    setSuperAdmin(`${decrypt_IMA.roleSuperAdmin}`);
    setAdmin(`${decrypt_IMA.roleAdmin}`);
    setEmployee(`${decrypt_IMA.roleEmployee}`);

    setReader(`${decrypt_IMA.roleReader}`);
    setMonitor(`${decrypt_IMA.roleMonitor}`);
    setCreator(`${decrypt_IMA.roleCreator}`);

    setLogin(decrypt_VIL);
    setProfile(`${decrypt_VI.profile}`);
    setUserName(`${decrypt_VI.name}`);
  }, [profileFile, profile]);

  const Logout = useCallback(() => {
    toast.warn("Your are logout");
    setTimeout(() => {
      const SMPSA = false; // software module positions access
      const VIL = false; // viewer information live
      Cookies.set("SMPSA", encrypt(SMPSA, `${Key()}`), {
        expires: 365,
      });
      Cookies.set("VIL", encrypt(VIL, `${Key()}`), { expires: 365 });
      Router.push("/");
    }, 1000);
  }, []);

  return (
    <>
      {/* start message dropdown menu */}
      <div id="message-menu" className="dropdown-message  position-absolute">
        <ul>
          <li>
            <Link className="null-menu" href="/messages">
              <div className="row p-0 m-0">
                <div className="col-lg-3 d-flex justify-content-center align-items-center">
                  <Image
                    width={40}
                    height={40}
                    src="/images/user-300x300.jpg"
                    className="img-fluid text-center"
                    alt="users"
                  />
                </div>
                <div className="col-lg-9">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing
                    elit.......
                  </p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link className="null-menu" href="/messages">
              <div className="row p-0 m-0">
                <div className="col-lg-3 d-flex justify-content-center align-items-center">
                  <Image
                    width={40}
                    height={40}
                    src="/images/user-300x300.jpg"
                    className="img-fluid text-center"
                    alt="users"
                  />
                </div>
                <div className="col-lg-9">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing
                    elit.......
                  </p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link className="null-menu" href="/messages">
              <div className="row p-0 m-0">
                <div className="col-lg-3 d-flex justify-content-center align-items-center">
                  <Image
                    width={40}
                    height={40}
                    src="/images/user-300x300.jpg"
                    className="img-fluid text-center"
                    alt="users"
                  />
                </div>
                <div className="col-lg-9">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing
                    elit.......
                  </p>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      {/* end message dropdown menu */}
      {/* start notification dropdown menu */}
      <div
        id="notification-menu"
        className="dropdown-message  position-absolute"
      >
        <ul>
          <li>
            <Link className="null-menu" href="/messages">
              <div className="row p-0 m-0">
                <div className="col-lg-3 d-flex justify-content-center align-items-center">
                  <Image
                    width={40}
                    height={40}
                    src="/images/user-300x300.jpg"
                    className="img-fluid text-center"
                    alt="users"
                  />
                </div>
                <div className="col-lg-9">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing
                    elit.......
                  </p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link className="null-menu" href="/messages">
              <div className="row p-0 m-0">
                <div className="col-lg-3 d-flex justify-content-center align-items-center">
                  <Image
                    width={40}
                    height={50}
                    src="/images/user-300x300.jpg"
                    className="img-fluid text-center"
                    alt="users"
                  />
                </div>
                <div className="col-lg-9">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing
                    elit.......
                  </p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link className="null-menu" href="/messages">
              <div className="row p-0 m-0">
                <div className="col-lg-3 d-flex justify-content-center align-items-center">
                  <Image
                    width={40}
                    height={40}
                    src="/images/user-300x300.jpg"
                    className="img-fluid text-center"
                    alt="users"
                  />
                </div>
                <div className="col-lg-9">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing
                    elit.......
                  </p>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      {/* end notification dropdown menu */}

      {/* start user message menu  */}
      <div id="user-menu" className="dropdown-message  position-absolute">
        <div className="user-feadback">
          <Link className="null-menu" href="/feedback">
            Feadback
          </Link>
        </div>
        <div className="pt-2 ps-2 d-flex justify-content-start align-content-center">
          <Image
            width={40}
            height={40}
            className="user-image img-fluid"
            loader={() => ImgLoader(profile)}
            src={`${process.env.BASE_LINK_URL}/${profile}`}
            alt="User image"
          />

          <h5 className="font-monospace ms-2">
            <strong>{username}</strong>
            <br />
            <i className="font-13 text-capitalize">
              {superAdmin === "1" && "Super Admin"}
              {admin === "1" && "Admin"}
              {reader === "1" && "Reader"}
              {creator === "1" && "Creator"}
              {monitor === "1" && "Monitor"}
              {employee === "1" && "Employee"}
            </i>
          </h5>
        </div>
        <ul>
          {login ? (
            <li>
              <Link href="#" role="button" onClick={() => Logout()}>
                <i className="fa fa-sign-out me-1" aria-hidden="true"></i>
                Sign-Out
              </Link>
            </li>
          ) : (
            <li>
              <Link className="null-menu" href="/login">
                <i className="fa fa-sign-in me-1" aria-hidden="true"></i>
                Sign-In
              </Link>
            </li>
          )}
          <li>
            <Link className="null-menu" href={`/profile?v=${orgid}`}>
              <i className="fas fa fa-user me-1"></i>
              Profile
            </Link>
          </li>
          <li>
            <Link className="null-menu" href={`/team?v=${orgid}`}>
              <i className="fas fa fa-users me-1"></i>
              Manage Team
            </Link>
          </li>
          {roleSuperAdmin === 1 && (
            <li>
              <Link className="null-menu" href={`/settings?v=${orgid}`}>
                <i className="fas fa fa-cog me-1"></i>
                Setting
              </Link>
            </li>
          )}
        </ul>
      </div>
      {/* end user message menu  */}
    </>
  );
}
 
