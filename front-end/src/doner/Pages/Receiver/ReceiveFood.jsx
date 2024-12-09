import React, { useState } from "react";
import SearchFood from "./SearchFood";
import Received from "./Received";
import AccountDetails from "../AccountDetails"; // Import the AccountDetails component

const ReceiveFood = () => {
  const [currentPage, setCurrentPage] = useState("accountDetails"); // Set default page to accountDetails

  return (
    <div className="flex h-screen mt-10 py-5">
      {/* Navigation Rail */}
      <div className="w-[200px] bg-gray-100 border-r border-gray-300 shadow-md flex flex-col py-4">
        <a
          href="#"
          className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
          onClick={() => setCurrentPage("accountDetails")} // Set currentPage to accountDetails
        >
          Account Details
        </a>
        <a
          href="#"
          className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
          onClick={() => setCurrentPage("searchFood")} // Set currentPage to searchFood
        >
          Search Food
        </a>
        <hr className="my-2" />
        <a
          href="#"
          className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
          onClick={() => setCurrentPage("received")} // Set currentPage to received
        >
          Received
        </a>
        <hr className="my-2" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {currentPage === "accountDetails" && <AccountDetails />} {/* Render AccountDetails */}
        {currentPage === "searchFood" && <SearchFood />} {/* Render SearchFood */}
        {currentPage === "received" && <Received />} {/* Render Received */}
      </div>
    </div>
  );
};

export default ReceiveFood;
