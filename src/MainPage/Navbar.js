import React from 'react'
import { FaBars } from 'react-icons/fa'
import logo from '../Assets/logo.png'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light sticky-top box-shadow mb-2">
                <a className="navbar-brand" href="#">
                    <div className='logo rounded'>
                        <img className='rounded' src={logo} />
                    </div>
                </a>
                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation"><FaBars />
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav p-2 m-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" href="#">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Key Features</a>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link" href="#">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signUp" className="nav-link" href="#">SignUp</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
