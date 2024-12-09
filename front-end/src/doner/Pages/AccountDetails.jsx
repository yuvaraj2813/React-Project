import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext"; // Adjust the path to your UserContext
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseconfig"; // Adjust the path to your Firebase config
import Swal from "sweetalert2";

const UserDetails = () => {
  const { user, role } = useContext(UserContext); // Get the user and role from context
  const [details, setDetails] = useState({
    name: "",
    locality: "",
    district: "",
    state: "",
    phone: "",
    userId: "", // Add userId to the details state
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user details when the component loads
  useEffect(() => {
    if (user && role) {
      const fetchDetails = async () => {
        try {
          const collectionName = role === "donor" ? "donor_details" : "receiver_details";
          const docRef = doc(db, collectionName, user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setDetails(docSnap.data());
          } else {
            // Set initial userId when no details exist in the database
            setDetails((prevDetails) => ({ ...prevDetails, userId: user.uid }));
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchDetails();
    }
  }, [user, role]);

  // Handle input changes
  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  // Save updated details to Firestore
  const handleSave = async () => {
    if (!details.name || !details.locality || !details.district || !details.state || !details.phone) {
      Swal.fire("Error", "Please fill in all the fields.", "error");
      return;
    }

    if (!/^\d{10}$/.test(details.phone)) {
      Swal.fire("Error", "Please enter a valid 10-digit phone number.", "error");
      return;
    }

    try {
      const collectionName = role === "donor" ? "donor_details" : "receiver_details";
      await setDoc(doc(db, collectionName, user.uid), {
        ...details, // Spread details to include all fields
        userId: user.uid, // Explicitly include the user ID
      });

      Swal.fire("Success", "Details saved successfully!", "success");
      setIsEditing(false); // Switch back to view mode
    } catch (error) {
      console.error("Error saving user details:", error);
      Swal.fire("Error", "Failed to save details. Try again.", "error");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Details</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={details.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border"
            disabled={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="locality" className="block text-gray-700">
            Locality
          </label>
          <input
            type="text"
            id="locality"
            name="locality"
            value={details.locality}
            onChange={handleChange}
            className="w-full px-3 py-2 border"
            disabled={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="district" className="block text-gray-700">
            District
          </label>
          <input
            type="text"
            id="district"
            name="district"
            value={details.district}
            onChange={handleChange}
            className="w-full px-3 py-2 border"
            disabled={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="block text-gray-700">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={details.state}
            onChange={handleChange}
            className="w-full px-3 py-2 border"
            disabled={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={details.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border"
            disabled={!isEditing}
          />
        </div>
        {isEditing ? (
          <button
            type="button"
            onClick={handleSave}
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default UserDetails;
