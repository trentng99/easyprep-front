import React, { useState, useEffect} from 'react'
import {Button, Container} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { db } from "../firebase-config";
import RecipeCard from '../components/RecipeCard';
import {
  getDoc,
  doc
} from "firebase/firestore";

function Home({ user }) {
  const { logout } = useAuth()
  const [userdata, setUserData] = useState([]);

  useEffect(() => {
    if (user.email) {
      const usersCollectionRef = doc(db, "users", user.email);
      const getUsers = async () => {
        const data = await getDoc(usersCollectionRef);
        setUserData(data.data());
      };
      getUsers();
    }
  }, [user]);


  return (
    <Container className='mb-2 App min-vh-100 justify-content-center align-items-center'>
      <h1 xs={12}>Hey {userdata.name}</h1>
      <Button xs={12} variant="primary" size="lg" onClick={logout}>
        Sign Out
      </Button>
      <RecipeCard></RecipeCard>
    </Container>
  )
}

export default Home