import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ManualRoute from '../../Utility/ManualRoute';
import SubNav from '../../Utility/SubNav';
import { motion } from 'framer-motion';
import { Avatar, Button, message, Popconfirm, Skeleton, Tooltip } from 'antd';
import { FaUser } from 'react-icons/fa';
import { Table } from 'react-bootstrap';
import { MdDeleteOutline } from 'react-icons/md';
import { useStateContext } from '../../Context/ContextProvider';

export const CreateInventory = () => {
    const [inventory, setinventory] = useState([]);
    const [loading, setLoading] = useState(false);

    // get inventory data
    useEffect(() => {
        fetchAllinventoryData();
    }, []);
    const fetchAllinventoryData = () => {
        ManualRoute.get('/inventory').then(res => {
            setLoading(true);
            setinventory(res.data);
        })
    }

    const { setNotification, notification } = useStateContext();
    const deleteData = (e, id) => {
        ManualRoute.delete('/inventory/' + id).then((res) => {
            setNotification("inventory Deleted Successfully!!");
            fetchAllinventoryData();
        })
    }


    return (
        <>
            <div className="container-fluid">
                {/* <div className='row'> */}
                {/* <AdminSideBar /> */}
                <div className="col-md-12 mx-auto pl-4">
                    <SubNav name="Inventory" first_link="/pharmacist/inventory" second_link="/pharmacist/addinventory" />
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
                        <Table striped responsive className="table-hover">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Item Type</th>
                                    <th>Manufactured Date</th>
                                    <th>Expiry Date</th>
                                    <th>Created_by</th>
                                    <th>Modified_by</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {loading ?
                                <tbody>
                                    {inventory.map((inventorys, index) => (
                                        <tr key={inventorys.id}>
                                            <td>{index + 1}</td>
                                            <td>{inventorys.item_name}</td>
                                            <td>
                                                {inventorys.photo ? <Avatar shape='square' size="large" src={inventorys.photo} /> : <Avatar shape="square" size="large" icon={<FaUser />} />}
                                            </td>
                                            <td>{inventorys.item_type}</td>
                                            <td>{inventorys.manufactured_date}</td>
                                            <td>{inventorys.expiry_date}</td>
                                            <td>{inventorys.created_by}</td>
                                            <td>{inventorys.modified_by}</td>
                                            <td className='d-flex'>
                                                <Link to={"/pharmacist/editinventory/" + inventorys.id} className='btn btn-primary mx-1'>EDIT</Link>
                                                {/* <Link to={"/viewinventory/" + inventorys.id} className='btn btn-success mx-1'>View</Link> */}
                                                <Tooltip placement="bottom" title="Delete">
                                                    <Popconfirm
                                                        className='btn btn-danger p-1'
                                                        placement="topLeft"
                                                        title={`Are you sure you want to delete the data of ${inventorys.item_name}?`}
                                                        onConfirm={(e) => {
                                                            deleteData(e, inventorys.id)
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
                {/* </div> */}
            </div>
        </>
    )
}
