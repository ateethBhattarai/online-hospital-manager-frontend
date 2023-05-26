import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../Context/ContextProvider';
import axiosClient from '../Services/axios';
import { Card } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
    const [input, setInput] = useState({});
    const [userRole, setuserRole] = useState('patient');

    const navigate = useNavigate();
    const { token, setUser, setToken, setNotification, notification } = useStateContext();

    useEffect(() => {
        if (token) {
            return navigate(`/${input.role}`);
        }
    }, [])

    const handleChanges = (e) => { //e=events
        const name = e.target.name;
        const value = e.target.value;
        setInput(values => ({ ...values, [name]: value }));
    }


    const submitForm = () => {
        axiosClient.post('/login', input).then(({ data }) => {
            setUser(data.user);
            setToken(data.token);
            navigate(`/${input.role}`);
            console.log(data)
        }).catch(error => {
            const response = error.response;
            toast.error("Invalid Credential !");

            if (response && response.status === 422) {
                console.log(response.data.errors)
            }
        })
    }

    const patientRole = () => {
        setuserRole('patient');
    }
    const doctorRole = () => {
        setuserRole('doctor');
    }
    const adminRole = () => {
        setuserRole('admin');
    }
    const pharmacistRole = () => {
        setuserRole('pharmacist');
    }
    return (
        <>
            <Card className='col-sm-6 offset-sm-3 border mt-4 p-2'>
                {/* {message.error("Error Occured!")} */}
                <div className="my-4">
                    <div className="d-flex">
                        <h2 className='mx-2'>Login as:</h2>
                        <button className='btn btn-outline-primary' onClick={patientRole}>Patient</button>
                        &nbsp;
                        <button className='btn btn-outline-primary' onClick={doctorRole}>Doctor</button>
                        &nbsp;
                        <button className='btn btn-outline-primary' onClick={pharmacistRole}>Pharmacist</button>
                        &nbsp;
                        <button className='btn btn-outline-primary' onClick={adminRole}>Admin</button>
                    </div>
                </div>
                <h1 className='my-4 text-capitalize'>{userRole} Login!</h1>
                <input type="email" name='email' className="form-control my-2" value={input.email || ""} onChange={handleChanges} placeholder='email' />
                <input type="password" name='password' className="form-control my-2" value={input.password || ""} onChange={handleChanges} placeholder='password' />
                <input type="text" value={input.role = userRole} hidden readOnly />
                <button className='btn btn-primary my-2' onClick={submitForm}>Login</button>
                <p>New Here? <Link className='text-primary text-decoration-none' to='/signUp'> SignUp</Link></p>
            </Card>
            <ToastContainer />
        </>
    )
}
