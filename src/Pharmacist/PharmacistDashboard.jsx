import React from 'react'
import { PharmacistSideBar } from '../Utility/PharmacistSideBar'
import { Card } from 'antd'

const PharmacistDashboard = () => {
    return (
        <>
            <PharmacistSideBar />
            <div className="container-fluid text-center">
                <h1>Pharmacist Dashboard</h1>
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
                    <Card style={{ width: '18rem', height: '10rem' }}>
                        <div className="d-flex">
                            <div className="col-6">
                                <img src="https://www.shutterstock.com/image-vector/inventory-control-icon-monochrome-simple-600w-2179649413.jpg" alt=""
                                    style={{
                                        height: "120px"
                                    }} />
                            </div>
                            <div className="col-5">
                                <h3>Inventory</h3>
                                <br />
                                <h5>113</h5>
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

export default PharmacistDashboard