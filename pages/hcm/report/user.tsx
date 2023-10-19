import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "./../../../components/Header";
import Aside from "./../../../components/Aside";
import ToggleOption from "./../../../components/ToggleOption";
import Footer from "./../../../components/Footer";
import TablePrint from "@/components/TablePrint";
import TableFilter from "@/components/TableFilter";
import JqueryMin from "./../../load_js/plugin/jquery.min.js";
import AsidejQuery from "./../../load_js/controllers/AsidejQuery";
import FullScreenMode from "./../../load_js/controllers/FullScreenMode";
import PrintMin from "./../../load_js/controllers/PrintMin";
import JqueryUiMin from "./../../load_js/plugin/JqueryUiMin";
import DraggElements from "./../../load_js/controllers/DraggElements";
import PickDate from "./../../load_js/controllers/PickDate";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import Loader from "@/components/Loader";
import OrgId from "../../api/Helper/OrgId";
import FetchData from "../../api/Helper/FetchData";
import PaginateData from "../../api/Helper/PaginateData";
import PagingLink from "@/components/PagingLink";
import StoreItem from "../../api/Helper/StoreItem";
import UpdateItem from "../../api/Helper/UpdateItem";
import DeleteItem from "../../api/Helper/DeleteItem";
import { data } from "jquery";
import GetOrgCurrencies from "@/pages/api/PreloadOrgInfo/GetOrgCurrencies";
import GetFullYear from "@/pages/api/Helper/GetFullYear";
import GetMonthName from "@/pages/api/Helper/GetMonthName";
import ActionBtn from "@/components/ActionBtn";
import OrgName from "@/pages/api/Helper/OrgName";

export default function UserReport(props: any) {
  const { userData, orgname } = props;
  const [loader, setLoader] = useState(false);
  const [userPaginateInfo, setUserPaginateInfo] = useState(userData);
  const [paginateUrl, setPaginateUrl] = useState(userData?.links[1].url);

  const FetchPaginateInfo = async (url: any) => {
    if (url !== null) {
      const res = await PaginateData(url);
      setPaginateUrl(url);
      setUserPaginateInfo(res);
    }
  };

  useEffect(() => {}, []);
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle.min")
      : null;
  }, []);

  const UpdateInfo = async (target: any) => {
    const data = $(`#${target}`).serializeArray();
    console.warn(data);
    // const formData = JSON.stringify({ });
    //UpdateItem(
    // "/update/hcm/budget/info",
    // formData,
    // setLoader,
    //FetchPaginateInfo,
    // paginateUrl
    //);
  };

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>HCM | User Report</title>
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
                      <caption>User Report Ledger</caption>
                      <thead className="text-center">
                        <tr className="erp-tbl-top-head">
                          <th scope="col" colSpan={10}>
                            <div className="erp-trial-header">
                              <h2 className="erp-h2">
                                <b>{orgname}</b>
                              </h2>
                              <h3 className="erp-h3">
                                <b>User Report</b>
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
                          <th scope="col">EMP ID</th>
                          <th scope="col">Name</th>
                          <th scope="col"> Company </th>
                          <th scope="col"> Email </th>
                          <th scope="col"> Employee Type </th>
                          <th scope="col"> Department </th>
                          <th scope="col"> Designation </th>
                          <th scope="col"> Roll </th>
                          <th scope="col"> Status </th>
                        </tr>
                      </thead>
                      <tbody>
                        {userPaginateInfo?.data?.map(
                          (data: any, index: any) => (
                            <tr key={data.user_id}>
                              <td className="debit  text-start">{index + 1}</td>
                              <td className="debit text-primary text-start">
                                {data.user_id + process.env.EMP_ID}
                              </td>
                              <td className="debit  text-start">{data.name}</td>
                              <td className="debit text-light text-start">
                                {data.org_name}
                              </td>
                              <td className="debit  text-start">
                                {data.email}
                              </td>
                              <td className="debit text-info text-start">
                                {data.emp_type}
                              </td>

                              <td className="credit text-success text-start">
                                {data.department}
                              </td>
                              <td className="credit text-success text-start">
                                {data.designation}
                              </td>

                              <td className="credit text-success text-start">
                                <span
                                  className={`badge rounded ${
                                    data.role_status
                                      ? "text-primary"
                                      : "text-danger"
                                  } `}
                                >
                                  {data.role_status}
                                </span>
                              </td>
                              <td className="credit text-success text-start">
                                <span
                                  className={`badge rounded ${
                                    data.status ? "bg-success" : "bg-danger"
                                  }`}
                                >
                                  {data.status}
                                </span>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                    {/* start paginate */}
                    <PagingLink
                      pageInfo={userPaginateInfo}
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

  const userData = await FetchData(`/get/hcm/user/report/info/${id}`);
  const orgname = await OrgName(id);

  return {
    props: {
      userData,
      orgname,
    },
  };
}
