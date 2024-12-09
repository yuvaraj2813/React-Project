import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { db } from "../../../Firebase/firebaseconfig";
import { collection, query, where, updateDoc, doc, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";

const SearchFood = () => {
  const { user } = useContext(UserContext);
  const [donations, setDonations] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // For search input
  const [filteredDonations, setFilteredDonations] = useState([]); // To store filtered donations

  useEffect(() => {
    if (user) {
      const fetchDonations = async () => {
        const q = query(
          collection(db, "donations"),
          where("accepted", "==", false) // Fetch only donations that are not accepted
        );
        const snapshot = await getDocs(q);
        const donationsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDonations(donationsData);
        setFilteredDonations(donationsData); // Initially, all donations are shown
      };

      fetchDonations();
    }
  }, [user]);

  // Filter donations when the search query changes
  useEffect(() => {
    // Filter based on district and locality
    const filtered = donations.filter(
      (donation) =>
        donation.district?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donation.locality?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDonations(filtered);
  }, [searchQuery, donations]);

  const handleAcceptDonation = async (donationId) => {
    const result = await Swal.fire({
      title: "Confirm Donation Acceptance",
      text: "Do you want to accept this donation?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, accept it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        const donationRef = doc(db, "donations", donationId);
        await updateDoc(donationRef, {
          accepted: true, // Update accepted to true
          receiverId: user.uid, // Add receiverId to the donation document
        });

        Swal.fire("Accepted!", "You have accepted the donation.", "success");

        // Optionally remove the donation from the state after acceptance
        setDonations((prevDonations) =>
          prevDonations.filter((donation) => donation.id !== donationId)
        );
        setFilteredDonations((prevFiltered) =>
          prevFiltered.filter((donation) => donation.id !== donationId)
        );
      } catch (error) {
        console.error("Error accepting donation:", error);
        Swal.fire("Error", "Failed to accept donation. Try again.", "error");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Search Available Donations</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by district or locality"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {/* Donations List */}
      {filteredDonations.length === 0 ? (
        <p>No donations available matching the criteria.</p>
      ) : (
        <ul>
          {filteredDonations.map((donation) => (
            <li key={donation.id} className="mb-4 p-4 border rounded shadow">
              <p>
                <strong>Food Type:</strong> {donation.foodType}
              </p>
              <p>
                <strong>Quantity:</strong> {donation.quantity}
              </p>
              <p>
                <strong>Expiration (Hours):</strong> {donation.expireHours}
              </p>
              <p>
                <strong>Pickup Place:</strong> {donation.pickupPlace}
              </p>
              <p>
                <strong>District:</strong> {donation.district}
              </p>
              <p>
                <strong>Locality:</strong> {donation.locality}
              </p>
              <button
                onClick={() => handleAcceptDonation(donation.id)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-2"
              >
                Accept Donation
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchFood;

// import React, { useState, useEffect, useContext } from "react";
// import { UserContext } from "../UserContext";
// import { db, messaging } from "../../../Firebase/firebaseconfig"; // Make sure messaging is imported
// import { collection, query, where, updateDoc, doc, getDocs } from "firebase/firestore";
// import Swal from "sweetalert2";
// import { getToken } from "firebase/messaging";

// // Request permission and get the FCM token
// const requestPermissionAndGetToken = async () => {
//   try {
//     const token = await getToken(messaging, { vapidKey: 'BEIu_Ga0t731k82HEem8QI2Mw9X1do3oviWpVzkZsz4uNoo9GZe5Ie8ERj1xFvOsztNqezw9FK5v3gm1r-TNiRo' }); // Replace with your actual VAPID key
//     if (token) {
//       console.log("FCM Token:", token);
//       // Save this token to your Firestore under the donor's data
//     }
//   } catch (error) {
//     console.error("Error getting FCM token:", error);
//   }
// };

// const SearchFood = () => {
//   const { user } = useContext(UserContext);
//   const [donations, setDonations] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredDonations, setFilteredDonations] = useState([]);

//   useEffect(() => {
//     if (user) {
//       const fetchDonations = async () => {
//         const q = query(
//           collection(db, "donations"),
//           where("accepted", "==", false)
//         );
//         const snapshot = await getDocs(q);
//         const donationsData = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setDonations(donationsData);
//         setFilteredDonations(donationsData);
//       };

//       fetchDonations();
//       requestPermissionAndGetToken(); // Request permission and get token
//     }
//   }, [user]);

//   const handleAcceptDonation = async (donationId) => {
//     const result = await Swal.fire({
//       title: "Confirm Donation Acceptance",
//       text: "Do you want to accept this donation?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, accept it!",
//       cancelButtonText: "No, cancel",
//     });

//     if (result.isConfirmed) {
//       try {
//         const donationRef = doc(db, "donations", donationId);
//         await updateDoc(donationRef, {
//           accepted: true,
//           receiverId: user.uid,
//         });

//         // Send notification to donor
//         sendNotificationToDonor(donationId);

//         Swal.fire("Accepted!", "You have accepted the donation.", "success");

//         // Optionally remove the donation from the state after acceptance
//         setDonations((prevDonations) =>
//           prevDonations.filter((donation) => donation.id !== donationId)
//         );
//         setFilteredDonations((prevFiltered) =>
//           prevFiltered.filter((donation) => donation.id !== donationId)
//         );
//       } catch (error) {
//         console.error("Error accepting donation:", error);
//         Swal.fire("Error", "Failed to accept donation. Try again.", "error");
//       }
//     }
//   };

//   // Send push notification to the donor
//   const sendNotificationToDonor = async (donationId) => {
//     try {
//       const donationRef = doc(db, "donations", donationId);
//       const docSnap = await getDocs(donationRef);
//       const donationData = docSnap.data();
//       const donorToken = donationData.donorToken; // Assuming you have the donor's token stored

//       const message = {
//         notification: {
//           title: "Donation Accepted",
//           body: `Your donation of ${donationData.foodType} has been accepted!`,
//         },
//         token: donorToken, // Donor's FCM token
//       };

//       // Send push notification using Firebase Cloud Messaging
//       await admin.messaging().send(message); // You'll need a Firebase Admin SDK server
//       console.log("Notification sent to donor");
//     } catch (error) {
//       console.error("Error sending notification:", error);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Search Available Donations</h2>

//       <input
//         type="text"
//         placeholder="Search by district or locality"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="w-full p-2 border rounded mb-4"
//       />

//       {filteredDonations.length === 0 ? (
//         <p>No donations available matching the criteria.</p>
//       ) : (
//         <ul>
//           {filteredDonations.map((donation) => (
//             <li key={donation.id} className="mb-4 p-4 border rounded shadow">
//               <p><strong>Food Type:</strong> {donation.foodType}</p>
//               <p><strong>Quantity:</strong> {donation.quantity}</p>
//               <p><strong>Pickup Place:</strong> {donation.pickupPlace}</p>
//               <button
//                 onClick={() => handleAcceptDonation(donation.id)}
//                 className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-2"
//               >
//                 Accept Donation
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchFood;
