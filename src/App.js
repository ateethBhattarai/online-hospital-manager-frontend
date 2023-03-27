import './App.css';
import { AddPatient } from './Admin/AdminPatient/AddPatient';
import { Route, Routes } from 'react-router-dom';
import { EditPatient } from './Admin/AdminPatient/EditPatient';
import { CreatePatient } from './Admin/AdminPatient/CreatePatient';
import { ViewPatient } from './Admin/AdminPatient/ViewPatient';
import { AdminSideBar } from './Utility/AdminSideBar';
import { CreateDoctor } from './Admin/AdminDoctor/CreateDoctor'
import { AddDoctor } from './Admin/AdminDoctor/AddDoctor';
import { EditDoctor } from './Admin/AdminDoctor/EditDoctor';
import { ViewDoctor } from './Admin/AdminDoctor/ViewDoctor';
import { CreatePharmacist } from './Admin/AdminPharmacist/CreatePharmacist';
import { AddPharmacist } from './Admin/AdminPharmacist/AddPharmacist';
import { EditPharmacist } from './Admin/AdminPharmacist/EditPharmacist';
import { ViewPharmacist } from './Admin/AdminPharmacist/ViewPharmacist';
import { Patient } from './Patient/Patient';
import { Appointment } from './Patient/PatientAppointment';
import { DoctorAppointments } from './Doctor/Appointment';
import { PatientSetting } from './Patient/PatientSetting';
import { RequestAppointment } from './Patient/RequestAppointment';
import { PatientChat } from './Patient/PatientChat';
import { Login } from './MainPage/Login';
import { SignUp } from './MainPage/SignUp';
import { Home } from './MainPage/Home';
import { ContextProvider } from './Context/ContextProvider';
import AppointmentRequests from './Doctor/AppointmentRequests';
import Doctor from './Doctor/Doctor';
import Admin from './Admin/Admin';
import PharmacistDashboard from './Pharmacist/PharmacistDashboard';
import PageNotFound from './PageNotFound';


function App() {
  return (
    <>
      <ContextProvider>
        <Routes>
          {/* <Route path="/" element={<AdminSideBar />} /> */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />


          {/* Patient routes */}
          <Route path='/patientDashboard' element={<Patient />} />
          <Route path='/patientAppointment' element={<Appointment />} />
          <Route path='/patientSetting' element={<PatientSetting />} />
          <Route path='/patientBookAppointment' element={<RequestAppointment />} />
          <Route path='/patient/chat' element={<PatientChat />} />

          {/* Doctor routes */}
          <Route path='/doctorDashboard' element={<Doctor />} />
          <Route path='/doctorAppointment' element={<DoctorAppointments />} />
          {/* <Route path='/doctorSetting' element={<DoctorSetting />} /> */}
          <Route path='/doctorAppointmentRequests' element={<AppointmentRequests />} />
          {/* <Route path='/doctor/chat' element={<DoctorChat />} /> */}

          {/*Admin Doctor routes */}
          <Route path="/admin/doctor" element={<CreateDoctor />} />
          <Route path="/admin/addDoctor" element={<AddDoctor />} />
          <Route path="/admin/editDoctor/:id" element={<EditDoctor />} />
          <Route path="/admin/viewDoctor/:id" element={<ViewDoctor />} />
          <Route path="/admin/dashboard" element={<Admin />} />

          {/*Admin Patient Routes */}
          <Route path="/admin/patient" element={<CreatePatient />} />
          <Route path="/admin/addPatient" element={<AddPatient />} />
          <Route path="/admin/editPatient/:id" element={<EditPatient />} />
          <Route path="/admin/viewPatient/:id" element={<ViewPatient />} />

          {/*Admin Pharmacist Routes */}
          <Route path="/admin/pharmacist" element={<CreatePharmacist />} />
          <Route path="/admin/addPharmacist" element={<AddPharmacist />} />
          <Route path="/admin/editPharmacist/:id" element={<EditPharmacist />} />
          <Route path="/admin/viewPharmacist/:id" element={<ViewPharmacist />} />

          {/* Pharmacist Routes */}
          <Route path="/pharmacistDashboard" element={<PharmacistDashboard />} />

          {/* Invalid route */}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </ContextProvider>
    </>
  );
}

export default App;
