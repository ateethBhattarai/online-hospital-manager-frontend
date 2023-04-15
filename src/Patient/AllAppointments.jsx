import { Card, Divider } from 'antd'
import React from 'react'
import AppointmentsCard from './AppointmentsCard'

const AllAppointments = () => {
    return (
        <>
            <div className="container-md my-3">
                <Card>
                    <Divider orientation="left"><h3>Appointments</h3></Divider>
                    <AppointmentsCard />
                </Card>
            </div>

        </>
    )
}

export default AllAppointments