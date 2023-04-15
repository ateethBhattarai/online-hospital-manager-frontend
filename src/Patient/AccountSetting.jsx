import React from 'react';
import { useFormik } from 'formik';
import { patientAccountChangeSchema } from '../schemas';

const accountData = {
    name: "",
    address: "",
    dob: "",
    phone_number: "",
    blood_group: "",
    chronic_disease: ""
}

const AccountSetting = () => {

    // for account setting
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: accountData,
        validationSchema: patientAccountChangeSchema,
        onSubmit: (values, action) => {
            console.log(values);
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
                        placeholder="test@gmail.com"
                        value='ateeth.myname@gmail.com'
                    />
                    <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name='name'
                        placeholder="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <label htmlFor="floatingInput">Name</label>
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
                <div class="form-floating mb-3">
                    <select class="form-select" id="floatingSelectGrid" aria-label="Floating label select example">
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
                    <label for="floatingSelectGrid">Blood Group</label>
                </div>
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