// // import React, { useContext, useEffect, useState } from "react";
// // import { UserContext } from "../UserContext";
// // import { db } from "../../../Firebase/firebaseconfig";
// // import { doc, query, where, collection, onSnapshot,getDoc } from "firebase/firestore";
// // import Swal from "sweetalert2";

// // const PreviousDonations = () => {
// //   const { user } = useContext(UserContext);
// //   const [donations, setDonations] = useState([]);
// //   const [loadingReceiver, setLoadingReceiver] = useState(false);
// //   const [receiverDetails, setReceiverDetails] = useState({});

// //   useEffect(() => {
// //     if (user) {
// //       const q = query(
// //         collection(db, "donations"),
// //         where("userId", "==", user.uid),
// //         where("accepted", "==", true), // Only accepted donations
// //         where("status", "==", "done") // Only donations with status 'done'
// //       );

// //       const unsubscribe = onSnapshot(q, (snapshot) => {
// //         const userDonations = snapshot.docs.map((doc) => ({
// //           id: doc.id,
// //           ...doc.data(),
// //         }));
// //         setDonations(userDonations);
// //       });

// //       return () => unsubscribe();
// //     }
// //   }, [user]);

// //   const fetchReceiverDetails = async (receiverId) => {
// //     setLoadingReceiver(true);
// //     try {
// //       const receiverDoc = doc(db, "receiver_details", receiverId);
// //       const receiverSnapshot = await getDoc(receiverDoc);
// //       if (receiverSnapshot.exists()) {
// //         setReceiverDetails((prevState) => ({
// //           ...prevState,
// //           [receiverId]: receiverSnapshot.data(),
// //         }));
// //       }
// //     } catch (error) {
// //       console.error("Error fetching receiver details:", error);
// //     } finally {
// //       setLoadingReceiver(false);
// //     }
// //   };

// //   useEffect(() => {
// //     donations.forEach((donation) => {
// //       if (donation.accepted && !receiverDetails[donation.receiverId]) {
// //         fetchReceiverDetails(donation.receiverId);
// //       }
// //     });
// //   }, [donations, receiverDetails]);

// //   return (
// //     <div>
// //       <h1 className="text-3xl font-bold">Previous Donations</h1>
// //       <p className="text-gray-500 mb-4">
// //         Here are your previous donations that were completed successfully.
// //       </p>
// //       {donations.length === 0 ? (
// //         <p>No previous donations found.</p>
// //       ) : (
// //         <ul>
// //           {donations.map((donation) => {
// //             if (donation.status === "done" && donation.accepted) {
// //               return (
// //                 <li key={donation.id} className="mb-4 p-4 border rounded shadow flex flex-col md:flex-row">
// //                   <div className="flex-1">
// //                     <p><strong>Food Type:</strong> {donation.foodType}</p>
// //                     <p><strong>Quantity:</strong> {donation.quantity}</p>
// //                     <p><strong>Pickup Place:</strong> {donation.pickupPlace}</p>
// //                     <p><strong>District:</strong> {donation.district}</p>
// //                     <p><strong>Status:</strong> {donation.status === "done" ? "Completed" : "Not Completed"}</p>
// //                   </div>

// //                   {/* Right side section for receiver details */}
// //                   <div className="md:ml-6 mt-4 md:mt-0 md:w-1/3 bg-gray-50 p-4 rounded shadow-md">
// //                     {donation.accepted && donation.status === "done" && receiverDetails[donation.receiverId] && (
// //                       <>
// //                         <h3 className="font-semibold">Receiver Details</h3>
// //                         <p><strong>Name:</strong> {receiverDetails[donation.receiverId]?.name}</p>
// //                         <p><strong>Phone:</strong> {receiverDetails[donation.receiverId]?.phone}</p>
// //                         <p><strong>Locality:</strong> {receiverDetails[donation.receiverId]?.locality}</p>
// //                         <p><strong>District:</strong> {receiverDetails[donation.receiverId]?.district}</p>
// //                         <p><strong>State:</strong> {receiverDetails[donation.receiverId]?.state}</p>
// //                       </>
// //                     )}
// //                   </div>
// //                 </li>
// //               );
// //             } else {
// //               return null;
// //             }
// //           })}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // };

// // export default PreviousDonations;


// import React, { useContext, useEffect, useState } from "react";
// import { UserContext } from "../UserContext";
// import { db } from "../../../Firebase/firebaseconfig";
// import { doc, query, where, collection, onSnapshot, getDoc } from "firebase/firestore";
// import Swal from "sweetalert2";

// const PreviousDonations = () => {
//   const { user } = useContext(UserContext);
//   const [donations, setDonations] = useState([]);
//   const [receiverDetails, setReceiverDetails] = useState({});
//   const [loadingReceivers, setLoadingReceivers] = useState({}); // Track loading for individual receivers

//   // Fetch donations where userId matches and status is "done"
//   useEffect(() => {
//     if (user) {
//       const q = query(
//         collection(db, "donations"),
//         where("userId", "==", user.uid),
//         where("accepted", "==", true),
//         where("status", "==", "done")
//       );

//       const unsubscribe = onSnapshot(
//         q,
//         (snapshot) => {
//           const userDonations = snapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }));
//           setDonations(userDonations);
//         },
//         (error) => {
//           console.error("Error fetching donations:", error);
//           Swal.fire("Error", "Failed to load donations. Please try again.", "error");
//         }
//       );

//       return () => unsubscribe();
//     }
//   }, [user]);

//   // Fetch details of the receiver for a specific donation
//   const fetchReceiverDetails = async (receiverId) => {
//     if (receiverDetails[receiverId] || loadingReceivers[receiverId]) return; // Skip if already fetched or loading

//     setLoadingReceivers((prev) => ({ ...prev, [receiverId]: true }));

//     try {
//       const receiverDoc = doc(db, "receiver_details", receiverId);
//       const receiverSnapshot = await getDoc(receiverDoc);

//       if (receiverSnapshot.exists()) {
//         setReceiverDetails((prevState) => ({
//           ...prevState,
//           [receiverId]: receiverSnapshot.data(),
//         }));
//       }
//     } catch (error) {
//       console.error("Error fetching receiver details:", error);
//       Swal.fire("Error", "Failed to load receiver details. Please try again.", "error");
//     } finally {
//       setLoadingReceivers((prev) => ({ ...prev, [receiverId]: false }));
//     }
//   };

//   // Fetch receiver details for all donations
//   useEffect(() => {
//     donations.forEach((donation) => {
//       if (donation.receiverId) {
//         fetchReceiverDetails(donation.receiverId);
//       }
//     });
//   }, [donations]);

//   return (
//     <div>
//       <h1 className="text-3xl font-bold">Previous Donations</h1>
//       <p className="text-gray-500 mb-4">
//         Here are your previous donations that were completed successfully.
//       </p>
//       {donations.length === 0 ? (
//         <p>No previous donations found.</p>
//       ) : (
//         <ul>
//           {donations.map((donation) => (
//             <li key={donation.id} className="mb-4 p-4 border rounded shadow flex flex-col md:flex-row">
//               {/* Donation Details */}
//               <div className="flex-1">
//                 <p><strong>Food Type:</strong> {donation.foodType}</p>
//                 <p><strong>Quantity:</strong> {donation.quantity}</p>
//                 <p><strong>Pickup Place:</strong> {donation.pickupPlace}</p>
//                 <p><strong>District:</strong> {donation.district}</p>
//                 <p><strong>Status:</strong> {donation.status === "done" ? "Completed" : "Not Completed"}</p>
//               </div>

//               {/* Receiver Details */}
//               <div className="md:ml-6 mt-4 md:mt-0 md:w-1/3 bg-gray-50 p-4 rounded shadow-md">
//                 {receiverDetails[donation.receiverId] ? (
//                   <>
//                     <h3 className="font-semibold">Receiver Details</h3>
//                     <p><strong>Name:</strong> {receiverDetails[donation.receiverId]?.name || "N/A"}</p>
//                     <p><strong>Phone:</strong> {receiverDetails[donation.receiverId]?.phone || "N/A"}</p>
//                     <p><strong>Locality:</strong> {receiverDetails[donation.receiverId]?.locality || "N/A"}</p>
//                     <p><strong>District:</strong> {receiverDetails[donation.receiverId]?.district || "N/A"}</p>
//                     <p><strong>State:</strong> {receiverDetails[donation.receiverId]?.state || "N/A"}</p>
//                   </>
//                 ) : loadingReceivers[donation.receiverId] ? (
//                   <p>Loading receiver details...</p>
//                 ) : (
//                   <p>Receiver details not available.</p>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default PreviousDonations;


import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { db } from "../../../Firebase/firebaseconfig";
import { query, where, collection, onSnapshot } from "firebase/firestore";
import Swal from "sweetalert2";

const PreviousDonations = () => {
  const { user } = useContext(UserContext);
  const [donations, setDonations] = useState([]);

  // Fetch donations where userId matches and status is "done"
  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "donations"),
        where("userId", "==", user.uid),
        where("accepted", "==", true),
        where("status", "==", "done")
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const userDonations = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDonations(userDonations);
        },
        (error) => {
          console.error("Error fetching donations:", error);
          Swal.fire("Error", "Failed to load donations. Please try again.", "error");
        }
      );

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Previous Donations</h1>
      <p className="text-gray-500 mb-4">
        Here are your previous donations that were completed successfully.
      </p>
      {donations.length === 0 ? (
        <p>No previous donations found.</p>
      ) : (
        <ul>
          {donations.map((donation) => (
            <li key={donation.id} className="mb-4 p-4 border rounded shadow flex flex-col">
              {/* Donation Details */}
              <div>
                <p><strong>Food Type:</strong> {donation.foodType}</p>
                <p><strong>Quantity:</strong> {donation.quantity}</p>
                <p><strong>Pickup Place:</strong> {donation.pickupPlace}</p>
                <p><strong>District:</strong> {donation.district}</p>
                <p><strong>Status:</strong> {donation.status === "done" ? "Completed" : "Not Completed"}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PreviousDonations;
