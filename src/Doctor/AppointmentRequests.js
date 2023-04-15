import { Card, Empty, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../Context/ContextProvider';
import axiosClient from '../Services/axios';
import { DoctorSideBar } from '../Utility/DoctorSidebar';

const AppointmentRequests = () => {
    const [patient, setPatient] = useState([]);
    const [appointment, setAppointment] = useState([]);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointmentData();
    }, [])

    const fetchAppointmentData = () => {
        axiosClient.get('/patient').then((res) => {
            setPatient(res.data);
        })

        axiosClient.get('/appointment').then((res) => {
            setAppointment(res.data.patient);
            setLoading(false);
        })

    }

    const { token, setUser, user } = useStateContext();
    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            axiosClient.get('/doctor/' + data.id).then((userData) => {
                setUser(userData.data);
            })
        })
    }, [])

    const [upcomingPendingAppointments, setUpcomingPendingAppointments] = useState([])
    useEffect(() => {
        user.get_doctor !== undefined && axiosClient.get('/appointments/doctor/previous/' + user.get_doctor.id).then((res) => {
            setUpcomingPendingAppointments(res.data);
        })
    }, [user])


    const [patientData, setPatientData] = useState([])
    useEffect(() => {
        fetchPatientData();
    }, [])
    const fetchPatientData = () => {
        axiosClient.get('/patient/').then((res) => {
            setPatientData(res.data)
        })
    }

    const [requests, setRequests] = useState([])
    let navigate = useNavigate();
    const approveAppointment = (ids) => {
        user.get_doctor && axiosClient.get('/appointment/' + ids).then((res) => {
            const requestData = {
                ...res.data[0],
                'validation_status': 'approved',
                'modified_by': user.full_name
            };
            console.log(requestData)
            axiosClient.put('/appointment/' + requestData.id, requestData).then((res) => {
                navigate('/doctorAppointment');
            })
            setRequests(requestData);
        })
    }

    const rejectAppointment = (ids) => {
        user.get_doctor && axiosClient.get('/appointment/' + ids).then((res) => {
            const requestData = {
                ...res.data[0],
                'validation_status': 'declined',
                'modified_by': user.full_name
            };
            console.log(requestData)
            axiosClient.put('/appointment/' + requestData.id, requestData).then((res) => {
                navigate('/doctorAppointment');
            })
            setRequests(requestData);
        })
    }

    return (
        <>
            <DoctorSideBar />
            <Card className="container text-center box-shadow p-2">
                <h4>Request Table</h4>
                <div className='container-fluid table_data rounded text-light p-4 mt-3 '>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Patient Name</th>
                                <th>Date</th>
                                <th>Symptoms</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {
                            !loading ?
                                <tbody>
                                    {!upcomingPendingAppointments ? upcomingPendingAppointments.map((upcomingPendingAppointment, index) => (
                                        <tr key={upcomingPendingAppointment.id}>
                                            <td scope='row'>{index + 1}</td>
                                            {patientData.map((patientData) => (
                                                patientData.get_patient.id === upcomingPendingAppointment.patient_id &&
                                                <td key={patientData.id}>{patientData.full_name || ""}</td>
                                            ))}
                                            <td>{upcomingPendingAppointment.visit_date_and_time}</td>
                                            <td>{upcomingPendingAppointment.symptoms}</td>
                                            <td>{upcomingPendingAppointment.validation_status}</td>
                                            <td>
                                                <button className='btn btn-success' onClick={() => approveAppointment(upcomingPendingAppointment.id)}>Approve</button>
                                                &nbsp;
                                                <button className='btn btn-danger' onClick={() => rejectAppointment(upcomingPendingAppointment.id)}>Reject</button>
                                            </td>
                                        </tr>
                                    )) :
                                        <tr>
                                            <td colSpan={6}><Empty /></td>
                                        </tr>
                                    }
                                </tbody> :
                                <tbody>
                                    <tr>
                                        <td colSpan={6}><Skeleton active /></td>
                                    </tr>
                                </tbody>
                        }
                    </table>
                </div>
            </Card>
        </>
    )
}

export default AppointmentRequests