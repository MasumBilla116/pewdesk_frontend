import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import { useEffect } from 'react'
import Header from "./../components/Header"
import Aside from "./../components/Aside"
import ToggleOption from "./../components/ToggleOption"
import Footer from "./../components/Footer"


export default function Messages() {
    return (
        <>
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Settings</title>
            </Head>

            <ToggleOption />
            <div className="erp-container erp-bg-front">

                <div className="erp-container-fluid">
                    <div className="erp-page-body d-lg-flex">
                        {/* Start aside */}
                        <Aside />
                        {/* end aside */}
                        <main className="erp-main text-secondary">
                            <div className="all-content-wraper">
                                {/* start header */}
                                <Header />
                                {/* end header */}
                                {/*<!-- start your code -->*/}
                                <div className="container-fluid pt-3 pb-3 dashboard-content">
                                    {/* <!-- start  code --> */}
                                    <div className="container">
                                        <div className="row">
                                            {/*<!--start messages -->*/}
                                            <div className="col-lg-12 mb-5">
                                                <div className="card mb-3 shadow-dark border-secondary erp-bg-front-darkblue">
                                                    <div className="row g-0">
                                                        <div className="col-md-4 overflow-hidden">
                                                            <Link href="#">
                                                                <Image width={500} height={500} src="/images/user-300x300.jpg"
                                                                    className="img-fluid rounded-start w-100 h-100 organization-img"
                                                                    alt="organization" />
                                                            </Link>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="card-body">
                                                                <Link href="#">
                                                                    <h5 className="card-title">Delta Computer Science College</h5>
                                                                </Link>
                                                                <p className="card-text">This is a wider card with supporting text below
                                                                    as a natural lead-in to additional content. This content is a
                                                                    little bit longer. Lorem ipsum dolor sit amet consectetur
                                                                    adipisicing elit. Saepe illo incidunt suscipit ipsam minima
                                                                    facilis doloremque ipsa cupiditate impedit aut amet delectus
                                                                    quidem ad tempora dolor et assumenda, exercitationem molestias!
                                                                </p>
                                                                <p className="card-text"><small className="text-muted">Last updated 3 mins
                                                                    ago</small></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<!-- end messages -->*/}
                                            {/*<!--start messages -->*/}
                                            <div className="col-lg-12 mb-5">
                                                <div className="card mb-3 shadow-dark border-secondary erp-bg-front-darkblue">
                                                    <div className="row g-0">
                                                        <div className="col-md-4 overflow-hidden">
                                                            <Link href="#">
                                                                <Image width={500} height={500} src="/images/user-300x300.jpg"
                                                                    className="img-fluid rounded-start w-100 h-100 organization-img"
                                                                    alt="organization" />
                                                            </Link>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="card-body">
                                                                <Link href="#">
                                                                    <h5 className="card-title">Delta Computer Science College</h5>
                                                                </Link>
                                                                <p className="card-text">This is a wider card with supporting text below
                                                                    as a natural lead-in to additional content. This content is a
                                                                    little bit longer. Lorem ipsum dolor sit amet consectetur
                                                                    adipisicing elit. Saepe illo incidunt suscipit ipsam minima
                                                                    facilis doloremque ipsa cupiditate impedit aut amet delectus
                                                                    quidem ad tempora dolor et assumenda, exercitationem molestias!
                                                                </p>
                                                                <p className="card-text"><small className="text-muted">Last updated 3 mins
                                                                    ago</small></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- end messages --> */}
                                        </div>
                                    </div>

                                    {/* <!-- end  code --> */}
                                </div>
                                {/* end your code */}
                            </div>
                            {/*<!-- start footer -->*/}
                            <Footer />
                            {/*<!-- end footer -->*/}
                        </main>
                    </div>
                </div>
            </div>


        </>
    )
}
