import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../Context/ContextProvider';
import { AdminSideBar } from '../../Utility/AdminSideBar';
import ManualRoute from '../../Utility/ManualRoute';
import SubNav from '../../Utility/SubNav';

export const AddPatient = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const { setNotification } = useStateContext();
    const [errorData, setErrorData] = useState();
    const submitForm = () => {
        ManualRoute.post('/patient', inputs).then((res) => {
            setNotification("Patient Added Successfully!!")
            navigate('/admin/patient');
        }).catch(function (error) {
            if (error.response) {
                setErrorData(error.response.data);
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

    return (
        <>
            <div className="container-fluid">
                {/* <div className='row'>
                    <div><AdminSideBar /></div> */}
                <div className="col-md-10 mx-auto pl-4">
                    <SubNav name="Patient" first_link="/admin/patient" second_link="/admin/addPatient" />
                    <h2 className='mt-2 p-2 text-center'>Add Patient</h2>
                    <div className='container border bg-container text-light p-4 mt-3'>
                        <form>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" name="full_name" value={inputs.full_name || ""} onChange={handleChange} className="form-control is_valid" placeholder="Ateeth Bhattarai" />
                                <span className='text-danger'>{errorData?.errors.full_name}</span>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" value={inputs.password || ""} onChange={handleChange} className="form-control is_valid" placeholder="********" />
                                <span className='text-danger'>{errorData?.errors.password}</span>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label>Email</label>
                                    <input type="email" className="form-control" name='email' value={inputs.email || ""} onChange={handleChange} placeholder='example@gmail.com' />
                                    <span className='text-danger'>{errorData?.errors.email}</span>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >Address</label>
                                    <input type="text" className="form-control" name='address' value={inputs.address || ""} onChange={handleChange} placeholder='Itahari-02, Sunsari' />
                                    <span className='text-danger'>{errorData?.errors.address}</span>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label >Phone Number</label>
                                    <input type="number" className="form-control" name='phone_number' value={inputs.phone_number || ""} onChange={handleChange} placeholder='98123.......' />
                                    <span className='text-danger'>{errorData?.errors.phone_number}</span>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label > DOB</label>
                                    <input type="date" className="form-control" name='dob' value={inputs.dob || ""} onChange={handleChange} placeholder='98123.......' />
                                    <span className='text-danger'>{errorData?.errors.dob}</span>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className="form-group">
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
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label>Created By</label>
                                    <input type="text" className="form-control" name='created_by' value={inputs.created_by = "Admin"} readOnly />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >Modified By</label>
                                    <input type="text" className="form-control" name='modified_by' value={inputs.modified_by = "Admin"} readOnly />
                                </div>
                            </div>
                            <button type='button' className="btn btn-primary" onClick={submitForm}>ADD Patient</button>
                        </form>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </>
    )
}
