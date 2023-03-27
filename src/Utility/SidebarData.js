import { MdAddCircleOutline, MdDashboard, MdOutlineSick } from 'react-icons/md';
import { GiMedicines, GiDoctorFace } from 'react-icons/gi';
import { CiCalendarDate } from 'react-icons/ci';
import { CgLogOut, CgProfile } from 'react-icons/cg';
export const sidebarData = [
    {
        title: 'Dashboard',
        links: [
            {
                name: 'Dashboard',
                path: '/admin/dashboard',
                icon: <MdDashboard />
            },
        ],
    },
    {
        title: 'Users',
        links: [
            {
                name: 'Patient',
                path: "/admin/patient",
                icon: <MdOutlineSick />
            },
            {
                name: 'Doctor',
                path: "/admin/doctor",
                icon: <GiDoctorFace />
            },
            {
                name: 'Pharmacist',
                path: "/admin/pharmacist",
                icon: <MdAddCircleOutline />
            },
        ]
    },
    {
        title: 'Others',
        links: [
            {
                name: 'Pharmacy',
                path: "/admin/pharmacy",
                icon: < GiMedicines />
            },
            {
                name: 'Appointments',
                icon: < CiCalendarDate />
            },
        ],
    },
    {
        title: 'Setting',
        links: [
            {
                name: 'profile',
                path: "/admin/setting",
                icon: <CgProfile />
            },
            {
                name: 'logout',
                icon: <CgLogOut />
            }
        ]
    }
];