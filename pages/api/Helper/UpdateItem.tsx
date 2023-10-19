import axios from "axios";
import swal from "sweetalert";
import { toast } from "react-toastify";

export default async function UpdateItem(
  url: any,
  formData: any,
  loader: any,
  FetchPaginateInfo: any,
  paginateUrl: any
) {
  loader(true);
  axios.get("sanctum/csrf-cookie").then((res) =>
    axios
      .post(`${process.env.BASE_URL}${url}`, formData)
      .then((res) => {
        loader(false);
        if (res.data.exist === true) {
          toast.warn(`${res.data.message} is already exist`);
        } else if (res.data.success === 200) {
          $(".modal-close-btn").click();
          toast.success("Updated successfully");
          FetchPaginateInfo(paginateUrl);
        } else if (res.data.error === 500) {
          toast.warn("Something is worng try again");
        }
      })
      .catch((error) => {
        loader(false);
        toast.warn("Something is worng try again");
      })
  );
}
