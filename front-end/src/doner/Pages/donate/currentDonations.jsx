import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { db } from "../../../Firebase/firebaseconfig";
import { doc, deleteDoc, query, where, collection, onSnapshot, updateDoc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const CurrentDonations = () => {
  const { user } = useContext(UserContext);
  const [donations, setDonations] = useState([]);
  const [loadingReceiver, setLoadingReceiver] = useState(false);
  const [receiverDetails, setReceiverDetails] = useState({});

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "donations"), where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const userDonations = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (donation) =>
              !donation.accepted ||
              (donation.accepted && donation.status === "not done")
          );
        setDonations(userDonations);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const fetchReceiverDetails = async (receiverId) => {
    setLoadingReceiver(true);
    try {
      const receiverDoc = doc(db, "receiver_details", receiverId);
      const receiverSnapshot = await getDoc(receiverDoc);
      if (receiverSnapshot.exists()) {
        setReceiverDetails((prevState) => ({
          ...prevState,
          [receiverId]: receiverSnapshot.data(),
        }));
      }
    } catch (error) {
      console.error("Error fetching receiver details:", error);
    } finally {
      setLoadingReceiver(false);
    }
  };

  const handleDelete = async (donationId) => {
    const result = await Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this donation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "donations", donationId));
        Swal.fire("Deleted!", "Your donation has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting donation:", error);
        Swal.fire("Error", "Failed to delete donation. Try again.", "error");
      }
    }
  };

  const handleDone = async (donationId) => {
    const result = await Swal.fire({
      title: "Confirm Completion",
      text: "Has the receiver successfully received the food? Mark it as done.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Done",
      cancelButtonText: "No, Cancel",
    });

    if (result.isConfirmed) {
      try {
        const donationRef = doc(db, "donations", donationId);
        await updateDoc(donationRef, {
          status: "done", // Mark donation as done
        });

        Swal.fire("Completed!", "Donation marked as done.", "success");
      } catch (error) {
        console.error("Error updating donation status:", error);
        Swal.fire("Error", "Failed to update donation status. Try again.", "error");
      }
    }
  };

  useEffect(() => {
    donations.forEach((donation) => {
      if (donation.accepted && !receiverDetails[donation.receiverId]) {
        fetchReceiverDetails(donation.receiverId);
      }
    });
  }, [donations, receiverDetails]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Current Donations</h1>
      <p className="text-gray-500 mb-4">
        Here are your active donations. Donations will appear here if they are either waiting for a receiver or are
        accepted but not completed yet.
      </p>
      {donations.length === 0 ? (
        <p>No current donations matching the criteria.</p>
      ) : (
        <ul>
          {donations.map((donation) => (
            <li key={donation.id} className="mb-4 p-4 border rounded shadow flex flex-col md:flex-row">
              <div className="flex-1">
                <p><strong>Food Type:</strong> {donation.foodType}</p>
                <p><strong>Quantity:</strong> {donation.quantity}</p>
                <p><strong>Pickup Place:</strong> {donation.pickupPlace}</p>
                <p><strong>District:</strong> {donation.district}</p>
                <p><strong>Status:</strong> {donation.accepted ? (donation.status === "done" ? "Completed" : "Accepted by receiver (not done)") : "Waiting for receiver"}</p>

                {/* If the donation is accepted and not completed, show receiver details and the Done button */}
                {donation.accepted && donation.status !== "done" && (
                  <div>


                    <button
                      onClick={() => handleDone(donation.id)}
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-2"
                    >
                      Mark as Done
                    </button>
                  </div>
                )}

                <button
                  onClick={() => handleDelete(donation.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-2 ml-2"
                >
                  Delete
                </button>
              </div>

              {/* Right side section for receiver details */}
              <div className="md:ml-6 mt-4 md:mt-0 md:w-1/3 bg-gray-50 p-4 rounded shadow-md">
                {donation.accepted && donation.status !== "done" && receiverDetails[donation.receiverId] && (
                  <>
                    <h3 className="font-semibold">Receiver Details</h3>
                    <p><strong>Name:</strong> {receiverDetails[donation.receiverId]?.name}</p>
                    <p><strong>Phone:</strong> {receiverDetails[donation.receiverId]?.phone}</p>
                    <p><strong>Locality:</strong> {receiverDetails[donation.receiverId]?.locality}</p>
                    <p><strong>District:</strong> {receiverDetails[donation.receiverId]?.district}</p>
                    <p><strong>State:</strong> {receiverDetails[donation.receiverId]?.state}</p>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrentDonations;
