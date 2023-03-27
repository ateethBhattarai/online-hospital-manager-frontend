import React, { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaCogs, FaHome, FaHospitalAlt, FaSearch } from 'react-icons/fa';
import { IoMdPeople, IoIosPerson } from 'react-icons/io';
import { GiDoctorFace } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';


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
            path: "/admin/pharmacy",
            name: "Pharmacy",
            icon: <FaHospitalAlt />
        },
        {
            path: "/admin/setting",
            name: "Edit Profile",
            icon: <FaCogs />
        },
    ];

    return (
        <div className='main_container' style={{ position: isOpen && "fixed" }}>
            <motion.div animate={{ width: isOpen ? "210px" : "38px" }} className="sidebar">
                <div className="top_section">
                    {isOpen && <h1 className="logo py-3">OnlineHospitalManager</h1>}
                    <div className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                <div className="search">
                    <div className="search_icon">
                        <FaSearch />
                    </div>
                    {isOpen && <input type="text" placeholder='Search...' />}
                </div>
                <section className="routes">
                    {routes.map((route) => (
                        <NavLink to={route.path} key={route.name} className='link text-decoration-none'>
                            <div className="icon">{route.icon}</div>
                            <AnimatePresence>
                                {isOpen && <motion.div className="link_text">{route.name}</motion.div>}
                            </AnimatePresence>
                        </NavLink>
                    ))}
                </section>
            </motion.div>
        </div>
    )
}
