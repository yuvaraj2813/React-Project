import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebaseconfig"; // Update the path to your Firebase config file
import alert from "sweetalert2";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, updaterole] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(""); // New state for email format error
  const navigate = useNavigate(); // Initialize navigate function

  const getFirebaseErrorMessage = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already in use.";
      case "auth/weak-password":
        return "Password must be at least 6 characters.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      default:
        return "Unresolved Error";
    }
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      setError("Please fill in all the fields.");
      clearErrorAfterDelay();
      return;
    }

    // Validate email format before proceeding
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      clearErrorAfterDelay();
      return;
    } else {
      setEmailError(""); // Clear error if email is valid
    }

    try {
      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        role,
      });

      alert.fire({
        icon: "success",
        title: "Sign-Up Successful!",
        text: "You have successfully signed up.",
        confirmButtonColor: "#6366F1",
      });

      navigate("/"); // Redirect to sign-in page
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code));
      clearErrorAfterDelay();
    }
  };

  // Function to clear the error message after 3 seconds
  const clearErrorAfterDelay = () => {
    setTimeout(() => {
      setError(""); // Clear general errors
      setEmailError(""); // Clear email-specific errors
    }, 3000); // 3000ms = 3 seconds
  };

  const handleSignInClick = () => {
    navigate("/signin"); // Navigate to the SignIn route
  };

  const changeRole = (event) => {
    updaterole(event.target.value);
  };

  return (
    <>
      <div className="bg-[#e9edf2] flex justify-center items-center h-screen">
        <div className="bg-white shadow-lg px-8 py-6 border w-96">
          <h2 className="text-lg font-bold mb-4">Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="flex items-center gap-2 font-semibold">
                <input
                  type="radio"
                  value="donor"
                  checked={role === "donor"}
                  onChange={changeRole}
                />
                Donor
              </label>
              <label className="flex items-center gap-2 font-semibold">
                <input
                  type="radio"
                  value="receiver"
                  checked={role === "receiver"}
                  onChange={changeRole}
                />
                Receiver
              </label>
            </div>

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
              {emailError && <p style={{ color: "red" }}>{emailError}</p>} {/* Show email error */}
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
              Submit
            </button>
          </form>
          <div className="text-center mt-4">
            <span className="text-sm text-gray-500">Already have an account? </span>
            <Link to="/signin" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
