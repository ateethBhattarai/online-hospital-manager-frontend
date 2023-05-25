import { Card, message } from 'antd';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { patientPasswordChangeSchema } from '../schemas';
import AccountSetting from './AccountSetting';
import Payment from '../components/Payment';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../Services/axios';
import { useStateContext } from '../Context/ContextProvider';

const initialValues = {
    id: "",
    new_password: "",
    confirm_password: ""
}

const Setting = () => {
    const navigate = useNavigate(); //used for navigation purpose

    const { setUser, user } = useStateContext();
    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            axiosClient.get('/patient/' + data.id).then((userData) => {
                setUser(userData.data);
                initialValues.id = userData.data.id || "";

            })
        })
    },
        [])

    // for password setting
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: patientPasswordChangeSchema,
        onSubmit: (values, action) => {
            console.log(values);
            axiosClient.put('/patient/changePassword/' + initialValues.id, values).then((res) => {
                message.info("Data Updated Successfully!!")
                navigate('/patientDashboard'); //navigates the page to '/patientDashboard'
            }).catch(error => {
                const response = error.response;
                message.error("Error Occured!!");
                console.log(response.data.errors)
            })
            action.resetForm();
        }
    })


    return (
        <>
            {/* For the pupose of managing personal account */}
            <Card className='container my-4' title='Account Setting'>
                <AccountSetting />
            </Card>

            {/* For the purpose of managing password */}
            <Card className='container my-4' title='Password Setting'>
                <form onSubmit={handleSubmit}>
                    {/* <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            name='current_password'
                            placeholder="current_password"
                            value={values.current_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label htmlFor="floatingInput">Current Password</label>
                        {errors.current_password && touched.current_password ? <p className='text-danger'>{errors.current_password}</p> : null}
                    </div> */}
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            name='new_password'
                            placeholder="new_password"
                            value={values.new_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label htmlFor="floatingPassword">New Password</label>
                        {errors.new_password && touched.new_password ? <p className='text-danger'>{errors.new_password}</p> : null}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            name='confirm_password'
                            placeholder="confirm_password"
                            value={values.confirm_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label htmlFor="floatingPassword">Confirm Password</label>
                        {errors.confirm_password && touched.confirm_password ? <p className='text-danger'>{errors.confirm_password}</p> : null}
                    </div>
                    <button className='btn button_color' type='submit'>Update</button>
                </form>
            </Card>
        </>
    )
}

export default Setting