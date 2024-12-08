

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const NavBar = () => {
  const { user, role, loading, logout } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Log states for debugging
  console.log("NavBar States:");
  console.log("User:", user);
  console.log("Role:", role);
  console.log("Loading:", loading);

  const handleSignInClick = () => {
    console.log("Navigating to sign-in page.");
    navigate("/signin");
  };

  const handleLogoutClick = () => {
    console.log("User logging out.");
    logout();
    navigate("/");
  };

  if (loading) {
    console.log("Loading is true. Navbar is rendering 'Loading...' placeholder.");
    return (
      <nav className="bg-white fixed top-0 w-full py-3 shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center px-6">
          <a href="#home" className="text-xl font-bold text-gray-800">
            FeedingHands
          </a>
          <span className="text-gray-500">Loading...</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white fixed top-0 w-full py-3 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        <a href="#home" className="text-xl font-bold text-gray-800">
          FeedingHands
        </a>
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
              d={
                isMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            ></path>
          </svg>
        </button>

        <div
          className={`lg:flex items-center space-x-6 ${
            isMenuOpen ? "block" : "hidden"
          } w-full lg:w-auto absolute lg:static top-14 left-0 bg-white lg:bg-transparent lg:py-0 py-4 px-6 shadow-md lg:shadow-none`}
        >
          <Link to="/" className="block lg:inline text-gray-600 hover:text-blue-600 py-2">
            Home
          </Link>

          {role === "donor" && (
            <Link to="/donate" className="block lg:inline text-gray-600 hover:text-blue-600 py-2">
              Donate
            </Link>
          )}

          {role === "receiver" && (
            <Link to="/receivefood" className="block lg:inline text-gray-600 hover:text-blue-600 py-2">
              Receive Food
            </Link>
          )}

          <Link to="/aboutus" className="block lg:inline text-gray-600 hover:text-blue-600 py-2">
            About Us
          </Link>

          {user ? (
            <button
              className="block lg:inline bg-blue-500 text-white px-4 py-2 rounded-[20px] hover:bg-blue-600 mt-2 lg:mt-0"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          ) : (
            <button
              className="block lg:inline bg-blue-500 text-white px-4 py-2 rounded-[20px] hover:bg-blue-600 mt-2 lg:mt-0"
              onClick={handleSignInClick}
            >
              SignIn
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
export default NavBar;