import { Avatar, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axiosClient from '../../Services/axios';
import { AdminSideBar } from '../../Utility/AdminSideBar';
import SubNav from '../../Utility/SubNav';

export const CreatePharmacist = (props) => {
    const [pharmacist, setpharmacist] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAllpharmacistData();
    }, []);

    const fetchAllpharmacistData = () => {
        axiosClient.get('/pharmacist').then(res => {
            setpharmacist(res.data);
            setLoading(true);
        })
    }

    const deleteData = (e, id) => {
        axiosClient.delete('/pharmacist/' + id).then((res) => {
            fetchAllpharmacistData();
        })
    }

    return (
        <>
            <div className="container-fluid">
                {/* <div className='row'>
                    <AdminSideBar /> */}
                <div className="col-md-12 mx-auto pl-4">
                    <SubNav name="Pharmacist" first_link="/admin/pharmacist" second_link="/admin/addPharmacist" />
                    <div className='container-fluid table_data text-light p-4 mt-3'>
                        <Table responsive striped className="table-hover">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Full Name</th>
                                    <th>Profile Photo</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>DOB</th>
                                    <th>Phone Number</th>
                                    <th>Qualification</th>
                                    <th>Created By</th>
                                    <th>Modified By</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {loading ?
                                <tbody>
                                    {pharmacist.map((pharmacists, index) => (
                                        <tr key={pharmacists.id}>
                                            <td>{index + 1}</td>
                                            <td>{pharmacists.full_name}</td>
                                            <td>
                                                {pharmacists.profile_photo ? <Avatar shape='square' size="large" src={pharmacists.profile_photo} /> : <Avatar shape="square" size="large" icon={<FaUser />} />}
                                            </td>
                                            <td>{pharmacists.email}</td>
                                            <td>{pharmacists.address}</td>
                                            <td>{pharmacists.dob}</td>
                                            <td>{pharmacists.phone_number}</td>
                                            {console.log(pharmacists)}
                                            <td>{pharmacists.get_pharmacist ? pharmacists.get_pharmacist.qualification : ""}</td>
                                            <td>{pharmacists.get_pharmacist ? pharmacists.get_pharmacist.created_by : ""}</td>
                                            <td>{pharmacists.get_pharmacist ? pharmacists.get_pharmacist.modified_by : ""}</td>
                                            <td className='d-flex'>
                                                <Link to={"/admin/editPharmacist/" + pharmacists.id} className='btn btn-primary mx-1'>EDIT</Link>
                                                {/* <Link to={"/viewPharmacist/" + pharmacists.id} className='btn btn-success mx-1'>View</Link> */}
                                                <button onClick={(e) => deleteData(e, pharmacists.id)} className='btn btn-danger mx-1'>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody> :
                                <tbody>
                                    <tr>
                                        <td colSpan={12}><Skeleton active /></td>
                                    </tr>
                                </tbody>
                            }
                        </Table>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    )
}
