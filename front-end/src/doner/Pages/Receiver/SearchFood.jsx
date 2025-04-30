
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { db } from "../../../Firebase/firebaseconfig";
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc,onSnapshot } from "firebase/firestore";
import Swal from "sweetalert2";

const SearchFood = () => {
  const { user } = useContext(UserContext);
  const [donations, setDonations] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // For search input
  const [filteredDonations, setFilteredDonations] = useState([]); // To store filtered donations

  // Fetch donations from Firestore
  // Fetch donations from Firestore
useEffect(() => {
  if (user) {
    // Real-time listener for donations
    const q = query(
      collection(db, "donations"),
      where("accepted", "==", false) // Fetch only donations that are not accepted
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const donationsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDonations(donationsData); // Update donations
      setFilteredDonations((prevFiltered) =>
        searchQuery
          ? donationsData.filter(
              (donation) =>
                donation.district?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                donation.locality?.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : donationsData
      ); // Keep filtered donations updated 
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }
}, [user, searchQuery]);


  // Filter donations when the search query changes
  useEffect(() => {
    const filtered = donations.filter(
      (donation) =>
        donation.district?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donation.locality?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDonations(filtered);
  }, [searchQuery, donations]);

  // Function to calculate expiration timestamp dynamically using timestamp and expireTime
  const calculateExpireTimestamp = (timestamp, expireTime) => {
    const [hours, minutes, seconds] = expireTime.split(":").map((part) => parseInt(part, 10));

    // Convert Firestore timestamp to JavaScript Date object
    const expireDate = timestamp ? timestamp.toDate() : new Date();

    // Add the hours, minutes, and seconds to the expiration date
    expireDate.setHours(expireDate.getHours() + hours);
    expireDate.setMinutes(expireDate.getMinutes() + minutes);
    expireDate.setSeconds(expireDate.getSeconds() + seconds);

    return expireDate;
  };

  // Function to format remaining time as HH:MM:SS
  const formatTimeRemaining = (expireTimestamp) => {
    if (!expireTimestamp) return "00:00:00"; // If expireTimestamp is not defined

    const now = new Date();
    const remainingTime = expireTimestamp - now;

    if (remainingTime <= 0) return "Expired"; // Expired

    // Calculate the remaining time
    const hours = String(Math.floor(remainingTime / (1000 * 60 * 60))).padStart(2, "0");
    const minutes = String(Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
    const seconds = String(Math.floor((remainingTime % (1000 * 60)) / 1000)).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  // Real-time countdown update using setInterval
  useEffect(() => {
    const timer = setInterval(() => {
      setFilteredDonations((prev) =>
        prev.filter((donation) => {
          const expireDate = calculateExpireTimestamp(donation.timestamp, donation.expireTime);
          const now = new Date();
          if (expireDate <= now) {
            deleteDonationFromFirestore(donation.id); // Remove expired donation from Firestore
            return false;
          }
          return true;
        })
      );
    }, 1000); // Refresh every second to update the countdown

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [donations]);

  const deleteDonationFromFirestore = async (donationId) => {
    try {
      await deleteDoc(doc(db, "donations", donationId));
      console.log(`Food ${donationId} deleted from Firestore.`);
    } catch (error) {
      console.error("Error deleting Food:", error);
    }
  };

  // Handle donation acceptance
  const handleAcceptDonation = async (donationId) => {
    const result = await Swal.fire({
      title: "Confirm Food Acceptance",
      text: "Do you want to accept this Food?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, accept it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        // Update Firestore to mark donation as accepted
        const donationRef = doc(db, "donations", donationId);
        await updateDoc(donationRef, {
          accepted: true,
          receiverId: user.uid,
        });

        Swal.fire("Accepted!", "You have accepted the Food.", "success");

        // Optionally remove the donation from the state after acceptance
        setDonations((prevDonations) =>
          prevDonations.filter((donation) => donation.id !== donationId)
        );
        setFilteredDonations((prevFiltered) =>
          prevFiltered.filter((donation) => donation.id !== donationId)
        );
      } catch (error) {
        console.error("Error accepting donation:", error);
        Swal.fire("Error", "Failed to accept dFood. Try again.", "error");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Search Available Foods</h2>

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
        <p>No Foods available matching the criteria.</p>
      ) : (
        <ul>
          {filteredDonations.map((donation) => {
            const expireTimestamp = calculateExpireTimestamp(donation.timestamp, donation.expireTime);

            return (
              <li key={donation.id} className="mb-4 p-4 border rounded shadow">
                <p>
                  <strong>Food Type:</strong> {donation.foodType}
                </p>
                <p>
                  <strong>Quantity:</strong> {donation.quantity}
                </p>
                <p>
                  <strong>Expiration Time:</strong> {formatTimeRemaining(expireTimestamp)}
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
                  Accept Food
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchFood;
