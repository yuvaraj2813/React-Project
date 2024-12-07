// src/pages/SignIn.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebaseconfig";
import alert from 'sweetalert2';

const SignIn = ({ changeUserRole }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getFirebaseErrorMessage = (code) => {
    if (code === "auth/invalid-credential") {
      return "Enter valid Email or Password";
    }
    if (code === "auth/user-not-found") {
      return "No user found with this email. Please sign up.";
    }
    if (code === "auth/wrong-password") {
      return "Incorrect password. Please try again.";
    }
    return "An unexpected error occurred. Please try again."; // Default error message
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const role = await getUserRoleFromFirestore(user.uid); // This function is hypothetical
      changeUserRole(role); // Set the user role

      alert.fire({
        icon: "success",
        title: "Sign-In Successful!",
        text: "You have successfully signed in.",
        confirmButtonColor: "#6366F1",
      })
        .then(() => {
          navigate("/");
        })
    } catch (err) {
      const errorMessage = getFirebaseErrorMessage(err.code); // Use err.code instead of err.message
      setError(errorMessage);
      clearErrorAfterDelay(); // Clear error after a delay
    }
  };
  // Function to clear the error message after 3 seconds
  const clearErrorAfterDelay = () => {
    setTimeout(() => {
      setError(""); // Clear general errors
      setEmailError(""); // Clear email-specific errors
    }, 3000); // 3000ms = 3 seconds
  };
  // Hypothetical function to fetch user role from Firestore
  const getUserRoleFromFirestore = async (userId) => {
    // Fetch the user's role from Firestore (or your preferred method)
    // Example: Get role from Firestore or Firebase custom claims
    return "donor"; // Return "donor" for testing
  };

  return (
    <>
      <div className="  bg-[#e9edf2] flex justify-center items-center h-screen">
        <div className="bg-white shadow-lg px-8 py-6 border w-96">
          <h2 className="text-lg font-bold mb-4">SignIn</h2>
          <form onSubmit={handleSignIn}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full px-3 py-2 border"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full px-3 py-2 border"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <span className="text-sm text-gray-500">Create Account? </span>
            <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
              create
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
