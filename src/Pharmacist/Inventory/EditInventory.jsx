import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../../Context/ContextProvider';
import ManualRoute from '../../Utility/ManualRoute';

export const EditInventory = () => {
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
        ManualRoute.put('/inventory/' + id, inputs).then((res) => {
            setNotification("Inventory Updated Successfully!!");
            navigate('/pharmacist/inventory'); //navigates the page to '/inventory'
        })
    }

    //to cancel the editing process
    const cancelForm = () => {
        navigate('/pharmacist/inventory');
    }

    useEffect(() => {
        fetchinventoryData();
    }, []);

    const { id } = useParams(); //gets id present in the url

    const fetchinventoryData = () => {
        ManualRoute.get('inventory/' + id + '/edit').then((res) => {
            setInputs({
                item_name: res.data.item_name,
                item_type: res.data.item_type,
                manufactured_date: res.data.manufactured_date,
                expiry_date: res.data.expiry_date,
            });
        });
    }


    return (
        <>
            <div className="container-fluid">
                {/* <div className='row'>
                    <div><AdminSideBar /></div> */}
                <div className="col-md-10 mx-auto pl-4">
                    <h2 className='mt-2 p-2 text-center'>Edit Inventory</h2>
                    <div className='container border bg-container text-light p-4 mt-3'>
                        <form>
                            <div className="form-group">
                                <label>Item Name</label>
                                <input type="text" name="item_name" value={inputs.item_name || ""} onChange={handleChange} className="form-control is_valid" placeholder="Neems" required />
                            </div>
                            <div className="form-row mt-2">
                                <div className="col-md-6 mb-3">
                                    <label>Item Type</label>
                                    <input type="text" className="form-control" name='item_type' value={inputs.item_type || ""} onChange={handleChange} placeholder='Paracetamols' required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >Manufactured Date</label>
                                    <input type="date" className="form-control" name='manufactured_date' value={inputs.manufactured_date || ""} onChange={handleChange} placeholder='2020/10/12' required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label >Expiry Date</label>
                                    <input type="date" className="form-control" name='expiry_date' value={inputs.expiry_date || ""} onChange={handleChange} placeholder='2020/11/12' required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" className="form-control" name='created_by' value={inputs.created_by = "Pharmacist"} readOnly hidden />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >Modified By</label>
                                    <input type="text" className="form-control" name='modified_by' value={inputs.modified_by = "Pharmacist"} readOnly />
                                </div>
                            </div>
                            <div className='d-flex'>
                                <button type='button' className="btn btn-success mx-2" onClick={submitForm}>Update</button>
                                <button type='button' className="btn btn-danger" onClick={cancelForm}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </>
    )
}
