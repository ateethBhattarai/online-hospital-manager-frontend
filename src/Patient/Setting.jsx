import { Card } from 'antd';
import React from 'react';
import { useFormik } from 'formik';
import { patientPasswordChangeSchema } from '../schemas';
import AccountSetting from './AccountSetting';

const initialValues = {
    current_password: "",
    new_password: "",
    confirm_password: ""
}

const Setting = () => {


    // for password setting
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: patientPasswordChangeSchema,
        onSubmit: (values, action) => {
            console.log(values);
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
                    <div className="form-floating mb-3">
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
                    </div>
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