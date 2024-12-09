import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { db } from "../../../Firebase/firebaseconfig";
import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";

const Received = () => {
  const { user } = useContext(UserContext);
  const [receivedDonations, setReceivedDonations] = useState([]);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "donations"),
        where("receiverId", "==", user.uid), // Fetch donations where the receiverId matches user.uid
        where("accepted", "==", true) // Only accepted donations
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const receivedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Filter out donations with the status "done"
        const filteredData = receivedData.filter(donation => donation.status !== "done");
        setReceivedDonations(filteredData);
      });

      return () => unsubscribe();
    }
  }, [user]);

  // Function to handle the "Done" button click
  const handleDone = async (donationId) => {
    const result = await Swal.fire({
      title: "Confirm Donation Completion",
      text: "Have you received the food? Mark as Done.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Done",
      cancelButtonText: "No, Cancel",
    });

    if (result.isConfirmed) {
      try {
        const donationRef = doc(db, "donations", donationId);
        await updateDoc(donationRef, {
          status: "done", // Update the donation status to 'done'
        });

        Swal.fire("Completed!", "Donation marked as done.", "success");

        // Remove the donation from the state after marking it done
        setReceivedDonations((prevDonations) =>
          prevDonations.filter((donation) => donation.id !== donationId)
        );
      } catch (error) {
        console.error("Error updating donation status:", error);
        Swal.fire("Error", "Failed to update donation status. Try again.", "error");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Accepted Donations</h2>
      {receivedDonations.length === 0 ? (
        <p>You haven't accepted any donations yet.</p>
      ) : (
        <ul>
          {receivedDonations.map((donation) => (
            <li key={donation.id} className="mb-4 p-4 border rounded shadow">
              {/* Display donation details */}
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
              <p>
                <strong>Phone Number:</strong> {donation.phoneNumber}
              </p>

              {/* "Done" Button */}
              <button
                onClick={() => handleDone(donation.id)}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-2"
              >
                Mark as Done
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Received;
