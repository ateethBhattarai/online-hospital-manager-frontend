import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaCogs, FaHome } from 'react-icons/fa';
import { TbCheckupList, TbGitPullRequest } from 'react-icons/tb'
import { BiMessageRoundedDetail } from 'react-icons/bi'
import { AiOutlineLogout } from 'react-icons/ai'
import { NavLink, useNavigate } from 'react-router-dom';
import axiosClient from '../Services/axios';
import { useStateContext } from '../Context/ContextProvider';
import { message } from 'antd';


export const PatientSideBar = () => {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    //logout action
    const { setToken, setUser } = useStateContext();
    const logout = () => {
        axiosClient.post('/logout').then(() => {
            setUser({});
            setToken(null);
            navigate('/login');
            message.success('Logged Out successfully!!');
        })
    }

    const routes = [
        {
            path: "/patientDashboard",
            name: "Dashboard",
            icon: <FaHome />
        },
        {
            path: "/patientAppointment",
            name: "Appointment",
            icon: <TbCheckupList />
        },
        {
            path: "/patientBookAppointment",
            name: "Request",
            icon: <TbGitPullRequest />
        },
        {
            path: "/patient/chat",
            name: "Chat",
            icon: <BiMessageRoundedDetail />
        },
        {
            path: "/patientSetting",
            name: "Edit Profile",
            icon: <FaCogs />
        }
    ];

    return (
        <div className='main_container border' style={{ position: isOpen && "fixed" }}>
            <motion.div animate={{ width: isOpen ? "210px" : "38px" }} className="sidebar">
                <div className="top_section">
                    {isOpen && <h1 className="logo py-3">OnlineHospitalManager</h1>}
                    <div className="bars">
                        <FaBars onClick={toggle} />
                    </div>
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
                    <div className="link" onClick={logout} style={{ cursor: "pointer" }}>
                        <div className="icon" ><AiOutlineLogout /></div>
                        <AnimatePresence>
                            {isOpen && <motion.div className="link_text">Log Out</motion.div>}
                        </AnimatePresence>
                    </div>
                </section>
            </motion.div>
        </div >
    )
}
