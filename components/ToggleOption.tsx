import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ToggleOption() {
  const [searchItem, setSearchItem] = useState("");
  const searchHandler = (e: any) => {
    setSearchItem(e.target.value);
  };
  const checkboxHandler = (e: any) => {};
  return (
    <>
      {/*<!--start search modal -->*/}
      <div className="modal" id="search-bar">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <input
                type="search"
                value={searchItem}
                onChange={searchHandler}
                className="form-control bg-transparent"
                placeholder="Enter your query"
              />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
          </div>
        </div>
      </div>
      {/*<!--end search modal -->*/}
      {/*<!-- start right side option -->*/}

      <div className="right-side-op">
        <button type="button" className="border-0 title-color">
          <i className="fas fa fa-cog cog"></i>
        </button>
      </div>
      <div className="right-op p-0">
        <div className="d-flex theme-option-title pt-2 border-bottom justify-content-between position-sticky top-0 left-0 right-0 z-9">
          <h4 className="title-color font-monospace">Theme Option</h4>
          <button type="button" className="close bg-transparent">
            <i className="fa-solid fa-xmark text-warning"></i>
          </button>
        </div>

        <div className="p-3">
          {/*<!-- start aside option -->*/}
          {/*<!-- start aside option -->*/}

          <h6 className="text-warning font-monospace title-font-1.3">
            {" "}
            Both Gradient{" "}
          </h6>
          <hr />
          <div className="d-flex justify-content-between font-monospace">
            <h6 className="title-color font-monospace">Gradient</h6>
            <div className="form-check form-switch ">
              <input
                type="checkbox"
                onChange={checkboxHandler}
                className="form-check-input cursor-pointer"
                id="both-gradient"
              />
            </div>
          </div>
          <h6 className="text-warning font-monospace title-font-1.3">
            {" "}
            Aside{" "}
          </h6>
          <hr />
          <div className="d-flex justify-content-between font-monospace">
            <h6 className="title-color font-monospace">Default</h6>
            <div className="form-check form-switch ">
              <input
                type="checkbox"
                onChange={checkboxHandler}
                checked
                className="form-check-input cursor-pointer"
                id="default-aside"
              />
            </div>
          </div>
          <div className="d-flex justify-content-between font-monospace">
            <h6 className="title-color font-monospace">Expand</h6>
            <div className="form-check form-switch ">
              <input
                type="checkbox"
                onChange={checkboxHandler}
                className="form-check-input cursor-pointer"
                id="aside-expand"
              />
            </div>
          </div>
          <div className="d-flex justify-content-between font-monospace">
            <h6 className="title-color font-monospace">Light-Blue</h6>
            <div className="form-check form-switch ">
              <input
                type="checkbox"
                onChange={checkboxHandler}
                className="form-check-input cursor-pointer"
                id="light-blue-aside"
              />
            </div>
          </div>
          <div className="d-flex justify-content-between font-monospace">
            <h6 className="title-color font-monospace">Dark-Blue</h6>
            <div className="form-check form-switch ">
              <input
                type="checkbox"
                onChange={checkboxHandler}
                className="form-check-input cursor-pointer"
                id="dark-blue-aside"
              />
            </div>
          </div>
          {/*<!-- end aside option -->*/}
          {/*<!-- start nav option -->*/}
          <h6 className="text-warning font-monospace title-font-1.3">
            {" "}
            Navbar{" "}
          </h6>
          <hr />
          <div className="d-flex justify-content-between font-monospace">
            <h6 className="title-color font-monospace">Default</h6>
            <div className="form-check form-switch ">
              <input
                type="checkbox"
                onChange={checkboxHandler}
                checked
                className="form-check-input cursor-pointer"
                id="default-nav"
              />
            </div>
          </div>

          <div className="d-flex justify-content-between font-monospace">
            <h6 className="title-color font-monospace">Blue-Light</h6>
            <div className="form-check form-switch ">
              <input
                type="checkbox"
                onChange={checkboxHandler}
                className="form-check-input cursor-pointer"
                id="light-blue-nav"
              />
            </div>
          </div>

          <div className="d-flex justify-content-between font-monospace">
            <h6 className="title-color font-monospace">Dark-Blue</h6>
            <div className="form-check form-switch ">
              <input
                type="checkbox"
                onChange={checkboxHandler}
                className="form-check-input cursor-pointer"
                id="dark-blue-nav"
              />
            </div>
          </div>
          {/*<!-- end nav option -->*/}
          {/*<!-- start body option -->*/}
          <h6 className="text-warning font-monospace title-font-1.3"> Body </h6>
          <hr />
          <div className="d-flex justify-content-between font-monospace">
            <h6 className="title-color font-monospace">Default</h6>
            <div className="form-check form-switch ">
              <input
                type="checkbox"
                onChange={checkboxHandler}
                checked
                className="form-check-input cursor-pointer"
                id="default-body"
              />
            </div>
          </div>
          <div className="d-flex justify-content-between font-monospace">
            <h6 className="title-color font-monospace">Blue</h6>
            <div className="form-check form-switch ">
              <input
                type="checkbox"
                onChange={checkboxHandler}
                className="form-check-input cursor-pointer"
                id="body-blue"
              />
            </div>
          </div>
          <div className="d-flex justify-content-between font-monospace">
            <h6 className="title-color font-monospace">Dark-Blue;</h6>
            <div className="form-check form-switch ">
              <input
                type="checkbox"
                onChange={checkboxHandler}
                className="form-check-input cursor-pointer"
                id="body-dark-blue"
              />
            </div>
          </div>

          <div className="d-flex justify-content-between font-monospace">
            <h6 className="title-color font-monospace">Dark-Orange</h6>
            <div className="form-check form-switch ">
              <input
                type="checkbox"
                onChange={checkboxHandler}
                className="form-check-input cursor-pointer"
                id="body-dark-orange"
              />
            </div>
          </div>
          <div className="d-flex justify-content-between font-monospace">
            <h6 className="title-color font-monospace">Dark-Green</h6>
            <div className="form-check form-switch ">
              <input
                type="checkbox"
                onChange={checkboxHandler}
                className="form-check-input cursor-pointer"
                id="body-dark-green"
              />
            </div>
          </div>
          {/*<!-- end body option -->*/}
        </div>
      </div>
      {/*<!-- end right side option -->*/}
      <div className="erp-container erp-bg-back erp-headerp-container">
        <div className="erp-container-fluid"></div>
      </div>
      {/*<!--ending top header menu-->*/}
    </>
  );
}
