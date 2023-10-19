import Head from "next/head";
import { useEffect } from "react";
import Header from "./../components/Header";
import Aside from "./../components/Aside";
import ToggleOption from "./../components/ToggleOption";
import Footer from "./../components/Footer";
import TablePrint from "@/components/TablePrint";
import TableFilter from "@/components/TableFilter";
import JqueryMin from "./load_js/plugin/jquery.min.js";
import AsidejQuery from "./load_js/controllers/AsidejQuery";
import FullScreenMode from "./load_js/controllers/FullScreenMode";
import PrintMin from "./load_js/controllers/PrintMin";
import JqueryUiMin from "./load_js/plugin/JqueryUiMin";
import DraggElements from "./load_js/controllers/DraggElements";

export default function Settings() {
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
                  {/* <!-- start  code --> */}
                  {/* start terms and conditions */}

                  {/* end terms and conditions */}

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
    </>
  );
}
