import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../Context/ContextProvider';
import { DoctorSideBar } from '../Utility/DoctorSidebar'
import { Card, Divider } from 'antd';
import axiosClient from '../Services/axios';
import { UserAddOutlined } from '@ant-design/icons';
import { AiOutlinePullRequest, AiOutlineUser } from 'react-icons/ai';
import ChroniChart from './ChroniChart';

const Doctor = () => {
    const { token, user, setUser } = useStateContext();

    //count patient
    const [patients, setPatients] = useState()
    useEffect(() => {
        axiosClient.get('/count/patients').then((res) => {
            setPatients(res.data);
        })
    }, [])

    //count users
    const [users, setUsers] = useState()
    useEffect(() => {
        axiosClient.get('/count/users').then((res) => {
            setUsers(res.data);
        })
    }, [])

    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            axiosClient.get('/doctor/' + data.id).then((userData) => {
                setUser(userData.data);
            })
        })
    }, [])

    //count appointments
    const [appointments, setAppointments] = useState()
    useEffect(() => {
        axiosClient.get('/count/appointments/' + user.id).then((res) => {
            setAppointments(res.data);
        })
    }, [user])



    if (!token) {
        return <Navigate to='/login' />
    }


    return (
        <>
            <div className="container-fluid text-center">
                <h1 className='fs-2 my-4'>Doctor Dashboard</h1>
                <div className="d-flex justify-content-center gap-5">
                    <Card style={{ width: '15rem', height: '10rem' }}>
                        <div className="d-flex justify-content-around">
                            <div className="col-6">
                                <p className='fs-1'>
                                    <UserAddOutlined />
                                </p>
                            </div>
                            <div className="col-5">
                                <h3>Patients</h3>
                                <br />
                                <h5>{patients || "0"}</h5>
                            </div>
                        </div>
                    </Card>
                    <Card style={{ width: '15rem', height: '10rem' }}>
                        <div className="d-flex">
                            <div className="col-6">
                                <p className='fs-1'><AiOutlinePullRequest /></p>
                            </div>
                            <div className="col-5">
                                <h3>Appointments</h3>
                                <br />
                                <h5>{appointments || "0"}</h5>
                            </div>
                        </div>
                    </Card>
                    <Card style={{ width: '15rem', height: '10rem' }}>
                        <div className="d-flex">
                            <div className="col-6">
                                <p className='fs-1'><AiOutlineUser /></p>
                            </div>
                            <div className="col-5">
                                <h3>User</h3>
                                <br />
                                <h5>{users || "0"}</h5>
                            </div>
                        </div>
                    </Card>
                </div>
                <br />
                <br />
                <Divider orientation='left'>Pie Chart</Divider>
                <div className='m-auto w-50'><ChroniChart /></div>
            </div>
        </>
    )
}

export default Doctor