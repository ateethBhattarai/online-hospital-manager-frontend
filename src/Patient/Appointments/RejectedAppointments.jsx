import React, { useEffect, useState } from 'react'
import { Empty, Skeleton } from 'antd';
import axiosClient from '../../Services/axios';
import { useStateContext } from '../../Context/ContextProvider';

const RejectedAppointments = () => {

    const [loading, setLoading] = useState(true);

    const { token, setUser, user } = useStateContext();
    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            axiosClient.get('/patient/' + data.id).then((userData) => {
                setUser(userData.data);
            })
        })
    }, [])

    const [appointmentReq, setAppointmentReq] = useState([])
    useEffect(() => {
        user.get_patient.id && axiosClient.get('/appointments/patient/cancel/' + user.get_patient.id)
            .then((res) => {
                setAppointmentReq(res.data);
                setLoading(false);
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

    return (
        <>
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
                        !loading ?
                            <tbody>
                                {appointmentReq ? appointmentReq.map((appointmentReq, index) => (
                                    <tr key={appointmentReq.id}>
                                        <td scope="row">{index + 1}</td>
                                        <td>{appointmentReq.visit_date_and_time}</td>
                                        <td>{appointmentReq.symptoms}</td>
                                        {doctorData.map((doctorData) => (
                                            doctorData.get_doctor.id === appointmentReq.doctor_id &&
                                            <td key={doctorData.id}>{doctorData.full_name}</td>
                                        ))}
                                        <td className='text-danger'>{appointmentReq.validation_status}</td>
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
        </>
    )
}

export default RejectedAppointments