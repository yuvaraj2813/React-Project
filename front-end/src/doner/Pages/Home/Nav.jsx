
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavBar = ({ userRole, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const handleLogoutClick = () => {
    handleLogout(),
    navigate("/"); // Redirect to home after logout
  };

  return (
    <nav className="bg-white fixed top-0 w-full py-3 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <a href="#home" className="text-xl font-bold text-gray-800">FeedingHands</a>

        {/* Hamburger Icon for Mobile */}
        <button
          className="lg:hidden block text-gray-800 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`lg:flex items-center space-x-6 ${isMenuOpen ? "block" : "hidden"
            } w-full lg:w-auto absolute lg:static top-14 left-0 bg-white lg:bg-transparent lg:py-0 py-4 px-6 shadow-md lg:shadow-none`}
        >
          <Link to="/" className="block lg:inline text-gray-600 hover:text-blue-600 py-2">Home</Link>
          {userRole == "donor" && (<a href="#features" className="block lg:inline text-gray-600 hover:text-blue-600 py-2">Donate</a>)}
          {userRole =="receiver" && (<a href=''>ReceiveFood </a>)}
          

          <Link to="/aboutus" className="block lg:inline text-gray-600 hover:text-blue-600 py-2">About Us</Link>
          {userRole == "" ? (
            <button
              className="block lg:inline bg-blue-500 text-white px-4 py-2 rounded-[20px] hover:bg-blue-600 mt-2 lg:mt-0"
              onClick={handleSignInClick}
            >
              SignIn
            </button>)
          : (
            <button
              className="block lg:inline bg-blue-500 text-white px-4 py-2 rounded-[20px] hover:bg-blue-600 mt-2 lg:mt-0"
              onClick={handleLogoutClick}
            >
              Logout
            </button>)
}
          
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
