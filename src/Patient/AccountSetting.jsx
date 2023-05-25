import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { patientAccountChangeSchema } from '../schemas';
import { useStateContext } from '../Context/ContextProvider';
import axiosClient from '../Services/axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const accountData = {
    id: "",
    full_name: "",
    address: "",
    dob: "",
    phone_number: "",
    chronic_disease: "",
    blood_group: "",
    email: ""

}



const AccountSetting = () => {
    const navigate = useNavigate(); //used for navigation purpose

    const { setUser, user } = useStateContext();
    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            axiosClient.get('/patient/' + data.id).then((userData) => {
                setUser(userData.data);
                accountData.id = userData.data.id || "";
                accountData.full_name = userData.data.full_name || "";
                accountData.address = userData.data.address || "";
                accountData.dob = userData.data.dob || "";
                accountData.phone_number = userData.data.phone_number || "";
                accountData.chronic_disease = userData.data.get_patient.chronic_disease || "";
                accountData.blood_group = userData.data.get_patient.blood_group || "";
                accountData.email = userData.data.email || "";
                accountData.created_by = userData.data.created_by || "";
                accountData.modified_by = userData.data.modified_by || "";
            })
        })
    }, [])

    // for account setting
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: accountData,
        validationSchema: patientAccountChangeSchema,
        onSubmit: (values, action) => {
            console.log(values);
            axiosClient.put('/patient/' + accountData.id, values).then((res) => {
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
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name='email'
                        readOnly
                        value={user.email || ""}
                    />
                    <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name='full_name'
                        placeholder="full_name"
                        value={values.full_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <label htmlFor="floatingInput">Full Name</label>
                    {errors.name && touched.name ? <p className='text-danger'>{errors.name}</p> : null}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name='address'
                        placeholder="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <label htmlFor="floatingInput">Address</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="date"
                        className="form-control"
                        name='dob'
                        placeholder="dob"
                        value={values.dob}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <label htmlFor="floatingInput">Date of Birth</label>
                    {errors.dob && touched.dob ? <p className='text-danger'>{errors.dob}</p> : null}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name='phone_number'
                        placeholder="phone"
                        value={values.phone_number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <label htmlFor="floatingInput">Phone Number</label>
                    {errors.phone_number && touched.phone_number ? <p className='text-danger'>{errors.phone_number}</p> : null}
                </div>
                {/* <div className="form-floating mb-3">
                    <select className="form-select" id="floatingSelectGrid" aria-label="Floating label select example" defaultValue={values.blood_group}>
                        <option selected>Select Blood Group</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>
                    <label htmlFor="floatingSelectGrid">Blood Group</label>
                </div> */}
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name='chronic_disease'
                        placeholder="Diabaties"
                        value={values.chronic_disease}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <label htmlFor="floatingInput">Chronic Disease</label>
                    {errors.chronic_disease && touched.chronic_disease ? <p className='text-danger'>{errors.chronic_disease}</p> : null}
                </div>
                <button className='btn button_color' type='submit'>Update</button>
            </form>
        </>
    )
}

export default AccountSetting