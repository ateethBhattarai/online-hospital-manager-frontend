import React, { useEffect } from 'react'
import { useStateContext } from '../Context/ContextProvider';
import axiosClient from '../Services/axios';

export const Profile = () => {
    const { setUser, user } = useStateContext();
    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            axiosClient.get('/patient/' + data.id).then((userData) => {
                setUser(userData.data);
            })
        })
    }, [])

    return (
        <>
            <div className="container-fluid border">
                <div className="container profile my-4">
                    <div className="row">
                        <div className="col-sm-4 box-shadow p-2 text-center left-div-profile">
                            <div className='img-div p-2 m-auto'>
                                <img className='rounded-circle' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png" alt="profilephoto" />
                            </div>
                            <div className='details'>
                                <span className='topic-header-patient'>{user.full_name || ""}</span>
                                <span className='more-details-patient'>{user.email || ""}</span>
                            </div>
                        </div>
                        <div className="col-sm-8 text-center box-shadow">
                            <div className="row my-4">
                                <div className="col col-md-4">
                                    <div className='details box-shadow'>
                                        <span className='topic-header-patient'>Gender</span>
                                        <span className='more-details-patient'>Male</span>
                                    </div>
                                </div>
                                <div className="col col-md-4 ">
                                    <div className='details box-shadow'>
                                        <span className='topic-header-patient'>Birthday</span>
                                        <span className='more-details-patient'>{user.dob || ""}</span>
                                    </div>
                                </div>
                                <div className="col-md-4 ">
                                    <div className='details box-shadow'>
                                        <span className='topic-header-patient'>Address</span>
                                        <span className='more-details-patient'>{user.address || ""}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-4">
                                <div className="col-md-6">
                                    <div className='details box-shadow'>
                                        <span className='topic-header-patient'>Phone Number</span>
                                        <span className='more-details-patient'>{user.phone_number || ""}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className='details box-shadow'>
                                        <span className='topic-header-patient'>Regitered Date</span>
                                        <span className='more-details-patient'>{user.created_at || ""}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-4">
                                <div className="col-md-6">
                                    <div className='details box-shadow'>
                                        <span className='topic-header-patient'>Blood Group</span>
                                        <span className='more-details-patient'>{user.get_patient === undefined ? "Loading..." : user.get_patient.blood_group}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className='details box-shadow'>
                                        <span className='topic-header-patient'>Chronic Disease</span>
                                        <span className='more-details-patient'>{user.get_patient === undefined ? "Loading..." : user.get_patient.vhronic_disease || "No chronic disease!"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
