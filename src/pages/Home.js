import React, { useState, useEffect} from 'react'
import {Button} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { db } from "../firebase-config";
import { useNavigate } from 'react-router-dom'
import {
  collection,
  getDocs,
  query,
} from "firebase/firestore";

function Home({user}) {
  const navigate = useNavigate();
  const { logout } = useAuth()
  const [database, setDatabase] = useState([]);

  //Call functions when page first loads
  useEffect(() => {
    //Get user's database
    const usersCollectionRef = collection(db, "users");
    //Fill database with the documents in user collection.
    const getUsers = async () => {
      const data = await getDocs(query(usersCollectionRef));  
      setDatabase(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
    //Loops the database to check if user have fill up their profile
  }, []);

  database.map((data) => {
    if (data.email === user.email) {
      if (data.allergies == null) {
        navigate('/buildallergies')
      }
    }
  })



  return (
    <div className='mb-2 App min-vh-100 d-flex justify-content-center align-items-center'>
      <h1 xs={12}>Welcome {user.email}</h1>
      <Button xs={12} variant="primary" size="lg" onClick={logout}>
        Sign Out
      </Button>
    </div>
  )
}

export default Home