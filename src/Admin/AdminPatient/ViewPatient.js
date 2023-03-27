import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ManualRoute from '../../Utility/ManualRoute';

export const ViewPatient = () => {
    const [inputs, setInputs] = useState({});

    const { id } = useParams();

    useEffect(() => {
        fetchPatientData();
    }, []);

    const fetchPatientData = () => {
        ManualRoute.get('patient/' + id).then((res) => {
            setInputs({
                full_name: res.data.full_name,
                email: res.data.email,
                address: res.data.address,
                phone_number: res.data.phone_number,
                dob: res.data.dob,
                chronic_disease: res.data.get_patient.chronic_disease,
                blood_group: res.data.get_patient.blood_group
            });
        });
    }

    return (
        <>
            <div className='container border bg-secondary text-light p-4 my-4'>
                <div>
                    <h1>Name</h1>
                    <p>{inputs.full_name}</p>
                </div>
            </div>
        </>
    )
}
