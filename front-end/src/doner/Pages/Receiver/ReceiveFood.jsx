

// // import React, { useState } from "react";
// // import AccountDetails from "../AccountDetails"; // Import the AccountDetails component
// // import SearchFood from "./SearchFood"; // Import SearchFood component
// // import Received from "./Received"; // Import Received component

// // const ReceiveFood = () => {
// //   const [currentPage, setCurrentPage] = useState("accountDetails"); // Default view is accountDetails
// //   const [showForm, setShowForm] = useState(false);

// //   const renderContent = () => {
// //     switch (currentPage) {
// //       case "accountDetails":
// //         return <AccountDetails />;
// //       case "searchFood":
// //         return <SearchFood />;
// //       case "received":
// //         return <Received />;
// //       default:
// //         return <AccountDetails />;
// //     }
// //   };

// //   return (
// //     <div className="pt-16 h-screen flex flex-col lg:flex-row"> {/* Added pt-16 for Navbar space */}
// //       {/* Navigation Rail */}
// //       <div className="lg:w-[200px] bg-gray-100 border-b lg:border-r border-gray-300 shadow-md flex flex-col py-4 lg:h-full lg:sticky lg:top-0 lg:flex-none">
// //         <button
// //           onClick={() => setCurrentPage("accountDetails")}
// //           className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
// //         >
// //           Account Details
// //         </button>
// //         <hr className="my-2" />
// //         <button
// //           onClick={() => setCurrentPage("searchFood")}
// //           className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
// //         >
// //           Search Food
// //         </button>
// //         <hr className="my-2" />
// //         <button
// //           onClick={() => setCurrentPage("received")}
// //           className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
// //         >
// //           Accepted Food
// //         </button>
// //         <hr className="my-2" />
// //       </div>

// //       {/* Main Content */}
// //       <div className="flex-1 p-6 bg-white shadow-md overflow-y-auto">
// //         {renderContent()}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ReceiveFood;


// import React, { useState, useEffect, useContext } from "react";
// import AccountDetails from "../AccountDetails"; // Import AccountDetails component
// import SearchFood from "./SearchFood"; // Import SearchFood component
// import Received from "./Received"; // Import Received component
// import { UserContext } from "../UserContext"; // Import UserContext
// import { db } from "../../../Firebase/firebaseconfig"; // Import Firebase config
// import { doc, getDoc } from "firebase/firestore";
// import Swal from "sweetalert2";

// const ReceiveFood = () => {
//   const [currentPage, setCurrentPage] = useState("accountDetails"); // Default view is accountDetails
//   const [accountComplete, setAccountComplete] = useState(false); // Track if details are complete
//   const { user, role } = useContext(UserContext);

//   // Check if account details are complete
//   const checkAccountDetails = async () => {
//     if (user && role) {
//       const collectionName = role === "donor" ? "donor_details" : "receiver_details";
//       const docRef = doc(db, collectionName, user.uid);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const details = docSnap.data();
//         const requiredFields = ["name", "locality", "district", "state", "phone"];
//         const isComplete = requiredFields.every((field) => details[field] && details[field].trim() !== "");

//         if (isComplete) {
//           setAccountComplete(true);
//         } else {
//           setAccountComplete(false);
//           Swal.fire("Incomplete Details", "Please complete your account details before proceeding.", "info");
//           setCurrentPage("accountDetails");
//         }
//       } else {
//         setAccountComplete(false);
//         Swal.fire("Incomplete Details", "Please complete your account details before proceeding.", "info");
//         setCurrentPage("accountDetails");
//       }
//     }
//   };

//   // Handle navigation and check details before switching to "Accepted Food"
//   const handleNavigation = (page) => {
//     if (page === "received") {
//       checkAccountDetails();
//     }
//     setCurrentPage(page);
//   };

//   const renderContent = () => {
//     switch (currentPage) {
//       case "accountDetails":
//         return <AccountDetails />;
//       case "searchFood":
//         return <SearchFood />;
//       case "received":
//         return accountComplete ? <Received /> : <AccountDetails />;
//       default:
//         return <AccountDetails />;
//     }
//   };

//   return (
//     <div className="pt-16 h-screen flex flex-col lg:flex-row">
//       {/* Navigation Rail */}
//       <div className="lg:w-[200px] bg-gray-100 border-b lg:border-r border-gray-300 shadow-md flex flex-col py-4 lg:h-full lg:sticky lg:top-0 lg:flex-none">
//         <button
//           onClick={() => handleNavigation("accountDetails")}
//           className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
//         >
//           Account Details
//         </button>
//         <hr className="my-2" />
//         <button
//           onClick={() => handleNavigation("searchFood")}
//           className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
//         >
//           Search Food
//         </button>
//         <hr className="my-2" />
//         <button
//           onClick={() => handleNavigation("received")}
//           className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
//         >
//           Accepted Food
//         </button>
//         <hr className="my-2" />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6 bg-white shadow-md overflow-y-auto">
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default ReceiveFood;


import React, { useState, useEffect, useContext } from "react";
import AccountDetails from "../AccountDetails"; // Import AccountDetails component
import SearchFood from "./SearchFood"; // Import SearchFood component
import Received from "./Received"; // Import Received component
import { UserContext } from "../UserContext"; // Import UserContext
import { db } from "../../../Firebase/firebaseconfig"; // Import Firebase config
import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const ReceiveFood = () => {
  const [currentPage, setCurrentPage] = useState("accountDetails"); // Default view is accountDetails
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
