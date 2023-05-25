import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import Features from './Features'
import MainFooter from './MainFooter'

export const LandingPage = () => {
    return (
        <>
            <div className="container-fluid d-flex justify-content-between">
                <Card className="col-5">
                    <img src="https://arstorageazureservices.blob.core.windows.net/site/2019/10/5d9fe2225552d-5d9fe2225556dgestaohospitalar.png.png" alt="Photo" />
                </Card>
                <div className="col-6">
                    <div className="container mt-4">
                        <h2 className='text-center fs-1 my-3'>Online Hospital Manager</h2>
                        <p className='text-center fs-6'>
                            Streamline your hospital operations with our innovative online solution.
                            The Online Hospital Manager is a comprehensive web-based application designed
                            to optimize the management of hospital activities, ensuring a seamless experience
                            for administrators, doctors, pharmacists, and patients.
                        </p>
                        <p className='text-start fs-6'>
                            Experience the power of digitized hospital management. Join us and discover the
                            benefits of a streamlined, efficient, and patient-centric healthcare system with the
                            Online Hospital Manager. Together, let's revolutionize healthcare delivery.
                        </p>
                        <p className='fs-6'>
                            <Link className='text-decoration-none text-primary fs-5' to='/signUp'>Sign up</Link> now and embark on a new era of hospital management excellence!
                        </p>
                    </div>
                </div>
            </div>

            <Features />
            <MainFooter />
        </>
    )
}
