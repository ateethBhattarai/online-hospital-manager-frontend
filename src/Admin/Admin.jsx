import React, { useEffect, useState } from 'react'
import { useStateContext } from '../Context/ContextProvider';
import { Card, Divider } from 'antd';
import axiosClient from '../Services/axios';
import { UserAddOutlined } from '@ant-design/icons';
import { AiOutlinePullRequest, AiOutlineUser } from 'react-icons/ai';
import { GiDoctorFace, GiPlagueDoctorProfile } from 'react-icons/gi';
import { MdOutlineInventory } from 'react-icons/md';
import BarChart from './AdminCharts/BarChart';

const Admin = () => {
    const { user, setUser } = useStateContext();

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

    //count appointments
    const [doctors, setDoctors] = useState()
    useEffect(() => {
        axiosClient.get('/count/doctors/').then((res) => {
            setDoctors(res.data);
        })
    }, [])

    //count pharmacists
    const [pharmacists, setPharmacist] = useState()
    useEffect(() => {
        axiosClient.get('/count/pharmacists/').then((res) => {
            setPharmacist(res.data);
        })
    }, [])

    //count appointments
    const [appointments, setAppointments] = useState()
    useEffect(() => {
        axiosClient.get('/count/appointments/').then((res) => {
            setAppointments(res.data);
        })
    }, [])

    //count inventory items
    const [items, setItems] = useState()
    useEffect(() => {
        axiosClient.get('/count/inventoryItems/').then((res) => {
            setItems(res.data);
        })
    }, [])


    return (
        <>
            <div className="container-fluid text-center">
                <h1 className='fs-2 my-4'>Admin Dashboard</h1>
                <div className="d-flex justify-content-center gap-5 flex-wrap">
                    <Card style={{ width: '15rem', height: '10rem' }}>
                        <div className="d-flex justify-content-around">
                            <div className="col-6">
                                <p className='fs-1'>
                                    <UserAddOutlined />
                                </p>
                            </div>
                            <div className="col-5">
                                <h3>Total Patients</h3>
                                <br />
                                <h5>{patients || "0"}</h5>
                            </div>
                        </div>
                    </Card>
                    <Card style={{ width: '15rem', height: '10rem' }}>
                        <div className="d-flex">
                            <div className="col-6">
                                <p className='fs-1'><GiDoctorFace /></p>
                            </div>
                            <div className="col-5">
                                <h3>Total Doctors</h3>
                                <br />
                                <h5>{doctors || "0"}</h5>
                            </div>
                        </div>
                    </Card>
                    <Card style={{ width: '15rem', height: '10rem' }}>
                        <div className="d-flex">
                            <div className="col-6">
                                <p className='fs-1'><GiPlagueDoctorProfile /></p>
                            </div>
                            <div className="col-5">
                                <h3>Total Pharmacists</h3>
                                <br />
                                <h5>{pharmacists || "0"}</h5>
                            </div>
                        </div>
                    </Card>
                    <Card style={{ width: '15rem', height: '10rem' }}>
                        <div className="d-flex">
                            <div className="col-6">
                                <p className='fs-1'><AiOutlineUser /></p>
                            </div>
                            <div className="col-5">
                                <h3>Total Users</h3>
                                <br />
                                <h5>{users || "0"}</h5>
                            </div>
                        </div>
                    </Card>
                    <Card style={{ width: '15rem', height: '10rem' }}>
                        <div className="d-flex">
                            <div className="col-6">
                                <p className='fs-1'><AiOutlinePullRequest /></p>
                            </div>
                            <div className="col-5">
                                <h3>Total Appoinments</h3>
                                <br />
                                <h5>{appointments || "0"}</h5>
                            </div>
                        </div>
                    </Card>
                    <Card style={{ width: '15rem', height: '10rem' }}>
                        <div className="d-flex">
                            <div className="col-6">
                                <p className='fs-1'><MdOutlineInventory /></p>
                            </div>
                            <div className="col-5">
                                <h3>Total Inventory Items</h3>
                                <br />
                                <h5>{items || "0"}</h5>
                            </div>
                        </div>
                    </Card>
                </div>
                <br />
                <br />
                <Divider orientation='left'>Charts</Divider>
                <div className='m-auto w-50'><BarChart /></div>

            </div>
        </>
    )
}

export default Admin