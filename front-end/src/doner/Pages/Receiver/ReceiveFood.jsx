

import React, { useState } from "react";
import AccountDetails from "../AccountDetails"; // Import the AccountDetails component
import SearchFood from "./SearchFood"; // Import SearchFood component
import Received from "./Received"; // Import Received component

const ReceiveFood = () => {
  const [currentPage, setCurrentPage] = useState("accountDetails"); // Default view is accountDetails
  const [showForm, setShowForm] = useState(false);

  const renderContent = () => {
    switch (currentPage) {
      case "accountDetails":
        return <AccountDetails />;
      case "searchFood":
        return <SearchFood />;
      case "received":
        return <Received />;
      default:
        return <AccountDetails />;
    }
  };

  return (
    <div className="pt-16 h-screen flex flex-col lg:flex-row"> {/* Added pt-16 for Navbar space */}
      {/* Navigation Rail */}
      <div className="lg:w-[200px] bg-gray-100 border-b lg:border-r border-gray-300 shadow-md flex flex-col py-4 lg:h-full lg:sticky lg:top-0 lg:flex-none">
        <button
          onClick={() => setCurrentPage("accountDetails")}
          className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
        >
          Account Details
        </button>
        <hr className="my-2" />
        <button
          onClick={() => setCurrentPage("searchFood")}
          className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
        >
          Search Food
        </button>
        <hr className="my-2" />
        <button
          onClick={() => setCurrentPage("received")}
          className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
        >
          Received
        </button>
        <hr className="my-2" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white shadow-md overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default ReceiveFood;
