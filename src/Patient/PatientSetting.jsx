import { message } from 'antd';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../Context/ContextProvider';
import axiosClient from '../Services/axios';
import { PatientSideBar } from '../Utility/PatientSideBar'

export const PatientSetting = () => {
    let navigate = useNavigate();

    const [inputs, setInputs] = useState({});


    const options = [
        { value: '', text: '--Blood Group--' },
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

    const { setUser, user } = useStateContext();
    const [userid, setuserid] = useState();
    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            axiosClient.get('/patient/' + data.id).then((userData) => {
                setInputs({
                    full_name: userData.data.full_name,
                    email: userData.data.email,
                    address: userData.data.address,
                    phone_number: userData.data.phone_number,
                    dob: userData.data.dob,
                    chronic_disease: userData.data.get_patient.chronic_disease,
                    role: userData.data.role,
                    password: userData.data.password
                });
                setSelected(
                    userData.data.get_patient.blood_group
                );
                setuserid(userData.data.id);
            })
        })
    }, [])


    //handles the changes in the inputs
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const submitForm = () => {
        axiosClient.put('/patient/' + userid, inputs).then((res) => {
            message.success('Account updated successfully!!');
            navigate('/patientDashboard'); //navigates the page to '/patientDashboard'
        })
    }


    return (
        <div>
            <PatientSideBar />
            <div className="container-fluid border text-center text-md-left">
                <div className='container mt-4 box-shadow p-3 mb-2'>
                    <div className="mb-4">
                        <h4>Security Setting</h4>
                    </div>
                    {/* <div className="form-group">
                        <input type="text" className="form-control" placeholder="UserName" />
                    </div> */}
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Confirm Password" />
                    </div>
                    <button className='btn btn-primary mt-2'>Save</button>
                </div>
            </div>
            <div className="container-fluid text-center text-md-left">
                <div className='container mt-4 box-shadow p-3 mb-2'>
                    <div className="mb-4">
                        <h4>Account Setting</h4>
                    </div>
                    <form>
                        <div className="form-group">
                            <input type="text" name="full_name" className="form-control is_valid" placeholder="Full Name" value={inputs.full_name || ""} onChange={handleChange} />
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <input type="email" className="form-control" name='email' placeholder='Email' value={inputs.email || ""} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" className="form-control" name='address' placeholder='Address' value={inputs.address || ""} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <input type="number" className="form-control" name='phone_number' placeholder='Phone Number' value={inputs.phone_number || ""} onChange={handleChange} />
                            </div>
                            <div className="col-md-3 mb-3">
                                <input type="date" className="form-control" name='dob' placeholder='DOB' value={inputs.dob || ""} onChange={handleChange} />
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <select id="inputState" className="form-control" value={inputs.blood_group = selected || ""} onChange={optionChange}>
                                        {options.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.text}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-row mt-2">
                            <div className="col-md-6 mb-3">
                                <input type="text" className="form-control" placeholder='Chronic Disease' name='chronic_disease' value={inputs.chronic_disease || ""} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" className="form-control" placeholder='Modified By' name='modified_by' readOnly />
                            </div>
                        </div>
                        <button type='button' className="btn btn-primary" onClick={submitForm}>Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
