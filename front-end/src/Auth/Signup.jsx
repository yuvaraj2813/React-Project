// import React from 'react'

// const Signup = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [name, setName] = useState("");
//     // const [phone, setPhone] = useState("");
//     const [error, setError] = useState("");
  
//     const handleSignUp = async (e) => {
//       e.preventDefault();
//       try {
//         // Create the user in Firebase Authentication
//         const userCredential = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );
//         const user = userCredential.user;
  
//         // Store additional user info in Firestore
//         await setDoc(doc(db, "users", user.uid), {
//           name,
//           email,
//           phone,
//         });
  
//         alert("Sign-Up Successful and Data Stored!");
//       } catch (err) {
//         setError(err.message);
//       }
//     };
//   return (
    
//         <div className='flex justify-center items-center h-screen'>
//         <div className='shadow-lg px-8 py-6 border w-96'>
//             <h2 className='text-log font-bold mb-4'>SignUp</h2>
//             <form onSubmit={handleSubmit}>
//                 {error && <p style={{color:'red'}}>{error}</p>}
//                 <div className='mb-4'>
//                     <label htmlFor='username' class Name='block text-gray-700'>Username</label>
//                     <input tpe="text" placeholder='Enter Username' value={name} className='w-full px-3 py-2 border' name="username" onChange={(e)=> setName(e.target.value)}/>
//                 </div>
//                 <div className='mb-4'>
//                     <label htmlFor='email' class Name='block text-gray-700'>Email</label>
//                     <input tpe="email" placeholder='Enter Email'  className='w-full px-3 py-2 border' name="email"value={email} onChange={(e)=> setEmail(e.target.value)} />
//                 </div>
//                 <div className='mb-4'>
//                     <label htmlFor='password' class Name='block text-gray-700'>Password</label>
//                     <input tpe="password" placeholder='Enter Password'  className='w-full px-3 py-2 border' name="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
//                 </div>
//                 <button type="submit"class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
//             </form>
//             <div className='text-center '>
//                 <span class="mt-10 text-sm/6 text-gray-500">Already have account</span>
//                 <Link  to='/login'class="font-semibold text-indigo-600 hover:text-indigo-500">Login</Link>
//             </div>
//         </div>
//     </div>
    
//   )
// }

// export default Signup

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebaseconfig"; // Update the path to your Firebase config file

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        phone,
      });

      alert("Sign-Up Successful and Data Stored!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-lg px-8 py-6 border w-96">
        <h2 className="text-lg font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              value={name}
              className="w-full px-3 py-2 border"
              name="username"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <label htmlFor="phone" className="block text-gray-700">
              Phone
            </label>
            <input
              type="text"
              placeholder="Enter Phone Number"
              className="w-full px-3 py-2 border"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            Submit
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-sm text-gray-500">Already have an account? </span>
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
