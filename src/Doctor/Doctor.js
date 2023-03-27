import React from 'react'
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../Context/ContextProvider';
import { DoctorSideBar } from '../Utility/DoctorSidebar'

const Doctor = () => {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to='/login' />
    }
    return (
        <>
            <DoctorSideBar />
            <div className="container-fluid text-center">
                <h1>DoctorDashboard!!</h1>
            </div>
        </>
    )
}

export default Doctor