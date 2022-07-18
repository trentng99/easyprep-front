import React, { useContext, useState } from 'react'
import { auth } from '../firebase-config' //import database
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children, user, setUser }) {

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

      const value = {
        user,
        login,
        logout
      }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}