import React from 'react'
import AllAppointments from './AllAppointments'
// import DoctorCards from './DoctorDetails'
// import InventoryCards from './InventoryCards'
// import Navbar from './Navbar'
import Welcome from './Welcome'

const PatientDashboard = () => {
    return (
        <>
            <Welcome />
            {/* <InventoryCards /> */}
            {/* <DoctorCards /> */}
            <AllAppointments />
        </>
    )
}

export default PatientDashboard