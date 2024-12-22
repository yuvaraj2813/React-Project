


import React, { useState, useEffect, useContext } from "react";
import AccountDetails from "../AccountDetails"; // Import AccountDetails component
import SearchFood from "./SearchFood"; // Import SearchFood component
import Received from "./Received"; // Import Received component
import { UserContext } from "../UserContext"; // Import UserContext
import { db } from "../../../Firebase/firebaseconfig"; // Import Firebase config
import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const ReceiveFood = () => {
  const [currentPage, setCurrentPage] = useState(null); // Default view is null (to show loading state initially)
  const [accountComplete, setAccountComplete] = useState(false); // Track if details are complete
  const { user, role } = useContext(UserContext);

  // Check if account details are complete
  const checkAccountDetails = async () => {
    if (user && role) {
      const collectionName = role === "donor" ? "donor_details" : "receiver_details";
      const docRef = doc(db, collectionName, user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const details = docSnap.data();
        const requiredFields = ["name", "locality", "district", "state", "phone"];
        const isComplete = requiredFields.every((field) => details[field] && details[field].trim() !== "");

        if (isComplete) {
          setAccountComplete(true);
          return true;
        } else {
          setAccountComplete(false);
          Swal.fire("Incomplete Details", "Please complete your account details before proceeding.", "info");
          setCurrentPage("accountDetails");
          return false;
        }
      } else {
        setAccountComplete(false);
        Swal.fire("Incomplete Details", "Please complete your account details before proceeding.", "info");
        setCurrentPage("accountDetails");
        return false;
      }
    }
  };

  // Handle navigation and check details before switching pages
  const handleNavigation = async (page) => {
    if (page === "searchFood" || page === "received") {
      const isValid = await checkAccountDetails();
      if (!isValid) return;
    }
    setCurrentPage(page);
  };

  // Render the content based on the currentPage
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

  // Load the saved page from localStorage on component mount
  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(savedPage); // Set the saved page as the initial page
    } else {
      setCurrentPage("accountDetails"); // Default to accountDetails if nothing is saved
    }
  }, []);

  // Store the currentPage in localStorage whenever it changes
  useEffect(() => {
    if (currentPage) {
      localStorage.setItem("currentPage", currentPage); // Save the current page to localStorage
    }
  }, [currentPage]);

  // Show a loading state until currentPage is determined
  if (currentPage === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pt-16 h-screen flex flex-col lg:flex-row">
      {/* Navigation Rail */}
      <div className="lg:w-[200px] bg-gray-100 border-b lg:border-r border-gray-300 shadow-md flex flex-col py-4 lg:h-full lg:sticky lg:top-0 lg:flex-none">
        <button
          onClick={() => handleNavigation("accountDetails")}
          className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
        >
          Account Details
        </button>
        <hr className="my-2" />
        <button
          onClick={() => handleNavigation("searchFood")}
          className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
        >
          Search Food
        </button>
        <hr className="my-2" />
        <button
          onClick={() => handleNavigation("received")}
          className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
        >
          Accepted Food
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



