import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Key from "../pages/api/AccessKey";
import ModuleFa from "./ModuleFa";
import ModuleCRM from "./ModuleCRM";
import ModuleECM from "./ModuleECM";
import ModuleIVM from "./ModuleIVM";
import ModuleODM from "./ModuleODM";
import ModuleHCM from "./ModuleHCM";
import ModuleSM from "./ModuleSM";
import { decrypt } from "n-krypta";
import ModuleEMP from "./ModuleEMP";
import ModuleAttendance from "./ModuleAttendance";
import OrgId from "@/pages/api/Helper/OrgId";

export default function Aside() {
  const [remainningDay, setRemainningDay] = useState(1);
  const [version, setVersion] = useState("null");
  const [useModuleFA, setUseModuleFa] = useState("1");
  const [useModuleCRM, setUseModuleCRM] = useState("1");
  const [useModuleECM, setUseModuleECM] = useState("1");
  const [useModuleIVM, setUseModuleIVM] = useState("1");
  const [useModuleODM, setUseModuleODM] = useState("1");
  const [useModuleHCM, setUseModuleHCM] = useState("1");
  const [useModuleSM, setUseModuleSM] = useState("1");

  const [accessPermissionFA, setAccessPermissionFA] = useState("1");
  const [accessPermissionCRM, setAccessPermissionCRM] = useState("1");
  const [accessPermissionECM, setAccessPermissionECM] = useState("1");
  const [accessPermissionIVM, setAccessPermissionIVM] = useState("1");
  const [accessPermissionODM, setAccessPermissionODM] = useState("1");
  const [accessPermissionHCM, setAccessPermissionHCM] = useState("1");
  const [accessPermissionSM, setAccessPermissionSM] = useState("1");

  const [superAdmin, setSuperAdmin] = useState("0");
  const [admin, setAdmin] = useState("0");
  const [reader, setReader] = useState("0");
  const [creator, setCreator] = useState("0");
  const [monitor, setMonitor] = useState("0");
  const [employee, setEmployee] = useState("1");
  const [userName, setUserName] = useState(String);
  useEffect(() => {
    /**
     * --------------------------------------
     * -- get Data from cookies --
     * ---------------------------------------
     */
    const SMPS = Cookies.get("SMPS");
    const SMPSA = Cookies.get("SMPSA");
    const PD_SV = Cookies.get("PD_SV");
    const IMA = Cookies.get("IMA");
    const VI = Cookies.get("VI");

    /**
     * ------------------------------------------
     * --------- decrypt uses data --------------
     * ------------------------------------------
     */
    const decrypt_SMPS = decrypt(`${SMPS}`, `${Key()}`);
    const decrypt_SMPSA = decrypt(`${SMPSA}`, `${Key()}`);
    const decrypt_PD_SV = decrypt(`${PD_SV}`, `${Key()}`);
    const decrypt_IMA = decrypt(`${IMA}`, `${Key()}`);
    const decrypt_VI = decrypt(`${VI}`, `${Key()}`);

    setRemainningDay(decrypt_PD_SV.remaining_day);

    setSuperAdmin(`${decrypt_IMA.roleSuperAdmin}`);
    setAdmin(`${decrypt_IMA.roleAdmin}`);
    setReader(`${decrypt_IMA.roleReader}`);
    setCreator(`${decrypt_IMA.roleCreator}`);
    setMonitor(`${decrypt_IMA.roleMonitor}`);
    setEmployee(`${decrypt_IMA.roleEmployee}`);
    setUserName(`${decrypt_VI.name}`);

    if (decrypt_IMA) {
      // IMA Identity Module Access
      setAccessPermissionFA(`${decrypt_IMA.rolePermissionFA}`);
      setAccessPermissionCRM(`${decrypt_IMA.rolePermissionCRM}`);
      setAccessPermissionECM(`${decrypt_IMA.rolePermissionECM}`);
      setAccessPermissionIVM(`${decrypt_IMA.rolePermissionIVM}`);
      setAccessPermissionODM(`${decrypt_IMA.rolePermissionODM}`);
      setAccessPermissionHCM(`${decrypt_IMA.rolePermissionHCM}`);
      setAccessPermissionSM(`${decrypt_IMA.rolePermissionSM}`);
    }

    if (decrypt_SMPSA) {
      // SMPSA  Software Module Positions Access
      setVersion(`${decrypt_PD_SV.version}`);
      setUseModuleFa(`${decrypt_SMPS.moduleFA}`);
      setUseModuleCRM(`${decrypt_SMPS.moduleCRM}`);
      setUseModuleECM(`${decrypt_SMPS.moduleECM}`);
      setUseModuleIVM(`${decrypt_SMPS.moduleIVM}`);
      setUseModuleODM(`${decrypt_SMPS.moduleODM}`);
      setUseModuleHCM(`${decrypt_SMPS.moduleHCM}`);
      setUseModuleSM(`${decrypt_SMPS.moduleSM}`);
    }
  }, []);

  var versionComponent;
  if (version === "1") {
    versionComponent = (
      <div className="d-flex justify-content-center align-item-center mb-3">
        <i className="fas fa fa-project-diagram mt-3 text-success"></i>
        <div className="mt-3 ms-1 text-success">Beta</div>
      </div>
    );
  } else if (version === "2") {
    versionComponent = (
      <div className="d-flex justify-content-center align-item-center mb-3 text-success">
        {/* <Image
            width={60}
            height={50}
            className="premium-diamond m-0 mb-2"
            src="/theme_icon/diamond.png"
            alt="premium"
          /> */}
        <i className="fas fa-chess-queen mt-3 me-1"></i>
        <div className="mt-3 ms-1">Premium </div>
      </div>
    );
  } else if (version === "3") {
    versionComponent = (
      <div className="d-flex justify-content-center align-item-center mb-3 text-warning">
        <i className="fas fa fa-tachometer-alt mt-3 me-1"></i>
        <div className="mt-3 ms-1">Trial</div>
      </div>
    );
  }

  return (
    <>
      {/* start payment title */}
      {version !== "1" && remainningDay <= 0 && (
        <div className="payment-wraper">
          <div className="go-to-payment-premium ">
            <h3 className="text-light text-bold">Payment First</h3>
            <Link href="/payment" className="btn btn-primary ">
              Payment
              <i className="fas fa fa-hand-point-left ms-4"></i>
            </Link>
          </div>
        </div>
      )}

      {/* end payment title */}
      {/*<!-- BEGIN: menu left -->*/}

      <aside className="erp-aside erp-bg-back title-color ps-sm-4 pe-sm-4 p-xl-0 p-lg-0 p-md-0">
        <div className="aside-fixd">
          <div className="erp-header-left ps-lg-3 mb-1 d-sm-flex justify-content-between align-items-center position-relative">
            <button
              type="button"
              className="aside-expand-less position-absolute rounded-circle erp-expand-btn aside-expand"
            >
              <i className="fa-solid fa-angle-left"></i>
            </button>
            <Link href={`/dashboard?v=${OrgId()}`} className="null-menu">
              <Image
                width={40}
                height={40}
                src={"/favicon.png"}
                className="rounded"
                alt="FALCON ERP"
              />
            </Link>
            <div className="d-xl-none d-lg-none d-md-none d-sm-block">
              <form
                action="search"
                method="post"
                className="form-group input-group"
              >
                <input
                  className="form-control erp-input-dark title-color"
                  type="search"
                  name="search"
                  id="search"
                />
                <button
                  type="submit"
                  className="erp-input-dark title-color rounded-end"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
            </div>
            <button
              type="button"
              className="menu-bars d-xl-none d-lg-none d-md-none d-sm-block"
            >
              <i className="fas fa fa-bars"></i>
              <i className="fa-solid fa-times bars-times"></i>
            </button>
          </div>
          <div className="container-fluid p-0 d-sm-none d-md-block d-lg-block d-xl-block erp-aside-menue-toggle">
            <div className="d-flex w-100 justify-content-end">
              <button type="button" className="close-btn">
                <i className="fa-solid fa-times bars-times"></i>
              </button>
            </div>
            <hr className="hr-devider-aside" />
            <div className="erp-aside-menue list-group list-group-flush">
              {/*<!-- start attendance -->*/}
              {/* {((useModuleCRM === "1" && accessPermissionCRM === "1") ||
                (useModuleHCM === "1" && accessPermissionHCM === "1")) && (
                <ModuleAttendance />
              )} */}
              {/*<!-- end attendance -->*/}
              {/* start employee module */}
              {((useModuleCRM === "1" && accessPermissionCRM === "1") ||
                (useModuleHCM === "1" && accessPermissionHCM === "1")) && (
                <ModuleEMP />
              )}
              {superAdmin !== "1" &&
                admin !== "1" &&
                creator !== "1" &&
                reader !== "1" &&
                monitor !== "1" &&
                employee === "1" && <ModuleEMP />}
              {/* end employee module */}

              {/* start fa module */}
              {useModuleFA === "1" && accessPermissionFA === "1" && (
                <ModuleFa />
              )}
              {/* end fa module */}
              {/* start crm module */}
              {useModuleCRM === "1" && accessPermissionCRM === "1" && (
                <ModuleCRM />
              )}
              {/* end crm module */}
              {/* start ecm module*/}
              {useModuleECM === "1" && accessPermissionECM === "1" && (
                <ModuleECM />
              )}
              {/* end ecm module */}
              {/* start ivm module */}
              {useModuleIVM === "1" && accessPermissionIVM === "1" && (
                <ModuleIVM />
              )}
              {/* end ivm module */}
              {/* start odm module */}
              {useModuleODM === "1" && accessPermissionODM === "1" && (
                <ModuleODM />
              )}
              {/* end odm module */}
              {/*<!-- start hcm module -->*/}
              {useModuleHCM === "1" && accessPermissionHCM === "1" && (
                <ModuleHCM />
              )}
              {/* end hcm module */}
              {/*<!-- start sm module -->*/}
              {/* <ModuleSM /> */}
              {/* end sm module */}
              {/*<!-- end aside menu -->*/}
            </div>
            {/*<!-- start extra menu in aside -->*/}
            <div className="p-4 mt-3 mb-4 aside-extra-menu-lg d-block">
              {versionComponent}
              {superAdmin === "1" && (
                <Link
                  href={`/settings?v=${OrgId()}`}
                  className="btn   setting-btn mb-4 w-100 "
                >
                  <i className="fas fa fa-cog cog me-1"></i>
                  Setting
                </Link>
              )}
              <h6 className="text-center text-caption text-shadow-none text-warning">
                PewDesk
              </h6>
              <hr className="bg-light" />
              <div className="bg-black pt-1 rounded">
                <h6 className="text-center text-capitalize">{userName}</h6>
                <p className="text-success text-center">
                  {superAdmin === "1" && "Super Admin"}
                  {admin === "1" && "Admin"}
                  {reader === "1" && "Reader"}
                  {creator === "1" && "Creator"}
                  {monitor === "1" && "Monitor"}
                  {employee === "1" && "Employee"}
                </p>
                {version !== "1" && (
                  <p className="text-secondary text-center">
                    Remaining Day : {remainningDay}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-3 mb-4 aside-extra-menu-expand d-none">
              {versionComponent}
              {superAdmin === "1" && (
                <Link
                  href={`/settings?v=${OrgId()}`}
                  className="btn   mb-4 rounded-0 btn-sm w-100 setting-btn"
                >
                  <i className="fas fa fa-cog cog me-1"></i>
                  Setting
                </Link>
              )}
              <h6 className="text-center text-shadow-none text-warning">
                PewDesk
              </h6>
              <hr className="bg-light" />
              <div className="bg-black pt-1 rounded">
                <h6 className="text-center text-capitalize">{userName}</h6>
                <p className="text-success text-center">
                  {superAdmin === "1" && "Super Admin"}
                  {admin === "1" && "Admin"}
                  {reader === "1" && "Reader"}
                  {creator === "1" && "Creator"}
                  {monitor === "1" && "Monitor"}
                  {employee === "1" && "Employee"}
                </p>
                {version !== "1" && (
                  <p className="text-secondary text-center">
                    R.D : {remainningDay}
                  </p>
                )}
              </div>
            </div>
            {/*<!-- end extra menu in aside -->*/}
          </div>
        </div>
      </aside>
      {/*<!-- END: menue left -->*/}
    </>
  );
}
