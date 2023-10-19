import Head from "next/head";
import { useEffect, useState } from "react";
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
import FetchData from "../api/Helper/FetchData";
import PaginateData from "../api/Helper/PaginateData";
import PagingLink from "@/components/PagingLink";
import GetOrgCurrencies from "@/pages/api/PreloadOrgInfo/GetOrgCurrencies";
import Table2ExcelMinJs from "./../load_js/plugin/table2excel.min.js";
import Table2Excel from "./../load_js/controllers/table2excel";
import GetMonthName from "../api/Helper/GetMonthName";
import GetFullYear from "../api/Helper/GetFullYear";
import OrgName from "../api/Helper/OrgName";
import { decrypt } from "n-krypta";
import AccessKey from "../../pages/api/AccessKey";
import Cookies from "js-cookie";
import DeleteItem from "../api/Helper/DeleteItem";

export default function Team(props: any) {
  const { employeeSalaryData, orgCurrencie, orgname, teamData } = props;

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

  const [loader, setLoader] = useState(false);
  const [teamPaginateInfo, setTeamPaginateInfo] = useState(teamData);
  const [paginateUrl, setPaginateUrl] = useState(teamData?.links[1]?.url);
  const [totalSalary, setTotalSalary] = useState(0);

  useEffect(() => {
    var salary = 0;
    teamPaginateInfo?.data?.map((data: any) => {
      salary += data.salary;
    });
    setTotalSalary(salary);
  }, [totalSalary, teamPaginateInfo, employeeSalaryData, paginateUrl]);

  const FetchPaginateInfo = async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setTeamPaginateInfo(res);
    }
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
        <title>HCM | Employee Salary</title>
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
                    <table
                      id="printable"
                      className="font-13 erp-table-dark tbl-bg table table-bordered text-light table-dark"
                    >
                      <caption>Team management Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={10}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>Team Management</b>
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
                          <th scope="col">Team name</th>
                          <th scope="col">Emp Name</th>
                          <th scope="col">Emp. Email</th>
                          <th scope="col">Roll</th>
                          <th scope="col">Team Create Date</th>
                          {roleSuperAdmin === 1 && (
                            <th scope="col"> Action </th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {teamPaginateInfo?.data?.map(
                          (data: any, index: any) => (
                            <tr key={data.user_id}>
                              <td className="debit  text-start">{index + 1}</td>

                              <td className="debit text-light text-start">
                                {data.team_name}
                              </td>
                              <td className="credit text-light text-start">
                                {data.name}
                              </td>
                              <td className="debit  text-start">
                                {data.email}
                              </td>
                              <td className="credit text-light text-center">
                                <div
                                  className={`badge
                               ${data.role_admin === 1 && "bg-success"}
                               ${data.role_reader === 1 && "bg-info"}
                               ${data.role_creator === 1 && "bg-primary"}
                               ${data.role_employee === 1 && "bg-danger"}
                               ${data.role_monitor === 1 && "bg-info"}
                               ${data.role_super_admin === 1 && "bg-success"}
                              `}
                                >
                                  {data.role_admin === 1 && "Admin"}
                                  {data.role_reader === 1 && "Reader"}
                                  {data.role_creator === 1 && "Creator"}
                                  {data.role_employee === 1 && "Employee"}
                                  {data.role_monitor === 1 && "Monitor"}
                                  {data.role_super_admin === 1 && "Super Admin"}
                                </div>
                              </td>
                              <td className="credit text-light text-center">
                                {data.created_date}
                              </td>
                              {roleSuperAdmin === 1 && (
                                <td>
                                  <button
                                    type="button"
                                    className="btn bg-transparent text-danger btn-sm"
                                    onClick={() =>
                                      DeleteItem(
                                        `/delete/team/info/${data.team_id}/${data.user_id}`,
                                        paginateUrl,
                                        FetchPaginateInfo
                                      )
                                    }
                                  >
                                    <i className="fas fa fa-trash"></i>
                                  </button>
                                </td>
                              )}
                            </tr>
                          )
                        )}
                      </tbody>
                      {/* <tfoot>
                        <tr className="text-center">
                          <td colSpan={5}>Total</td>
                          <td className="text-end">
                            <span className="text-secondary me-1">=</span>
                            {totalSalary}
                            <span className="pill">{orgCurrencie}</span>
                          </td>
                        </tr>
                      </tfoot> */}
                    </table>
                    {/* start paginate */}
                    <PagingLink
                      pageInfo={teamPaginateInfo}
                      fetchdata={FetchPaginateInfo}
                    />

                    {/* end paginate */}
                  </div>
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

  const employeeSalaryData = await FetchData(`/get/emp/salary/info/${id}`);
  const teamData = await FetchData(`/get/team/info/${id}`);
  const orgCurrencie = await GetOrgCurrencies(id);
  const orgname = await OrgName(id);

  return {
    props: {
      employeeSalaryData,
      teamData,
      orgCurrencie,
      orgname,
    },
  };
}
