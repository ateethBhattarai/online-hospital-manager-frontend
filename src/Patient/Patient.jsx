import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../Context/ContextProvider';
import axiosClient from '../Services/axios';
import { PatientSideBar } from '../Utility/PatientSideBar'
import { Profile } from './Profile'

export const Patient = () => {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to='/login' />
    }

    return (
        <div>
            <PatientSideBar />
            <Profile />
            {/* <div className="container text-center box-shadow">
                <div>
                    <span className='topic-header-patient my-2 p-2'>Previous Appointments</span>
                </div>
                <div className='appointment-dashboard'>
                    <div className="row box-shadow my-3">
                        <div className="col-md-3 col-sm-6">
                            <div className='details'>
                                <span className='topic-header-patient'>26 Nov, 2019</span>
                                <span className='more-details-patient'>9:00 - 10:00</span>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className='details'>
                                <span className='topic-header-patient'>Symptoms</span>
                                <span className='more-details-patient'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, voluptatum?</span>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className='details'>
                                <span className='topic-header-patient'>Doctor</span>
                                <span className='more-details-patient'>Dr. Ateeth Bhattarai</span>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className='details'>
                                <span className='topic-header-patient'>Status</span>
                                <span className='more-details-patient'>Completed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
