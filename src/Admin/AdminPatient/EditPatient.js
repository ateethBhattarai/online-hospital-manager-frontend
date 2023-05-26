import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../../Context/ContextProvider';
import ManualRoute from '../../Utility/ManualRoute';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EditPatient = () => {
    const navigate = useNavigate(); //used for navigation purpose
    const [inputs, setInputs] = useState({});

    //handles the changes in the inputs
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    //to update the edited data
    const { setNotification } = useStateContext();
    const submitForm = () => {
        ManualRoute.put('/patient/' + id, inputs).then((res) => {
            setNotification("Patient Updated Successfully!!")
            navigate('/admin/patient'); //navigates the page to '/patient'
        }).catch(error => {
            const response = error.response;
            toast.error("Something went wrong! Invalid value formate!!");

            if (response && response.status === 422) {
                console.log(response.data.errors)
            }
        })
    }

    //to cancel the editing process
    const cancelForm = () => {
        navigate('/admin/patient');
    }

    //the data for dropdown of blood_group
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

    useEffect(() => {
        fetchPatientData();
    }, []);

    const { id } = useParams(); //gets id present in the url

    const fetchPatientData = () => {
        ManualRoute.get('patient/' + id + '/edit').then((res) => {
            setInputs({
                full_name: res.data.full_name,
                email: res.data.email,
                address: res.data.address,
                phone_number: res.data.phone_number,
                dob: res.data.dob,
            });
            setSelected(
                res.data.get_patient.blood_group
            );
        });
    }

    return (
        <>
            <div className="container-fluid">
                {/* <div className='row'>
                    <div><AdminSideBar /></div> */}
                <div className="col-md-10 mx-auto pl-4">
                    <h2 className='mt-2 p-2 text-center'>Edit Patient</h2>
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
                                    <div className="form-group">
                                        <label >Blood Group</label>
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
                            <div className='d-flex'>
                                <button type='button' className="btn btn-success mx-2" onClick={submitForm}>Update</button>
                                <button type='button' className="btn btn-danger" onClick={cancelForm}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
            {/* </div> */}
        </>
    )
}
