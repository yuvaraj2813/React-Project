import React, { useState,useEffect } from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from './doner/Pages/Home/Home'
import NavBar from './doner/Pages/Home/Nav';
import Signup from './Auth/Signup';
import SignIn from './Auth/Signin';
import alert from 'sweetalert2';
import AboutUs from './doner/Pages/About/AboutUs';


const App = () => {
    // Retrieve initial state from localStorage or default to an empty string
    const [userRole, setUserRole] = useState(() => {
      const savedRole = localStorage.getItem('userRole');
      return savedRole ? savedRole : ""; // Default to an empty string if no value in localStorage
    });

    useEffect(() => {
      if (userRole) {
        localStorage.setItem('userRole', userRole);
      }
    }, [userRole]);   

  const handleLogout = () => {
    alert.fire({
      icon: "success",
      title: "LogOut Successful!",
      text: "You have successfully log out.",
      confirmButtonColor: "#6366F1",
    }).then(()=>
    setUserRole(""));
    localStorage.removeItem('userRole');// Clear the user role on logout
  };
  const changeUserRole=(role)=>{
    setUserRole(role);
  }

  return (
    <>
    <NavBar userRole={userRole} handleLogout={handleLogout} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/aboutus' element={<AboutUs/>}/>
      <Route path="/signin" element={<SignIn  changeUserRole={changeUserRole} />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    </>
  );
};

export default App;
