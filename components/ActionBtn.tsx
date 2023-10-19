export default function ActionBtn(props: any) {
  const {
    modalid,
    deleteFunc,
    deleteurl,
    paginateUrl,
    FetchPaginateInfo,
    roleCreator,
  } = props;
  return (
    <>
      <button
        type="button"
        className="btn bg-transparent text-success btn-sm"
        data-bs-toggle="modal"
        data-bs-target={`#edit_modal_${modalid}`}
      >
        <i className="fas fa fa-edit"></i>
      </button>
      {roleCreator !== 1 && (
        <button
          type="button"
          className="btn bg-transparent text-danger btn-sm"
          onClick={() => deleteFunc(deleteurl, paginateUrl, FetchPaginateInfo)}
        >
          <i className="fas fa fa-trash"></i>
        </button>
      )}
    </>
  );
}
