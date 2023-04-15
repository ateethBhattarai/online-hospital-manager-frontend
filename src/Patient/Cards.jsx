// import React from 'react'
// import { FaBirthdayCake } from 'react-icons/fa';
// import { MdOutlineSick } from 'react-icons/md';
// import { BsCalendarDate } from 'react-icons/bs';
// import { Avatar, Divider } from 'antd';

// const Cards = () => {

//     const cardData = [
//         {
//             title: "Chronic Disease",
//             icon: <MdOutlineSick />,
//             data: <>
//                 <p>Diabeties</p>
//                 <p>Sugar</p>
//             </>
//         },
//         {
//             title: "Birthday",
//             icon: <FaBirthdayCake />,
//             data: <><h3>12/10/2022</h3></>
//         },
//         {
//             title: "Registered Date",
//             icon: <BsCalendarDate />,
//             data: <><h3>12/10/2022</h3></>

//         }
//     ];

//     return (
//         <>
//             <Divider orientation="left"><h3>Your Details</h3></Divider>
//             <div className="d-flex justify-content-around flex-wrap border mb-4">
//                 {cardData.map((data, index) =>
//                     <>
//                         <div className="col-sm-4 p-2" key={index} style={{ width: "20rem" }}>
//                             <div className="card text-dark bg-light mb-3" >
//                                 <div className="card-header">{data.title}</div>
//                                 <div className="card-body" >
//                                     <div className="d-flex align-items-center justify-content-around">
//                                         <Avatar
//                                             size={{
//                                                 sm: 65,
//                                                 md: 70,
//                                                 lg: 80,
//                                                 xl: 80,
//                                                 xxl: 100,
//                                             }}
//                                             icon={data.icon}
//                                         />
//                                         <pre>{data.data || <><h3>Null</h3></>}</pre>
//                                     </div>
//                                 </div >
//                             </div>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </>
//     );
// }

// export default Cards