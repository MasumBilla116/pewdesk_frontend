export default function AddModalTableBtn() {
  return (
    <>
      <div className="btn-group tbl-btn-group">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#add-modal"
        >
          <i className="fas fa fa-plus"></i>
        </button>
      </div>
    </>
  );
}
