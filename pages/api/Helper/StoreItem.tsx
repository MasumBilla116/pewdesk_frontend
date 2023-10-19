import axios from "axios";
import swal from "sweetalert";
import Router from "next/router";
import { toast } from "react-toastify";

export default async function StoreItem(
  url: any,
  formData: any,
  setLoader: any,
  FetchPaginateData: any,
  paginateUrl: any
) {
  setLoader(true);
  axios.get("sanctum/csrf-cookie").then((res) => {
    axios
      .post(`${process.env.BASE_URL}${url}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoader(false);
        if (res.data.emp_limitation_full) {
          toast.info(`Ooops..! ${res.data.title} \n ${res.data.message}`);
        }
        if (res.data.exist === true) {
          toast.warn(`Ooops..! ${res.data.message} is already existed`);
        }
        if (res.data.success === 200) {
          toast.success(`Data inserted successfully`);
          FetchPaginateData(paginateUrl);
          $(".modal-close-btn").click();
          $("form").trigger("reset");
          Router.push(`${Router.asPath}`);
        }
        if (res.data.error === 500) {
          toast.warn(`Something is worng try again`);
        }
      })
      .catch((error) => {
        setLoader(false);
        toast.warn(`Something is worng try again`);
      });
  });
}
