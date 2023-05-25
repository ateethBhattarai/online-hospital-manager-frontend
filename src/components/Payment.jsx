import { useState } from 'react';
import axiosClient from '../Services/axios';
import { useStateContext } from '../Context/ContextProvider';
import { useNavigate } from 'react-router-dom';


const Payment = () => {
    const [requests, setRequests] = useState([])
    const { user } = useStateContext();
    let navigate = useNavigate();
    const paymentStatusChange = (ids) => {
        axiosClient.get('/appointment/' + ids).then((res) => {
            const requestData = {
                ...res.data[0],
                'payment_status': 'completed',
                'modified_by': user.full_name
            };
            console.log(requestData)
            axiosClient.put('/appointment/' + requestData.id, requestData).then((res) => {
                navigate('/patientDashboard');
            })
            setRequests(requestData);
        })
    }

    paymentStatusChange();
    localStorage.setItem('payment', 'successfull');

}

export default Payment