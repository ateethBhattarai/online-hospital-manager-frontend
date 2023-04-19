import React from 'react';
import { Avatar, Dropdown, Tooltip, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';
import { GiDoctorFace } from 'react-icons/gi';
import { AiOutlineShoppingCart, AiOutlineHome } from 'react-icons/ai';
import { MdOutlineInventory } from 'react-icons/md';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { useStateContext } from '../Context/ContextProvider';
import { Navigate } from 'react-router-dom';
import axiosClient from '../Services/axios';

const Navbar = () => {
    const { token, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to='/login' />
    }

    const logout = () => {
        axiosClient.post('/logout').then(() => {
            setUser({});
            setToken(null);
            <Navigate to='/login' />
            message = {}.success('Logged Out successfully!!');
        })
    }

    const items = [
        {
            key: '1',
            label: (
                <Link className='text-decoration-none' rel="noopener noreferrer" to='setting'>
                    Setting
                </Link>
            ),
        },
        { type: 'divider' },
        {
            key: '3',
            label: (
                <Link className='text-decoration-none' rel="noopener noreferrer" to="/" onClick={() => logout()}>
                    Log-Out
                </Link>
            ),
        },
    ];
    return (
        <>
            <nav className="navbar navbar-expand navbar-light sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/'>Online H.M.</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fs-4">
                            <li className="nav-item">
                                <Tooltip title="Home">
                                    <Link className="nav-link" to='/patientDashboard'><AiOutlineHome /></Link>
                                </Tooltip>
                            </li>
                            <li className="nav-item">
                                <Tooltip title="Doctors">
                                    <Link className="nav-link" to='/patientDashboard/doctordetails'><GiDoctorFace /></Link>
                                </Tooltip>
                            </li>
                            {/* <li className="nav-item">
                                <Tooltip title="Inventory">
                                    <a className="nav-link" to="#"><MdOutlineInventory /></a>
                                </Tooltip>
                            </li>
                            <li className="nav-item">
                                <Tooltip title="Cart">
                                    <a className="nav-link" to="#"><AiOutlineShoppingCart /></a>
                                </Tooltip>
                            </li> */}
                            <li className="nav-item">
                                <Tooltip title="Chat">
                                    <Link className="nav-link" to="/patientDashboard/chat"><BsFillChatDotsFill /></Link>
                                </Tooltip>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" to="#">
                                    <Dropdown
                                        menu={{
                                            items,
                                        }}
                                        placement="bottomLeft"
                                        arrow
                                        trigger={['click']}
                                    >
                                        <Avatar style={{ cursor: "pointer" }} icon={<UserOutlined />} />
                                    </Dropdown>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar