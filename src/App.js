import './App.css';
import { AddPatient } from './Admin/AdminPatient/AddPatient';
import { Route, Routes } from 'react-router-dom';
import { EditPatient } from './Admin/AdminPatient/EditPatient';
import { CreatePatient } from './Admin/AdminPatient/CreatePatient';
import { ViewPatient } from './Admin/AdminPatient/ViewPatient';
// import { AdminSideBar } from './Utility/AdminSideBar';
import { CreateDoctor } from './Admin/AdminDoctor/CreateDoctor'
import { AddDoctor } from './Admin/AdminDoctor/AddDoctor';
import { EditDoctor } from './Admin/AdminDoctor/EditDoctor';
import { ViewDoctor } from './Admin/AdminDoctor/ViewDoctor';
import { CreatePharmacist } from './Admin/AdminPharmacist/CreatePharmacist';
import { AddPharmacist } from './Admin/AdminPharmacist/AddPharmacist';
import { EditPharmacist } from './Admin/AdminPharmacist/EditPharmacist';
import { ViewPharmacist } from './Admin/AdminPharmacist/ViewPharmacist';
// import { Patient } from './Patient/Patient';
// import { Appointment } from './Patient/PatientAppointment';
import { DoctorAppointments } from './Doctor/Appointment';
// import { PatientSetting } from './Patient/PatientSetting';
// import { RequestAppointment } from './Patient/RequestAppointment';
// import { PatientChat } from './Patient/PatientChat';
import { Login } from './MainPage/Login';
import { SignUp } from './MainPage/SignUp';
import { Home } from './MainPage/Home';
import { ContextProvider } from './Context/ContextProvider';
import AppointmentRequests from './Doctor/AppointmentRequests';
import Doctor from './Doctor/Doctor';
import Admin from './Admin/Admin';
import PharmacistDashboard from './Pharmacist/PharmacistDashboard';
import PageNotFound from './PageNotFound';

import PatientDashboard from './Patient/PatientDashboard';
import Navbar from './Patient/Navbar';
import DoctorDetails from './Patient/DoctorDetails';
import Setting from './Patient/Setting';
import ViewDoctorDetails from './Patient/ViewDoctorDetails';
import { AdminSideBar } from './Utility/AdminSideBar';
import { CreateInventory } from './Pharmacist/Inventory/CreateInventory';
import { PharmacistSideBar } from './Utility/PharmacistSideBar';
import { EditInventory } from './Pharmacist/Inventory/EditInventory';
import { AddInventory } from './Pharmacist/Inventory/AddInventory';
import InventoryCards from './Patient/InventoryCards';
import ImageUploader from './ImageUploader';
import { LandingPage } from './MainPage/LandingPage';

function App() {
  return (
    <>
      <ContextProvider>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<LandingPage />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<SignUp />} />

          </Route>

          {/* Patient routes */}
          <Route path='/patientDashboard' element={<Navbar />} >
            <Route index element={<PatientDashboard />} />
            <Route path='doctordetails' element={<DoctorDetails />} />
            <Route path='setting' element={<Setting />} />
            <Route path='viewdoctor/:name' element={<ViewDoctorDetails />} />
            <Route path='inventory' element={<InventoryCards />} />
          </Route>

          {/* Doctor routes */}
          <Route path='/doctorDashboard' element={<Doctor />} />
          <Route path='/doctorAppointment' element={<DoctorAppointments />} />
          {/* <Route path='/doctorSetting' element={<DoctorSetting />} /> */}
          <Route path='/doctorAppointmentRequests' element={<AppointmentRequests />} />
          {/* <Route path='/doctor/chat' element={<DoctorChat />} /> */}
          {/* </Routes> */}


          <Route path="adminDashboard" element={<Admin />} />
          <Route path="/admin" element={<AdminSideBar />}>
            {/* <Routes> */}

            {/*Admin Doctor routes */}
            <Route path="doctor" element={<CreateDoctor />} />
            <Route path="addDoctor" element={<AddDoctor />} />
            <Route path="editDoctor/:id" element={<EditDoctor />} />
            <Route path="viewDoctor/:id" element={<ViewDoctor />} />

            {/*Admin Patient Routes */}
            <Route path="patient" element={<CreatePatient />} />
            <Route path="addPatient" element={<AddPatient />} />
            <Route path="editPatient/:id" element={<EditPatient />} />
            <Route path="viewPatient/:id" element={<ViewPatient />} />

            {/*Admin Pharmacist Routes */}
            <Route path="pharmacist" element={<CreatePharmacist />} />
            <Route path="addPharmacist" element={<AddPharmacist />} />
            <Route path="editPharmacist/:id" element={<EditPharmacist />} />
            <Route path="viewPharmacist/:id" element={<ViewPharmacist />} />
            {/* </Routes> */}
          </Route>
          {/* <Routes> */}

          {/* Pharmacist Routes */}
          <Route path="/pharmacistDashboard" element={<PharmacistDashboard />} />
          <Route path='/pharmacist' element={<PharmacistSideBar />}>
            <Route path='inventory' element={<CreateInventory />} />
            <Route path='addinventory' element={<AddInventory />} />
            <Route path='editinventory/:id' element={<EditInventory />} />
          </Route>

          {/* Invalid route */}
          <Route path='*' element={<PageNotFound />} />
          <Route path='/images' element={<ImageUploader />} />

        </Routes>
      </ContextProvider>
    </>
  );
}

export default App;
