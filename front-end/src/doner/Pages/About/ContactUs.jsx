

import React, { useState } from "react";
import { db } from "../../../Firebase/firebaseconfig"; // Firebase config file
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import Footer from "./Footer";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add feedback to Firestore
      await addDoc(collection(db, "feedbacks"), {
        name,
        email,
        issue,
        createdAt: new Date(),
      });

      Swal.fire({
        title: "Thank You!",
        text: "Your feedback has been submitted successfully.",
        icon: "success",
      });

      setName("");
      setEmail("");
      setIssue("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again later.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="bg-gray-100 min-h-screen flex items-center justify-center mt-10">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">Contact Us</h1>
        <p className="text-center text-gray-600 mb-6">
          Have a question, issue, or suggestion? We would love to hear from you!
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Issue or Feedback</label>
            <textarea
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              rows="4"
              className="w-full mt-2 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your issue or feedback"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;

