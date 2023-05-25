import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../Context/ContextProvider';
import ManualRoute from '../../Utility/ManualRoute';
import SubNav from '../../Utility/SubNav'

export const AddInventory = () => {
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
        ManualRoute.post('/inventory', inputs).then((res) => {
            setNotification("Inventory Updated Successfully!!");
            navigate('/pharmacist/inventory');
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
                    <SubNav name="Inventory" first_link="/pharmacist/inventory" second_link="/pharmacist/addinventory" />
                    <h2 className='mt-2 p-2 text-center'><u>Add Inventory</u></h2>
                    <div className='container border bg-container text-light p-4 mt-3'>
                        <form>
                            <div className="form-group">
                                <label>Item Name</label>
                                <input type="text" name="item_name" value={inputs.item_name || ""} onChange={handleChange} className="form-control is_valid" placeholder="Neems" required />
                                <span className='text-danger'>{errorData?.errors.full_name}</span>
                            </div>
                            <div className="form-group mt-2">
                                <label>Item Type</label>
                                <input type="text" name="item_type" value={inputs.item_type || ""} onChange={handleChange} className="form-control is_valid" placeholder="Paracetamol" required />
                                <span className='text-danger'>{errorData?.errors.password}</span>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label>Manufactured Date</label>
                                    <input type="date" className="form-control" name='manufactured_date' value={inputs.manufactured_date || ""} onChange={handleChange} placeholder='2022/12/12' required />
                                    <span className='text-danger'>{errorData?.errors.email}</span>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >Expiry Date</label>
                                    <input type="date" className="form-control" name='expiry_date' value={inputs.expiry_date || ""} onChange={handleChange} placeholder='2023/12/12' required />
                                    <span className='text-danger'>{errorData?.errors.address}</span>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label>Created By</label>
                                    <input type="text" className="form-control" name='created_by' value={inputs.created_by = "Pharmacist"} readOnly />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >Modified By</label>
                                    <input type="text" className="form-control" name='modified_by' value={inputs.modified_by = "Pharmacist"} readOnly />
                                </div>
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
