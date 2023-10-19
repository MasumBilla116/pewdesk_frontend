import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "./../components/Header";
import Aside from "./../components/Aside";
import ToggleOption from "./../components/ToggleOption";
import Footer from "../components/Footer";
import JqueryMin from "./load_js/plugin/jquery.min.js";
import AsidejQuery from "./load_js/controllers/AsidejQuery";
import FullScreenMode from "./load_js/controllers/FullScreenMode";
import PrintMin from "./load_js/controllers/PrintMin";
import JqueryUiMin from "./load_js/plugin/JqueryUiMin";
import DraggElements from "./load_js/controllers/DraggElements";
import { useEffect, useRef } from "react";
import $ from "jquery";

export default function Feedback() {
  const CurRef = useRef(true);
  useEffect(() => {
    if (CurRef.current === true) {
      $(document).ready(function () {
        $(".feedback-thumb-btn").hide();
      });

      return () => (CurRef.current = false);
    }
  }, []);
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Feedback</title>
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
                {/*{/*<!--start your code -->*/}
                <div className="container-fluid pt-3 pb-3 dashboard-content">
                  {/* {/*<!--start  code -->*/}
                  {/*<!--start thumb react -->*/}
                  <div className="container p-0 mb-5">
                    <form>
                      {/*<!--start react field -->*/}
                      <fieldset className="fieldset shadow-dark">
                        <legend>Your React</legend>
                        <div className="row">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 ">
                            <p className="text-light text-justify">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Minus possimus molestiae, nihil dolores
                              cupiditate repellendus amet quibusdam nostrum
                              quaerat ullam aut nesciunt ad ratione consequatur
                              itaque qui earum modi quo?
                            </p>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 text-center">
                            <button
                              type="button"
                              className="btn feedback-thumb-btn position-relative"
                            >
                              <i className="fas fa fa-thumbs-up"></i>
                              <input type="radio" name="thumd" />
                            </button>
                            <p>99875412K</p>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4 text-center">
                            <button
                              type="button"
                              className="btn feedback-thumb-btn position-relative"
                            >
                              <i className="fas fa fa-thumbs-down"></i>
                              <input type="radio" name="thumd" />
                            </button>
                            <p>102</p>
                          </div>
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 text-center">
                            <hr />
                            <div className="d-flex justify-content-end">
                              <button
                                type="submit"
                                className="btn btn-primary shadow-dark"
                              >
                                Send
                              </button>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      {/*<!--end react field -->*/}
                    </form>
                  </div>
                  {/*<!--end thumb react -->*/}
                  {/*<!--start message -->*/}
                  <div className="container p-0 mb-5">
                    <form>
                      {/*<!--start react field -->*/}
                      <fieldset className="fieldset shadow-dark">
                        <legend>Messages</legend>
                        <div className="row">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 ">
                            <p className="text-light text-justify">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Minus possimus molestiae, nihil dolores
                              cupiditate repellendus amet quibusdam nostrum
                              quaerat ullam aut nesciunt ad ratione consequatur
                              itaque qui earum modi quo?
                            </p>
                          </div>
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 text-center">
                            <label htmlFor="comment" className="text-light">
                              Messages
                            </label>
                            <textarea
                              className="form-control"
                              name="comment"
                              id="comment"
                              cols="30"
                              rows="10"
                              style={{ height: 200 + "px" }}
                              placeholder="Write your messages"
                              spellCheck="true"
                            ></textarea>
                          </div>
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 text-center">
                            <hr />
                            <div className="d-flex justify-content-end">
                              <button
                                type="submit"
                                className="btn btn-primary shadow-dark"
                              >
                                Send
                              </button>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      {/*<!--end react field -->*/}
                    </form>
                  </div>
                  {/*<!--end message -->*/}
                  {/* {/*<!--end  code -->*/}
                </div>
                {/* end your code */}
              </div>
              {/*{/*<!--start footer -->*/}
              <Footer />
              {/*{/*<!--end footer -->*/}
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

      {/* end jquery */}
    </>
  );
}
