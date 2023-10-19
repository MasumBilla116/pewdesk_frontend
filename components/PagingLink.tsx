export default function PagingLink(props: any) {
  const { pageInfo, fetchdata } = props;
  return (
    <div className="d-flex justify-content-center align-item-center">
      <nav aria-label="Page navigation ">
        <ul
          className="pagination "
          style={{
            boxShadow: "3px 3px 13px #a2f2a2ad",
          }}
        >
          {pageInfo.links?.map((data: any, index: any) => (
            <li key={`paginate-link-${index}`} className="page-item ">
              <button
                type="button"
                className={`page-link  ${
                  data.active === true && "bg-black active"
                }`}
                onClick={() => fetchdata(data.url)}
                style={{
                  background: "#68ae00",
                  color: "aliceblue",
                  fontWeight: "bolder",
                }}
              >
                {data.label === "&laquo; Previous" && <span>&laquo;</span>}

                {data.label >= 1 && <span>{index}</span>}
                {data.label === "Next &raquo;" && <span>&raquo;</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
