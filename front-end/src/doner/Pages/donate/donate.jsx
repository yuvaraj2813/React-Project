
import React, { useState } from "react";
import AccountDetails from "../AccountDetails"; // Import the AccountDetails component
import DonateForm from "./DonateForm";
import CurrentDonations from "./currentDonations";
import PreviousDonations from "./previousDonations";

const Donate = () => {
  const [activeView, setActiveView] = useState("currentDonations"); // State to track active view
  const [showForm, setShowForm] = useState(false);

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
        return <PreviousDonations/>; // Replace with actual component
      default:
        return <CurrentDonations />;
    }
  };

  return (
    <div className="pt-16 h-screen flex flex-col lg:flex-row"> {/* Added pt-16 for Navbar space */}
      {/* Navigation Rail */}
      <div className="lg:w-[200px] bg-gray-100 border-b lg:border-r border-gray-300 shadow-md flex flex-col py-4 lg:h-full lg:sticky lg:top-0 lg:flex-none">
        <button
          onClick={() => setActiveView("accountDetails")}
          className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
        >
          Account Details
        </button>
        <hr className="my-2" />
        <button
          onClick={() => setActiveView("previousDonations")}
          className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
        >
          Previous Donations
        </button>
        <hr className="my-2" />
        <div className="flex flex-col">
          <button
            onClick={() => setActiveView("currentDonations")}
            className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
          >
            Current Donations
          </button>
          <button
            onClick={() => setShowForm(true)}
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
