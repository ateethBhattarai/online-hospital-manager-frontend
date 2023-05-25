import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../Context/ContextProvider';
import { DoctorSideBar } from '../Utility/DoctorSidebar'
import { Card } from 'antd';
import axiosClient from '../Services/axios';

const Doctor = () => {
    const { token } = useStateContext();


    // useEffect(() => {
    //     axiosClient.get('/user').then(({ data }) => {
    //         axiosClient.get('/doctor/' + data.id).then((userData) => {
    //             setUser(userData.data);
    //         })
    //     })
    // }, [])

    if (!token) {
        return <Navigate to='/login' />
    }


    return (
        <>
            <DoctorSideBar />
            <div className="container-fluid text-center">
                <h1>Doctor Dashboard</h1>
                <div className="d-flex border justify-content-center gap-5">
                    <Card style={{ width: '15rem', height: '10rem' }}>
                        <div className="d-flex justify-content-around">
                            <div className="col-6">
                                <img src="https://lh3.googleusercontent.com/8IO_9yuZqrCwsjBl9LPVpLHpvBJkuD8u5FOFBLCuwmgfLhTnnKHcLCAhrQaIxc_h93C3ESlB8DOIsw1BX1TEph6LpJPb-re1DL9rwVk0" alt="" />
                            </div>
                            <div className="col-5">
                                <h3>Patients</h3>
                                <br />
                                <h5>45</h5>
                            </div>
                        </div>
                    </Card>
                    <Card style={{ width: '24rem', height: '10rem' }}>
                        <div className="d-flex">
                            <div className="col-6">
                                <img src="https://www.shutterstock.com/image-vector/calendar-vector-icon-600w-659999788.jpg" alt=""
                                    style={{
                                        height: "120px"
                                    }} />
                            </div>
                            <div className="col-5">
                                <h3>Appointments</h3>
                                <br />
                                <h5>2</h5>
                            </div>
                        </div>
                    </Card>
                    <Card style={{ width: '15rem', height: '10rem' }}>
                        <div className="d-flex">
                            <div className="col-6">
                                <img src="https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600w-418179856.jpg" alt="" />
                            </div>
                            <div className="col-5">
                                <h3>User</h3>
                                <br />
                                <h5>90</h5>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Doctor