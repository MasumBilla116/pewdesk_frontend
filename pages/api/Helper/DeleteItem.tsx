import axios from "axios";
import swal from "sweetalert";
import { toast } from "react-toastify";

export default async function DeleteItem(
  url: any,
  paginateUrl: any,
  FetchPaginateInfo: any
) {
  swal({
    title: "Are You sure Delete this item.",
    text: "Note: If you delete this item don't recovary agains.",
    icon: "warning",
    buttons: ["No, cancel it!", "Yes, I am sure!"],
  }).then((res) => {
    if (res) {
      toast.info("Processing....", { autoClose: 1000 });
      axios.get("sanctum/csrf-cookie").then((res) => {
        axios.delete(`${process.env.BASE_URL}${url}`).then((res) => {
          if (res.data.success === 200) {
            FetchPaginateInfo(paginateUrl);
            // swal("Success", "Deleted successfully", "success");
            toast.success("Deleted successfully");
          }

          if (res.data.error === 500) {
            toast.info("Something is worng try again");
          }
        });
      });
    }
  });
}
