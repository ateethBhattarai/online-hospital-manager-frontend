import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AdminSideBar } from '../../Utility/AdminSideBar';
import ManualRoute from '../../Utility/ManualRoute';
import SubNav from '../../Utility/SubNav';
import { Avatar, Button, message, Popconfirm, Skeleton, Tooltip } from 'antd';
import { FaUser } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { Table } from 'react-bootstrap';

export const CreatePatient = (props) => {
    const [patient, setPatient] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchAllPatientData();
    }, []);

    const fetchAllPatientData = () => {
        ManualRoute.get('/patient').then(res => {
            setPatient(res.data);
            setLoading(true);
        })
    }

    const deleteData = (e, id) => {
        ManualRoute.delete('/patient/' + id).then((res) => {
            fetchAllPatientData();
        })
    }


    return (
        <>
            <div className="container-fluid">
                <div className='row'>
                    <AdminSideBar />
                    <div className="col-md-12 mx-auto pl-4">
                        <SubNav name="Patient" first_link="/admin/patient" second_link="/admin/addPatient" />
                        <div className='container-fluid table_data text-light p-4 mt-3'>
                            <Table striped className="table-hover">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Full Name</th>
                                        <th>Profile Photo</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                        <th>DOB</th>
                                        <th>Phone Number</th>
                                        <th>Blood Group</th>
                                        <th>Chronic Disease</th>
                                        <th>Created by</th>
                                        <th>Modified By</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {loading ?
                                    <tbody>
                                        {patient.map((patients, index) => (
                                            <tr key={patients.id}>
                                                <td>{index + 1}</td>
                                                <td>{patients.full_name}</td>
                                                <td>
                                                    {patients.profile_photo ? <Avatar shape='square' size="large" src={patients.profile_photo} /> : <Avatar shape="square" size="large" icon={<FaUser />} />}
                                                </td>
                                                <td>{patients.email}</td>
                                                <td>{patients.address}</td>
                                                <td>{patients.dob}</td>
                                                <td>{patients.phone_number}</td>
                                                <td>{patients.get_patient.blood_group}</td>
                                                <td>{patients.get_patient.chronic_disease}</td>
                                                <td>{patients.get_patient.created_by}</td>
                                                <td>{patients.get_patient.modified_by}</td>
                                                <td className='d-flex'>
                                                    <Tooltip title="Edit" className='mx-1'>
                                                        <Link to={"/admin/editPatient/" + patients.id} >
                                                            <Button type='primary' size='large' icon={<AiOutlineEdit />} />
                                                        </Link>
                                                    </Tooltip>
                                                    {/* <Link to={"/admin/viewPatient/" + patients.id} className='btn btn-success mx-1'>View</Link> */}
                                                    <Tooltip placement="bottom" title="Delete">
                                                        <Popconfirm
                                                            className='btn btn-danger p-1'
                                                            placement="topLeft"
                                                            title={`Are you sure you want to delete the data of ${patients.full_name}?`}
                                                            onConfirm={(e) => {
                                                                deleteData(e, patients.id)
                                                                message.success("Data deleted successfully!")
                                                            }}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <Button type='primary' danger size='large' icon={<MdDeleteOutline />} />
                                                        </Popconfirm>
                                                    </Tooltip>
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
            </div>
        </>
    )
}
