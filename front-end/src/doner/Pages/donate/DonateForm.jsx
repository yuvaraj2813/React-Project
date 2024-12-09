import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { db } from "../../../Firebase/firebaseconfig";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";

const DonateForm = ({ onClose }) => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    expireHours: "",
    pickupDetails: "self",
    pickupPlace: "",
    district: "",
    locality: "",  // New field
    state: "",     // New field
    phoneNo: "",   // New field
  });

  // Preload existing donation details and donor details from the database
  useEffect(() => {
    const fetchDonationDetails = async () => {
      try {
        const donationRef = doc(db, "donations", user.uid);
        const donationSnap = await getDoc(donationRef);
        if (donationSnap.exists()) {
          setFormData((prev) => ({
            ...prev,
            ...donationSnap.data(),
          }));
        }
      } catch (error) {
        console.error("Error fetching donation details:", error);
      }
    };

    const fetchDonorDetails = async () => {
      try {
        const donorRef = doc(db, "donor_details", user.uid);
        const donorSnap = await getDoc(donorRef);
        if (donorSnap.exists()) {
          setFormData((prev) => ({
            ...prev,
            locality: donorSnap.data().locality || "",
            state: donorSnap.data().state || "",
            district: donorSnap.data().district || "",
            phoneNo: donorSnap.data().phone || "",  // Make sure phoneNo is set
          }));
        }
      } catch (error) {
        console.error("Error fetching donor details:", error);
      }
    };

    if (user) {
      fetchDonationDetails();
      fetchDonorDetails();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.foodType ||
      !formData.quantity ||
      !formData.expireHours ||
      !formData.pickupDetails ||
      !formData.pickupPlace ||
      !formData.district ||
      !formData.locality ||
      !formData.state ||
      !formData.phoneNo
    ) {
      Swal.fire("Error", "Please fill in all fields", "error");
      return;
    }

    try {
      // Save donation to Firestore
      await addDoc(collection(db, "donations"), {
        userId: user.uid,
        ...formData,
        accepted: false,
        status: "not done",
        timestamp: new Date(),
      });

      Swal.fire("Success", "Donation posted successfully!", "success");
      setFormData({
        foodType: "",
        quantity: "",
        expireHours: "",
        pickupDetails: "self",
        pickupPlace: "",
        district: "",
        locality: "",
        state: "",
        phoneNo: "",
      });
      onClose(); // Close the form after submission
    } catch (error) {
      console.error("Error adding donation:", error);
      Swal.fire("Error", "Failed to post donation. Try again.", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
      <h2 className="text-xl font-bold mb-4">New Donation</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700">Food Type</label>
        <input
          type="text"
          name="foodType"
          value={formData.foodType}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Quantity</label>
        <input
          type="text"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Expiration (Hours)</label>
        <input
          type="number"
          name="expireHours"
          value={formData.expireHours}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Pickup Details</label>
        <select
          name="pickupDetails"
          value={formData.pickupDetails}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border"
        >
          <option value="self">Self</option>
          <option value="transported">Transported by Donor</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Pickup Place</label>
        <input
          type="text"
          name="pickupPlace"
          value={formData.pickupPlace}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">District</label>
        <input
          type="text"
          name="district"
          value={formData.district}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Locality</label>
        <input
          type="text"
          name="locality"
          value={formData.locality}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">State</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Phone Number</label>
        <input
          type="text"
          name="phoneNo"
          value={formData.phoneNo}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Submit
      </button>
      <button
        type="button"
        onClick={onClose}
        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-2"
      >
        Cancel
      </button>
    </form>
  );
};

export default DonateForm;
