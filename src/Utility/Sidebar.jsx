import React from 'react';
import { NavLink } from 'react-router-dom';
import { sidebarData } from './SidebarData';
import logo from '../Assets/logo.png';
import './Sidebar.css';

const Sidebar = () => {
    const activeMenu = true;
    const activeLink = 'd-flex text-center align-items-center mx-3 text-capitalize bg-secondary text-light text-decoration-none';
    const normalLink = 'd-flex text-center align-items-center m-3 text-capitalize text-secondary text-dark text-decoration-none';
    return (
        <div className='mainsidebar box-shadow'>
            <div>
                {activeMenu && (
                    <>
                        <div className="d-flex justify-content-center">
                            <NavLink to="/admin/dashboard" onClick={() => { }} className="d-flex align-items-center justify-content-around w-100 font-weight-bold text-decoration-none text-dark">
                                <img className='rounded p-2' src={logo} alt="" />
                                <span>Online Hospital Manager</span>
                            </NavLink>
                        </div>
                    </>)}
            </div>
            <hr />
            <div className="mt-3 mx-3">
                {sidebarData.map((item) => (
                    <div key={item.title}>
                        <p className='my-2 text-secondary text-uppercase'>{item.title}</p>
                        {item.links.map((link) => (
                            <NavLink
                                to={link.path ? (link.path) : '#'}
                                key={link.name}
                                className={({ isActive }) => isActive ? activeLink : normalLink}
                            >
                                {link.icon}
                                <span className='mx-3'>{link.name}</span>
                            </NavLink>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar