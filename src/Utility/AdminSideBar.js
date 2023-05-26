import React, { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaCogs, FaHome, FaHospitalAlt, FaSearch } from 'react-icons/fa';
import { IoMdPeople, IoIosPerson } from 'react-icons/io';
import { GiDoctorFace } from 'react-icons/gi';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../Context/ContextProvider';
import axiosClient from '../Services/axios';
import { message } from 'antd';
import { AiOutlineLogout } from 'react-icons/ai';


export const AdminSideBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const routes = [
        {
            path: "/admin",
            name: "Dashboard",
            icon: <FaHome />
        },
        {
            path: "/admin/patient",
            name: "Patient",
            icon: <IoMdPeople />
        },
        {
            path: "/admin/doctor",
            name: "Doctor",
            icon: <GiDoctorFace />
        },
        {
            path: "/admin/pharmacist",
            name: "Pharmacist",
            icon: <IoIosPerson />
        },
        {
            path: "/admin/setting",
            name: "Edit Profile",
            icon: <FaCogs />
        },
    ];



    //logout action
    const { token, setToken, setUser } = useStateContext();
    // if (!token) {
    //     return <Navigate to='/login' />
    // }
    const navigate = useNavigate();
    const logout = () => {
        navigate("/");
        message.success('Logged Out successfully!!');
        axiosClient.post('/logout').then(() => {
            setUser({});
            setToken(null);
        })
    }

    return (
        <div className='d-flex' style={{ position: isOpen }}>
            <motion.div animate={{ width: isOpen ? "210px" : "38px" }} className="sidebar">
                <div className="top_section">
                    {isOpen && <h1 className="logo py-3 fs-4 mt-4">Admin</h1>}
                    <div className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                <section className="routes">
                    {routes.map((route) => (
                        <NavLink
                            to={route.path}
                            key={route.name}
                            className='link text-decoration-none'
                            activeclassname="active"
                        >
                            <div className="icon">{route.icon}</div>
                            <AnimatePresence>
                                {isOpen && <motion.div className="link_text">{route.name}</motion.div>}
                            </AnimatePresence>
                        </NavLink>
                    ))}
                    <div className="link" onClick={() => logout()} style={{ cursor: "pointer" }}>
                        <div className="icon" ><AiOutlineLogout /></div>
                        <AnimatePresence>
                            {isOpen && <motion.div className="link_text">Log Out</motion.div>}
                        </AnimatePresence>
                    </div>
                </section>
            </motion.div>
            <Outlet />
        </div>
    )
}
