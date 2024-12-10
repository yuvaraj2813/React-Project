
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./doner/Pages/UserContext"; // Import the context
import Home from "./doner/Pages/Home/Home";
import NavBar from "./doner/Pages/Home/Nav";
import Signup from "./Auth/Signup";
import SignIn from "./Auth/Signin";
import AboutUs from "./doner/Pages/About/AboutUs";
import Donate from "./doner/Pages/donate/donate";
import ReceiveFood from "./doner/Pages/Receiver/ReceiveFood";
import ContactUs from "./doner/Pages/About/ContactUs";


const App = () => {
  const {user, loading } = useContext(UserContext); // Access the user from context

  if (loading) {
    return <div>Loading...</div>; // Show loading state while Firebase checks the user status
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs/>}/>
        <Route path="/donate" element={<Donate />} />
        <Route path="/receivefood" element={<ReceiveFood />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
