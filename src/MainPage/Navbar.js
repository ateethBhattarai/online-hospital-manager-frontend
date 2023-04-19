import React from 'react'
import { FaBars } from 'react-icons/fa'
import logo from '../Assets/logo.png'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light sticky-top box-shadow mb-2">
                <Link className="navbar-brand px-2" to="/">
                    <div className='logo rounded'>
                        <img className='rounded' src={logo} />
                    </div>
                </Link>
                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation"><FaBars />
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav px-2 ms-auto">
                        <li className="nav-item">
                            <Link to="/login" className="nav-link btn border" href="#">Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
