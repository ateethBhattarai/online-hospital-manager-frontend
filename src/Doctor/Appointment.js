import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react'
import { useStateContext } from '../Context/ContextProvider';
import axiosClient from '../Services/axios';
import { DoctorSideBar } from '../Utility/DoctorSidebar'

export const DoctorAppointments = () => {

    const [loading, setLoading] = useState(false);
    const { token, setUser, user } = useStateContext();
    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            axiosClient.get('/doctor/' + data.id).then((userData) => {
                setUser(userData.data);
            })
        })
    }, [])

    const [upcomingAppointments, setUpcomingAppointments] = useState([])
    useEffect(() => {
        user.get_doctor !== undefined && axiosClient.get('/appointments/doctor/upcoming/' + user.get_doctor.id).then((res) => {
            setUpcomingAppointments(res.data);
            setLoading(true);
        })
    }, [user])

    const [declinedAppointments, setDeclinedAppointments] = useState([])
    useEffect(() => {
        user.get_doctor !== undefined && axiosClient.get('/appointments/doctor/declined/' + user.get_doctor.id).then((res) => {
            setDeclinedAppointments(res.data);
        })
    }, [user])

    const [patientData, setpatientData] = useState([])
    useEffect(() => {
        fetchpatientData();
    }, [])
    const fetchpatientData = () => {
        axiosClient.get('/patient/').then((res) => {
            setpatientData(res.data)
        })
    }
    return (
        <>
            <DoctorSideBar />
            <div className="container text-center box-shadow p-2">
                <h4>Upcoming Appointments</h4>
                <div className='container-fluid table_data rounded text-light p-4 mt-3 appointment-table'>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Date</th>
                                <th>Symptoms</th>
                                <th>Patient</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        {
                            loading ?
                                <tbody>
                                    {upcomingAppointments.map((upcomingAppointment, index) => (
                                        <tr key={upcomingAppointment.id}>
                                            <td scope="row">{index + 1}</td>
                                            <td>{upcomingAppointment.visit_date_and_time}</td>
                                            <td>{upcomingAppointment.symptoms}</td>
                                            {patientData.map((patientData) => (
                                                patientData.get_patient.id === upcomingAppointment.patient_id &&
                                                <td key={patientData.id}>{patientData.full_name}</td>
                                                // console.log(patientData.id)
                                            ))}
                                            <td>{upcomingAppointment.validation_status}</td>
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
            <div className="container text-center box-shadow p-2">
                <h4>Rejected Appointments</h4>
                <div className='container-fluid table_data rounded text-light p-4 mt-3 appointment-table'>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Date</th>
                                <th>Symptoms</th>
                                <th>Patient</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        {
                            loading ?
                                <tbody>
                                    {declinedAppointments.map((declinedAppointment, index) => (
                                        <tr key={declinedAppointment.id}>
                                            <td scope="row">{index + 1}</td>
                                            <td>{declinedAppointment.visit_date_and_time}</td>
                                            <td>{declinedAppointment.symptoms}</td>
                                            {patientData.map((patientData) => (
                                                patientData.get_patient.id === declinedAppointment.patient_id &&
                                                <td key={patientData.id}>{patientData.full_name}</td>
                                                // console.log(patientData.id)
                                            ))}
                                            <td>{declinedAppointment.validation_status}</td>
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
