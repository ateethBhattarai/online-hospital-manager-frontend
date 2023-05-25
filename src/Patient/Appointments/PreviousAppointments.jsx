import React, { useEffect, useState } from 'react'
import { Empty, Skeleton } from 'antd';
import axiosClient from '../../Services/axios';
import { useStateContext } from '../../Context/ContextProvider';

const PreviousAppointments = () => {

    const [loading, setLoading] = useState(false);

    const { token, setUser, user } = useStateContext();
    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            axiosClient.get('/patient/' + data.id).then((userData) => {
                setUser(userData.data);
            })
        })
    }, [])

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

    return (
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
                                <td className={previousAppointment.validation_status == 'declined' ? 'text-danger' : 'text-success'}>{previousAppointment.validation_status}</td>
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
    )
}

export default PreviousAppointments