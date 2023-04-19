import React from 'react'
import { Card, Divider } from 'antd';
import { useState } from 'react';
import { Button, Modal } from 'antd';
import UpcomingAppointments from './Appointments/UpcomingAppointments';
import CancelledAppointments from './Appointments/CancelledAppointments';
import PreviousAppointments from './Appointments/PreviousAppointments';
import RejectedAppointments from './Appointments/RejectedAppointments';
import PendingAppointment from './Appointments/PendingAppointment';
import RequestAppointment from './RequestAppointment';


const tabListNoTitle = [
    {
        key: 'upcoming',
        tab: 'Upcoming',
    },
    {
        key: 'rejected',
        tab: 'Rejected',
    },
    {
        key: 'previous',
        tab: 'Previous',
    },
    {
        key: 'pending',
        tab: 'Pending',
    },
];
const contentList = {
    upcoming: <UpcomingAppointments />,
    pending: <PendingAppointment />,
    rejected: <RejectedAppointments />,
    previous: <PreviousAppointments />,

};

const AppointmentsCard = () => {

    // For Tab keys
    const [activeTabKey, setActiveTabKey] = useState('upcoming');
    const onTabChange = (key) => {
        setActiveTabKey(key);
    };

    // For Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Card
                tabList={tabListNoTitle}
                activeTabKey={activeTabKey}
                onTabChange={onTabChange}
                tabBarExtraContent={
                    <>
                        <Button className='button_color' onClick={showModal}>
                            Add
                        </Button>
                        <Modal title="Request Appointment" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <RequestAppointment />
                        </Modal>
                    </>
                }
            >
                {contentList[activeTabKey]}
            </Card>
        </>
    );
}

export default AppointmentsCard