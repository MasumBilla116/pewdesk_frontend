import Image from "next/image";
import Link from "next/link";
import ImgLoader from "../api/Helper/ImgLoader";
import { useEffect, useRef, useState } from "react";
import Router from "next/router";
import { isEmptyObject } from "jquery";
import axios from "axios";
import swal from "sweetalert";
import Cookies from "js-cookie";
import AccessKey from "../api/AccessKey";
import { decrypt, encrypt } from "n-krypta";

export default function Confirm() {
  useEffect(() => {
    const PD_SV = Cookies.get("PD_SV");
    const decrypt_PD_SV = decrypt(`${PD_SV}`, `${AccessKey()}`);
    if (decrypt_PD_SV.remaining_day > 0) {
      Router.push("/dashboard");
    }
  }, []);
  const RunEffect = useRef(true);
  useEffect(() => {
    if (RunEffect.current === true) {
      const org = sessionStorage.getItem("org");
      const validity = sessionStorage.getItem("validity");
      const amount = sessionStorage.getItem("amount");
      const payment_for = sessionStorage.getItem("payment_for");
      if (
        isEmptyObject(org) ||
        isEmptyObject(validity) ||
        isEmptyObject(amount) ||
        isEmptyObject(payment_for)
      ) {
        Router.push("/payment");
      } else {
        const data = {
          orgid: org,
          validity: validity,
          amount: amount,
          payment_for: payment_for,
        };
        axios.get("sanctum/csrf-cookie").then((res) => {
          axios
            .post(`${process.env.BASE_URL}/org/payment/confirm/`, data)
            .then((res) => {
              if (res.data.success === 200) {
                sessionStorage.removeItem("org");
                sessionStorage.removeItem("validity");
                sessionStorage.removeItem("amount");
                sessionStorage.removeItem("payment_for");
                const SMPSA = false; // software module positions access
                const VIL = false; // viewer information live
                Cookies.set("SMPSA", encrypt(SMPSA, `${AccessKey()}`), {
                  expires: 365,
                });
                Cookies.set("VIL", encrypt(VIL, `${AccessKey()}`), {
                  expires: 365,
                });
                swal(
                  "Successfully",
                  "Thanks for payment\nGo to dashboard. just press continue",
                  "info"
                );
                Router.push("/");
              }

              if (res.data.error === 500) {
                swal(
                  "Warning",
                  "Something is worng please try again",
                  "warning"
                );
              }
            })
            .catch((error) => {
              swal("Warning", "Something is worng please try again", "warning");
            });
        });
      }
      return () => (RunEffect.current = false);
    }
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Image
              alt="Payment Confirm"
              width={500}
              height={450}
              className="img-fluid"
              loader={() => ImgLoader("storage/payment/10117884_4351373.jpg")}
              src={`${process.env.BASE_LINK_URL}storage/payment/10117884_4351373.jpg`}
            />
            <Link href="/dashboard" className="btn btn-success btn-lg">
              Continue
              <i className="fas fa fa-arrow-right ms-3"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
