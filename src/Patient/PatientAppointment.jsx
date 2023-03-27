import { Empty, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../Context/ContextProvider';
import axiosClient from '../Services/axios';
import { PatientSideBar } from '../Utility/PatientSideBar'

export const Appointment = () => {

    const [loading, setLoading] = useState(false);
    const { token, setUser, user } = useStateContext();
    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            axiosClient.get('/patient/' + data.id).then((userData) => {
                setUser(userData.data);
            })
        })
    }, [])

    const [upcomingAppointmentsdata, setupcomingAppointmentsdata] = useState();
    const [upcomingAppointments, setUpcomingAppointments] = useState([])
    useEffect(() => {
        user.get_patient !== undefined && axiosClient.get('/appointments/upcoming/' + user.get_patient.id).then((res) => {
            setUpcomingAppointments(res.data);
            setupcomingAppointmentsdata(res.data[0]);
        })
    }, [user])


    const [previousAppointments, setPreviousAppointments] = useState([])
    useEffect(() => {
        user.get_patient !== undefined && axiosClient.get('/appointments/previous/' + user.get_patient.id).then((res) => {
            setPreviousAppointments(res.data);
            setLoading(true);
        })
    }, [user])


    const [doctorData, setdoctorData] = useState([])
    useEffect(() => {
        fetchDoctorData();
    }, [])
    const fetchDoctorData = () => {
        axiosClient.get('/doctor/').then((res) => {
            setdoctorData(res.data);
        })
    }




    if (!token) {
        return <Navigate to='/login' />
    }
    return (
        <>
            <PatientSideBar />
            <div className="container text-center box-shadow p-2">
                <h4>Upcoming Appointments</h4>
                <div className='container-fluid table_data rounded text-light p-4 mt-3 appointment-table'>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Date</th>
                                <th>Symptoms</th>
                                <th>Doctor</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        {
                            loading ?
                                <tbody>
                                    {upcomingAppointmentsdata !== undefined ? upcomingAppointments.map((upcomingAppointment, index) => (
                                        <tr key={upcomingAppointment.id}>
                                            <td scope="row">{index + 1}</td>
                                            <td>{upcomingAppointment.visit_date_and_time}</td>
                                            <td>{upcomingAppointment.symptoms}</td>
                                            {doctorData.map((doctorData) => (
                                                doctorData.get_doctor.id === upcomingAppointment.doctor_id &&
                                                <td key={doctorData.id}>{doctorData.full_name}</td>
                                            ))}
                                            <td>{upcomingAppointment.validation_status}</td>
                                        </tr>
                                    )) :
                                        <tr>
                                            <td colSpan={5}><Empty /></td>
                                        </tr>
                                    }
                                </tbody> :
                                <tbody>
                                    <tr>
                                        <td colSpan={5}><Skeleton active /></td>
                                    </tr>
                                </tbody>
                        }
                    </table>
                </div>
            </div>
            <div className="container text-center my-4 box-shadow p-2">
                <h4>Previous Appointments</h4>
                <div className='container-fluid table_data rounded text-light p-4 mt-3 appointment-table'>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Date</th>
                                <th>Symptoms</th>
                                <th>Doctor</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        {loading ?
                            <tbody>
                                {previousAppointments.map((previousAppointment, index) => (
                                    <tr key={previousAppointment.id}>
                                        <td scope="row">{index + 1}</td>
                                        <td>{previousAppointment.visit_date_and_time}</td>
                                        <td>{previousAppointment.symptoms}</td>
                                        {doctorData.map((doctorData) => (
                                            doctorData.get_doctor.id === previousAppointment.doctor_id &&
                                            <td key={doctorData.id}>{doctorData.full_name}</td>
                                        ))}
                                        <td>{previousAppointment.validation_status}</td>
                                    </tr>
                                ))}
                            </tbody> :
                            <tbody>
                                <tr>
                                    <td colSpan={5}><Skeleton active /></td>
                                </tr>
                            </tbody>
                        }
                    </table>
                </div>
            </div>
        </>
    )
}
