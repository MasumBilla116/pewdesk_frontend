export default function TableFilter() {
  return (
    <>
      <section className="erp-filter-ledger pb-lg-4 bg-er-dark-black ps-3 pe-3 pt-4 mb-2 border-bottom border-dark-theme border-2 bg-input-dark">
        <div className="filter-input-container">
          <div className="row">
            {/* <div className="col-lg-4">
              <div className="form-group">
                <label
                  htmlFor="year"
                  className="form-label title-color font-monospace title-font-1.3"
                >
                  Filter By Text
                </label>
                <input
                  type="text"
                  className="form-control erp-input-dark font-13 text-light"
                  placeholder="Search"
                  id="search"
                />
              </div>
            </div> */}
            <div className="col-lg-4">
              <div className="form-group">
                <label
                  htmlFor="year"
                  className="form-label title-color font-monospace title-font-1.3"
                >
                  Filter by Month
                </label>
                <select
                  name="month"
                  id="month"
                  className="form-select erp-input-dark text-secondary font-monospace font-13"
                >
                  <option value="">Choose month</option>
                  <option value="">January</option>
                  <option value="">February</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <label
                htmlFor="action"
                className="form-label title-color font-monospace title-font-1.3"
              >
                {" "}
                Choose more action
              </label>
              <div className="d-flex align-items-center">
                <button className="btn w-100 me-lg-2 me-sm-2 title-color bg-gradient  font-monospace font-13">
                  View All
                </button>
                <button className="btn w-100 me-lg-2 me-sm-2 title-color bg-gradient font-monospace  font-13">
                  Reset All
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
