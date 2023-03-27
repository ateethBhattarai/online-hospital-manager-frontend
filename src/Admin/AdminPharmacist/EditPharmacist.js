import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminSideBar } from '../../Utility/AdminSideBar';
import ManualRoute from '../../Utility/ManualRoute';

export const EditPharmacist = () => {
    const navigate = useNavigate(); //used for navigation purpose
    const [inputs, setInputs] = useState({});

    //handles the changes in the inputs
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    //to update the edited data
    const submitForm = () => {
        ManualRoute.put('/pharmacist/' + id, inputs).then((res) => {
            navigate('/admin/pharmacist'); //navigates the page to '/pharmacist'
        })
    }

    //to cancel the editing process
    const cancelForm = () => {
        navigate('/admin/pharmacist');
    }

    useEffect(() => {
        fetchpharmacistData();
    }, []);

    const { id } = useParams(); //gets id present in the url

    const fetchpharmacistData = () => {
        ManualRoute.get('pharmacist/' + id + '/edit').then((res) => {
            setInputs({
                full_name: res.data.full_name,
                email: res.data.email,
                address: res.data.address,
                phone_number: res.data.phone_number,
                dob: res.data.dob,
                qualification: res.data.get_pharmacist.qualification,
                fees: res.data.get_pharmacist.fees,
                availability_time: res.data.get_pharmacist.availability_time,
                speciality: res.data.get_pharmacist.speciality
            });
        });
    }

    return (
        <>
            <div className="container-fluid">
                <div className='row'>
                    <div><AdminSideBar /></div>
                    <div className="col-md-10 mx-auto pl-4">
                        <h2 className='mt-2 p-2 text-center border-bottom'>Edit pharmacist</h2>
                        <div className='container border bg-container text-light p-4 mt-3'>
                            <form>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" name="full_name" value={inputs.full_name || ""} onChange={handleChange} className="form-control is_valid" placeholder="Ateeth Bhattarai" required />
                                </div>
                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <label>Email</label>
                                        <input type="email" className="form-control" name='email' value={inputs.email || ""} onChange={handleChange} placeholder='example@gmail.com' required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label >Address</label>
                                        <input type="text" className="form-control" name='address' value={inputs.address || ""} onChange={handleChange} placeholder='Itahari-02, Sunsari' required />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <label >Phone Number</label>
                                        <input type="text" className="form-control" name='phone_number' value={inputs.phone_number || ""} onChange={handleChange} placeholder='98123.......' required />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label > DOB</label>
                                        <input type="date" className="form-control" name='dob' value={inputs.dob || ""} onChange={handleChange} placeholder='98123.......' required />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label >Qualification</label>
                                        <input type="text" className="form-control" name='qualification' value={inputs.qualification || ""} onChange={handleChange} placeholder='98123.......' required />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <label>Speciality</label>
                                        <input type="text" className="form-control" name='speciality' value={inputs.speciality || ""} onChange={handleChange} placeholder='speciality...' required />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label >Available Time</label>
                                        <input type="date" className="form-control" name='availability_time' value={inputs.availability_time || ""} onChange={handleChange} placeholder='pharmacist available time...' required />
                                    </div>
                                    <div className="col-md-2 mb-3">
                                        <label >Fees</label>
                                        <input type="number" className="form-control" name='fees' value={inputs.fees || ""} onChange={handleChange} placeholder='200' required />
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
                                    <input type="text" className="form-control" name='role' value={inputs.role = "pharmacist"} readOnly hidden />
                                </div>
                                <div className='d-flex'>
                                    <button type='button' className="btn btn-success mx-2" onClick={submitForm}>Update</button>
                                    <button type='button' className="btn btn-danger" onClick={cancelForm}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
