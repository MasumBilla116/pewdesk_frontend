import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
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
import Loader from "@/components/Loader";
import OrgId from "./../api/Helper/OrgId";
import FetchData from "./../api/Helper/FetchData";
import PaginateData from "./../api/Helper/PaginateData";
import PagingLink from "@/components/PagingLink";
import StoreItem from "./../api/Helper/StoreItem";
import UpdateItem from "./../api/Helper/UpdateItem";
import DeleteItem from "./../api/Helper/DeleteItem";
import ActionBtn from "@/components/ActionBtn";
import OrgName from "../api/Helper/OrgName";
import GetFullYear from "../api/Helper/GetFullYear";
import GetMonthName from "../api/Helper/GetMonthName";
import AddModalTableBtn from "@/components/AddModalTableBtn";
import { decrypt } from "n-krypta";
import AccessKey from "./../../pages/api/AccessKey";
import Cookies from "js-cookie";

export default function ProvidentFund(props: any) {
  const { fundData, orgname } = props;

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
  const [fundPaginateInfo, setFundPaginateInfo] = useState(fundData);
  const [paginateUrl, setPaginateUrl] = useState(fundData?.links[1]?.url);
  const [checkEmployee, setCheckEmployee] = useState("");
  const [checkSign, setCheckSign] = useState(false);
  const [totalEmpShare, setTotalEmpShare] = useState(0);
  const [totalOrgShare, setTotalOrgShare] = useState(0);

  //   console.log(fundPaginateInfo);

  const FetchPaginateInfo = async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setFundPaginateInfo(res);
    }
  };

  const orgid = OrgId();
  const CheckEmpId = async () => {
    var id = $("#add-emp_id").val();
    const res = await fetch(
      `${process.env.BASE_URL}/check/hcm/employee-id/${orgid}/${id}`
    );
    const data = await res.json();
    if (data.success === 200) {
      setCheckSign(true);
      setCheckEmployee(data.data.name);
    } else {
      setCheckSign(false);
      setCheckEmployee("");
    }
  };

  useEffect(() => {
    var org_share = 0;
    var emp_share = 0;
    fundPaginateInfo?.data?.map((data: any) => {
      org_share += data.organization_share;
      emp_share += data.emp_share;
    });
    setTotalEmpShare(emp_share);
    setTotalOrgShare(org_share);
    setCheckSign(false);
  }, [totalEmpShare, totalOrgShare, paginateUrl, fundData, fundPaginateInfo]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const UpdateInfo = async (target: any) => {
    const data = $(`#${target}`).serializeArray();
    // console.warn(data);

    const formData = JSON.stringify({
      emp_id: data[0].value,
      assign_to: data[1].value,
      fund_type: data[2].value,
      emp_share: data[3].value,
      org_share: data[4].value,
      share_date: data[5].value,
      end_date: data[6].value,
      orgid: data[7].value,
      id: data[8].value,
      status: data[9].value,
    });
    UpdateItem(
      "/update/hcm/provident/fund/info",
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
        <title>HCM | Provident Fund</title>
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
                  <div className="table-responsive">
                    {/*<!-- start table btn group -->*/}
                    {(roleSuperAdmin === 1 ||
                      roleAdmin === 1 ||
                      roleCreator === 1) && <AddModalTableBtn />}
                    {/*<!-- end table btn group -->*/}

                    <table
                      id="printable"
                      className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark"
                    >
                      <caption>Provident Fund Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={10}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Provident Fund</b>
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
                          <th scope="col">S.I</th>
                          <th scope="col">Employee ID</th>
                          <th scope="col">Employee Name</th>
                          <th scope="col">Provident Fund Type</th>
                          <th scope="col">Employee Share</th>
                          <th scope="col">Organization Share</th>
                          <th scope="col"> Status </th>
                          {(roleSuperAdmin === 1 ||
                            roleAdmin === 1 ||
                            roleCreator === 1) && <th scope="col"> Action </th>}
                        </tr>
                      </thead>
                      <tbody>
                        {fundPaginateInfo?.data?.map(
                          (data: any, index: any) => (
                            <tr key={data.hcm_provident_found_id}>
                              <td className="debit  ">{index + 1}</td>
                              <td className="debit  ">
                                {data.emp_id + process.env.EMP_ID}
                              </td>
                              <td className="debit text-danger text-start">
                                {data.name}
                              </td>
                              <td className="credit text-light text-end">
                                {data.provident_fund_type}
                              </td>
                              <td className="credit text-success text-end">
                                {data.emp_share}
                                <span className="text-secondary">%</span>
                              </td>
                              <td className="credit text-success text-end">
                                {data.organization_share}
                                <span className="text-secondary">%</span>
                              </td>
                              <td className="credit text-success text-center">
                                <span
                                  className={`badge rounded 
                                    ${
                                      data.status === "approved" && "bg-success"
                                    }
                                    ${
                                      data.status === "in-process" &&
                                      "bg-danger"
                                    }
                                    ${data.status === "discuss" && "bg-info"}
                                
                                `}
                                >
                                  {data.status}
                                </span>
                              </td>
                              {/* <td className="d-flex justify-content-center align-items-center">
                                <ActionBtn
                                  modalid={data.hcm_provident_found_id}
                                  deleteFunc={DeleteItem}
                                  deleteurl={`/delete/hcm/provident/fund/info/${data.hcm_provident_found_id}`}
                                  paginateUrl={paginateUrl}
                                  FetchPaginateInfo={FetchPaginateInfo}
                                />
                              </td> */}
                              {/* start actio btn*/}
                              {(roleSuperAdmin === 1 ||
                                roleAdmin === 1 ||
                                roleCreator === 1) && (
                                <td className="text-center">
                                  <ActionBtn
                                    modalid={data.hcm_provident_found_id}
                                    deleteFunc={DeleteItem}
                                    deleteurl={`/delete/hcm/provident/fund/info/${data.hcm_provident_found_id}`}
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
                          <td colSpan={4}>total</td>
                          <td className="text-end">
                            <span className="text-secondary me-2">=</span>
                            {totalEmpShare}
                            <span className="pill">%</span>
                          </td>
                          <td className="text-end">
                            <span className="text-secondary me-2">=</span>
                            {totalOrgShare}
                            <span className="pill">%</span>
                          </td>
                          <td colSpan={2}> </td>
                        </tr>
                      </tfoot>
                    </table>
                    {/* start paginate */}
                    <PagingLink
                      pageInfo={fundPaginateInfo}
                      fetchdata={FetchPaginateInfo}
                    />
                    {/* end paginate */}
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
              <h1 className="text-caption">Add Provided Fund</h1>
              <button
                className="btn-close  bg-light"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit((data) =>
                  StoreItem(
                    "/store/hcm/provident/fund/info",
                    data,
                    setLoader,
                    FetchPaginateInfo,
                    paginateUrl
                  )
                )}
              >
                <fieldset className="fieldset">
                  <legend>Fund type</legend>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-emp_id"
                          title=" "
                          onKeyUp={() => CheckEmpId()}
                          {...register("emp_id", { required: true })}
                        />
                        <label htmlFor="add-emp_id" className="form-label">
                          Emaployee ID
                          <i className="fas fa fa-check ms-4 text-success"></i>
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.emp_id?.type === "required" &&
                          "Emaployee ID is required "}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-assign-to"
                          title=" "
                          name="assign-to"
                          value={checkEmployee}
                          readOnly={true}
                        />
                        <label htmlFor="add-assign-to" className="form-label">
                          Emp. Name
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                      <div className="form-input-con">
                        <input
                          type="text"
                          placeholder=" "
                          className="form-input"
                          id="add-fund-type"
                          title=" "
                          {...register("fund_type", { required: true })}
                        />
                        <label htmlFor="add-fund-type" className="form-label">
                          Fund type
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.fund_type?.type === "required" &&
                          "Fund type is required "}
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-emp_share"
                          title=" "
                          {...register("emp_share", { required: true })}
                        />
                        <label htmlFor="add-emp_share" className="form-label">
                          Emp. Share
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.emp_share?.type === "required" &&
                          "Emp. Share is required "}
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                      <div className="form-input-con">
                        <input
                          type="number"
                          placeholder=" "
                          className="form-input"
                          id="add-org_share"
                          title=" "
                          {...register("org_share", { required: true })}
                        />
                        <label htmlFor="add-org_share" className="form-label">
                          Org. Share
                        </label>
                      </div>
                      <div className="text-warning">
                        {errors.org_share?.type === "required" &&
                          "Org. Share is required "}
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-5">
                      <div className="form-date">
                        <label htmlFor="add-share_date" className="form-label">
                          Share Date.
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
                          id="add-share_date"
                          {...register("share_date", { required: true })}
                        />
                      </div>
                      <div className="text-warning">
                        {errors.share_date?.type === "required" &&
                          "Share Date. is required "}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-5">
                      <div className="form-date">
                        <label htmlFor="add-end-date" className="form-label">
                          End Date.
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
                          id="add-end-date"
                          {...register("end_date")}
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
                {/*<!-- end product order -->*/}

                {/*<!-- start payment order -->*/}
                <fieldset className="fieldset">
                  <legend>Save </legend>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <input
                        type="hidden"
                        {...register("orgid")}
                        value={OrgId()}
                      />
                      <label htmlFor="add-cur-status" className="text-light">
                        Current status
                      </label>
                      <select
                        id="add-cur-status"
                        className="form-select"
                        {...register("status", { required: true })}
                      >
                        <option value="">Select Current Status</option>
                        <option value="approved">Approved</option>
                        <option value="in-process">In-Process</option>
                        <option value="discuss">Discuss</option>
                      </select>
                      <hr className="bg-secondary" />
                      <div className="text-warning">
                        {errors.status?.type === "required" &&
                          "Status is required "}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                      {loader ? (
                        <Loader title="Save" />
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-success"
                          disabled={checkSign ? false : true}
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

      {/* start edit modal */}
      {fundPaginateInfo?.data?.map((data: any) => (
        <div
          className="modal"
          id={`edit_modal_${data.hcm_provident_found_id}`}
          key={`edit_modal_${data.hcm_provident_found_id}`}
        >
          <div className=" modal-dialog modal-fullscreen-sm modal-fullscreen-md">
            <div className="modal-content modal-content-bg">
              <div className="modal-header">
                <h1 className="text-caption">Add Provided Fund</h1>
                <button
                  className="btn-close  bg-light"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form id={`edit_form_${data.hcm_provident_found_id}`}>
                  <fieldset className="fieldset">
                    <legend>Fund type</legend>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-emp_id_${data.hcm_provident_found_id}`}
                            title=" "
                            name="emp_id"
                            defaultValue={data.emp_id + process.env.EMP_ID}
                            readOnly={true}
                          />
                          <label
                            htmlFor={`edit-emp_id_${data.hcm_provident_found_id}`}
                            className="form-label"
                          >
                            Emaployee ID
                            <i className="fas fa fa-check ms-4 text-success"></i>
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-assign-to_${data.hcm_provident_found_id}`}
                            title=" "
                            name="assign_to"
                            value={data.name}
                            readOnly={true}
                          />
                          <label
                            htmlFor={`edit-assign-to_${data.hcm_provident_found_id}`}
                            className="form-label"
                          >
                            Emp. Name
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                        <div className="form-input-con">
                          <input
                            type="text"
                            placeholder=" "
                            className="form-input"
                            id={`edit-fund-type_${data.hcm_provident_found_id}`}
                            title=" "
                            name="fund_type"
                            defaultValue={data.provident_fund_type}
                          />
                          <label
                            htmlFor={`edit-fund-type_${data.hcm_provident_found_id}`}
                            className="form-label"
                          >
                            Fund type
                          </label>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`edit-emp_share_${data.hcm_provident_found_id}`}
                            title=" "
                            name="emp_share"
                            defaultValue={data.emp_share}
                          />
                          <label
                            htmlFor={`edit-emp_share_${data.hcm_provident_found_id}`}
                            className="form-label"
                          >
                            Emp. Share
                          </label>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-4">
                        <div className="form-input-con">
                          <input
                            type="number"
                            placeholder=" "
                            className="form-input"
                            id={`edit-org_share_${data.hcm_provident_found_id}`}
                            title=" "
                            name="org_share"
                            defaultValue={data.organization_share}
                          />
                          <label
                            htmlFor={`edit-org_share_${data.hcm_provident_found_id}`}
                            className="form-label"
                          >
                            Org. Share
                          </label>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-5">
                        <div className="form-date">
                          <label
                            htmlFor={`edit-share_date_${data.hcm_provident_found_id}`}
                            className="form-label"
                          >
                            Share Date.
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.start_date}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`edit-share_date_${data.hcm_provident_found_id}`}
                            name="share_date"
                            defaultValue={data.start_date}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 mt-5">
                        <div className="form-date">
                          <label
                            htmlFor={`edit-end-date_${data.hcm_provident_found_id}`}
                            className="form-label"
                          >
                            End Date.
                          </label>
                          <h6 className="overlap-date-title load-date text-light">
                            <Image
                              width={30}
                              height={20}
                              src="/theme_icon/calendar.png"
                              alt=""
                              className="pe-2"
                            />
                            {data.end_date}
                          </h6>
                          <input
                            type="date"
                            placeholder=" "
                            className="form-date-input"
                            id={`edit-end-date_${data.hcm_provident_found_id}`}
                            name="end_date"
                            defaultValue={data.end_date}
                          />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  {/*<!-- end product order -->*/}

                  {/*<!-- start payment order -->*/}
                  <fieldset className="fieldset">
                    <legend>Update </legend>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                        <input type="hidden" name="orgid" value={OrgId()} />
                        <input
                          type="hidden"
                          name="id"
                          value={data.hcm_provident_found_id}
                        />
                        <label
                          htmlFor={`edit-cur-status_${data.hcm_provident_found_id}`}
                          className="text-light"
                        >
                          Current status
                        </label>
                        <select
                          id="add-cur-status"
                          className="form-select"
                          name="status"
                        >
                          <option value="">Select Current Status</option>
                          <option
                            value="approved"
                            selected={data.status === "approved" ? true : false}
                          >
                            Approved
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
                            value="discuss"
                            selected={data.status === "discuss" ? true : false}
                          >
                            Discuss
                          </option>
                        </select>
                        <hr className="bg-secondary" />
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center">
                        {loader ? (
                          <Loader title="Update" />
                        ) : (
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                              UpdateInfo(
                                `edit_form_${data.hcm_provident_found_id}`
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

      {/* end edit modal */}
      {/* start script */}
      <JqueryMin />
      <AsidejQuery />
      <FullScreenMode />
      <PrintMin />
      <JqueryUiMin />
      <DraggElements />
      <PickDate />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const id = context.query.v;

  const fundData = await FetchData(`/get/hcm/provident/fund/info/${id}`);
  const orgname = await OrgName(id);

  return {
    props: {
      fundData,
      orgname,
    },
  };
}
