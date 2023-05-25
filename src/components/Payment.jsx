import { useState } from 'react';
import axiosClient from '../Services/axios';
import { useStateContext } from '../Context/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Payment = (props) => {
    const { user } = useStateContext();
    const navigate = useNavigate();

    const paymentStatusChange = (ids) => {
        axiosClient.get('/appointment/' + ids).then((res) => {
            const requestData = {
                ...res.data[0],
                'payment_status': 'completed',
                'modified_by': user.full_name
            };
            console.log(requestData);
            axiosClient.put('/appointment/' + requestData.id, requestData).then((res) => {
                navigate('/patientDashboard');
            });
        });
    };

    paymentStatusChange(props.ids);

    return null; // or you can return a loading indicator if needed
};

export default Payment;
