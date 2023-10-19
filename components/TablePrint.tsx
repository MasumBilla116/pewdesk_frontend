export default function TablePrint() {
  return (
    <>
      <section
        id="dragg"
        className="top-btns bg-er-dark-black p-2 d-flex justify-content-xxl-between justify-content-xl-between justify-content-lg-between justify-content-md-between justify-content-sm-end justify-content-xsm-space-evenly justify-content-xxsm-space-evenly px-4 bg-input-dark"
      >
        <div className="form-group tbl-search-con d-block">
          <input
            type="text"
            className="form-control erp-input-dark font-13 text-light "
            placeholder="Search"
            id="search"
          />
        </div>

        <div className="tbl-search-con d-none">
          <input
            type="text"
            className="form-control erp-input-dark font-13 text-light bg-success me-2 d-none"
            placeholder="Search"
            id="search2"
          />
          <button className="bg-gradient border-0 title-color btn  tbl-search-btn me-1">
            <i className="fas fa fa-search"></i>
          </button>
        </div>

        {/* start extra options */}
        <div className="d-flex justify-content-xxl-end justify-content-xl-end justify-content-lg-end justify-content-md-end justify-content-sm-end justify-content-xsm-space-evenly justify-content-xxsm-space-evenly  ">
          <button className="bg-gradient border-0 title-color  btn me-1">
            <i className="fa-download fa-solid"></i>
          </button>
          <button
            id="export-excel"
            className="bg-gradient border-0 title-color  btn me-1"
          >
            <i className="fa-list-check fa-solid"></i>
          </button>
          <button
            id="print"
            className="bg-gradient border-0 title-color  btn me-1"
          >
            <i className="fa-solid fa-print"></i>
          </button>
          {/* <button className="bg-gradient border-0 window-minimize title-color px-2 btn me-1">
            <i className="fa-solid fa-window-minimize"></i>
          </button> */}
          <button
            id="draggable"
            className="bg-gradient border-0  title-color  btn"
          >
            <i className="fa fa-clone" aria-hidden="true"></i>
          </button>
          <button
            id="dropable"
            className="bg-gradient border-0 d-none  title-color btn me-2"
          >
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        {/* end extra options */}
      </section>
    </>
  );
}
