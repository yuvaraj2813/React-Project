import React from 'react'

const NavBar = () => {
  return (
    
    <nav className="bg-light w-full py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <a href="#home" className="text-xl font-bold text-gray-800">FeedingHands</a>
        <div className="flex justify-center w-full space-x-6">
          <a href="#home" className="text-gray-600 hover:text-blue-600">Home</a>
          <a href="#features" className="text-gray-600 hover:text-blue-600">Donate</a>
          <a href="#pricing" className="text-gray-600 hover:text-blue-600">About Us</a>
        </div>
        <div className="flex items-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">SignIn</button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar