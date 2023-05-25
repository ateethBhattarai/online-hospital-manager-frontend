import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Home } from './Home'
import { Login } from './Login'
import { Navbar } from './Navbar'

export const LandingPage = () => {
    return (
        <>
            <div className="container-fluid d-flex justify-content-between">
                <div className="col-5">

                </div>
                <div className="col-6">
                    <div className="container">
                        <h2 className='text-center fs-1'>Online Hospital Manager</h2>
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
        </>
    )
}
