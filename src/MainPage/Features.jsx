import { Card, Divider } from 'antd'
import React from 'react'
import { MdOutlinePersonAddAlt, MdOutlineInventory } from 'react-icons/md'
import { GiDoctorFace } from 'react-icons/gi'
import { BiGitPullRequest } from 'react-icons/bi'
import { FaPersonBooth } from 'react-icons/fa'

const Features = () => {

    const cardDetails = [
        {
            title: "Patient Management",
            icon: <MdOutlinePersonAddAlt />,
            desc: "Manage overall patient activities and records."
        },
        {
            title: "Doctor Management",
            icon: <GiDoctorFace />,
            desc: "Manage overall doctor activities and records."
        },
        {
            title: "Inventory Management",
            icon: <MdOutlineInventory />,
            desc: "Manage overall inventory activities and records."
        },
        {
            title: "Appointment Management",
            icon: <BiGitPullRequest />,
            desc: "Manage overall appointment activities and records."
        },
        {
            title: "Pharmacist Management",
            icon: <FaPersonBooth />,
            desc: "Manage overall pharmacist activities and records."
        }
    ]

    return (
        <>
            <div className="container-fluid my-4">
                <Divider orientation='left' className='fs-2'>Features</Divider>
                <div className="d-flex flex-wrap justify-content-between">
                    {
                        cardDetails.map((feature) => (
                            <Card
                                title={<>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className='fs-3'>{feature.icon}</p>
                                        <p className='fs-6'>{feature.title}</p>
                                    </div>
                                </>}
                                style={{ width: "20rem" }}
                                className='my-4'
                            >
                                <p className='fs-7'>{feature.desc}</p>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Features