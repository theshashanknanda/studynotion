import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { useState } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Dashboard from './pages/Dashboard';
import VerifyOtp from './pages/VerifyOtp';
import { useSelector } from 'react-redux';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import MyProfile from './components/dashboard/MyProfile';
import EnrolledCourses from './components/dashboard/EnrolledCourses';
import MyCourses from './components/dashboard/MyCourses';
import InstructorDashboard from './components/dashboard/InstructorDashboard';
import AddCourse from './components/dashboard/AddCourse';
import Cart from './components/dashboard/Cart';
import Logout from './components/dashboard/Logout';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import toast, { Toaster } from 'react-hot-toast';
import Catalog from './pages/Catalog';
import Course from './pages/Course';
import Cancel from './components/dashboard/Cancel';
import ViewCourse from './components/dashboard/ViewCourse';

Modal.setAppElement('#root');

function App() {
  const token = useSelector((state) => state.auth.token)
  return (
    <div className="App min-h-[100vh] h-fit bg-richblack-900 text-white">
      <Navbar></Navbar>
      <div className='w-[100%] bg-[#4c4c4c] h-[1px]'/>

      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='/login' element={<Signin></Signin>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/verifyOtp' element={<VerifyOtp></VerifyOtp>}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path='/resetPassword/:token' element={<ResetPassword></ResetPassword>}></Route>
        <Route path='/catalog/:id' element={<Catalog/>}></Route>
        <Route path='/course/:id' element={<Course/>}></Route>
        <Route path='/cancel' element={<Cancel/>}></Route>

        <Route path='/dashboard' element={<Dashboard></Dashboard>}>
        <Route index element={<Navigate to='my-profile'/>} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="instructor-dashboard" element={<InstructorDashboard/>}/>
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="add-course" element={<AddCourse/>} />
          <Route path="enrolled-courses" element={<EnrolledCourses />} />
          <Route path="cart" element={<Cart/>} />
          <Route path='view-course' element={<ViewCourse/>}></Route>
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
