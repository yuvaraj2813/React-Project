import React, { useState, useEffect, useContext } from "react";
import AccountDetails from "../AccountDetails"; // Import AccountDetails component
import DonateForm from "./DonateForm";
import CurrentDonations from "./CurrentDonations";
import PreviousDonations from "./PreviousDonations";
import { UserContext } from "../UserContext";
import { db } from "../../../Firebase/firebaseconfig"; // Firebase config
import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const Donate = () => {
  const [activeView, setActiveView] = useState("accountDetails"); // Default view is AccountDetails
  const [showForm, setShowForm] = useState(false); // Track Donate form visibility
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

        setAccountComplete(isComplete);

        if (!isComplete) {
          Swal.fire("Incomplete Details", "Please complete your account details before proceeding.", "info");
          setActiveView("accountDetails");
        }

        return isComplete;
      } else {
        setAccountComplete(false);
        Swal.fire("Incomplete Details", "Please complete your account details before proceeding.", "info");
        setActiveView("accountDetails");
        return false;
      }
    }
  };

  // Handle navigation for different views
  const handleNavigation = async (view) => {
    if (view === "donate") {
      const isAccountComplete = await checkAccountDetails();
      if (isAccountComplete) {
        setActiveView("currentDonations");
      }
      return;
    }

    if (view === "donate" && !accountComplete) {
      // If account details are not complete, navigate to account details
      const isValid = await checkAccountDetails();
      if (!isValid) return;
    }

    setActiveView(view);
  };

  // Handle Donate button click
  const handleDonateClick = async () => {
    const isValid = await checkAccountDetails();
    if (isValid) {
      // Navigate directly to Current Donations if account details are filled
      setActiveView("currentDonations");
      setShowForm(true);
    }
  };

  const renderContent = () => {
    if (showForm) {
      return <DonateForm onClose={() => setShowForm(false)} />;
    }

    switch (activeView) {
      case "accountDetails":
        return <AccountDetails />;
      case "currentDonations":
        return <CurrentDonations />;
      case "previousDonations":
        return <PreviousDonations />;
      default:
        return <AccountDetails />;
    }
  };

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
          onClick={() => handleNavigation("previousDonations")}
          className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
        >
          Previous Donations
        </button>
        <hr className="my-2" />
        <div className="flex flex-col">
          <button
            onClick={() => handleNavigation("currentDonations")}
            className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
          >
            Current Donations
          </button>
          <button
            onClick={handleDonateClick}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Donate
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white shadow-md overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Donate;
