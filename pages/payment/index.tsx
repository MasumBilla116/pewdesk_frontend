import Footer from "@/components/Footer";
import Router from "next/router";
import Image from "next/image";
import ImgLoader from "../api/Helper/ImgLoader";
import OrgId from "../api/Helper/OrgId";
import Cookies from "js-cookie";
import AccessKey from "../api/AccessKey";
import { useEffect } from "react";
import { decrypt } from "n-krypta";

export default function Payment() {
  useEffect(() => {
    const PD_SV = Cookies.get("PD_SV");
    const decrypt_PD_SV = decrypt(`${PD_SV}`, `${AccessKey()}`);
    if (decrypt_PD_SV.remaining_day > 0) {
      Router.push("/dashboard");
    }
  }, []);
  const DimondPayment = async () => {
    sessionStorage.setItem("org", OrgId());
    sessionStorage.setItem("validity", "720");
    sessionStorage.setItem("amount", "12000");
    sessionStorage.setItem("payment_for", "Two Years");
    Router.push("https://buy.stripe.com/test_8wM28rdfWaUDfkc28n");
  };
  const GoldPayment = async () => {
    sessionStorage.setItem("org", OrgId());
    sessionStorage.setItem("validity", "360");
    sessionStorage.setItem("amount", "6500");
    sessionStorage.setItem("payment_for", "One Years");

    Router.push("https://buy.stripe.com/test_28odR9dfWd2L3BudR4");
  };
  const SilverPayment = async () => {
    sessionStorage.setItem("org", OrgId());
    sessionStorage.setItem("validity", "180");
    sessionStorage.setItem("amount", "3500");
    sessionStorage.setItem("payment_for", "Six Months");
    Router.push("https://buy.stripe.com/test_00geVddfW3sb2xq8wJ");
  };
  return (
    <>
      <div className="container">
        <h1 className="text-center text-success mt-5 mb-5">Pewdesk</h1>
        <div className="row">
          <div className="col-lg-6">
            <Image
              alt="Payment"
              width={500}
              height={500}
              loader={() => ImgLoader("storage/payment/10594783_4494209.jpg")}
              src={`${process.env.BASE_LINK_URL}storage/payment/10594783_4494209.jpg`}
              className="img-fluid"
            />
          </div>
          <div className="col-lg-6">
            <p>
              Online payment refers to the process of making electronic
              transactions over the internet to complete a financial
              transaction. It allows customers to make payments for products,
              services, or bills electronically without the need for physical
              cash or checks.
            </p>
            <p>
              There are various forms of online payment methods available,
              including&#39;
            </p>

            <ul className="payment-list-group mt-0">
              <li>
                Credit/Debit Cards&#39; Customers can provide their card
                information &lsquo;card number, expiry date, CVV&rsquo; to make
                a payment securely online. This method is widely accepted and
                convenient for most online transactions.
              </li>
              <li>
                Digital Wallets&#39; Services like PayPal, Apple Pay, Google
                Pay, or other similar platforms allow users to store their
                payment information securely and make payments online with just
                a few clicks.
              </li>
              <li>
                Bank Transfers&#39; Customers can initiate payments directly
                from their bank accounts using online banking services or
                transfer platforms like TransferWise or Venmo.
              </li>
              <li>
                Cryptocurrencies&#39; Some online merchants accept digital
                currencies like Bitcoin, Ethereum, or others for payment.
              </li>
            </ul>
            <p>
              Online payment methods provide convenience, speed, and security
              for both customers and businesses. They have become increasingly
              popular due to the growth of e-commerce and the ease of conducting
              transactions from the comfort of one&apos;s own device.
            </p>
          </div>
        </div>
      </div>
      <div className="container mt-5 mb-5">
        <div className="row">
          {/* start silver  */}
          <div className="col-lg-4">
            <div className="bg-light mt-5  border hover:scale-1">
              <h3 className="text-center bg-warning p-2">
                <strong className="text-light mb-0">Silver</strong>
                <p className="mb-4 text-light">
                  6 Months / <small>3500 Tk BDT</small>
                </p>
              </h3>
              <ul className="payment-list-group mt-0">
                <li>
                  <i className="fas fa fa-check text-success me-2"></i>Easy to
                  use
                </li>
                <li>
                  <i className="fas fa fa-check text-success me-2"></i>Faster
                  navigation
                </li>
                <li>
                  <i className="fas fa fa-check text-success me-2"></i>
                  Multi-authentication
                </li>
                <li>
                  <i className="fas fa fa-check text-success me-2"></i>Team
                  Management
                </li>
                <li>
                  <i className="fas fa fa-check text-success me-2"></i>Easy to
                  customization
                </li>
              </ul>
              <div className="d-flex justify-content-center align-items-center mt-2 mb-2">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => SilverPayment()}
                >
                  Payment
                </button>
              </div>
            </div>
          </div>
          {/* end silver */}
          {/* start gold */}
          <div className="col-lg-4">
            <div className="bg-light   border hover:scale-1">
              <h3 className="text-center bg-success p-2">
                <strong className="text-light mb-0">Gold</strong>
                <p className="mb-4 text-light">
                  1 Years / <small>6500 Tk BDT</small>
                </p>
              </h3>
              <ul className="payment-list-group mt-0">
                <li>
                  <i className="fas fa fa-check text-success me-2"></i>Easy to
                  use
                </li>
                <li>
                  <i className="fas fa fa-check text-success me-2"></i>Faster
                  navigation
                </li>
                <li>
                  <i className="fas fa fa-check text-success me-2"></i>
                  Multi-authentication
                </li>
                <li>
                  <i className="fas fa fa-check text-success me-2"></i>Team
                  Management
                </li>
                <li>
                  <i className="fas fa fa-check text-success me-2"></i>Easy to
                  customization
                </li>
              </ul>
              <div className="d-flex justify-content-center align-items-center mt-2 mb-2">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => GoldPayment()}
                >
                  Payment
                </button>
              </div>
            </div>
          </div>
          {/* end gold */}
          {/* start dimond */}
          <div className="col-lg-4">
            <div className="mt-5 bg-light   border hover:scale-1">
              <h3 className="text-center bg-primary p-2">
                <strong className="text-light mb-0">Dimond</strong>
                <p className="mb-4 text-light">
                  2 Years / <small>12000 Tk BDT</small>
                </p>
              </h3>
              <ul className="payment-list-group mt-0">
                <li>
                  <i className="fas fa fa-check text-success me-2"></i>Easy to
                  use
                </li>
                <li>
                  <i className="fas fa fa-check text-success me-2"></i>Faster
                  navigation
                </li>
                <li>
                  <i className="fas fa fa-check text-success me-2"></i>
                  Multi-authentication
                </li>
                <li>
                  <i className="fas fa fa-check text-success me-2"></i>Team
                  Management
                </li>
                <li>
                  <i className="fas fa fa-check text-success me-2"></i>Easy to
                  customization
                </li>
              </ul>
              <div className="d-flex justify-content-center align-items-center mt-2 mb-2">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => DimondPayment()}
                >
                  Payment
                </button>
              </div>
            </div>
          </div>
          {/* end diamond */}
        </div>
      </div>
      <Footer />
    </>
  );
}
