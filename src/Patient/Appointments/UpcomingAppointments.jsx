import React, { useEffect, useState } from 'react';
import { Empty, Skeleton } from 'antd';
import axiosClient from '../../Services/axios';
import { useStateContext } from '../../Context/ContextProvider';
import Khalti from '../../components/khalti';
import Payment from '../../components/Payment';
import PaymentConfig from '../../components/PaymentConfig';
import config from '../../components/khaltiConfig';

const UpcomingAppointments = () => {
    const [loading, setLoading] = useState(true);
    const { setUser, user } = useStateContext();
    const [upcomingAppointmentsdata, setupcomingAppointmentsdata] = useState();
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [doctorData, setdoctorData] = useState([]);

    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            axiosClient.get('/patient/' + data.id).then((userData) => {
                setUser(userData.data);
            });
        });
    }, []);

    useEffect(() => {
        user.get_patient !== undefined &&
            axiosClient.get('/appointments/upcoming/' + user.get_patient.id).then((res) => {
                setUpcomingAppointments(res.data);
                setupcomingAppointmentsdata(res.data[0]);
            });
    }, [user]);

    useEffect(() => {
        fetchDoctorData();
    }, []);

    const fetchDoctorData = () => {
        axiosClient.get('/doctor/').then((res) => {
            setdoctorData(res.data);
            setLoading(false);
        });
    };

    return (
        <>
            <div className="container-fluid table_data rounded text-light p-4 mt-3 appointment-table">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Date</th>
                            <th>Symptoms</th>
                            <th>Status</th>
                            <th>Doctor Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {!loading ? (
                        <tbody>
                            {upcomingAppointmentsdata !== undefined ? (
                                upcomingAppointments.map((upcomingAppointment, index) => (
                                    <tr key={upcomingAppointment.id}>
                                        <td scope="row">{index + 1}</td>
                                        <td>{upcomingAppointment.visit_date_and_time}</td>
                                        <td>{upcomingAppointment.symptoms}</td>
                                        <td>{upcomingAppointment.validation_status}</td>
                                        {doctorData.map((doctorData) =>
                                            doctorData.get_doctor.id === upcomingAppointment.doctor_id ? (
                                                <React.Fragment key={doctorData.id}>
                                                    <td>{doctorData.full_name}</td>
                                                    {upcomingAppointment.payment_status === 'pending' ? (
                                                        <td>
                                                            <Khalti amount={doctorData.get_doctor.fees * 100} onclick={config.appointmentID = upcomingAppointment.id} />

                                                        </td>
                                                    ) : (
                                                        <td className="text-success">Payment Completed</td>
                                                    )}
                                                </React.Fragment>
                                            ) : null
                                        )}
                                        {localStorage.getItem("payment") && (
                                            <>
                                                <Payment ids={upcomingAppointment.id} />
                                                {localStorage.removeItem("payment")}
                                            </>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>
                                        <Empty />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan={5}>
                                    <Skeleton active />
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </>
    );
};

export default UpcomingAppointments;
