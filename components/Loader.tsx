import { HashLoader } from "react-spinners";

export default function Loader(props: any) {
  return (
    <>
      {/* loader */}
      <button
        type="button"
        className="btn flex-row btn-success d-flex justify-content-between align-items-center"
        style={{
          background: "#00b5ec",
          border: "1px solid #77ecff",
          boxShadow: "0 5px 8px #ffffff61",
        }}
      >
        <HashLoader color={"#fff"} size={20} />
        <div className="ms-4">{props.title}</div>
      </button>
      {/* loader */}
    </>
  );
}
