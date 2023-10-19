import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className="p-4">
        <div className="footer-bg-img h-37"></div>
        <div className="container-fluid">
          <div className="row text-white">
            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
              <div className="row">
                {/* start link */}
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                  <h5>
                    <strong className="text-success">About</strong>
                  </h5>
                  <div>
                    <Link href="/" className="text-decoration-none text-light">
                      About Us
                    </Link>
                  </div>
                  <div>
                    <Link href="/" className="text-decoration-none text-light">
                      Corporate Sels
                    </Link>
                  </div>
                  <div>
                    <Link href="/" className="text-decoration-none text-light">
                      Community
                    </Link>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                  <h5>
                    <strong className="text-success">Developers</strong>
                  </h5>
                  <p>Md. Masum Billa</p>
                  <p>Mst. Azida alam sumi</p>
                  <p>Mst. Sharmin nahar</p>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                  <h5>
                    <strong className="text-success">App</strong>
                  </h5>
                  <p>Mobile app</p>
                  <p>Desktop app</p>
                </div>
                {/* end link  */}
                {/* start web and terms */}
                <div className="col-12 border-bottom  border-dark border-top pe-0">
                  <div className="d-flex justify-content-between align-items-center p-4">
                    <h5 className="text-success text-muted">PEWDESK</h5>
                    <Link href={"/terms-condition"} className="text-danger">
                      Terms & conditions
                    </Link>
                  </div>
                </div>
                {/* end web and terms */}
              </div>
            </div>
            {/* start social link */}
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 pe-0 ps-0">
              <div className="bg-danger d-flex justify-content-between align-items-center p-2">
                <i className="fas fa fa-phone-volume"></i>
                <p>Let&apos;s Talk</p>
              </div>
              <div className="d-flex justify-content-start border-start border-dark mt-2">
                <i className="fas fa fa-fa-envelope me-2"></i>
                <p>
                  <i className="fa fa-envelope-open-text"></i>{" "}
                  pewdesk.com@gmail.com
                </p>
              </div>
              <div className="d-flex justify-content-start  border-bottom border-start border-dark mt-2">
                <i className="fas fa fa-fa-phone me-2"></i>
                <p>
                  <i className="fa fa-headset"></i> +0992549875
                </p>
              </div>
              <div
                className="d-flex justify-content-center align-items-center border-start border-bottom border-dark"
                style={{ padding: 1.9 + "rem" }}
              >
                <i className=" fa fa-face-grin-beam-sweat me-4 font-size-20 font-size-14 text-success"></i>
                <i className="fa fa-heart-pulse font-size-14 text-success"></i>
              </div>
            </div>
            {/* end social link */}
          </div>
        </div>
        <p className="text-center mt-5">
          Copyright © 2023 pewdesk.com All Rights Reserved.
        </p>
        <audio
          src={`${process.env.BASE_LINK_URL}/storage/notifications/mixkit-correct-answer-tone-2870.wav`}
          controls
          style={{ height: "2px", opacity: 0 }}
        ></audio>
      </footer>
    </>
  );
}
