import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useStateContext } from '../Context/ContextProvider';
import { PatientSideBar } from '../Utility/PatientSideBar';
import { Form, Input, Card, Select, Button, DatePicker, message, Modal, Skeleton } from 'antd';
import axiosClient from '../Services/axios';
import Khalti from '../components/khalti';



export const RequestAppointment = () => {

    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [doctorData, setdoctorData] = useState([]);

    useEffect(() => {
        fetchDoctorData();
    }, [])

    const { setUser, user } = useStateContext();
    const [errorData, setErrorData] = useState();

    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            axiosClient.get('/patient/' + data.id).then((userData) => {
                setUser(userData.data);
            })
        })
    }, [])


    const [requests, setRequests] = useState([])
    const cancelAppointment = (ids) => {
        user.get_patient && axiosClient.get('/appointment/' + ids).then((res) => {
            const requestData = {
                ...res.data[0],
                'validation_status': 'cancel'
            };
            axiosClient.put('/appointment/' + requestData.id, requestData).then((res) => {
                // navigate('/patientDashboard');
                message.success('Appointment cancelled successfully!!')
                console.log(res.data)
            })
            setRequests(requestData);
        })
    }

    const config = {
        rules: [
            {
                type: 'object',
                required: true,
                message: 'Please select appointment date and time!',
            },
        ],
    };

    let appointmentData = {};
    const onFinish = (values) => {
        const data = {
            ...values,
            'doctor_id': values['doctor_id'],
            'visit_date_and_time': values['visit_date_and_time'].format('YYYY-MM-DD HH:mm'),
            'patient_id': user.get_patient.id,
            'created_by': user.full_name,
            'modified_by': user.full_name
        }
        appointmentData = data;
        setIsModalOpen(true);
        {
            localStorage.getItem('payment') ? axiosClient.post('/appointment', data).then((res) => {
                navigate('/patientAppointment');
                localStorage.removeItem('payment');
            }).catch(function (error) {
                if (error.response) {
                    setErrorData(error.response.data);
                    console.log(error.response.status);
                }
            }) :
                message.warning('Do payment before booking appointment!!')
        }
        console.log('first')

    };


    const [appointmentReq, setAppointmentReq] = useState([])
    useEffect(() => {
        user.get_patient && axiosClient.get('/patient/pendingAppointment/' + user.get_patient.id)
            .then((res) => {
                setAppointmentReq(res.data);
                setLoading(true);
            })
    }, [user])

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    const { token } = useStateContext();
    if (!token) {
        return <Navigate to='/login' />
    }

    const fetchDoctorData = () => {
        axiosClient.get('/doctor/').then((res) => {
            setdoctorData(res.data)
        }, [])
    }



    return (
        <>
            <PatientSideBar />
            <div className="container p-3 text-center text-md-left">
                <Card title='Appointment Details' className='box-shadow'>
                    <Form onFinish={onFinish}
                        onFinishFailed={onFinishFailed}>
                        <div className="d-md-flex justify-content-around my-3">
                            <div className="col-md-4">
                                <Form.Item
                                    name="doctor_id"
                                    label="Doctor"
                                    rules={[{ required: true, message: 'Select doctor here' }]}
                                >
                                    <Select placeholder="Select the consulting Doctor" size="large">
                                        {doctorData.map((doctorData) => (
                                            <Select.Option key={doctorData.id} value={doctorData.get_doctor.id}>{doctorData.full_name}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="col-md-6">
                                <Form.Item name="visit_date_and_time" label="Date and Time" {...config}>
                                    <DatePicker showTime format="YYYY-MM-DD HH:mm" size="large" />
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item name="symptoms" label="Symptoms">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item>
                            <Khalti />
                            <Button
                                type="primary"
                                htmlType="submit"
                                size='large'
                                className="login-form-button mx-3"
                            >
                                Submit
                            </Button>

                            {/* <Modal title="Make payment before the appointment booking!"
                                open={isModalOpen}
                                onOk={onFinish}
                                onCancel={handleCancel}
                                footer={[
                                    <Button key="back" onClick={handleCancel}>
                                        Return
                                    </Button>,
                                    <Button key="submit" disabled type="primary" onClick={handleOk}>
                                        Submit
                                    </Button>,
                                ]}
                            >
                                <p>Use Khalti</p>
                                <Khalti />
                            </Modal> */}
                        </Form.Item>
                    </Form>
                </Card>
            </div>
            <div className="container text-center my-4  box-shadow p-2">
                <h4>Request Table</h4>
                <div className='container-fluid table_data rounded text-light p-4 mt-3 appointment-table'>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Date</th>
                                <th>Symptoms</th>
                                <th>Doctor</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {loading ?
                            <tbody>
                                {appointmentReq.map((requestData, index) => (
                                    <tr key={requestData.id}>
                                        <td scope="row">{index + 1}</td>
                                        <td>{requestData.visit_date_and_time}</td>
                                        <td>{requestData.symptoms}</td>
                                        {doctorData.map((doctorData) => (
                                            doctorData.get_doctor.id === requestData.doctor_id &&
                                            <td key={doctorData.id}>{doctorData.full_name}</td>
                                        ))}
                                        <td>{requestData.validation_status}</td>
                                        <td><button className='btn btn-danger' onClick={() => cancelAppointment(requestData.id)}>Cancel</button></td>
                                    </tr>
                                ))}
                            </tbody> :
                            <tbody>
                                <tr>
                                    <td colSpan={6}><Skeleton active /></td>
                                </tr>
                            </tbody>
                        }
                    </table>
                </div>
            </div>
        </>
    )
}
