import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ManualRoute from '../Utility/ManualRoute';
import { Navbar } from './Navbar'
import { Card } from 'antd';

export const SignUp = () => {
    const navigate = useNavigate();

    const [patient, setPatient] = useState(true);
    const handlePatientSignup = () => {
        setPatient(!patient);
    }

    const [doctor, setDoctor] = useState(false);
    const handleDoctorSignup = () => {
        setDoctor(!doctor);
    }

    const [pharmacist, setPharmacist] = useState(false);
    const handlePharmacistSignup = () => {
        setPharmacist(!pharmacist);
    }

    const [inputs, setInputs] = useState({});
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const [errorData, setErrorData] = useState();
    const submitForm = () => {
        ManualRoute.post('/patient', inputs).then((res) => {
            navigate('/login');
        }).catch(function (error) {
            if (error.response) {
                setErrorData(error.response.data);
                console.log(error.response.data);
                console.log(error.response.status);
            }
        })
    }

    const options = [
        { value: '', text: '--Choose--' },
        { value: 'O +', text: 'O +' },
        { value: 'O -', text: 'O -' },
        { value: 'A +', text: 'A +' },
        { value: 'A -', text: 'A -' },
        { value: 'B +', text: 'B +' },
        { value: 'B -', text: 'B -' },
        { value: 'AB +', text: 'AB +' },
        { value: 'AB -', text: 'AB -' },
    ];

    const [selected, setSelected] = useState(options[0].value);

    const optionChange = event => {
        setSelected(event.target.value);
    };

    const [photo, setPhoto] = useState();

    const photoChange = event => {
        setPhoto(event.target.value);
    };
    return (
        <>
            <Card
                className="col-sm-6 offset-sm-3 box-shadow p-3 my-3"
                title='SignUp'>
                {/* Patient SignUp */}
                <div className='container mt-2'>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name='full_name'
                            placeholder="full_name"
                            value={inputs.full_name || ""}
                            onChange={handleChange}
                        />
                        <label htmlFor="floatingPassword">Full Name</label>
                        <span className='text-danger'>{errorData?.errors.full_name}</span>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            name='password'
                            placeholder="password"
                            value={inputs.password || ""}
                            onChange={handleChange}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                        <span className='text-danger'>{errorData?.errors.password}</span>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            name='email'
                            placeholder="email"
                            value={inputs.email || ""}
                            onChange={handleChange}
                        />
                        <label htmlFor="floatingPassword">Email</label>
                        <span className='text-danger'>{errorData?.errors.email}</span>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name='address'
                                    placeholder="address"
                                    value={inputs.address || ""}
                                    onChange={handleChange}
                                />
                                <label htmlFor="floatingPassword">Address</label>
                                <span className='text-danger'>{errorData?.errors.address}</span>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-floating mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    name='phone_number'
                                    placeholder="phone_number"
                                    value={inputs.phone_number || ""}
                                    onChange={handleChange}
                                />
                                <label htmlFor="floatingPassword">Phone Number</label>
                                <span className='text-danger'>{errorData?.errors.phone_number}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-floating mb-3 col-md-6">
                            <input
                                type="date"
                                className="form-control"
                                name='dob'
                                placeholder="dob"
                                value={inputs.dob || ""}
                                onChange={handleChange}
                            />
                            <label htmlFor="floatingInput">Date of Birth</label>
                            <span className='text-danger'>{errorData?.errors.dob}</span>
                        </div>
                        <div className="form-group col-md-6">
                            <label >Blood Group</label>
                            <select id="inputState" className="form-control" value={inputs.blood_group = selected || ""} onChange={optionChange}>
                                {options.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                            <span className='text-danger'>{errorData?.errors.blood_group}</span>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <form>
                            <div className="form-group">
                                <label>Select Profile Photo</label>
                                <input
                                    type="file"
                                    className="form-control-file bg-light p-1"
                                    value={inputs.profile_photo = photo || ""}
                                    onChange={photoChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                        <input type="text" className="form-control" name='created_by' value={inputs.created_by = "Self registration"} hidden readOnly />
                    </div>
                    <div className="col-md-6 mb-3">
                        <input type="text" className="form-control" name='modified_by' value={inputs.modified_by = "Self registration"} hidden readOnly />
                    </div>
                </div>
                <button type='button' className="btn btn-secondary" onClick={submitForm}>Sign Up</button>
            </Card >
        </>
    )
}
