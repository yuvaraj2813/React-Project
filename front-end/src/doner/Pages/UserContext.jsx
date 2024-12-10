
import React, { createContext, useState, useEffect } from 'react';
import {signOut, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../Firebase/firebaseconfig'; // Adjust path as needed


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserRole = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        console.log(`User role fetched: ${userDoc.data().role}`); // Log the role
        return userDoc.data().role;
      } else {
        console.log("No role found for user.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      return null;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
    console.log("User logged out"); // Log the logout
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // console.log(`User signed in: ${firebaseUser.uid}`); // Log when user signs in
        const userRole = await getUserRole(firebaseUser.uid);
        setUser(firebaseUser);
        setRole(userRole);
      } else {
        // console.log("No user is signed in."); // Log when no user is signed in
        setUser(null);
        setRole(null);
      }
      setLoading(false); // Log that loading is complete
      // console.log("Loading state set to false.");
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, role, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};
