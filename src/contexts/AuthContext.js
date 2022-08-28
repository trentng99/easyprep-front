import React, { useContext } from 'react'
import { auth } from '../firebase-config' //import database
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
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

    function register(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

      const value = {
        user,
        login,
        register,
        logout
      }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}