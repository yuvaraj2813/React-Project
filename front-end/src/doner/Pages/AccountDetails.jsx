import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext"; // Adjust the path to your UserContext
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseconfig"; // Adjust the path to your Firebase config
import Swal from "sweetalert2";

const UserDetails = () => {
  const { user, role } = useContext(UserContext);
  const [details, setDetails] = useState({
    name: "",
    locality: "",
    district: "",
    state: "",
    phone: "",
    userId: "",
  });
  const [isEditing, setIsEditing] = useState(true); // Start in edit mode if no data exists
  const [loading, setLoading] = useState(true);

  // Fetch user details when the component loads
  useEffect(() => {
    if (user && role) {
      const fetchDetails = async () => {
        setLoading(true);
        try {
          const collectionName = role === "donor" ? "donor_details" : "receiver_details";
          const docRef = doc(db, collectionName, user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setDetails(docSnap.data());
            setIsEditing(false); // Disable editing if data exists
          } else {
            setDetails((prevDetails) => ({ ...prevDetails, userId: user.uid }));
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
          Swal.fire("Error", "Failed to load user details. Please try again.", "error");
        } finally {
          setLoading(false);
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

  // Save details to Firestore
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
        ...details,
        userId: user.uid,
      });

      Swal.fire("Success", "Details saved successfully!", "success");
      setIsEditing(false); // Switch back to view mode after saving
    } catch (error) {
      console.error("Error saving user details:", error);
      Swal.fire("Error", "Failed to save details. Please try again.", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Details</h2>
      <form>
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Locality", name: "locality", type: "text" },
          { label: "District", name: "district", type: "text" },
          { label: "State", name: "state", type: "text" },
          { label: "Phone Number", name: "phone", type: "text" },
        ].map((field) => (
          <div className="mb-4" key={field.name}>
            <label htmlFor={field.name} className="block text-gray-700">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={details[field.name]}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              disabled={!isEditing}
            />
          </div>
        ))}
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
