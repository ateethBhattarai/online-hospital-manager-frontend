import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useStateContext } from '../Context/ContextProvider';
import { Form, Input, Card, Select, Button, DatePicker, message, Modal, Skeleton } from 'antd';
import axiosClient from '../Services/axios';
import Khalti from '../components/khalti';

const RequestAppointment = () => {
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
            axiosClient.post('/appointment', data).then((res) => {
                navigate('/patientDashboard');
                message.info("Appointment booked!!");
                // localStorage.removeItem('payment');
            }).catch(function (error) {
                if (error.response) {
                    setErrorData(error.response.data);
                    console.log(error.response.status);
                }
            })
        }
        console.log('first')

    };

    const onFinishFailed = () => {
        message.error('Submit Failed! Fill all data first!');
    };

    const fetchDoctorData = () => {
        axiosClient.get('/doctor/').then((res) => {
            setdoctorData(res.data)
        }, [])
    }

    return (
        <>
            <div className="container p-3 text-center text-md-left">
                <Card>
                    <Form onFinish={onFinish}
                        onFinishFailed={onFinishFailed}>
                        <div className="d-md-flex flex-column justify-content-around my-3">
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
                            <Form.Item name="visit_date_and_time" label="Date and Time" {...config}>
                                <DatePicker showTime format="YYYY-MM-DD HH:mm" size="large" />
                            </Form.Item>
                        </div>
                        <Form.Item name="symptoms" label="Symptoms">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item>
                            {/* <Khalti /> */}
                            <Button
                                type="primary"
                                htmlType="submit"
                                size='large'
                                className="login-form-button mx-3"
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    )
}

export default RequestAppointment