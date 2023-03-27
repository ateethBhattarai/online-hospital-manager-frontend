import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AdminSideBar } from '../../Utility/AdminSideBar';
import ManualRoute from '../../Utility/ManualRoute';
import SubNav from '../../Utility/SubNav';
import { motion } from 'framer-motion';
import { useStateContext } from '../../Context/ContextProvider';
import { Avatar, Button, message, Popconfirm, Skeleton, Tooltip } from 'antd';
import { FaUser } from 'react-icons/fa';
import { Table } from 'react-bootstrap';
import { MdDeleteOutline } from 'react-icons/md';

export const CreateDoctor = (props) => {
    const [doctor, setDoctor] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAllDoctorData();
    }, []);
    const fetchAllDoctorData = () => {
        ManualRoute.get('/doctor').then(res => {
            setLoading(true);
            setDoctor(res.data);
        })
    }

    const { setNotification, notification } = useStateContext();
    const deleteData = (e, id) => {
        ManualRoute.delete('/doctor/' + id).then((res) => {
            setNotification("Doctor Deleted Successfully!!");
            fetchAllDoctorData();
        })
    }


    return (
        <>
            <div className="container-fluid">
                <div className='row'>
                    <AdminSideBar />
                    <div className="col-md-12 mx-auto pl-4">
                        <SubNav name="Doctor" first_link="/admin/patient" second_link="/admin/addDoctor" />
                        {notification &&
                            <motion.div className="alert alert-success" role="alert" style={{ position: "fixed" }}
                                initial={{ y: -1000 }}
                                animate={{ y: 0, x: 100 }}
                                transition={{ delay: 0.6 }}
                            >
                                {notification}
                            </motion.div>
                        }
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
                                        <th>Qualification</th>
                                        <th>Speciality</th>
                                        <th>Fees</th>
                                        <th>Available Time</th>
                                        <th>Created by</th>
                                        <th>Modified By</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {loading ?
                                    <tbody>
                                        {doctor.map((doctors, index) => (
                                            <tr key={doctors.id}>
                                                <td>{index + 1}</td>
                                                <td>{doctors.full_name}</td>
                                                <td>
                                                    {doctors.profile_photo ? <Avatar shape='square' size="large" src={doctors.profile_photo} /> : <Avatar shape="square" size="large" icon={<FaUser />} />}
                                                </td>
                                                <td>{doctors.email}</td>
                                                <td>{doctors.address}</td>
                                                <td>{doctors.dob}</td>
                                                <td>{doctors.phone_number}</td>
                                                <td>{doctors.get_doctor.qualification}</td>
                                                <td>{doctors.get_doctor.speciality}</td>
                                                <td>{doctors.get_doctor.fees}</td>
                                                <td>{doctors.get_doctor.availability_time}</td>
                                                <td>{doctors.get_doctor.created_by}</td>
                                                <td>{doctors.get_doctor.modified_by}</td>
                                                <td className='d-flex'>
                                                    <Link to={"/admin/editDoctor/" + doctors.id} className='btn btn-primary mx-1'>EDIT</Link>
                                                    {/* <Link to={"/viewDoctor/" + doctors.id} className='btn btn-success mx-1'>View</Link> */}
                                                    <Tooltip placement="bottom" title="Delete">
                                                        <Popconfirm
                                                            className='btn btn-danger p-1'
                                                            placement="topLeft"
                                                            title={`Are you sure you want to delete the data of ${doctors.full_name}?`}
                                                            onConfirm={(e) => {
                                                                deleteData(e, doctors.id)
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
                                            <td colSpan={14}><Skeleton active /></td>
                                        </tr>
                                    </tbody>}
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
