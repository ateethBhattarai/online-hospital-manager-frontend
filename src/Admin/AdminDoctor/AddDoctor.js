import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../Context/ContextProvider';
import { AdminSideBar } from '../../Utility/AdminSideBar';
import ManualRoute from '../../Utility/ManualRoute';
import SubNav from '../../Utility/SubNav'

export const AddDoctor = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const [errorData, setErrorData] = useState();
    const { setNotification } = useStateContext();
    const submitForm = () => {
        ManualRoute.post('/doctor', inputs).then((res) => {
            setNotification("Doctor Updated Successfully!!");
            navigate('/admin/doctor');
        }).catch(function (error) {
            if (error.response) {
                setErrorData(error.response.data);
                console.log(errorData.errors);
                console.log(error.response.status);
            }
        })
    }

    return (
        <>
            <div className="container-fluid">
                {/* <div className='row'>
                    <div><AdminSideBar /></div> */}
                <div className="col-md-10 mx-auto pl-4">
                    <SubNav name="Doctor" first_link="/admin/doctor" second_link="/admin/addDoctor" />
                    <h2 className='mt-2 p-2 text-center'><u>Add doctor</u></h2>
                    <div className='container border bg-container text-light p-4 mt-3'>
                        <form>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" name="full_name" value={inputs.full_name || ""} onChange={handleChange} className="form-control is_valid" placeholder="Ateeth Bhattarai" required />
                                <span className='text-danger'>{errorData?.errors.full_name}</span>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" value={inputs.password || ""} onChange={handleChange} className="form-control is_valid" placeholder="********" required />
                                <span className='text-danger'>{errorData?.errors.password}</span>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label>Email</label>
                                    <input type="email" className="form-control" name='email' value={inputs.email || ""} onChange={handleChange} placeholder='example@gmail.com' required />
                                    <span className='text-danger'>{errorData?.errors.email}</span>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >Address</label>
                                    <input type="text" className="form-control" name='address' value={inputs.address || ""} onChange={handleChange} placeholder='Itahari-02, Sunsari' required />
                                    <span className='text-danger'>{errorData?.errors.address}</span>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label >Phone Number</label>
                                    <input type="number" className="form-control" name='phone_number' value={inputs.phone_number || ""} onChange={handleChange} placeholder='98123.......' required />
                                    <span className='text-danger'>{errorData?.errors.phone_number}</span>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label > DOB</label>
                                    <input type="date" className="form-control" name='dob' value={inputs.dob || ""} onChange={handleChange} placeholder='98123.......' required />
                                    <span className='text-danger'>{errorData?.errors.dob}</span>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className="form-group">
                                        <label >Qualification</label>
                                        <input type="text" className="form-control" name='qualification' value={inputs.qualification || ""} onChange={handleChange} placeholder='qualification...' required />
                                        <span className='text-danger'>{errorData?.errors.qualification}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label>Speciality</label>
                                    <input type="text" className="form-control" name='speciality' value={inputs.speciality || ""} onChange={handleChange} placeholder='speciality...' required />
                                    <span className='text-danger'>{errorData?.errors.speciality}</span>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label >Available Time</label>
                                    <input type="date" className="form-control" name='availability_time' value={inputs.availability_time || ""} onChange={handleChange} placeholder='doctor available time...' required />
                                    <span className='text-danger'>{errorData?.errors.availability_time}</span>
                                </div>
                                <div className="col-md-2 mb-3">
                                    <label >Fees</label>
                                    <input type="number" className="form-control" name='fees' value={inputs.fees || ""} onChange={handleChange} placeholder='200' required />
                                    <span className='text-danger'>{errorData?.errors.fees}</span>
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
                                <input type="text" className="form-control" name='role' value={inputs.role = "doctor"} readOnly hidden />
                            </div>
                            <button type='button' className="btn btn-primary" onClick={submitForm}>ADD</button>
                        </form>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </>
    )
}
