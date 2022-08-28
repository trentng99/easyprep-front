import React, { useState, useEffect}  from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { db } from "./firebase-config";
import {
  getDoc,
  doc
} from "firebase/firestore";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import LandingScreen from './pages/LandingScreen';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import BuildAllergies from './pages/BuildAllergies';
import BuildCuisine from './pages/BuildCuisine';
import RecipePage from './pages/RecipePage';
import Profile from './pages/Profile';
import SavedRecipes from './pages/SavedRecipes';
import CookedRecipes from './pages/CookedRecipes';
import CookSuccess from './pages/CookSuccess';


function App() {
  const [user, setUser] = useState({});
  const [userdata, setUserData] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [state, setState] = useState({
    user_id: '',
    name:'',
    email:'',
    allergies:[],
    cuisines:[],
    cooked:[],
    liked:[]
  })

  useEffect(() => {
    if(user) { //Check for user
      if (user.email) { //Check if user is signed in
        const usersCollectionRef = doc(db, "users", user.email); //Reference to the document in users in firebase
        const getUsers = async () => {
          const data = await getDoc(usersCollectionRef); //Get the user's detail
          setUserData(data.data()); //Populate the userdata state with it's details
        };
        getUsers();
      }
    }
  }, [user]); //Re-renders the page whenver user state is changed

  return (
    <Router>
    <AuthProvider user={user} setUser={setUser}>
      <Routes>
        <Route path="/" element={<LandingScreen user={user}/>} />
        <Route path="/signup" element={<SignUp  user={user} state={state} setState={setState}/>} />
        <Route path="/login" element={<Login user={user}/>} />
        <Route path="/home" element = {<Home recipes={recipes} setRecipes={setRecipes} userdata={userdata}/>} />
        <Route path="/recipe/:Name" element = {<RecipePage user={user} userdata={userdata} setUserData={setUserData}/> }/>
        <Route element={<PrivateRoute user={user} redirectPath="/login" />}>
            <Route path="/buildallergies" element = {<BuildAllergies user={user} state={state} setState={setState}/>} />
            <Route path="/buildcuisine" element = {<BuildCuisine user={user} state={state} setState={setState}/>} />
            <Route path="/profile" element = {<Profile userdata={userdata}/>} />
            <Route path="/profile/saved-recipes" element = {<SavedRecipes userdata={userdata}/>} />
            <Route path="/profile/cooked-recipes" element = {<CookedRecipes userdata={userdata}/>} />
            <Route path="/cooksuccess" element = {<CookSuccess/> }/>
        </Route>
      </Routes>
    </AuthProvider>
  </Router>
  );
}

export default App;
